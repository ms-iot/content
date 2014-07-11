---
layout: code
title: On Board LED
permalink: /OnBoardLED.htm
---

# On Board LED
Learn how to toggle the GP Led on the Galileo on and off.

# Create a new project
Create a new project from the template and replace the existing code in main.cpp with the following code:

# Code

{% highlight C++ %}
// Main.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "arduino.h"

int _tmain(int argc, _TCHAR* argv[])
{
    return RunArduinoSketch();
}

//This application flashes the on board LED of the Galileo board by calling GPIO functions directly in the embprpusr.dll instead of using the Arduino layer.

bool state = false; // keeps track of the state of the GP LED

void setup()
{
    GpioSetDir(LED_BUILTIN, OUTPUT); // Sets the pin to output
}

void loop()
{
    state = !state;
    GpioWrite(LED_BUILTIN, state); // Writes to the pin, setting its value to HIGH
    Log(L"LED %s\n", (state ? L"ON" : L"OFF"));
    Sleep(1000);
}
{% endhighlight %}

[&laquo; Return to Samples](SampleApps.htm)
