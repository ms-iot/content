---
layout: code
title: On Board Thermal
permalink: /OnBoardThermal.htm
---
# On Board Thermal Sample
Learn how to use the on board thermal sensor.

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

int tempPin = -1; // The on-board thermal sensor

void setup()
{
}

// the loop routine runs over and over again forever:
void loop()
{
  float temperatureInDegreesCelcius = 1.0f;	// Storage for the temperature value
  temperatureInDegreesCelcius = (float) analogRead(tempPin) / 4.0f;	// reads the analog value from this pin
  Log(L"Temperature: %lf\n", temperatureInDegreesCelcius);
  Sleep(100);		// Provides a delay for our visual pleasure
}
{% endhighlight %}

[&laquo; Return to Samples](SampleApps.htm)
