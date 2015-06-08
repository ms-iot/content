---
layout: default
title: Using WINDBG to debug
permalink: /en-US/win10/Windbg.htm
lang: en-US
---

##Conect Windows 10 IoT Core to WINDBG

Choose the appropriate section based on the board you are using.

###Connecting to a MinnowBoard Max (MBM)

* Ensure that your ethernet cable is connected to your MBM

* Start your MBM and connect to it using PowerShell (you can find PowerShell instructions [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm))

* Configure your MBM, by changing the bcd settings like this:

        [192.168.0.243]: PS C:\> bcdedit -store C:\EFIESP\efi\Microsoft\Boot\bcd -dbgsettings net hostip:<IP address of machine running WINDBG> port:<PORTNUM>

        [192.168.0.243]: PS C:\> bcdedit -store C:\EFIESP\efi\Microsoft\Boot\bcd -debug on

* From your development machine, start WINDBG with the <PORT> you provided and the key that was generated in the previous step:

        "c:\Program Files (x86)\Debugging Tools for Windows (x86)\windbg.exe" -k net:port=<PORT>,key=<GENERATED KEY>

###Connecting to a Raspberry Pi 2 (RPi2)

* To use WINDBG with the RPi2, you will need a USB TTL UART cable.  [FTDI](http://www.ftdichip.com/Products/Cables/USBTTLSerial.htm){:target="_blank"} creates cables and drivers that work.  Note, when working, the cable will show up as a COM port on your desktop.  Make sure you ahve the correct drivers installed and can see the device in your Device Manager.  Connect the wires like this:

![rpi2_kernel_debugger_cxn]({{site.baseurl}}/images/kd/rpi2_kd.png)

* Start your RPi2 and connect to it using PowerShell (you can find PowerShell instructions [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm))

* Configure your RPi2, by changing the bcd settings like this:

        [192.168.0.243]: PS C:\> bcdedit -store C:\EFIESP\efi\Microsoft\Boot\bcd -dbgsettings serial debugport:1 baudrate:115200

        [192.168.0.243]: PS C:\> bcdedit -store C:\EFIESP\efi\Microsoft\Boot\bcd -debug on

* From your development machine, open the device manager and find the COM port your converter is using.

* From your development machine, start WINDBG with the <PORT> you provided and the key that was generated in the previous step:

        "C:\Program Files (x86)\Debugging Tools for Windows (x86)\windbg.exe" -k com:port=<PORT>,baud=912600
