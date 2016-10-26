---
layout: default
title: Arduino Wiring for Windows 10 IoT Core
permalink: /en-US/Docs/ArduinoWiring.htm
lang: en-US
---
{:.page-title}
# Arduino Wiring for Windows 10 IoT Core Devices

To enable the development and reuse of the familiar <a href="https://www.arduino.cc/en/Reference/HomePage" target="_blank">Arduino Wiring</a> sketches on IoT Core devices, a Visual Studio project template for Arduino Wiring is provided as part of the [Windows IoT Core Project Templates extension](https://visualstudiogallery.msdn.microsoft.com/55b357e1-a533-43ad-82a5-a88ac4b01dec){:target="_blank"}.

The Arduino Wiring project template enables developers and makers to create, deploy and debug Arduino Wiring sketches on supported IoT Core devices using the same Arduino Wiring language semantics and constructs available on Arduino platforms. Not only this can help port existing Arduino sketches to IoT Core with very little cost, but Arduino Wiring sketches running on IoT Core are full Windows 10 apps that can make use of the Univeral Windows Platform (UWP) API. So, Arduino Wiring sketches have full access to APIs such as communication, data access, networking, graphics, among many others, which can be used to create end to end scenarios running on Windows 10 IoT Core devices. For more information on developing Universal Windows Platform (UWP) Apps, please refer to [Building Applications for Windows 10 IoT Core]({{site.baseurl}}/{{page.lang}}/Docs/BuildingAppsForIoTCore) as well as the [FAQ]({{site.baseurl}}/{{page.lang}}/Support/Faqs.htm#uwp) page.

Additionally, Arduino Wiring sketches make use of a direct memory mapped driver that offers high performance on supported devices. For more details on performance details, please refer to the [Windows IoT Lightning Performance Testing]({{site.baseurl}}/{{page.lang}}/Docs/LightningPerformance) report.

To start building Arduino Wiring projects for Raspberry Pi2, Pi3 or Minnowboard Max, please refer to the [Arduino Wiring project guide]({{site.baseurl}}/{{page.lang}}/Docs/ArduinoWiringProjectGuide)

#### Note: Arduino Wiring is *not* currently supported on DragonBoard 410c.
