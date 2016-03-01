---
layout: default
title: Alljoyn Mock Adapter Tutorial
permalink: /en-US/win10/samples/MockAdapterTutorial.htm
lang: en-US
---

## Alljoyn Mock Adapter Sample

{% include VerifiedVersion.md %}

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\AllJoyn\Samples\MockAdapter`.  The sample code is available in C++. Make a copy of the folder on your disk and open the project from Visual Studio.

This tutorial demonstrates the function of the AllJoyn Device System Bridge (DSB) in exposing and controlling mock devices.

## Prerequisites

1. Raspberry Pi2 running Windows 10 IoT Core build 10240+
2. PC or Laptop with Windows 10 build 10240+
3. Install [IoT Explorer for AllJoyn]({{site.baseurl}}/en-US/win10/AllJoyn.htm#AllJoynExplorer){:target="_blank"} app.

## Setting up the Raspberry Pi2

1. Connect your Raspberry Pi2 to the LAN
2. Connect power to start the Raspberry Pi2
3. Verify that the PC can access the Raspberry Pi2 with the Windows 10 IoT Core Dashboard

## Run the Mock Adapter in Visual Studio

1. Download a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip).
2. Open `samples-develop\AllJoyn\Samples\MockAdapter\MockAdapter.sln` in Visual Studio.
3. Navigate to the Solution explorer and right click the HeadlessAdapterApp project. Select "Set as Startup Project".

![set_startup]({{site.baseurl}}/Resources/images/MockAdapter/mockadapter_vs.png)

4. 	In the Main menu bar, select "Debug" -> HeadlessAdapterApp properties…"
5.	Follow the instructions to [setup remote debugging and deploy the app]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#cpp)

## Controlling the Mock Devices via IoT Explorer for Alljoyn

We will use the IoT Explorer for AllJoyn to navigate the devices, objects and interfaces.

Launch IoT Explorer for AllJoyn app. The app should find the following four devices:

* DSB Mock Adapter – Microsoft DSB: This is the Mock Adapter DSB
* Mock BACnet Temperature Sensor - Microsoft Temperature Sensor 155: the mock temperature sensor device
* Mock BACnet Dimmable Switch - Microsoft Dim Control 725: the mock dimmable switch device
* Mock BACnet Switch - Microsoft 2 X Switch: the mock switch device.

![AJx_Mock1]({{site.baseurl}}/Resources/images/MockAdapter/mock_ajx1.png)

Select the Mock BACnet Switch object.

![AJx_Mock2]({{site.baseurl}}/Resources/images/MockAdapter/mock_ajx2.png)

Select the Mock_BACnet_Switch object.

![AJx_Mock3]({{site.baseurl}}/Resources/images/MockAdapter/mock_ajx3.png)

  The interface view of the Mock_BACnet_Switch object lists several interfaces. Most of them are default AllJoyn interfaces such as the Introspectable interface. Select the com.microsft.DSBMockAdapter.MockBACnetSwitch.MainInter... interface.

![AJx_Mock4]({{site.baseurl}}/Resources/images/MockAdapter/mock_ajx4.png)

Select the DeviceReset Method.

![AJx_Mock5]({{site.baseurl}}/Resources/images/MockAdapter/mock_ajx5.png)

 In the method input arguments section, type "reset" and press "Invoke". Status OK should be displayed.

![AJx_Mock6]({{site.baseurl}}/Resources/images/MockAdapter/mock_ajx6.png)
