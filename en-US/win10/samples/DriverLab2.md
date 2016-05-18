---
layout: default
title: Driver Lab - Use Visual Studio to build a driver
permalink: /en-US/win10/samples/DriverLab2.htm
lang: en-US
---

# Building The Driver In Visual Studio

A Windows IoT Core driver is made up of one or more files.  Some of these files are simple text files to aid during installation, while others are binaries built during compilation of the source code.  For this lab, we are interested in files with the following extensions: **SYS** and **INF**. In this exercise, you will use Visual Studio to compile a driver for a specific platform.

## On the development computer

* From the Build menu, click `Build Solution(Ctrl+Shift+B)`. Make sure that you are building for `x86` if you are using a MinnowBoard Max, or `ARM` if you are using a Raspberry Pi 2 or 3.

    ![Driver Settings properties]({{site.baseurl}}/Resources/images/DriverLab/driver-build-option.png)

* You will now have a collection of files that make up the driver. Confirm you have both the **SYS** and **INF** files for your driver under the `DriverSamples\gpiokmdfdemo\Debug\gpiokmdfdemo\` folder.

        gpiokmdfdemo.inf
        gpiokmdfdemo.sys

* Next, generate the ACPI table that will be needed for the driver to work correctly on the Windows IoT Core device.

    We will use the Microsoft ACPI Source Language compiler (`asl.exe`) to build the ACPI table.  The ASL compiler is distributed with the WDK and can be found in `C:\Program Files (x86)\Windows Kits\10\Tools\x86\ACPIVerify\`

    The ASL compiler takes as input parameter a file with extension **ASL**.  You will find 2 **ASL** files in the asl directory under `DriverSamples\gpiokmdfdemo\asl\`

    Use `gpiokmdfdemo.asl` if you are deploying to a MinnowBoard Max.  Use `rpi2.asl` if you are deploying to a Raspberry Pi 2 or 3.

* Copy the **ASL** file to the `C:\Program Files (x86)\Windows Kits\10\Tools\x86\ACPIVerify\` directory

* Open up a command prompt as **Administrator** and navigate to the asl compiler directory:

        cd "C:\Program Files (x86)\Windows Kits\10\Tools\x86\ACPIVerify"

* If you are using MinnowBoard Max, type:

        asl.exe gpiokmdfdemo.asl

    If you are using Raspberry Pi 2 or 3, type:

        asl.exe rpi2.asl

* An `ACPITABL.dat` file will be generated in the same directory(`C:\Program Files (x86)\Windows Kits\10\Tools\x86\ACPIVerify\`). Verify that this file has been generated.

In the next section you will use these files (**ACPITABL.dat**, **gpiokmdfdemo.inf**, and **gpiokmdfdemo.sys**) to install the driver on the Windows IoT Core device.

## Next Step

[Deploy the driver and confirm successful installation]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab3.htm)
