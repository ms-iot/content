---
layout: docs
title: Install USB Peripheral Drivers
description: Learn how to create and install USB Peripheral drivers in Windows IoT Core
keyword: package, driver install
permalink: /en-US/Docs/PeripheralDrivers.htm
lang: en-US
---

# Install USB Peripheral Drivers
Follow the steps below to add 3rd party drivers (usb) for peripheral devices such as USB Mobile broadband modems, printers, scanners etc. 

## Step 1: Get Drivers from PC
---
The Step is to get the x86 version of the drivers from PC. For ARM, please contact the supplier of the peripheral to get the sys/inf files.

1. Connect the device to the windows PC
2. Install the driver for the device on the PC
3. Go to devices, select this device (listed in the usb) and right click to get the driver file name
4. Copy the driver sys file and the inf file.


## Step 2: Create a driver package
---


### Creating Driver package

The Driver package contains the references(InfSource)to the Inf file for the driver and also lists all the files referenced in the Inf file. You can author the driver .pkg.xml file manually or use [`inf2pkg.cmd` tool](https://github.com/ms-iot/iot-adk-addonkit/blob/master/Tools/inf2pkg.cmd) that generates package xml based on the input inf file.

[`inf2cab.cmd` tool](https://github.com/ms-iot/iot-adk-addonkit/blob/master/Tools/inf2cab.cmd) creates the package xml file and also builds the cab file directly by invoking `buildpkg.cmd` internally.

{% include note.html text="Windows IoT Core supports Universal Inf only" %}

See also

* [Sample Driver Package](https://github.com/ms-iot/iot-adk-addonkit/blob/develop/Source-arm/BSP/CustomRpi2/Packages/CustomRPi2.GPIO/CustomRPi2.GPIO.pkg.xml) 

## Step 3: Install on device
---

* Connect to the device ( [using SSH]({{site.baseurl}}/{{page.lang}}/Samples/SSH.htm) or [using Powershell]({{site.baseurl}}/{{page.lang}}/Samples/powershell.htm) )
* Copy the <filename>.cab file to the device to a directory say C:\OemInstall
* Initiate staging of the package using `applyupdate -stage C:\OemInstall\<filename>.cab`. Note that this step is be repeated for each package, when you have multiple packages to install.
* Commit the packages using `applyupdate -commit`.

The device will reboot into the update OS (showing gears) to install the packages and will reboot again to main OS. This process can take a few minutes.

