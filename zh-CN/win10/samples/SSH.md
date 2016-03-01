---
layout: default
title: 使用 SSH 连接到 Windows IoT 核心版设备。
permalink: /zh-cn/win10/samples/SSH.htm
lang: zh-cn
---

##使用 SSH 连接并配置运行 Windows IoT 核心版的设备

###下载 SSH 客户端
若要使用 SSH 连接到设备，你将首先需要下载一个 SSH 客户端，例如 [PuTTY](http://the.earth.li/~sgtatham/putty/latest/x86/putty.exe)。

###连接到设备
* 若要连接到设备，你首先需要获取设备的 IP 地址。在启动 Windows IoT 核心版设备后，与该设备相连的屏幕上将显示一个 IP 地址：

    ![Windows IoT 核心版上的 DefaultApp]({{site.baseurl}}/Resources/images/DefaultApp.png)

* 现在，启动 PuTTY 并在 `Host Name` 文本框中输入 IP 地址，然后确保选择 `SSH` 单选按钮。然后单击“`Open`”。

    ![PuTTY 配置]({{site.baseurl}}/Resources/images/ssh/putty_config.png)

* 如果你是首次从计算机连接到设备，你可能会看到以下安全警告。只需单击 `Yes` 继续。

    ![PuTTY 安全警报]({{site.baseurl}}/Resources/images/ssh/putty_security_prompt.png)

* 如果连接成功，你应在屏幕上看到 `login as:`，提示你进行登录。输入 `Administrator` 并按 Enter。然后输入默认密码 `p@ssw0rd` 作为密码，并按 Enter。

    ![PuTTY 登录]({{site.baseurl}}/Resources/images/ssh/putty_login.png)

    如果你能够成功登录，你应看到如下内容：

    ![PuTTY 控制台]({{site.baseurl}}/Resources/images/ssh/putty_console.png)

###更新帐户密码

**强烈建议**你更新管理员帐户的默认密码。

若要执行此操作，请在 PuTTY 控制台中输入以下命令，从而使用强密码替换 `[new password]`：
    
    net user Administrator [new password]
    
###配置 Windows IoT 核心版设备
* 为了能够从 Visual Studio 2015 部署应用程序，你需要确保 Visual Studio 远程调试器正在 Windows IoT 核心版设备上运行。远程调试器应在计算机启动时自动启动。若要再次检查，请使用 tlist 命令从 powershell 列出所有正在运行的进程。应有两个 msvsmon.exe 的实例正在设备上运行。

* 在很长一段时间都处于非活动状态后，Visual Studio 远程调试器可能会超时。如果 Visual Studio 无法连接到 Windows IoT 核心版设备，请尝试重新启动设备。

* 你还可以根据需要重命名你的设备。若要更改“计算机名”，请使用 `setcomputername` 实用工具：

        setcomputername <new-name>

    需要重新启动设备才能使更改生效。可以使用 `shutdown` 命令，如下所示：

        shutdown /r /t 0
        
###常用的实用工具

有关可以与 SSH 结合使用的命令和实用工具的列表，请参阅[命令行实用工具]({{site.baseurl}}/{{page.lang}}/win10/tools/CommandLineUtils.htm)页面。
