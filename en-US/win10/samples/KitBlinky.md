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
  <li><a href="{{site.baseurl}}/{{page.lang}}/AdafruitMakerKit.htm">Adafruit Starter Pack for Windows 10 IoT Core on Raspberry Pi2</a></li>
  <li class="active">Blinky Sample</li>
</ol>

<h1 class="maker-kit">Lesson 1: Introduction to Starter Pack for Windows 10 IoT Core on Raspberry Pi2</h1>
{% include kit-steps.html device=page.deviceName %}
<h3 class="maker-kit">Deploy your first app.</h3>

{% include_relative BlinkyIntro.md %}

You'll need a few components:

* a LED (whichever color you like)

* a 560 &#x2126; resistor

* a breadboard and a couple of connector wires

![Electrical Components]({{site.baseurl}}/images/Blinky/components.png)

{% include_relative BlinkyRPIGpio.md %}

{% include_relative AppDeploymentCS.md %}

When everything is set up, you should be able to press F5 from Visual Studio to deploy the code.

Congratulations! You controlled one of the GPIO pins on your Windows IoT device.

{% include_relative BlinkyCodeCS.md%}


<h4 class="maker-kit"><a href="{{site.baseurl}}/{{page.lang}}/AdafruitMakerKit.htm#lessonTwo">Next: Lesson 2 - Four awesome projects to make with the Adafruit Essentials Maker Kit</a></h4>
