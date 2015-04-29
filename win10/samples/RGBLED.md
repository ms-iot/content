---
layout: default
title: RGB LED Sample
permalink: /win10/samples/RGBLED.htm
---
<div class="container" markdown="1">

##RGB LED Sample

In this sample, we will connect a Tri-color LED to Raspberry Pi 2. The LED will blink changing colors from Red, Blue, Green.

This is a headed sample, so please ensure that your device is in headed
mode by running this command: `setbootoption.exe headed` (changing the headed/headless state will require a reboot).

Also, be aware that the GPIO APIs are only available on Windows IoT Core, so this sample cannot run on your desktop.


###Components

You will need the following components :

* a [754-1615-ND Tri-color LED](http://www.digikey.com/product-detail/en/WP154A4SUREQBFZGC/754-1615-ND/3084119))

* a [330 &#x2126; resistor](http://www.digikey.com/product-detail/en/CFR-25JB-52-330R/330QBK-ND/1636)

* a breadboard and several male-to-female and male-to-male connector wires

###Connect to your Device

Let's start by wiring up the components on the breadboard as shown in the diagram below.

![Breadboard connections]({{site.baseurl}}/images/RGBLED/RGBLED_bb.png)

*Image made with [Fritzing](http://fritzing.org/)*


Here are the schematics:

![Circuit Schematic]({{site.baseurl}}/images/RGBLED/RGBLED-schematic_schem.png)

*Image made with [Fritzing](http://fritzing.org/)*

####Connecting the LED

* Connect the three legs of the LED to Pin 29,31,33 (GPIO 5,6,13) of the Raspberry Pi 2 respectively

* Note that Red leg should be connected through a 330 &#x2126; resistor to Pin 29 of Raspberry Pi 2

* Connect the anode (the longer leg) of the LED to Pin 6 (GND)

Here is the pinout of the RPi2:

![Raspberry Pi 2 pinout]({{site.baseurl}}/images/PinMappings/RP2_Pinout.png)

<sub>*Image made with [Fritzing](http://fritzing.org/)*</sub>

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
                redpin = null;
                bluepin = null;
                greenpin = null;
                GpioStatus.Text = "There is no GPIO controller on this device.";
                return;
            }

           redpin = gpio.OpenPin(REDLED_PIN);
           bluepin = gpio.OpenPin(BLUELED_PIN);
           greenpin = gpio.OpenPin(GREENLED_PIN);

            // Show an error if the pin wasn't initialized properly
            if (redpin == null || bluepin == null || greenpin == null)
            {
                GpioStatus.Text = "There were problems initializing the GPIO red/blue/green pin.";
                return;
            }

            redpin.Write(GpioPinValue.High);
            redpin.SetDriveMode(GpioPinDriveMode.Output);
            bluepin.Write(GpioPinValue.High);
            bluepin.SetDriveMode(GpioPinDriveMode.Output);
            greenpin.Write(GpioPinValue.High);
            greenpin.SetDriveMode(GpioPinDriveMode.Output);

            GpioStatus.Text = "GPIO blue/red/green pin initialized correctly.";
        }
{% endhighlight %}

Let's break this down a little:

* First, we use `GpioController.GetDefault()` to get the GPIO controller.

* If the device does not have a GPIO controller, this function will return `null`.

* Then we attempt to open the pin by calling `GpioController.OpenPin()` with the `REDLED_PIN`,`BLUELED_PIN` and `GREENLED_PIN` value.

* Once we have the `redpin`, `bluepin` and `greenpin`, we set it to be High by default using the `GpioPin.Write()` function.

* We also set the pins to run in output mode using the `GpioPin.SetDriveMode()` function.


###Modify the state of the GPIO pin
Once we have access to the `GpioOutputPin` instance, it's trivial to change the state of the pin to turn the LED on or off.

To turn the LED on, simply write the value `GpioPinValue.High` to the pin:


{% highlight C# %}
private void FlipLED()
        {
            if (LEDStatus == 0)
            {
               LEDStatus = 1;
                if (redpin != null && bluepin != null && greenpin != null)
                {
                    //turn on red
                    redpin.Write(GpioPinValue.High);
                    bluepin.Write(GpioPinValue.Low);
                    greenpin.Write(GpioPinValue.Low);
                }
            }
            else if (LEDStatus == 1)
            {
                LEDStatus = 2;
                if (redpin != null && bluepin != null && greenpin != null)
                {
                    //turn on blue
                    redpin.Write(GpioPinValue.Low);
                    bluepin.Write(GpioPinValue.High);
                    greenpin.Write(GpioPinValue.Low);
                }
            }

          else
            {
                LEDStatus = 0;
                if (redpin != null && bluepin != null && greenpin != null)
                {
                    //turn on green
                    redpin.Write(GpioPinValue.Low);
                    bluepin.Write(GpioPinValue.Low);
                    greenpin.Write(GpioPinValue.High);
                }
              }
        }
{% endhighlight %}

</div>
