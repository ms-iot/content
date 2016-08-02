---
layout: default
title: Network 3D Printer with Windows 10 IoT Core
permalink: /en-US/win10/samples/3DPrintServer.htm
lang: en-US
---

## Network 3D Printer with Windows 10 IoT Core

### 0. Install Windows 10 IoT Core on your device

Before you start, you will need:

* A board with the latest version of Windows 10 IoT Core **Insider Preview** installed. Follow the [Get Started guide]({{site.baseurl}}/{{page.lang}}/GetStarted.htm){:target="_blank"} to get the IoT Dashboard app and install Windows 10 IoT Core.
* A 3D Printer compatible with our Network 3D Printer app:

    * Lulzbot Taz 6
    * Makergear M2
    * Printrbot Play, Plus and Simple
    * Prusa i3 Mk2
    * Ultimaker Original and Original+
    * Ultimaker 2 and 2+
    * Ultimaker 2 Extended and Extended+

### 1. Connect your 3D Printer to your device

* Plug-in your 3D printer to your Windows 10 IoT Core board using the USB cable.

    ![Connect your 3D Printer to the device]({{site.baseurl}}/Resources/images/3dprint/connect-3d-printer.png){:width="50%" :height="50%"}

* Open the IoT Dashboard app and verify that your device shows up in the "My devices" tab.

    ![verify that your device shows up in IoT Dashboard]({{site.baseurl}}/Resources/images/3dprint/dashboard-mydevices.png){:width="50%" :height="50%"}

### 2. Deploy the Network 3D Printer App

* In IoT Dashboard, click on the "Try some samples" section.
* Select the Network 3D Printer sample app.

    ![Install 3D Network Printer]({{site.baseurl}}/Resources/images/3dprint/dashboard-samples.png){:width="50%" :height="50%"}


* Select your 3D Printer model and press the "Deploy and run" button to deploy the app to your IoT Core device 

    ![Install 3D Network Printer]({{site.baseurl}}/Resources/images/3dprint/dashboard-app.png){:width="50%" :height="50%"}
    <sub>[LulzBot TAZ 6 image](http://devel.lulzbot.com/TAZ/Olive/photos/TAZ_6_Angle_v2_Transparent.png){:target="_blank"} by [Aleph Objects, Inc.](https://www.alephobjects.com/){:target="_blank"} is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/){:target="_blank"}</sub>
    
### 3. Add your 3D Printer

* Go to your Windows 10 PC and go to Settings -> Devices -> Printers & Scanners.
* Press "Add a printer or scanner".

    ![Windows Settings Add Device]({{site.baseurl}}/Resources/images/3dprint/add-printer.png){:width="50%" :height="50%"}

* Select your 3D Printer and press "Add device". The printer will install automatically.

    ![Windows Settings Add Device]({{site.baseurl}}/Resources/images/3dprint/add-device.png){:width="50%" :height="50%"}

Congratulations your printer is now installed and will behave exactly as if it was connected with a USB cable.
You can now print to it using [3D Builder](https://msdn.microsoft.com/en-us/windows/hardware/mt561568.aspx){:target="_blank"}!
