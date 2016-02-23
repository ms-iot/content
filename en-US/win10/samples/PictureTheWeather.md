---
layout: default
title: Picture the Weather
permalink: /en-US/win10/samples/PictureTheWeather.htm
lang: en-US
---

## Picture The Weather sample, using Windows Virtual Shields for Arduino

In this sample, we will connect an RGB LED strip to an Arduino and control it to indicate the weather forecast behind a picture.

![RGB Strip 1]({{site.baseurl}}/Resources/images/RGBSTRIP/rgbstrip_split1.JPG)

### Components

You will need the following components :

* an Arduino UNO or compatible

* a [Digital RGB LED Weatherproof Strip - LPD8806 32 LED - (1m)](http://www.adafruit.com/products/306){:target="_blank"})

* a [SparkFun Bluetooth Modem - BlueSMiRF Silver](https://www.sparkfun.com/products/12577){:target="_blank"}

* solder and a soldering iron

* 20 red/black/green/yellow wires at 6 inches length each (5 sets of 4 colors).

* a picture frame

* a 8x11" paper drawing from an artistic family member, friend or yourself

### Connect to your Device

* Follow the instructions at this [Arduino repository](https://github.com/ms-iot/virtual-shields-arduino){:target="_blank"} to set up your Arduino.

* Follow the instructions at this [Universal repository](https://github.com/ms-iot/virtual-shields-universal){:target="_blank"} to set up your Windows Phone.

### Modify the RGB strip

The RGB LED strips come with 48 LEDs in a strip.

* Carefully split apart the RGB strips at the seams so that you have 6 strips of 8 lights.

* Keeping the power connector (and other original wires) at the bottom right of the 6 strips,

* ... solder wires between the splits so that the ends are reconnected through the wires.

![RGB Strip 2]({{site.baseurl}}/Resources/images/RGBSTRIP/rgbstrip_split2.JPG)

### Placement of the RGB strip

With the original power connector placed at the lower right,
place the 6 strips of 8 LEDs onto the inside backing of the picture frame so that a 8x11" white paper (with artwork) separates the LEDs from the glass frame.

Tape or connect the backing into/onto the frame.

![RGB Strip 1]({{site.baseurl}}/Resources/images/RGBSTRIP/rgbstrip_split1.JPG)

### Hook up the RGB strip to the Arduino

From the RGB LED strip:

* Connect the ground wire to GND on the Arduino.

* Connect the green wire to PIN 2 on the Arduino.

* Connect the yellow wire to PIN 3 on the Arduino.

* Connect the barrel power connector to a +5 volt power supply (per Adafruit's instructions).

![RGB connection]({{site.baseurl}}/Resources/images/RGBSTRIP/rgbconnect.JPG)

### Upload to your device

* In the Arduino IDE (set up from Connect to your Device : Arduino), choose the menu item File->Examples->VirtualShield->PictureTheWeather

* Upload to your Arduino.

### See it run

* The phone will show "Web Weather Indicator," your coordinates and your weather forecast.

* You can say "tomorrow," "in 3 days," "in 5 days" to see different forecasts for your location.

* (There's also a not-so-secret debugging mode), try saying "show thunderstorms". Then, say "strike".

### Here's what's happening...

Using the Windows Virtual Shields for Arduino, the Arduino sketch is:
* Getting your GPS coordinates.

* Using that to get the National Weather Service forecast and location using your coordinates

* Presenting that information to you on screen as well as

* setting the animation on the RGB LED strip.

![Phone image]({{site.baseurl}}/Resources/images/RGBSTRIP/Phone.JPG)
