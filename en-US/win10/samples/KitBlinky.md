---
layout: default
title: Blinky Sample
permalink: /en-US/win10/samples/KitBlinky.htm
step: win10/samples/KitBlinky.htm
lang: en-US
deviceName: RPI2
kit: Adafruit Essential Maker Kit
---
<ol class="breadcrumb">
  <li><a href="{{site.baseurl}}/{{page.lang}}/AdafruitMakerKit.htm">Adafruit Essential Maker Kit</a></li>
  <li class="active">Blinky Sample</li>
</ol>

<h1 class="maker-kit">Lesson 1: Get ready to make</h1>
{% include kit-steps.html device=page.deviceName %}
<h3 class="maker-kit">Deploy your first app.</h3>

{% include_relative BlinkyIntro.md %}

{% include_relative BlinkyRPIGpio.md %}

{% include_relative AppDeploymentCS.md %}

When everything is set up, you should be able to press F5 from Visual Studio.  The Blinky app will deploy and start on the Windows IoT device, and you should see the LED blink in sync with the simulation on the screen.

<img src="{{site.baseurl}}/images/Blinky/blinky-screenshot.png" height="400">

Congratulations! You controlled one of the GPIO pins on your Windows IoT device.

{% include_relative BlinkyCodeCS.md%}


<h4 class="maker-kit"><a href="{{site.baseurl}}/{{page.lang}}/AdafruitMakerKit.htm#lessonTwo">Next: Lesson 2 - Four awesome projects to make with the Adafruit Essentials Maker Kit</a></h4>
