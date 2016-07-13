---
layout: default
title: Push Button Sample
permalink: /en-US/win10/samples/PushButton.htm
lang: en-US
---

##Push Button Sample

[View the code on Github](https://github.com/ms-iot/samples/tree/develop/PushButton/CS){:target="_blank"}

In this sample, we will connect a push button to Raspberry Pi 2 and use it
to control the onboard LED. We will use GPIO interrupts to detect when the
button is pressed and will toggle the LED each time the button is pressed.

![Push Button Image]({{site.baseurl}}/images/PushButton/PushbuttonSample.jpg)

This is a headed sample, so please ensure that your device is in headed
mode by running this command: `setbootoption.exe headed` (changing the
headed/headless state will require a reboot).

Also, be aware that the GPIO APIs are only available on Windows IoT Core,
so this sample cannot run on your desktop.

###Components

You will need the following components :

* a [EG1311-ND Tactile Button](http://www.digikey.com/product-detail/en/320.02E11.08BLK/EG1311-ND/101397){:target="_blank"}

* a breadboard and two male-to-female connector wires

###Connect to your Device

Let's start by wiring up the components on the breadboard as shown in the
following schematic.

* Connect one pin of the tactile button to Pin 29 (GPIO 5) of
  the Raspberry Pi 2 and one pin to GND.

![Breadboard layout]({{site.baseurl}}/images/PushButton/PushButton_bb.png)

![Circuit Schematic]({{site.baseurl}}/images/PushButton/PushButton_schem.png)

*Image made with [Fritzing](http://fritzing.org/)*

###Building and running the sample

1. Clone the [samples](https://github.com/ms-iot/samples)
   repository to your local machine.
1. Open `PushButton\CS\PushButton.csproj` in Visual Studio.
1. Select `ARM` for the target architecture
1. Go to `Build -> Build Solution`
1. Select `Remote Machine` from the debug target
1. Hit F5 to deploy and debug. Enter the IP address of your Raspberry Pi
   and select `None` for the authentication type.

###Let's look at the code

First, we open the GpioPin resources we'll be using. The button is connected to
GPIO5 in active LOW configuration, meaning the signal will be HIGH when the
button is not pressed and the signal will go LOW when the button is pressed.
We'll be using the onboard LED, connected to GPIO47, which is connected in
active HIGH configuration, meaning driving the pin HIGH will turn on the LED
and driving the pin LOW will turn off the LED.

            buttonPin = gpio.OpenPin(BUTTON_PIN);
            ledPin = gpio.OpenPin(LED_PIN);

We initialize the LED in the OFF state by first latching a LOW value onto the
pin. When we change the drive mode to Output, it will immediately drive the
latched output value onto the pin. The latched output value is undefined when
we initially open a pin, so we should always set the pin to a known state
before changing it to an output.

            ledPin.Write(GpioPinValue.Low);
            ledPin.SetDriveMode(GpioPinDriveMode.Output);

Next, we set up the button pin. We're taking advantage of the fact that
Raspberry Pi 2 has built-in pull up resistors that we can activate. We use the
built-in pull up resistor so that we don't need to supply a resistor externally.
Pull up resistors are not available on all hardware, so we insert a check to
make sure this drive mode is supported before setting it. If you run this sample
on hardware that does not support InputPullUp, be sure to connect an external
pull up resistor.

            if (buttonPin.IsDriveModeSupported(GpioPinDriveMode.InputPullUp))
                buttonPin.SetDriveMode(GpioPinDriveMode.InputPullUp);
            else
                buttonPin.SetDriveMode(GpioPinDriveMode.Input);

Next we connect the GPIO interrupt listener. This is an event that will get
called each time the pin changes state. We also set the DebounceTimeout
property to 50ms to filter out spurious events caused by electrical noise.
Buttons are mechanical devices and can make and break contact many times on a
single button press. We don't want to be overwhelmed with events so we filter
these out.

            buttonPin.DebounceTimeout = TimeSpan.FromMilliseconds(50);
            buttonPin.ValueChanged += buttonPin_ValueChanged;

In the button interrupt handler, we look at the edge of the GPIO signal to
determine whether the button was pressed or released. If the button was
pressed, we flip the state of the LED.

        private void buttonPin_ValueChanged(GpioPin sender, GpioPinValueChangedEventArgs e)
        {
            // toggle the state of the onboard LED every time the button is pressed
            if (e.Edge == GpioPinEdge.FallingEdge)
            {
                ledPin.Write(ledPinValue);
                ledPinValue = (ledPinValue == GpioPinValue.Low) ?
                    GpioPinValue.High : GpioPinValue.Low;
            }

We also want to update the user interface with the current state of the
pin, so we invoke an update operation on the UI thread. Capturing the result
of an async method in a local variable is necessary to suppress a compiler
warning when we don't want to wait for an asynchronous operation to complete.

            // need to invoke UI updates on the UI thread because this event
            // handler gets invoked on a separate thread.
            var task = Dispatcher.RunAsync(CoreDispatcherPriority.Normal, () => {
                if (e.Edge == GpioPinEdge.FallingEdge)
                {
                    ledEllipse.Fill = redBrush;
                    GpioStatus.Text = "Button Pressed";
                }
                else
                {
                    ledEllipse.Fill = grayBrush;
                    GpioStatus.Text = "Button Released";
                }
            });
        }

That's it! Each time you press the button, you should see the onboard LED change
state.

