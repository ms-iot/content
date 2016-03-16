---
layout: default
title: ZWaveTutorial
permalink: /en-US/win10/samples/ZWaveTutorial.htm
lang: en-US
---

## Z-Wave Sample

{% include VerifiedVersion.md %}

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\AllJoyn\Samples\ZWaveAdapter`.  The sample code is available in C++. Make a copy of the folder on your disk and open the project from Visual Studio.

This tutorial demonstrates the function of the AllJoyn Device System Bridge (DSB) in exposing and controlling Z-Wave devices, and describes the setup of the AllJoyn Z-Wave demo that is provided at //Build/2015 as part of the Raspberry Pi2 image. It will demonstrate the function of the Z-Wave AllJoyn Device System Bridge (DSB) in exposing and controlling a Z-Wave device.

### What is Z-Wave?

Z-Wave is a wireless communications protocol designed to allow devices in the home (lighting, household appliances, for example) to communicate with another for the purposes of home automation.

## Prerequisites

1. Raspberry Pi2 with Windows 10 IOT Core image.
2. <a name="AllJoyn_Z_Wave"></a>Z-Wave devices  Two Aeon Labs Z-Wave devices are needed for this demo:
  * Aeon Labs DSA02203-ZWUS Z-Wave Z-Stick Series 2 USB Dongle
  * Aeon Labs DSC24-ZWUS Smart Switch Z-Wave Appliance Module
3. PC or Laptop with Windows 10 with installed [IoT Explorer for AllJoyn]({{site.baseurl}}/en-US/win10/AllJoyn.htm#AllJoynExplorer){:target="_blank"} app.


## Setting up the Raspberry Pi2

1. Connect your Raspberry Pi2 to the LAN (via hub or direct via cross over or Auto MDI-X)
2. Connect power to start the Raspberry Pi2
3. Verify that the PC can access the Raspberry Pi2 with the Windows 10 IoT Core Dashboard

## Deploying the Z-Wave DSB

### To run previously installed

The Z-Wave adapter DSB comes pre-installed for most Windows 10 IOT Core images. In that case, all you need is to launch the sample using SSH or Windows Device Portal. 

1. Using [SSH]({{site.baseurl}}/en-US/win10/samples/SSH.htm){:target="_blank"} or [Windows Device Portal]({{site.baseurl}}/en-US/win10/tools/DevicePortal.htm){:target="_blank"} run the following command
   **iotstartup.exe add headless ZWave**
2. Reboot the device. The Z-Wave adapter application now will be launched on boot.

### To run from source
1. Download a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip).
2. Open `samples-develop\AllJoyn\Samples\ZWaveAdapter\ZWaveAdapter.sln` in Visual Studio.
3. Once the solution has been opened in Visual Studio, Navigate to the Solution explorer and right click the ZWaveBackgroundService project. Select "Set as Startup Project". ![set_startup]({{site.baseurl}}/Resources/images/AllJoyn/startup_proj.png)

4.  In the Main menu bar, select "Debug" -> ZWaveBackgroundService properties…"
5.  Follow the instructions to [setup remote debugging and deploy the app]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#cpp)

## Pair the Z-Wave device

NOTE: Do not plug in the Z-Wave USB dongle when pairing. Also, the Z-Wave Dongle and Z-Wave switch need to be in close proximity
1. Tap the circular button to put the Z-Stick in inclusion mode.  The LED should start to blink slowly.
2. Once the Z-Stick is inclusion mode, plug the Z-Wave switch in (it will not function without being connected to power) and press the power button to add it to the Z-Wave network.  The light on  the controller will blink fast during neighbor discovery and stay solid for 3 seconds to indicate successful inclusion of the device to the network.
3. Once the LED returns to blinking slowly, tap the button on the Z-Stick again to turn off inclusion mode.
4. Insert the USB Z-Stick into the RPi.

The setup should look like in the picture below

![Rpi_ZStick]({{site.baseurl}}/Resources/images/AllJoyn/ZStick_RPi.png)

## Controlling the Z-Wave switch via AllJoyn

Let’s turn the Z-Wave power switch on! We will use the IoT Explorer for AllJoyn application to navigate the devices, objects and interfaces.

Launch IoT Explorer for AllJoyn app. The app should find the following three devices:

• ZWaveAdapter  – Microsoft DSB: This is the Z-Wave DSB
• HomeID_xxx…  – Aeon Labs Smart Energy Switch: This is the Z-Wave power switch that is paired with the Z-Wave dongle
• HomeID_xxx…  – Aeon Labs Z-Stick S2: This is the Z-Wave USB dongle  Select the Aeon Labs Smart Energy Switch.

![AJx_ZWave1]({{site.baseurl}}/Resources/images/AllJoyn/Ajx_shot1.png)

Select the Switch object.

![AJx_ZWave2]({{site.baseurl}}/Resources/images/AllJoyn/ajx_shot2.png)

  The interface view of the Switch object lists several interfaces. Most of them are default AllJoyn interfaces such as the Introspectable interface. Select the com.microsft.ZWaveAdapterHome… interface.


![AJx_ZWave3]({{site.baseurl}}/Resources/images/AllJoyn/Ajx_shot3.png)


Select the value property.

![AJx_ZWave4]({{site.baseurl}}/Resources/images/AllJoyn/Ajx_shot4.png)

  Depending on the current state of the switch (on or off) the Current value field will show true for ON and false for OFF. In the New Value drop down list select the new setting. After the new setting is selected press Set.

![AJx_ZWave5]({{site.baseurl}}/Resources/images/AllJoyn/Ajx_shot5.png)

  The view will report the change of the value in the Current value field as well as the return status code of the operation:

![AJx_ZWave6]({{site.baseurl}}/Resources/images/AllJoyn/Ajx_shot6.jpg)


