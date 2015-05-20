---
layout: default
title: AllJoyn
permalink: /win10/AllJoyn.htm
---

<div class="container" markdown="1">
##AllJoyn<br/>

**What is AllJoyn?**<br/>
Driven by the AllSeen Alliance, AllJoyn is an open-source, proximity-based connectivity and services framework.  Specifically designed for the Internet of Things (IoT), it enables interoperability such that various devices can discover, connect, and communicate with each other directly, without the need for an intermediary server.<br/><br/>

**Why AllJoyn?**<br/>
The AllJoyn framework provides a common language interface that enables IoT devices to communicate and interact with each other, regardless of brand, platform, operating system or underlying transport technology. For developers, this translates to reduced time to market and lower cost while offering consumers a simple connectivity solution for all their devices.<br/><br/>

**AllJoyn Architecture**<br/>
The AllJoyn framework establishes a standard by which devices and apps can advertise and discover each other.  AllJoyn devices describe their capabilities via service interfaces on a virtual bus.  The AllJoyn Bus is composed of two types of nodes:

* *Routing Notes (RN)* - Also referred to as "Routers", they can talk to any node.
* *Leaf Nodes (LN)* - Also referred to as "Applications", they can talk to routing nodes or other leaf nodes via routing nodes.<br/>
<br/>![AllJoyn Target]({{site.baseurl}}/images/AllJoyn/AllJoyn_Routers_Apps.png)<br/>

The below diagram shows the high-level software architecture of the AllJoyn framework:<br/>
<br/>![AllJoyn Target]({{site.baseurl}}/images/AllJoyn/AllJoyn_Architecture.png)

* *AllJoyn App Layer* - Defines the user experience<br/>
* *AllJoyn Service Frameworks* - Interoperable, cross-platform modules that define common interfaces between devices <br/>
* *AllJoyn Core Libs* - Core libraries that interact with the AllJoyn Router and provide the ability to find and securely connect to devices <br/>
* *AllJoyn Router* - Manages communications between devices and apps <br/><br/>
 
The AllJoyn framework comes in 2 flavors:

* *Standard* - Primarily used for non-embedded devices with support for full set of core libraries
* *Thin* - Suitable for IoT devices that are resource constrained and requires an AllJoyn router in the network<br/>
<br/>![AllJoyn Target]({{site.baseurl}}/images/AllJoyn/AllJoyn_Frameworks.png)
	
AllJoyn enables proximity based communication, allowing transport to occur over Ethernet, Wi-Fi, serial, and Power Line (PLC).  However, the AllJoyn framework is transport-agnostic, thus allowing for any future transport mechanisms to be added.  Additionally, bridge software can be created to link the AllJoyn framework to other systems like Zigbee, Z-wave, or the cloud.  See more details & samples below on the AllJoyn Device System Bridge contribution to the AllSeen Alliance from Microsoft.<br/><br/>

**AllJoyn Device System Bridge**<br/>
Device System Bridges (DSBs) can help facilitate communication across existing incompatible networks.  DSBs offer a cost efficient and quick way to bring existing devices to AllJoyn as virtual devices on the AllJoyn network.  This is done through a pre-baked AllJoyn producer implementation (Bridge), and implementing calls to SDK hooks to support translation of AllJoyn concepts to target devices (Adapter).  Developers need not modify AllJoyn producers with a DSB, unless a change in the default behavior of the Bridge is desired.  For more information on the purpose of Device System Bridges and its structure, check out this <a href="https://git.allseenalliance.org/cgit/dsb.git/plain/Docs/AllJoyn - Device System Bridge - Whitepaper v1.0.pdf" target="_blank">whitepaper.</a><br/>
<br/>![AllJoyn Target]({{site.baseurl}}/images/AllJoyn/AllJoyn_DSBArch.png)

With the <a href="https://wiki.allseenalliance.org/gateway/dsb" target="_blank">AllJoyn Device System Bridge contribution</a> from Microsoft, you can connect existing devices that use BACnet or Z-Wave to an AllJoyn network, thereby enabling existing devices to interact with new AllJoyn devices, as well as enabling cloud connectivity across all devices on the network.   There is also a useful <a href="https://github.com/MS-brock/AllJoynToasterDemo/tree/master/getajxml" target="_blank">tool</a> published which generates AllJoyn introspection XML from an existing AllJoyn device, with usage described in detail in a posting on <a href="https://channel9.msdn.com/Blogs/Internet-of-Things-Blog/Step-By-Step-Building-AllJoyn-Universal-Windows-Apps-for-Windows-10-Public-Preview" target='_blank'>channel 9.</a><br/><br/>
Be sure to check out samples and additional documentation below.  We hope you’ll help build many more IoT bridges and contribute your bridges to the AllSeen Alliance.<br/><br/>

