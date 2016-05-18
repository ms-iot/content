{% include_relative BlinkyIntro.md %}

You'll need a few components:

* a LED (any color you like)

* a 220 &#x2126; resistor for the Raspberry Pi 2, Raspberry Pi 3 and the MinnowBoard Max or a 330 &#x2126; resistor for the DragonBoard

* a breadboard and a couple of connector wires

![Electrical Components]({{site.baseurl}}/Resources/images/Blinky/components.png)

{% include_relative BlinkyRPIGpio.md %}

<img src="{{site.baseurl}}/Resources/images/Blinky/breadboard_assembled_rpi2_kit.jpg" height="500">

<sub>*Image made with [Fritzing](http://fritzing.org/){:target="_blank"}*</sub>

{% include_relative BlinkyMBMGpio.md %}

{% include_relative BlinkyDBGpio.md %}

{% include_relative AppDeploymentCS.md %}

When everything is set up, you should be able to press F5 from Visual Studio.  If there are any missing packages that you did not install during setup, Visual Studio may prompt you to acquire those now.  The Blinky app will deploy and start on the Windows IoT device, and you should see the LED blink in sync with the simulation on the screen.

<img src="{{site.baseurl}}/Resources/images/Blinky/blinky-screenshot.png" height="400">

Congratulations! You controlled one of the GPIO pins on your Windows IoT device.

{% include_relative BlinkyCodeCS.md%}
