---
layout: default
title: Hello Blinky
permalink: /en-US/win10/samples/arduino-wiring/HelloBlinky.htm
lang: en-US
---

#Hello Blinky
Learn to Deploy and Debug an Arduino Wiring sketch to blink an LED!

#Setup

Follow the [Arduino Wiring Project Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm) to create a new wiring project!

##Code

This code is included in the default template, and is included here (with additional comments) for reference.

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


##Wire your RPi2 with an LED
LEDs are diodes which will emit light when powered. They are polarized - meaning they work only when plugged in correctly.
![LED Wiring]({{site.baseurl}}/images/arduino_wiring/led_fritz.png)

##Build and deploy
Press F5 to build and deploy your project.

Refer to the [Arduino Wiring Project Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm) for more instructions on how to deploy your app!

##Result
You should see the LED blinking on and off, spending about a half second in each state. If it isn't blinking, try reversing the LED leads.