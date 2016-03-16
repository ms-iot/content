---
layout: default
title: AllJoyn Device System Bridge
permalink: /en-US/win10/AllJoynDSB.htm
lang: en-US
---

# AllJoyn Device System Bridge

AllJoyn provides developers with the flexibility to use a wide range of platforms and connection technologies to build  devices for the AllJoyn ecosystem.  However, many device makers have existing device solutions in their portfolios. For these situations, Microsoft created the Device System Bridge (DSB). The DSB adapts non-AllJoyn devices to the AllJoyn eco-system so that the adapted devices can interoperate with AllJoyn as their common language. Microsoft DSB’s support home automation systems such as Zigbee, and Z-Wave, and can even support industrial building automation systems such as BACnet.  Additionally, the source code is available for customization to support other technologies

## How DSB works

The key capability of a DSB is to create a virtual representation of devices on the AllJoyn bus. So these devices, whatever their native connectivity or device ecosystem is, will appear and be accessible as AllJoyn devices. In the picture below two DSBs , one for Z-Wave and one for ZigBee create virtual representation of the two Z-Wave and the one ZigBee devices on the AllJoyn bus. With this all devices on the AllJoyn site can communicate with each other. Because the Z-Wave and ZigBee devices all on the AllJoyn bus they now can communicate with each other as well.
![AJ_Docu_DSB_Overview]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Docu_DSB_Overview.png)
Another key element of the DSB design is that it will not require any changes to the AllJoyn or non-AllJoyn device system. All necessary adoptions are done in the DSB.

As the picture also shows, there is no mapping from AllJoyn devices to the non-AllJoyn side. The objective of the DSB is to bring devices into the AllJoyn ecosystem. Enabling only one way simplifies the development. It also reduces the risk that AllJoyn security capabilities become weakened by the potentially less secure non-AllJoyn device system.

## DSB Architecture

The Microsoft proposed DSB architecture consists of three main components, Network Access Stack, Adapter and Bridge. The picture below shows the high level overview of this architecture
![AJ_Docu_DSB_Architecture]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Docu_DSB_Architecture.png)

__Bridge__
- Represents each internal device object as AllJoyn device, separate bus attachment for each device
- Devices are dynamically added to or removed from the AllJoyn bus
- Configuration manages device visibility and security
- Creates bus attachment for bridge and adapter configuration interface
- Bridge code is agnostic to internal device types and reusable for any type

__Adapter__
- Instantiates and manages virtual devices on behalf of each device from the non-AllJoyn network
- Translates device schemas into internal device objects
- Manages network resources, e.g. access keys, credentials

__Network Access Stack__
- Access to non-AllJoyn Network specific , e.g. Z-Wave stack

## Adapter Classes

The diagram below show the classes developers will use in the Microsoft DSB template to create an abstraction of the native devices that need to be bridged into AllJoyn. The Bridge will use the instance of the adapter class to create the bus attachments for each device in the Adapter.devices list.
![AJ_Docu_DSB_Class_Diagram]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Docu_DSB_Class_Diagram.png)

## Special Handlers

AllJoyn specifies several base services and standard interfaces frameworks such as LSF, HAE or Control Panel. The DSB can exposes those with special handlers. The current (11/2015) release of the DSB template contains implementations of the LSF and Control Panel interfaces. Developers will connect their code to the callback functions for LSF and Control Panel interfaces in the bridge.
![AJ_Docu_DSB_Special_Handlers]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Docu_DSB_Special_Handlers.png)

## DSB Resources

__Visual Studio DSB Template__

[Visual Studio DSB Template](https://visualstudiogallery.msdn.microsoft.com/aea0b437-ef07-42e3-bd88-8c7f906d5da8){:target="_blank"} is an extension to Visual Studio that lets you easily create new DSB projects. The project will create all the necessary components such as the Bridge, a shell project for the adapter and all solution files to build the DSB as headed or headless device. This Visual Studio extension contains both the Native and Managed AllJoyn Device System Bridge templates.

The template can be installed through Visual Studio Tools -> Extensions and Updates … -> Online -> In the "Search" field type "DSB"

The [Mapping DSB Objects to AllJoyn]({{site.baseurl}}/en-US/win10/AlljoynDsbApiGuide.htm){:target="_blank"}  document describes the key interfaces and methods used to build the Alljoyn System Bridge.

__Sample DSBs__

- [AllJoyn DSB Mock Adapter Tutorial and Sample]({{site.baseurl}}/en-US/win10/samples/MockAdapterTutorial.htm){:target="_blank"}.
This tutorial shows how to use the Device System Bridge app to connect your  IoT Core devices to mock BACnet devices.
- [AllJoyn DSB Z-Wave Adapter Tutorial and Sample]({{site.baseurl}}/en-US/win10/samples/ZWaveTutorial.htm){:target="_blank"}.
This tutorial, based on the demo at the Build 2015 conference, shows how to use the Device System Bridge app to connect your  IoT Core devices to Z-Wave devices.
- [AllJoyn DSB GPIO Adapter Tutorial C++]({{site.baseurl}}/en-US/win10/samples/AlljoynDSB_GpioTutorial.htm){:target="_blank"}
This tutorial demonstrates how to use the AllJoyn Device System Bridge template to create a sample C++ app that exercises the device GPIO.
- [AllJoyn DSB GPIO Adapter Tutorial C#]({{site.baseurl}}/en-US/win10/samples/AlljoynDSB_ManagedGpioTutorial.htm){:target="_blank"}
This tutorial demonstrates how to use the AllJoyn Device System Bridge template to create a sample managed app that exercises the device GPIO.
- [AllJoyn DSB ZigBee Adapter Tutorial and Sample]({{site.baseurl}}/en-US/win10/samples/ZigBeeAdapterTutorial.htm){:target="_blank"}
 This tutorial shows how to use the Device System Bridge app to connect your IoT Core devices to ZigBee devices.
- [AllJoyn DSB BACnet Adapter Tutorial and Sample]({{site.baseurl}}/en-US/win10/samples/BACnetAdapterTutorial.htm){:target="_blank"}
This tutorial shows how to use the Device System Bridge app to connect your IoT Core devices to BACnet devices.
- [AllJoyn.JS Tutorial]({{site.baseurl}}/en-US/win10/samples/AllJoynJS.htm){:target="_blank"}
This tutorial shows how to run AllJoyn.JS application developed by Allseen Alliance as a Windows 10 application. AllJoyn.JS allows you to write JavaScript to create, monitor and control AllJoyn devices.
