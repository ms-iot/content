---
layout: default
title: Blinky Sample
permalink: /en-US/win10/samples/Blinky.htm
lang: en-US
---

{: .thin-header}
## Blinky Sample

We'll create a simple LED blinking app and connect a LED to your Windows 10 IoT Core device.

This is a headed sample.  To better understand what headed mode is and how to configure your device to be headed, follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm).

Also, be aware that the GPIO APIs are only available on Windows 10 IoT Core, so this sample cannot run on your desktop.

### Load the project in Visual Studio

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\Blinky`.  The sample code is available in either C++ or C#, however the documentation here only details the C# variant. Make a copy of the folder on your disk and open the project from Visual Studio.

### Connect the LED to your Windows IoT device


You'll need a few components:

* a LED (any color you like)

* a 220 &#x2126; resistor for the Raspberry Pi 2, Raspberry Pi 3 and the MinnowBoard Max or a 330 &#x2126; resistor for the DragonBoard

* a breadboard and a couple of connector wires

![Electrical Components]({{site.baseurl}}/Resources/images/Blinky/components.png)

### For Raspberry Pi 2 or 3 (RPi2 or RPi3)

1. Connect the shorter leg of the LED to GPIO 5 (pin 29 on the expansion header) on the RPi2 or RPi3.
2. Connect the longer leg of the LED to the resistor.
3. Connect the other end of the resistor to one of the 3.3V pins on the RPi2 or RPi3.
4. Note that the polarity of the LED is important. (This configuration is commonly known as Active Low)

And here is the pinout of the RPi2 and RPi3:

<img src="{{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png" style="max-height:400px;">

Here is an example of what your breadboard might look like with the circuit assembled:

<img src="{{site.baseurl}}/Resources/images/Blinky/breadboard_assembled_rpi2_kit.jpg" style="max-height:500px;">

<sub>*Image made with [Fritzing](http://fritzing.org/){:target="_blank"}*</sub>


### For MinnowBoard Max (MBM)

We will connect the one end of the LED to GPIO 5 (pin 18 on the JP1 expansion header) on the MBM, the other end to the resistor, and the resistor to the 3.3 volt power supply from the MBM.
Note that the polarity of the LED is important. Make sure the shorter leg (-) is connected to GPIO 5 and the longer leg (+) to the resistor or it wont light up.

And here is the JP1 connector on the MBM:

<img src="{{site.baseurl}}/Resources/images/PinMappings/MBM_Pinout.png" style="max-height:400px;">

Here is an example of what your breadboard might look like with the circuit assembled:

<img src="{{site.baseurl}}/Resources/images/Blinky/breadboard_assembled.png" style="max-height:500px;">

<sub>*Image made with [Fritzing](http://fritzing.org/){:target="_blank"}*</sub>

### For DragonBoard 410c (DB)

For reference, the functionality of the low-speed expansion connector is outlined in the following diagram

<img src="{{site.baseurl}}/Resources/images/PinMappings/DB_Pinout.png" style="max-height:500px;">

Perform the following steps to create the circuit:

1. Connect the shorter leg of the LED to GPIO 12 (pin 24 on the expansion header) on the DB.
2. Connect the longer leg of the LED to the resistor.
* Note that the polarity of the LED is important (this configuration is commonly known as Active Low).
3. Connect the other end of the resistor to 1.8V (pin 35 on the expansion header).

Here is an illustration of what your breadboard might look like with the circuit assembled:

<img src="{{site.baseurl}}/Resources/images/Blinky/breadboard_assembled_db_kit.png" style="max-height:500px;">

<sub>Image made with [Fritzing](http://fritzing.org/){:target="_blank"}</sub>

Finally, the LED_PIN variable of _MainPage.xaml.cs_ file of the sample code will need the following modification:

~~~
private const int LED_PIN = 12;
~~~
{: .language-c#}

### Deploy your app

1. With the application open in Visual Studio, set the architecture in the toolbar dropdown. If you're building for MinnowBoard Max, select `x86`.  If you're building for Raspberry Pi 2 or 3 or the DragonBoard, select `ARM`.

2. Next, in the Visual Studio toolbar, click on the `Local Machine` dropdown and select `Remote Machine`<br/>

    ![RemoteMachine Target]({{site.baseurl}}/Resources/images/AppDeployment/cs-remote-machine-debugging.png)

3. At this point, Visual Studio will present the **Remote Connections** dialog. If you previously used [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) to set a unique name for your device, you can enter it here (in this example, we're using **my-device**).
Otherwise, use the IP address of your Windows IoT Core device. After entering the device name/IP select `Universal` for Windows Authentication, then click **Select**.

    ![Remote Machine Debugging]({{site.baseurl}}/Resources/images/AppDeployment/cs-remote-connections.PNG)

4. You can verify or modify these values by navigating to the project properties (select **Properties** in the Solution Explorer) and choosing the `Debug` tab on the left:

    ![Project Properties Debug Tab]({{site.baseurl}}/Resources/images/AppDeployment/cs-debug-project-properties.PNG)

When everything is set up, you should be able to press F5 from Visual Studio.  If there are any missing packages that you did not install during setup, Visual Studio may prompt you to acquire those now.  The Blinky app will deploy and start on the Windows IoT device, and you should see the LED blink in sync with the simulation on the screen.

<img src="{{site.baseurl}}/Resources/images/Blinky/blinky-screenshot.png" height="400">

Congratulations! You controlled one of the GPIO pins on your Windows IoT device.

### Let's look at the code
The code for this sample is pretty simple. We use a timer, and each time the 'Tick' event is called, we flip the state of the LED.


### Timer code
Here is how you set up the timer in C#:
{% highlight C# %}
public MainPage()
{
    // ...

    timer = new DispatcherTimer();
    timer.Interval = TimeSpan.FromMilliseconds(500);
    timer.Tick += Timer_Tick;
    InitGPIO();
    if (pin != null)
    {
        timer.Start();
    }

    // ...
}

private void Timer_Tick(object sender, object e)
{
    if (pinValue == GpioPinValue.High)
    {
        pinValue = GpioPinValue.Low;
        pin.Write(pinValue);
        LED.Fill = redBrush;
    }
    else
    {
        pinValue = GpioPinValue.High;
        pin.Write(pinValue);
        LED.Fill = grayBrush;
    }
}
{% endhighlight %}

### Initialize the GPIO pin
To drive the GPIO pin, first we need to initialize it. Here is the C# code (notice how we leverage the new WinRT classes in the Windows.Devices.Gpio namespace):

{% highlight C# %}
using Windows.Devices.Gpio;

private void InitGPIO()
{
    var gpio = GpioController.GetDefault();

    // Show an error if there is no GPIO controller
    if (gpio == null)
    {
        pin = null;
        GpioStatus.Text = "There is no GPIO controller on this device.";
        return;
    }

    pin = gpio.OpenPin(LED_PIN);
    pinValue = GpioPinValue.High;
    pin.Write(pinValue);
    pin.SetDriveMode(GpioPinDriveMode.Output);

    GpioStatus.Text = "GPIO pin initialized correctly.";

}
{% endhighlight %}

Let's break this down a little:

* First, we use `GpioController.GetDefault()` to get the GPIO controller.

* If the device does not have a GPIO controller, this function will return `null`.

* Then we attempt to open the pin by calling `GpioController.OpenPin()` with the `LED_PIN` value.

* Once we have the `pin`, we set it to be off (High) by default using the `GpioPin.Write()` function.

* We also set the `pin` to run in output mode using the `GpioPin.SetDriveMode()` function.


### Modify the state of the GPIO pin
Once we have access to the `GpioOutputPin` instance, it's trivial to change the state of the pin to turn the LED on or off.

To turn the LED on, simply write the value `GpioPinValue.Low` to the pin:

{% highlight C# %}
pin.Write(GpioPinValue.Low);
{% endhighlight %}

and of course, write `GpioPinValue.High` to turn the LED off:

{% highlight C# %}
pin.Write(GpioPinValue.High);
{% endhighlight %}

Remember that we connected the other end of the LED to the 3.3 Volts power supply, so we need to drive the pin to low to have current flow into the LED.
<h3><a href="{{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm">Next: Additional tutorials and samples</a></h3>