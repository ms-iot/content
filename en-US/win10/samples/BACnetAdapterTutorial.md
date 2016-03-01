---
layout: default
title: BACnetAdapterTutorial
permalink: /en-US/win10/samples/BACnetAdapterTutorial.htm
lang: en-US
---

# BACnet Sample

{% include VerifiedVersion.md %}

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\AllJoyn\Samples\BACnetAdapter`.  The sample code is available in C++. Make a copy of the folder on your disk and open the project from Visual Studio.


This document describes the setup of the BACnet Adapter for Device System Bridge on Windows 10. When using it you will be able to expose BACnet devices to AllJoyn.

## What is BACnet?

BACnet is a communications protocol for building automation and control networks. It is an [ASHRAE](http://www.bacnet.org){:target="_blank"}, ANSI, and ISO 16484-5 standard protocol. BACnet was designed to allow communication of building automation and control systems for applications such as heating, ventilating, and air-conditioning control (HVAC), lighting control, access control, and fire detection systems and their associated equipment. The BACnet protocol provides mechanisms for computerized building automation devices to exchange information, regardless of the particular building service they perform.
BACnet is an object based standard. A BACnet device contains a set of objects. A BACnet object is a collection of information within a device. A typical object has a collection of properties, based on the function and purpose of the object. A BACnet Device is represented as a "Device Object" which is simply a collection of objects that represents the functions actually present in a given real device. 

See [BACnet standard](http://www.bacnet.org){:target="_blank"} for more information about BACnet...

## Prerequisites

1. PC or Laptop with Windows 10 with installed [IoT Explorer for AllJoyn]({{site.baseurl}}/en-US/win10/AllJoyn.htm#AllJoynExplorer){:target="_blank"}.
2. [Envision for BACtalk](http://alerton.com/en-US/Pages/Product.aspx?category=Management&cat=ECC-Alerton&pid=Envision){:target="_blank"} tool from Alerton which is used to configure the BACnet devices.
3. Some BACnet devices like
 - [BCM-ETH](http://alerton.com/en-US/Pages/Product.aspx?category=Integration&cat=ECC-Alerton&pid=BCMETH){:target="_blank"} BACnet router and controller from  Alerton
 - [BCM MS/TP](http://alerton.com/en-US/Pages/Product.aspx?category=Integration&cat=ECC-Alerton&pid=BCMMSTP){:target="_blank"} BACnet control module from Alerton
 - one or more [VLC-853](http://alerton.com/en-US/Pages/Product.aspx?category=Field%20Controller&cat=ECC-Alerton&pid=VLC853){:target="_blank"} BACnet field controller(s) from Alerton

> The BACnet hardware described above has been used to control and expose on AllJoyn two occupancy sensors, two temperature sensors, two temperature controllers and one body controller.

![BACnetHardware]({{site.baseurl}}/Resources/images/AllJoyn/BACnetHardware.jpg)

## Set up steps
1. Install the required tools and driver listed in the prerequisites on your Windows 10 desktop
(see their respective documentations to figure out how to proceed).
2. Configure the BACnet devices using Envision for BACtalk tool. 
This document will not go into detail about that, please refer to the tool's documentation to understand how BACnet should be configured.
3. Set up your Raspberry Pi2 (if you target that device)
See instruction [here]({{site.baseurl}}/en-US/win10/SetupRPI.htm){:target="_blank"}.
5. Deploy BACnet adapter

>Note that in Windows 10, when a machine has __multiple AllJoyn modern applications__ that __need to interact__ on the same machine, the user must __add a loopback exemption__ for these modern applications. Consequently, if you run both the ZigBee adapter and IoT Explorer for AllJoyn on the same machine you will need to add a loopback exemption for these 2 applications. This isn't needed for application you run from Visual Studio 2015. Note that when deploying an application from Visual Studio 2015, the loopback exemption is for the lifetime of the installed application. Meaning that you can launch the app directly (not from Visual Studio 2015) afterwards and it will have the loopback exemption.

Set up loopback exception:

 1. Find the installation folder of the modern application for which you want to enable the loopback exemption. It is located at 'C:\Users\*username*\AppData\Local\Packages'
 ![LoopBackException]({{site.baseurl}}/Resources/images/AllJoyn/BACnetLoopBackException.png)
 2. Copy the installation folder name which is also the application ID.
 3. Run the following command from an elevated command prompt:
`CheckNetIsolation LoopbackExempt -a -n=installation-folder-name`
 4. Restart your applications.

## Deploy the BACnet adapter on your Windows 10 machine
1. Download a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip).
2. Open `samples-develop\AllJoyn\Samples\BACnetAdapter\BACnetAdapter.sln` in Visual Studio.
4. Select the relevant target (x86 or x64) and build the solution in Visual Studio.
Your now ready to launch it, so launch or debug HeadedAdapterApp project on desktop or if the targeted Windows 10 device has a display or launch or debug HeadlessAdapterApp if it doesn't. 
If needed, see instruction [here]({{site.baseurl}}/en-US/win10/AppDeployment.htm){:target="_blank"} for remote debugging.

## BACnet adapter in detail 
BACnet adapter is written in managed C++. It uses the [open BACnet stack](http://bacnet.sourceforge.net/){:target="_blank"} which is available on sourceforge.net to interact with BACnet device and exposes them on AllJoyn through BridgeRT interface. A BACnet device is exposed in AllJoyn as follow:
  
- Each BACnet device is exposed as an AllJoyn Service (bus attachment)
- Each BACnet object of a BACnet device is exposed as an AllJoyn Bus object
- Each BACnet property of a BACnet object is exposed as an AllJoyn Property. Note that all properties of a BACnet object are grouped under a single AllJoyn interface.

![BACnetToAllJoynMap]({{site.baseurl}}/Resources/images/AllJoyn/BACnetToAllJoynMap.png)

### IoT Explorer for AllJoyn view of a set of BACnet devices

![BACnetAJX1]({{site.baseurl}}/Resources/images/AllJoyn/BACnetAJX1.png)

After selecting BACnet001 VLC-2 device, we can see all the objects the device exposes.

![BACnetAJX2]({{site.baseurl}}/Resources/images/AllJoyn/BACnetAJX2.png)

### Class overview

![ClassMap]({{site.baseurl}}/Resources/images/AllJoyn/BACnetClassMap.png)

The __BACnetAdapter__ class is the main class of BACnet adapter. This class derives from __IAdapter__ (BridgeRT interface) and contains a collection of __BACnetAdapterDevice__ instances and an instance of the __BACnetInterface__ class. BACnetAdapter class uses __BACnetAdapterSignal__ to signal device arrival or removal.

The __BACnetInterface__ class along with __BACnetServiceHandlers__ class handle the interactions with the BACnet devices. They use mechanism provided by the [open BACnet stack](http://bacnet.sourceforge.net){:target="_blank"} to handle BACnet devices. See open BACnet stack documentation for more detail about its architecture and the API it provides.

The __BACnetAdapterDevice__ class represents a BACnet device. This class derives from __IAdapterDevice__ (BridgeRT interface) and contains a collection of __BACnetAdapterProperty__ and __BACnetAdapterSignal__ instances.

The __BACnetAdapterProperty__ class represents a BACnet object and derives from __IAdapterProperty__ (BridgeRT interface). This class contains a collection of __BACnetAdapterAttribute__ instances.

The __BACnetAdapterAttribute__ class represents a BACnet property and derives from __IAdapterAttribute__ (BridgeRT interface). BACnet property change notification is handled through an instance of BACnetAdapterSignal from BACnetAdapterDevice class. The value of the property is hosted by an instance of __BACnetAdapterValue__ class.

The __BACnetAdapterValue__ class is used to store value of BACnet property. This class derives from __IAdapterValue__ (BridgeRT interface).

The __BACnetAdapterSignal__ class is used to handle notification such as device arrival or removal as well as change of value. This class derives from __IAdapterSignal__ (BridgeRT interface).

