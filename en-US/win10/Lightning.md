---
layout: default
title: Using Lightning
permalink: /en-US/win10/Lightning.htm
lang: en-US
---

##Arduino Wiring for IoT Device

To enable the use of existing Arduino Wiring sketches on IoT Core devices, a project template for Arduino Wiring can now be used in Visual Studio. These projects make use of a direct memory mapped driver that offers high performance.

To start building Arduino Wiring projects for MinnowboardMax and Raspberry Pi2, refer to the [Arduino Wiring project guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)<br/>

##UWP Lightning provdier

A set of UWP providers for GPIO, SPI and I2C busses can be used to leverage the performance improvements of the direct memory mapped driver on Windows IoT Core devices.

Only very few code changes are needed to enable using the library in existing apps. To start using the provider library in your apps, refer to the [Microsoft.IoT.Lightning.Providers library and sample code]({{site.baseurl}}/{{page.lang}}/win10/LightningProviders.htm). 

