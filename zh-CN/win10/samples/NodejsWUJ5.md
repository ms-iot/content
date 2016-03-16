---
layout: default
title: NodejsWUJ5
permalink: /zh-cn/win10/samples/NodejsWUJ5.htm
lang: zh-cn
---

##Johnny-Five Node.js（通用 Windows）示例

{% include VerifiedVersion.md %}

在本示例中，将使用在 Raspberry Pi 2 上运行的 [Johnny-Five](https://www.npmjs.com/package/johnny-five) 来控制已连接到 Arduino（装有 [Firmata](https://www.npmjs.com/package/firmata)）的伺服。


###所需的硬件
* Raspberry Pi 2。
* [Arduino 开发板](https://www.arduino.cc/en/main/products)（本示例中使用的是 Uno）。
* 双 USB B 型接头电缆。
* 伺服。


###设置电脑
* 安装[含有 11 月更新](http://windows.microsoft.com/zh-cn/windows-10/windows-update-faq)的 Windows 10。
* 安装 Visual Studio 2015 Update 1。
* 从[此处](http://aka.ms/ntvsiotlatest)安装适用于 Windows IoT 的最新 Node.js 工具。
* 安装 [Python 2.7](https://www.python.org/downloads/){:target="_blank"}。
* 从[此处](https://www.arduino.cc/en/Main/Software)安装 Arduino 软件。
* 安装[适用于 Windows 的 Git](http://git-scm.com/download/win)。确保 Git 包含在“路径”环境变量中。


###将 Firmata 上载到你的 Arduino
* 使用 USB 电缆将 Arduino 开发板连接到你的电脑。
* 打开 Arduino 软件。
* 转到“工具”-\>“端口”，然后选择你的设备。
* 转到“工具”-\>“开发板”，然后单击你拥有的 Arduino 类型。
* 转到“文件”-\>“示例”-\>“Firmata”，然后选择“StandardFirmata”。这将打开包含 Firmata 示意图的一个新窗口。
* 单击“上载”按钮将该示意图上载到 Arduino 开发板。上载完成后，你应该会看到一条“上载完成”消息。


###创建新的 Johnny-Five（通用 Windows）项目
启动 Visual Studio 2015 并创建新项目（“文件”\|“新建项目...”）。在“`New Project`”对话框中，导航到“`Node.js`”，如下所示（在该对话框的左侧窗格中： “模板”\|“JavaScript”\|“Node.js”）。

选择 `Basic Node.js Johnny-Five Application (Universal Windows)` 模板（如下所示）、输入项目名，然后按“确定”。

![Node.js Johnny-Five 项目对话框]({{site.baseurl}}/Resources/images/Nodejs/nodejswuj5-newprojectdialog.png)

等待 Johnny-Five 程序包及其依赖项出现以完成下载。这会由 npm 输出窗口中的以下消息指示。

![Node.js 输出窗口]({{site.baseurl}}/Resources/images/Nodejs/npm-output-window.png)

在解决方案资源管理器中右键单击 npm 节点（如下所示），然后选择“更新 npm 程序包”。此步骤将运行 npm 重复数据消除，并使用与 Node.js UWP 兼容的[版本](https://github.com/ms-iot/node-serialport/tree/uwp)更新 [serialport](https://www.npmjs.com/package/serialport)（Johnny-Five 依赖项）。

![Node.js Npm 菜单]({{site.baseurl}}/Resources/images/Nodejs/npm-update-menu.png)


###在你的 Arduino 和 Raspberry Pi 2 之间设置连接
使用 USB 电缆将你的 Arduino 与 Raspberry Pi 2 相连接。如果你的 Raspberry Pi 2 已连接到监视器，你应该能看到该设备已被识别，如下图所示（设备的名称可能是“Arduino Uno”，而不是“USB 串行设备”）：

![Arduino Uno 启动屏幕]({{site.baseurl}}/Resources/images/Nodejs/arduino-uno-startscreen.png)


* 将 app.js 中的代码替换为以下所示代码。
  
<UL>

{% highlight JavaScript %}
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function () {
    
    var servo = new five.Servo(3);
    
    // Sweep from 0-180 and repeat.
    servo.sweep();
});
{% endhighlight %}
</UL>

* 使用引脚 3 将伺服附加到 Arduino 开发板（你还可以在 app.js 中更改引脚编号）。在下面显示的设置中，信号线已连接到引脚 3，电源为 Raspberry Pi 2。

![Arduino 伺服 RPi2]({{site.baseurl}}/Resources/images/Nodejs/arduino-servo-rpi2.png)


###将应用部署到 Raspberry Pi 2
* 转到“项目”菜单，然后选择“\<项目名称\> 属性”（也可以在解决方案资源管理器中右键单击项目节点来访问“属性”）。在“远程计算机”文本框中输入 IP 地址。如果你要针对 Raspberry Pi 2 进行生成，请选择下拉菜单中的 `ARM`。

* 我们现在随时可以将应用部署到 Raspberry Pi 2。只需按 F5（或依次选择“调试”\|“开始调试”）即可开始调试应用。此步骤还将开始旋转伺服上的马达。


### GitHub
* NTVS IoT 扩展源代码：[https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
