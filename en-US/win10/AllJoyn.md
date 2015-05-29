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

* *Routing Notes (RN)* - Also referred to as "Routers", they can talk to any node.
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


**Samples**

*AllJoyn Z-Wave demo (Device System Bridge)*
This is preinstalled in Windows 10 IoT Core Technical Preview. You can find the source code for this [here](https://github.com/ms-iot/samples/tree/develop/AllJoyn/AllJoynZWaveDemo){:target="_blank"}.

* [ZWaveAdapterUAP.zip](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynZWaveDemo/ZWaveAdapterUAP.zip?raw=true){:target="_blank"} - This zip contains the source code needed to create the AllJoyn Z-Wave demo.
* [Build2015_AllJoyn_ZWave_Setup_Guide_v1.0.pdf](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynZWaveDemo/Build2015_AllJoyn_ZWave_Setup_Guide_v1.0.pdf?raw=true){:target="_blank"} - This pdf contains the documentation for how to connect your Windows 10 IoT Core device to Z-Wave devices.
* [Build2015_ZWave_DSB_Sample_Guide_v1.0.pdf](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynZWaveDemo/Build2015_ZWave_DSB_Sample_Guide_v1.0.pdf?raw=true){:target="_blank"} - This pdf contains the documentation for how to use the Device System Bridge app.

*AllJoyn Device System Bridge template for Visual Studio*
This template can be installed in Visual Studio 2015 Preview to enable you to create AllJoyn Device System Bridge projects. You can find the vsix [here](https://github.com/ms-iot/samples/tree/develop/AllJoyn/AllJoynDSBGuide){:target="_blank"}:

* [DeviceSystemBridgeTemplate.vsix](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynDSBGuide/DeviceSystemBridgeTemplate.vsix){:target="_blank"} - This vsix contains the AllJoyn Device System Bridge template. Note that this must be copied locally and cannot be installed remotely.
* [AllJoyn_DSB_GPIODevice_Sample_Tutorial_v1.0.pdf](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynDSBGuide/AllJoyn_DSB_GPIODevice_Sample_Tutorial_v1.0.pdf?raw=true){:target="_blank"} - This pdf contains a description of how to use the AllJoyn Device System Bridge template and a sample that exercises the device GPIO.  

*AllJoyn Explorer*
This is a tool we use in several points when working with AllJoyn samples. You can find the AllJoyn Explorer [here](https://github.com/ms-iot/samples/tree/develop/AllJoyn/AllJoynExplorer){:target="_blank"}:

* [AllJoynExplorer_1.0.0.0.zip](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoynExplorer_1.0.0.0.zip?raw=true){:target="_blank"} - This zip contains the AllJoyn Explorer AppX bundle.
* [AllJoyn_Explorer_Setup_Guide_v1.0.pdf](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_Setup_Guide_v1.0.pdf?raw=true){:target="_blank"} - This pdf contains the documentation for how to deploy the AllJoyn Explorer.
* [AllJoyn_Explorer_User_Guide_v1.0.pdf](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_User_Guide_v1.0.pdf?raw=true){:target="_blank"} - This pdf contains the documentation for how to use the AllJoyn Explorer.  


**Additional Resources**

* Building AllJoyn Apps on Windows 10 - [https://channel9.msdn.com/Blogs/Internet-of-Things-Blog/Step-By-Step-Building-AllJoyn-Universal-Windows-Apps-for-Windows-10-Public-Preview](https://channel9.msdn.com/Blogs/Internet-of-Things-Blog/Step-By-Step-Building-AllJoyn-Universal-Windows-Apps-for-Windows-10-Public-Preview){:target="_blank"}
* AllJoyn Interfaces in Windows 10 - [https://msdn.microsoft.com/en-us/library/windows/apps/xaml/windows.devices.alljoyn.aspx](https://msdn.microsoft.com/en-us/library/windows/apps/xaml/windows.devices.alljoyn.aspx){:target="_blank"}
* AllJoyn CodeGen Tool - [https://msdn.microsoft.com/en-us/library/windows/apps/xaml/dn913809.aspx](https://msdn.microsoft.com/en-us/library/windows/apps/xaml/dn913809.aspx){:target="_blank"}
* AllJoyn Architecture Details - [https://allseenalliance.org/developers/learn/](https://allseenalliance.org/developers/learn/){:target="_blank"}
* AllJoyn Developer Resources - [https://allseenalliance.org/developers/develop/](https://allseenalliance.org/developers/develop/){:target="_blank"}
