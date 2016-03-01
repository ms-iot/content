---
layout: default
title: AllJoyn 疑难解答
permalink: /zh-cn/win10/AllJoynTroubleshooting.htm
lang: zh-cn
---

# AllJoyn 疑难解答

[AllJoyn](https://allseenalliance.org/developers/learn) 是一种技术，允许 IoT 设备和应用程序发现彼此并进行交互。由于 AllJoyn 内置于 Windows 10 和 Windows 10 SDK 中，因此可轻松使用通用 Windows 平台 \(UWP\) 来利用 AllJoyn。

![AJ\_Troubleshooting\_intro]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Troubleshooting_intro.jpg){:target="_blank"}

这篇博客文章可帮助你配置 AllJoyn 网络和设备，还提供发生异常情况时要遵循的疑难解答步骤。本文主要介绍在 UWP AllJoyn 客户端应用（AllJoyn 使用器）和 AllJoyn 设备（AllJoyn 创建器）之间实现通信。要求执行许多相同的配置步骤才能实现与 UWP AllJoyn 创建器应用进行通信，但进一步的详细信息将在将来的博客文章和文章中进行介绍。

### 应用开发清单

如果要为 Windows 10 编写 UWP 应用，应确保：

1. 已在应用清单中声明“allJoyn”功能（注意大小写）。
2. 已选择将要面对的特定体系结构。（在某些情况下需要，因为无法使用“任何 CPU”生成 Windows 运行时组件，某些 Visual Studio 2015 版本的已知问题）。

如果面向 Windows 10 编写的应用或设备软件不是基于 UWP 的应用程序，应查看以下检查表以确保在 Windows 10 中与 AllJoyn 的兼容性：

1. 如果要实现创建器，请确保使用 About 接口和基于 About 的广告/发现。About 接口[以文档形式记录在 AllSeen 联盟网站上](https://allseenalliance.org/developers/learn/core/about-announcement/interface)。
2. 为获得最佳结果，请使用 15.04 AllJoyn 代码库（在 AllSeen 联盟网站的[下载部分](https://allseenalliance.org/developers/download)中提供）。

### 网络设置和疑难解答

对于能够发现彼此并进行交互的 AllJoyn 设备，每台设备的网络配置和设置必须满足以下条件：

1. 所有 AllJoyn 设备连接到相同网络，并且位于同一子网上。
2. Windows 10 电脑： 为使用 AllJoyn 的网络启用“查找设备和内容”（不适用于手机）。

在电脑上，可从 CMD 或 PowerShell 窗口使用跟踪路由命令来查看其他计算机/设备是否位于同一子网上，如下所示：

	PS C:\Users\user> tracert WIN10PC1
	 
	Tracing route to WIN10PC1 [fe80::657d:d8bf:176f:d0b2%24]
	 
	over a maximum of 30 hops:
	 
	1       1 ms     1 ms     1 ms   WIN10PC1 [fe80::657d:d8bf:176f:d0b2]
	 
	Trace complete.

此处输出的第一个数字为跃点数，由于该值为“1”，这表示两台计算机位于同一子网上。

以下是典型的 AllJoyn 网络设置示例。在此示例中，所有显示的设备都能够使用 AllJoyn 发现彼此并进行交互（假设它们位于同一子网上）。

![AJ\_Troubleshooting\_Devices]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Troubleshooting_Devices.jpg){:target="_blank"}

当将 Windows 10 电脑连接到含有 AllJoyn 设备的网络时，如果显示有关在网络上查找设备和电脑的对话框，需要单击“是”。（注意： 这不适用于从 Windows 10 手机加入网络的情形，因为没有此类对话框）。

还可以在 WLAN 设置的“高级设置”页中管理此设置，如下所示：（此页面可能稍有不同，具体取决于你使用的 Windows 10 Insider 版本）

![AJ\_Troubleshooting\_Settings]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Troubleshooting_Settings.jpg){:target="_blank"}

应将“查找设备和内容”开关切换为“开”，以便启用 AllJoyn 功能。

对于现有网络连接，可以通过运行“Get-NetConnectionProfile”Powershell cmdlet 轻松验证此选项是否正确配置。（请注意，这不适用于 Windows 10 手机）。

示例 Get-NetConnectionProfile 输出：

	PS C:\Users\user> Get-NetConnectionProfile
	 
	Name             : myWirelessNetwork
	InterfaceAlias   : vEthernet (Intel(R) Dual Band Wireless-AC 7260 Virtual Switch)
	InterfaceIndex   : 24
	NetworkCategory : Private
	IPv4Connectivity : Internet
	IPv6Connectivity : LocalNetwork


如果“NetworkCategory”值为“Private”（如上所示），这表示你已正确配置 AllJoyn 的网络连接。

### About 广告和借助 Getajxml.exe 执行疑难解答发现

