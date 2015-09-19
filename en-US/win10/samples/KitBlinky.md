---
layout: default
title: Blinky Sample
permalink: /en-US/win10/samples/KitBlinky.htm
step: win10/samples/KitBlinky.htm
lang: en-US
deviceName: RPI2
kit: Adafruit Starter Pack for Windows 10 IoT Core on Raspberry Pi2
---
<ol class="breadcrumb">
  <li><a href="{{site.baseurl}}/{{page.lang}}/AdafruitMakerKit.htm">Adafruit Starter Pack</a></li>
  <li class="active">Blinky Sample</li>
</ol>

<h1 class="maker-kit">Lesson 1: Introduction and Setup</h1>
{% include kit-steps.html device=page.deviceName %}
<h3 class="maker-kit">Deploy your first app.</h3>

{% include_relative BlinkyIntro.md %}

You'll need a few components:

* a LED (any color you like)

* a 560 &#x2126; resistor

* a breadboard and a couple of connector wires

![Electrical Components]({{site.baseurl}}/images/Blinky/components.png)

{% include_relative BlinkyRPIGpio.md %}

<img class="device-images" src="{{site.baseurl}}/images/Blinky/breadboard_assembled_rpi2_kit.jpg" height="400">

<sub>*Image made with [Fritzing](http://fritzing.org/){:target="_blank"}*</sub>

{% include_relative AppDeploymentCS.md %}

When everything is set up, you should be able to press F5 from Visual Studio to deploy the code.

Congratulations! You controlled one of the GPIO pins on your Windows IoT device.

{% include_relative BlinkyCodeCS.md%}

<div class="row lineTop">
  <div class="text-right col-sm-12">
    <h2 class="maker-kit"><a href="{{site.baseurl}}/{{page.lang}}/win10/samples/WorldMapOfMakers.htm">Next: Lesson 2 - Four awesome projects to make with the Adafruit Starter Pack</a></h2>
  </div>
</div>
