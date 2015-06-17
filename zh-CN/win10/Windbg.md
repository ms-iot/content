---
layout: default
title: 使用 WINDBG 进行调试
permalink: /zh-CN/win10/Windbg.htm
lang: zh-CN
---

###连接到 MinnowBoard Max \(MBM\)

* 确保你的以太网电缆已连接到你的 MBM

* 启动 MBM 并使用 PowerShell 进行连接（[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)提供了 PowerShell 相关说明）

* 通过按照如下方式更改 bcd 设置来配置 MBM：

        [192.168.0.243]: PS C:\> bcdedit -store C:\EFIESP\efi\Microsoft\Boot\bcd -dbgsettings net hostip:<IP address of machine running WINDBG> port:<PORTNUM>

        [192.168.0.243]: PS C:\> bcdedit -store C:\EFIESP\efi\Microsoft\Boot\bcd -debug on

* 借助你的开发计算机，使用提供的 <PORT> 和上一步中生成的密钥来启动 WINDBG：

        "c:\Program Files (x86)\Debugging Tools for Windows (x86)\windbg.exe" -k net:port=<PORT>,key=<GENERATED KEY>

###连接到 Raspberry Pi 2 \(RPi2\)

* 若要将 WINDBG 与 RPi2 结合使用，你需要一根 USB TTL UART 电缆。[FTDI](http://www.ftdichip.com/Products/Cables/USBTTLSerial.htm) 创建了适合的电缆和驱动程序。注意，当此类电缆运行时，它将在桌面上显示为一个 COM 端口。请确保你已安装正确的驱动程序，并且可以在设备管理器中看到此设备。按如下方式连接电线：

![rpi2\_kernel\_debugger\_cxn]({{site.baseurl}}/images/kd/rpi2_kd.png)

* 启动 RPi2 并使用 PowerShell 进行连接（[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)提供了 PowerShell 相关说明）

* 通过按照如下方式更改 bcd 设置来配置 RPi2：

        [192.168.0.243]: PS C:\> bcdedit -store C:\EFIESP\efi\Microsoft\Boot\bcd -dbgsettings serial

        [192.168.0.243]: PS C:\> bcdedit -store C:\EFIESP\efi\Microsoft\Boot\bcd -debug on

* 从你的开发计算机，打开设备管理器并找到转换器所使用的 COM 端口。

* 借助你的开发计算机，使用提供的 <PORT> 和上一步中生成的密钥来启动 WINDBG：

        "C:\Program Files (x86)\Debugging Tools for Windows (x86)\windbg.exe" -k com:port=<PORT>,baud=921600
