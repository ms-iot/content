---
layout: default
title: Driver Lab - Open project for an existing driver
permalink: /en-US/win10/samples/DriverLab1.htm
lang: en-US
---

##Open project for an existing driver

###On the development computer

* You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\DriverSamples`.
* In Visual Studio, on the File menu, choose Open \| Project.
* In the Open Project dialog box, navigate to the folder where the sample driver is located and highlight the file with the SLN extension, and select Open.
    * In the DriverSamples folder, you will find the VS solution at `DriverSamples\gpiokmdfdemo\gpiokmdfdemo.sln`.
    * `gpiokmdfdemo` will build a GPIO Kernel Mode Peripheral Device Driver.
* In Visual Studio, switch to the Solution Explorer. Expand the Header files and Source files nodes and examine the contents of the generated files. You should find a driver project that implements the skeleton code required by most drivers.


###Next Step
[Use Visual Studio to build the driver]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab2.htm)
