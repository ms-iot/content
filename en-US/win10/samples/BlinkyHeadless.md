---
layout: default
title: Blinky Headless Sample
permalink: /en-US/win10/samples/BlinkyHeadless.htm
lang: en-US
---

##Blinky Headless Sample

We'll create a simple Blinky app and connect a LED to your Windows IoT Core device (Raspberry Pi 2 or MinnowBoard Max).  Be aware that the GPIO APIs are
only available on Windows IoT Core, so this sample cannot run on your desktop.

###Headless mode

This application is designed for a headless device.  To better understand what Headless mode is and how to configure your device to be headless, follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm).

###Load the project in Visual Studio

You can find this sample [here](https://github.com/ms-iot/samples/tree/develop/BlinkyHeadless).  Choose either the C++ version or C# version, but note that this sample only covers the C# version. Make a copy of the folder on your disk and open the project from Visual Studio.

Make sure you set the 'Remote Debugging' setting to point to your Windows IoT Core device. Go back to the basic 'Hello World' [sample]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm) if you need guidance.

If you're building for Minnowboard Max, select `x86` in the architecture dropdown.  If you're building for Raspberry Pi 2, select `ARM`.

Make sure you connect the LED to your board. Go back to the basic 'Blinky' [sample]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm) if you need guidance.

Note that the app will not run successfully if it cannot find any available GPIO ports.

###Let's look at the code
The code for this sample is pretty simple. We use a timer, and each time the 'Tick' event is called, we flip the state of the LED.

###Timer code
Here is how you set up the timer in C#:
{% highlight C# %}
using Windows.System.Threading;

BackgroundTaskDeferral _deferral;
public void Run(IBackgroundTaskInstance taskInstance)
{
    _deferral = taskInstance.GetDeferral();

    this.timer = ThreadPoolTimer.CreatePeriodicTimer(Timer_Tick, TimeSpan.FromMilliseconds(500));
    . . .
}

private void Timer_Tick(ThreadPoolTimer timer)
{
    . . .
}
{% endhighlight %}

###Initialize the GPIO pin
To drive the GPIO pin, first we need to initialize it. Here is the C# code (notice how we leverage the new WinRT classes in the Windows.Devices.Gpio namespace):

{% highlight C# %}
using Windows.Devices.Gpio;

private async void InitGPIO()
{
    var gpio = GpioController.GetDefault();

    if (gpio == null)
    {
        pin = null;
        return;
    }

    pin = gpio.OpenPin(LED_PIN);

    if (pin == null)
    {
        return;
    }

    pin.Write(GpioPinValue.High);
    pin.SetDriveMode(GpioPinDriveMode.Output);
}
{% endhighlight %}

Let's break this down a little:

* First, we use `GpioController.GetDefault()` to get the GPIO controller.

* If the device does not have a GPIO controller, this function will return `null`.

* Then we attempt to open the pin by calling `GpioController.OpenPin()` with the `LED_PIN` value.

* Once we have the `pin`, we set it to be off (High) by default using the `GpioPin.Write()` function.

* We also set the `pin` to run in output mode using the `GpioPin.SetDriveMode()` function.


###Modify the state of the GPIO pin
Once we have access to the `GpioOutputPin` instance, it's trivial to change the state of the pin to turn the LED on or off.  You can modify 'Timer_Tick' to do this.

To turn the LED on, simply write the value `GpioPinValue.Low` to the pin:

{% highlight C# %}
this.pin.Write(GpioPinValue.Low);
{% endhighlight %}

and of course, write `GpioPinValue.High` to turn the LED off:

{% highlight C# %}
this.pin.Write(GpioPinValue.High);
{% endhighlight %}

Remember that we connected the other end of the LED to the 3.3 Volts power supply, so we need to drive the pin to low to have current flow into the LED.
