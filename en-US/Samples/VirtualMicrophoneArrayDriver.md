---
layout: sample
title: Virtual Audio Microphone Array
permalink: /en-US/Samples/VirtualMicrophoneArrayDriver.htm
lang: en-US
---

# Create A Virtual Audio Microphone Array For Your Windows 10 IoT Core Device



If you are not very familiar with Windows universal drivers yet, we strongly encourage you to start by reading the following materials:

* [Building Universal Drivers - Channel9 Video](https://channel9.msdn.com/Blogs/WinHEC/Building-a-Universal-Driver)

* [Getting Started with Universal Windows Drivers - MSDN](https://msdn.microsoft.com/en-us/library/windows/hardware/dn941241(v=vs.85).aspx)

<br/>

## Did you set up your development environment yet?

* Instructions on how to set up your development environment with Visual Studio 2015 can be found [here]({{site.baseurl}}/{{page.lang}}/GetStarted)

* Additionally, you will need to install the Windows Driver Kit (WDK) which you can download from [here](https://developer.microsoft.com/en-us/windows/hardware/windows-driver-kit) 

<br/>

## Overview
We will now be walking you through the process of creating and installing a device driver that will run on any Windows 10 IoT Core device.  This driver will be specifically built to be a universal driver.

<br/>

## Description
The name of the driver in this sample is `virtualaudiomicarray`.  

<br/>

## Source Code And Binaries
You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\VirtualMicrophoneArrayDriver` where you will find the project solution file.

<br/>

