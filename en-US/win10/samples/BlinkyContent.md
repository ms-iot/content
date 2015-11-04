#Blinky Sample

We'll create a simple LED blinking app and connect a LED to your Windows 10 IoT Core device.

This is a headed sample.  To better understand what headed mode is and how to configure your device to be headed, follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm).

Also, be aware that the GPIO APIs are only available on Windows 10 IoT Core, so this sample cannot run on your desktop.

###Load the project in Visual Studio

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\Blinky`.  The sample code is available in either C++ or C#, however the documentation here only details the C# variant. Make a copy of the folder on your disk and open the project from Visual Studio.

###Connect the LED to your Windows IoT device

You'll need a few components:

* a LED (whichever color you like)

* a 220 &#x2126; resistor

* a breadboard and a couple of connector wires

![Electrical Components]({{site.baseurl}}/images/Blinky/components.png)

###For Raspberry Pi 2 (RPi2)

We will connect the one end of the LED to GPIO 5 (pin 29 on the expansion header) on the RPi2, the other end to the resistor, and the resistor to the 3.3 volt power supply from the RPi2.
Note that the polarity of the LED is important. Make sure the shorter leg (-) is connected to GPIO 5 and the longer leg (+) to the resistor or it won't light up.

And here is the pinout of the RPi2:

<img src="{{site.baseurl}}/images/PinMappings/RP2_Pinout.png" height="400">

<sub>*Image made with [Fritzing](http://fritzing.org/){:target="_blank"}*</sub>

Here is an example of what your breadboard might look like with the circuit assembled:

<img src="{{site.baseurl}}/images/Blinky/breadboard_assembled_rpi2.png" height="500">

<sub>*Image made with [Fritzing](http://fritzing.org/){:target="_blank"}*</sub>

###For MinnowBoard Max (MBM)

We will connect the one end of the LED to GPIO 5 (pin 18 on the JP1 expansion header) on the MBM, the other end to the resistor, and the resistor to the 3.3 volt power supply from the MBM.
Note that the polarity of the LED is important. Make sure the shorter leg (-) is connected to GPIO 5 and the longer leg (+) to the resistor or it wont light up.

And here is the JP1 connector on the MBM:

<img src="{{site.baseurl}}/images/PinMappings/MBM_Pinout.png" height="400">

<sub>*Image made with [Fritzing](http://fritzing.org/){:target="_blank"}*</sub>

Here is an example of what your breadboard might look like with the circuit assembled:

<img src="{{site.baseurl}}/images/Blinky/breadboard_assembled.png" height="500">

<sub>*Image made with [Fritzing](http://fritzing.org/){:target="_blank"}*</sub>

###Deploy your app

{% include_relative AppDeploymentCS.md %}

When everything is set up, you should be able to press F5 from Visual Studio.  The Blinky app will deploy and start on the Windows IoT device, and you should see the LED blink in sync with the simulation on the screen.

<img src="{{site.baseurl}}/images/Blinky/blinky-screenshot.png" height="400">

Congratulations! You controlled one of the GPIO pins on your Windows IoT device.

###Let's look at the code
The code for this sample is pretty simple. We use a timer, and each time the 'Tick' event is called, we flip the state of the LED.


###Timer code
Here is how you set up the timer in C#:
{% highlight C# %}
public MainPage()
{
    // ...

    this.timer = new DispatcherTimer();
    this.timer.Interval = TimeSpan.FromMilliseconds(500);
    this.timer.Tick += Timer_Tick;
    this.timer.Start();

    // ...
}

private void Timer_Tick(object sender, object e)
{
    FlipLED();
}
{% endhighlight %}

###Initialize the GPIO pin
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

    // Show an error if the pin wasn't initialized properly
    if (pin == null)
    {
        GpioStatus.Text = "There were problems initializing the GPIO pin.";
        return;
    }

    pin.Write(GpioPinValue.High);
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


###Modify the state of the GPIO pin
Once we have access to the `GpioOutputPin` instance, it's trivial to change the state of the pin to turn the LED on or off.

To turn the LED on, simply write the value `GpioPinValue.Low` to the pin:

{% highlight C# %}
this.pin.Write(GpioPinValue.Low);
{% endhighlight %}

and of course, write `GpioPinValue.High` to turn the LED off:

{% highlight C# %}
this.pin.Write(GpioPinValue.High);
{% endhighlight %}

Remember that we connected the other end of the LED to the 3.3 Volts power supply, so we need to drive the pin to low to have current flow into the LED.
