---
layout: default
title: Headed/Headless Mode
permalink: /en-US/win10/HeadlessMode.htm
lang: en-US
---

## Headed and Headless mode

Windows IoT Core can be configured for either **headed** or **headless** mode. The difference between these two modes is the presence or absence of any form of UI.
By default, Windows 10 IoT Core is in **headed** mode and run the default startup app which displays system information like the computer name and IP address.
Furthermore, in the headed mode, the standard UWP UI stack is available for fully interactive apps.
Devices that don't need UI functionality can be set to **headless** mode. The UI stack is disabled and apps are no longer interactive.  This reduces the amount of system resources used.  Headless mode apps can be thought of as services.

When configured to run in headed mode, a single UI app will launch at boot and there is no mechanism to switch to other applications (other than in development scenarios such as when Visual Studio deploys an app for debugging). In headless mode no UI app will be launched. "Background Apps" (StartupTasks) are apps that do not have UI and launch at startup. Any number of these apps can be installed for both headed and headless devices.
    NOTE: If you put your device into headless mode, then you can use the Windows 10 IoT Core Dashboard application, described below, to find its' IP address.

## Changing the mode
You can modify the headed/headless state of your device from a PowerShell session.  To review the PowerShell details, look [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm).

* To display the current state of your device, use the `setbootoption` utility like this:

        [192.168.0.243]: PS C:\> setbootoption.exe

* To modify the state of your device to enable headless mode, use the `setbootoption` utility with the `headless` arg:

        [192.168.0.243]: PS C:\> setbootoption.exe headless
        [192.168.0.243]: PS C:\> shutdown /r /t 0

* To modify the state of your device to enable headed mode, use the `setbootoption` utility with the `headed` arg:

        [192.168.0.243]: PS C:\> setbootoption.exe headed
        [192.168.0.243]: PS C:\> shutdown /r /t 0

## Finding your headless device

A Windows IoT Core device that is in headless mode can be discovered using the **Windows 10 IoT Core Dashboard** application.  You can download the IoT Dashboard [here](http://go.microsoft.com/fwlink/?LinkID=708576)
When running, the application listens for pings from any Windows IoT Core devices on the local network and displays device information such as the name, IP address, and more.

![Windows IoT Core Dashboard]({{site.baseurl}}/Resources/images/IoTDashboard.png)
