---
layout: default
title: Push Button Sample
permalink: /win10/samples/PushButton.htm
---
<div class="container" markdown="1">

##Push Button Sample

![Push Button Image]({{site.baseurl}}/images/PushButton/PushbuttonSample.jpg)

In this sample, we will connect a Push Button and LED to Raspberry Pi 2. We will be reading the status of the Push button and control an LED using GPIO.

This is a headed sample, so please ensure that your device is in headed
mode by running this command: `setbootoption.exe headed` (changing the headed/headless state will require a reboot).

Also, be aware that the GPIO APIs are only available on Windows IoT Core, so this sample cannot run on your desktop.


###Components

You will need the following components :

* a [EG1311-ND Tactile Button](http://www.digikey.com/product-detail/en/320.02E11.08BLK/EG1311-ND/101397)

* a [red LED](http://www.digikey.com/product-detail/en/C5SMF-RJS-CT0W0BB1/C5SMF-RJS-CT0W0BB1-ND/2341832)

* a [330 &#x2126; resistor](http://www.digikey.com/product-detail/en/CFR-25JB-52-330R/330QBK-ND/1636)

* a [10k &#x2126; resistor](http://www.digikey.com/product-detail/en/CFR-25JB-52-10K/10KQBK-ND/338)

* a breadboard and several male-to-female and male-to-male connector wires

###Connect to your Device

Let's start by wiring up the components on the breadboard as shown in the diagram below.

![Breadboard connections]({{site.baseurl}}/images/PushButton/PushButton_bb.png)

*Image made with [Fritzing](http://fritzing.org/)*


Here are the schematics:

![Circuit Schematic]({{site.baseurl}}/images/PushButton/PushButton_schem.png)

*Image made with [Fritzing](http://fritzing.org/)*

####Connecting the LED

* Connect the cathode (the shorter leg) of the LED to Pin 13 (GPIO 27) of the Raspberry Pi 2

* Connect the anode (the longer leg) of the LED to one lead of the 330 &#x2126; resistor

* Connect the other end of the 330 &#x2126; resistor to Pin 1 (3.3V) on Raspberry Pi 2

####Connecting the Tactile Button

* Connect one pin of the tactile button to Pin 29 (GPIO 5) of the Raspberry Pi 2 and one lead of the 10k &#x2126; resistor

* Connect the other end of the 10k &#x2126; resistor to Pin 2 (5V) on Raspberry Pi 2

* Connect the other pin of the tactile button to the ground


Here is the pinout of the RPi2:

![Raspberry Pi 2 pinout]({{site.baseurl}}/images/PinMappings/RP2_Pinout.png)

<sub>*Image made with [Fritzing](http://fritzing.org/)*</sub>

###Deploy your app

You can find the entire code for this sample [here](https://github.com/ms-iot/samples/tree/develop/PushButton/CS). This sample is written in C#. Make a copy of the folder on your disk and open the project from Visual Studio.

Make sure you set the 'Remote Debugging' setting to point to your Windows IoT device. Refer to the basic 'Hello World' [sample]({{site.baseurl}}/win10/samples/HelloWorld.htm) if you need guidance.
If you're building for Raspberry Pi 2, select `ARM`.

When everything is set up, you should be able to press F5 from Visual Studio. The PushButton app will deploy and start on the Windows IoT device, and you should see the LED blink in sync with the simulation on the screen as you press the button.


###Let's look at the code
The code for this sample is pretty simple. Each time the push button is pressed, we flip the state of the LED.

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
        pushButton = gpio.OpenPin(PB_PIN);
        pin = gpio.OpenPin(LED_PIN);

        // Show an error if the pin wasn't initialized properly
        if (pin == null)
        {
            GpioStatus.Text = "There were problems initializing the GPIO LED pin.";
            return;
        }
        if (pushButton == null)
        {
            GpioStatus.Text = "There were problems initializing the GPIO Push Button pin.";
            return;
        }

        pushButton.SetDriveMode(GpioPinDriveMode.Input);
        pin.SetDriveMode(GpioPinDriveMode.Output);

        GpioStatus.Text = "GPIO pin initialized correctly.";
    }

{% endhighlight %}

Let's break this down a little:

* First, we use `GpioController.GetDefault()` to get the GPIO controller.

* If the device does not have a GPIO controller, this function will return `null`.

* Then we attempt to open the pin by calling `GpioController.OpenPin()` with the `PB_PIN` and `LED_PIN` value.

* We set the `pin` to run in output mode and `pushButton` to run in input mode using the `GpioPin.SetDriveMode()` function.

* Once we have the `pin`, we set it to be off (High) by default using the `GpioPin.Write()` function.


###Modify the state of the GPIO pin

When Push Button is pressed, the input value is read and LED is turned ON.

{% highlight C# %}
    private void FlipLED()
    {
        pushButtonValue = pushButton.Read();
        if (pushButtonValue == GpioPinValue.High)
        {
            pin.Write(GpioPinValue.High);
        }
        else if (pushButtonValue == GpioPinValue.Low)
        {
            pin.Write(GpioPinValue.Low);
        }
    }


{% endhighlight %}

Remember that we connected the other end of the LED to the 3.3 Volts power supply, so we need to drive the pin to low to have current flow into the LED.

</div>
