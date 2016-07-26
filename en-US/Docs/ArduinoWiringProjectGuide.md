---
layout: default
title: Project Setup
permalink: /en-US/Docs/ArduinoWiringProjectGuide.htm
lang: en-US
---

# Arduino Wiring Project Guide

This guide will walk through the creation, setup, and deployment of an Arduino Wiring project using Windows IoT Core!

Arduino Wiring projects utilize the familiar, easy to use Arduino Wiring API with Windows IoT Lightning DMAP driver: a driver using direct memory mapping to provide significant [performance speeds]({{site.baseurl}}/{{page.lang}}/Docs/LightningPerformance.htm). You can copy & paste Arduino sketches and libraries into your IoT Core Arduino Wiring projects and run them on supported IoT Core devices, including Raspberry Pi2, 3 and Minnowboard Max! See the <a href="#develop">develop section</a> of this page for more information.

## Install the Microsoft IoT Templates!

We've provided a Visual Studio extension which will automatically install a VS template for the Arduino Wiring projects as well as other Microsoft IoT project types. 

- Head over to [Windows IoT Core Project Templates extension page](https://visualstudiogallery.msdn.microsoft.com/55b357e1-a533-43ad-82a5-a88ac4b01dec) to download the extension from the Visual Studio Gallery!
- Install the extension and restart Visual Studio if it was already open

## Change the Default Controller Driver

You will need to be running the Direct Memory Mapped Driver to write Arduino Wiring solutions! Refer to the [Lightning Setup Guide]({{site.baseurl}}/{{page.lang}}/Docs/LightningSetup.htm) for instructions!

<a name="develop"></a>

## Develop
Complete one of the "Wiring" samples on the [Samples Page]({{site.baseurl}}/{{page.lang}}/Docs/StartCoding.htm), or build your own project! Any of the samples we've created that are written using Arduino Wiring will be listed like so: [Blinky (Wiring)]({{site.baseurl}}/{{page.lang}}/Samples/arduino-wiring/HelloBlinky.htm). Blinky, the cononical "Hello World" project for IoT projects, is a great place to start for your first project!

### Create a new Project
Open Visual Studio. Select File -> New Project -> Visual C++ -> Windows -> Windows IoT Core -> Arduino Wiring Application for Windows IoT Core

![App Create]({{site.baseurl}}/Resources/images/arduino_wiring/appcreate.png)

### Porting

The Arduino Wiring API has been carefully implemented to make it possible to copy/paste your libraries and sketches into an Arduino Wiring project. Nevertheless there are, in some circumstances, slight modifications you may have to make to your sketches or libraries. We've created an easy to follow [Arduino Wiring Porting Guide]({{site.baseurl}}/{{page.lang}}/Docs/ArduinoWiringPortingGuide.htm) to cover these potential issues.

## Build and Deploy

- In Visual Studio, make sure "Remote Machine" is selected as your deployment target.
- Also, make sure the  architecture is set to match the board you're running your project on. For Raspberry Pi 2 or 3 choose "ARM" and for Minnowboard Max, choose "x86".

![Remote Machine]({{site.baseurl}}/Resources/images/arduino_wiring/wiringapp_remotemachine.png)

- Open the solution properties found on the Debug context menu in Visual Studio.

![Solution Properties]({{site.baseurl}}/Resources/images/arduino_wiring/wiringapp_properties.png)

- locate the IP address or machine name of your device. Either use the Windows 10 IoT Core Dashboard application or hook up your device to a monitor.
- Type the machine name (minwinpc by default) or the IP address of the remote machine into the 'machine name' field. If you have renamed your device to something besides 'minwinpc' use that name in the login box instead.
- Ensure the Authentican Type is: Universal (Unencrypted Protocol)

![Solution Properties]({{site.baseurl}}/Resources/images/arduino_wiring/wiringapp_properties2.png)

- Press F5 to build and deploy your project on your device.
