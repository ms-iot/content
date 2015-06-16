---
layout: default
title: 驱动程序实验
permalink: /zh-CN/win10/samples/DriverLab.htm
lang: zh-CN
---

##为 Windows IoT Core 编写驱动程序

###是否设置了环境？

假设你已经[设置了环境]({{site.baseurl}}/{{page.lang}}/GetStarted.htm)、有正常运行的 Visual Studio，并且有一台运行 Windows IoT Core 的设备。

请记住，如需帮助和建议，请尽管[联系我们]({{site.baseurl}}/{{page.lang}}/Community.htm#contact)！

###实验目标
在此实验中，我们将逐步介绍创建和安装将在 Windows IoTCore 上运行的简单外围设备驱动程序的过程。具体而言，我们将使用 Windows 驱动程序工具包 \(WDK\) 和 Windows 驱动程序框架 \(WDF\) API 创建内核模式设备框架驱动程序 \(KMDF\)。

###实验描述
用于此实验的驱动程序的名称是 `gpiokmdfdemo`，而且它将从称为 `BinkyApp.exe` 的简单用户模式 Win32 控制台应用程序接收不同的 IOCTL 命令。这些 IOCTL 命令将告诉驱动程序要将哪些 GPIO 引脚设置为高或低。驱动程序 `gpiokmdfdemo` 将依次与 Windows IoT Core 中的 GpioClx（GPIO 类扩展）通信来完成这些请求。查看下图来熟悉此实验的内部工作原理。

###实验源代码和二进制文件
可以在此处获取驱动程序的源代码：`<Samples-Folder>\DriverSamples\gpiokmdfdemo`。可以在此处获取控制台应用程序的源代码：`<Samples-Folder>\DriverSamples\consoleapp\BlinkyApp`。此外，我们还提供了针对 x86 和 ARM 体系结构的控制台应用程序的预生成二进制文件。可以在此处获取这些二进制文件：`<Samples-Folder>\DriverSamples\BlinkyApp`。

<br/>

![驱动程序实验概述]({{site.baseurl}}/images/DriverLab/drivers-overview.png)

本实验的教程将以动手实践式的任务形式提供，并已划分为以下部分：

* 打开现有驱动程序的项目
* 使用 Visual Studio 生成驱动程序
* 将驱动程序手动部署到 Windows IoT Core 设备

###注意
在这些教程中，将需要你运行各种命令。请使用提升的 Windows 命令提示符 \(cmd.exe\) 运行这些命令。


###教程

1. [打开现有驱动程序的项目]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab1.htm) – 在此练习中，你将要打开一个现有的驱动程序，以查看驱动程序的基本结构。

2. [使用 Visual Studio 生成驱动程序]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab2.htm) – 在此练习中，你将使用 Visual Studio 为特定的平台编译驱动程序。

3. [部署驱动程序并确认安装]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab3.htm) – 此练习将演示如何手动复制驱动程序并将其安装到 Windows IoT Core 设备。
