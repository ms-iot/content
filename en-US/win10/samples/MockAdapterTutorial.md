---
layout: default
title: Alljoyn Mock Adapter Tutorial
permalink: /en-US/win10/samples/MockAdapterTutorial.htm
lang: en-US
---

##Alljoyn Mock Adapter Sample

[Get the code on Github](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AlljoynMockAdapter/MockAdapter.zip?raw=true)

This tutorial demonstrates the function of the AllJoyn Device System Bridge (DSB) in exposing and controlling mock BACnet devices.

## Prerequisites

1. Raspberry Pi2 running Windows 10 IoT Core build 10240+
2. PC or Laptop with Windows 10 build 10240+
3. AllJoyn Explorer (AJX)

  * [AllJoyn Explorer](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoynExplorer_1.0.1.5.zip?raw=true){:target="_blank"} - This zip contains the AllJoyn Explorer AppX bundle.
  * [AllJoyn Explorer Setup Guide](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_Setup_Guide_v1.0.pdf?raw=true){:target="_blank"} - Manual for installing and launching the AllJoyn Explorer.
  * [AllJoyn Explorer User Guide](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_User_Guide_v1.0.pdf?raw=true){:target="_blank"} - this pdf contains the documentation for how to use the AllJoyn Explorer

## Setting up the Raspberry Pi2

1. Connect your Raspberry Pi2 to the LAN
2. Connect power to start the Raspberry Pi2
3. Verify that the PC can access the Raspberry Pi2 with the Windows IoT Core Watcher

## Run the Mock BACnet Adapter in Visual Studio

1. Download the MockAdapter.zip file [here](https://github.com/ms-iot/samples-private/blob/rtm/AllJoyn/AllJoynMockAdapter/MockAdapter.zip?raw=true) to a locaiton on your local machine
2. Navigate to the folder where you downloaded the zip file. Right click the file and "Extract All..." to the folder of your choosing.
3. Navigate to the extracted folder and open the MockAdapter.sln solution file in Visual Studio.
4. Once the solution has been opened in Visual Studio, Navigate to the Solution explorer and right click the HeadlessAdapterApp project. Select "Set as Startup Project".

![set_startup]({{site.baseurl}}/images/MockAdapter/mockadapter_vs.png)

5. 	In the Main menu bar, select “Debug” -> HeadlessAdapterApp properties…”
6.	Follow the instructions to [setup remote debugging and deploy the app]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#cpp)

## Controlling the Mock Devices via Alljoyn Explorer

We will use the AllJoyn Explorer (AJX) to navigate the devices, objects and interfaces.

Launch AlljoynExplorer. The AJX should find the following four devices:

* DSB Mock Adapter – Microsoft DSB: This is the Mock Adapter DSB
* Mock BACnet Temperature Sensor - Microsoft Temperature Sensor 155: the mock temperature sensor device
* Mock BACnet Dimmable Switch - Microsoft Dim Control 725: the mock dimmable switch device
* Mock BACnet Switch - Microsoft 2 X Switch: the mock switch device.

![AJx_Mock1]({{site.baseurl}}/images/MockAdapter/mock_ajx1.png)

Select the Mock BACnet Switch object.

![AJx_Mock2]({{site.baseurl}}/images/MockAdapter/mock_ajx2.png)

Select the Mock_BACnet_Switch object.

![AJx_Mock3]({{site.baseurl}}/images/MockAdapter/mock_ajx3.png)

  The interface view of the Mock_BACnet_Switch object lists several interfaces. Most of them are default AllJoyn interfaces such as the Introspectable interface. Select the com.microsft.DSBMockAdapter.MockBACnetSwitch.MainInter... interface.

![AJx_Mock4]({{site.baseurl}}/images/MockAdapter/mock_ajx4.png)

Select the DeviceReset Method.

![AJx_Mock5]({{site.baseurl}}/images/MockAdapter/mock_ajx5.png)

 In the method input arguments section, type "reset" and press "Invoke". Status OK should be displayed.

![AJx_Mock6]({{site.baseurl}}/images/MockAdapter/mock_ajx6.png)



