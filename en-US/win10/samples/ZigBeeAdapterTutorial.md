---
layout: default
title: ZigBeeAdapterTutorial
permalink: /en-US/win10/samples/ZigBeeAdapterTutorial.htm
lang: en-US
---

# ZigBee Adapter sample

{% include VerifiedVersion.md %}

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\AllJoyn\Samples\ZigBeeAdapter`.  The sample code is available in C#. Make a copy of the folder on your disk and open the project from Visual Studio.

This document describes the setup of the ZigBee adapter for Device System Bridge (DSB) on Windows 10. When using it you will be able to expose ZigBee devices to AllJoyn.

## What is ZigBee?

ZigBee is a low cost, low power, wireless communications standard designed to allow devices to communicate with another. In addition to the communication protocol, ZigBee standard also defines profiles, such as ZigBee Light Link or Home Automation, which themselves define device. For example, ZigBee Light Link will define what a light is, what a dimmable light is, and so on. Each device uses clusters defined in the ZigBee Cluster Library (ZCL) to specify what they can do, what they expose…

See [ZigBee standard](http://www.zigbee.org){:target="_blank"} for more information about ZigBee, ZigBee profiles, ZCL clusters...

Acronyms:
- ZDO: ZigBee Device Object
- ZCL: ZigBee Cluster Library

## Prerequisites
1. XBee ZigBee module from [Digi](http://www.digi.com){:target="_blank"}, e.g.: XB24 Z7PIT-004
2. XBee Explorer USB dongle from [SparkFun](https://www.sparkfun.com/products/11697){:target="_blank"}
3. [XCTU](http://www.digi.com/products/xbee-rf-solutions/xctu-software/xctu){:target="_blank"} tool from Digi
4. Windows 10 desktop with Visual Studio 2015 and [IoT Explorer for AllJoyn]({{site.baseurl}}/en-US/win10/AllJoyn.htm){:target="_blank"} app.
5. [FTDI driver](http://www.ftdichip.com/Drivers/D2XX.htm){:target="_blank"} for Windows 10 which is required by the XBee Explorer USB dongle.
6. Some ZigBee devices like
 - [Philips Hue](http://www2.meethue.com/en-US){:target="_blank"} light bulb
 - [Dresden Elektronik](https://www.dresden-elektronik.de){:target="_blank"} ballast FLS-PP-IP that control a colored LED band 

> Note that it is very important that the __ZigBee devices__ you will use __are not__ already __part of a ZigBee network__ otherwise they will not join your ZigBee network. Consequently, it is safer to buy single Philips Hue light bulb instead of a set of bulbs bundled with Philips Hue gateway because in that case bulbs will be part of the ZigBee network controlled by the gateway. 
  
IoT Explorer for AllJoyn and its documentation can be found [here]({{site.baseurl}}/en-US/win10/AllJoyn.htm#AllJoynExplorer){:target="_blank"}.

![ZigBeeHardware]({{site.baseurl}}/Resources/images/ZigBee/ZigBeeHardware.png)

## Set up steps
1. Install the required tools and driver listed in the prerequisites on your Windows 10 desktop
(see their respective documentations to figure out how to proceed).
2. Configure the XBee module
3. Let your device join your ZigBee network
4. Set up your Raspberry Pi2 (if you target that device)
5. Deploy ZigBee adapter

>Note that in Windows 10, when a machine has __multiple AllJoyn modern applications__ that __need to interact__ on the same machine, the user must __add a loopback exemption__ for these modern applications. Consequently, if you run both the ZigBee adapter and IoT Explorer for AllJoyn on the same machine you will need to add a loopback exemption for these 2 applications. This isn't needed for application you run from Visual Studio 2015. Note that when deploying an application from Visual Studio 2015, the loopback exemption is for the lifetime of the installed application. Meaning that you can launch the app directly (not from Visual Studio 2015) afterwards and it will have the loopback exemption.

Set up loopback exception: 
 1. Find the installation folder of the modern application for which you want to enable the loopback exemption. It is located at "C:\Users\\*username*\AppData\Local\Packages"
 
 ![LoopBackException]({{site.baseurl}}/Resources/images/ZigBee/LoopBackException.png)
 2. Copy the installation folder name which is also the application ID.
 3. Run the following command from an elevated command prompt:
`CheckNetIsolation LoopbackExempt -a -n=installation-folder-name`
 4. Restart your applications.

## Configure your XBee ZigBee module using XCTU tool
Please look at the tool help to get more details about the tool (https://docs.digi.com/display/XCTU/XCTU+Overview){:target="_blank"}.

![XBeeConfig1]({{site.baseurl}}/Resources/images/ZigBee/XBeeConfig1.png)

![XBeeConfig2]({{site.baseurl}}/Resources/images/ZigBee/XBeeConfig2.png)

## Let ZigBee devices join your ZigBee network
Once the XBee ZigBee module has been configured you can build your ZigBee network and let your ZigBee devices join. In order to do that you just need to power up your ZigBee devices. ZigBee Light Link (aka ZLL) and Home Automation devices will, by default and if not already part of a ZigBee network, try to join a ZigBee network which permit join is enabled. Since the XBee ZigBee module has been configured to always enable permit join, the ZigBee devices will join your network. 

You can verify that devices have by using "network discovery" feature of XCTU tool.

![ZigBeeJoinNetVerif]({{site.baseurl}}/Resources/images/ZigBee/ZigBeeJoinNetVerif.png)

## Set up your Raspberry Pi2
1. Perform initial set up as instructed [here]({{site.baseurl}}/en-US/win10/SetupRPI.htm){:target="_blank"}
2. Plug the XBee USB dongle into the Raspberry Pi2

## Deploy the ZigBee adapter on your Windows 10 machine

1. Download a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip).
2. Open `samples-develop\AllJoyn\Samples\ZigBeeAdapter\ZigBeeAdapter.sln` in Visual Studio.
3. Select the relevant target (x86, x64 or ARM) and build the solution in Visual Studio.
Your now ready to launch it, so launch or debug HeadedAdapterApp project on desktop or if the targeted Windows 10 device has a display or launch or debug HeadlessAdapterApp if it doesn't. 
If needed, see instruction [here]({{site.baseurl}}/en-US/win10/AppDeployment.htm){:target="_blank"} for remote debugging.
 
 
### Known limitations of the current version of the ZigBee adapter
- ZigBee adapter only discovers devices that are directly connected to the XBee module. 
- ZigBee adapter only support some devices defined in ZigBee Light Link or Home Automation profiles. This means that it only implements the necessary ZCL clusters and ZDO commands to handle them. That said support for new devices and new ZCL clusters can easily be added to ZigBee adapter code.
- ZigBee adapter doesn't expose any method to commission ZigBee devices.

## ZigBee adapter in detail 
ZigBee adapter is written in C# and exposes ZigBee devices on AllJoyn through BridgeRT interface. ZigBee device is exposed in AllJoyn as follow:
  
- Each ZigBee end point of a ZigBee device is exposed as an AllJoyn Service (bus attachment)
- Each cluster of an end point is exposed as an AllJoyn Bus object
- Each Attribute of a cluster is exposed as an AllJoyn Property
- All ZigBee commands of all clusters of an end point are grouped under the main AllJoyn bus object of the AllJoyn Service and exposed as AllJoyn method

![ZigBee2AllJoynMapping]({{site.baseurl}}/Resources/images/ZigBee/ZigBee2AllJoynMapping.png)

### IoT Explorer for AllJoyn view of Philips Hue light bulb
Philips Hue light bulb has 1 endpoint which has several clusters: Identify, Scene, Group, OnOff and LevelControl. ZigBee adapter only handles the OnOff and LevelControl clusters hence will only expose them to AllJoyn. Below is IoT Explorer for AllJoyn view of what is exposed on AllJoyn. Path to "On" command is highlighted in green, path to "OnOff" status is highlighted in red.

![AJXPhilipsHue1]({{site.baseurl}}/Resources/images/ZigBee/AJXPhilipsHue1.png)

![AJXPhilipsHue2]({{site.baseurl}}/Resources/images/ZigBee/AJXPhilipsHue2.png)

![AJXPhilipsHue3]({{site.baseurl}}/Resources/images/ZigBee/AJXPhilipsHue3.png)

![AJXPhilipsHue4]({{site.baseurl}}/Resources/images/ZigBee/AJXPhilipsHue4.png)

![AJXPhilipsHue5]({{site.baseurl}}/Resources/images/ZigBee/AJXPhilipsHue5.png)

### Class overview

![ClassMap]({{site.baseurl}}/Resources/images/ZigBee/ClassMap.png)

The __Adapter__ class is the main class of ZigBee adapter. This class derives from __IAdapter__ (BridgeRT interface) and contains a collection of __ZigBeeDevice__ instances and an instance of the __XBeeModule__ class.

The __XBeeModule__ class handles the interactions with the XBee module and has methods to build and parse XBee frames. See [XBee ZigBee module documentation](http://www.digi.com) for more detail about its API and its frame layout. XBeeModule class uses the __SerialController__ class that handles communication over a serial port. 

The __ZigBeeDevice__ class represents a ZigBee device. This class has no interface with BridgeRT since only EndPoints of a ZigBee device are exposed to AllJoyn. __ZigBeeDevice__ class contains a collection of __ZigBeeEndPoint__ instances.

The __ZigBeeEndPoint__ class represents an EndPoint of a ZigBee device. This class derives from __IAdapterDevice__ (BridgeRT interface) and contains an instance of the __BasicCluster__ and a collection __ZclCluster__ instance. To be more accurate it contains a collection of cluster classes, e.g.: __OnOffCluster__, which derive from the abstract __ZclCluster__ class.

The cluster classes, e.g.: __BasicCluster__, __OnOffCluster__, represent a ZCL cluster. Each cluster class is a "specific" implementation of the __ZclCluster__ abstract class.
 
The __ZclCluster__ class is an abstract class that derives from __IAdapterProperty__ (BridgeRT interface) and contains a collection of __ZclAttribute__ instances and a collection of __ZclCommand__ instances. A specific implementation of ZclCluster simply consists in defining the list of ZclAttribute and ZclCommand that should be supported for that specific cluster.

The __ZclAttribute__ class represents an attribute as defined in ZCL standard. This class derives from __IAdapterAttribute__ (BridgeRT interface) and from __ZigBeeCommand__ class. This class contains an instance of __IAdapterValue__ class which is a BridgeRT interface. For information, reading or writing an attribute consist in sending a specific ZCL command.

The __ZclCommand__ class represents a command as defined in ZCL standard. This class derives from __IAdapterMethod__ (BridgeRT interface) and from __ZigBeeCommand__ class. This class contains list of input and output parameters. These parameters are actually __IAdapterValue__ class which is a BridgeRT interface.

The __ZigBeeCommand__ class is an Abstract class that is used to send and receive ZDO or ZCL command. Preparing (or parsing) the ZCL or ZDO payload that XBeeModule will send to XBee module (or receive from XBeeModule) is a shared task between ZigBeeCommand class for its "generic" part and the derived class of ZigBeeCommand for the specific part. 

ZDO command classes such as __ManagementLQI__ class, __ActiveEndPoints__ class… are used to discover the ZigBee network and the ZigBee devices and end points. These classes derive from __ZigBeeCommand__ class.

The __ZclClusterFactory__ class is used to create instances of a specific cluster class. This class is used by the adapter class to create the relevant clusters when it discovers a new ZigBee device. Note that Adapter class create a ZigBeeDevice instance only if that device has at least one end point that has a ZCL cluster listed in the supported cluster list of the ZclClusterFactory.

AT command classes such as __AO_Command__,  __HV_Command__…  are used by XBeeModule upon its initialization to get information about the XBee module it uses. These classes derive from the __XBeeATCommand__ abstract class. See [XBee ZigBee module documentation](http://www.digi.com) for more detail about AT commands.

### Sending ZDO or ZCL command and receiving response

![SendZdoZcl]({{site.baseurl}}/Resources/images/ZigBee/SendZdoZcl.png)

1. When ZclAttribute class reads the value of the attribute, it will build the read attribute payload following the ZCL standard and then call SendCommand method of the ZigBeeCommand class.
2. SendCommand will then call SendZigBeeCommand method of XBeeModule.
3. SendZigBeeCommand will build the frame following the format defined by Digi for its XBee module. Once done it will store a reference to the ZigBeeCommand that has been sent in a dictionary and call WriteAsync to send the bytes. After that it will return and SendCommand will wait until it gets a response or time-out.
4. Upon reception a complete frame from the XBee module, the reception thread of the SerialController will call GetBytesFromModule callback of XBeeModule.
5. GetBytesFromModule will parse the XBee part of the frame and check if the response received has a matching command. If so if will call the ParseResponse callback of the relevant command and then signal the reception of the response to that command. 

### Receiving ZDO or ZCL command 
ZigBee device can send ZDO or ZCL command to the XBee module, e.g.: device announce ZDO command which is sent when a device wakes up or join the network, report attribute ZCL command when an attribute of a ZCL cluster is reportable… This kind of command are not sent in response to another command and can be seen as "notification" by ZigBee adapter.  

![ReceiveZdoZcl]({{site.baseurl}}/Resources/images/ZigBee/ReceiveZdoZcl.png)

1. Adapter class will build a list of notifications it can receive upon initialization. This list contains instances of specific ZigBeeCommand such as DeviceAnnce, ZclReportAttribute.
2. Upon reception of complete frame from the XBee module, the reception thread of the SerialController will call GetBytesFromModule callback of XBeeModule.
3. GetBytesFromModule will parse the XBee part of the frame and check if it's a response to a command that has been sent (see previous section). If not, it will go through the notification list and call the ParseResponse method of each element until one accept the frame or none have accepted. If none have accepted, the frame will be thrown away. 
4. What ParseResponse does is specific to each implementation of the ZigBeeCommand class. For example, the ParseResponse method of the DeviceAnnce class will get the 64 bit address (aka MAC address) and 16 bit address and may be more information about the signaled device and then send "device arrival" signal to BridgeRT (note that several classes are used to achieve that, see code for more). 

### Creating a new ZCL cluster class
ZigBee adapter doesn't implement all clusters defined by ZCL. There will be cases where the ZigBee device you want to interact with won't be supported by ZigBee adapter. In such a case you will need to add support for the missing clusters. 

How to:

1. You need to find out which the ZigBee Profile and ZigBee Device Category each end point of the new device supports. This can be documented by the device manufacturer or discovered by sending some ZDO command to the end points. ZigBee adapter can give you this information if you enable device discovery tracing in Logger class.
2. Implements the missing clusters (if necessary)
 - Create a new class that derives from ZclCluster
 - In constructor add attributes and commands
3. Update ZigBeeProfileLibrary and ZclClusterFactory accordingly
4. Don't forget to update ZclHelper if the cluster you added has either attributes or command that use a not yet supported ZigBee type

Example of a new cluster class

![NewClusterClass]({{site.baseurl}}/Resources/images/ZigBee/NewClusterClass.png)

What needs to be done in ZclClusterFactory class

![ZclFactoryChange]({{site.baseurl}}/Resources/images/ZigBee/ZclFactoryChange.png)

### Quick overview of frame used by XBee API
Digi provide an API that can be used to interact with its XBee ZigBee module. This API is used to send or receive AT command or ZDO and ZCL command. AT commands are specific to the XBee module and can only be interpreted by the XBee module whereas ZDO or ZCL commands can be interpreted by any ZigBee devices. Frames used to send AT commands are a bit different than frames used to send ZDO or ZCL commands (see XBee ZigBee module documentation for more details).

General frame layout:

![XBeeFrame1]({{site.baseurl}}/Resources/images/ZigBee/XBeeFrame1.png)

Explicit addressing ZigBee Command 

![XBeeFrame2]({{site.baseurl}}/Resources/images/ZigBee/XBeeFrame2.png)

Explicit Rx Indicator

![XBeeFrame3]({{site.baseurl}}/Resources/images/ZigBee/XBeeFrame3.png)
