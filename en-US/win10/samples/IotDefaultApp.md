---
layout: default
title: IoT Core Default App
permalink: /en-US/win10/samples/IoTDefaultApp.htm
lang: en-US
---

# IoT Core Default App Sample

We'll create a default app to demonstrate how to create a simple startup app that has some basic device management for your Windows 10 IoT Core device.

This is a headed sample.  To better understand what headed mode is and how to configure your device to be headed, follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm).

### IoT Core Default App contents

The IoT Core Default App provides a good example of creating a user experience for IoT Core devices.

#### Set up

Upon first boot, you will be taken through a quick set up experience. Set the language and connect to Wi-Fi. If you don't have a USB Wi-Fi adapter, you can always connect later. 

![DefaultApp setup on Windows 10 IoT Core]({{site.baseurl}}/Resources/images/iotcoredefaultapp/defaultapp_oobe.png)

#### Device Info

This is the main page for you to get started. The default app is intended to help you link your PC to your device. All of the development, debugging and design happens on your PC! 

![DefaultApp on Windows 10 IoT Core]({{site.baseurl}}/Resources/images/iotcoredefaultapp/DefaultAppRpi2.png)

Use the device name and IP address listed here when connecting to you device.

#### Tutorials

A quick set of instructions on how to get your board connected to your PC. If you're on the web, you can find the same set of instructions [here](http://ms-iot.github.io/content/en-US/win10/StartCoding.htm)

![DefaultApp tutorials on Windows 10 IoT Core]({{site.baseurl}}/Resources/images/iotcoredefaultapp/defaultapp_tutorial.png)

#### Settings

From settings, you can reconfigure your language, connect via Wi-Fi and connect to a Bluetooth device.

![DefaultApp settings on Windows 10 IoT Core]({{site.baseurl}}/Resources/images/iotcoredefaultapp/defaultapp_settings.png)

### Load the project in Visual Studio

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\IotCoreDefaultApp`.  The sample code is C#. Make a copy of the folder on your disk and open the project from Visual Studio.

{% include_relative AppDeploymentCS.md %}

When everything is set up, you should be able to press F5 from Visual Studio.  The IoT Core Default App will deploy and start on the Windows IoT device.  

Note that this is the same code that is shipped as the startup app in Windows IoT Core images by default.

{% include_relative IotStartupContent.md %}
