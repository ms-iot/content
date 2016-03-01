---
layout: default
title: 使用 Windows 文件共享
permalink: /zh-cn/win10/samples/SMB.htm
lang: zh-cn
---

##使用 Windows 文件共享在你的设备中传输文件

###使用 Windows 文件共享访问你的文件
* Windows IoT 核心版设备上的文件共享服务器在设备启动时自动启动。若要连接到它，需要你的设备的 IP 地址。你可以在默认应用上找到该 IP 地址，该应用会在设备启动时启动。

    ![Windows IoT 核心版上的 DefaultApp]({{site.baseurl}}/Resources/images/DefaultApp.png)
    
* 有了 IP 后，在计算机上打开“文件资源管理器”并键入 `\\<TARGET_DEVICE>\c$`，其中 `<TARGET_DEVICE>` 是 Windows IoT 核心版设备的名称或 IP 地址，然后点击 Enter。如果出现提示，请输入你的管理员用户名和密码。用户名应使用 Windows IoT 核心版设备的 IP 地址作为前缀。示例: “192.168.1.118\\管理员”。

    ![文件资源管理器]({{site.baseurl}}/Resources/images/smb/smb_file_explorer.png)

* 现在你可以使用 Windows 文件共享来访问设备上的文件。

###启动和停止文件共享服务器
* 通过 [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) 或 [SSH]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm) 连接到你的设备。
* 默认情况下，文件共享服务器会在设备启动时启动。
* 若要停止文件共享服务器，请键入 `net stop Server /y`
* 若要启动文件共享服务器，请键入 `net start Server`

    ![服务器启动和停止]({{site.baseurl}}/Resources/images/smb/smb_start_stop.png)
    
###在启动时禁用和启用文件共享服务器
* 通过 [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) 或 [SSH]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm) 连接到你的设备。
* 默认情况下，文件共享服务器会在设备启动时启动。
* 若要禁用文件共享服务器以便它不会在设备启动时启动，请键入 `reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\services\lanmanserver /v Start /t REG_DWORD /d 0x3 /f`
* 若要启用文件共享服务器以便它在设备启动时启动，请键入 `reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\services\lanmanserver /v Start /t REG_DWORD /d 0x2 /f`

    ![服务器启用和禁用]({{site.baseurl}}/Resources/images/smb/smb_enable_disable.png)
