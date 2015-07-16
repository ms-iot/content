---
layout: default
title: Using WINDBG to debug
permalink: /en-US/win10/Windbg.htm
lang: en-US
---

##Connect Windows 10 IoT Core to WINDBG

Choose the appropriate section based on the board you are using.

###Connecting to a MinnowBoard Max (MBM)

* Ensure that your Ethernet cable is connected to your MBM

* Start your MBM and connect to it using PowerShell (you can find PowerShell instructions [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm))

* Configure your MBM by changing the following BCD settings:

        [192.168.0.243]: PS C:\> bcdedit -dbgsettings net hostip:<DEV_PC_IP_ADDRESS> port:<PORT_NUM> key:<KEY>

        [192.168.0.243]: PS C:\> bcdedit -debug on

* Note that 'DEV_PC_IP_ADDRESS' is the IP address of your development PC where you will be running WinDbg.  It is not the IP address of your MBM. 

* For 'PORT_NUM' and 'KEY', you can use the following values as examples: 50045 and 1.2.3.4 respectively. 

* On your development machine, start WINDBG with the 'PORT_NUM' and the 'KEY' values you provided in the previous steps:

        "c:\Program Files (x86)\Debugging Tools for Windows (x86)\windbg.exe" -k net:port=<PORT_NUM>, key=<KEY>


###Connecting to a Raspberry Pi 2 (RPi2)

* To use WINDBG with the RPi2, you will need a USB TTL UART cable.  [FTDI](http://www.ftdichip.com/Products/Cables/USBTTLSerial.htm){:target="_blank"} creates cables and drivers that work.  Note, when working, the cable will show up as a COM port on your desktop.  Make sure you have the correct drivers installed and can see the device in your Device Manager.  Connect the wires like this:

![rpi2_kernel_debugger_cxn]({{site.baseurl}}/images/kd/rpi2_kd.png)

* Start your RPi2 and connect to it using PowerShell (you can find PowerShell instructions [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm))

* Configure your RPi2 by changing the following BCD settings:

        [192.168.0.243]: PS C:\> bcdedit -dbgsettings serial baudrate:912600

        [192.168.0.243]: PS C:\> bcdedit -debug on

* On your development machine, open the device manager and find the COM port number that your USB TTL UART cable was assigned. 

* On your development machine, start WINDBG as follows:

        "C:\Program Files (x86)\Debugging Tools for Windows (x86)\windbg.exe" -k com:port=<PORT>, baud=912600

* Please note that 'PORT' refers to the COM port number your USB TTL UART cable was assigned by the system and displayed in the device manager. 