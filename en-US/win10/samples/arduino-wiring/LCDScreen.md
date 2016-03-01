---
layout: default
title: LCD Text Display
permalink: /en-US/win10/samples/arduino-wiring/LCDScreen.htm
lang: en-US
---

# LCD Text Display

{% include VerifiedVersion.md %}

Learn to Deploy and Debug an Arduino Wiring sketch on Raspberry Pi 2 and 3 or Minnowboard Max to control text on an LCD screen!

## Setup

Follow the [Arduino Wiring Project Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm) to create a new wiring project!

## Hardware

In this sample, we are using a common 16-pin LCD screen like [this one](https://www.adafruit.com/products/181) from Adafruit. The exact model we used is **LCM1602C**, but what's important is that you use a 16-pin LCD which is compatable with the Arduino [LiquidCrystal](https://www.arduino.cc/en/Reference/LiquidCrystal) library. This device is commonly included in Arduino starter kits and is a great LCD screen with two lines of display and controlled entirely with GPIO.

You'll also need several wires, a potentiometer, and a 220 ohm resistor.

## Hardware Setup

There is a fritzing diagram below, as well as a table of the exact pinouts we used in our code. For reference, we've also included a pinout diagram of the RPi2 or RPi3 GPIO header and the LCD screen. If you need additional help with your LCD screen, there is a really great guide over at Adafruit's website on [hooking up a 16-pin LCD screen](https://learn.adafruit.com/character-lcds).

### Fritzing Diagram

![LCD Fritzing Diagram]({{site.baseurl}}/Resources/images/arduino_wiring/pi2_lcd_fritz.png)

#### Notes:

* VEE is a contrast pin. If you want maximum contrast, you can wire it to 5V. If you want to be able to control the contrast, hook this pin up to the output of a potentiometer (as shown in the fritzing diagram)!
* R/W is the read/write pin. In this demo, you can hook it up to ground (for write). If you want to customize your sketch to be able to read or write, hook it up to another GPIO pin and set that pin HIGH when you want to read and LOW to write.
* D0 - D3 are not used in this demo.

### Pin Mapping Table

{:.table.table-bordered .devices}
| LCD Pin | Raspberry Pi2 Pin |
|---------|-------------------|
| GND | Any ground pin |
| VCC | 5v DC (02 or 04) |
| VEE | 5v DC or POT output * |
| RS  | GPIO_20 |
| R/W | Ground or any other GPIO pin * |
| E   | GPIO_16 |
| D0  | *none* * |
| D1  | *none* * |
| D2  | *none* * |
| D3  | *none* * |
| D4  | GPIO_2 |
| D5  | GPIO_3 |
| D6  | GPIO_4 |
| D7  | GPIO_17 |
| BL+ | 5v DC **with 220 ohm resistor** |
| BL- | Ground |

### Reference Diagrams

| LCD Pinouts | Raspberry Pi 2 and 3 Pinouts |
|:-----------:|:----------------------:|
| ![LCD Display]({{site.baseurl}}/Resources/images/arduino_wiring/lcd_16pins.jpg) | ![RPI Pinouts]({{site.baseurl}}/Resources/images/arduino_wiring/pi2_pinouts.png) |

## Required Library

You'll need the LiquidCrystal library, which is included in the Arduino SDK! You can copy the two files `LiquidCrystal.h` and `LiquidCrystal.cpp` from the Arduino libraries folder (typically C:\Program Files (x86)\Arduino\libraries\LiquidCrystal\src\) and paste them into your solution directory! Then, drag the two files from your solution directory into your project (via Solution Explorer) in Visual Studio.


## Code

Replace the existing code in your main .ino file with the following code:

{% highlight C++ %}

#include <LiquidCrystal.h>

int enablePin = GPIO_16;
int registerSelectPin = GPIO_20;
int dataPin11 = GPIO_2;
int dataPin12 = GPIO_3;
int dataPin13 = GPIO_4;
int dataPin14 = GPIO_17;

//create a pointer to an instance of LiquidCrystal, yet to be created
LiquidCrystal *lcd;

void setup() {
	//create the LiquidCrystal instance with the pins as set
    lcd = new LiquidCrystal( registerSelectPin, enablePin, dataPin11, dataPin12, dataPin13, dataPin14 );
	
    // set up the LCD's number of columns and rows:
    lcd->begin( 16, 2 );
	
    // Print a message to the LCD.
    lcd->print( "hello, world!" );
}

void loop() {
    // set the cursor to column 0, line 1
    // (note: line 1 is the second row, since counting begins with 0):
    lcd->setCursor( 0, 1 );
	
    // print the number of seconds since reset:
    lcd->print( millis() / 1000 );
}


{% endhighlight %}


## Build and deploy
Press F5 to build and deploy your project.

Refer to the [Arduino Wiring Project Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm) for more instructions on how to deploy your app!

## Result
You should see the LCD screen print "hello, world!" across the top line, with the current number of seconds the app has been running constantly being printed on the 2nd row!

![Hello World]({{site.baseurl}}/Resources/images/arduino_wiring/lcd_helloworld.jpg)

## Having trouble?

Refer to the [Arduino Wiring Porting Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm) for common issues and concerns when working with Arduino Wiring sketches.

---

[&laquo; Return to Samples]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm){:role="button"}{:class="btn btn-default"}
