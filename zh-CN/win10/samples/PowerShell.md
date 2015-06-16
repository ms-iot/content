---
layout: default
title: 使用 PowerShell 连接到 Windows IoT 核心版设备。
permalink: /zh-CN/win10/samples/PowerShell.htm
lang: zh-CN
---

##使用 PowerShell 连接并配置运行 Windows IoT 核心版的设备

### 远程管理和配置
你可以使用 Windows PowerShell 远程配置和管理任何 Windows IoT 核心版设备。PowerShell 是基于任务的命令行 Shell 和脚本语言，专为进行系统管理而设计。

请务必遵循以下步骤正确配置你的 VM 或运行 Windows IoT 核心版的设备，以便正常使用 VisualStudio 2015。

###启动 PowerShell \(PS\) 会话
* 若要使用 Windows IoT 核心版设备启动 PS 会话，首先需要在主机与设备之间创建信任关系。在启动 Windows IoT 核心版设备后，与该设备相连的屏幕上将显示一个 IP 地址：

    ![Windows IoT 核心版上的 CoreDefaultApp]({{site.baseurl}}/images/DefaultApp.png)

    可以在 Windows IoT 核心版观察程序实用工具中找到相同信息。

* 在本地电脑上启动管理员 PS 控制台。执行此操作的最简单方法是在 Windows“开始”菜单旁的“搜索 Web 和 Windows”文本框中键入“powershell”： Windows 将在你的计算机上查找 PowerShell：

    ![查找 PowerShell]({{site.baseurl}}/images/powershell/start-ps.png)

    若要以管理员身份启动 PS，请右键单击“Windows PowerShell”项并选择“以管理员身份运行”：

    ![以管理员身份运行 PowerShell]({{site.baseurl}}/images/powershell/start-ps2.png)

    现在你应该看到 PS 控制台：

    ![PowerShell 控制台]({{site.baseurl}}/images/powershell/ps.PNG)

* 注意：你可能需要在桌面上启动 WinRM 服务以启用远程连接。在 PS 控制台中，键入以下命令：

        PS C:\> net start WinRM

* 在 PS 控制台中，键入以下命令，从而使用相应的值替代 `<machine-name or IP Address>`（使用**计算机-名称**是最简单的方法，但如果设备在网络上的名称不唯一，则尝试使用 IP 地址）：

        PS C:\> Set-Item WSMan:\localhost\Client\TrustedHosts -Value <machine-name or IP Address>

    输入 `Y` 确认更改。

* 注意：PS 存在一个已知问题，该问题可能在 PS 客户端计算机上引起 StackOverflowException。若要解决此问题，请在 Enter-PsSession 之前键入以下行：

        PS C:\> remove-module psreadline -force

* 现在，你可以使用你的 Windows IoT 核心版设备启动会话。在管理员 PS 控制台中，键入：

        PS C:\> Enter-PsSession -ComputerName <machine-name or IP Address> -Credential <machine-name or IP Address or localhost>\Administrator

    在凭据对话框中，输入以下默认密码：`p@ssw0rd`

        NOTE: The connection process is not immediate and can take up to 30 seconds.

    如果你已成功连接到设备，你应该可以在提示符之前看到设备的 IP 地址。

    ![PowerShell 控制台]({{site.baseurl}}/images/powershell/ps_device.PNG)

* **更新帐户密码：**

	**强烈建议**你更新管理员帐户的默认密码。

    若要执行此操作，请在 PowerShell 连接中发出以下命令：

    使用强密码替换 `[new password]`：

        [192.168.0.243]: PS C:\> net user Administrator [new password]

    只需运行一次以下命令：

        [192.168.0.243]: PS C:\> schtasks /Delete /TN Microsoft\Windows\IoT\Startup /F

###配置 Windows IoT 核心版设备

* 为了能够从 Visual Studio 2015 部署应用程序，你需要确保 Visual Studio 远程调试器正在 Windows IoT 核心版设备上运行。远程调试器应在计算机启动时自动启动。若要再次检查，请使用 `tlist` 命令列出 powershell 中所有正在运行的进程。应有两个 msvsmon.exe 的实例正在设备上运行。

* 在很长一段时间都处于非活动状态后，Visual Studio 远程调试器可能会超时。如果 Visual Studio 无法连接到 Windows IoT 核心版设备，请尝试重新启动设备。

* 你还可以根据需要重命名你的设备。若要更改“计算机名”，请使用 `setcomputername` 实用工具：

        [192.168.0.243]: PS C:\> setcomputername <new-name>

    需要重新启动设备才能使更改生效。可以使用 `shutdown` 命令，如下所示：

        [192.168.0.243]: PS C:\> shutdown /r /t 0

    重新启动后，可能需要重新运行此命令，以便使用新名称连接到设备：

        PS C:\> Set-Item WSMan:\localhost\Client\TrustedHosts -Value <new-name>

###常用的实用工具

有关可以与 PowerShell 结合使用的命令和实用工具的列表，请参阅[命令行实用工具]({{site.baseurl}}/{{page.lang}}/win10/tools/CommandLineUtils.htm)页面。
