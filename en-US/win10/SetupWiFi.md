---
layout: default
title: Using WiFi on your Windows IoT Core device.
permalink: /en-US/win10/SetupWiFi.htm
lang: en-US
---

##Using WiFi on your Windows IoT Core device

WiFi is supported on Windows IoT Core devices through the use of a USB WiFi adapter. Using WiFi provides all the functionality of a wired connection, including SSH, Powershell, Web Device Management, and application debugging and deployment.

	Note: Plugging in a wired Ethernet cable will override WiFi as the default network interface

### Supported Adapters
The following WiFi adapters have been tested on Windows IoT Core:

####Raspberry Pi 2:

* [Raspberry Pi WiFi Dongle](http://swag.raspberrypi.org/collections/frontpage/products/official-raspberry-pi-Wifi-dongle){:target="_blank"}

####MinnowBoard Max:

* [Airlink Wireless N 150 Mini USB Adapter](http://www.amazon.com/Airlink101-AWLL5077-150Mbps-Wireless-Adapter/dp/B002VFWY9M){:target="_blank"}

### Configuring WiFi
To use WiFi, you'll need to provide Windows IoT core with the WiFi network credentials. There are a few different options for doing so:

###Option 1: Startup Configuration
**Prerequisite:** The IoT core device needs a mouse, keyboard, display, and USB WiFi Adapter plugged in

The first time you boot Windows IoT Core with a supported USB WiFi adapter, you will be presented with a configuration screen. 
On the configuration screen, select the WiFi network you would like to connect to and supply the password. Click **connect** to initiate the connection. 

![Startup WiFi Configuration Screen]({{site.baseurl}}/images/SetupWiFi/WiFiStartupConfig.png)

###Option 2: Default App Configuration
**Prerequisite:** The IoT core device needs a mouse, keyboard, display, and USB WiFi Adapter plugged in

An alternative way to configure WiFi is to use the default app. You can use this to configure or modify WiFi settings after the device has booted.

1. Click on the gear-shaped settings icon on the homepage
2. Select **Network & Wi-Fi** in the left pane
3. Click on the WiFi network you want to connect to. Supply the password if prompted, and click **Connect**

![Default App WiFi Configuration]({{site.baseurl}}/images/SetupWiFi/DefaultAppWiFiConfig.png)

###Option 3: Web-Based Configuration
**Prerequisite:** Your device will already need to be connected to your local network through Ethernet and should have a USB WiFi Adapter plugged in

If you have device a with no UI, display, or input devices, you can still configure it through [web-based management]({{site.baseurl}}/{{page.lang}}/win10/tools/Webb.htm).

1. Using a web browser, navigate to `http://[device_ip]:8080/`, where **[device_ip]** is the IP address of the IoT Core device (ex: **192.168.1.4**). Enter **Administrator** for the username, and supply your password
2. Click on **Networking** in the left-hand pane
3. Under **Available networks**, select network you would like to connect to and supply the connection credentials. Click **Connect** to initiate the connection

![Web Based WiFi Configuration]({{site.baseurl}}/images/SetupWiFi/WebBWiFiConfig.png)

