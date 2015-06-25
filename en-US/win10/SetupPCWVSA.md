---
layout: default
title: SetupPCWVSA
permalink: /en-US/win10/SetupPCWVSA.htm
lang: en-US
---

#Get Started

Learn how to get your PC ready for developing IoT applications using Windows Remote Arduino.

{% include steps.html device="WVSA" %}

##Setup for Windows Virtual Shields for Arduino (Phone and PC)

##Hardware

###What you need
 1. Windows 10 phone ([Lumia 520](http://www.microsoft.com/en-us/mobile/phone/lumia520/){:target="_blank"}, [Lumia 635](http://www.microsoft.com/en-us/mobile/phone/lumia635/){:target="_blank"})

###Set up your Windows 10 phone
 1. Many Windows Phone 8 users can get the "Windows Insider" application from the app store. This allows the user to opt into receiving Windows 10 Technical Previews as updates.
 2. Pair the Bluetooth device in the Bluetooth settings. (BlueSMiRF default pin code is 1234. NOTE: The red blinking light on the BlueSMiRF continues to blink red after a successful pairing. This is expected. It only turns green after a connecting with the application).

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
 6. In the app settings, find your previously paired Bluetooth device and Connect.

###Test your setup
 1. If you have already uploaded your sketch to your Arduino,
 2. and if you have already connected the Bluetooth device (green LED on for a BlueSMiRF),
 3. and are viewing the main screen on the Virtual Shields for Arduino app,
 4. you can press the Reset button on your Arduino.
 5. You should see a hello message on the Virtual Shields for Arduino phone app.
