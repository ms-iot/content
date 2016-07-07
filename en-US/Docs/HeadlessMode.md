---
layout: default
title: Headed/Headless Mode
permalink: /en-US/Docs/HeadlessMode.htm
lang: en-US
---

# Headed and Headless mode

Windows 10 IoT Core can be configured for either *headed* or *headless* mode. 

### Headed mode
Headed mode is defined by the prescence of UI. In *headed* mode a single UI app will be launched at system boot and there can additionally be 0 or more "Background Apps"(StartupTasks). 

### Headless mode
Headelss mode has no UI.  Devices that don't need UI functionality can be set to *headless* mode. The UI stack is disabled and UI apps will not launch. This reduces the amount of system resources used. If you attach a monitor to your device, the screen will simply be black.

    NOTE: If you put your device into headless mode, then you can use the Windows 10 IoT Core Dashboard application, described below, to find its IP address.

## Changing the mode
You can modify the headed/headless state of your device from a Windows PowerShell session or an SSH session. To learn more about PowerShell, see the [Power Shell for IoT Core]({{site.baseurl}}/{{page.lang}}/Samples/PowerShell.htm) page. To learn more about SSH, see the [SSH for IoT Core]({{site.baseurl}}/{{page.lang}}/Docs/SSH.htm) page.

* To display the current state of your device, use the `setbootoption` utility:

        [192.168.0.243]: PS C:\> setbootoption.exe

* To modify the state of your device to enable headless mode, use the `setbootoption` utility with the `headless` arg:

        [192.168.0.243]: PS C:\> setbootoption.exe headless
        [192.168.0.243]: PS C:\> shutdown /r /t 0

* To modify the state of your device to enable headed mode, use the `setbootoption` utility with the `headed` arg:

        [192.168.0.243]: PS C:\> setbootoption.exe headed
        [192.168.0.243]: PS C:\> shutdown /r /t 0

## Finding your headless device

An IoT Core device that is in headless mode can be discovered using the **Windows 10 IoT Core Dashboard** application.  To download the IoT Dashboard, see the [Downloads](http://go.microsoft.com/fwlink/?LinkID=708576) page.
When running, the application listens for pings from any IoT Core devices on the local network and displays device information such as the name, IP address, and more.

![Windows 10 IoT Core Dashboard]({{site.baseurl}}/Resources/images/IoTDashboard.png)
