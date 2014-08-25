---
layout: code
title: NeoPixel
permalink: /NeoPixel.htm
---

# NeoPixel
Learn how to use a NeoPixel Strip.

![](images/NeoPixel.jpg){:width="400"}

# Required Components
* [Neopixel Strip](http://www.adafruit.com/products/306){:target="_blank"}
* [5V Power Supply (WARNING: do not exceed 6V DC)](http://www.adafruit.com/products/276){:target="_blank"}
    * Note: The strip draws 120mA per 2.5" strip segment, so choose your power supply accordingly.
* [Female DC Power adapter](http://www.adafruit.com/products/368){:target="_blank"}

# Hooking up Components
* [Info on how to power the strip with the DC Power Supply and Female DC Power Adapter](https://learn.adafruit.com/digital-led-strip/powering){:target="_blank"}
* [Info on how to wire the NeoPixel Strip for use.](https://learn.adafruit.com/digital-led-strip/wiring){:target="_blank"}

# Create a new project

1. Create a new project from the template.
1. Replace the existing code in main.cpp with the following code:

# Code

### Main.cpp
{% highlight C++ %}
// Main.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "arduino.h"

const int stripClock = 2;
const int stripData = 3;
const int stripLen = 48;

typedef struct _PIXEL_VALUES {
    BYTE Green;
    BYTE Red;
    BYTE Blue;
} PIXEL_VALUES, *PPIXEL_VALUES;

// Array of stored Pixel values
PIXEL_VALUES Pixels[stripLen];

// Custom Functions for working with the NeoPixel Strip
void SetPixel(int pixel, BYTE Red, BYTE Green, BYTE Blue);
void ShiftPixel(int pixel);
void ShiftAllPixels();

int _tmain(int argc, _TCHAR* argv [])
{
    return RunArduinoSketch();
}

void setup()
{
    // Set pins to outputs
    pinMode(stripClock, OUTPUT);
    pinMode(stripData, OUTPUT);
    digitalWrite(stripClock, LOW);
    digitalWrite(stripData, LOW);
    _PinFunction(stripData, DEFAULT_MUX); // Sets the data pin to Digital Functionality

    // Reset all the pixels
    for (int i = 0; i < stripLen; i++)
    {
        SetPixel(i, 0, 0, 0);
    }
    ShiftAllPixels();
}

void loop()
{
    int i;

    // Set the pixels to Red
    for (i = 0; i < stripLen; i++)
    {
        SetPixel(i, (i & 0x7F), 0, 0);
    }
    ShiftAllPixels();

    // Set the pixels to Green
    for (i = 0; i < stripLen; i++)
    {
        SetPixel(i, 0, (i & 0x7F), 0);
    }
    ShiftAllPixels();

    // Set the pixels to Blue
    for (i = 0; i < stripLen; i++)
    {
        SetPixel(i, 0, 0, (i & 0x7F));
    }
    ShiftAllPixels();

    // Set the pixels to White
    for (i = 0; i < stripLen; i++)
    {
        SetPixel(i, (i & 0x7F), (i & 0x7F), (i & 0x7F));
    }
    ShiftAllPixels();

    // Set the pixels to gradient from Yellow to Cyan
    for (i = 0; i < stripLen; i++)
    {
        SetPixel(i, ((stripLen - i) & 0x7F), ((128 + (stripLen / 2) + i) & 0x7F), (i & 0x7F));
    }
    ShiftAllPixels();

    // Set the pixels to random colors
    for (i = 0; i < stripLen; i++)
    {
        SetPixel(i, (BYTE) random(0, 40), (BYTE) random(0, 40), (BYTE) random(0, 40));
    }
    ShiftAllPixels();

    // Turn the pixels off
    for (i = 0; i < stripLen; i++)
    {
        SetPixel(i, 0, 0, 0);
    }
    ShiftAllPixels();
}

// Sets the pixel color in our array
void SetPixel(int pixel, BYTE Red, BYTE Green, BYTE Blue)
{
    if (pixel < stripLen)
    {
        Pixels[pixel].Red = Red | 0x80;
        Pixels[pixel].Green = Green | 0x80;
        Pixels[pixel].Blue = Blue | 0x80;
    }
}

// Sends the color of a pixel to the strip
void ShiftPixel(int pixel)
{
    PPIXEL_VALUES PixelValues = &Pixels[pixel];
    BYTE bit;
    int i;

    for (i = 7; i >= 0; i--)
    {
        bit = (PixelValues->Green >> i) & 0x01;
        digitalWrite(stripData, bit);
        digitalWrite(stripClock, HIGH);
        digitalWrite(stripClock, LOW);
    }
    for (i = 7; i >= 0; i--)
    {
        bit = (PixelValues->Red >> i) & 0x01;
        digitalWrite(stripData, bit);
        digitalWrite(stripClock, HIGH);
        digitalWrite(stripClock, LOW);
    }
    for (i = 7; i >= 0; i--)
    {
        bit = (PixelValues->Blue >> i) & 0x01;
        digitalWrite(stripData, bit);
        digitalWrite(stripClock, HIGH);
        digitalWrite(stripClock, LOW);
    }
}

// Sends all the pixel colors to the strip
void ShiftAllPixels()
{
    int i;

    digitalWrite(stripData, 0);
    for (i = 0; i < 8; i++)
    {
        digitalWrite(stripClock, HIGH);
        digitalWrite(stripClock, LOW);
    }
    for (i = 0; i < 8; i++)
    {
        digitalWrite(stripClock, HIGH);
        digitalWrite(stripClock, LOW);
    }
    for (i = 0; i < 8; i++)
    {
        digitalWrite(stripClock, HIGH);
        digitalWrite(stripClock, LOW);
    }

    for (i = 0; i < stripLen; i++)
    {
        ShiftPixel(i);
    }

    digitalWrite(stripData, 0);
    for (i = 0; i < 8; i++)
    {
        digitalWrite(stripClock, HIGH);
        digitalWrite(stripClock, LOW);
    }
    for (i = 0; i < 8; i++)
    {
        digitalWrite(stripClock, HIGH);
        digitalWrite(stripClock, LOW);
    }
}
{% endhighlight %}

---

[&laquo; Return to Samples](SampleApps.htm){:role="button"}{:class="btn btn-default"}
