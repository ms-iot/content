---
layout: default
title: SetupPCWVSA
permalink: /en-US/win10/SetupPCWVSA.htm
lang: en-US
deviceName: WVSA
---

#Get Started

Learn how to get your PC ready for developing IoT applications using Windows Remote Arduino.

{% include steps.html device=page.deviceName %}

##Setup for Windows Virtual Shields for Arduino (Phone and PC)

##Hardware

###What you need
 1. Windows 10 phone ([Lumia 520](http://www.microsoft.com/en-us/mobile/phone/lumia520/){:target="_blank"}, [Lumia 635](http://www.microsoft.com/en-us/mobile/phone/lumia635/){:target="_blank"})

###Set up your Windows 10 phone
 1. Many Windows Phone 8 users can get the "Windows Insider" application from the app store. This allows the user to opt into receiving Windows 10 Technical Previews as updates.

##Software

###What you need
 1. Visual Studio 2015 to sideload UWA (phone app) onto a developer-unlocked phone.
 (We are diligently working on getting the app into the app store in order to avoid side-loading)
 2. This [repository](https://github.com/ms-iot/virtual-shields-universal){:target="_blank"}

###Set up your Visual Studio 2015
 1. Get the Windows 10 Technical Preview tools, including Visual Studio 2015 from [dev.windows.com](https://dev.windows.com/en-us/windows-10-developer-preview-tools){:target="_blank"}.
 2. Load the Shield.sln from this [repository](https://github.com/ms-iot/virtual-shields-universal){:target="_blank"}.
 3. Ensure your phone is developer-unlocked. [This page](https://msdn.microsoft.com/en-us/library/windows/apps/dn614128.aspx){:target="_blank"} refers to Windows Phone 8.1, 8, and 7.1. However, the Registration steps are the same for Windows 10 phones.
 4. Deploy to your device.
 5. Run the Virtual Shields for Arduino application.

 {% include nextsteps.html device=page.deviceName %}