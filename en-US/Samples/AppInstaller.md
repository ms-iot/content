---
layout: sample  
title: App installer
description: Learn how to install AppX's onto your IoT Core device
keyword: Windows 10 IoT Core, AppX, install
permalink: /en-US/Samples/AppInstaller.htm
lang: en-US
---  

# App installer

## Install the app using Windows Device Portal
___

To install your application on the device please do the following:

1. Open the Windows Device Portal for your IoT device. Instructions for the same are found on the [Windows Device Portal page](https://developer.microsoft.com/en-us/windows/iot/docs/deviceportal).

2. In the <strong>Apps</strong> menu add your Appx, Certificate(s) and Dependency Appx(s).
 ![Install App]({{site.baseurl}}/Resources/images/AppInstaller/InstallApp.png)

3. Deploy the app.

4. The application will now be visible on the list of applications on your device.
 ![App List]({{site.baseurl}}/Resources/images/DevicePortal/AppList.png)


## Install the app as a part of the IoT core image   
___

To add the Application as a part of your device image follow the instructions outlined in the [manufacturing guide](https://msdn.microsoft.com/en-us/windows/hardware/commercialize/manufacture/iot/deploy-your-app-with-a-standard-board).

A Sample Appx Package can be found in our [GitHub repo](https://github.com/ms-iot/iot-adk-addonkit/tree/develop/Source-arm/Packages/Appx.Main).
