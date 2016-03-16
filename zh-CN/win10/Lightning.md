---
layout: default
title: 使用 Lightning
permalink: /zh-cn/win10/Lightning.htm
lang: zh-cn
---
{:.page-title}
#Lightning

##Windows 10 IoT 核心版设备的 Arduino 接线

若要支持在 Windows 10 IoT 核心版设备上使用现有的 Arduino 接线草图，现在可在 Visual Studio 中使用 Arduino 接线的项目模板。这些项目使用可提供高性能的直接内存映射的驱动程序。

若要开始生成适用于 Raspberry Pi2 和 Minnowboard Max 的 Arduino 接线项目，请参阅 [Arduino 接线项目指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)<br/>

#### 注意： Dragonboard 410c 不支持 Arduino 接线。

##Windows 10 IoT 核心版 UWP Lightning 提供程序

可使用一组适用于 GPIO、SPI 和 I2C 总线的 Windows 10 IoT 核心版 UWP 提供程序来利用 Windows 10 IoT 核心版设备上的直接内存映射的驱动程序的性能改进。

只需更改个别代码即可支持使用现有应用中的库。若要开始使用应用中的提供程序库，请参阅 [Microsoft.IoT.Lightning.Providers 库和示例代码]({{site.baseurl}}/{{page.lang}}/win10/LightningProviders.htm)。

##需要 Windows 10 IoT 核心版
目前仅 Windows 10 IoT 核心版中包含 Arduino 接线和 Lightning 提供程序支持。

你可以从我们的[下载页]({{site.baseurl}}/{{page.lang}}/Downloads.htm)下载 Windows 10 IoT 核心版映像。根据你的设备类型，单击“下载 Windows 10 IoT 核心版”或“获取 IoT 核心版仪表板”。

Raspberry Pi2 和 Minnowboard Max 目前均受支持。
