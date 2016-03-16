---
layout: default
title: AllJoyn 设备系统网桥
permalink: /zh-cn/win10/AllJoynDSB.htm
lang: zh-cn
---

# AllJoyn 设备系统网桥

AllJoyn 为开发人员提供了使用种类广泛的平台和连接技术来为 AllJoyn 生态系统生成设备的灵活性。但是，许多设备制造商在其项目组合中有现有的设备解决方案。针对这些情况，Microsoft 创建了设备系统网桥 \(DSB\)。DSB 可使非 AllJoyn 设备适应 AllJoyn 生态系统，以便适合的设备可以与作为其作为公共语言的 AllJoyn 进行互操作。Microsoft DSB 支持 Zigbee 和 Z-Wave 等家庭自动化系统，甚至可以支持 BACnet 等工业生成自动化系统。此外，源代码可进行自定义以支持其他技术。

## DSB 的工作原理

DSB 的关键功能是在 AllJoyn 总线上创建设备的虚拟表示形式。因此无论这些设备的本机连接性或设备生态系统如何，它们都将显示，并且可作为 AllJoyn 设备访问。在下图中，两个 DSB（一个用于 Z-Wave，另一个用于 ZigBee）在 AllJoyn 总线上创建两个 Z-Wave 和一个 ZigBee 设备的表示形式。通过此方法，AllJoyn 站点上的所有设备都可以互相通信。由于 Z-Wave 和 ZigBee 设备全都在 AllJoyn 总线上，因此它们现在也可以互相通信。![AJ\_Docu\_DSB\_Overview]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Docu_DSB_Overview.png) DSB 设计的另一个关键元素是它不需要对 AllJoyn 或非 AllJoyn 设备系统进行任何更改。所有必要的应用都在 DSB 中完成。

此图还显示，不存在从 AllJoyn 设备到非 AllJoyn 端的映射。DSB 的目标是将设备移入 AllJoyn 生态系统中。仅单向支持可简化开发。它还降低了 AllJoyn 安全功能被可能不太安全的非 AllJoyn 设备系统削弱的风险。

## DSB 体系结构

Microsoft 建议的 DSB 体系结构包含三个主要组件：网络访问堆栈、适配器和网桥。下图显示了此体系结构的高级别概述 ![AJ\_Docu\_DSB\_Architecture]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Docu_DSB_Architecture.png)

__网桥__

- 将每个内部设备对象表示为 AllJoyn 设备，即每台设备的单独总线附件
- 设备动态添加到 AllJoyn 总线或从其中删除
- 配置管理设备可见性和安全性
- 为网桥和适配器配置接口创建总线附件
- 网桥代码与内部设备类型无关，并且可重复用于任何类型

__适配器__

- 代表非 AllJoyn 网络中的每台设备实例化和管理虚拟设备
- 将设备架构转换为内部设备对象
- 管理网络资源，例如访问密钥、凭据

__网络访问堆栈__

- 对特定于非 AllJoyn 网络（如 Z-Wave）的堆栈的访问

## 适配器类

下图显示了开发人员将在 Microsoft DSB 模板中使用的类，用于创建需要桥接到 AllJoyn 中的本地设备的抽象。网桥将使用适配器类的实例来为 Adapter.devices 列表中的每台设备创建总线附件。![AJ\_Docu\_DSB\_Class\_Diagram]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Docu_DSB_Class_Diagram.png)

## 特殊处理程序

AllJoyn 指定多个基本服务和标准接口框架，如 LSF、HAE 或控制面板。DSB 可使用特殊处理程序公开它们。DSB 模板的当前（2015 年 11 月）版本包含 LSF 和控制面板接口的实现。开发人员会将他们的代码连接到网桥中的 LSF 和控制面板接口的回调函数。![AJ\_Docu\_DSB\_Special\_Handlers]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Docu_DSB_Special_Handlers.png)

## DSB 资源

__Visual Studio DSB 模板__

[Visual Studio DSB 模板](https://visualstudiogallery.msdn.microsoft.com/aea0b437-ef07-42e3-bd88-8c7f906d5da8){:target="_blank"}是可让你轻松创建新的 DSB 项目的 Visual Studio 扩展。该项目将创建所有必要的组件（如网桥、适配器的 shell 项目和所有解决方案文件）来将 DSB 生成为有外设或无外设设备。此 Visual Studio 扩展包含本地和托管 AllJoyn 设备系统网桥模板。

该模板可通过“Visual Studio Tools”-\>“扩展和更新”… -\>“在线”-\> 在“搜索”字段中键入“DSB”来进行安装

[将 DSB 对象映射到 Alljoyn]({{site.baseurl}}/zh-cn/win10/AlljoynDsbApiGuide.htm){:target="_blank"} 文档介绍了用于生成 Alljoyn 系统网桥的关键接口和方法。

__示例 DSB__

- [AllJoyn DSB Mock 适配器教程和示例]({{site.baseurl}}/zh-cn/win10/samples/MockAdapterTutorial.htm){:target="_blank"}。此教程介绍如何使用设备系统网桥应用将 IoT 核心版设备连接到模拟 BACnet 设备。
- [AllJoyn DSB Z-Wave 适配器教程和示例]({{site.baseurl}}/zh-cn/win10/samples/ZWaveTutorial.htm){:target="_blank"}。基于 Build 2015 大会的演示，此教程介绍如何使用设备系统网桥应用将 IoT 核心版设备连接到 Z-Wave 设备。
- [AllJoyn DSB GPIO 适配器教程 C++]({{site.baseurl}}/zh-cn/win10/samples/AlljoynDSB_GpioTutorial.htm){:target="_blank"} 此教程演示如何使用 AllJoyn 设备系统网桥模板创建可操作设备 GPIO 的示例 C++ 应用。
- [AllJoyn DSB GPIO 适配器教程 C\#]({{site.baseurl}}/zh-cn/win10/samples/AlljoynDSB_ManagedGpioTutorial.htm){:target="_blank"} 此教程演示如何使用 AllJoyn 设备系统网桥模板创建可操作设备 GPIO 的示例托管应用。
- [AllJoyn DSB ZigBee 适配器教程和示例]({{site.baseurl}}/zh-cn/win10/samples/ZigBeeAdapterTutorial.htm){:target="_blank"} 此教程介绍如何使用设备系统网桥应用将 IoT 核心版设备连接到 ZigBee 设备。
- [AllJoyn DSB BACnet 适配器教程和示例]({{site.baseurl}}/zh-cn/win10/samples/BACnetAdapterTutorial.htm){:target="_blank"} 此教程介绍如何使用设备系统网桥应用将 IoT 核心版设备连接到 BACnet 设备。
- [AllJoyn.JS 教程]({{site.baseurl}}/zh-cn/win10/samples/AllJoynJS.htm){:target="_blank"} 此教程介绍如何将由 Allseen 联盟开发的 AllJoyn.JS 应用程序作为 Windows 10 应用程序运行。AllJoyn.JS 允许你编写 JavaScript 来创建、监视和控制 AllJoyn 设备。
