---
layout: default
title: Setup your Raspberry Pi 2
permalink: /en-US/win10/KitSetupRPI.htm
step: win10/KitSetupRPI.htm
lang: en-US
deviceName: RPI2
kit: Adafruit Starter Pack for Windows 10 IoT Core on Raspberry Pi2
---
<ol class="breadcrumb">
  <li><a href="{{site.baseurl}}/{{page.lang}}/AdafruitMakerKit.htm">Overview of Starter Pack</a></li>
  <li class="active">Setup your Raspberry Pi 2</li>
</ol>

<h1 class="thin-header">Lesson 1: Introduction and Setup</h1>
{% include kit-steps.html device=page.deviceName %}

<hr/>

## Hook up your board

1. Insert the MicroSD card included in your kit (the slot is on the opposite side of the board shown below).
2. Insert the WiFi Dongle included in your kit into one of the USB ports on your Raspberry Pi 2.
3. Insert the Ethernet Cable and connect it to your local network.
4. Connect the power supply to the micro USB port on the board.



    <img class="device-images" src="{{site.baseurl}}/Resources/images/rpi2Headless.png">


## Download and Install the IoT Dashboard tool

The IoT Dashboard tool displays all the Windows 10 IoT Core devices on your network.  Click [here](https://iottools.blob.core.windows.net/iotdashboard/setup.exe) to download it, and follow the instructions to install it.  It should launch once it's finished installing.

By downloading and using the Windows 10 IoT Core Dashboard you agree to the [license terms](http://go.microsoft.com/fwlink/?LinkID=703960&clcid=0x4809) and [privacy statement](http://go.microsoft.com/fwlink/?LinkId=521839) for Windows 10 IoT Core Dashboard. 

## Boot Windows 10 IoT Core
1. Windows 10 IoT Core will boot automatically after connecting the power supply. Allow the Pi about five minutes for the first boot.
2. Find your device on the IoT Dashboard application. When run, the application automatically finds all Windows IoT Core devices on the local network and displays device information such as the name, device type, IP address, and more.  Select the My Devices tab to view the current devices on the network.
        ![Windows IoT Dashboard]({{site.baseurl}}/Resources/images/HeadlessMode/IoTDashboard.png)

## Configure your Raspberry Pi 2

Finally, you'll need to configure your Raspberry Pi 2 for WiFi connection using the Web-Based management Tool. In **Windows IoT Core Dashboard**, *Click* on the Open in Device Portal icon.

<!-- This content is replicated at en-US/win10/SetupWiFi.md  -->

1. Enter **Administrator** for the username, and supply your password (p@ssw0rd by default)
2. Click on **Networking** in the left-hand pane
3. Under **Available networks**, select network you would like to connect to and supply the connection credentials. Click **Connect** to initiate the connection

![Web Based WiFi Configuration]({{site.baseurl}}/Resources/images/SetupWiFi/WebBWiFiConfig.png)

<!-- End of Replicated Content -->

{% include kit-nextsteps.html device=page.deviceName %}
