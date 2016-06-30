---
layout: docs
title: Windows 10 IoT Core Dashboard
description: The best way to download, install and configure Windows 10 IoT Core
keyword: dashboard, Windows 10 IoT Core, download, install, configure
permalink: /en-US/Docs/IoTDashboard.htm
lang: en-US
---


# Windows 10 IoT Core Dashboard 

Windows 10 IoT Core Dashboard is the best way to download, set up and connect your Windows 10 IOT Core devices, all from your PC.

[Download Windows 10 IoT Core Dashboard]({{site.baseurl}}/{{page.lang}}/GetStarted.htm)

## Set up a new device
___
The IoT Dashboard makes it easy to set up a new device. For detailed instructions on how to get started, see the [Get Started]({{site.baseurl}}/{{page.lang}}/GetStarted.htm) page.

### SD card 
The type, make and model of the SD card greatly affects both the performance and the quality of IoT Core. 
A slow card can take up to five times longer to boot than our [recommended cards](http://go.microsoft.com/fwlink/?LinkID=698289). 
An older, less reliable SD card may not even work. If you contintue to run into problems installing consider replacing the SD card.

### Wi-Fi Network connection
IoT Dashboard shows all available networks that your PC has previously connected to. If you don't see the desired Wi-Fi network on the list, ensure you're connected to it on your PC.
If you uncheck the box, you must connect an ethernet cable to your board after flashing.

### First boot
The first boot will always take longer than all subsequent boots. The operating system will take some time to install and connect to your network.
Boot time can vary greatly based on your SD card. For example, a Raspberry Pi 3 running on our recommended SD card takes  3-4 minutes for first boot. On the same Pi with a poor quality SD card, we can have seen boot times longer than 15 minutes. 

### Connecting to the internet
Having your IoT Core device connect to the device is essential. Many of the newer boards come with built in Wi-Fi adapters, which makes connecting simple. If you have trouble getting connected to your network try the following:
* Rebooting the device
* Plugging in an ethernet cable
* Plugging in a monitor to the device. This will show you diagnostic information about your device

{% include note.html text="The official Raspberry pi2 Wi-Fi adapter can be unstable when connecting to Wi-Fi." %}


## My Devices
___
After your device is connected to the internet, the IoT Dashboard will automatically detect your device.
To find your device, go to **My Devices**.

### Connect to your device
Right click and select **Connect**. This will launch the [Windows Device Portal] (http://go.microsoft.com/fwlink/?LinkID=698289) and is the best way to interact and manage your device.

### Remote in
Right click and select "Remote in". This will launch a [remote display experience]({{{{site.baseurl}}/{{page.lang}}/Docs/remotedisplay.htm) with your device. You can view what what you device is displaying and interact with it. This feature is great when you are building apps that have UI. 

{% include note.html text="Some devices may have performance issues due to graphics card limitations" %}

