---
layout: code
title: On Board LED
permalink: /OnBoardLED.htm
---

# On Board LED
Learn how to use the on board LED.

# Create a new project
Create a new project and configure for deployment like was done in [Hello Blinky](HelloBlinky.htm)

# Code

{% highlight C++ %}
#include "stdafx.h"
#include "arduino.h"

int _tmain(int argc, _TCHAR* argv[])
{
  return RunArduinoSketch();
}

//This application flashes the GP LED on the Galileo board by calling the direct GPIO Writes and Sets
static LONG QUARK_LED_PIN = QRK_LEGACY_RESUME_SUS1; //Uses the Quark legacy GPIO Pins
bool state = false; // keeps track of the state of the GP LED

void setup()
{
  GpioSetDir(QUARK_LED_PIN, 1); // Sets the pin to Output
}

void loop()
{
  if (state)
  {
    GpioWrite(QUARK_LED_PIN, 1); // Writes to the pin, setting its value to HIGH
    Log(L"LED OFF\n");
    state = !state;
  }
  else
  {
    GpioWrite(QUARK_LED_PIN, 0); // Writes to the pin, setting its value to LOW
    Log(L"LED ON\n");
    state = !state;
  }
  Sleep(1000);
}
{% endhighlight %}

[&laquo; Return to Samples](SampleApps.htm)
