---
layout: default
title: Driver lab
permalink: /en-US/win10/samples/DriverLab.htm
lang: en-US
---

##Write a driver with Windows IoT Core

###Did you set up your environment?

We assume you already [set up your environment]({{site.baseurl}}/{{page.lang}}/GetStarted.htm), have a working Visual Studio, and have a device running Windows IoT Core.

Remember, you can always [contact us]({{site.baseurl}}/{{page.lang}}/Community.htm#contact) for help and suggestions!

###Lab objective
In this lab we will be walking through the process of creating and installing a simple peripheral device driver that will run on Windows IoT Core.  More specifically, we will be creating a Kernel Mode Device Framework driver (KMDF) using the Windows Driver Kit (WDK) and the Windows Driver Framework (WDF) APIs.

###Lab description
The name of the driver for this lab is `gpiokmdfdemo`, and it will receive different IOCTL commands from a simple user-mode Win32 console application called `BinkyApp.exe`.  These IOCTL commands will tell the driver what GPIO pins to set high or low.  The driver `gpiokmdfdemo` will in turn communicate with the GpioClx (GPIO Class Extension) in Windows IoT Core to accomplish these requests.  Take a look at the diagram below to familiarize yourself with the inner workings of this lab.

###Lab source code and binaries
You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\DriverSamples` where you will find 3 folders:

1. [`DriverSamples\BlinkyApp`](https://github.com/ms-iot/samples/tree/develop/DriverSamples/BlinkyApp){:target="_blank"} containing pre-built binaries of the console application for x86 and ARM architectures.gpiokmdfdemo

2. [`DriverSamples\consoleapp\BlinkyApp`](https://github.com/ms-iot/samples/tree/develop/DriverSamples/consoleapp/BlinkyApp){:target="_blank"} containing the source code for the console application.

3. [`DriverSamples\gpiokmdfdemo`](https://github.com/ms-iot/samples/tree/develop/DriverSamples/gpiokmdfdemo){:target="_blank"} containing the source code for the driver.

<br/>

![Driver Lab Overview]({{site.baseurl}}/images/DriverLab/drivers-overview.png)

The tutorials for this lab will be presented as hands-on tasks that have been grouped into the following sections:

* Open project for an existing driver
* Build a driver using Visual Studio
* Deploy driver manually to Windows IoT Core device

###Note
In these tutorials you will be required to run various commands. Please use an elevated Windows Command Prompt (cmd.exe) to run these commands.
You will need to install the Windows Driver Kit (WDK) for Windows 10.  You can download the WDK from [here](https://msdn.microsoft.com/en-us/windows/hardware/dn913721(v=vs8.5).aspx).


###Tutorials

1. [Open project for an existing driver]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab1.htm) --- In this exercise, you will open an existing driver to see the basic structure of a driver.

2. [Use Visual Studio to build a driver]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab2.htm) --- In this exercise, you will use Visual Studio to compile a driver for a specific platform.

3. [Deploy the driver and confirm the installation]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab3.htm) --- This exercise demonstrates how to manually copy and install the driver to a Windows IoT Core device.
