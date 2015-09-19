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
  <li><a href="{{site.baseurl}}/{{page.lang}}/AdafruitMakerKit.htm">Adafruit Starter Pack</a></li>
  <li class="active">Setup your Raspberry Pi 2</li>
</ol>

<h1 class="maker-kit">Lesson 1: Introduction and Setup</h1>
{% include kit-steps.html device=page.deviceName %}

<h3 class="maker-kit">Learn how to set up the Raspberry Pi 2 and connect it to your computer.</h3>

###First, [Download](http://go.microsoft.com/fwlink/?LinkId=616847) and install the ISO for the Raspberry Pi 2 from the Microsoft Download Center.

##Hook up your board

1. **Insert the micro SD card** included in your kit (the slot is on the opposite side of the board shown below).
2. **Insert the Ethernet Cable** and connect it to your local network.
3. **Connect the power supply** to the micro USB port on the board.
4. **Insert the WiFi Dongle** included in your kit into one of the USB ports on your RPI2.


    <img class="device-images" src="{{site.baseurl}}/images/rpi2Headless.png">


##Boot Windows 10 IoT Core
1. Windows 10 IoT Core will boot automatically after connecting the power supply. Allow the Pi about five minutes for the first boot.
2. Find your device on the IoTCoreWatcher application. When run, the application automatically finds all Windows IoT Core devices on the local network and displays device information such as the name, MAC, IP address, and more.
        ![Windows IoT Core Watcher]({{site.baseurl}}/images/HeadlessMode/IoTCoreWatcher.png)

##Configure your Raspberry Pi 2

####Finally, you'll need to configure your Raspberry Pi 2 for WiFi connection.

<!-- This content is replicated at en-US/win10/SetupWiFi.md  -->

1. Using a web browser, navigate to `http://[device_ip]:8080/`, where **[device_ip]** is the IP address of the Windows 10 IoT Core device (ex: **192.168.1.4**). Enter **Administrator** for the username, and supply your password (p@ssw0rd by default)
2. Click on **Networking** in the left-hand pane
3. Under **Available networks**, select network you would like to connect to and supply the connection credentials. Click **Connect** to initiate the connection

![Web Based WiFi Configuration]({{site.baseurl}}/images/SetupWiFi/WebBWiFiConfig.png)

<!-- End of Replicated Content -->

{% include kit-nextsteps.html device=page.deviceName %}
