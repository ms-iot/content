---
layout: default
title: 驱动程序实验 - 部署驱动程序并确认安装
permalink: /zh-CN/win10/samples/DriverLab3.htm
lang: zh-CN
---

##部署驱动程序并确认安装

本练习将演示如何手动复制驱动程序并将其安装到 Windows IoT Core 设备。首先，我们将使用文件传输协议 \(FTP\) 将文件从开发计算机传输到目标设备（Windows IoT Core 设备）。然后，我们将使用 PowerShell 安装驱动程序。

### 使用文件传输协议 \(FTP\) 将文件从开发计算机传输到目标设备（Windows IoT Core 设备）。

#### 在目标设备上（这是你的 Raspberry Pi 2 或 MinnowBoard Max）
* 启动你的 Windows IoT Core 设备，请记下当设备首次启动时在其附加屏幕上所显示的名称或 IP 地址。

#### 在开发计算机上

* 打开一个文件资源管理器窗口，并在地址栏中键入 `ftp://<TARGET_DEVICE>`，其中 `<TARGET_DEVICE>` 是名称或你的 Windows IoT Core 设备的 IP 地址：

    ![使用文件资源管理器的 FTP]({{site.baseurl}}/images/DriverLab/ftp1.png)

    如果系统提示你输入用户名和密码，请使用以下凭据：

        User Name: Administrator
        Password:  p@ssw0rd

    注意： **强烈建议**你更新默认的管理员帐户密码。请按照在[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)获取的说明进行操作。

