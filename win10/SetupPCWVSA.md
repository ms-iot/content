---
layout: default
title: SetupPCWRA
permalink: /win10/SetupPCWVSA.htm
---

<div class="row">
  <h1>Get Started</h1>
  <div class="col-md-8">
    <p>Learn how to get your PC ready for developing IoT applications using Windows Remote Arduino.</p>
  </div>
  <ul class="nav nav-justified get-started-steps text-center">
      <li>
        <a href="{{site.baseurl}}/GetStarted.htm"><h3 class="inactive">1. Select Your Device</h3></a>
      </li>
      <li>
        <a href="{{site.baseurl}}/win10/SetupWVSA.htm"><h3 class="inactive">2. Set up your Device</h3></a>
      </li>
      <li>
        <a href="{{site.baseurl}}/win10/SetupPCWVSA.htm"><h3 class="active">3. Set up your PC for Windows Remote Arduino</h3></a>
        <span class="glyphicon glyphicon-time"> 30-45min</span>
      </li>
      <li>
        <a href="{{site.baseurl}}/win10/samples/BlinkyWVSA.htm"><h3 class="inactive">4. Develop</h3></a>
      </li>
  </ul>
</div>

<div class="col-md-12" markdown="1">

#Setup for Windows Virtual Shields for Arduino (Phone and PC)

##Hardware

###What you need
 1. Windows 10 phone ([Lumia 520](http://www.microsoft.com/en-us/mobile/phone/lumia520/), [Lumia 635](http://www.microsoft.com/en-us/mobile/phone/lumia635/))

###Set up your Windows 10 phone
 1. Many Windows Phone 8 users can get the "Windows Insider" application from the app store. This allows the user to opt into receiving Windows 10 Technical Previews as updates.
 2. Pair the Bluetooth device in the Bluetooth settings. (BlueSMiRF default pin code is 1234. NOTE: The red blinking light on the BlueSMiRF continues to blink red after a successful pairing. This is expected. It only turns green after a connecting with the application).

##Software

###What you need
 1. Visual Studio 2015 to sideload UWA (phone app) onto a developer-unlocked phone.
 (We are diligently working on getting the app into the app store in order to avoid side-loading)
 2. This [repository](https://github.com/ms-iot/virtual-shields-universal)

###Set up your Visual Studio 2015
 1. Get the Windows 10 Technical Preview tools, including Visual Studio 2015 from [dev.windows.com](https://dev.windows.com/en-us/windows-10-developer-preview-tools).
 2. Load the Shield.sln from this [repository](https://github.com/ms-iot/virtual-shields-universal).
 3. Ensure your phone is developer-unlocked. [This page](https://msdn.microsoft.com/en-us/library/windows/apps/dn614128.aspx) refers to Windows Phone 8.1, 8, and 7.1. However, the Registration steps are the same for Windows 10 phones.
 4. Deploy to your device.
 5. Run the Virtual Shields for Arduino application.
 6. In the app settings, find your previously paired Bluetooth device and Connect.

###Test your setup
 1. If you have already uploaded your sketch to your Arduino,
 2. and if you have already connected the Bluetooth device (green LED on for a BlueSMiRF),
 3. and are viewing the main screen on the Virtual Shields for Arduino app,
 4. you can press the Reset button on your Arduino.
 5. You should see a hello message on the Virtual Shields for Arduino phone app.

</div>
