---
layout: default
title: Driver Lab - Use Visual Studio to deploy a driver
permalink: /en-US/win10/samples/DriverLab5.htm
lang: en-US
---

##Sign Driver for Distribution

In this exercise, you will build, sign, and package your driver for distribution.
For this exercise you can use the gpiokmdfdemo sample driver found [here](https://github.com/ms-iot/samples/tree/develop/DriverSamples).
The steps are convered in the sections below:

* Configure your driver project in Visual Studio. 
* Install driver


###Configure Driver Project In Visual Studio
This section describes the steps required to configure your Visual Studio project so that it is signed with the correct certificate and packaged for installation on the target device.

* Make sure that your development environment has Visual Studio 15 and WDK installed.
* Configure signing options (During development) - During driver development use the default signing settings. Visual Studio will sign driver files with self-signed certificates. Drivers signed with self-signed certificates will run on IoTCore Production(Development) builds. Self-signed drivers will not run on IoTCore Retail images. 
* Configure signing options (For public release ) - Once you have completed developing the driver, sign the driver with a trusted certificates so that the driver runs on IoTCore Retail images. A list of trusted cross-signing certificates can be found [here](https://msdn.microsoft.com/en-us/library/windows/hardware/dn170454(v=vs.85).aspx) .
 Follow instructions from your CA to install the certificate on your development machine.
Configure the Visual Studio project with the cross signing and trusted certificate. Set Sign mode to ‘Production Sign’.
    ![Driver Settings properties]({{site.baseurl}}/images/DriverLab/D51.jpg)


###Configure project to generate CBS CAB package
* Add package Manifest file so that a CBS CAB package is generated in addition to the INF/Sys driver files.  The CBS CAB package is required for installing the driver in IoTCore images.
    ![Driver Settings properties]({{site.baseurl}}/images/DriverLab/D53.jpg)

* Add information to the package XML file by filling out the Owner, Platform, Component fields with information that describes your driver.  For public release, set the Release Type to “Production”.
    ![Driver Settings properties]({{site.baseurl}}/images/DriverLab/D54.jpg)

* Increment Driver version in the Project Properties  PackageGen  Version field.  The version needs to be incremented every time there is a change to the driver source code and an newer version of the driver is installed on the IoTCore device.
    ![Driver Settings properties]({{site.baseurl}}/images/DriverLab/D55.jpg)


* Set build to Release.  Build the project in VS.  You need to run Visual Studio in Administrator mode so that you can generate the CBS CAB.  The output will be a CAB file that can be used to install the driver on an IoTCore device.  The CAB file is located in the Release or Debug folder of your Visual Studio project.
    ![Driver Settings properties]({{site.baseurl}}/images/DriverLab/D56.jpg)

###Install Driver

To install a driver use the ApplyUpdate application included in the IoTCore image.  A driver can also be included in an image with the ICD tool. 

* Log into the IoTCore device using one of the available shells.
* Copy the driver CBS CAB file to the IoTCore device in any folder.
* From the command prompt run ApplyUpdate to stage and then commit the update.
* .\ApplyUpdate.exe -stage TestCompany.AComponent.Package.cab
* .\ApplyUpdate.exe -commit


* You can check the status of the driver by following the steps [here]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab3.htm).
* Please refer to the web site [here](https://msdn.microsoft.com/en-US/windows/hardware/dn913721(v=vs.8.5).aspx) for information on creating driver new driver and using Visual Studio to deploy the driver as discussed on this page.
