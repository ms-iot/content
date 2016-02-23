---
layout: default
title: Driver lab
permalink: /en-US/win10/samples/DriverLab.htm
lang: en-US
---

# Create A Universal Driver (UD) For Your Windows 10 IoT Core Device

{% include VerifiedVersion.md %}

If you are not very familiar with Windows universal drivers yet, we strongly encourage you to start by reading the following materials:

* [Building Universal Drivers - Channel9 Video](https://channel9.msdn.com/Blogs/WinHEC/Building-a-Universal-Driver)

* [Getting Started with Universal Windows Drivers - MSDN](https://msdn.microsoft.com/en-us/library/windows/hardware/dn941241(v=vs.85).aspx)

<br/>

## Did you set up your development environment yet?

* Instructions on how to set up your development environment with Visual Studio 2015 can be found [here]({{site.baseurl}}/{{page.lang}}/win10/SetupPCRPI.htm)

* Additionally, you will need to install the Windows Driver Kit (WDK) which you can download from [here](https://msdn.microsoft.com/en-us/windows/hardware/dn913721) 

<br/>

## Overview
We will now be walking you through the process of creating and installing a simple peripheral device driver that will run on any Windows 10 IoT Core device.  More specifically, we will build a Kernel Mode Device Framework (KMDF) driver using the Windows Driver Kit (WDK) and the Windows Driver Framework (WDF) APIs.  This driver will be specifically built to be a universal driver.

<br/>

## Description
The name of the driver in this sample is `gpiokmdfdemo`.  This driver will receive different IOCTL commands/messages from a simple user-mode Win32 console application called `BlinkyApp.exe`.  These IOCTL commands will tell the driver what specific GPIO pins to set high or low.  The sample driver (`gpiokmdfdemo`) will in turn communicate with the GpioClx (GPIO Class Extension) in Windows 10 IoT Core to accomplish these requests.  Take a look at the diagram below to familiarize yourself with the inner workings of this driver sample.

<br/>

![Driver Lab Overview]({{site.baseurl}}/Resources/images/DriverLab/drivers-overview.png)

<br/>

## Source Code And Binaries
You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\DriverSamples` where you will find 3 folders:

1. [`DriverSamples\BlinkyApp`](https://github.com/ms-iot/samples/tree/develop/DriverSamples/BlinkyApp){:target="_blank"} containing pre-built binaries of the console application for x86 and ARM architectures.gpiokmdfdemo

2. [`DriverSamples\consoleapp\BlinkyApp`](https://github.com/ms-iot/samples/tree/develop/DriverSamples/consoleapp/BlinkyApp){:target="_blank"} containing the source code for the console application.

3. [`DriverSamples\gpiokmdfdemo`](https://github.com/ms-iot/samples/tree/develop/DriverSamples/gpiokmdfdemo){:target="_blank"} containing the source code for the driver.

<br/>

## Note:
* Some of the instructions in this sample will require running different commands from a command prompt. Please make sure to use an elevated Windows command Prompt (cmd.exe) when running these commands.
* Additionally, some of the instructions will require running command from PowerShell.

<br/>

## Next Steps:

1. [Open the project for the sample driver]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab1.htm) --- In this section you will open the sample driver to see the basic structure of a driver.

2. [Use Visual Studio and the WDK to build a universal driver]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab2.htm) --- In this section you will use Visual Studio and the WDK to compile a universal driver for a specific device architecture.

3. [Deploy the sample driver and confirm successful  installation]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab3.htm) --- This section demonstrates a way to install the sample driver on a Windows IoT Core device.
