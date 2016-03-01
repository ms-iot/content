---
layout: default
title: 驱动程序实验 - 部署驱动程序并确认安装
permalink: /zh-cn/win10/samples/DriverLab3.htm
lang: zh-cn
---

#安装示例驱动程序

本部分将演示如何手动复制驱动程序并将其安装到 Windows IoT 核心版设备：
 
* 首先，我们将通过“文件资源管理”窗口使用**服务器消息块 \(SMB\)** 协议，将文件从开发电脑传输到目标 Windows 10 IoT 核心版设备。  
* 然后，我们将使用 PowerShell 运行几个 **devcon.exe** 命令，以便安装驱动程序。

<br/>

你也可以按照[本页]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab4.htm)上的相关说明，在驱动程序开发期间使用 Visual Studio 部署驱动程序

<br/>

## 使用 SMB 传输驱动程序文件 

* 首先，启动你的 Windows 10 IoT 核心版设备，并记下该设备首次启动时在其附加屏幕上所显示的 IP 地址。

* 接下来，在你的开发电脑上，打开“文件资源管理器”窗口，并在地址栏中键入 `\\<TARGET_DEVICE>\C$\`，然后点击 Enter。在此特定情况下，`<TARGET_DEVICE>` 是 Windows 10 IoT 核心版设备的 IP 地址：

    ![使用文件资源管理器的 SMB]({{site.baseurl}}/Resources/images/DriverLab/smb1.png)

    如果系统提示你输入用户名和密码，而你未更改过默认的用户名和密码，请使用以下凭据：

        User Name: <TARGET_DEVICE>Administrator
        Password:  p@ssw0rd

    ![使用文件资源管理器的 SMB]({{site.baseurl}}/Resources/images/DriverLab/cred1.png)

    注意： **强烈建议**你更新默认的管理员帐户密码。请按照在[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)找到的说明进行操作。

* 导航到 SMB 文件资源管理器窗口中的 `\windows\system32\` 文件夹：

    ![使用文件资源管理器的 SMB]({{site.baseurl}}/Resources/images/DriverLab/smb2.png)

* 将以下两个文件（上一部分中在 Visual Studio 中生成驱动程序时所创建）从开发计算机拖放（复制）到 IoT 核心版设备上的 `\windows\system32\` 文件夹：

        gpiokmdfdemo.inf
        gpiokmdfdemo.sys

* 将 `ACPITABL.dat` 文件（上一部分中在生成 ACPI 表时所创建）拖放（复制）到 `\windows\system32\` 文件夹。

* 验证以下文件是否已使用“文件资源管理器”窗口和 **SMB** 成功传输到 IoT 核心版设备中的 `\windows\system32\` 文件夹：

        gpiokmdfdemo.inf
        gpiokmdfdemo.sys
        ACPITABL.dat

后续步骤涉及到使用 PowerShell 连接到目标设备，如[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)所述。确保具有一个到 Windows 10 IoT 核心版设备的活动的 PowerShell 连接。

<br/>

##安装示例驱动程序

* 使用 PowerShell `enter-pssession` 命令连接到目标设备，如[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)所述。

* 通过使用 PowerShell 窗口，导航到目标设备上的 `C:\Windows\System32` 目录：
    
        [192.168.0.243]: PS C:\> cd C:\Windows\System32

* 我们将使用 `devcon.exe` 工具安装示例驱动程序。在 PowerShell 窗口中，键入以下命令：

        [192.168.0.243]: PS C:\Windows\System32> devcon.exe dp_add gpiokmdfdemo.inf 

<br/>

##重新启动 Windows IoT 核心版设备

从 PowerShell 窗口中，键入以下命令：

    [192.168.0.243]: PS C:\> shutdown /r /t 0

目标设备将重新启动。重新启动后，请确保 PowerShell 仍能连接到它，否则，使用 PowerShell `enter-pssession` 命令重新连接到目标设备，如[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)所述。

<br/>

##检查示例驱动程序的状态

从 PowerShell 窗口中，键入以下命令：

    [192.168.0.243]: PS C:\> devcon status ACPI\GPOT0001

你应看到以下输出：

    ACPI\GPOT0001\1
        Name: GPIO KMDF Demo Device
        Driver is running.
    1 matching device(s) found.

<br/>

##切换 GPIO

按照[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)的说明将电阻器和 LED 连接到你的 Windows IoT 核心版设备。当你切换已连接到 LED 的 GPIO 时，LED 将打开或关闭。

###使用提供的应用程序与驱动程序通信

我们已提供一个称为 BlinkyApp.exe 的预生成二进制应用程序，它可与驱动程序通信来打开/关闭 LED。可以在 `DriverSamples\BlinkyApp\BlinkyApp_<PLATFORM>.exe` 找到应用程序。

对于 MinnowBoard Max，`<PLATFORM>` 将会是 `x86`。对于 Raspberry Pi 2，`<PLATFORM>` 将会是 `ARM`。

你将需要使用 SMB 或其他一些方式，将此文件复制到目标设备（Windows IoT 核心版设备）。

在 PowerShell 窗口中，导航到你将 `BlinkyApp_<PLATFORM>.exe` 复制到的文件夹，并键入以下命令：

    [192.168.0.243]: PS C:\> .\BlinkyApp_<PLATFORM>.exe help

应当可以看到类似于以下内容的帮助菜单：

    BlinkyApp: GPIO app tool

    Commands:

      help      : Prints this help message.
      (l)ow  5  : Sets GPIO #5 LOW.
      (h)igh 5  : Sets GPIO #5 HIGH.


    Raspberry Pi 2 (RPi2) [ARM]: GPIO Pin Mapping and Examples

      GPIO No. |      Example       |      Example       | Header
               |     (GPIO low)     |     (GPIO high)    | Pin No.
      GPIO  4  | BlinkyApp.exe l  4 | BlinkyApp.exe h  4 |    7
      GPIO  5  | BlinkyApp.exe l  5 | BlinkyApp.exe h  5 |   29
      GPIO  6  | BlinkyApp.exe l  6 | BlinkyApp.exe h  6 |   31
      GPIO 12  | BlinkyApp.exe l 12 | BlinkyApp.exe h 12 |   32
      GPIO 13  | BlinkyApp.exe l 13 | BlinkyApp.exe h 13 |   33
      GPIO 16  | BlinkyApp.exe l 16 | BlinkyApp.exe h 16 |   36
      GPIO 18  | BlinkyApp.exe l 18 | BlinkyApp.exe h 18 |   12
      GPIO 22  | BlinkyApp.exe l 22 | BlinkyApp.exe h 22 |   15
      GPIO 23  | BlinkyApp.exe l 23 | BlinkyApp.exe h 23 |   16
      GPIO 24  | BlinkyApp.exe l 24 | BlinkyApp.exe h 24 |   18
      GPIO 25  | BlinkyApp.exe l 25 | BlinkyApp.exe h 25 |   22
      GPIO 26  | BlinkyApp.exe l 26 | BlinkyApp.exe h 26 |   37
      GPIO 27  | BlinkyApp.exe l 27 | BlinkyApp.exe h 27 |   13

如果你在 Raspberry Pi 2 上使用 GPIO \#5，则键入以下命令来打开 LED：

    [192.168.0.243]: PS C:\> .\BlinkyApp_<PLATFORM>.exe low 5

###注意：
根据[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)所述的连接 LED 的方式，驱动 GPIO 走低会使 LED 点亮。

若要关闭 LED，只需键入：

    [192.168.0.243]: PS C:\> .\BlinkyApp_<PLATFORM>.exe high 5

###使用 Visual Studio 部署驱动程序 
现在你知道了如何手动部署驱动程序，你也可以按照[本页]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab4.htm)上的相关说明使用 Visual 部署驱动程序。
    
