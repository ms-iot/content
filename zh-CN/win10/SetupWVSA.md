---
layout: default
title: SetupWindowsVirualShieldsArduino
permalink: /zh-CN/win10/SetupWVSA.htm
lang: zh-CN
---

#入门

本部分介绍如何设置适用于 Windows Virtual Shields for Arduino！

{% include steps.html device="WVSA" %}

#针对 Windows Virtual Shields for Arduino 进行设置（Arduino 和电脑）

##硬件

###所需内容
 1. Arduino Uno 或兼容设备。
 2. 蓝牙模块： [SparkFun BlueSMiRF Silver](https://www.sparkfun.com/products/12577){:target="_blank"} 和待连接的 4 条线。

###设置 Arduino
 1. 如有必要，请准备好蓝牙模块（蓝牙模块可能需要在其上附加标题）。
 2. 除下面的一项区别外，请按照接线图（[BlueSMiRF 接线图](https://learn.sparkfun.com/tutorials/using-the-bluesmirf/hardware-hookup){:target="_blank"}）将蓝牙模块连接到 Arduino。

		DIFFERENCE: Use pins 0 and 1 instead of 2 and 3:
		The Bluetooth TX should connect to pin 0 (Arduino RX).
		The Bluetooth RX should connect to pin 1 (Arduino TX).

##软件

###所需内容
 1. Arduino IDE 1.6 或更高版本。
 2. ArduinoJson 库。
 3. 此[存储库](https://github.com/ms-iot/virtual-shields-arduino){:target="_blank"}。

###设置 Arduino IDE
 1. 下载并安装 [Arduino IDE](http://www.arduino.cc/en/Main/Software){:target="_blank"}。
 2. 请尝试下载空草图（仅限设置和循环），以确保你的开发板和端口设置正确无误（可在“工具”菜单下找到）。

###设置 ArduinoJson 库
 1. 从 [ArduinoJson 存储库](https://github.com/bblanchon/ArduinoJson){:target="_blank"}中，克隆存储库或下载压缩文件。
 2. 将整个存储库放入库文件夹（即 Documents\\Arduino\\libraries\\ArduinoJson）。

###设置此存储库。
 1. 克隆此[存储库](https://github.com/ms-iot/virtual-shields-arduino){:target="_blank"}或下载压缩文件。
 2.	将 Arduino/libraries/VirtualShield 文件夹从存储库复制到 Arduino 库（即 Documents\\Arduino\\libraries\\VirtualShield）。

###测试设置
 1. 在 Arduino IDE 中，转到菜单项“文件”-\>“示例”-\>“Virtual Shields”-\>“Hello Blinky”。这应该加载 Hello Blinky 示例。
 2. 在上载之前，请暂时从 Arduino 中删除蓝牙 TX 和 RX 线。（USB 和 蓝牙之间只共享一个串行端口。蓝牙会干扰上载）。
 3. 上载草图。
 4. 将蓝牙 TX 和 RX 线替换进 Arduino PIN 中。（将蓝牙 TX 替换到 Arduino RX，将蓝牙 RX 替换到 Arduino TX）。
 5. 在手机上，在蓝牙设置中将蓝牙设备配对。（BlueSMiRF 默认 PIN 码为 1234。注意： 配对成功后，BlueSMiRF 上的红色闪烁灯会继续闪烁红色。这是预期情况。仅在与应用程序连接后，才会变为绿色。）
 6. 打开 Virtual Shields for Arduino 应用，并查看主屏幕。 
 7. 按 Arduino 上的“重置”按钮。
 5. 应在 Virtual Shields for Arduino 手机应用上看到欢迎消息。

