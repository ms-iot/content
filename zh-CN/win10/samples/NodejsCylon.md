---
layout: default
title: NodejsCylon
permalink: /zh-CN/win10/samples/NodejsCylon.htm
lang: zh-CN
---

##Cylon Node.js（控制台应用程序）示例
在本示例中，将使用在 Raspberry Pi 2 上运行的 [Cylon](https://www.npmjs.com/package/cylon)，Arduino（装有 [Firmata](https://www.npmjs.com/package/firmata)）上的 LED 将每秒闪烁一次。

###所需的硬件
* Raspberry Pi 2。
* [Arduino 开发板](https://www.arduino.cc/en/main/products)（本示例中使用了 Leonardo）。
* USB 至微型 USB 电缆。

###设置电脑
* 安装 Windows 10。
* 安装 Visual Studio 2015。
* 从[此处](https://github.com/ms-iot/ntvsiot/releases)安装适用于 Windows IoT 的最新 Node.js 工具。
* 安装 [Python 2.7](https://www.python.org/downloads/){:target="_blank"}。
* 从[此处](https://www.arduino.cc/en/Main/Software)安装 Arduino 软件。


###将 Firmata 上载到你的 Arduino
* 使用 USB 电缆将 Arduino 开发板连接到你的电脑。
* 打开 Arduino 软件。
* 转到“工具”-\>“端口”，然后选择你的设备。
* 转到“工具”-\>“开发板”，然后单击你拥有的 Arduino 类型。
* 转到“文件”-\>“示例”-\>“Firmata”，然后选择“StandardFirmata”。这将打开包含 Firmata 示意图的一个新窗口。
* 单击“上载”按钮将该示意图上载到 Arduino 开发板。上载完成后，你应该会看到一条“上载完成”消息。


###将 Node.js 复制到 Raspberry Pi 2
* 在电脑上打开资源管理器窗口并输入 **\\\\\<你的设备的 IP 地址\>\\C$** 以访问设备上的文件。凭据是：

   用户名：\<IP 地址或设备名称，默认值为 minwinpc\>\\管理员密码：p@ssw0rd

  注意： **强烈推荐**你更新管理员帐户的默认密码。请按照在[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)找到的说明进行操作。

* 运行 `& 'C:\Program Files (x86)\Node.js (chakra)\CopyNodeChakra.ps1' -arch <ARM | x86 | x64 > -ip <Device IP Address>`。如果你有 Raspberry Pi 2，请使用 `ARM`。如果你有 MinnowBoard Max，请使用 `x86`。完成此步骤后，Node.js 将位于你的设备上的 `c:\Node.js (Chakra)` 中。**注意：** 如果你尚未通过资源管理器窗口输入凭据，你将收到“拒绝访问”错误。


###创建 Cylon Node.js 文件
创建名为 cylonsample.js 的新文件并在其中放入以下内容。

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

使用名为 C:\\CylonSample 的资源管理器窗口，在设备上为 Node 创建文件夹。然后，将 cylonsample.js 复制到此文件夹中。


###生成 Serialport
生成 [serialport](https://www.npmjs.com/package/serialport)，它是你将复制到 Raspberry Pi 2 的 Cylon 依赖项。因为 serialport 是本机模块，所以我们无法在 Windows IoT 核心版上运行 `npm install` 来生成代码。我们将在电脑上生成，然后将程序包复制到设备。

* 克隆 [serialport](https://github.com/voodootikigod/node-serialport)。
* 根据 [https://github.com/voodootikigod/node-serialport/pull/550](https://github.com/voodootikigod/node-serialport/pull/550) 中的更改来编辑 serialport\_win.cpp。**在 Pull 请求合并之前，此步骤是临时性的**。
* 运行 `npm install nan`。
* 运行 `"[Node.js (Chakra) installation path]\node_modules\npm\bin\node-gyp-bin\node-gyp.cmd" rebuild --module_name=serialport --module_path=. --target_arch=arm`。Node.js \(Chakra\) 的默认安装路径为“c:\\Program Files \(x86\)\\Node.js \(chakra\)”。
* 如果上一步成功执行，你将在 \[serialport 克隆路径\]\\build\\Release 中看到 **serialport.node**
* 将\[ serialport 克隆路径\]\\package.json 中的“module\_path”更改为“./build/release/”。


###安装 Cylon 并将 Serialport 复制到你的 Raspberry Pi 2
* 使用 PowerShell 连接到设备。可在[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)找到具体的操作说明。
* 转至 C:\\CylonSample。
* 创建一个名为 node\_modules 的文件夹（你可以运行 `mkdir node_modules`）。
* 转至 C:\\CylonSample\\node\_modules 并创建一个名为 serialport 的文件夹（你可以运行 `mkdir serialport`）。最终路径应为 C:\\CylonSample\\node\_modules\\serialport
* 将你电脑上的 serialport 克隆中的文件夹和文件复制到设备上的 serialport 文件夹。
* 返回到 C:\\CylonSample。
* 运行 `& 'C:\Node.js (Chakra)\npm.cmd' install cylon cylon-firmata cylon-gpio cylon-i2c`。你可能会看到一些有关版本不匹配的警告，你可以忽略它们。确保在复制 serialport **后**运行此命令。



###在你的 Arduino 和 Raspberry Pi 2 之间设置连接
使用 USB 电缆将你的 Arduino 与 Raspberry Pi 2 相连接执行此操作时，如果你的 Raspberry Pi 2 已连接到监视器，你应该能看到该设备已被识别，如下图中所示：

![Arduino“开始”屏幕]({{site.baseurl}}/Resources/images/Nodejs/arduino-startscreen.jpg)

还需要将端口名称（例如“COM5”）分配给 Arduino。按照以下步骤执行此操作：

* 在已连接到 Raspberry Pi 2 的 PowerShell 中，运行 `devcon status usb*`。在执行此操作时，你看到的设备应该类似于下面的设备：

   USB\\VID\_2341&PID\_8036\\5&3753427A&0&4 名称： USB 串行设备驱动程序正在运行。\* 运行 `reg add "HKLM\SYSTEM\ControlSet001\Enum\usb\VID_2341&PID_8036\5&3753427A&0&4\Device Parameters" /v "PortName" /t REG_SZ /d "COM5" /f`。\* 运行 `shutdown /r /t 0` 以重新启动设备。\* 设备重新启动时，重新连接 PowerShell，以便你可以运行示例代码！


###运行示例！
在 PowerShell 中，运行命令 `& 'C:\Node.js (Chakra)\Node.exe' C:\CylonSample\cylonsample.js`。运行该命令后，Arduino 上的 LED（下图中以箭头形式显示）应开始每隔 1 秒闪烁一次。

![Arduino RPi2]({{site.baseurl}}/Resources/images/Nodejs/arduino-rpi2.jpg)


### GitHub
* Node.js \(Chakra\) 源代码：[https://github.com/Microsoft/node](https://github.com/Microsoft/node)
* NTVS IoT 扩展源代码：[https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
