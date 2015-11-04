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
* 安装 VS 2015 Preview。使用自定义安装并选择“Windows 通用应用开发工具”选项。
* 安装 [Python 2.7](https://www.python.org/downloads/)。

###获取 Node.js 源代码
* 克隆 [Github](http://github.com/Microsoft/node) 中的代码。

###创建临时位置
* md C:\\NodeChakra

###构建 Node.exe
为主机计算机（用于构建二进制文件并将其部署到设备的计算机）体系结构和目标计算机体系结构进行构建。

为主机（构建加载项所需）进行构建

* 转到已克隆的 repo
* 运行 `vcbuild chakra nosign x64`（假设主机体系结构 x64）
* 将 Node.exe 从 &lt;local\_repo&gt;\\release 复制到 C:\\NodeChakra

为设备（假设 Rpi2）进行构建：

* 转到已克隆的 repo
* `vcbuild chakra nosign arm openssl-no-asm`

更新 PATH 变量（确保新的 Node.exe 位置在路径的前面）： SET path=C:\\NodeChakra;%path%

###创建加载项
为 Node.js 服务器构建将在此示例中部署的本机加载项。此步骤是必需的，因为 [GlobalMemoryStatusEx]\(https://msdn.microsoft.com/zh-CN/library/windows/desktop/aa366589(v=vs.85).aspx\) 用于获取我们需要的数据。

* 创建加载项位置 C:\\NodeAddon
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

*  构建加载项： `node.exe [local_repo]\deps\npm\node_modules\node-gyp\bin\node-gyp.js rebuild --nodedir=[local_repo] --msvs_version=2015 --target_arch=arm`


###创建 Node.js 文件
创建名为 server.js 的新文件并将下面到它的内容。

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

在第一行中，我们将加载我们创建了 prevously 加载项。我们还加载 http 模块并创建服务器。当向服务器进行请求时，调用我们的加载项中的 GlobalMemoryStatusEx 方法以检索内存状态。有关编写加载项的详细信息，请转到 [https://nodejs.org/api/addons.html](https://nodejs.org/api/addons.html)。


###将文件复制到 Windows IoT Core 设备
在电脑上打开资源管理器窗口并输入 **\\\\\<你的设备的 IP 地址\>\\C$** 以访问设备上的文件。凭据是：

    username: <IP address or device name, default is minwinpc>\Administrator
    password: p@ssw0rd

注意： **强烈推荐**你更新管理员帐户的默认密码。请按照在[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)找到的说明进行操作。

在设备上为节点创建文件夹 C:\\Node，将文件从主机复制到设备：

* &lt;local\_repo&gt;\\release 中的 Node.exe 的 ARM 版本
* MemoryStatusAddon.node
* server.js

设备上的节点目录结构的外观应如下所示：

![节点目录结构]({{site.baseurl}}/images/Nodejs/memstatus-sample-file-structure.png)

使用 PowerShell 连接到设备。请按照在[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)找到的说明进行操作

允许 Node.exe 使用以下命令通过防火墙进行通信：

* netsh advfirewall firewall add rule name="Node.js" dir=in action=allow program="C:\\Node\\Node.exe" enable=yes


###运行服务器！
在 PowerShell 中，运行命令 `C:\Node\Node.exe server.js` 来启动服务器。打开浏览器并输入你的设备的 http://&lt;IP 地址 \>:1337。结果的外观应类似于以下图片。

![内存状态结果]({{site.baseurl}}/images/Nodejs/memorystatus-ie.PNG)
