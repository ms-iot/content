---
layout: default
title: Hello Blinky
permalink: /en-US/win10/samples/arduino-wiring/HelloBlinky.htm
lang: en-US
---

# Hello Blinky
Learn to Deploy and Debug an Arduino Wiring sketch on Raspberry Pi 2 and 3 or Minnowboard Max to blink an LED!

## Setup

Follow the [Arduino Wiring Project Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm) to create a new wiring project!

## Code

This code is included in the default template of an Arduino Wiring project, and is included here (with additional comments) for reference.

{% highlight C++ %}

void setup()
{
    // put your setup code here, to run once:

    pinMode(GPIO_5, OUTPUT); // Configure the pin for OUTPUT so you can turn on the LED.
}

void loop()
{
    // put your main code here, to run repeatedly:

    digitalWrite(GPIO_5, LOW);    // turn the LED off by making the voltage LOW
    delay(500);                    // wait for a half second
    digitalWrite(GPIO_5, HIGH);   // turn the LED on by making the voltage HIGH
    delay(500);                    // wait for a half second
}

{% endhighlight %}


## Wire your RPi2 or RPi3 with an LED

LEDs are diodes which will emit light when powered. They are polarized - meaning they work only when plugged in correctly. Typically, the longer leg is positive, while the shorter leg is negative. Additionally, you should never connect an LED directly to power and ground without a resistor in the circuit. Without a resistor to slow the flow of current, you'll burn out the LED (at best) and could do damage to your other hardware! For an LED, it is fairly typical to use a 220 or 330 ohm resistor, but anything in the range of 220 - 1000 (1Kohm) ohms is acceptable.

Notice that we're using `GPIO_5` in the sketch above. This is a special value that maps to a specific pin on a Raspberry Pi 2 and 3. If we connect the positive leg of the LED to the same pin, this sketch will provide power to the circuit when we toggle that pin HIGH, turning the LED on. The fritzing diagram below shows this connection. If you wish to use another GPIO pin, you'll need to change both the `GPIO_x` value (where `x` is the GPIO pin number) in the sketch, as well as the physical wiring of the LED.

Here is a pinout diagram of the Raspberry Pi 2:
![RPI Pinouts]({{site.baseurl}}/Resources/images/arduino_wiring/pi2_pinouts.png)

### Fritzing Diagram

![LED Wiring]({{site.baseurl}}/Resources/images/arduino_wiring/led_fritz.png)

## Build and deploy
Press F5 to build and deploy your project.

Refer to the [Arduino Wiring Project Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm) for more instructions on how to deploy your app!

## Result
You should see the LED blinking on and off, spending about a half second in each state. If it isn't blinking, try reversing the LED leads.

## Having trouble?

Refer to the [Arduino Wiring Porting Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm) for common issues and concerns when working with Arduino Wiring sketches.

---

[&laquo; Return to Samples]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm){:role="button"}{:class="btn btn-default"}
