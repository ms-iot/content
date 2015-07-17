---
layout: default
title: Connecting to your device
permalink: /en-US/win10/ConnectToDevice.htm
lang: en-US
---

## Connect your Windows 10 IoT Core device to your development PC:
In order to develop apps for your IoT device, the IoT Core device and development PC should be on the same local network. There are a few options for setting this up:

#### Option 1: Plug your device into your local network
The easiest way to connect to your device is to plug it into a local network that your development PC is already connected to. Plug the **Ethernet cable** from the device into a hub or switch on your **network**.
To keep things simple, it's best if you have a DHCP server (such as a router) present on your network so the device gets an IP address when it boots.

#### Option 2: Connecting your Windows 10 IoT Core device directly to your PC & setting up Internet Connection Sharing (ICS)
If you don't have a local network to plug your device into, you can **create a direct connection to your PC.**
In order to connect and share the internet connection in your PC with your IoT Core device, you must have the following:

* A spare Ethernet port on your development machine.  This can be either an extra PCI Ethernet card or a USB-to-Ethernet dongle.
* An Ethernet cable to link your development machine to your IoT Core device.

Follow the instructions below to enable Internet Connection Sharing (ICS) on your PC

1. Open up the control panel by right-clicking on the Windows button and selecting **Control Panel**, or by opening up a command prompt window and typing ***control.exe***
2. In the search box of the control panel, type ***adapter***
3. Under **Network and Sharing Center**, click **View network connections**
4. Right-click the connection that you want to share, and click **Properties**
5. Click the **Sharing** tab, and select the **Allow other network users to connect through this computer's Internet connection** box.

After you have enabled ICS on your PC, you can now connect your Windows 10 IoT Core device directly to your PC.  You can do it by plugging in one end of the spare Ethernet cable to the extra Ethernet port on your PC, and the other end of the cable to the Ethernet port on your IoT Core device.

Note:

* The **Sharing** tab won't be available if you have only one network connection.
