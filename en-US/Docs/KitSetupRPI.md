---
layout: default
title: Setup your Raspberry Pi 2 or Pi 3
permalink: /en-US/Docs/KitSetupRPI.htm
step: Docs/KitSetupRPI.htm
lang: en-US
deviceName: RPI2
kit: Adafruit Starter Pack for Windows 10 IoT Core on Raspberry Pi2 or PI3
---
<div class="row">
  <div class="col-xs-24">
    <ol class="breadcrumb">
      <li><a href="https://developer.microsoft.com/en-us/windows/iot">IoT Home</a></li>
      <li><a href="{{site.baseurl}}/{{page.lang}}/Docs/AdafruitMakerKit.htm">Overview of Starter Pack</a></li>
      <li class="active">Set up your Raspberry Pi 2</li>
    </ol>
    <header class="page-title-header remove-top-margin">
      <h1 class="page-title">Lesson 1: Introduction and Setup</h1>
    </header>
  </div>
</div>

{% include kit-steps.html device=page.deviceName %}

<hr/>

## Hook up your board

1. Insert the MicroSD card included in your kit (the slot is on the opposite side of the board shown below).
2. Insert the WiFi Dongle included in your kit into one of the USB ports on your Raspberry Pi 2 (Pi3 kits won't have the WiFi dongle as it is built into the board).
3. Insert the Ethernet Cable and connect it to your local network.
4. Connect the power supply to the micro USB port on the board.



    <img class="device-images" src="{{site.baseurl}}/Resources/images/rpi2Headless.png">


## Download and Install the IoT Dashboard tool

The IoT Dashboard tool displays all the Windows 10 IoT Core devices on your network.  Click [here](https://iottools.blob.core.windows.net/iotdashboard/setup.exe) to download it, and follow the instructions to install it.  It should launch once it's finished installing.

By downloading and using the Windows 10 IoT Core Dashboard you agree to the [license terms](http://go.microsoft.com/fwlink/?LinkID=703960&clcid=0x4809) and [privacy statement](http://go.microsoft.com/fwlink/?LinkId=521839) for Windows 10 IoT Core Dashboard. 

## Boot NOOBS and install Windows 10 IoT Core
Prior to the Pi3 kit the sd card included with the kit came preloaded with Windows 10 IoT Core  installed.  Begining with the Windows Annaversery release the card comes with NOOBS installation technology.  Please follow the directions at [NOOBS](https://developer.microsoft.com/en-us/windows/iot/win10/noobs) for selecting and installing the os.

## Boot Windows 10 IoT Core
1. Windows 10 IoT Core will boot automatically after connecting the power supply. Allow the Pi about five minutes for the first boot.
2. Find your device on the IoT Dashboard application. When run, the application automatically finds all Windows IoT Core devices on the local network and displays device information such as the name, device type, IP address, and more.  Select the My Devices tab to view the current devices on the network.
        ![Windows IoT Dashboard]({{site.baseurl}}/Resources/images/IoTDashboard.png)

## Configure your Raspberry Pi 2 or Pi 3

Finally, you'll need to configure your Raspberry Pi 2 or Pi 3 for WiFi connection using the Web-Based management Tool. In **Windows IoT Core Dashboard**, *Click* on the Open in Device Portal icon.

<!-- This content is replicated at en-US/Docs/SetupWiFi.md  -->

1. Enter **Administrator** for the username, and supply your password (p@ssw0rd by default)
2. Click on **Networking** in the left-hand pane
3. Under **Available networks**, select network you would like to connect to and supply the connection credentials. Click **Connect** to initiate the connection

![Web Based WiFi Configuration]({{site.baseurl}}/Resources/images/SetupWiFi/WebBWiFiConfig.png)

<!-- End of Replicated Content -->

{% include kit-nextsteps.html device=page.deviceName %}
