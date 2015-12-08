---
layout: default
title: AllJoyn
permalink: /zh-CN/win10/AllJoyn.htm
lang: zh-CN
---

##AllJoyn

**什么是 AllJoyn？**

AllJoyn 是一个由 AllSeen Alliance 驱动且基于邻近感应的开源式连接和服务框架。它专用于物联网 \(IoT\) 且支持互操作性，这样各种设备都可以直接相互查找、连接和通信，而无需借助中间服务器。

**为何选择 AllJoyn？**

AllJoyn 框架提供了一个常见的语言界面，从而让 IoT 设备可以彼此相关通信和交互，而无需考虑品牌、平台、操作系统或基础传输技术。对于开发人员而言，这节省了转换到市场的时间并降低了相关成本；而对于客户而言，这为他们提供了一个适用于其所有设备的简单连接解决方案。

**AllJoyn 体系结构**

AllJoyn 框架建立了一个标准化的体系结构，在其中设备和应用可相互宣传和查找。AllJoyn 设备通过虚拟总线上的服务接口来描述其相关功能。AllJoyn 总线由以下两种类型的节点构成：

* *路由节点 \(RN\)* - 也称为“路由器”，此类节点可与任意节点通信。
* *叶节点 \(LN\)* - 也称为“应用程序”，此类节点可通过路由节点与路由节点或其他叶节点通信。

![AllJoyn 路由器和应用]({{site.baseurl}}/Resources/images/AllJoyn/AllJoyn_Routers_Apps.png)

下图显示了 AllJoyn 框架的高级软件体系结构：![AllJoyn 体系结构]({{site.baseurl}}/Resources/images/AllJoyn/AllJoyn_Architecture.png)

* *AllJoyn 应用层* - 用于定义用户体验
* *AllJoyn 服务框架* - 可互操作的跨平台模块，用于定义设备之间的公共接口
* *AllJoyn 核心库* - 核心库，用于与 AllJoyn 路由器交互，并提供查找和安全连接到设备的功能
* *AllJoyn 路由器* - 用于管理设备与应用之间的通信


AllJoyn 框架有 2 种：

* *标准框架* - 主要用于非嵌入式设备（支持整套核心库）
* *纤薄框架* - 适用于 IoT 设备，它们受制于资源并且在网络中需使用 AllJoyn 路由器 ![AllJoyn 框架]({{site.baseurl}}/Resources/images/AllJoyn/AllJoyn_Frameworks.png)

AllJoyn 支持基于邻近感应的通信，从而允许通过以太网、Wi-Fi、串行线和电源线 \(PLC\) 进行传输。但由于 AllJoyn 框架在传输方面是不确定的，因此允许添加任何将来的传输机制。此外，还可以创建网桥软件，以便将 AllJoyn 框架连接到其他系统，如 Zigbee、Z-wave 或云。有关 Microsoft 中的 AllJoyn 设备系统网桥为 AllSeen Alliance 带来的贡献，请参阅下面的更多详细信息和示例。

**AllJoyn 设备系统网桥**

