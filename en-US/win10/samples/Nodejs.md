---
layout: default
title: Nodejs
permalink: /en-US/win10/samples/Nodejs.htm
lang: en-US
---

##MemoryStatus Node.js (Console Application) Sample
Related: [MemoryStatus C++ Console Application Sample]({{site.baseurl}}/{{page.lang}}/win10/samples/ConsoleApp.htm)


###Set up your PC
* Install Windows 10 Insider Preview.
* Install VS 2015 Preview. Use custom installation and select the ‘Windows Universal App Development Tools’ option.
* Install [Python 2.7](https://www.python.org/downloads/).

###Get the Node.js Source Code
* Clone the code from [Github](http://github.com/Microsoft/node).

###Create a staging location
* md C:\NodeChakra

###Build Node.exe
Build for both host machine (machine used for building and deploying the binaries to the device) architecture and the target machine architecture.

Build for Host (Needed to build the addon):

* Goto the cloned repo
* Run `vcbuild chakra nosign x64` (assuming host architecture x64)
* Copy Node.exe from &lt;local_repo&gt;\release to  C:\NodeChakra

Build for the device (assuming Rpi2):

* Goto the cloned repo
* `vcbuild chakra nosign arm`

Update PATH variable (make sure the new Node.exe location is at the front of the path): SET path=C:\NodeChakra;%path%

###Create Addon
Build a native addon for the Node.js server that will be deployed in this sample. This step is required because [GlobalMemoryStatusEx](https://msdn.microsoft.com/en-us/library/windows/desktop/aa366589(v=vs.85).aspx) is used to get the data we need.

* Create AddOn location C:\NodeAddon
* Go to C:\NodeAddon
* Create new file MemoryStatusAddon.cc, copy the content below and save:
<UL>
{% highlight C++ %}
// MemoryStatusAddon.cc
#include <node.h>
#include <windows.h>

using namespace v8;

// Use to convert bytes to KB
#define DIV 1024

void GlobalMemoryStatusEx(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  MEMORYSTATUSEX statex;
  statex.dwLength = sizeof(statex);

  BOOL success = GlobalMemoryStatusEx(&statex);
  if (success)
  {
    Local<Object> obj = Object::New(isolate);
    obj->Set(String::NewFromUtf8(isolate, "load"), Integer::New(isolate, statex.dwMemoryLoad)->ToString());
    obj->Set(String::NewFromUtf8(isolate, "physKb"), Integer::New(isolate, (statex.ullTotalPhys / DIV))->ToString());
    obj->Set(String::NewFromUtf8(isolate, "freePhysKb"), Integer::New(isolate, (statex.ullAvailPhys / DIV))->ToString());
    obj->Set(String::NewFromUtf8(isolate, "pageKb"), Integer::New(isolate, (statex.ullTotalPageFile / DIV))->ToString());
    obj->Set(String::NewFromUtf8(isolate, "freePageKb"), Integer::New(isolate, (statex.ullAvailPageFile / DIV))->ToString());
    obj->Set(String::NewFromUtf8(isolate, "virtualKb"), Integer::New(isolate, (statex.ullTotalVirtual / DIV))->ToString());
    obj->Set(String::NewFromUtf8(isolate, "freeVirtualKb"), Integer::New(isolate, (statex.ullAvailVirtual / DIV))->ToString());
    obj->Set(String::NewFromUtf8(isolate, "freeExtKb"), Integer::New(isolate, (statex.ullAvailExtendedVirtual / DIV))->ToString());
    args.GetReturnValue().Set(obj);
  }
}

void Init(Handle<Object> exports) {
  NODE_SET_METHOD(exports, "GlobalMemoryStatusEx", GlobalMemoryStatusEx);
}

NODE_MODULE(MemoryStatusAddon, Init)
{% endhighlight %}
</UL>

* Create a file called binding.gyp (in the same folder as MemoryStatusAddon.cc) and put the contents below in it:
<UL>
{% highlight Json %}
{
  "targets": [
    {
      "target_name": "MemoryStatusAddon",
      "sources": [ "MemoryStatusAddon.cc" ]
    }
  ]
}
{% endhighlight %}
</UL>
* Build the AddOn: `node.exe [local_repo]\deps\npm\node_modules\node-gyp\bin\node-gyp.js rebuild --nodedir=[local_repo] --msvs_version=2015 --target_arch=arm`


###Create the Node.js file
Create a new file called server.js and place the contents below to it.
<UL>
{% highlight JavaScript %}
var addon = require("./MemoryStatusAddon");
var http = require('http');

http.createServer(function (req, res) {
  var memObj = addon.GlobalMemoryStatusEx();
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('*************************************************\n');
  res.write('Percent of memory in use: ' + memObj.load + '\n');
  res.write('KB of physical memory: ' + memObj.physKb + '\n');
  res.write('KB of free physical memory: ' + memObj.freePhysKb + '\n');
  res.write('KB of paging file: ' + memObj.pageKb + '\n');
  res.write('KB of free paging file: ' + memObj.freePageKb + '\n');
  res.write('KB of virtual memory: ' + memObj.virtualKb + '\n');
  res.write('KB of free virtual memory: ' + memObj.freeVirtualKb + '\n');
  res.write('KB of free extended memory: ' + memObj.freeExtKb + '\n');
  res.end('*************************************************\n');
}).listen(1337);
{% endhighlight %}
</UL>
In the first line, we load the Addon we created prevously. We also load the http module and create a server. When a request is made to the server,
the GlobalMemoryStatusEx method in our Addon is called to retrieve the memory status.
For more information on writing addons, go to [https://nodejs.org/api/addons.html](https://nodejs.org/api/addons.html).


###Copy files to Windows IoT Core device
Open up an explorer window on your PC and enter **\\\\\<IP address of your device\>\\C$** to access files on your device. The credentials are:

    username: <IP address or device name, default is minwinpc>\Administrator
    password: p@ssw0rd

NOTE: It is **highly recommended** that you update the default password for the Administrator account.  Please follow the instructions found [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm).  

Create folder for Node on the device, C:\Node, and copy files from the host to the device:

* ARM version of Node.exe  from &lt;local_repo&gt;\release
* MemoryStatusAddon.node
* server.js

Here’s what the Node directory structure on the device should look like:

![Node Directory Structure]({{site.baseurl}}/images/Nodejs/memstatus-sample-file-structure.png)

Connect to the device using PowerShell.  Please follow the instructions found [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)

Allow Node.exe to communicate through the firewall with the following command:

* netsh advfirewall firewall add rule name="Node.js" dir=in action=allow program="C:\Node\Node.exe" enable=yes


###Run the server!
In PowerShell, run the command `C:\Node\Node.exe server.js` to start the server.
Open up a browser and enter the address http://&lt;IP address of your device&gt;:1337. The result should look something like the picture below.

![Memory Status Result]({{site.baseurl}}/images/Nodejs/memorystatus-ie.PNG)
