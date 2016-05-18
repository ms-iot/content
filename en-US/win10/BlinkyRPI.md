<div class="row">
    <div class="col-md-6 col-sm-12">
        <p>In this tutorial, we'll create a simple LED blinking app and connect a LED to your Windows 10 IoT Core device.</p>
        <p>This is a headed sample.  To better understand what headed mode is and how to configure your device to be headed, follow the instructions <a href="{{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm"> here.</a></p>
        <p>Also, be aware that the GPIO APIs are only available on Windows 10 IoT Core, so this sample cannot run on your desktop.</p>
      <h3>Load the project in Visual Studio</h3>
        <p>You can find the source code for this sample by downloading a zip of all of our samples <a href="https://github.com/ms-iot/samples/archive/develop.zip" target="_blank">here</a> and navigating to the <code>samples-develop\Blinky</code>.  The sample code is available in either C++ or C#, however the documentation here only details the C# variant. Make a copy of the folder on your disk and open the project from Visual Studio.</p>
      <h3>Connect the LED to your Windows IoT device</h3>
        <p>You'll need a few components:</p>
        <p>A 220 &#x2126; resistor</p>
        <p>A breadboard and a couple of connector wires</p>
        <p>An LED (any color you like)</p>
    </div>
    <div class="col-md-6 col-sm-12">
      <img alt="components needed for the blinky sample" src="{{site.baseurl}}/Resources/images/Blinky/components.png">
    </div>
  </div>
    {% include_relative BlinkyRPIGpio.md %}
    {% include_relative AppDeploymentCS.md %}
  <div class="row">
    <div class="col-md-6 col-sm-12">
      <p>When everything is set up, you should be able to press F5 from Visual Studio.  If there are any missing packages that you did not install during setup, Visual Studio may prompt you to acquire those now.  The Blinky app will deploy and start on the Windows IoT device, and you should see the LED blink in sync with the simulation on the screen.</p>
    </div>
    <div class="col-md-6 col-sm-12">
      <img alt="pinout diagram of raspberry pi 2 or 3" src="{{site.baseurl}}/Resources/images/Blinky/blinky-screenshot.png" height="400">
    </div>
  </div>
  <p>Congratulations! You controlled one of the GPIO pins on your Windows IoT device.</p>

  {% include_relative BlinkyCodeCS.md%}