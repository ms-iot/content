---
layout: default
title: 驱动程序实验
permalink: /zh-cn/win10/samples/DriverLab.htm
lang: zh-cn
---

#为你的 Windows 10 IoT 核心版设备创建通用驱动程序 \(UD\)

{% include VerifiedVersion.md %}

如果你对 Windows 通用驱动程序还不太熟悉，我们强烈建议你先阅读以下材料：

* [生成通用驱动程序 - Channel9 视频](https://channel9.msdn.com/Blogs/WinHEC/Building-a-Universal-Driver)

* \[通用 Windows 驱动程序入门 - MSDN\]\(https://msdn.microsoft.com/zh-cn/library/windows/hardware/dn941241(v=vs.85).aspx\)

<br/>

##是否已设置开发环境？

* 可以在[此处]({{site.baseurl}}/{{page.lang}}/win10/SetupPCRPI.htm)找到有关如何使用 Visual Studio 2015 设置开发环境的说明

* 此外，你需要安装 Windows 驱动程序工具包 \(WDK\)，该工具包可从[此处](https://msdn.microsoft.com/zh-cn/windows/hardware/dn913721)进行下载

<br/>

##概述
现在，我们将指导你完成创建和安装将在任意 Windows 10 IoT 核心版设备上运行的简单外围设备驱动程序的过程。更具体地说，我们将使用 Windows 驱动程序工具包 \(WDK\) 和 Windows 驱动程序框架 \(WDF\) API 生成内核模式设备框架 \(KMDF\) 驱动程序。此驱动程序专门生成为一个通用驱动程序。

<br/>

##描述
在本示例中，驱动程序名称为 `gpiokmdfdemo`。此驱动程序将从名为 `BlinkyApp.exe` 的简单用户模式 Win32 控制台应用程序接收不同的 IOCTL 命令/消息。这些 IOCTL 命令将指示驱动程序要将哪些特定 GPIO 引脚设置为高或低。示例驱动程序 \(`gpiokmdfdemo`\) 将进而与 Windows 10 IoT 核心版中的 GpioClx（GPIO 类扩展）通信来完成这些请求。查看下图来熟悉此驱动程序示例的内部工作原理。

<br/>

![驱动程序实验概述]({{site.baseurl}}/Resources/images/DriverLab/drivers-overview.png)

<br/>

##源代码和二进制文件
你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\DriverSamples`（你将在其中发现以下 3 个文件夹）来查找此示例的源代码：

1. [`DriverSamples\BlinkyApp`](https://github.com/ms-iot/samples/tree/develop/DriverSamples/BlinkyApp){:target="_blank"}，包含面向 x86 和 ARM architectures.gpiokmdfdemo 的控制台应用程序的预生成二进制文件

2. [`DriverSamples\consoleapp\BlinkyApp`](https://github.com/ms-iot/samples/tree/develop/DriverSamples/consoleapp/BlinkyApp){:target="_blank"}，包含控制台应用程序的源代码。

3. [`DriverSamples\gpiokmdfdemo`](https://github.com/ms-iot/samples/tree/develop/DriverSamples/gpiokmdfdemo){:target="_blank"}，包含驱动程序的源代码。

<br/>

##注意：
* 本示例中的部分说明将要求在命令提示符下运行不同的命令。请确保在运行这些命令时使用提升的 Windows 命令提示符 \(cmd.exe\)。
* 此外，某些说明将要求从 PowerShell 运行命令。

<br/>

##后续步骤：

1. [打开示例驱动程序的项目]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab1.htm) – 在本部分中，你将打开该示例驱动程序以查看驱动程序的基本结构。

2. [使用 Visual Studio 和 WDK 生成通用驱动程序]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab2.htm) – 在本部分中，你将使用 Visual Studio 和 WDK 为特定的设备体系结构编译一个通用驱动程序。

3. [部署示例驱动程序并确认安装成功]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab3.htm) – 本部分演示了将示例驱动程序安装在 Windows IoT 核心版设备上的方法。
