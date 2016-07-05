---
layout: sample
title: Blinky Sample
permalink: /en-US/Samples/KitBlinky.htm
step: Samples/KitBlinky.htm
lang: en-US
deviceName: RPI2
kit: Starter Pack for Windows 10 IoT Core on Raspberry Pi2
---
<div class="row">
  <div class="col-xs-24">
    <ol class="breadcrumb">
      <li><a href="https://developer.microsoft.com/en-us/windows/iot">IoT Home</a></li>
      <li><a href="{{site.baseurl}}/{{page.lang}}/Docs/AdafruitMakerKit.htm">Overview of Starter Pack</a></li>
      <li class="active">Blinky Sample</li>
    </ol>
    <header class="page-title-header">
      <h1 class="page-title">Lesson 1: Introduction and Setup</h1>
    </header>
  </div>
</div>

{% include kit-steps.html device=page.deviceName %}

<hr/>

{: .thin-header}
## Blinky Sample

Let's create a simple Blinky app using an LED to test your setup.

### Load the project in Visual Studio

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/adafruitsample/archive/master.zip) and navigating to the `Blinky`.  The sample code is available in either C++ or C#, however the documentation here only details the C# variant. Make a copy of the folder on your disk and open the project from Visual Studio.

### Connect the LED to your Windows IoT device

You'll need a few components:

* a LED (any color you like)

* a 560 &#x2126; resistor ([Resistor Color Code](https://en.wikipedia.org/wiki/Electronic_color_code) Green, Blue, Brown, Gold)

* a breadboard
* 2 Male to Female connector wires

![Electrical Components]({{site.baseurl}}/Resources/images/AdafruitStarterPack/KitBlinkyMaterials.jpg){:.device-images}

{% include samples/BlinkyRPIGpio.md %}

<img class="device-images" src="{{site.baseurl}}/Resources/images/Blinky/breadboard_assembled_rpi2_kit.jpg" height="400">

<sub>*Image made with [Fritzing](http://fritzing.org/){:target="_blank"}*</sub>

### Deploy your app

1. With the application open in Visual Studio, set the architecture in the toolbar dropdown to `ARM`.

2. Next, in the Visual Studio toolbar, click on the `Local Machine` dropdown and select `Remote Machine`<br/>

    ![RemoteMachine Target]({{site.baseurl}}/Resources/images/AppDeployment/piKit-remote-machine-debugging.png)

3. At this point, Visual Studio will present the **Remote Connections** dialog. If you previously used [PowerShell]({{site.baseurl}}/{{page.lang}}/Samples/PowerShell.htm) to set a unique name for your device, you can enter it here (in this example, we're using **my-device**).
Otherwise, use the IP address of your Windows IoT Core device. After entering the device name/IP select `Universal` for Windows Authentication, then click **Select**.

    ![Remote Machine Debugging]({{site.baseurl}}/Resources/images/AppDeployment/cs-remote-connections.PNG)

4. You can verify or modify these values by navigating to the project properties (select **Properties** in the Solution Explorer) and choosing the `Debug` tab on the left:

    ![Project Properties Debug Tab]({{site.baseurl}}/Resources/images/AppDeployment/cs-debug-project-properties.PNG)

When everything is set up, you should be able to press F5 from Visual Studio to deploy the code.

Congratulations! You controlled one of the GPIO pins on your Windows IoT device.

{% include samples/BlinkyCodeCS.md%}

<div class="row lineTop">
  <div class="text-right col-xs-24">
    <h2 class="thin-header"><a href="{{site.baseurl}}/{{page.lang}}/Samples/WorldMapOfMakers.htm">Next: Lesson 2 - Starter Projects</a></h2>
  </div>
</div>
