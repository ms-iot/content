---
layout: default
title: Driver lab
permalink: /win10/samples/DriverLab.htm
---

<div class="container" markdown="1">
##Write a driver with Windows IoT Core

###Did you set up your environment?

We assume you already [set up your environment]({{site.baseurl}}/GetStarted.htm), have a working Visual Studio, and have a device running Windows IoT Core.

Remember, you can always [contact us]({{site.baseurl}}/Community.htm#contact) for help and suggestions!

###Lab objective
In this lab we will be walking through the process of creating and installing a simple peripheral device driver that will run on Windows IoT Core.  More specifically, we will be creating a Kernel Mode Device Framework driver (KMDF) using the Windows Driver Kit (WDK) and the Windows Driver Framework (WDF) APIs.

###Lab description
The name of the driver for this lab is `gpiokmdfdemo`, and it will receive different IOCTL commands from a simple user-mode Win32 console application called `BinkyApp.exe`.  These IOCTL commands will tell the driver what GPIO pins to set high or low.  The driver `gpiokmdfdemo` will in turn communicate with the GpioClx (GPIO Class Extension) in Windows IoT Core to accomplish these requests.  Take a look at the diagram below to familiarize yourself with the inner workings of this lab.

###Lab source code and binaries
The source code for the driver can be found here: `<Samples-Folder>\DriverSamples\gpiokmdfdemo`.
The source code for the console application can be found here: `<Samples-Folder>\DriverSamples\consoleapp\BlinkyApp`.
Additionally, we have also provided the pre-built binaries of the console application for x86 and ARM architectures.  These binaries can be found here: `<Samples-Folder>\DriverSamples\BlinkyApp`.

<br/>

![Driver Lab Overview]({{site.baseurl}}/images/DriverLab/drivers-overview.png)

The tutorials for this lab will be presented as hands-on tasks that have been grouped into the following sections:

* Open project for an existing driver
* Build a driver using Visual Studio
* Deploy driver manually to Windows IoT Core device

###Note
In these tutorials, you will be required to run various commands. Please use an elevated Windows Command Prompt (cmd.exe) to run these commands.


###Tutorials

1. [Open project for an existing driver]({{site.baseurl}}/win10/samples/DriverLab1.htm) --- In this exercise, you will open an existing driver to see the basic structure of a driver.

2. [Use Visual Studio to build a driver]({{site.baseurl}}/win10/samples/DriverLab2.htm) --- In this exercise, you will use Visual Studio to compile a driver for a specific platform.

3. [Deploy the driver and confirm the installation]({{site.baseurl}}/win10/samples/DriverLab3.htm) --- This exercise demonstrates how to manually copy and install the driver to a Windows IoT Core device.

</div>
