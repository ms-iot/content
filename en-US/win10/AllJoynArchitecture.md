---
layout: default
title: AllJoyn Architecture
permalink: /en-US/win10/AllJoynArchitecture.htm
lang: en-US
---

##AllJoyn Architecture

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

AllJoyn enables proximity based communication, allowing transport to occur over Ethernet, Wi-Fi, serial, and Power Line (PLC).  However, the AllJoyn framework is transport-agnostic, thus allowing for any future transport mechanisms to be added.  Additionally, bridge software can be created to link the AllJoyn framework to other systems like Zigbee, Z-wave, or the cloud.  See more details and samples on the [AllJoyn Device System Bridge]({{site.baseurl}}/{{page.lang}}/win10/AllJoynDSB.htm){:target="_blank"} page for Microsoft's contribution to the AllSeen Alliance.


