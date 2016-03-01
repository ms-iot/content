---
layout: default
title: NodejsCylon
permalink: /zh-cn/win10/samples/NodejsCylon.htm
lang: zh-cn
---

##Cylon Node.js（控制台应用程序）示例

{% include VerifiedVersion.md %}

在本示例中，将使用在 Raspberry Pi 2 上运行的 [Cylon](https://www.npmjs.com/package/cylon)，使 Arduino（装有 [Firmata](https://www.npmjs.com/package/firmata)）上的 LED 每秒闪烁一次。

###所需的硬件
* Raspberry Pi 2。
* [Arduino 开发板](https://www.arduino.cc/en/main/products)（本示例中使用的是 Leonardo）。
* USB 至微型 USB 电缆。

###设置电脑
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


###将 Node.js 复制到 Raspberry Pi 2
* 从[此处](http://aka.ms/nodecc_arm)将包含 ARM Node.js \(ChakraCore\) 的 zip 文件下载到你的电脑，并提取文件（node.exe 和 chakracore.dll）。
* 使用 [Windows 文件共享]({{site.baseurl}}/{{page.lang}}/win10/samples/SMB.htm)、[PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) 或 [SSH]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm) 在 Raspberry Pi 2 上创建 `C:\Node.js (ChakraCore)` 文件夹。
* 在 Raspberry Pi 2 上将 node.exe 和 chakracore.dll 复制到 `C:\Node.js (ChakraCore)`。


###创建具有代码的文件来控制 Arduino LED
在电脑上创建一个名为“CylonSample”的新文件夹。打开该文件夹，创建名为 cylonsample.js 的新文件并在其中放入以下内容。

<UL>

{% highlight JavaScript %}
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: 'COM5' }
  },

  devices: {
    led: { driver: 'led', pin: 13 }
  },

  work: function(my) {
    every((1).second(), my.led.toggle);
  }
}).start();
{% endhighlight %}
</UL>

###获取 Cylon
* 打开命令窗口。
* 导航到 CylonSample 文件夹（在上一部分中创建）。
* 运行 `npm install cylon cylon-firmata cylon-gpio cylon-i2c`


###获取 Serialport
**注意：** 即使安装 Cylon 时安装了串行口，你仍需需要获取：

* 与目标设备的处理器体系结构（在本例中为适用于 Raspberry Pi 2 的 ARM）相对应的版本。
* 包括在 Windows 10 IoT 核心版中工作的串行口[更新](https://github.com/voodootikigod/node-serialport/pull/550)。

获取串行口的步骤：

* 复制[此处](http://aka.ms/spcc_zip)的文件并将其解压缩到你的电脑。
* 将 \<解压缩的文件夹\>\\console\\arm\\serialport.node 复制到 \[CylonSample 文件夹路径\]\\node\_modules\\serialport\\build\\Release\\node-v47-win32-arm\\serialport.node **注意：**node-v47-win32-arm 是你将要创建的新文件夹。


###将示例复制到你的 Raspberry Pi 2
在电脑上打开资源管理器窗口并输入 **\\\\\<设备的 IP 地址\>\\C$** 以访问设备上的文件。凭据（如果你之前没有进行更改）为：

   用户名：\<IP 地址或设备名称，默认值为 minwinpc\>\\管理员密码：p@ssw0rd

将电脑上的 CylonSample 文件夹复制到 Raspberry Pi 2 上的 C:\\CylonSample 中。


###在你的 Arduino 和 Raspberry Pi 2 之间设置连接
使用 USB 电缆将你的 Arduino 与 Raspberry Pi 2 相连接执行此操作时，如果你的 Raspberry Pi 2 已连接到监视器，你应该能看到该设备已被识别，如下图中所示：

![Arduino“开始”屏幕]({{site.baseurl}}/Resources/images/Nodejs/arduino-startscreen.jpg)

还需要将端口名称（例如“COM5”）分配给 Arduino。按照以下步骤执行此操作：

* 在已连接到 Raspberry Pi 2 的 PowerShell 中，运行 `devcon status usb*`。在执行此操作时，你看到的设备应该类似于下面的设备：

   USB\\VID\_2341&PID\_8036\\5&3753427A&0&4 名称： USB 串行设备驱动程序正在运行。\* 运行 `reg add "HKLM\SYSTEM\ControlSet001\Enum\usb\VID_2341&PID_8036\5&3753427A&0&4\Device Parameters" /v "PortName" /t REG_SZ /d "COM5" /f`。\* 运行 `shutdown /r /t 0` 以重新启动设备。\* 设备重新启动时，重新连接 PowerShell，便可运行示例代码。


###运行示例！
在 PowerShell 中，运行命令 `& 'C:\Node.js (ChakraCore)\Node.exe' C:\CylonSample\cylonsample.js`。运行该命令后，Arduino 上的 LED（下图中以箭头形式显示）应开始每隔 1 秒闪烁一次。

![Arduino RPi2]({{site.baseurl}}/Resources/images/Nodejs/arduino-rpi2.jpg)


### GitHub
* Node.js \(ChakraCore\) 源代码：[https://github.com/Microsoft/node](https://github.com/Microsoft/node)
* NTVS IoT 扩展源代码：[https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
