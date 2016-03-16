---
layout: default
title: Nodejs
permalink: /en-US/win10/samples/Nodejs.htm
lang: en-US
---

## MemoryStatus Node.js (Console Application) Sample

{% include VerifiedVersion.md %}

Related: [MemoryStatus C++ Console Application Sample]({{site.baseurl}}/{{page.lang}}/win10/samples/ConsoleApp.htm)


### Set up your PC
* Install [Python 2.7](https://www.python.org/downloads/){:target="_blank"}.

### Copy Node.js to your Raspberry Pi 2 or 3
* Download the zip file with ARM Node.js (ChakraCore) from [here](http://aka.ms/nodecc_arm) to your PC and extract the files (node.exe and chakracore.dll).
* Use [Windows file sharing]({{site.baseurl}}/{{page.lang}}/win10/samples/SMB.htm), [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm), 
or [SSH]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm) to create `C:\Node.js (ChakraCore)` folder on your Raspberry Pi 2 or 3.
* Copy node.exe and chakracore.dll to `C:\Node.js (ChakraCore)` on your Raspberry Pi 2 or 3.


### Create MemoryStatus Addon
Build a native addon for the Node.js server that will be deployed in this sample. This step is required because [GlobalMemoryStatusEx](https://msdn.microsoft.com/en-us/library/windows/desktop/aa366589(v=vs.85).aspx){:target="_blank"} is used to get the data we need.

* On your Windows 10 PC, create the AddOn location in C:\NodeAddon
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
* Build the AddOn: `"[Node.js (ChakraCore) installation path]\node_modules\npm\bin\node-gyp-bin\node-gyp.cmd" rebuild --target_arch=arm` (use appropriate --target_arch depending on the device you have).  
  The default Node.js (ChakraCore) installation path is "c:\Program Files\nodejs (chakracore)".


### Create the Node.js file
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


### Copy the files to Windows IoT Core device
Open up an explorer window on your PC and enter **\\\\\<IP address of your device\>\\C$** to access files on your device. The credentials (if you have not changed them) are:

   username: <IP address or device name, default is minwinpc>\Administrator  
   password: p@ssw0rd  

Create a folder on the device called C:\MemoryStatusSample. Then copy the files you created below from your PC to this folder:

* MemoryStatusAddon.node
* server.js

Connect to the device using PowerShell.  Please follow the instructions found [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)

Allow Node.exe to communicate through the firewall with the following command:

* `netsh advfirewall firewall add rule name="Node.js" dir=in action=allow program="C:\Node.js (ChakraCore)\Node.exe" enable=yes`


### Run the server!
In PowerShell, run the command `& 'C:\Node.js (ChakraCore)\Node.exe' C:\MemoryStatusSample\server.js` to start the server.
Open up a browser and enter the address http://&lt;IP address of your device&gt;:1337. The result should look something like the picture below.

![Memory Status Result]({{site.baseurl}}/Resources/images/Nodejs/memorystatus-ie.PNG)


### GitHub
* Node.js (ChakraCore) source code: [https://github.com/Microsoft/node](https://github.com/Microsoft/node)
* NTVS IoT Extension source code: [https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
