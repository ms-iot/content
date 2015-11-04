---
layout: default
title: AllJoyn
permalink: /en-US/win10/AllJoyn.htm
lang: en-US
---

##AllJoyn

**What is AllJoyn?**

Driven by the AllSeen Alliance, AllJoyn is an open-source, proximity-based connectivity and services framework.  Specifically designed for the Internet of Things (IoT), it enables interoperability such that various devices can discover, connect, and communicate with each other directly, without the need for an intermediary server.

**Why AllJoyn?**

The AllJoyn framework provides a common language interface that enables IoT devices to communicate and interact with each other, regardless of brand, platform, operating system or underlying transport technology. For developers, this translates to reduced time to market and lower cost while offering consumers a simple connectivity solution for all their devices.

**AllJoyn Architecture**

The AllJoyn framework establishes a standard by which devices and apps can advertise and discover each other.  AllJoyn devices describe their capabilities via service interfaces on a virtual bus.  The AllJoyn Bus is composed of two types of nodes:

* *Routing Nodes (RN)* - Also referred to as "Routers", they can talk to any node.
* *Leaf Nodes (LN)* - Also referred to as "Applications", they can talk to routing nodes or other leaf nodes via routing nodes.

![AllJoyn Routers & Apps]({{site.baseurl}}/images/AllJoyn/AllJoyn_Routers_Apps.png)

The below diagram shows the high-level software architecture of the AllJoyn framework:
 ![AllJoyn Architecture]({{site.baseurl}}/images/AllJoyn/AllJoyn_Architecture.png)

* *AllJoyn App Layer* - Defines the user experience
* *AllJoyn Service Frameworks* - Interoperable, cross-platform modules that define common interfaces between devices
* *AllJoyn Core Libs* - Core libraries that interact with the AllJoyn Router and provide the ability to find and securely connect to devices
* *AllJoyn Router* - Manages communications between devices and apps


The AllJoyn framework comes in 2 flavors:

* *Standard* - Primarily used for non-embedded devices with support for full set of core libraries
* *Thin* - Suitable for IoT devices that are resource constrained and requires an AllJoyn router in the network
 ![AllJoyn Frameworks]({{site.baseurl}}/images/AllJoyn/AllJoyn_Frameworks.png)

AllJoyn enables proximity based communication, allowing transport to occur over Ethernet, Wi-Fi, serial, and Power Line (PLC).  However, the AllJoyn framework is transport-agnostic, thus allowing for any future transport mechanisms to be added.  Additionally, bridge software can be created to link the AllJoyn framework to other systems like Zigbee, Z-wave, or the cloud.  See more details & samples below on the AllJoyn Device System Bridge contribution to the AllSeen Alliance from Microsoft.

**AllJoyn Device System Bridge**

