---
layout: default
title: NodejsWU
permalink: /zh-CN/win10/samples/NodejsWU.htm
lang: zh-CN
---

##“Hello, World”Node.js（Windows 通用）示例


###设置电脑
* 安装 Windows 10。
* 安装 Visual Studio 2015。
* 从[此处](https://github.com/ms-iot/ntvsiot/releases)安装适用于 Windows IoT 的最新 Node.js 工具。


###创建新的 Node.js（Windows 通用）项目
启动 Visual Studio 2015 并创建新项目（“文件”\|“新建项目...”）。在“`New Project`”对话框中，导航到“`Node.js`”，如下所示（在该对话框的左侧窗格中： “模板”\|“JavaScript”\|“Node.js”）。

选择模板 `Basic Node.js Web Server (Windows Universal)`

![Node.js Windows 通用“新建项目”对话框]({{site.baseurl}}/Resources/images/Nodejs/nodejswu-newprojectdialog.png)


### “Hello World”代码
项目创建后，你将看到一个具有以下代码的 server.js 文件。它将创建简单的服务器，以便在发出某一请求时可通过“Hello World”进行响应。[此处](https://nodejs.org/api/http.html){:target="_blank"}提供了有关如何使用 http 模块的文档。

<UL>

{% highlight JavaScript %}
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(1337);
{% endhighlight %}
</UL>


###将服务器部署到 Windows IoT 核心版设备
* 转到“项目”菜单，然后选择“<Your project name> 属性”。 你也可以右键单击解决方案资源管理器中的项目节点来访问属性。
* 在“远程计算机”文本框中输入 IP 地址，如下所示（`--debug` 参数是调试时必需的，并且会自动添加）。
* 你还可以将 `--use-logger` 添加为参数以将控制台输出重定向到 UWP 应用程序的本地存储文件夹中的文件 \(C:\\Users\\DefaultAccount\\AppData\\Local\\Packages&lt;你的项目名称&gt;\_&lt;发布者哈希字符串&gt;\\LocalState\\nodeuwp.log\)。
* 如果你要针对 Minnowboard Max 进行生成，请选择下拉列表中的 `x86`。如果你要针对 Raspberry Pi 2 进行生成，请选择 `ARM`。

    ![Node.js Windows 通用项目属性]({{site.baseurl}}/Resources/images/Nodejs/nodejswu-properties.png)

* 现在，我们可以随时部署到远程 Windows IoT 核心版设备。只需按 F5（或依次选择“调试”\|“开始调试”）即可开始调试服务器。

* 当服务器正在运行时，打开浏览器，然后输入地址 \<你的设备的地址\>：1337。结果的外观应类似于以下图片。

    ![Hello World 结果]({{site.baseurl}}/Resources/images/Nodejs/helloworld-ie.PNG)

* 你可以设置断点、查看变量值，等等。若要停止服务器调试，请按“停止调试”按钮（或依次选择“调试”\|“停止调试”）。

    ![调试屏幕截图]({{site.baseurl}}/Resources/images/Nodejs/debugging-vs.PNG)


### 通用 Windows 平台 \(UWP\) 命名空间
UWP 命名空间可供你在 Node.js 中使用。下面的代码将返回日期和时间，而不是上述示例中的“Hello World”。

<UL>

{% highlight JavaScript %}
var http = require('http');
var uwp = require("uwp");
uwp.projectNamespace("Windows");
var calendar = new Windows.Globalization.Calendar();

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    var date = calendar.getDateTime();
    res.end(String(date));
}).listen(1337);

uwp.close();
{% endhighlight %}
</UL>

上述代码所生成的结果应如下所示：

![DateTime 结果]({{site.baseurl}}/Resources/images/Nodejs/datetime-ie.PNG)

### GitHub
* NTVS IoT 扩展源代码：[https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
* Node.js UWP 包装器源代码：[https://github.com/ms-iot/node-uwp-wrapper](https://github.com/ms-iot/node-uwp-wrapper)
