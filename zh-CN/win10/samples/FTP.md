---
layout: default
title: 使用 FTP
permalink: /zh-cn/win10/samples/FTP.htm
lang: zh-cn
---

##使用 FTP 在你的设备中传输文件

###通过 FTP 访问你的文件<a name="accessftp"/>
* 你的 Windows IoT 核心版设备上的 FTP 服务器在设备启动时自动启动。若要连接到它，需要你的设备的 IP 地址。你可以在默认应用上找到该 IP 地址，该应用会在设备启动时启动。

    ![Windows IoT 核心版上的 DefaultApp]({{site.baseurl}}/Resources/images/DefaultApp.png)
    
* 有了 IP 后，在计算机上打开“文件资源管理器”并键入 `ftp://<TARGET_DEVICE>`，其中 `<TARGET_DEVICE>` 是 Windows IoT 核心版设备的名称或 IP 地址，然后点击 Enter。如果出现提示，请输入你的管理员用户名和密码。

    ![FTP 资源管理器]({{site.baseurl}}/Resources/images/ftp/ftp_explorer.png)

* 现在，你可以通过 FTP 访问你的设备上的文件。

###停止在你的设备上运行 FTP 服务器<a name="stopftp"/>
* 默认情况下，FTP 服务器运行在你的设备上。若要在你的设备上停止 FTP 服务器，则首先需要通过 [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) 或 [SSH]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm) 连接到你的设备。  
* 如果使用 PowerShell 进行连接，请键入 `kill -processname ftpd*` 以停止 FTP 进程。

    ![FTP PowerShell 停止]({{site.baseurl}}/Resources/images/ftp/ftp_kill_powershell.png)
    
* 如果使用 SSH 进行连接，请键入 `kill ftpd*` 以停止 FTP 进程。

    ![FTP SSH 停止]({{site.baseurl}}/Resources/images/ftp/ftp_kill_ssh.png)
    
###在你的设备上启动 FTP 服务器
* 先通过 [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) 或 [SSH]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm) 连接到你的设备。
* 键入 `start C:\Windows\System32\ftpd.exe`
* 你可以通过键入 `tlist` 检查该服务器是否正在运行，这将列出所有运行中的进程。如果 FTP 服务器正在运行，你应该能在该列表中看到 `ftpd.exe`。

    ![FTP 启动]({{site.baseurl}}/Resources/images/ftp/ftp_start.png)

###更改 FTP 根目录
* 默认情况下，FTP 服务器将在设备的根目录 C:\\ 下显示所有文件夹。若要更改根目录，我们将按照相同步骤启动 FTP 服务器，但需要作为参数传入根目录的情况除外。
* 若要更改它，请先通过 [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) 或 [SSH]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm) 连接到你的设备。
* 如果 FTP 进程已在运行，请[停止](#stopftp)该进程。
* 键入 `start C:\Windows\System32\ftpd.exe <PATH_TO_DIRECTORY>`，其中 `<PATH_TO_DIRECTORY>` 是要设置为根目录的目录的绝对路径，例如 `C:\Users\DefaultAccount`。

    ![带有参数的 FTP 启动]({{site.baseurl}}/Resources/images/ftp/ftp_start_parameter.png)
    
* 现在，当你通过 FTP [连接](#accessftp)到你的设备时，你将看到所设置的根目录的内容。

    ![具有新的根目录的 FTP 资源管理器]({{site.baseurl}}/Resources/images/ftp/ftp_explorer_parameter.png)

* 若要使此更改永久有效，我们需要编辑脚本，以在设备打开时启动 FTP 服务器。为此，请打开“文件资源管理器”并键入 `\\<TARGET_DEVICE>\c$\Windows\System32`，其中 `<TARGET_DEVICE>` 是你的 Windows IoT 核心版设备的名称或 IP 地址。

    ![FTP 资源管理器编辑脚本]({{site.baseurl}}/Resources/images/ftp/ftp_edit_script.png)
    
* 找到 `IoTStartupOnBoot.cmd`、右键单击它，然后单击“`Edit`”。

    ![FTP 资源管理器右键单击]({{site.baseurl}}/Resources/images/ftp/ftp_right_click.png)
    
* 如果弹出一个安全对话框，只需单击“运行”。

    ![“FTP 安全”对话框]({{site.baseurl}}/Resources/images/ftp/ftp_security_warning.png)
    
* 现在，默认文本编辑器应该已打开。查找包含 `start ftpd.exe` 的行。

    ![FTP 命令]({{site.baseurl}}/Resources/images/ftp/ftp_edit_command.png)

* 将其更改为 `start ftpd.exe <PATH_TO_DIRECTORY>`，其中 `<PATH_TO_DIRECTORY>` 是要设置为根目录的目录的绝对路径，例如 `C:\Users\DefaultAccount`。然后，保存文件并关闭窗口。

    ![FTP 新命令]({{site.baseurl}}/Resources/images/ftp/ftp_save.png)
    
* 现在，当你重新启动你的设备时，FTP 服务器将启动新的根目录。