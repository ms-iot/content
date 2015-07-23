---
layout: default
title: Air Hockey App
permalink: /en-US/win10/samples/AirHockeyApp.htm
lang: en-US
---

#Industrial Automation - Air Hockey App

##What is Industrial Automation?

Industrial automation involves the automation of manufacturing processes in industrial environments, which includes areas such as food processing, automotive manufacturing, and other manufacturing applications. Two key components of industrial automation are described below.

1. Programmable Logic Controller

An important component of industrial automation is the programmable logic controller (PLC). PLC devices interface with  equipment and sensors in order to implement process and real time control, which allows control of actuators such as servos and stepper motors. 

2. Machine Vision

A machine vision setup typically includes a camera paired with a computer system which runs the machine vision algorithms. These setups may also be paired with the aforementioned PLCs as part of an end-to-end automation solution.

##Goal

To demonstrate the utility of Windows 10 IoT Core in industrial automation, we automate a game of air hockey by building a robot arm which can compete against a human player.

To accomplish this, we modified an off-the-shelf air hockey table and install a custom designed robotic arm for the purpose. The robot itself acts as a special purpose system consisting of a camera which tracks the air hockey puck, a motor operated "arm" and a mallet device used to strike the puckk. The camera and actuators are connected to a MinnowBoard Max running Windows 10 IoT Core, which processes the data in near real time to compute actions for the robot during the game.

##App Requirements

* MinnowBoard Max running Windows 10 IoT Core build 10240+ (price for MBM?)
* HDMI display
* USB mouse (if no touch screen is available)
* Hockey puck

##Building the Air Hockey Table

To build the air hockey table we used the following hardware:

(TBD by Daniel or Jonathan - for each item listed please include cost/price if known)

##Mechanical Assembly

(TBD)

##Electrical Assembly 

(TBD)

##Putting it all together

Please refer to the [documentation page]({{site.baseurl}}/en-US/win10/samples/AirHockeyApp_Documentation.htm) for instructions on getting the code, building and deploying the app.

(TBD - List steps required to physically ready the robot/table for game play)

###Demo Video

(link to embedded video)

##Additional links:

* The Air Hockey App source code can be found [here](https://github.com/ms-iot/samples/tree/develop/AirHockeyApp)
* Documentation for the code can be found at [this]({{site.baseurl}}/en-US/win10/samples/AirHockeyApp_Documentation.htm) link


