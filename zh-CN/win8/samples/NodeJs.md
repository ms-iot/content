---
layout: default
title: Node.js
permalink: /zh-cn/win8/samples/NodeJS.htm
lang: zh-cn
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>对 Intel Galileo 第 1 代和第 2 代的 Windows 的支持将于 2015 年 11 月 30 日结束</u></h4>
	<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台提供 Windows 支持。我们看到了平台上一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>
</div>

#Node.js 示例
了解如何在 galileo 上运行 node.js，以及如何从 javscript 文件调用 API。

为此，我们决定使用[转发器和存根](Forwarders.htm)的概念，这将允许模拟或重定向已更改的或丢失的 Win32 API。如果只对 User32.dll 的实现做了一些更改，那么应该会遗留下运行本机扩展时可能会遇到的问题。我们决定在实际的 Node.js 实现中为你提供一个典型示例。

##在 Galileo 上运行节点

1. 请确保你使用的是最新 [Windows 映像](https://connect.microsoft.com/windowsembeddedIoT/Downloads){:target="_blank"}。
1. 在你的映像所在的根目录中创建一个名为 `node` 的目录：
    * 通过使用你电脑上的文件资源管理器，打开 `\\mygalileo\c$`，然后右键单击并创建一个名为 `node` 的新文件夹
1. 从 [nodejs.org v0.10.9](http://nodejs.org/dist/v0.10.9/){:target="_blank"} 下载 32 位 Windows 二进制文件 \(.exe\) 并将其放入新建的 `node` 目录内。
1. 从 [nodejs.org](http://nodejs.org/dist/npm/){:target="_blank"} 下载 npm 的最新压缩版本，并将内容提取到新的 `node` 目录中。
1. 使用[转发器项目](https://github.com/ms-iot/forwarders){:target="_blank"}生成 User32.dll。
1. 将 User32.dll 从转发器项目发布目录复制到 `node` 目录中。
1. 通过使用 Telnet，将此 `node` 文件夹添加到 Galileo 映像的路径，然后使用以下命令重新启动：

~~~
mkdir %systemroot%\system32\config\systemprofile\AppData\Roaming\npm
setx path "%path%;c:\node" /M
shutdown /r /t 0
~~~

* 通过下面的代码节创建一个具有相关内容的 main.js。
    * 通过使用你电脑上的文件资源管理器，打开 `\\mygalileo\c$`，然后右键单击并创建一个名为 `main.js` 的新文本文件
    * 你可以直接从文本编辑器打开此文件，方法是使用文件资源管理器导航到 `\\mygalileo\c$\main.js`。
* 使用 npm 将 ms-iot-wiring 程序包安装到 main.js 所在的位置：

~~~
npm install ms-iot-wiring
~~~

* 通过使用到 Galileo 的 Telnet 连接，将目录更改为 `main.js` 所在的位置。
* 运行以下命令：<kbd>node main.js</kbd>

##代码
下面的代码演示了通过 ms-iot-wiring 扩展可用的 API 的用法。

{% highlight Javascript %}

// Copyright (c) Microsoft Open Technologies, Inc.  All rights reserved.
// Licensed under the MIT License.
// See License.txt in the project root for license information.

var galileo = require("ms-iot-wiring"); // adds the ms-iot-wiring module

var led = 13;

// setup
galileo.pinMode(led, galileo.OUTPUT); // sets pin 13 to output

// loop
while (1)
{
   // Global Variables
   console.log('----- Global Variables -----');
   console.log("LOW: %d", galileo.LOW);
   console.log("HIGH: %d", galileo.HIGH);

   console.log("INPUT: %d", galileo.INPUT);
   console.log("OUTPUT: %d", galileo.OUTPUT);
   console.log("INPUT_PULLUP: %d", galileo.INPUT_PULLUP);

   console.log("CHANGE: %d", galileo.CHANGE);
   console.log("FALLING: %d", galileo.FALLING);
   console.log("RISING: %d", galileo.RISING);

   console.log("LSBFIRST: %d", galileo.LSBFIRST);
   console.log("MSBFIRST: %d", galileo.MSBFIRST);

   // console.log("WLED: %d", galileo.WLED);
   // console.log("LED_BUILTIN: %d", galileo.LED_BUILTIN);

   console.log("PI: %d", galileo.PI);
   console.log("HALF_PI: %d", galileo.HALF_PI);
   console.log("TWO_PI: %d", galileo.TWO_PI);

   // Digital Tests
   console.log('\n----- Digital Tests -----');
   console.log('Digital Write');
   galileo.digitalWrite(13, 0);
   console.log("LED OFF");
   console.log('Delay 1 seconds');
   galileo.delay(1000);
   galileo.digitalWrite(13, 1);
   console.log("LED ON");
   console.log('DelayMicroseconds for 1 second');
   galileo.delayMicroseconds(1000000);

   console.log('Digital Read');
   galileo.digitalRead(2);

   console.log('Millis: %d', galileo.millis());
   console.log('Micros: %d', galileo.micros());

   // shift in: datapin, clockpin, bitorder
   console.log('ShiftIn');
   galileo.shiftIn(1, 2, galileo.LSBFIRST);
   console.log('ShiftOut');
   galileo.shiftOut(1, 2, galileo.LSBFIRST, 10);

   // Analog Tests
   console.log('\n----- Analog Tests -----');
   console.log('AnalogWriteResolution');
   galileo.analogWriteResolution(12);
   console.log('AnalogReadResolution');
   galileo.analogReadResolution(12);
   console.log('AnalogWrite');
   galileo.analogWrite(3, 4095);

   // SPI Tests
   console.log('\n----- SPI Tests -----');
   var spi = galileo.Spi();
   console.log('Checking whether SPI is defined: ' + spi);
   console.log('Calling Spi Begin');
   spi.begin();
   console.log('Calling Spi SetDataMode');
   spi.setDataMode(galileo.SPI_MODE1);
   console.log('Calling Spi SetClockDivider');
   spi.setClockDivider(galileo.SPI_CLOCK_DIV64);
   console.log('Calling Spi SetBitOrder');
   spi.setBitOrder(galileo.LSBFIRST);
   console.log('Calling Spi Transfer');
   spi.transfer(10);
   console.log('Calling Spi End');
   spi.end();

   // Wire/I2C Tests
   console.log('\n----- Wire/I2C Tests -----');
   var wire = galileo.Wire();
   console.log('Wire Begin');
   wire.begin();

   console.log('\nWire BeginTransmission');
   wire.beginTransmission(0x25); // transmit to device, device address is specified in datasheet

   console.log('Wire Write: 1 integer argument');
   console.log('Wrote: ' + wire.write(10) + ' bytes');
   console.log('Wire EndTransmission');
   console.log('Status of transmission: ' + wire.endTransmission());

   console.log('\nwire write: 1 string argument');
   console.log('wrote: ' + wire.write("hello") + ' bytes');
   console.log('wire endtransmission with true stop');
   console.log('status of transmission: ' + wire.endTransmission(true));

   console.log('Wire Write: 2 arguments');
   var array = [0x01, 0x02, 0x03, 0x04];
   console.log('wrote ' + wire.write(array, 4) + ' bytes');
   console.log('wire endtransmission with false stop');
   console.log('status of transmission: ' + wire.endTransmission(false));

   console.log('Return values:');
   console.log('0:success');
   console.log('1:data too long to fit in transmit buffer');
   console.log('2:received NACK on transmit of address');
   console.log('3:received NACK on transmit of data');
   console.log('4:other error\n');

   console.log('Wire RequestFrom with 2 paramaters: address and quantity');
   console.log('bytes ready: ' + wire.requestFrom(0x25, 1));
   console.log('Wire RequestFrom with 3 paramaters: address, quantity, and true stop');
   console.log('bytes ready: ' + wire.requestFrom(0x25, 1, true)); // stop is a boolean. true will send a stop message where false will restart the connection keeping it active
   console.log('wire requestfrom with 3 paramaters: address, quantity, and false stop');
   console.log('bytes ready: ' + wire.requestFrom(0x25, 1, false));

   console.log('Wire Available');
   console.log('Available bytes: ' + wire.available());
   console.log('Wire Read');
   console.log('Read: ' + wire.read());
   console.log('Wire OnReceive');
   wire.onReceive();
   console.log('\nWire OnRequest');
   wire.onRequest();

   console.log('\n----- End of Loop -----\n\n');
   galileo.delay(5000);
}

{% endhighlight %}


---
[&laquo; 返回到示例](SampleApps.htm){: .btn .btn-default}
