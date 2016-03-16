---
layout: default
title: 使用 PowerShell 连接到 Windows 10 IoT 核心版设备。
permalink: /zh-cn/win10/samples/PowerShell.htm
lang: zh-cn
---

## 使用 PowerShell 连接并配置运行 Windows 10 IoT 核心版的设备

### 远程管理和配置
你可以使用 Windows PowerShell 远程配置和管理任何 Windows 10 IoT 核心版设备。PowerShell 是基于任务的命令行 Shell 和脚本语言，专为进行系统管理而设计。

请务必遵循以下步骤正确配置运行 Windows 10 IoT 核心版的设备，以便正常使用 VisualStudio 2015。

### 启动 PowerShell \(PS\) 会话
* 若要使用 Windows 10 IoT 核心版设备启动 PS 会话，首先需要在主机电脑与设备之间创建信任关系。在启动 Windows IoT 核心版设备后，与该设备相连的屏幕上将显示一个 IP 地址：

    ![Windows 10 IoT 核心版上的 CoreDefaultApp]({{site.baseurl}}/Resources/images/DefaultApp.png)

    可以在 Windows 10 IoT Core Watcher 实用工具中找到相同信息。

* 在本地电脑上启动管理员 PS 控制台。执行此操作的最简单方法是在 Windows“开始”菜单旁的“搜索 Web 和 Windows”文本框中键入“powershell”： Windows 将在你的计算机上查找 PowerShell：

    ![查找 PowerShell]({{site.baseurl}}/Resources/images/powershell/start-ps.png)

    若要以管理员身份启动 PS，请右键单击“Windows PowerShell”项并选择“以管理员身份运行”：

    ![以管理员身份运行 PowerShell]({{site.baseurl}}/Resources/images/powershell/start-ps2.png)

    现在你应该看到 PS 控制台：

    ![PowerShell 控制台]({{site.baseurl}}/Resources/images/powershell/ps.PNG)

	**注意**：你可能需要在桌面上启动 WinRM 服务以启用远程连接。在 PS 控制台中，键入以下命令：

        net start WinRM

* 在 PS 控制台中，键入以下命令，从而使用相应的值替代 `<machine-name or IP Address>`（使用**计算机-名称**是最简单的方法，但如果设备在网络上的名称不唯一，则尝试使用 IP 地址）：

        Set-Item WSMan:\localhost\Client\TrustedHosts -Value <machine-name or IP Address>

    输入 `Y` 以确认更改。

	**注意：** 如果你想要连接多台设备，可以使用逗号和引号分隔每台设备。
        
        Set-Item WSMan:\localhost\Client\TrustedHosts -Value "<machine1-name or IP Address>,<machine2-name or IP Address>"
	
* 现在，你可以使用你的 Windows IoT 核心版设备启动会话。在管理员 PS 控制台中，键入：

        Enter-PSSession -ComputerName <machine-name or IP Address> -Credential <machine-name or IP Address or localhost>\Administrator

    在凭据对话框中，输入以下默认密码：`p@ssw0rd`
    
  **注意：** 连接过程不会立即完成，最多需要 30 秒。

    If you successfully connected to the device, you should see the IP address of your device before the prompt.

    ![PowerShell console]({{site.baseurl}}/Resources/images/powershell/ps_device.png)

* **更新帐户密码：**

	**强烈建议**你更新管理员帐户的默认密码。

    若要执行此操作，请在 PowerShell 连接中发出以下命令：

    使用强密码替换 `[new password]`：

        net user Administrator [new password]
        
    完成此操作后，你将需要使用具有新凭据的 Exit-PSSession 和 Enter-PSSession 来建立新的 PowerShell 会话。
    
    	Exit-PSSession
    	
    	Enter-PSSession -ComputerName <machine-name or IP Address> -Credential <machine-name or IP Address or localhost>\Administrator

### Visual Studio 远程调试程序疑难解答

