#Digital Signage App

This sample showcases a Digital Sign UWP running on Athens. The key features of app are to receive content in different multimedia forms - e.g. video, audio, image, slideshow - from a service and to display this content to the user. The digital sign in this sample is interactive and allows web browsing, as well as allowing for touch input. This is a headed sample.  To better understand what headed mode is and how to configure your device to be headed, follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm).

###Prerequisites

* Athens device running build 10152 or greater. 

###Load the project in Visual Studio

You can find this sample [here](https://github.com/ms-iot/samples-private/tree/rtm){:target="_blank"}. Make a copy of the DigitalSignageUAP folder on your disk and open the project from Visual Studio.

Make sure you set the 'Remote Debugging' setting to point to your Windows IoT device. Go back to the basic 'Hello World' [sample]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm) if you need guidance.

###Deploy your app

If you're building for Minnowboard Max, select `x86` in the architecture dropdown.  If you're building for Raspberry Pi 2, select `ARM`.

When everything is set up, you should be able to press F5 from Visual Studio.  The Digital Signage app will deploy and start on the Windows IoT device, and you should see the LED blink in sync with the simulation on the screen.

<img src="{{site.baseurl}}/images/DigitalSignage/DigitalSignage1.png" height="400">

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
