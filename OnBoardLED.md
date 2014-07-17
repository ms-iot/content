---
layout: code
title: On Board LED
permalink: /OnBoardLED.htm
---

# On Board LED
Learn how to toggle the on-board LED on the Galileo on and off.

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

ULONG state = LOW; // keeps track of the state of the on-board LED

void setup()
{
    GpioSetDir(LED_BUILTIN, OUTPUT); // Sets the pin to output
}

void loop()
{
    if ( HIGH == state ) {
	    state = LOW;
	} else {
	    state = HIGH;
	}
    GpioWrite(LED_BUILTIN, state); // Writes to the pin, setting its value either HIGH (on) or LOW (off)
    Log(L"LED %s\n", (HIGH == state ? L"ON" : L"OFF"));
    Sleep(1000);
}
{% endhighlight %}
  <hr/>

<a class="btn btn-default" href="SampleApps.htm" role="button">&laquo; Return to Samples</a>
