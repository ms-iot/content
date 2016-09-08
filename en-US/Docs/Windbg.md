---
layout: docs
title: WinDbg
description: Debug your Windows 10 IoT Core device using the powerful Windows debugger, WinDbg.
keyword: debug, windbg, windows iot
permalink: /en-US/Docs/Windbg.htm
lang: en-US
---

# WinDbg
Debug your Windows 10 IoT Core device using the powerful Windows debugger, WinDbg.

The following sections describe how to successfully connect with WinDbg to a Windows 10 IoT Core device for debugging purposes.  This includes a description of the necessary software settings on the device as well as the physical hardware connections.  

WinDbg is a very powerful debugger that most Windows developers are familiar with.  However, if you are just getting started and would like to learn more about WinDbg, please visit the following links:

* [Debugging Tools for Windows](https://msdn.microsoft.com/library/windows/hardware/ff551063(v=vs.85).aspx) 

* [Getting Started with Windows Debugging](https://msdn.microsoft.com/en-us/library/windows/hardware/mt219729(v=vs.85).aspx) 

* [Crash Dump Analysis Using WinDbg](https://msdn.microsoft.com/en-us/library/windows/hardware/ff539316(v=vs.85).aspx) 


## MinnowBoard Max (MBM) 
___

You can connect WinDbg to the MinnowBoard Max using a network connection.

### MinnowBoard Max (MBM) & WinDbg via a network connection

In order to enable kernel debugging with WinDbg over a network, please make sure that:

* An Ethernet cable is connecting your MinnowBoard Max to your network 

* Your MinnowBoard Max has a valid IP address in your network

* You have an active connection to the MinnowBoard Max via [PowerShell]({{site.baseurl}}/{{page.lang}}/Docs/PowerShell.htm) 

Using the active PowerShell connection you will modify two BCD settings on the MinnowBoard Max to enable debugging over the network.  

Here is the first command you need to run:   

        `bcdedit -dbgsettings net hostip:<DEV_PC_IP_ADDRESS> port:<PORT_NUM> key:<KEY>` 

* This command enables debugging over the network.  Additionally, it specifies the IP address of the PC where WinDbg will be running (DEV_PC_IP_ADDRESS), the network port number to use for the connection (PORT_NUM), and a unique key to be used to differentiate multiple connections (KEY) 

* For PORT_NUM and KEY, you can use the following values as examples: 50045 and 1.2.3.4 respectively, although you are free to change them as you see fit

Here is the second command you need to run:

        `bcdedit -debug on`

* This command turns on debugging on the device 

On your development machine, you can start WinDbg with the PORT_NUM and the KEY values you provided in the previous steps as follows:

        "c:\Program Files (x86)\Debugging Tools for Windows (x86)\windbg.exe" -k net:port=<PORT_NUM>,key=<KEY>

        Note: If you have any of the Windows kits installed, you may find WinDbg under "C:\Program Files (x86)\Windows Kits\10\Debuggers\x86\WinDbg.exe" 

* Reboot the IoTCore Device to reconnect to the debugger

## Raspberry Pi 2 or 3 (RPi2 or RPi3) 
___

You can connect WinDbg to the Raspberry Pi 2 or 3 using a serial connection.

### Raspberry Pi 2 or 3 (RPi2 or RPi3) & Windbg via a serial connection

In order to enable kernel debugging with WinDbg over a serial connection, please make sure that:

* You have a debug cable such as the USB-to-TTL Serial Cable from [Adafruit](https://www.adafruit.com/product/954) or [FTDI](http://shop.clickandbuild.com/cnb/shop/ftdichip?productID=53&op=catalogue-product_info-null&prodCategoryID=105). 

* An Ethernet cable or active WiFi connecting your Raspberry Pi 2 or 3 to your network (for IP connections like SSH or PowerShell)

* Your Raspberry Pi 2 or 3 has a valid IP address in your network

* You have an active connection to the Raspberry Pi 2 or 3 via [PowerShell]({{site.baseurl}}/{{page.lang}}/Docs/PowerShell.htm) or [SSH]({{site.baseurl}}/{{page.lang}}/Docs/SSH.htm)

UART0 will be used on the Raspberry Pi 2 or 3 for the kernel debugging connection.  The following shows the pin mappings for the Raspberry Pi 2 or 3 as well as the serial cables: 

        Raspberry Pi 2 or 3 pins:
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
			
The basic idea for making the correct serial connections is to remember that while one device uses its TX to transmit data, the other device uses its RX to receive the data.  Therefore, the following is how you should connect your RPi2 or RPi3:

        If using Adafruit's serial cable:
            [RPi2 or RPi3] Pin #6  (GND) <-> [Adafruti] Black (GND)
            [RPi2 or RPi3] Pin #8  (TX)  <-> [Adafruit] White (RX) 
            [RPi2 or RPi3] Pin #10 (RX)  <-> [Adafruit] Green (TX)
        
        If using FTDI's serial cable:
            [RPi2 or RPi3] Pin #6  (GND) <-> [FTDI] Black  (GND)
            [RPi2 or RPi3] Pin #8  (TX)  <-> [FTDI] Yellow (RX) 
            [RPi2 or RPi3] Pin #10 (RX)  <-> [FTDI] ORange (TX)

When you connect the USB end of the serial cable to your development PC (where WinDbg will be running), you will need to know what COM port number Windows assigned to it.  The easiest way is to use the Device Manager in Windows and check under the "Ports (COM & LPT)" section to know what COM number your cable was assigned in the system.  You will need to know this information for one of the later steps! 

Using the active PowerShell or SSH connection to your Raspberry Pi 2 or 3, you will modify two BCD settings to enable debugging over the serial connection.

Here is the first command you need to run:   

`bcdedit -dbgsettings serial` 

* The above command enables the serial connection for debugging

* The baud-rate for the Raspberry Pi 2 or 3 is hard-coded to 921600, so you don't have to specify it

Here is the second command you need to run:

`bcdedit -debug on`

* This command turns on debugging on the device 

As suggested earlier, use the Device Manager on your development PC to find out what COM port number the USB-to-TTL cable was assigned in the system. You will need to know the COM port number for the following step. 

On your development machine you can start WinDbg as follows:

```
"C:\Program Files (x86)\Debugging Tools for Windows (x86)\windbg.exe" -k com:port=<PORT>,baud=921600
```

Note: If you have any of the Windows kits installed, you may find WinDbg under "C:\Program Files (x86)\Windows Kits\10\Debuggers\x86\WinDbg.exe" 

* Please note that 'PORT' refers to the COM port number your USB-to-TTL cable was assigned in the system and displayed in the Device Manager under "Ports (COM & LPT)".

* Reboot the IoTCore Device to reconnect to the debugger


## DragonBoard (DB) 
___

You can connect WinDbg to the DragonBoard using a serial or USB connection.

### DragonBoard & Windbg via USB connection
By default the USB debugger settings are configured in the test images. 
Using the active PowerShell or SSH connection to your DragonBoard, you will modify one BCD settings to enable debugging over the USB connection.

`bcdedit /store c:\EFIESP\EFI\Microsoft\Boot\BCD /debug {default} ON`

{% include note.html text="Once USB kernel debugger is on then USB ports on the DragonBoard device might not work (i.e. keyboard, usb Ethernet might not work)." %}

### DragonBoard & Windbg via serial connection

Using the active PowerShell or SSH connection to your DragonBoard, you will modify two BCD settings to enable debugging over the serial connection.

`bcdedit /store c:\EFIESP\EFI\Microsoft\Boot\BCD /debug {default} ON`

* This command enables the kernel debugger

`bcdedit /store c:\EFIESP\EFI\Microsoft\Boot\BCD /dbgsettings  Serial debugport:1 baudrate:115200`

* This command configures the serial port for kernel debugging.




