---
layout: default
title: BACnetAdapterTutorial
permalink: /zh-cn/win10/samples/BACnetAdapterTutorial.htm
lang: zh-cn
---

# BACnet 示例

{% include VerifiedVersion.md %}

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\AllJoyn\Samples\BACnetAdapter` 来查找此示例的源代码。示例代码在 C++ 中可用。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。


本文档介绍了适用于 Windows 10 的设备系统网桥的 BACnet 适配器设置。当使用它时，你将能够向 AllJoyn 公开 BACnet 设备。

## 什么是 BACnet？

BACnet 是用于生成自动化和控制网络的通信协议。它是 [ASHRAE](http://www.bacnet.org){:target="_blank"}、ANSI 和 ISO 16484-5 标准协议。BACnet 专用于允许生成自动化和控制系统的通信，用于加热、通风和空调控制 \(HVAC\)、照明控制、访问控制等应用程序以及火灾检测系统及其相关设备。BACnet 协议为计算机化的生成自动化设备提供机制来交换信息，而不考虑它们所执行的特定生成服务。BACnet 是基于对象的标准。BACnet 设备包含一组对象。BACnet 对象是设备内的信息集合。典型的对象具有基于对象的功能和目的的属性集合。BACnet 设备表示为“设备对象”，它只是一个表示在给定的真实设备中实际存在的功能的对象集合。

有关 BACnet 的详细信息，请参阅 [BACnet 标准](http://www.bacnet.org){:target="_blank"}...

## 先决条件

1. 具有安装了 [AllJoyn 的 IoT 资源管理器]({{site.baseurl}}/zh-cn/win10/AllJoyn.htm#AllJoynExplorer){:target="_blank"}的 Windows 10 的电脑或笔记本电脑。
2. Alerton 中的 [Envision for BACtalk](http://alerton.com/zh-cn/Pages/Product.aspx?category=Management&cat=ECC-Alerton&pid=Envision){:target="_blank"} 工具用于配置 BACnet 设备。
3. 某些 BACnet 设备，如下所示
 - Alerton 中的 [BCM-ETH](http://alerton.com/zh-cn/Pages/Product.aspx?category=Integration&cat=ECC-Alerton&pid=BCMETH){:target="_blank"} BACnet 路由器和控制器
 - Alerton 中的 [BCM MS/TP](http://alerton.com/zh-cn/Pages/Product.aspx?category=Integration&cat=ECC-Alerton&pid=BCMMSTP){:target="_blank"} BACnet 控制模块
 - Alerton 中的一个或多个 [VLC-853](http://alerton.com/zh-cn/Pages/Product.aspx?category=Field%20Controller&cat=ECC-Alerton&pid=VLC853){:target="_blank"} BACnet 字段控制器

> 已使用上述 BACnet 硬件来在 AllJoyn 上控制和公开两个占位传感器、两个温度传感器、两个温度控制器和一个主体控制器。

![BACnetHardware]({{site.baseurl}}/Resources/images/AllJoyn/BACnetHardware.jpg)

## 设置步骤
1. 在 Windows 10 桌面版上安装先决条件中列出的所需工具和驱动程序（请参阅其各自的文档以确定如何操作）。
2. 使用 Envision for BACtalk 工具配置 BACnet 设备。本文档不会涉及到有关该主题的详细信息，请参考工具的文档来了解应如何配置 BACnet。
3. 设置你的 Raspberry Pi2（如果你面向该设备），请参阅[此处]({{site.baseurl}}/zh-cn/win10/SetupRPI.htm){:target="_blank"}的说明。
5. 部署 BACnet 适配器

>请注意，在 Windows 10 中，当计算机具有__需要在相同计算机上进行交互__的__多个 AllJoyn 现代应用程序__时，用户必须为这些现代应用程序__添加环回免除__。因此，如果在相同计算机上同时运行 ZigBee 适配器和 AllJoyn 的 IoT 资源管理器，将需要为这 2 个应用程序添加环回免除。从 Visual Studio 2015 中运行的应用程序不需要它。请注意，当从 Visual Studio 2015 部署应用程序时，环回免除面向已安装应用程序的生命周期。这意味着之后你可以直接（而不是从 Visual Studio 2015）启动该应用，并且它将具有环回免除。

设置环回异常：

 1. 查找你希望启用环回免除的现代应用程序的安装文件夹。它位于“C:\\Users\*username\*\\AppData\\Local\\Packages”![LoopBackException]({{site.baseurl}}/Resources/images/AllJoyn/BACnetLoopBackException.png) 上
 2. 复制安装文件夹名称，该名称也是应用程序 ID。
 3. 在提升的命令提示符处运行以下命令：`CheckNetIsolation LoopbackExempt -a -n=installation-folder-name`
 4. 重新启动应用程序。

## 在 Windows 10 计算机上部署 BACnet 适配器
1. 在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载包含我们所有示例的 zip。
2. 在 Visual Studio 中打开 `samples-develop\AllJoyn\Samples\BACnetAdapter\BACnetAdapter.sln`。
4. 在 Visual Studio 中选择相关目标（x86 或 x64）并生成解决方案。你现在已准备好启动它，因此如果所面向的 Windows 10 设备具有屏幕，请在桌面上启动或调试 HeadedAdapterApp 项目；如果没有，则启动或调试 HeadlessAdapterApp。如果需要，请参阅[此处]({{site.baseurl}}/zh-cn/win10/AppDeployment.htm){:target="_blank"}的说明以了解远程调试。

## BACnet 适配器详细信息 
BACnet 适配器使用托管 C++ 编写。它使用 sourceforge.net 上提供的[开放 BACnet 堆栈](http://bacnet.sourceforge.net/){:target="_blank"}来与 BACnet 设备交互，并通过 BridgeRT 接口在 AllJoyn 上公开它们。在 AllJoyn 中公开 BACnet 设备，如下所示：
  
- 每台 BACnet 设备都作为 AllJoyn 服务（总线附件）公开
- BACnet 设备的每个 BACnet 对象都作为 AllJoyn 总线对象公开
- BACnet 对象的每个 BACnet 属性都作为 AllJoyn 属性公开。请注意，BACnet 对象的所有属性都分组到单个 AllJoyn 接口下。

![BACnetToAllJoynMap]({{site.baseurl}}/Resources/images/AllJoyn/BACnetToAllJoynMap.png)

### 一组 BACnet 设备的 AllJoyn 的 IoT 资源管理器视图

![BACnetAJX1]({{site.baseurl}}/Resources/images/AllJoyn/BACnetAJX1.png)

在选择 BACnet001 VLC-2 设备后，我们将看到该设备公开的所有对象。

![BACnetAJX2]({{site.baseurl}}/Resources/images/AllJoyn/BACnetAJX2.png)

### 类概述

![ClassMap]({{site.baseurl}}/Resources/images/AllJoyn/BACnetClassMap.png)

__BACnetAdapter__ 类是 BACnet 适配器的主类。此类派生自 __IAdapter__（BridgeRT 接口），并且包含 __BACnetAdapterDevice__ 实例的集合和 __BACnetInterface__ 类的实例。BACnetAdapter 类使用 __BACnetAdapterSignal__ 发出设备到达或删除的信号。

__BACnetInterface__ 类以及 __BACnetServiceHandlers__ 类处理与 BACnet 设备的交互。它们使用[开放 BACnet 堆栈](http://bacnet.sourceforge.net){:target="_blank"}提供的机制来处理 BACnet 设备。有关其体系结构和它提供的 API 的更多详细信息，请参阅开放 BACnet 堆栈文档。

__BACnetAdapterDevice__ 类表示 BACnet 设备。此类派生自 __IAdapterDevice__（BridgeRT 接口），并且包含 __BACnetAdapterProperty__ 和 __BACnetAdapterSignal__ 实例的集合。

__BACnetAdapterProperty__ 类表示 BACnet 对象，并且派生自 __IAdapterProperty__（BridgeRT 接口）。此类包含 __BACnetAdapterAttribute__ 实例的集合。

__BACnetAdapterAttribute__ 类表示 BACnet 属性，并且派生自 __IAdapterAttribute__（BridgeRT 接口）。BACnet 属性更改通知通过 BACnetAdapterDevice 类中的 BACnetAdapterSignal 的实例进行处理。该属性的值由 __BACnetAdapterValue__ 类的实例托管。

__BACnetAdapterValue__ 类用于存储 BACnet 属性的值。此类派生自 __IAdapterValue__（BridgeRT 接口）。

__BACnetAdapterSignal__ 类用于处理通知，例如设备到达或删除以及值的更改。此类派生自 __IAdapterSignal__（BridgeRT 接口）。

