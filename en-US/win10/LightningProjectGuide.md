---
layout: default
title: Project Setup
permalink: /en-US/win10/LightningProjectGuide.htm
lang: en-US
---

##Lightning Project Guide

This guide will walk through project creation, setup, and deployment of a Lightning project using Windows IoT Core!

##Create a new Project
Open Visual Studio. Select File -> New Project -> Visual C++ -> Windows -> Windows IoT Core -> Arduino Wiring Application for Windows IoT Core
![AppCreate]({{site.baseurl}}/images/rpi2_wiring/appcreate.png)

##Change the Default Controller Driver

We will want to open the Windows Device Portal

1. Locate the IP address of your device, either by using the Windows IoT Core Watcher application or hook up your board to a monitor.
2. From your local machine, open the Windows Devices Portal web page by entering this address http://{BoardIPAddress}:8080/ in your web browser.
  ![]({{site.baseurl}}/images/Wiring/dmap1.png)
3. The Windows Devices Portal Page should ask you for your credentials. The default username is `Administrator` and password is `p@ssw0rd`
  <img src="{{site.baseurl}}/images/Wiring/dmap2.png" width="50%" />
  Note, after entering the username and password, the Portal will ask you if you need to change the password. It’s always a good practice to change it.
4. Click on Devices in the navigation menu to open the Devices page
  <img src="{{site.baseurl}}/images/Wiring/dmap3.png" width="50%" />
5. The Devices page list the available Controller drivers. By default, the Inbox Driver is set to current.
6. Switch to the DMAP driver by choosing the Direct Memory Mapped Driver from the drop down menu and click the Update Driver Button
  <img src="{{site.baseurl}}/images/Wiring/dmap4.png" width="50%" />
7. Please wait until the page will lets you know then the driver installation is complete.
  <img src="{{site.baseurl}}/images/Wiring/dmap5.png" width="50%" />
8. If a reboot is needed, the page will let you know as well. You can reboot by using the Reboot button at the top of the page.
9. Now you’re ready to create and use applications that make use of the DMAP driver.

##Develop
Complete one of the many samples on the 'Develop' section of this section, or build your own project!

##Build and deploy

- **Optional** Use the Windows IoT Core Watcher application (or hook up your RPi to a monitor) to locate the IP address of your Raspberry Pi.
- In Visual Studio, make sure "Remote Machine" is selected as your deployment target

![Remote Machine]({{site.baseurl}}/images/rpi2_wiring/wiringapp_remotemachine.png)

- Open the solution properties found on the Debug context menu in Visual Studio

![Solution Properties]({{site.baseurl}}/images/rpi2_wiring/wiringapp_properties.png)

- Type the machine name (minwinpc by default) or the IP address if the remote machine into the 'machine name' field. If you have renamed your Raspberry pi to something else besides 'minwinpc' use that name in the login box instead.
- Change the 'Require authentication' field to 'No'

![Solution Properties]({{site.baseurl}}/images/rpi2_wiring/wiringapp_properties2.png)


- Press F5 to build and deploy your project.