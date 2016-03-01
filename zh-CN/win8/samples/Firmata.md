---
layout: default
title: 标准 Firmata
permalink: /zh-cn/win8/samples/Firmata.htm
lang: zh-cn
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>对 Intel Galileo 第 1 代和第 2 代上的 Windows 的支持将于 2015 年 11 月 30 日结束</u></h4>
	<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台的 Windows 支持。我们看到了平台的一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>
</div>

# Firmata 和 Cylon
[Firmata](http://firmata.org/) 是一项与微控制器（通常通过串行通道）进行通信的协议。此协议暴露硬件 GPIO - 允许应用程序在其他计算机上运行以对其进行直接控制或查询。标准 Firmata 是 Arduino 兼容开发板协议的实现，并且进行了更新以在适用于 IoT 版本的 Windows Developer Program 上运行。

[Cylon.js](http://cylonjs.com/) 是控制如 Robots 或 Internet Of Things 等设备的 Node.js 扩展。

在此示例中，我们将向你展示如何使用这些技术以从运行 Windows 的 Intel Galileo 上远程控制和暴露网页。

# Firmata
标准 Firmata 软件将在 Intel Galileo 开发板上的 Windows 中运行。此项目将使用 _NetworkSerial_ 实现，这允许 Arduino HardwareSerial 在 Network Socket 而非在串行端口上运行。

首先，你需要创建新项目。打开 Visual Studio。依次选择“文件”-\>“新建项目和选择模板”-\>“Visual C++”-\>“适用于 IoT 的 Windows”-\>“Galileo Wiring”应用。

接下来，你需要从 Firmata 下载文件并将其添加到项目目录中。由于它们包含在 main.cpp 内，这些文件不应添加到 Visual Studio 中的项目。

* [Boards.h](https://raw.githubusercontent.com/ooeygui/arduino/dev/Boards.h){:target="_blank"}
* [Firmata.h](https://raw.githubusercontent.com/ooeygui/arduino/dev/Firmata.h){:target="_blank"}
* [Firmata.cpp](https://raw.githubusercontent.com/ooeygui/arduino/dev/Firmata.cpp){:target="_blank"}
* [StandardFirmata.ino](https://raw.githubusercontent.com/ooeygui/arduino/dev/examples/StandardFirmata/StandardFirmata.ino){:target="_blank"}

_ino_ 文件在 Microsoft Windows 上进行编译时要求有其他页眉。为支持生成 ino 文件，我们将其包含进 C++ 文件中。

你需要编辑项目设置 - 在“解决方案资源管理器”中右键单击“项目”，然后选择“属性”。在“配置属性”-\>“C/C++”-\>“预处理器”下，将 `USE_NETWORKSERIAL;_CRT_SECURE_NO_WARNINGS;INTEL_GALILEO;` 添加到“预处理器定义”。

![预处理器]({{site.baseurl}}/Resources/images/FirmataProjectSettings.png)

接下来，将 main.cpp 的内容替换为以下内容：

{% highlight C++ %}
// Main.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "arduino.h"
#include "Servo.h"
#include "Firmata.h"
#include "Firmata.cpp"

#include "StandardFirmata.ino"

int _tmain(int argc, _TCHAR* argv[])
{
    return RunArduinoSketch();
}


{% endhighlight %}

最后，生成此应用并将其部署到你的开发板上。

# Cylon
在开发上通过 Node.js 使用 Cylon.js，从而通过网络套接字与标准 Firmata 通信。

* 安装 [Node.js](http://nodejs.org/){:target="_blank"}。
* 视情况，安装[适用于 Visual Studio 的 Node.js 扩展](https://nodejstools.codeplex.com/){:target="_blank"}。这将允许你调试 Node.js 应用。
* 打开 Node.js 命令提示符，并导航到 Intel Galileo 项目。
* 创建名为 Server 的目录
* 安装 cylon - `npm install cylon`
* 安装 cylon-firmata - `npm install cylon-firmata`
* 在 Server 目录中创建名为 main.js 的文件

将以下代码复制到 main.js 中：

{% highlight js %}
var Cylon = require("cylon");
var net = require("net");


var socket = net.createConnection(27015, 'mygalileo');

// Initialize the robot
var robot = Cylon.robot(
{
  // Change the port to the correct port for your Arduino.
  connection:
  {
      name: 'arduino',
      adaptor: 'firmata',
      port: socket
  },
  device: { name: 'led', driver: 'led', pin: 13 },

  work: function(my)
  {
    // we do our thing here
    every((1).second(), function() { my.led.toggle(); });
  }
});

// start working
robot.start();

{% endhighlight %}

# 在开发计算机上运行 Cylon
从 Node.js 命令提示符中启动程序：

`node main.js`

你可以看到 LED 闪烁。

---
[&laquo; 返回到示例](SampleApps.htm){: .btn .btn-default}
