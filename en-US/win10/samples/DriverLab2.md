---
layout: default
title: Driver Lab - Use Visual Studio to build a driver
permalink: /en-US/win10/samples/DriverLab2.htm
lang: en-US
---

##Use Visual Studio to build a driver

A Windows IoT Core driver is made up of one or more files.  Some of these files are simple text files to aid during installation, while others are binaries built during compilation of the source code.  For this lab, we are interested in files with the following extensions: **SYS** and **INF**. In this exercise, you will use Visual Studio to compile a driver for a specific platform.

###On the development computer

* Right-click the Project node in the Solutions Explorer and select `Properties` to configure the driver properties

    ![Driver solution properties]({{site.baseurl}}/images/DriverLab/sln-properties.png)

* Expand the `Driver Signing` node and click on `General`
* Click on `Test Certificate`
* Click on the drop-down arrow to expand the options
* Select `Select from Store` and choose the `Windows Phone OEM Test Cert 2013 (TEST ONLY)` certificate

    ![Driver Settings properties]({{site.baseurl}}/images/DriverLab/driver-signing-properties.png)


	* If you do not see the `Windows Phone OEM Test Cert 2013 (TEST ONLY)` certificate as indicated above, you may not have the certificate installed on your development machine.  Please follow steps 1 through 6 as indicated below to install the certificate:

		1.  **Close** Visual Studio

		2.  Open up a command prompt as **Administrator** on your development machine

		3.  Navigate to the following directory

				cd "C:\Program Files (x86)\Windows Kits\10\Tools\bin\i386"

		4.  Set the following environment variable:

				set WPDKCONTENTROOT=C:\Program Files (x86)\Windows Kits\10

		5.  Run the following command:

				installoemcerts.cmd

		6.  Open the Visual Studio solution as indicated in the previous section, and try adding the test certificate again.

* From the Build menu, click `Build Solution(Ctrl+Shift+B)`. Make sure that you are building for `x86` if you are using a MinnowBoard Max, or `ARM` if you are using a Raspberry Pi 2.

    ![Driver Settings properties]({{site.baseurl}}/images/DriverLab/driver-build-option.png)

* You will now have a collection of files that make up the driver. Confirm you have both the **SYS** and **INF** files for your driver under the `<Samples-Folder>\DriverSamples\gpiokmdfdemo\Debug\gpiokmdfdemo\` folder.

        gpiokmdfdemo.inf
        gpiokmdfdemo.sys

* Next, generate the ACPI table that will be needed for the driver to work correctly on the Windows IoT Core device.

    We will use the Microsoft ACPI Source Language compiler (`asl.exe`) to build the ACPI table.  The ASL compiler is distributed with the WDK and can be found in `C:\Program Files (x86)\Windows Kits\10\Tools\x86\ACPIVerify\`

    The ASL compiler takes as input parameter a file with extension **ASL**.  You will find 2 **ASL** files in the asl directory under `<Samples-Folder>\DriverSamples\gpiokmdfdemo\asl\`

    Use `gpiokmdfdemo.asl` if you are deploying to a MinnowBoard Max.  Use `rpi2.asl` if you are deploying to a Raspberry Pi 2.

* Copy the **ASL** file to the `C:\Program Files (x86)\Windows Kits\10\Tools\x86\ACPIVerify\` directory

* Open up a command prompt as **Administrator** and navigate to the asl compiler directory:

        cd "C:\Program Files (x86)\Windows Kits\10\Tools\x86\ACPIVerify"

* If you are using MinnowBoard Max, type:

        asl.exe gpiokmdfdemo.asl

    If you are using Raspberry Pi 2, type:

        asl.exe rpi2.asl

* An `ACPITABL.dat` file will be generated in the same directory(`C:\Program Files (x86)\Windows Kits\10\Tools\x86\ACPIVerify\`). Verify that this file has been generated.

In the next section you will use these files (**ACPITABL.dat**, **gpiokmdfdemo.inf**, and **gpiokmdfdemo.sys**) to install the driver on the Windows IoT Core device.

###Next Step

[Deploy the driver and confirm the installation]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab3.htm)
