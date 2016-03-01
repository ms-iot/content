---
layout: default
title: IoT 核心版默认应用
permalink: /zh-cn/win10/samples/IoTDefaultApp.htm
lang: zh-cn
---

#IoT 核心版默认应用示例

我们将创建一个默认应用来演示如何为 Windows 10 IoT 核心版设备创建简单的启动应用，该应用可执行某些基本设备管理。

这是一个有外设示例。若要更好地了解什么是有外设模式以及如何将你的设备配置为有外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。

###IoT 核心版默认应用内容

IoT 核心版默认应用是创建 IoT 核心版设备用户体验的一个良好示例。

####设置

在首次启动时，系统将引导你通过快速设置体验。设置语言并连接 WLAN。如果你没有 USB WLAN 适配器，可在以后随时连接。

![Windows 10 IoT 核心版上的 DefaultApp 设置]({{site.baseurl}}/Resources/images/iotcoredefaultapp/defaultapp_oobe.png)

####设备信息

这是可供你开始使用的主页面。默认应用旨在帮助你将电脑链接到设备。在电脑上进行各种开发、调试和设计！

![Windows 10 IoT 核心版上的 DefaultApp]({{site.baseurl}}/Resources/images/iotcoredefaultapp/DefaultAppRpi2.png)

连接到设备后，请使用此处所列的设备名称和 IP 地址。

####教程

有关如何使开发板与电脑相连接的一组快速说明。如果你在上网，则可以在[此处](http://ms-iot.github.io/content/zh-cn/win10/StartCoding.htm)找到相同的一组说明。

![Windows 10 IoT 核心版上的 DefaultApp 教程]({{site.baseurl}}/Resources/images/iotcoredefaultapp/defaultapp_tutorial.png)

####设置

通过“设置”，你可以重新配置语言、通过 WLAN 连接以及连接蓝牙设备。

![Windows 10 IoT 核心版上的 DefaultApp 设置]({{site.baseurl}}/Resources/images/iotcoredefaultapp/defaultapp_settings.png)

###在 Visual Studio 中加载项目

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\IotCoreDefaultApp` 来查找此示例的源代码。示例代码为 C\#。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

{% include_relative AppDeploymentCS.md %}

完成所有设置后，你应该可以在 Visual Studio 中按 F5。IoT 核心版默认应用将在 Windows IoT 设备上部署并启动。

请注意，这是在 Windows IoT 核心版映像中作为启动应用默认交付的相同代码。

{% include_relative IotStartupContent.md %}
