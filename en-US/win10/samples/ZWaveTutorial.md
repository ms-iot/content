---
layout: default
title: ZWaveTutorial
permalink: /en-US/win10/samples/ZWaveTutorial.htm
lang: en-US
---

## ZWave Sample

[Get the code on Github](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynZWaveDemo/ZWaveAdapter.zip?raw=true)

This document describes the setup of the AllJoyn Z-Wave demo that is provided at //Build/2015 as part of the Raspberry Pi2 image. It will demonstrate the function of the Z-Wave AllJoyn Device System Bridge (DSB) in exposing and controlling a ZWave device.

### What is ZWave?

Z-Wave is a wireless communications protocol designed to allow devices in the home (lighting, household appliances, for example) to communicate with another for the purposes of home automation.

## Prerequisites

1. Raspberry Pi2 with //Build/2015 image. This image contains the driver for the Aeon Labs Z-Wave Stick and the Z-Wave DSB.
2. <a name="AllJoyn_Z_Wave"></a>Z-Wave devices  Two Aeon Labs Z-Wave devices are needed for this demo:
  * Aeon Labs DSA02203-ZWUS Z-Wave Z-Stick Series 2 USB Dongle
  * Aeon Labs DSC24-ZWUS Smart Switch Z-Wave Appliance Module
3. PC or Laptop with Windows 10
  * Public release of Windows 10 – build 10240 or later
  * AllJoyn Explorer (AJX)

  * [AllJoyn Explorer](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoynExplorer_1.0.1.5.zip?raw=true){:target="_blank"} - This zip contains the AllJoyn Explorer AppX bundle.
  * [AllJoyn Explorer Setup Guide](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_Setup_Guide_v1.0.pdf?raw=true){:target="_blank"} - Manual for installing and launching the AllJoyn Explorer.
  * [AllJoyn Explorer User Guide](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_User_Guide_v1.0.pdf?raw=true){:target="_blank"} - this pdf contains the documentation for how to use the AllJoyn Explorer

## Setting up the Raspberry Pi2

1. Connect your Raspberry Pi2 to the LAN (via hub or direct via cross over or Auto MDI-X)
2. Connect power to start the Raspberry Pi2
3. Verify that the PC can access the Raspberry Pi2 with the Windows IoT Core Watcher

## Deploying the ZWave DSB

1. Download the ZWaveAdapter.zip file [here](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynZWaveDemo/ZWaveAdapter.zip?raw=true)
2. Navigate to the folder where you downloaded the zip file. Right click the file and "Extract All..." to the folder of your choosing.
3. Navigate to the extracted folder and open the ZWaveAdapter.sln solution file in Visual Studio.
4. Once the solution has been opened in Visual Studio, Navigate to the Solution explorer and right click the ZWaveBackgroundService project. Select "Set as Startup Project". ![set_startup]({{site.baseurl}}/images/AllJoyn/startup_proj.png)

5.  In the Main menu bar, select "Debug" -> ZWaveBackgroundService properties…"
6.  Follow the instructions to [setup remote debugging and deploy the app]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#cpp)

## Pair the Z-Wave device

1. NOTE: Do not plug in the Z-Wave USB dongle yet. Also, the Z-Wave Dongle and Z-Wave switch need to be in close proximity
2. Tap the circular button to put the Z-Stick in inclusion mode.  The LED should start to blink slowly.
3. Once the Z-Stick is inclusion mode, plug the Z-Wave switch in (it will not function without being connected to power) and press the power button to add it to the Z-Wave network.  The light on  the controller will blink fast during neighbor discovery and stay solid for 3 seconds to indicate successful inclusion of the device to the network.
4. Once the LED returns to blinking slowly, tap the button on the Z-Stick again to turn off inclusion mode.
6. Insert the USB Z-Stick into the RPi2.

The setup should look like in the picture below

![Rpi_ZStick]({{site.baseurl}}/images/AllJoyn/ZStick_RPi.png)

## Controlling the Z-Wave switch via AllJoyn

Let’s turn the Z-Wave power switch on! We will use the AllJoyn Explorer (AJX) to navigate the devices, objects and interfaces.

Launch AlljoynExplorer. The AJX should find the following three devices:

• ZWaveAdapter  – Microsoft DSB: This is the Z-Wave DSB
• HomeID_xxx…  – Aeon Labs Smart Energy Switch: This is the Z-Wave power switch that is paired with the Z-Wave dongle
• HomeID_xxx…  – Aeon Labs Z-Stick S2: This is the Z-Wave USB dongle  Select the Aeon Labs Smart Energy Switch.

![AJx_ZWave1]({{site.baseurl}}/images/AllJoyn/Ajx_shot1.png)

Select the Switch object.

![AJx_ZWave2]({{site.baseurl}}/images/AllJoyn/ajx_shot2.png)

  The interface view of the Switch object lists several interfaces. Most of them are default AllJoyn interfaces such as the Introspectable interface. Select the com.microsft.ZWaveAdapterHome… interface.


![AJx_ZWave3]({{site.baseurl}}/images/AllJoyn/Ajx_shot3.png)


Select the value property.

![AJx_ZWave4]({{site.baseurl}}/images/AllJoyn/Ajx_shot4.png)

  Depending on the current state of the switch (on or off) the Current value field will show true for ON and false for OFF. In the New Value drop down list select the new setting. After the new setting is selected press Set.

![AJx_ZWave5]({{site.baseurl}}/images/AllJoyn/Ajx_shot5.png)

  The view will report the change of the value in the Current value field as well as the return status code of the operation:

![AJx_ZWave6]({{site.baseurl}}/images/AllJoyn/Ajx_shot6.jpg)


