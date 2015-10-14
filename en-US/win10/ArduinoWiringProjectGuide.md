---
layout: default
title: Project Setup
permalink: /en-US/win10/ArduinoWiringProjectGuide.htm
lang: en-US
---

##Arduino Wiring Project Guide

This guide will walk through project creation, setup, and deployment of an Arduino Wiring project using Windows IoT Core!

Arduino Wiring projects utilize the familiar and easy to use Arduino Wiring API with Windows IoT Lightning functionality; a driver using direct memory mapping to provide insane performance speeds. You can copy & paste Arduino sketches and libraries into your IoT Core Arduino Wiring projects to run on any of your IoT Core devices!

#Install the Microsoft IoT Templates!

We've provided a Visual Studio extension which will automatically install a template to Visual Studio for the Arduino Wiring projects as well as other Microsoft IoT project types. Head over to [this link](https://visualstudiogallery.msdn.microsoft.com/06507e74-41cf-47b2-b7fe-8a2624202d36 ) to download the extension from the Microsoft Gallery!

##Create a new Project
Open Visual Studio. Select File -> New Project -> Visual C++ -> Windows -> Windows IoT Core -> Arduino Wiring Application for Windows IoT Core
![AppCreate]({{site.baseurl}}/images/arduino_wiring/appcreate.png)

##Change the Default Controller Driver

You will need to be running the Direct Memory Mapped Driver to write Arduino Wiring solutions! Refer to the [Lightning Setup Guide]({{site.baseurl}}\{{page.lang}}\win10\LightningSetup.htm) for instructions!

##Develop
Complete one of the many samples on the 'Develop' section of this section, or build your own project!

##Build and deploy

- **Optional** Use the Windows IoT Core Watcher application (or hook up your RPi to a monitor) to locate the IP address of your Raspberry Pi.
- In Visual Studio, make sure "Remote Machine" is selected as your deployment target

![Remote Machine]({{site.baseurl}}/images/arduino_wiring/wiringapp_remotemachine.png)

- Open the solution properties found on the Debug context menu in Visual Studio

![Solution Properties]({{site.baseurl}}/images/arduino_wiring/wiringapp_properties.png)

- Type the machine name (minwinpc by default) or the IP address if the remote machine into the 'machine name' field. If you have renamed your Raspberry pi to something else besides 'minwinpc' use that name in the login box instead.
- Change the 'Require authentication' field to 'No'

![Solution Properties]({{site.baseurl}}/images/arduino_wiring/wiringapp_properties2.png)


- Press F5 to build and deploy your project.