Device System Bridges (DSBs) can help facilitate communication across existing incompatible networks.  DSBs offer a cost efficient and quick way to bring existing devices to AllJoyn as virtual devices on the AllJoyn network.  This is done through a pre-baked AllJoyn producer implementation (Bridge), and implementing calls to SDK hooks to support translation of AllJoyn concepts to target devices (Adapter).  Developers need not modify AllJoyn producers with a DSB, unless a change in the default behavior of the Bridge is desired.  For more information on the purpose of Device System Bridges and its structure, check out this
[whitepaper.](https://git.allseenalliance.org/cgit/dsb.git/plain/Docs/AllJoyn - Device System Bridge - Whitepaper v1.0.pdf){:target="_blank"}
![AllJoyn DSB Architecture]({{site.baseurl}}/images/AllJoyn/AllJoyn_DSBArch.png)

With the [AllJoyn Device System Bridge contribution](https://wiki.allseenalliance.org/gateway/dsb){:target="_blank"} from Microsoft, you can connect existing devices that use BACnet or Z-Wave to an AllJoyn network, thereby enabling existing devices to interact with new AllJoyn devices, as well as enabling cloud connectivity across all devices on the network.   There is also a useful [tool](https://github.com/MS-brock/AllJoynToasterDemo/tree/master/getajxml){:target="_blank"} published which generates AllJoyn introspection XML from an existing AllJoyn device, with usage described in detail in a posting on [channel9.](https://channel9.msdn.com/Blogs/Internet-of-Things-Blog/Step-By-Step-Building-AllJoyn-Universal-Windows-Apps-for-Windows-10-Public-Preview){:target="_blank"}
Be sure to check out samples and additional documentation below.  We hope you’ll help build many more IoT bridges and contribute your bridges to the AllSeen Alliance.

**Mapping DSB Objects to Alljoyn**
This document describes the key interfaces and methods used to build the Alljoyn System Bridge

[AllJoyn DSB API]({{site.baseurl}}/en-US/win10/AlljoynDsbApiGuide.htm){:target="_blank"}

**AllJoyn Device System Bridge template for Visual Studio**
This template can be installed in Visual Studio 2015 Preview to enable you to create AllJoyn Device System Bridge projects.
* [DeviceSystemBridgeTemplate.vsix](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynDSBGuide/DeviceSystemBridgeTemplate.vsix?raw=true){:target="_blank"} - This vsix contains the AllJoyn Device System Bridge template. Note that this must be copied locally and cannot be installed remotely. You can also find it on [Visual Studio Online](https://visualstudiogallery.msdn.microsoft.com/aea0b437-ef07-42e3-bd88-8c7f906d5da8).

**AllJoyn Explorer**
This is a tool we use in several points when working with AllJoyn samples. You can find the AllJoyn Explorer [here](https://github.com/ms-iot/samples/tree/develop/AllJoyn/AllJoynExplorer){:target="_blank"}:

* [AllJoyn Explorer](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoynExplorer_1.0.1.5.zip?raw=true){:target="_blank"} - This zip contains the AllJoyn Explorer AppX bundle.
* [AllJoyn Explorer Setup Guide](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_Setup_Guide_v1.0.pdf?raw=true){:target="_blank"} - This pdf contains the documentation for how to deploy the AllJoyn Explorer.
* [AllJoyn Explorer User Guide](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_User_Guide_v1.0.pdf?raw=true){:target="_blank"} - This pdf contains the documentation for how to use the AllJoyn Explorer.

**Samples**

* [AllJoyn DSB Mock Adapter Tutorial and Sample]({{site.baseurl}}/en-US/win10/samples/MockAdapterTutorial.htm){:target="_blank"}.

 This tutorial shows how to use the Device System Bridge app to connect your  IoT Core devices to mock BACnet devices.

* [AllJoyn DSB Z-Wave Tutorial and Sample]({{site.baseurl}}/en-US/win10/samples/ZWaveTutorial.htm){:target="_blank"}.

 This tutorial, based on the demo at the Build 2015 conference, shows how to use the Device System Bridge app to connect your  IoT Core devices to Z-Wave devices.

* [AllJoyn DSB GPIO Device Tutorial C++]({{site.baseurl}}/en-US/win10/samples/AlljoynDSB_GpioTutorial.htm){:target="_blank"}

 This tutorial demonstrates how to use the AllJoyn Device System Bridge template to create a sample C++ app that exercises the device GPIO.

* [AllJoyn DSB GPIO Device Tutorial C#]({{site.baseurl}}/en-US/win10/samples/AlljoynDSB_ManagedGpioTutorial.htm){:target="_blank"}

 This tutorial demonstrates how to use the AllJoyn Device System Bridge template to create a sample managed app that exercises the device GPIO.

**Additional Resources**

* Building AllJoyn Apps on Windows 10 - [https://channel9.msdn.com/Blogs/Internet-of-Things-Blog/Step-By-Step-Building-AllJoyn-Universal-Windows-Apps-for-Windows-10-Public-Preview](https://channel9.msdn.com/Blogs/Internet-of-Things-Blog/Step-By-Step-Building-AllJoyn-Universal-Windows-Apps-for-Windows-10-Public-Preview){:target="_blank"}
* AllJoyn Interfaces in Windows 10 - [https://msdn.microsoft.com/en-us/library/windows/apps/xaml/windows.devices.alljoyn.aspx](https://msdn.microsoft.com/en-us/library/windows/apps/xaml/windows.devices.alljoyn.aspx){:target="_blank"}
* AllJoyn CodeGen Tool - [AllJoynCodeGen.htm]({{site.baseurl}}/en-US/win10/AllJoynCodeGen.htm){:target="_blank"}
* AllJoyn Architecture Details - [https://allseenalliance.org/developers/learn/](https://allseenalliance.org/developers/learn/){:target="_blank"}
* AllJoyn Developer Resources - [https://allseenalliance.org/developers/develop/](https://allseenalliance.org/developers/develop/){:target="_blank"}
