{% include_relative BlinkyIntro.md %}

You'll need a few components:

* a LED (any color you like)

* a 220 &#x2126; resistor

* a breadboard and a couple of connector wires

![Electrical Components]({{site.baseurl}}/images/Blinky/components.png)

{% include_relative BlinkyRPIGpio.md %}

<img src="{{site.baseurl}}/images/Blinky/breadboard_assembled_rpi2.png" height="500">

<sub>*Image made with [Fritzing](http://fritzing.org/){:target="_blank"}*</sub>

{% include_relative BlinkyMBMGpio.md %}

{% include_relative AppDeploymentCS.md %}

When everything is set up, you should be able to press F5 from Visual Studio.  The Blinky app will deploy and start on the Windows IoT device, and you should see the LED blink in sync with the simulation on the screen.

<img src="{{site.baseurl}}/images/Blinky/blinky-screenshot.png" height="400">

Congratulations! You controlled one of the GPIO pins on your Windows IoT device.

{% include_relative BlinkyCodeCS.md%}
