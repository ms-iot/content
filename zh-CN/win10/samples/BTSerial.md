---
layout: default
title: 蓝牙 RFCOMM 示例
permalink: /zh-cn/win10/samples/BTSerial.htm
lang: zh-cn
---
#蓝牙 RFCOMM 示例

##示例介绍：

RPi2 向蓝牙设备发送消息，在蓝牙设备收到消息后，它会将该消息发送回 rpi2，然后在屏幕上显示它。

1. 所需部件
	- 蓝牙 BlueSMIRF
	- Arduino UNO
	- 蓝牙硬件保护装置
	
2.	步骤
	- 将蓝牙与 Rpi2 配对
	- 将蓝牙硬件保护装置插入 Rip2
	- 将 BlueSMIRF 插入 Uno，后者将连接到任何电脑；连接： 蓝牙 TX-\>PC RX，蓝牙 RX-\>PC TX
        - 按照说明将蓝牙与 Rpi2 引脚配对以进行蓝牙配对： 1234
 
3.	将程序上载到 Arduino UNO

如果你没有 Arduino IDE，请转到[此处](https://www.arduino.cc/)并单击下载、下载 IDE 和安装它。按照[此处](https://github.com/ms-iot/samples/blob/develop/BTSerial/serialReadWrite.ino)内容编写程序 serialReadWrite.ino。它基本上从一个串行端口读取，然后将它获取的内容发送到另一个串行端口以向外发送。


注意：bps 必须为 115200 才能使蓝牙工作。9600 不起作用。
 
4. 编译程序。上载程序。请注意，当你上载程序时，你需要拔出 Tx 和 RX 端口，在上载完成后，将它们重新插入。否则，你将看到会弹出某些错误要求上载
 
5.	在 UWP 中编写程序，并将其部署到 Rpi2。你可以在[此处](https://github.com/ms-iot/samples/tree/develop/BTSerial)找到完整示例代码。
 
下载[代码](https://github.com/ms-iot/samples/tree/develop/BTSerial)并将应用部署到你的 Rpi2。然后你可以看到示例如何作为回显行为工作



