---
layout: docs
title: Install USB peripheral drivers
description: Learn how to create and install USB Peripheral drivers in Windows IoT Core
keyword: package, driver install
permalink: /en-US/Docs/PeripheralDrivers.htm
lang: en-US
---

# Install USB peripheral drivers
Follow the steps below to add 3rd party drivers (usb) for peripheral devices such as USB Mobile broadband modems, printers, scanners etc. 

## Step 1: Get Drivers from PC
___
The Step is to get the x86 version of the drivers from PC. For ARM, please contact the supplier of the peripheral to get the sys/inf files.


1. Connect the device to the windows PC

2. Install the driver for the device on the PC

3. Go to Device Manager, select this device (listed under Universal Serial Bus controllers) and right click and select Properties.

4. Go to Driver tab in the Properties window, and click on Driver Details. Note the sys files listed there.

5. Copy the sys files from `C:\Windows\system32` and also the related inf file from `C:\Windows\Inf`. You can find the inf file by searcing for the sys file reference in the `.inf` files. You may need to copy additional files listed in the Inf and these will be listed in the inf_filelist.txt file created when using  `inf2pkg.cmd` in the next step.


## Step 2: Create a driver package
___



The Driver package contains the references(InfSource)to the Inf file for the driver and also lists all the files referenced in the Inf file. You can author the driver .pkg.xml file manually or use [`inf2pkg.cmd` tool](https://github.com/ms-iot/iot-adk-addonkit/blob/master/Tools/inf2pkg.cmd) that generates package xml based on the input inf file. 

[`inf2cab.cmd` tool](https://github.com/ms-iot/iot-adk-addonkit/blob/master/Tools/inf2cab.cmd) creates the package xml file and also builds the cab file directly by invoking `buildpkg.cmd` internally.

{% include note.html text="Windows IoT Core supports Universal Inf only" %}

See also

* [Sample Driver Package](https://github.com/ms-iot/iot-adk-addonkit/blob/develop/Source-arm/BSP/CustomRpi2/Packages/CustomRPi2.GPIO/CustomRPi2.GPIO.pkg.xml) 

## Step 3: Install on device
___

* Connect to the device ( [using SSH]({{site.baseurl}}/{{page.lang}}/docs/ssh) or [using Powershell]({{site.baseurl}}/{{page.lang}}/docs/powershell) )
* Copy the <filename>.cab file to the device to a directory say C:\OemInstall
* Initiate staging of the package using `applyupdate -stage C:\OemInstall\<filename>.cab`. Note that this step is be repeated for each package, when you have multiple packages to install.
* Commit the packages using `applyupdate -commit`.

The device will reboot into the update OS (showing gears) to install the packages and will reboot again to main OS. This process can take a few minutes.

## Step 4: Check status of driver
___

* Launch the [Powershell]({{site.baseurl}}/{{page.lang}}/Docs/PowerShell)
* You can get the status of the installed drivers using the following Powershell commandlets

	* [Get-PnpDevice](https://technet.microsoft.com/en-us/library/mt130248.aspx)
	* [Get-PnpDeviceProperty](https://technet.microsoft.com/en-us/library/mt130249.aspx)
	
