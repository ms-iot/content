{% include_relative BlinkyIntro.md %}

{% include_relative BlinkyRPIGpio.md %}

{% include_relative BlinkyMBMGpio.md %}

{% include_relative AppDeploymentCS.md %}

When everything is set up, you should be able to press F5 from Visual Studio.  The Blinky app will deploy and start on the Windows IoT device, and you should see the LED blink in sync with the simulation on the screen.

<img src="{{site.baseurl}}/images/Blinky/blinky-screenshot.png" height="400">

Congratulations! You controlled one of the GPIO pins on your Windows IoT device.

{% include_relative BlinkyCodeCS.md%}