* 为了能够从 Visual Studio 2015 部署应用程序，你将需要确保 Visual Studio 远程调试程序正在 Windows IoT 核心版设备上运行。远程调试器应在计算机启动时自动启动。若要再次检查，请使用 `tlist` 命令列出 powershell 中所有正在运行的进程。应有两个 msvsmon.exe 的实例正在设备上运行。

* 在很长一段时间都处于非活动状态后，Visual Studio 远程调试器可能会超时。如果 Visual Studio 无法连接到 Windows IoT 核心版设备，请尝试重新启动设备。

### 配置 Windows IoT 核心版设备

* 你还可以根据需要重命名你的设备。若要更改“计算机名”，请使用 `setcomputername` 实用工具：

        setcomputername <new-name>

    需要重新启动设备才能使更改生效。可以使用 `shutdown` 命令，如下所示：

        shutdown /r /t 0

    重新启动后，由于计算机名称已更改，你将需要重新运行此命令，以便使用新名称连接到设备：

        Set-Item WSMan:\localhost\Client\TrustedHosts -Value <new-name>
        
    你的 Windows IoT 核心版设备现在应该已正确配置，并且可供随时使用！

### 常用的实用工具

有关可以与 PowerShell 结合使用的命令和实用工具的列表，请参阅[命令行实用工具]({{site.baseurl}}/{{page.lang}}/win10/tools/CommandLineUtils.htm)页面。

### 已知问题与解决方法

**问题：** PowerShell 安全策略中的一个已知 Bug 会导致远程会话内的清单出现以下问题：

* Get-Help 返回异常匹配项。

* 指定模块上的 Get-Command 将返回空命令列表。

* 从以下任意模块运行 cmdlet 将引发 CommandNotFoundException： Appx、NetAdapter、NetSecurity、NetTCPIP、PnpDevice。

* 上述任意模块上的 Import-Module 将引发 PSSecurityException 异常（包含 UnauthorizedAccess）。模块自动加载似乎也不起作用。

**解决方法：** 将远程 PowerShell 会话内的执行策略修改为“RemoteSigned”。有关其他执行策略的更多详细信息，请参阅 [https://technet.microsoft.com/zh-cn/library/ee176961.aspx](https://technet.microsoft.com/zh-cn/library/ee176961.aspx){:target="_blank"}。

**问题：** 有时，某些模块中的 cmdlet（如 NetAdapter）不可见。例如，Get-Module NetAdapter 将返回一个空列表。

**解决方法：** 将“-Force”参数与 Import-Module 结合使用。例如，`Import-Module NetAdapter -Force`。

**问题：** 将执行策略设置为“AllSigned”时会中断 PS 远程控制。创建远程会话的后续尝试均失败，并且 SecurityException 正在加载 Typesv3.ps1xml。

**解决方法：** 使用 winrs.exe 还原 Powershell 执行策略：

* 更改控制台代码页 `Chcp 65001`
* 登录远程 cmd.exe shell `Winrs.exe -r:<target> -u:<username> -p:<password> cmd.exe`
* 在远程 cmd.exe 内，修改相应的注册表项 `reg add HKLM\Software\Microsoft\PowerShell\1\ShellIds\Microsoft.PowerShell /v ExecutionPolicy /d RemoteSigned /f`
* 退出远程 cmd.exe 会话 `exit`

### 其他已知问题

* 在 PS 脚本中，PowerShell 类或枚举的属性不起作用。添加属性化引发以下异常： “类型必须为运行时类型对象。”

* 出站 CIM 和 PS 远程不受支持。依赖 cmdlet 的相关功能将不起作用。其中包括： Enter-PSSession、Get-Job、Receive-Job、Import-Module、Invoke-Command、Copy-Item。

* 除非该会话使用 CredSSP 身份验证创建，否则 SecureString 命令“ConvertFrom-SecureString”和“ConverTo-SecureString”将不起作用。否则，必须指定“-Key”参数。有关配置 CredSSP 身份验证的详细信息，请参阅 [http://blogs.msdn.com/b/clustering/archive/2009/06/25/9803001.aspx](http://blogs.msdn.com/b/clustering/archive/2009/06/25/9803001.aspx){:target="_blank"}。
