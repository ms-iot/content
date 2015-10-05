---
layout: default
title: 设置 Windows Remote Arduino
permalink: /zh-CN/win10/SetupWRA.htm
lang: zh-CN
---

#入门

本部分介绍如何设置 Arduino 以及如何将 Windows Remote Arduino 库添加到你的 Windows 项目！

{% include steps.html device="WRA" %}

##Arduino 设置

Windows Remote Arduino 使用 [Firmata 协议](https://github.com/firmata/protocol){:target="_blank"}，该协议已在多种语言版本中实现，包括 Arduino。Arduino 实现称为 [StandardFirmata](https://github.com/firmata/arduino/blob/master/examples/StandardFirmata/StandardFirmata.ino){:target="_blank"}，并且在安装时通过与 Arduino 软件一起预打包来提供。请按照下面的步骤将 StandardFirmata 草图上载到你的 Arduino。

1. 从 [http://arduino.cc](http://arduino.cc){:target="_blank"} 下载并安装 Arduino 软件。
2. 使用 USB 将你的 Arduino 设备连接到计算机。
3. 启动 Arduino 应用程序。
4. 请确保你在“工具”\>“开发板”下选择了正确的 Arduino 开发板。
5. 请确保你在“工具”\>“端口”下选择了正确的 COM 端口。
6. 在 Arduino IDE 中，导航到 *“文件”\>“示例”\>“Firmata”\>“StandardFirmata”*
7. 按“上载”以将 StandardFirmata 草图部署到 Arduino 设备。

除非使用不同的草图重新编程，否则你的 Arduino 从现在开始将永远运行 StandardFirmata 草图。你现在可以选择将你的 Arduino 从计算机中断开，然后采用任何所选方式打开它。如果你希望在设备之间使用推荐的蓝牙配对，则需要[将蓝牙设备连接到 Arduino](https://github.com/ms-iot/remote-wiring/blob/master/bluetooth.md){:target="_blank"}。我们建议使用 [SparkFun Bluetooth Mate Silver](https://www.sparkfun.com/products/12576){:target="_blank"}。


####有关串行通信的说明

当在串行 PIN 0 和 1 上设置蓝牙设备时，某些硬件设置可能需要其他注意事项。

- StandardFirmata 使用串行线或通过 USB 与蓝牙设备进行连接。默认情况下，它使用的波特率为 57600 bps。根据蓝牙设备的配置，你可能需要修改该速率。可在 `setup` 方法中找到它，如下所示：

 `Firmata.begin(57600);`

 只需更改 `begin` 参数以与你的蓝牙设备的配置相匹配。最常见的配置为 115200、57600 和 9600。默认情况下，推荐的 SparkFun Bluetooth Mate 设备使用 115200。如果你不确定蓝牙设备的默认波特率，请查看设备文档。

- 许多 Arduino 设备（例如 Leonardo 和 Yun）使用 PIN 0 和 1 上串行通信的 `Serial1`（而不仅仅是 `Serial`）。如果你使用的是其中一台设备，你将需要更改串行初始化过程。你将希望删除行 `Firmata.begin(57600);` 并将其替换为下面的代码：


{% highlight C++ %}
Serial1.begin( 57600 );	//or your baud rate here, it will be 115200 if using the Bluetooth Mate Silver or Gold
while( !Serial1 );
Firmata.begin( Serial1 );
{% endhighlight %}
