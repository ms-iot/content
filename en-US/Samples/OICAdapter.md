---
layout: sample
title:  OIC adapter
description: Exposes and controls the OIC/OCF/IoTivity devices and resources
keyword: Windows 10 IoT Core, OIC, OCF, IoTivity, alljoyn, connectivity
permalink: /en-US/Samples/OICAdapter.htm
samplelink: https://github.com/ms-iot/samples/tree/develop/AllJoyn/Samples/OICAdapter
lang: en-US
---


# OIC Adapter

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\AllJoyn\Samples\OICAdapter`.  The sample code is available in C++. Make a copy of the folder on your disk and open the project from Visual Studio.

This document demonstrates the function of the AllJoyn Device System Bridge (DSB) in exposing and controlling IoTivity devices and resources on Windows 10 IoT Core.

### What is OCF and IoTivity?
Formerly known as Open Interconnect Consortium (OIC), Open Connectivity Foundation (OCF)  is an industry group established with the mission of developing connectivity standards and certification for devices to address the emerging needs of the Internet of Things (IoT).

IoTivity is an open source software framework and the reference implementation for the OCF specifications. More information is available on the [OCF Website](https://openconnectivity.org/){:target="_blank"}.

## Prerequisites

1. Device running Windows 10 IOT Core image such as Raspberry Pi ver 2 or 3, Minnow Board Max, Dragon Board, etc.
2. PC or Laptop with Windows 10 with installed [IoT Explorer for AllJoyn]({{site.baseurl}}/en-US/Docs/AllJoyn.htm#AllJoynExplorer){:target="_blank"} app.

## Setting up the IoT Core Device

1. Connect your IoT Core Device to the LAN (via hub or direct via cross over or Auto MDI-X)
2. Connect power to start the device
3. Verify that the PC can access the device with the Windows 10 IoT Core Dashboard

## Deploying the OIC DSB

1. Download a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip).
2. Open `samples-develop\AllJoyn\Samples\OICAdapter\OICAdapter.sln` in Visual Studio.
3. Once the solution has been opened in Visual Studio, Navigate to the Solution explorer and right click the HeadlessAdapterApp project. Select "Set as Startup Project". ![Set HeadlessAdapterApp as startup project]({{site.baseurl}}/Resources/images/AllJoyn/oic_startup_proj.png)

4. In the Main menu bar, select "Debug" -> HeadlessAdapterApp properties…"
5. Follow the instructions to [setup remote debugging and deploy the app]({{site.baseurl}}/{{page.lang}}/Docs/AppDeployment.htm#cpp){:target="_blank"}.

## IoTivity Simulator

OCF devices and resources can be simulated through the simulator developed by the IoTivity team. The instructions for installing and using the simulator tool is available [here](https://wiki.iotivity.org/iotivity_tool_guide){:target="_blank"}.

One can then use [IoT Explorer for AllJoyn](https://www.microsoft.com/store/apps/9nblggh6gpxl){:target="_blank"} to enumerate and control the OIC devices.

