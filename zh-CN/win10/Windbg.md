---
layout: default
title: 使用 WINDBG 进行调试
permalink: /zh-cn/win10/Windbg.htm
lang: zh-cn
---

#使用 WinDbg 调试 Windows 10 IoT 核心版设备

以下部分介绍如何成功将 WinDbg 连接到 Windows 10 IoT 核心版设备以实现调试目的。这包括描述设备上的必要软件设置以及物理硬件连接。

WinDbg 是一个非常强大的调试程序，大多数 Windows 开发人员都对其了如指掌。但是，如果你还不熟悉，并且想要了解有关 WinDbg 的详细信息，请访问以下链接：

* \[Windows 调试工具\]\(https://msdn.microsoft.com/library/windows/hardware/ff551063(v=vs.85).aspx\) 

* \[Windows 调试入门\]\(https://msdn.microsoft.com/zh-cn/library/windows/hardware/mt219729(v=vs.85).aspx\)

* \[使用 WinDbg 进行故障转储分析\]\(https://msdn.microsoft.com/zh-cn/library/windows/hardware/ff539316(v=vs.85).aspx\)


##MinnowBoard Max \(MBM\) 

可使用网络连接将 WinDbg 连接到 MinnowBoard Max。

###通过网络连接相连的 MinnowBoard Max \(MBM\) 和 WinDbg

为了通过网络使用 WinDbg 启用内核调试，请确保：

* 以太网电缆可将 MinnowBoard Max 连接到网络 

* MinnowBoard Max 在网络中具有有效的 IP 地址

* 可通过 [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) 活动连接到 MinnowBoard Max

通过使用活动 PowerShell 连接，可修改 MinnowBoard Max 上的两个 BCD 设置，以通过网络启用调试。

下面是需要运行的第一个命令：

        bcdedit -dbgsettings net hostip:<DEV_PC_IP_ADDRESS> port:<PORT_NUM> key:<KEY> 

* 此命令可通过网络启用调试。此外，它还可指定将要运行 WinDbg \(DEV\_PC\_IP\_ADDRESS\) 的电脑的 IP 地址、用于连接的网络端口号 \(PORT\_NUM\)，以及用于区分多个连接的唯一密钥 \(KEY\) 

* 对于 PORT\_NUM 和 KEY，可使用以下值作为示例： 分别是 50045 和 1.2.3.4，尽管你可以根据需要更改它们

下面是需要运行的第二个命令：

        bcdedit -debug on

* 此命令将在设备上打开调试 

在开发计算机上，可按照如下方式使用在之前步骤中提供的 PORT\_NUM 和 KEY 值启动 WinDbg：

        "c:\Program Files (x86)\Debugging Tools for Windows (x86)\windbg.exe" -k net:port=<PORT_NUM>,key=<KEY>

        Note: If you have any of the Windows kits installed, you may find WinDbg under "C:\Program Files (x86)\Windows Kits\10\Debuggers\x86\WinDbg.exe" 

##Raspberry Pi 2 \(RPi2\) 

可使用串行连接将 WinDbg 连接到 Raspberry Pi 2。

###通过串行连接相连的 Raspberry Pi 2 \(RPi2\) 和 Windbg

为了通过串行连接使用 WinDbg 启用内核调试，请确保：

* 你具有调试电缆，例如 [Adafruit](https://www.adafruit.com/product/954) 或 [FTDI](http://shop.clickandbuild.com/cnb/shop/ftdichip?productID=53&op=catalogue-product_info-null&prodCategoryID=105) 中的 USB-to-TTL 的串行电缆。 

* 以太网电缆可将 Raspberry Pi 2 连接到网络

* Raspberry Pi 2 在网络中具有有效的 IP 地址

* 可通过 [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) 活动连接到 Raspberry Pi 2

UART0 将在 Raspberry Pi 2 上用于内核调试连接。下面介绍了 Raspberry Pi 2 的 PIN 映射以及串行电缆：

        Raspberry Pi 2 pins:
            Pin #6 : GND
            Pin #8 : UART0 TX (3.3V)
            pin #10: UART0 RX (3.3V)

        Adafruit Cable:
            Black  : GND
            White  : RX  (3.3V)
            Green  : TX  (3.3V)
            Red    : PWR (5.0V NOT USED) <- DO NOT CONNECT!!
        
        FTDI Cable:
            Black  : GND
            Brown  : CTS (NOT USED)
            Red    : PWR (5.0V NOT USED) <- DO NOT CONNECT!!
            Orange : TX  (3.3V)
            Yellow : RX  (3.3V)
            Green  : RTS (NOT USED)

进行正确的串行连接的基本思想是，记住当一台设备使用其 TX 传输数据时，另一台设备使用其 RX 接收该数据。因此，下面介绍了应如何连接 RPi2：

        If using Adafruit's serial cable:
            [RPi2] Pin #6  (GND) <-> [Adafruti] Black (GND)
            [RPi2] Pin #8  (TX)  <-> [Adafruit] White (RX) 
            [RPi2] Pin #10 (RX)  <-> [Adafruit] Green (TX)
        
        If using FTDI's serial cable:
            [RPi2] Pin #6  (GND) <-> [FTDI] Black  (GND)
            [RPi2] Pin #8  (TX)  <-> [FTDI] Yellow (RX) 
            [RPi2] Pin #10 (RX)  <-> [FTDI] ORange (TX)

在将串行电缆的 USB 末尾连接到开发电脑（将要运行WinDbg）时，你将需要了解 Windows 分配到该末尾的 COM 端口号。最简单的方法是，在 Windows 中使用设备管理器并在“端口（COM 和 LPT）”下进行检查，以了解电缆在系统中分配到的 COM 编号。你将需要了解此信息才能执行后续步骤之一。

使用活动 PowerShell 连接到 Raspberry Pi 2，将修改两个 BCD 设置，以通过串行连接启用调试。

下面是需要运行的第一个命令：
    
        bcdedit -dbgsettings serial 

* 上述命令可启用用于调试的串行连接

* Raspberry Pi 2 波特率已硬编码到 921600，因此无需指定它

下面是需要运行的第二个命令：

        bcdedit -debug on

* 此命令将在设备上打开调试 

如上建议，请在开发电脑上使用设备管理器，以查找 USB-to-TTL 电缆在系统中分配到的 COM 端口号。你将需要了解 COM 端口号才能继续后续步骤。

在开发计算机上，可按照以下方式启动 WinDbg：

        "C:\Program Files (x86)\Debugging Tools for Windows (x86)\windbg.exe" -k com:port=<PORT>,baud=921600

        Note: If you have any of the Windows kits installed, you may find WinDbg under "C:\Program Files (x86)\Windows Kits\10\Debuggers\x86\WinDbg.exe" 

* 请注意，“端口”是指 USB-to-TTL 电缆在系统中分配并在“端口（COM 和 LPT）”下的设备管理器中显示的 COM 端口号。
