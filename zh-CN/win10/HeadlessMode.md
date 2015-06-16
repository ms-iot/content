---
layout: default
title: 有外设/无外设模式
permalink: /zh-CN/win10/HeadlessMode.htm
lang: zh-CN
---

##有外设模式和无外设模式

Windows IoT 核心版可处于有外设模式下，也可处于无外设模式下。这两种模式之间的区别在于是否存在任何形式的 UI。默认情况下，Windows 10 IoT 核心版处于有外设模式下，并显示计算机名称和 IP 地址等系统信息。在有外设模式下，标准 UAP UI 堆栈可用于完全交互式应用。在无外设模式下，不存在可用的 UI 堆栈并且应用不可交互。可以将无外设模式应用看作服务。

    NOTE: if you put your device into headless mode, the default app will not be available to display the IP address, so be sure to make a note of your device's name and IP address.

可以从 PowerShell 会话修改设备的有外设/无外设状态。若要查看 PowerShell 详细信息，请访问[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)。

* 若要显示设备的当前状态，请使用 `setbootoption` 实用工具，如下所示：

        [192.168.0.243]: PS C:\> setbootoption.exe

* 若要修改设备的状态以启用无外设模式，请将 `setbootoption` 实用工具与 `headless` 参数结合使用：

        [192.168.0.243]: PS C:\> setbootoption.exe headless
        [192.168.0.243]: PS C:\> shutdown /r /t 0

* 若要修改设备的状态以启用有外设模式，请将 `setbootoption` 实用工具与 `headed` 参数结合使用：

        [192.168.0.243]: PS C:\> setbootoption.exe headed
        [192.168.0.243]: PS C:\> shutdown /r /t 0

