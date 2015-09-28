---
layout: default
title: Nodejs
permalink: /zh-CN/win10/samples/Nodejs.htm
lang: zh-CN
---

##MemoryStatus Node.js（控制台应用程序）示例
相关： [MemoryStatus C++ 控制台应用程序示例]({{site.baseurl}}/{{page.lang}}/win10/samples/ConsoleApp.htm)


###设置电脑
* 安装 Windows 10。
* 安装 Visual Studio 2015。
* 从[此处](https://github.com/ms-iot/ntvsiot/releases)安装适用于 Windows IoT 的最新 Node.js 工具。
* 安装 [Python 2.7](https://www.python.org/downloads/){:target="_blank"}。

###将 Node.js 复制到 Raspberry Pi 2
* 在电脑上打开资源管理器窗口并输入 **\\\\\<你的设备的 IP 地址\>\\C$** 以访问设备上的文件。凭据是：

   用户名：\<IP 地址或设备名称，默认值为 minwinpc\>\\管理员密码：p@ssw0rd

  注意： **强烈推荐**你更新管理员帐户的默认密码。请按照在[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)找到的说明进行操作。

* 运行 `& 'C:\Program Files (x86)\Node.js (chakra)\CopyNodeChakra.ps1' -arch <ARM | x86 | x64 > -ip <Device IP Address>`。如果你有 Raspberry Pi 2，请使用 `ARM`。如果你有 MinnowBoard Max，请使用 `x86`。完成此步骤后，Node.js 将位于你的设备上的 `c:\Node.js (Chakra)` 中。**注意：** 如果你尚未通过资源管理器窗口输入凭据，你将收到“拒绝访问”错误。


###创建 MemoryStatus 加载项
为 Node.js 服务器生成将在此示例中部署的本机加载项。此步骤是必需的，因为 \[GlobalMemoryStatusEx\]\(https://msdn.microsoft.com/zh-CN/library/windows/desktop/aa366589(v=vs.85).aspx){:target="_blank"} 用于获取我们需要的数据。

* 在 Windows 10 电脑上，在 C:\\NodeAddon 中创建 AddOn 位置
* 转到 C:\\NodeAddon
* 创建新文件 MemoryStatusAddon.cc，复制以下内容并保存：

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

* 创建称为 binding.gyp 的文件（在 MemoryStatusAddon.cc 所在的同一个文件中），然后在其中放入以下内容：

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

* 生成加载项：`"[Node.js (Chakra) installation path]\node_modules\npm\bin\node-gyp-bin\node-gyp.cmd" rebuild --target_arch=arm`（根据你所拥有的设备使用相应的 --target\_arch）。默认的 Node.js \(Chakra\) 安装路径为“c:\\Program Files \(x86\)\\Node.js \(chakra\)”。


###创建 Node.js 文件
创建名为 server.js 的新文件并在其中放入以下内容。

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

在第一行中，我们将加载之前创建的加载项。我们还加载 http 模块并创建服务器。当向服务器进行请求时，调用我们的加载项中的 GlobalMemoryStatusEx 方法以检索内存状态。有关编写加载项的详细信息，请转到 [https://nodejs.org/api/addons.html](https://nodejs.org/api/addons.html)。


###将文件复制到 Windows IoT 核心版设备
使用资源管理器窗口，在设备上创建名为 C:\\MemoryStatusSample 的文件夹。然后，将以下文件从电脑复制到此文件夹：

* MemoryStatusAddon.node
* server.js

使用 PowerShell 连接到设备。请按照在[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)找到的说明进行操作

允许 Node.exe 使用以下命令通过防火墙进行通信：

* netsh advfirewall firewall add rule name="Node.js" dir=in action=allow program="C:\\Node.js \(Chakra\)\\Node.exe" enable=yes


###运行服务器！
在 PowerShell 中，运行命令 `& 'C:\Node.js (Chakra)\Node.exe' C:\MemoryStatusSample\server.js` 来启动服务器。打开浏览器并输入你的设备的 http://&lt;IP 地址 \>:1337。结果的外观应类似于以下图片。

![内存状态结果]({{site.baseurl}}/images/Nodejs/memorystatus-ie.PNG)


### GitHub
* Node.js \(Chakra\) 源代码：[https://github.com/Microsoft/node](https://github.com/Microsoft/node)
* NTVS IoT 扩展源代码：[https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
