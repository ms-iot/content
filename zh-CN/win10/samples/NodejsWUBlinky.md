---
layout: default
title: NodejsWUBlinky
permalink: /zh-cn/win10/samples/NodejsWUBlinky.htm
lang: zh-cn
---

##Blinky Node.js 服务器示例（Windows 通用）

{% include VerifiedVersion.md %}

###设置电脑
* 安装[含有 11 月更新](http://windows.microsoft.com/zh-cn/windows-10/windows-update-faq)的 Windows 10。
* 安装 Visual Studio 2015 Update 1。
* 从[此处](http://aka.ms/ntvsiotlatest)安装适用于 Windows IoT 的最新 Node.js 工具。


###设置你的硬件
此示例的设置与 C\#“Blinky”[示例]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)相同。


###创建新的 Node.js（Windows 通用）项目
启动 Visual Studio 2015 并创建新项目（“文件”\|“新建项目...”）。在“`New Project`”对话框中，导航到“`Node.js`”，如下所示（在该对话框的左侧窗格中： “模板”\|“JavaScript”\|“Node.js”）。使用 `Basic Node.js Web Server (Windows Universal)` 模板。

创建项目后，打开 server.js 并使用如下所示的代码替换现有代码：

<UL>

{% highlight JavaScript %}
var http = require('http');

var uwp = require("uwp");
uwp.projectNamespace("Windows");

var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
var pin = gpioController.openPin(5);
pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output)
var currentValue = Windows.Devices.Gpio.GpioPinValue.high;
pin.write(currentValue);

http.createServer(function (req, res) {
    if (currentValue == Windows.Devices.Gpio.GpioPinValue.high){
        currentValue = Windows.Devices.Gpio.GpioPinValue.low;
    }else{
        currentValue = Windows.Devices.Gpio.GpioPinValue.high;
    }
    pin.write(currentValue);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('LED value: ' + currentValue + '\n');
}).listen(1337);

uwp.close();
{% endhighlight %}
</UL>

下面是以上代码所执行的操作：

* 调用 `GpioController.getDefault()` 以获取 GPIO 控制器。
* 然后，我们尝试通过使用 LED 引脚值调用 `GpioController.openPin()` 来打开引脚。
* 获取 `pin` 后，我们使用 `GpioController.write()` 函数将其设置为默认处于关闭状态 \(High\)。
* 当向服务器发出请求时，该 LED 的值将被选中，然后设置为与当前值相反的值。执行此操作将导致随着每个向服务器发出的请求来打开和关闭该 LED。

###将服务器部署到 Windows IoT 核心版设备
* 转到“项目”菜单，然后选择“\<项目名称\> 属性”（也可以在解决方案资源管理器中右键单击项目节点来访问“属性”）。在“远程计算机”文本框中输入 IP 地址。如果你要针对 Minnowboard Max 进行生成，请选择下拉列表中的 `x86`。如果你要针对 Raspberry Pi 2 进行生成，请选择 `ARM`。

* 现在，我们可以随时部署到远程 Windows IoT 核心版设备。只需按 F5（或依次选择“调试”\|“开始调试”）即可开始调试服务器。

* 当服务器正在运行时，打开浏览器，然后输入地址 \<你的设备的地址\>：1337。刷新页面将切换 LED 的开/关状态。

### GitHub
* NTVS IoT 扩展源代码：[https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
* Node.js UWP 包装器源代码：[https://github.com/ms-iot/node-uwp-wrapper](https://github.com/ms-iot/node-uwp-wrapper)