设备系统网桥 \(DSB\) 有助于促进跨现有的不兼容网络的通信。DSB 提供了一个经济高效的快捷方式，即，通过 AllJoyn 网络使现有设备以虚拟设备形式进入 AllJoyn。其实现方式如下：通过预焙 AllJoyn 生产商实现（网桥），并实现了对 SDK Hook 的调用，从而支持 AllJoyn 目标设备（适配器）概念的转换。开发人员不需要使用 DSB 修改 AllJoyn 生产商，除非必须要对该网桥的默认行为进行更改。有关设备系统网桥的用途及其结构的详细信息，请查看此[白皮书。](https://git.allseenalliance.org/cgit/dsb.git/plain/Docs/AllJoyn%20-%20Device%20System%20Bridge%20-%20Whitepaper%20v1.0.pdf){:target="_blank"}![AllJoyn DSB 体系结构]({{site.baseurl}}/Resources/images/AllJoyn/AllJoyn_DSBArch.png)

借助 Microsoft 中的 [AllJoyn 设备系统网桥贡献](https://wiki.allseenalliance.org/gateway/dsb){:target="_blank"}，你可以将使用 BACnet 或 Z-Wave 的现有设备连接到 AllJoyn 网络，以便这些设备既可以与新的 AllJoyn 设备交互，又可以通过该网络跨所有设备进行云连接。还推出了一款实用型[工具](https://github.com/MS-brock/AllJoynToasterDemo/tree/master/getajxml){:target="_blank"}，该工具可通过现有的 AllJoyn 设备生成 AllJoyn 自省 XML，[channel9](https://channel9.msdn.com/Blogs/Internet-of-Things-Blog/Step-By-Step-Building-AllJoyn-Universal-Windows-Apps-for-Windows-10-Public-Preview){:target="_blank"} 上的一篇文章详细介绍了其用法。 请务必查看下面的示例和其他文档。我们希望你能帮助生成更多的 IoT 网桥，从而使其为 AllSeen Alliance 做出贡献。

**将 DSB 对象映射到 Alljoyn** 本文档将介绍用于生成 Alljoyn 系统网桥的关键接口和方法。

[AllJoyn DSB API]({{site.baseurl}}/zh-CN/win10/AlljoynDsbApiGuide.htm){:target="_blank"}

**适用于 Visual Studio 的 AllJoyn 设备系统网桥模板** 此模板可安装在 Visual Studio 2015 Preview 中，从而让你可以创建 AllJoyn 设备系统网桥项目。\* [DeviceSystemBridgeTemplate.vsix](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynDSBGuide/DeviceSystemBridgeTemplate.vsix?raw=true){:target="_blank"} - 此 vsix 包含 AllJoyn 设备系统网桥模板。请注意，它必须在本地复制，不得远程安装。你也可以在 [Visual Studio Online](https://visualstudiogallery.msdn.microsoft.com/aea0b437-ef07-42e3-bd88-8c7f906d5da8) 上找到它。

**AllJoyn 资源管理器** 这是我们使用 AllJoyn 示例时在多个点中使用的工具。可在[此处](https://github.com/ms-iot/samples/tree/develop/AllJoyn/AllJoynExplorer){:target="_blank"}找到 AllJoyn 资源管理器：

* [AllJoyn 资源管理器](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoynExplorer_1.0.0.2.zip?raw=true){:target="_blank"} - 此 zip 包含 AllJoyn 资源管理器 AppX 捆绑包。
* [AllJoyn 资源管理器安装指南](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_Setup_Guide_v1.0.pdf?raw=true){:target="_blank"} - 此 pdf 包含有关如何部署 AllJoyn 资源管理器的文档。
* [AllJoyn 资源管理器用户指南](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_User_Guide_v1.0.pdf?raw=true){:target="_blank"} - 此 pdf 包含有关如何使用 AllJoyn 资源管理器的文档。

**示例**

* [AllJoyn DSB 模拟适配器教程和示例]({{site.baseurl}}/zh-CN/win10/samples/MockAdapterTutorial.htm){:target="_blank"}。

 此教程介绍如何使用设备系统网桥应用将 IoT 核心版设备连接到模拟 BACnet 设备。
 
* [AllJoyn DSB Z-Wave 教程和示例]({{site.baseurl}}/zh-CN/win10/samples/ZWaveTutorial.htm){:target="_blank"}。

 基于 Build 2015 大会的演示，此教程介绍如何使用设备系统网桥应用将 IoT 核心版设备连接到 Z-Wave 设备。

* [AllJoyn DSB GPIO 设备教程 C++]({{site.baseurl}}/zh-CN/win10/samples/AlljoynDSB_GpioTutorial.htm){:target="_blank"}

 此教程演示如何使用 AllJoyn 设备系统网桥模板创建操作设备 GPIO 的示例 C++ 应用。

* [AllJoyn DSB GPIO 设备教程 C\#]({{site.baseurl}}/zh-CN/win10/samples/AlljoynDSB_ManagedGpioTutorial.htm){:target="_blank"}

 此教程演示如何使用 AllJoyn 设备系统网桥模板创建操作设备 GPIO 的示例托管应用。

**其他资源**

* 在 Windows 10 上生成 AllJoyn 应用 - [https://channel9.msdn.com/Blogs/Internet-of-Things-Blog/Step-By-Step-Building-AllJoyn-Universal-Windows-Apps-for-Windows-10-Public-Preview](https://channel9.msdn.com/Blogs/Internet-of-Things-Blog/Step-By-Step-Building-AllJoyn-Universal-Windows-Apps-for-Windows-10-Public-Preview){:target="_blank"}
* Windows 10 中的 AllJoyn 接口 - [https://msdn.microsoft.com/zh-cn/library/windows/apps/xaml/windows.devices.alljoyn.aspx](https://msdn.microsoft.com/zh-CN/library/windows/apps/xaml/windows.devices.alljoyn.aspx){:target="_blank"}
* AllJoyn CodeGen 工具 - [AllJoynCodeGen.htm]({{site.baseurl}}/zh-CN/win10/AllJoynCodeGen.htm){:target="_blank"}
* AllJoyn 体系结构详细信息 - [https://allseenalliance.org/developers/learn/](https://allseenalliance.org/developers/learn/){:target="_blank"}
* AllJoyn 开发人员资源 - [https://allseenalliance.org/developers/develop/](https://allseenalliance.org/developers/develop/){:target="_blank"}