对于可由 Windows 10 UWP AllJoyn 应用发现的 AllJoyn 创建器设备或应用，必须正确实现基于 About 的发现。这可以使用 GetAjXml.exe 工具轻松验证。若要查找有关 GetAjXml.exe 的下载和用法信息，请查看 [AllJoyn Studio](https://visualstudiogallery.msdn.microsoft.com/064e58a7-fb56-464b-bed5-f85914c89286)。

以下针对支持基于 About 的发现的示例设备显示 GetAjXml.exe 输出:

	----------------------------------------------------------------------
	Discovery   : About Announcement
	Manufacturer: Microsoft
	Model #     : 070773
	Device Name : Raspberry Pi Toaster
	Device ID   : 41d9a124-6913-40c5-a20a-9d1b20f8121b
	App Name   : Toaster Producer
	      Bus Name                       Port Object Path
	      ============================== ===== ===============================
	      :3yZG_wu1.2                       25 /emergency
	      :3yZG_wu1.2                       25 /info
	      :3yZG_wu1.2                       25 /notificationDismisser
	      :3yZG_wu1.2                       25 /notificationProducer
	      :3yZG_wu1.2                       25 /toaster
	      :3yZG_wu1.2                       25 /warning


在上述示例中，由于 `Discovery   : About Announcement` 包含在此输出中，因此该 AllJoyn 创建器可由 Windows 10 AllJoyn UWP 应用发现。如果未看到特定 AllJoyn 创建器的此输出，需要排查设备（创建器）端上的发现实现。

### 借助 ETW 日志输出执行高级疑难解答

Windows 事件跟踪 \(ETW\) 可以帮助你获取 Windows 中许多其他功能的高级调试信息。幸好 AllJoyn 是 ETW 日志记录支持的其中一个功能，因此在此部分中，我会向你介绍如何为 AllJoyn 启用 ETW 日志记录，以及如何访问日志。

1. 通过在“开始”菜单搜索文本框中键入“事件日志”启动事件查看器，然后选择“查看事件日志”。
2. 在“查看”菜单中，确保已选中“显示分析和调试日志”。
3. 在左侧导航中将树视图导航到文件夹视图中的“应用程序和服务日志”\>“Microsoft”\>“Windows”\>“AllJoyn”，然后启用“调试”通道和“操作”通道。（请参阅以下屏幕截图中的红色框部分）。
4. 重现使用 AllJoyn 时遇到的问题。
5. 单击右侧“操作”栏中的“刷新”，然后从“AllJoyn”文件夹下方的左侧导航栏查看“操作”和“调试”通道。

![AJ\_Troubleshooting\_ETW]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Troubleshooting_ETW.jpg){:target="_blank"}

AllJoyn ETW 跟踪如下进行分区：

- 调试通道： 详细，非错误/信息跟踪
- 操作通道： 错误跟踪，在操作通道上仅输出错误

为从 ETW 条目中提取信息，可以右键单击给定通道的列表视图中的某个条目，然后依次选择“复制”和“将详细信息复制为文本”。将相应文本粘贴到文本编辑器后，详细信息将如以下示例所示：


	Log Name:       Microsoft-Windows-AllJoyn/Operational
	Source:         Microsoft-Windows-AllJoyn
	Date:           6/1/2015 3:57:45 PM
	Event ID:     2
	Task Category: AJ
	Level:         Error
	Keywords:      (70368744177664),AJ
	User:         LOCAL SERVICE
	Computer:       <computer name>
	 
	Description:
	AllJoyn encountered an error 0x902D in module UDP, file ..\udptransport.cc, at line number 10809. See the event user data for more information.
	Event Xml:
	<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event">
	<System>
	   <Provider Name="Microsoft-Windows-AllJoyn" Guid="{2ED299D2-2F6B-411D-8D15-F4CC6FDE0C70}" />
	    <EventID>2</EventID>
	    <Version>0</Version>
	    <Level>2</Level>
	    <Task>1</Task>
	    <Opcode>10</Opcode>
	    <Keywords>0x8000400000000001</Keywords>
	   <TimeCreated SystemTime="2015-06-01T22:57:45.626729500Z" />
	    <EventRecordID>16</EventRecordID>
	   <Correlation />
	   <Execution ProcessID="1392" ThreadID="5768" />
	   <Channel>Microsoft-Windows-AllJoyn/Operational</Channel>
	    <Computer>computer name</Computer>
	   <Security UserID="SID" />
	</System>
	<UserData>
	   <AJErrorData xmlns="http://manifests.microsoft.com/win/2005/08/windows/alljoyn/events">
	       <QStatus>0x902d</QStatus>
	       <Message>UDPTransport::DisbleDiscovery(): Not running or stopping; exiting</Message>
	       <Module>UDP</Module>
	       <File>..\udptransport.cc</File>
	       <Line>10809</Line>
	    </AJErrorData>
	</UserData>
	</Event>


此信息可以帮助排查 AllJoyn 问题，或有助于在向 Microsoft 或其他合作伙伴报告问题时提供详细信息。可以在 MSDN 上了解有关 [ETW 跟踪和事件查看器](https://msdn.microsoft.com/zh-cn/library/windows/desktop/bb968803.aspx)的详细信息。

### 已知问题和限制

Windows 10 中的 AllJoyn 由设计决定的限制

- 当 Windows 10 电脑上未运行任何应用时，网络上的 AllJoyn 设备或应用不可以自动启动 AllJoyn 路由器节点。可以通过运行命令“net start ajrouter”从提升的命令提示符或 Powershell 会话启动 Windows 10 路由器节点。
- AllJoyn UWP 应用无法发现同一计算机上运行的其他 AllJoyn UWP 应用或 AllJoyn 桌面应用，也无法与之交互。这是在 Windows 10 中针对 UWP 应用实现的应用隔离承诺的一部分。 
  - 如果从 Visual Studio 部署 AllJoyn UWP 应用，会忽略针对该应用的应用隔离（这称为“环回免除”）。从 Visual Studio 部署的每个 UWP 应用将可以发现其他环回免除 UWP 应用和桌面应用并与之交互，只要这些应用使用基于 About 的广告/发现。如果以“嵌入模式”运行 Windows 10 IoT 核心版，将自动应用此环回免除，且无需进行任何配置。你可以在 [MSDN](https://msdn.microsoft.com/zh-cn/library/windows/apps/Hh780593.aspx) 上阅读有关环回免除的详细信息。

