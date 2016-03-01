---
layout: default
title: Project Setup
permalink: /en-US/win10/ArduinoWiringProjectGuide.htm
lang: en-US
---

# Arduino Wiring Project Guide

This guide will walk through the creation, setup, and deployment of an Arduino Wiring project using Windows IoT Core!

Arduino Wiring projects utilize the familiar, easy to use Arduino Wiring API with Windows IoT Lightning functionality: a driver using direct memory mapping to provide significant [performance speeds]({{site.baseurl}}/{{page.lang}}/win10/LightningPerformance.htm). You can copy & paste Arduino sketches and libraries into your IoT Core Arduino Wiring projects and run them on any of your IoT Core devices! See the <a href="#develop">develop section</a> of this page for more information.

## Install the Microsoft IoT Templates!

We've provided a Visual Studio extension which will automatically install a VS template for the Arduino Wiring projects as well as other Microsoft IoT project types. Head over to [Windows IoT Core Project Templates extension page](https://visualstudiogallery.msdn.microsoft.com/55b357e1-a533-43ad-82a5-a88ac4b01dec) to download the extension from the Visual Studio Gallery!

## Create a new Project
Open Visual Studio. Select File -> New Project -> Visual C++ -> Windows -> Windows IoT Core -> Arduino Wiring Application for Windows IoT Core
![AppCreate]({{site.baseurl}}/Resources/images/arduino_wiring/appcreate.png)

## Change the Default Controller Driver

You will need to be running the Direct Memory Mapped Driver to write Arduino Wiring solutions! Refer to the [Lightning Setup Guide]({{site.baseurl}}/{{page.lang}}/win10/LightningSetup.htm) for instructions!

## Windows IoT Core Insider Preview required
Arduino Wiring app support is currently included only in the Insider Preview builds for Windows IoT Core.
You can download a Windows 10 IoT Core image from our [downloads page]({{site.baseurl}}/{{page.lang}}/Downloads.htm ). Click on "Download Insider Preview" for your device type.

<A name="develop"></a>

## Develop
Complete one of the many "Wiring" samples on the [Samples Page]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm), or build your own project! Any of the samples we've created that are written using Arduino Wiring will be listed like so: [Blinky (Wiring)]({{site.baseurl}}/{{page.lang}}/win10/samples/arduino-wiring/HelloBlinky.htm). Blinky, the cononical "Hello World" project for IoT projects, is a great place to start for your first project!

### Porting

The Arduino Wiring API has been carefully implemented to make it possible to copy/paste your libraries and sketches into an Arduino Wiring project. Nevertheless there are, in some circumstances, slight modifications you may have to make to your sketches or libraries. We've created an easy to follow [Arduino Wiring Porting Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm) to cover these potential issues.

## Build and Deploy

- **Optional** Use the Windows 10 IoT Core Dashboard application (or hook up your device to a monitor) to locate the IP address of your device.
- In Visual Studio, make sure "Remote Machine" is selected as your deployment target.

![Remote Machine]({{site.baseurl}}/Resources/images/arduino_wiring/wiringapp_remotemachine.png)

- Open the solution properties found on the Debug context menu in Visual Studio.

![Solution Properties]({{site.baseurl}}/Resources/images/arduino_wiring/wiringapp_properties.png)

- Type the machine name (minwinpc by default) or the IP address of the remote machine into the 'machine name' field. If you have renamed your device to something besides 'minwinpc' use that name in the login box instead.
- Change the 'Require authentication' field to 'No'

![Solution Properties]({{site.baseurl}}/Resources/images/arduino_wiring/wiringapp_properties2.png)


- Press F5 to build and deploy your project.
