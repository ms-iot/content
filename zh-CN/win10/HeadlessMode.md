---
layout: default
title: 有外设/无外设模式
permalink: /zh-cn/win10/HeadlessMode.htm
lang: zh-cn
---

##有外设模式和无外设模式

可将 Windows IoT 核心版配置为“有外设”或“无外设”模式。这两种模式之间的区别在于是否存在任何形式的 UI。默认情况下，Windows 10 IoT 核心版处于“有外设”模式下，并运行显示计算机名称和 IP 地址等系统信息的默认启动应用。另外，在有外设模式下，标准 UWP UI 堆栈可用于完全交互式应用。无需 UI 功能的设备可设置为**无外设**模式。UI 堆栈将禁用，并且应用不再具有交互性。这将减少使用的系统资源量。可将无外设模式应用视为服务。

如果配置为在有外设模式下运行，单个 UI 应用将在启动时启动，并且不存在切换到其他应用程序的机制（在开发的情况下除外，如 Visual Studio 部署应用进行调试时）。在无外设模式下，将不会启动任何 UI 应用。“后台应用”\(StartupTasks\) 是缺少 UI 并在启动时启动的应用。可为有外设和无外设设备安装任意数量的此类应用。注意： 如果将设备置于无外设模式下，则你可以使用 WindowsIoTCoreWatcher 应用程序（如下所述）查找其 IP 地址。

##更改模式
可从 PowerShell 会话中修改设备的有外设/无外设状态。若要查看 PowerShell 详细信息，请访问[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)。

* 若要显示设备的当前状态，请使用 `setbootoption` 实用工具，如下所示：

        [192.168.0.243]: PS C:\> setbootoption.exe

* 若要修改设备的状态以启用无外设模式，请将 `setbootoption` 实用工具与 `headless` 参数结合使用：

        [192.168.0.243]: PS C:\> setbootoption.exe headless
        [192.168.0.243]: PS C:\> shutdown /r /t 0

* 若要修改设备的状态以启用有外设模式，请将 `setbootoption` 实用工具与 `headed` 参数结合使用：

        [192.168.0.243]: PS C:\> setbootoption.exe headed
        [192.168.0.243]: PS C:\> shutdown /r /t 0

##查找无外设设备

处于无外设模式下的 Windows IoT 核心版设备可使用通过 Windows 10 IoT 核心版工具安装的 **WindowsIoTCoreWatcher** 应用程序来发现。运行时，应用程序将侦听本地网络上所有 Windows IoT 核心版设备中的 Ping，并显示诸如名称、MAC、IP 地址等设备信息。

![Windows IoT 核心版观察程序]({{site.baseurl}}/Resources/images/HeadlessMode/IoTCoreWatcher.png)
