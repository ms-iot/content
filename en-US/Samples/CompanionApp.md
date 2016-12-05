---
layout: sample
title: Companion App (and Server)
description: Create a simple app (for Windows Phone 10 or Android) that can configure your device's Wifi
keyword: Windows 10 IoT Core, advanced, companion app, SoftAp, Wifi
permalink: /en-US/Samples/CompanionApp.htm
samplelink: https://github.com/ms-iot/samples/tree/develop/CompanionApp
lang: en-US
---

# Design

There are two parts to this sample:

1. the Client - running on an Android or Windows Phone 10 phone, this app will find your IoT Core device, connect to it, and allow you to specify the required information to join a WiFi network. 
1. the Server - running on your IoT Core device, this app (foreground or background) help the Client connect your IoT Core device to a desired WiFi network. 

### Load the project in Visual Studio

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\CompanionApp`.  Make a copy of the folder on your disk and open the project from Visual Studio.

1. Connect to your IoT Core device using the [Device Portal]({{site.baseurl}}/{{page.lang}}/Docs/DevicePortal), open the Onboarding page, and set the SoftAP settings SSID to be something recognizable.
1. Connect to your IoT Core device using [SSH]({{site.baseurl}}/{{page.lang}}/Docs/SSH) or [PowerShell]({{site.baseurl}}/{{page.lang}}/Docs/PowerShell) and run the following commands to enable SoftAP

    ```
    reg add hklm\system\currentcontrolset\services\mpssvc\parameters /v IoTInboundLoopbackPolicy /t REG_DWORD /d 1
    checknetisolation loopbackexempt -a -n=IoTOnboardingTask-uwp_1w720vyc4ccym
    checknetisolation loopbackexempt -a -n=CompanionAppServer_1w720vyc4ccym
    ```
1. Restart your device.
1. Open **CompanionAppServer\CompanionAppServer.sln**, select the appropriate startup project, platform and use F5 to build, deploy, and launch.
    + `CompanionAppServer` is a Background Application
1. Connect Android phone or Windows Phone 10 to computer.
1. Open **CompanionAppClient\CompanionAppClient.sln**, select the appropriate startup project, platform and use F5 to build, deploy, and launch.
    + `CompanionAppClient.Droid` and Any CPU for Android
    + `CompanionAppClient.UWP` and ARM for Windows Phone 10
1. On your phone, follow the flow:
    1. Click the `Scan for Access Points` button
    1. Select your IoT Core device's access point and click the `Connect to Access Point` button
    1. Click the `Get Networks` button
    1. Select the desired network, enter the network's password, and click the `Connect` button
1. At this point, your IoT Core device should be connected to your desired WiFi network. 

### Questions/Suggestions

Please refer to the [FAQ]({{site.baseurl}}/{{page.lang}}/Support/Faqs) for issues.
