---
layout: default
title: Using Lightning
permalink: /en-US/win10/Lightning.htm
lang: en-US
---
{:.page-title}
# Lightning

## Arduino Wiring for Windows 10 IoT Core Devices

To enable the use of existing Arduino Wiring sketches on Windows 10 IoT Core devices, a project template for Arduino Wiring can now be used in Visual Studio. These projects make use of a direct memory mapped driver that offers high performance.

To start building Arduino Wiring projects for Raspberry Pi2 and Minnowboard Max, please refer to the [Arduino Wiring project guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)<br/>

#### Note: Arduino Wiring is not supported on DragonBoard 410c.

## Windows 10 IoT Core UWP Lightning Provider

A set of Windows 10 IoT Core UWP providers for GPIO, SPI and I2C busses can be used to leverage the performance improvements of the direct memory mapped driver on Windows 10 IoT Core devices.

Only very few code changes are needed to enable using the library in existing apps. To start using the provider library in your apps, refer to the [Microsoft.IoT.Lightning.Providers library and sample code]({{site.baseurl}}/{{page.lang}}/win10/LightningProviders.htm).

## Windows 10 IoT Core Required
Arduino Wiring and Lightning providers support is currently included only in Windows 10 IoT Core.

You can download a Windows 10 IoT Core image from our [downloads page]({{site.baseurl}}/{{page.lang}}/Downloads.htm ). Click on "Download Windows 10 IoT Core" for your device type or "Get IoT Core Dashboard".

Both Raspberry Pi2 and Minnowboard Max are currently supported.
