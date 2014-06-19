---
layout: code
title: On Board LED
permalink: /OnBoardLED.htm
---

# On Board LED
Learn how to use the on board thermal sensor.

# Create a new project
Create a new project and configure for deployment like was done in [Hello Blinky](/HelloBlinky.htm)

# Code

{% highlight C++ %}
//This application flashes the GP LED on the Galileo board by calling the direct GPIO Writes and Sets
static LONG QUARK_LED_PIN = QRK_LEGACY_RESUME_SUS1; //Uses the Quark legacy GPIO Pins
bool state = false; // keeps track of the state of the GP LED
int size = 1000; // the size of our buffer string
char temp[1000]; // for our buffer string

void CustomLogging(char* str)
{
  OutputDebugStringA(str); // for VS Output
  printf(str); // for commandline output
}

void setup()
{
  GpioSetDir(QUARK_LED_PIN, 1); // Sets the pin to Output
}

void loop()
{
  if (state)
  {
    GpioWrite(QUARK_LED_PIN, 1); // Writes to the pin, setting it's value to HIGH
    CustomLogging("LED OFF\n");
    state = !state;
  }
  else
  {
    GpioWrite(QUARK_LED_PIN, 0); // Writes to the pin, setting it's value to LOW
    CustomLogging("LED ON\n");
    state = !state;
  }
  Sleep(1000);
}
{% endhighlight %}

[&laquo; Return to Samples](/SampleApps.htm)
