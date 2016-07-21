---
layout: docs
title: Windows 10 IoT Core Dashboard
description: The best way to download, install and configure Windows 10 IoT Core
keyword: dashboard, Windows 10 IoT Core, download, install, configure
permalink: /en-US/Docs/IoTDashboard.htm
lang: en-US
---


# Windows 10 IoT Core Dashboard 

Windows 10 IoT Core Dashboard is the best way to download, set up and connect your Windows 10 IoT Core devices, all from your PC.

<div class="btn-group">
	<a href="http://go.microsoft.com/fwlink/?LinkID=708576" id="device-center-link" class="btn btn-primary">Download Dashboard</a>
</div>

## Set up a new device
___
The IoT Dashboard makes it easy to set up a new device. For detailed instructions on how to get started, see the [Get Started]({{site.baseurl}}/{{page.lang}}/GetStarted.htm) page.

![IoTDashboard Setup Page]({{site.baseurl}}/Resources/images/IoTDashboard/IoTDashboard_SetupPage.PNG)

### SD card 
The type, make and model of the SD card greatly affects both the performance and the quality of IoT Core. 
A slow card can take up to five times longer to boot than our [recommended cards](http://go.microsoft.com/fwlink/?LinkID=698289). 
An older, less reliable SD card may not even work. If you contintue to run into problems installing consider replacing the SD card.

### Device Name
The default device name is minwinpc. It is a good practice to set unique device name for your board. It makes it easier to find the device on the network. The device name can be atmost 15 characters long and can include letters, numbers and the following symbols:  @ # $ % ^ & ' ) ( . - _ { } ~
If you change the device name in IoT Dashboard when setting up your device, automatic reboot will happen the first time when you power on the device. 

### Password
Password is a mandatory field and must be set. Setting a password in IoT Dashboard modifies the password for Administrator user which by default is "p@ssw0rd".

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

{% include note.html text="The official Raspberry Pi 2 Wi-Fi adapter can be unstable when connecting to Wi-Fi." %}


## My Devices
___
After your device is connected to the internet, the IoT Dashboard will automatically detect your device.
To find your device, go to **My Devices**.

### Connect to your device
Right click and select **Open in Device Portal**. This will launch the [Windows Device Portal]({{site.baseurl}}/{{page.lang}}/Docs/Tools/DevicePortal.htm) page.) and is the best way to interact and manage your device.

![IoTDashboard View Devices]({{site.baseurl}}/Resources/images/IoTDashboard/IoTDashboard_RightClickMenu.PNG)

You can also connect to the device using Windows PowerShell. 

## Connect to Azure
___
IoT Dashboard lets you provision Windows IoT Core devices with Azure IoT Hub. You can read more about it in this [blog post](https://blogs.windows.com/buildingapps/2016/07/20/building-secure-apps-for-windows-iot-core)

![IoTDashboard Azure]({{site.baseurl}}/Resources/images/IoTDashboard/IoTDashboard_Azure.PNG)


## Quick Run Samples
___

IoT Dashboard has some quick-run samples that you can try on your board. 

### Network 3D Printer
You can use the Network 3D Printer sample to connect your 3D Printer to your board can make it discoverable over your home network. Click [here]({{site.baseurl}}/{{page.lang}}/win10/samples/3DPrintServer.htm) for more details. 

![IoTDashboard Network 3D Printer]({{site.baseurl}}/Resources/images/IoTDashboard/IoTDashboard_3DPrinter.PNG)

### Internet radio
You can turn your Windows 10 IoT Core device into an internet radio that can be controlled from anywhere in your home by installing the Internet radio sample 

![IoTDashboard Internet radio]({{site.baseurl}}/Resources/images/IoTDashboard/IoTDashboard_InternetRadio.PNG)

### IoT Core Blockly
IoT Core Blockly sample lets your program a Raspberry Pi2 or 3 and a Raspberry Pi Sense hat using a "block" editor from your browser

![IoTDashboard Blockly]({{site.baseurl}}/Resources/images/IoTDashboard/IoTDashboard_Blockly.PNG)




