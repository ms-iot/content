---
layout: default
title: NodejsWUCylon
permalink: /zh-cn/win10/samples/NodejsWUCylon.htm
lang: zh-cn
---

##Cylon Node.js（通用 Windows）示例

{% include VerifiedVersion.md %}

在本示例中，将使用在 Raspberry Pi 2 上运行的 [Cylon](https://www.npmjs.com/package/cylon) 来控制已连接到 Arduino（装有 [Firmata](https://www.npmjs.com/package/firmata)）的伺服。


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
* 单击“上载”按钮将该示意图上载到 Arduino 开发板。上载完成时，你应该会看到一条“上载完成”消息。


###创建新的 Cylon（通用 Windows）项目
启动 Visual Studio 2015 并创建新项目（“文件”\|“新建项目...”）。在“`New Project`”对话框中，导航到“`Node.js`”，如下所示（在该对话框的左侧窗格中： “模板”\|“JavaScript”\|“Node.js”）。

选择 `Basic Node.js Cylon Application (Universal Windows)` 模板（如下所示）、输入项目名，然后按“确定”。

![Node.js Cylon 项目对话框]({{site.baseurl}}/Resources/images/Nodejs/nodejswucylon-newprojectdialog.png)

等待 Cylon 程序包及其依赖项出现以完成下载。这会由 npm 输出窗口中的以下消息指示。

![Node.js 输出窗口]({{site.baseurl}}/Resources/images/Nodejs/npm-output-window.png)

在解决方案资源管理器中右键单击 npm 节点（如下所示），然后选择“更新 npm 程序包”。此步骤将运行 npm 重复数据消除，并使用与 Node.js UWP 兼容的[版本](https://github.com/ms-iot/node-serialport/tree/uwp)更新 [serialport](https://www.npmjs.com/package/serialport)（Cylon 依赖项）。

![Node.js Npm 菜单]({{site.baseurl}}/Resources/images/Nodejs/npm-update-menu.png)


###在你的 Arduino 和 Raspberry Pi 2 之间设置连接
使用 USB 电缆将你的 Arduino 与 Raspberry Pi 2 相连接。如果你的 Raspberry Pi 2 已连接到监视器，你应该能看到该设备已被识别，如下图所示（设备的名称可能是“Arduino Uno”，而不是“USB 串行设备”）：

![Arduino Uno 启动屏幕]({{site.baseurl}}/Resources/images/Nodejs/arduino-uno-startscreen.png)

我们现在需要获取标识 Arduino 并将在示例代码中使用的字符串。按照以下步骤执行此操作：

* 在已连接到 Raspberry Pi 2 的 PowerShell 窗口中，运行 `devcon status usb*`。在执行此操作时，你看到的设备应该类似于下面的设备：

   USB\\VID\_2341&PID\_0043\\85436323631351311141 名称： USB 串行设备驱动程序正在运行。

* 将 app.js 中的代码替换为以下所示代码。如果使用 USB 设备 ID，请务必在两个 \\ 字符之后添加额外的 \\。例如在上述示例中，代码中的最终字符串应为“USB\\\\VID\_2341&PID\_0043\\\\85436323631351311141”。
  
<UL>

{% highlight JavaScript %}
var Cylon = require('cylon');

Cylon.robot({
    connections: {
        arduino: { adaptor: 'firmata', port: 'USB\\VID_2341&PID_0043\\85436323631351311141' }
    },

    devices: {
        servo: { driver: 'servo', pin: 3 }
    },

    // The "work" will move the servo from angle 45 to 90 to 135.
    work: function (my) {
        var angle = 45;
        my.servo.angle(angle);
        every((1).second(), function () {
            angle = angle + 45;
            if (angle > 135) {
                angle = 45
            }
            my.servo.angle(angle);
        });
    }
}).start();
{% endhighlight %}
</UL>

* 使用引脚 3 将伺服附加到 Arduino 开发板（你还可以在 app.js 中更改引脚编号）。在下面显示的设置中，信号线已连接到引脚 3，电源为 Raspberry Pi 2。

![Arduino 伺服 RPi2]({{site.baseurl}}/Resources/images/Nodejs/arduino-servo-rpi2.png)


###将应用部署到 Raspberry Pi 2
* 转到“项目”菜单，然后选择“\<项目名称\> 属性”（也可以在解决方案资源管理器中右键单击项目节点来访问“属性”）。在“远程计算机”文本框中输入 IP 地址。如果你要针对 Raspberry Pi 2 进行生成，请选择下拉菜单中的 `ARM`。

* 我们现在随时可以将应用部署到 Raspberry Pi 2。只需按 F5（或依次选择“调试”\|“开始调试”）即可开始调试应用。此步骤还将开始旋转伺服上的马达。


### GitHub
* Node.js \(Chakra\) 源代码：[https://github.com/Microsoft/node](https://github.com/Microsoft/node)
* NTVS IoT 扩展源代码：[https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