**Samples**<br/>

*AllJoyn Z-Wave demo (Device System Bridge)*<br/>
This is preinstalled in Windows 10 IoT Core Technical Preview. You can find the source code for this <a href="https://github.com/ms-iot/samples/tree/develop/AllJoyn/AllJoynZWaveDemo" target="_blank">here.</a><br/>

* <a href="https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynZWaveDemo/ZWaveAdapterUAP.zip?raw=true" target="_blank">ZWaveAdapterUAP.zip</a> - This zip contains the source code needed to create the AllJoyn Z-Wave demo.
* <a href="https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynZWaveDemo/Build2015_AllJoyn_ZWave_Setup_Guide_v1.0.pdf?raw=true" target="_blank">Build2015_AllJoyn_ZWave_Setup_Guide_v1.0.pdf</a> - This pdf contains the documentation for how to connect your Windows 10 IoT Core device to Z-Wave devices.
* <a href="https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynZWaveDemo/Build2015_ZWave_DSB_Sample_Guide_v1.0.pdf?raw=true" target="_blank">Build2015_ZWave_DSB_Sample_Guide_v1.0.pdf</a> - This pdf contains the documentation for how to use the Device System Bridge app. <br/><br/>

*AllJoyn Device System Bridge template for Visual Studio*<br/>
This template can be installed in Visual Studio 2015 Preview to enable you to create AllJoyn Device System Bridge projects. You can find the vsix <a href="https://github.com/ms-iot/samples/tree/develop/AllJoyn/AllJoynDSBGuide" target="_blank">here</a>:<br/>

* <a href="https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynDSBGuide/DeviceSystemBridgeTemplate.vsix" target="_blank">DeviceSystemBridgeTemplate.vsix</a> - This vsix contains the AllJoyn Device System Bridge template. Note that this must be copied locally and cannot be installed remotely.
* <a href="https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynDSBGuide/AllJoyn_DSB_GPIODevice_Sample_Tutorial_v1.0.pdf?raw=true" target="_blank">AllJoyn_DSB_GPIODevice_Sample_Tutorial_v1.0.pdf</a> - This pdf contains a description of how to use the AllJoyn Device System Bridge template and a sample that exercises the device GPIO.<br/><br/>

*AllJoyn Explorer*<br/>
This is a tool we use in several points when working with AllJoyn samples. You can find the AllJoyn Explorer <a href="https://github.com/ms-iot/samples/tree/develop/AllJoyn/AllJoynExplorer" target="_blank">here</a>:<br/>

* <a href="https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoynExplorer_1.0.0.0.zip?raw=true" target="_blank">AllJoynExplorer_1.0.0.0.zip</a> - This zip contains the AllJoyn Explorer AppX bundle.
* <a href="https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_Setup_Guide_v1.0.pdf?raw=true" target="_blank">AllJoyn_Explorer_Setup_Guide_v1.0.pdf</a> - This pdf contains the documentation for how to deploy the AllJoyn Explorer.
* <a href="https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_User_Guide_v1.0.pdf?raw=true" target="_blank">AllJoyn_Explorer_User_Guide_v1.0.pdf</a> - This pdf contains the documentation for how to use the AllJoyn Explorer.<br/><br/>
 
**Additional Resources**<br/>

* Building AllJoyn Apps on Windows 10 - <a href="https://channel9.msdn.com/Blogs/Internet-of-Things-Blog/Step-By-Step-Building-AllJoyn-Universal-Windows-Apps-for-Windows-10-Public-Preview" target="_blank">https://channel9.msdn.com/Blogs/Internet-of-Things-Blog/Step-By-Step-Building-AllJoyn-Universal-Windows-Apps-for-Windows-10-Public-Preview</a>
* AllJoyn Interfaces in Windows 10 - <a href="https://msdn.microsoft.com/en-us/library/windows/apps/xaml/windows.devices.alljoyn.aspx" target="_blank">https://msdn.microsoft.com/en-us/library/windows/apps/xaml/windows.devices.alljoyn.aspx</a>
* AllJoyn CodeGen Tool - <a href="https://msdn.microsoft.com/en-us/library/windows/apps/xaml/dn913809.aspx" target="_blank">https://msdn.microsoft.com/en-us/library/windows/apps/xaml/dn913809.aspx</a>
* AllJoyn Architecture Details - <a href="https://allseenalliance.org/developers/learn/" target="_blank">https://allseenalliance.org/developers/learn/</a>
* AllJoyn Developer Resources - <a href="https://allseenalliance.org/developers/develop/" target="_blank">https://allseenalliance.org/developers/develop/</a><br/>
 
</div>