---
layout: default
title: Headed/Headless Mode
permalink: /en-US/Docs/HeadlessMode.htm
lang: en-US
---

# Headed and Headless mode

Windows IoT Core can be configured for either *headed* or *headless* mode. The difference between these two modes is the presence or absence of any form of UI. In *headed* mode a single UI app will be launched at system boot and there can additionally be 0 or more "Background Apps"(StartupTasks). 
Devices that don't need UI functionality can be set to *headless* mode. The UI stack is disabled and UI apps will not launch. This reduces the amount of system resources used.  

    NOTE: If you put your device into headless mode, then you can use the Windows 10 IoT Core Dashboard application, described below, to find its' IP address.

## Changing the mode
You can modify the headed/headless state of your device from a Windows PowerShell session. To learn more about PowerShell, look at our [Power Shell for IoT]({{site.baseurl}}/{{page.lang}}/Samples/PowerShell.htm) doc.

* To display the current state of your device, use the `setbootoption` utility like this:

        [192.168.0.243]: PS C:\> setbootoption.exe

* To modify the state of your device to enable headless mode, use the `setbootoption` utility with the `headless` arg:

        [192.168.0.243]: PS C:\> setbootoption.exe headless
        [192.168.0.243]: PS C:\> shutdown /r /t 0

* To modify the state of your device to enable headed mode, use the `setbootoption` utility with the `headed` arg:

        [192.168.0.243]: PS C:\> setbootoption.exe headed
        [192.168.0.243]: PS C:\> shutdown /r /t 0

## Finding your headless device

A Windows IoT Core device that is in headless mode can be discovered using the **Windows 10 IoT Core Dashboard** application.  You can download the [IoT Dashboard](http://go.microsoft.com/fwlink/?LinkID=708576)
When running, the application listens for pings from any Windows IoT Core devices on the local network and displays device information such as the name, IP address, and more.

![Windows IoT Core Dashboard]({{site.baseurl}}/Resources/images/IoTDashboard.png)
