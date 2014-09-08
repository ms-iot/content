---
layout: code
title: Weather Shield Sensors
permalink: /WeatherShieldSensors.htm
---

# Weather Shield Sensors
Learn how to create a simple app that uses the Weather Shield's sensors.

# Required Components
* [Sparkfun Weather Shield](https://www.sparkfun.com/products/12081){:target="_blank"}

# Hooking up Components
Place the weather shield on top of the Galileo board making sure to line the pins up.

# Create a new project

1. Create a new project from the template.
1. Go to [HTU21D Repo](https://github.com/sparkfun/HTU21D_Breakout/tree/master/library/HTU21D_Humidity){:target="_blank"} and download the HTU21D.cpp and HTU21D.h files.
1. Go to [MPL3115A2 Repo](https://github.com/sparkfun/MPL3115A2_Breakout/tree/master/library/MPL3115A2_Pressure){:target="_blank"} and download the MPL3115A2.cpp and MPL3115A2.h files.
1. Place the HTU21D and MPL3115A2 library files in your new project.
1. Replace the existing code in main.cpp with the following code:

# Code

### Main.cpp
{% highlight C++ %}
/*
Main.cpp : Defines the entry point for the console application.
*/

#include "stdafx.h"
#include "HTU21D.h"
#include "MPL3115A2.h"

#include "arduino.h"

MPL3115A2 myPressure;
HTU21D myHumidity;

int _tmain(int argc, _TCHAR* argv [])
{
    return RunArduinoSketch();
}

//Give me temperature in fahrenheit!
float readTempF()
{
    return((myPressure.readTemp() * 9.0) / 5.0 + 32.0); // Convert celsius to fahrenheit
}

void setup() {
    Log(L"WeatherShieldSample\n\n");

    // initialize the digital pin as an output.
    Wire.begin();        // Join i2c bus

    // Test Multiple slave addresses:
    Wire.beginTransmission(0x40);
    Wire.write(0xE7);  // Address of data to get
    Wire.endTransmission(false); // Send data to I2C dev with option for a repeated start. THIS IS NECESSARY and not supported before Arduino V1.0.1!
    if (Wire.requestFrom(0x40, 1) != 1)
    {
        Log(L"Error reading from humidity sensor\n");
    }

    byte status = Wire.read();
    Log(L"Humidity sensor status 0x%0x\n\n", status);

    myHumidity.begin();
    myPressure.begin();

    // Configure the sensor
    myPressure.setModeBarometer(); // Measure pressure in Pascals from 20 to 110 kPa
    myPressure.setOversampleRate(7); // Set Oversample to the recommended 128
    myPressure.enableEventFlags(); // Enable all three pressure and temp event flags 
}

void loop()
{
    float pressure = myPressure.readPressure();
    Log(L"Pressure(Pa): %lf\n", pressure);
    float altitude = myPressure.readAltitudeFt();
    Log(L"altitude(Ft): %lf\n", altitude);
    float temperature = readTempF();
    Log(L"Temperature(F): %lf\n", temperature);
    float humidity = myHumidity.readHumidity();
    Log(L"Humidity(f): %lf\n\n", humidity);
}
{% endhighlight %}


---

[&laquo; Return to Samples](SampleApps.htm){:role="button"}{:class="btn btn-default"}
