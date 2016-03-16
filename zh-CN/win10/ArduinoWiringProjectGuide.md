---
layout: default
title: 项目设置
permalink: /zh-cn/win10/ArduinoWiringProjectGuide.htm
lang: zh-cn
---

#Arduino 接线项目指南

本指南将演练使用 Windows IoT 核心版创建、设置和部署 Arduino 接线项目的过程！

Arduino 接线项目将熟悉、易于使用的 Arduino 接线 API 与 Windows IoT Lightning 功能结合使用：后者是一种使用直接内存映射提供显著[性能速度]({{site.baseurl}}/{{page.lang}}/win10/LightningPerformance.htm)的驱动程序。你可以将 Arduino 草图和库复制和粘贴到 IoT 核心版 Arduino 接线项目中，并在你的任何 IoT 核心版设备上运行它们！ 有关详细信息，请参阅此页面的<a href="#develop">开发部分</a>。

##安装 Microsoft IoT 模板！

我们提供了一个 Visual Studio 扩展，该扩展将为 Arduino 接线项目以及其他 Microsoft IoT 项目类型自动安装 VS 模板。转到 [Windows IoT 核心版项目模板扩展页面](https://visualstudiogallery.msdn.microsoft.com/55b357e1-a533-43ad-82a5-a88ac4b01dec)来从 Visual Studio 库下载该扩展！

##创建一个新项目
打开 Visual Studio。依次选择“文件”-\>“新建项目”-\>“Visual C++”-\>“Windows”-\>“Windows IoT 核心版”-\>“适用于 Windows IoT 核心版的 Arduino 接线应用程序”![AppCreate]({{site.baseurl}}/Resources/images/arduino_wiring/appcreate.png)

##更改默认控制器驱动程序

你将需要运行直接内存映射驱动程序来编写 Arduino 接线解决方案！ 有关说明，请参考 [Lightning 设置指南]({{site.baseurl}}/{{page.lang}}/win10/LightningSetup.htm)！

##需要 Windows IoT Core Insider Preview
Arduino 接线应用支持当前仅包含在适用于 Windows IoT 核心版的 Insider Preview 版本中。你可以从我们的[下载页]({{site.baseurl}}/{{page.lang}}/Downloads.htm)下载 Windows 10 IoT 核心版映像。单击你的设备类型的“下载 Insider Preview”。

<A name="develop"></a>

##开发
完成[示例页]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm)上的许多“接线”示例之一，或生成你自己的项目！ 将列出我们创建的任何使用 Arduino 接线编写的示例，如下所示： [Blinky（接线）]({{site.baseurl}}/{{page.lang}}/win10/samples/arduino-wiring/HelloBlinky.htm)。适用于 IoT 项目的经典“Hello World”项目 Blinky 是适合作为你的第一个项目的良好起点！

###移植

已仔细实现 Arduino 接线 API，以便你可以将库和草图复制/粘贴到 Arduino 接线项目中。尽管如此，在某些情况下，你可能需要对草图或库进行轻微修改。我们创建了一个易于遵循的 [Arduino 接线移植指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm)来涵盖这些潜在问题。

##生成和部署

- **可选**使用 Windows IoT Core Watcher 应用程序（或将你的设备连接到监视器）找到设备的 IP 地址。
- 在 Visual Studio 中，确保选择“远程计算机”作为你的部署目标。

![远程计算机]({{site.baseurl}}/Resources/images/arduino_wiring/wiringapp_remotemachine.png)

- 在 Visual Studio 中打开在“调试”上下文菜单中找到的解决方案属性。

![解决方案属性]({{site.baseurl}}/Resources/images/arduino_wiring/wiringapp_properties.png)

- 在“计算机名称”字段中键入远程计算机的计算机名称（默认为 minwinpc）或 IP 地址。如果你已将设备命名为“minwinpc”以外的某个名称，请在登录框中改用该名称。
- 将“需要身份验证”字段更改为“否”

![解决方案属性]({{site.baseurl}}/Resources/images/arduino_wiring/wiringapp_properties2.png)


- 按 F5 来生成并部署项目。
