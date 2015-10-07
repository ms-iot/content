---
layout: default
title: Project Setup
permalink: /en-US/win10/WiringProjectGuide.htm
lang: en-US
---


##Create a new Project
Open Visual Studio. Select File -> New Project -> Visual C++ -> Windows -> Windows IoT Core -> Arduino Wiring Application for Windows IoT Core
![AppCreate]({{site.baseurl}}/images/rpi2_wiring/appcreate.png)

##Device configuration

We will want to open the Windows Device Portal

------webb instructions here------------

You may be prompted for credentials. Enter:

~~~
  Username: minwinpc\Administrator
  Password: p@ssw0rd
~~~


------go to device page, change drop down from "Inbox Driver" to "DMAP"-----



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