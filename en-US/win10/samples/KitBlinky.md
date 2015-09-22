---
layout: default
title: Blinky Sample
permalink: /en-US/win10/samples/KitBlinky.htm
step: win10/samples/KitBlinky.htm
lang: en-US
deviceName: RPI2
kit: Starter Pack for Windows 10 IoT Core on Raspberry Pi2
---
<ol class="breadcrumb">
  <li><a href="{{site.baseurl}}/{{page.lang}}/AdafruitMakerKit.htm">Overview of Starter Pack</a></li>
  <li class="active">Blinky Sample</li>
</ol>

<h1 class="maker-kit">Lesson 1: Introduction and Setup</h1>
{% include kit-steps.html device=page.deviceName %}

<hr/>

#Blinky Sample

Let's create a simple Blinky app using an LED to test your setup.

###Load the project in Visual Studio

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\Blinky`.  The sample code is available in either C++ or C#, however the documentation here only details the C# variant. Make a copy of the folder on your disk and open the project from Visual Studio.

###Connect the LED to your Windows IoT device

You'll need a few components:

* a LED (any color you like)

* a 560 &#x2126; resistor

* a breadboard and a couple of connector wires

![Electrical Components]({{site.baseurl}}/images/AdafruitStarterPack/KitBlinkyMaterials.jpg){:.device-images}

{% include_relative BlinkyRPIGpio.md %}

<img class="device-images" src="{{site.baseurl}}/images/Blinky/breadboard_assembled_rpi2_kit.jpg" height="400">

<sub>*Image made with [Fritzing](http://fritzing.org/){:target="_blank"}*</sub>

{% include_relative AppDeploymentCS.md %}

When everything is set up, you should be able to press F5 from Visual Studio to deploy the code.

Congratulations! You controlled one of the GPIO pins on your Windows IoT device.

{% include_relative BlinkyCodeCS.md%}

<div class="row lineTop">
  <div class="text-right col-sm-12">
    <h2 class="maker-kit"><a href="{{site.baseurl}}/{{page.lang}}/win10/samples/WorldMapOfMakers.htm">Next: Lesson 2 - Starter Projects</a></h2>
  </div>
</div>
