---
layout: default
title: ZigBeeAdapterTutorial
permalink: /zh-cn/win10/samples/ZigBeeAdapterTutorial.htm
lang: zh-cn
---

# ZigBee 适配器示例

{% include VerifiedVersion.md %}

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\AllJoyn\Samples\ZigBeeAdapter` 来查找此示例的源代码。示例代码在 C\# 中可用。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

本文档介绍了适用于 Windows 10 的设备系统网桥 \(DSB\) 的 ZigBee 适配器设置。当使用它时，你将能够向 AllJoyn 公开 ZigBee 设备。

## 什么是 ZigBee？

ZigBee 是一种低成本、低功耗的无线通信标准，旨在允许设备互相通信。除了通信协议，ZigBee 标准还定义了配置文件（如 ZigBee 光链路或家庭自动化），它本身定义设备。例如，ZigBee 光链路将定义光的含义、可调光的含义等等。每台设备使用 ZigBee 群集库 \(ZCL\) 中定义的群集来指定它们可以执行的操作、公开的内容...

请参阅 [ZigBee 标准](http://www.zigbee.org){:target="_blank"}详细了解 ZigBee、ZigBee 配置文件、ZCL 群集等。

首字母缩略词：

- ZDO： ZigBee 设备对象

- ZCL： ZigBee 群集库

## 先决条件
1. [Digi](http://www.digi.com){:target="_blank"} 中的 XBee ZigBee 模块，例如： XB24 Z7PIT-004
2. [SparkFun](https://www.sparkfun.com/products/11697){:target="_blank"} 中的 XBee 资源管理器 USB 硬件保护装置
3. Digi 中的 [XCTU](http://www.digi.com/products/xbee-rf-solutions/xctu-software/xctu){:target="_blank"} 工具
4. 带有 Visual Studio 2015 和 [IoT Explorer for AllJoyn]({{site.baseurl}}/zh-cn/win10/AllJoyn.htm){:target="_blank"} 应用的 Windows 10 桌面版
5. [FTDI 驱动程序](http://www.ftdichip.com/Drivers/D2XX.htm){:target="_blank"}，适用于 XBee 资源管理器 USB 硬件保护装置所需的 Windows 10。
6. 某些 ZigBee 设备，例如
 - [Philips Hue](http://www2.meethue.com/zh-cn){:target="_blank"} 灯泡
 - 控制彩色 LED 带的 [Dresden Elektronik](https://www.dresden-elektronik.de){:target="_blank"} 压块 FLS-PP-IP 

> 请注意，你将使用的 __ZigBee 设备__已__不__属于 __ZigBee 网络__，否则它们不会加入 ZigBee 网络，这一点很重要。因此，处于安全起见，请购买单个 Philips Hue 灯泡而不是与 Philips Hue 网关捆绑的一组灯泡，因为在这种情况下灯泡属于网关所控制的 ZigBee 网络。
  
可在[此处]({{site.baseurl}}/zh-cn/win10/AllJoyn.htm#AllJoynExplorer){:target="_blank"}找到 IoT Explorer for AllJoyn 及其文档。

![ZigBeeHardware]({{site.baseurl}}/Resources/images/ZigBee/ZigBeeHardware.png)

## 设置步骤
1. 在 Windows 10 桌面版上安装先决条件中列出的所需工具和驱动程序（请参阅其各自的文档以确定如何操作）。
2. 配置 XBee 模块
3. 让你的设备加入 ZigBee 网络
4. 设置 Raspberry Pi2（如果你面向该设备）
5. 部署 ZigBee 适配器

>请注意，在 Windows 10 中，当计算机具有__需要在相同计算机上进行交互__的__多个 AllJoyn 现代应用程序__时，用户必须为这些现代应用程序__添加环回免除__。因此，如果在相同计算机上同时运行 ZigBee 适配器和 AllJoyn 的 IoT 资源管理器，将需要为这 2 个应用程序添加环回免除。从 Visual Studio 2015 中运行的应用程序不需要它。请注意，当从 Visual Studio 2015 部署应用程序时，环回免除面向已安装应用程序的生命周期。这意味着之后你可以直接（而不是从 Visual Studio 2015）启动该应用，并且它将具有环回免除。

设置环回异常： 1.查找你希望启用环回免除的现代应用程序的安装文件夹。它位于“C:\\Users\\*username*\\AppData\\Local\\Packages”![LoopBackException]({{site.baseurl}}/Resources/images/ZigBee/LoopBackException.png) 2。复制安装文件夹名称，该名称也是应用程序 ID。3.从提升的命令提示符处运行以下命令： `CheckNetIsolation LoopbackExempt -a -n=installation-folder-name` 4。重新启动应用程序。

## 使用 XCTU 工具配置你的 XBee ZigBee 模块
请查看工具帮助，以获取有关该工具的更多详细信息 \(https://docs.digi.com/display/XCTU/XCTU+Overview){:target="_blank"}。

![XBeeConfig1]({{site.baseurl}}/Resources/images/ZigBee/XBeeConfig1.png)

![XBeeConfig2]({{site.baseurl}}/Resources/images/ZigBee/XBeeConfig2.png)

## 让 ZigBee 设备加入 ZigBee 网络
配置了 XBee ZigBee 模块后，你可以生成 ZigBee 网络并让 ZigBee 设备加入其中。若要执行此操作，只需打开 ZigBee 设备电源即可。默认情况下，ZigBee 光链路 \(aka ZLL\) 和家庭自动化设备（如果已经不属于 ZigBee 网络）将尝试加入启用允许加入的 ZigBee 网络。XBee ZigBee 模块配置为始终启用允许加入后，ZigBee 设备将加入你的网络。

你可以通过使用 XCTU 工具的“网络发现”功能验证该设备。

![ZigBeeJoinNetVerif]({{site.baseurl}}/Resources/images/ZigBee/ZigBeeJoinNetVerif.png)

## 设置 Raspberry Pi2
1. 按照[此处]({{site.baseurl}}/zh-cn/win10/SetupRPI.htm){:target="_blank"}的说明进行初始设置
2. 将 XBee USB 硬件保护装置插入 Raspberry Pi2 中

## 在 Windows 10 计算机上部署 ZigBee 适配器

1. 在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载包含我们所有示例的压缩包。
2. 在 Visual Studio 中打开 `samples-develop\AllJoyn\Samples\ZigBeeAdapter\ZigBeeAdapter.sln`。
3. 在 Visual Studio 中选择相关目标（x86、x64 或 ARM）并生成解决方案。你现在已准备好启动它，因此如果所面向的 Windows 10 设备具有屏幕，请在桌面上启动或调试 HeadedAdapterApp 项目，如果没有，则启动或调试 HeadlessAdapterApp。如果需要，请参阅[此处]({{site.baseurl}}/zh-cn/win10/AppDeployment.htm){:target="_blank"}的说明来了解远程调试。
 
 
### 当前版本的 ZigBee 适配器的已知限制
- ZigBee 适配器仅发现直接连接到 XBee 模块的设备。 
- ZigBee 适配器仅支持 ZigBee 光链路或家庭自动化配置文件中定义的某些设备。这意味着它仅实现必要的 ZCL 群集和 ZDO 命令来处理它们。也就是说，可以将对新设备和新 ZCL 群集的支持轻松添加到 ZigBee 适配器代码。
- ZigBee 适配器不会公开任何委托 ZigBee 设备的方法。

## ZigBee 适配器详细信息 
ZigBee 适配器采用 C\# 进行编写，并通过 BridgeRT 接口在 AllJoyn 上公开 ZigBee 设备。在 AllJoyn 中公开 ZigBee 设备，如下所示：
  
- 将 ZigBee 设备的每个 ZigBee 终结点公开为 AllJoyn 服务（总线附件）
- 将某个终结点的每个群集公开为 AllJoyn 总线对象
- 将群集的每个属性公开为 AllJoyn 属性
- 将某个终结点的所有群集的全部 ZigBee 命令分组到 AllJoyn 服务的主要 AllJoyn 总线对象下，并将其公开为 AllJoyn 方法

![ZigBee2AllJoynMapping]({{site.baseurl}}/Resources/images/ZigBee/ZigBee2AllJoynMapping.png)

### Philips Hue 灯泡的 IoT Explorer for AllJoyn 视图
Philips Hue 灯泡具有 1 个具有多个群集的终结点： Identify、Scene、Group、OnOff 和 LevelControl。ZigBee 适配器仅处理 OnOff 和 LevelControl 群集，因此将仅向 AllJoyn 公开它们。下面是在 AllJoyn 上公开的内容的 AllJoyn 的 IoT 资源管理器视图。“On”命令的路径将以绿色突出显示，“OnOff”状态的路径将以红色突出显示。

![AJXPhilipsHue1]({{site.baseurl}}/Resources/images/ZigBee/AJXPhilipsHue1.png)

![AJXPhilipsHue2]({{site.baseurl}}/Resources/images/ZigBee/AJXPhilipsHue2.png)

![AJXPhilipsHue3]({{site.baseurl}}/Resources/images/ZigBee/AJXPhilipsHue3.png)

![AJXPhilipsHue4]({{site.baseurl}}/Resources/images/ZigBee/AJXPhilipsHue4.png)

![AJXPhilipsHue5]({{site.baseurl}}/Resources/images/ZigBee/AJXPhilipsHue5.png)

### 类概述

![ClassMap]({{site.baseurl}}/Resources/images/ZigBee/ClassMap.png)

__适配器__类是 ZigBee 适配器的主类。此类派生自 __IAdapter__（BridgeRT 接口），并且包含 __ZigBeeDevice__ 实例的集合和 __XBeeModule__ 类的实例。

__XBeeModule__ 类处理与 XBee 模块的交互，并且具有生成和分析 XBee 帧的方法。请参阅 [XBee ZigBee 模块文档](http://www.digi.com)以了解有关其 API 和其帧布局的更多详细信息。XBeeModule 类使用通过串行端口处理通信的 __SerialController__ 类。

__ZigBeeDevice__ 类表示 ZigBee 设备。此类没有带有 BridgeRT 的任何接口，因为仅向 AllJoyn 公开 ZigBee 设备的终结点。__ZigBeeDevice__ 类包含 __ZigBeeEndPoint__ 实例的集合。

__ZigBeeEndPoint__ 类表示 ZigBee 设备的终结点。此类派生自 __IAdapterDevice__（BridgeRT 接口），并且包含 __BasicCluster__ 的实例和 __ZclCluster__ 实例的集合。为了获取更高的准确性，它包含群集类的集合，例如： __OnOffCluster__，派生自抽象 __ZclCluster__ 类。

群集类，例如： __BasicCluster__ 和 __OnOffCluster__ 表示 ZCL 群集。每个群集类都是 __ZclCluster__ 抽象类的“特定”实现。
 
__ZclCluster__ 类是派生自 __IAdapterProperty__（BridgeRT 接口）的抽象类，并且包含 __ZclAttribute__ 实例的集合和 __ZclCommand__ 实例的集合。ZclCluster 的特定实现仅在于定义应受该特定群集支持的 ZclAttribute 和 ZclCommand 列表。

__ZclAttribute__ 类表示如 ZCL 标准中所定义的某个属性。此类派生自 __IAdapterAttribute__（BridgeRT 接口）和 __ZigBeeCommand__ 类。此类包含 __IAdapterValue__ 类的实例，即 BridgeRT 接口。有关信息，读取或写入属性在于发送某个特定的 ZCL 命令。

__ZclCommand__ 类表示如 ZCL 标准中所定义的某个命令。此类派生自 __IAdapterMethod__（BridgeRT 接口）和 __ZigBeeCommand__ 类。此类包含输入和输出参数的列表。这些参数确实是 __IAdapterValue__ 类，即 BridgeRT 接口。

__ZigBeeCommand__ 类是用于发送和接收 ZDO 或 ZCL 命令的抽象类。准备（或解析）XBeeModule 将发送到 XBee 模块（或从 XBeeModule 接收）的 ZCL 或 ZDO 负载是在其“通用”部分的 ZigBeeCommand 类和特定部分的 ZigBeeCommand 派生类之间共享的任务。

ZDO 命令类（如 __ManagementLQI__ 类、__ActiveEndPoints__ 类...）用于发现 ZigBee 网络以及 ZigBee 设备和终结点。这些类派生自 __ZigBeeCommand__ 类。

__ZclClusterFactory__ 类用于创建特定群集类的实例。此类由适配器类用于在发现新 ZigBee 设备时创建相关群集。请注意，仅在该设备具有至少一个终结点（该终结点具有在 ZclClusterFactory 的受支持群集列表中列出的 ZCL 群集）时，适配器类才会创建 ZigBeeDevice 实例。

XBeeModule 在其初始化后使用 AT 命令类（例如 __AO\_Command__、__HV\_Command__…）以获取有关它所使用的 XBee 模块的信息。这些类派生自 __XBeeATCommand__ 抽象类。请参阅 [XBee ZigBee 模块文档](http://www.digi.com)以了解有关 AT 命令的更多详细信息。

### 发送 ZDO 或 ZCL 命令和接收响应

![SendZdoZcl]({{site.baseurl}}/Resources/images/ZigBee/SendZdoZcl.png)

1. 当 ZclAttribute 类读取属性的值时，它将遵循 ZCL 标准读取属性负载，然后调用 ZigBeeCommand 类的 SendCommand 方法。
2. 然后，SendCommand 将调用 XBeeModule 的 SendZigBeeCommand 方法。
3. SendZigBeeCommand 将遵循 Digi 所定义的格式生成其 XBee 模块的帧。完成后，它将存储对已在字典中发送的 ZigBeeCommand 的引用，并调用 WriteAsync 来发送字节。之后它将会返回，并且 SendCommand 将一直等待，直到它得到响应或超时。
4. 从 XBee 模块接收完整的帧后，SerialController 的接收线程将调用 XBeeModule 的 GetBytesFromModule 回调。
5. GetBytesFromModule 将分析帧的 XBee 部分，并查看收到的响应是否具有匹配的命令。如果有，它将调用相关命令的 ParseResponse 回调，然后向该命令发出收到响应的信号。 

### 接收 ZDO 或 ZCL 命令 
ZigBee 设备可以向 XBee 模块发送 ZDO 或 ZCL 命令，例如：在设备唤醒时发送的设备公告 ZDO 命令，或者在 ZCL 群集的属性可报告时加入网络、报告属性 ZCL 命令... 不会发送此类命令来响应其他命令，ZigBee 适配器会将其视为“通知”。

![ReceiveZdoZcl]({{site.baseurl}}/Resources/images/ZigBee/ReceiveZdoZcl.png)

1. 适配器类将生成它可以在初始化后收到的通知列表。此列表包含如 DeviceAnnce、ZclReportAttribute 的特定 ZigBeeCommand 的实例。
2. 从 XBee 模块接收完整的帧后，SerialController 的接收线程将调用 XBeeModule 的 GetBytesFromModule 回调。
3. GetBytesFromModule 将分析帧的 XBee 部分，并查看它是否是已发送命令的响应（请参阅上一节）。如果不是，它将遍历通知列表并调用每个元素的 ParseResponse 方法，直到有一个响应接受帧或没有任何响应接受。如果没有任何响应接受，将丢弃该帧。 
4. ParseResponse 的用途特定于 ZigBeeCommand 类的每个实现。例如，DeviceAnnce 类的 ParseResponse 方法将获取 64 位地址（aka MAC 地址）和 16 位地址，并且可能具有有关已发送信号的设备的详细信息，然后将“设备到达”信号发送到 BridgeRT（请注意，将使用多个类来实现该目的，请参阅代码以了解详细信息）。 

### 创建一个新的 ZCL 群集类
ZigBee 适配器不会实现由 ZCL 定义的所有群集。将出现你要与之交互的 ZigBee 设备不受 ZigBee 适配器支持的情况。在这种情况下，你将需要添加对缺少的群集的支持。

操作步骤：

1. 你需要查找新设备的每个终结点所支持的 ZigBee 配置文件和 ZigBee 设备类别。这可以通过设备制造商进行记录或者通过向终结点发送某些 ZDO 命令来发现。如果在记录器类中启用设备发现跟踪，则 ZigBee 适配器可以向你提供此信息。
2. 实现缺少的群集（如有必要）
 - 创建一个派生自 ZclCluster 的新类
 - 在构造函数中添加属性和命令
3. 相应地更新 ZigBeeProfileLibrary 和 ZclClusterFactory
4. 如果所添加群集的属性或命令使用尚不支持的 ZigBee 类型，请不要忘记更新 ZclHelper

新群集类的示例

![NewClusterClass]({{site.baseurl}}/Resources/images/ZigBee/NewClusterClass.png)

在 ZclClusterFactory 类中需要完成的操作

![ZclFactoryChange]({{site.baseurl}}/Resources/images/ZigBee/ZclFactoryChange.png)

### XBee API 使用的帧的简要概述
Digi 提供可以用于与其 XBee ZigBee 模块交互的 API。此 API 用于发送或接收 AT 命令或 ZDO 和 ZCL 命令。AT 命令特定于 XBee 模块并仅可通过 XBee 模块进行解释，而 ZDO 或 ZCL 命令可通过任何 ZigBee 设备进行解释。用于发送 AT 命令的帧与用于发送 ZDO 或 ZCL 命令的帧略不相同（请参阅 XBee ZigBee 模块文档以了解更多详细信息）。

常规帧布局：

![XBeeFrame1]({{site.baseurl}}/Resources/images/ZigBee/XBeeFrame1.png)

显式寻址 ZigBee 命令

![XBeeFrame2]({{site.baseurl}}/Resources/images/ZigBee/XBeeFrame2.png)

显式 Rx 指示器

![XBeeFrame3]({{site.baseurl}}/Resources/images/ZigBee/XBeeFrame3.png)