* 导航到 FTP 文件资源管理器窗口中的 `\windows\system32\` 文件夹：

    ![使用文件资源管理器的 FTP]({{site.baseurl}}/images/DriverLab/ftp2.png)

* 从开发计算机将以下两个文件（在上一练习中在 Visual Studio 中生成驱动程序时创建）拖放（复制）到 IoT Core 设备上的 `\windows\system32\` 文件夹：

        gpiokmdfdemo.inf
        gpiokmdfdemo.sys

* 将 `ACPITABL.dat` 文件（在上一练习中在生成 ACPI 表时创建）拖放（复制）到 `\windows\system32\` 文件夹。

* 验证以下文件是否已使用 FTP 成功传送到  IoT Core 设备中的 `\windows\system32\` 文件夹：

        gpiokmdfdemo.inf
        gpiokmdfdemo.sys
        ACPITABL.dat

* 后续步骤涉及到使用 PowerShell 连接到目标设备，如[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)所述。

### 在使用 BCDEDIT 的目标设备上启用测试签名

我们将使用 **bcdedit** 在目标设备（即 Windows IoT Core 设备）上启用测试签名。从在上一步中打开的提升的 PowerShell 命令窗口中运行以下命令：

    [192.168.0.243]: PS C:\> bcdedit /store C:\EFIESP\EFI\Microsoft\boot\BCD /set testsigning on

### 重新启动目标 Windows IoT Core 设备

在 PowerShell 窗口中，键入以下命令：

    [192.168.0.243]: PS C:\> shutdown /r /t 0

目标设备将重新启动。重新启动后，请确保 PowerShell 仍连接到它，否则，如[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)所述，使用 PowerShell `enter-pssession` 命令重新连接到目标设备。

### 安装演示驱动程序

使用 PowerShell 窗口，导航到目标设备上的 `C:\Windows\System32` 目录：

    [192.168.0.243]: PS C:\> cd C:\Windows\System32

我们将使用 `devcon.exe` 工具安装我们的演示驱动程序。在 PowerShell 窗口中，键入以下命令：

    [192.168.0.243]: PS C:\> devcon.exe install gpiokmdfdemo.inf ACPI\GPOT0001

### 重新启动目标 Windows IoT Core 设备

在 PowerShell 窗口中，键入以下命令：

    [192.168.0.243]: PS C:\> shutdown /r /t 0

目标设备将重新启动。重新启动后，请确保 PowerShell 仍连接到它，否则，如[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)所述，使用 PowerShell `enter-pssession` 命令重新连接到目标设备。

### 删除综合节点

我们将使用 `devcon.exe` 工具删除综合节点。在 PowerShell 窗口中，键入以下命令：

    [192.168.0.243]: PS C:\> devcon.exe remove ACPI\GPOT0001

注意： 在删除综合节点后，该示例驱动程序才会运行。

### 重新启动目标设备

在 PowerShell 窗口中，键入以下命令：

    [192.168.0.243]: PS C:\> shutdown /r /t 0

目标设备将重新启动。重新启动后，请确保 PowerShell 仍连接到它，否则，如[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)所述，使用 PowerShell `enter-pssession` 命令重新连接到目标设备。

### 检查驱动程序状态

在 PowerShell 窗口中，键入以下命令：

    [192.168.0.243]: PS C:\> devcon status ACPI\GPOT0001

你应看到以下输出：

    ACPI\GPOT0001\1
        Name: GPIO KMDF Demo Device
        Driver is running.
    1 matching device(s) found.

### 将提供的电阻器和 LED 连接到目标设备

按照[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)的说明将电阻器和 LED 连接到你的 Windows IoT Core 设备。

### 使用提供的应用程序与驱动程序通信

我们已提供一个称为 BlinkyApp.exe 的预生成二进制应用程序，它可与驱动程序通信来打开/关闭 LED。可以在 `<Samples-Folder>\DriverSamples\BlinkyApp\BlinkyApp_<PLATFORM>.exe` 找到应用程序。

对于 MinnowBoard Max，`<PLATFORM>` 将会是 `x86`。对于 Raspberry Pi 2，`<PLATFORM>` 将会是 `ARM`。

你将需要使用 FTP 或某些其他方式，将此文件复制到目标设备（Windows IoT Core 设备）。

在 PowerShell 窗口中，导航到你将 `BlinkyApp_<PLATFORM>.exe` 复制到的文件夹，并键入以下命令：

    [192.168.0.243]: PS C:\> .\BlinkyApp_<PLATFORM>.exe help

应当可以看到类似于以下内容的帮助菜单：

    BlinkyApp: Interactive GPIO app demo tool
    Commands:

      help              Prints this help message.
      (l)ow 2           Writes GPIO 5 LOW.
      (h)igh 2          Writes GPIO 5 HIGH.

    Example:

      BlinkyApp.exe low 2
      BlinkyApp.exe high 2

	 ------------------------------------------------------------
	 Pin mapping for RPi2 from rpi2.asl

		GPIO    #   | Parameter |  Example (GPIO low)   |  Example (GPIO high)
		GPIO [  0 ]    =  0        BlinkyApp.exe l  0   |  BlinkyApp.exe h  0
		GPIO [  1 ]    =  1        BlinkyApp.exe l  1   |  BlinkyApp.exe h  1
		GPIO [  5 ]    =  2        BlinkyApp.exe l  2   |  BlinkyApp.exe h  2
		GPIO [  6 ]    =  3        BlinkyApp.exe l  3   |  BlinkyApp.exe h  3
		GPIO [ 12 ]    =  4        BlinkyApp.exe l  4   |  BlinkyApp.exe h  4
		GPIO [ 13 ]    =  5        BlinkyApp.exe l  5   |  BlinkyApp.exe h  5
		GPIO [ 16 ]    =  6        BlinkyApp.exe l  6   |  BlinkyApp.exe h  6
		GPIO [ 18 ]    =  7        BlinkyApp.exe l  7   |  BlinkyApp.exe h  7
		GPIO [ 22 ]    =  8        BlinkyApp.exe l  8   |  BlinkyApp.exe h  8
		GPIO [ 23 ]    =  9        BlinkyApp.exe l  9   |  BlinkyApp.exe h  9
		GPIO [ 24 ]    = 10        BlinkyApp.exe l 10   |  BlinkyApp.exe h 10
		GPIO [ 25 ]    = 11        BlinkyApp.exe l 11   |  BlinkyApp.exe h 11
		GPIO [ 26 ]    = 12        BlinkyApp.exe l 12   |  BlinkyApp.exe h 12
		GPIO [ 27 ]    = 13        BlinkyApp.exe l 13   |  BlinkyApp.exe h 13
		GPIO [ 35 ]    = 14        BlinkyApp.exe l 14   |  BlinkyApp.exe h 14
		GPIO [ 47 ]    = 15        BlinkyApp.exe l 15   |  BlinkyApp.exe h 15

如果你在 Raspberry Pi 2 上使用 GPIO \#5，则键入以下命令来打开 LED：

    [192.168.0.243]: PS C:\> .\BlinkyApp_<PLATFORM>.exe low 2

###注意：
根据[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)所述的连接 LED 的方式，驱动 GPIO 走低会使 LED 点亮。

若要关闭 LED，只需键入：

    [192.168.0.243]: PS C:\> .\BlinkyApp_<PLATFORM>.exe high 2

