---
layout: code
title: Set Gen1 Powerup States
permalink: /SetGen1PowerupStates.htm
---

# Set Galileo Gen1 Power-up States
Most of the General Purpose I/O (GPIO) pins of the Galileo Gen1 come from an I/O Expander chip. GPIO pins 2, 3 and 10 are read/written directly by the processor chip, but all the others are from the I/O Expander chip.
The I/O Expander chip used on the Gen1 board can load its power-up defaults from an EEPROM that is included in the chip.  This sample demonstrates how to store I/O Expander GPIO pin configurations on the EEPROM so they will be restored when the board powers up.

# Create a new project
Create a new project from the template and replace the existing code in main.cpp with the following code:

# Code

{% highlight C++ %}
// Main.cpp : Defines the entry point for the console application.
//

#include <Windows.h>
#include "arduino.h"

int wmain(int argc, PWCHAR argv[])
{
    return RunArduinoSketch();
}

// This application configures the Gen1 board I/O Expander pins and then 
// saves the configuration to be used whenever the board is powered up.

void setup()
{
    // Perform a digital write on each pin to make it a digital I/O pin.
    for (int i = 0; i < 20; i++)
    {
        digitalWrite(i, LOW);
    }

    // Set all the I/O expander pins to be inputs.
    // I/O pins 2, 3 and 10 come from the SOC, not the I/O expander.
    pinMode(0, INPUT);
    pinMode(1, INPUT);
    pinMode(4, INPUT);
    pinMode(5, INPUT);
    pinMode(6, INPUT);
    pinMode(7, INPUT);
    pinMode(8, INPUT);
    pinMode(9, INPUT);
    pinMode(11, INPUT);
    pinMode(12, INPUT);
    pinMode(13, INPUT);
    pinMode(A0, INPUT);
    pinMode(A1, INPUT);
    pinMode(A2, INPUT);
    pinMode(A3, INPUT);
    pinMode(A4, INPUT);
    pinMode(A5, INPUT);

    // Prepare to use the I2C bus.
    Wire.begin();

    // Send a command to the I/O Expander to save the current configuration.
    Wire.beginTransmission(0x20);
    Wire.write(0x30);       // Address of Command Register
    Wire.write(0x01);       // Command to store device configuration in EEPROM
    Wire.endTransmission();
}

void loop()
{
    // Wait for the program to be stopped.
    delay(1000);
}
{% endhighlight %}
  <hr/>

<a class="btn btn-default" href="SampleApps.htm" role="button">&laquo; Return to Samples</a>
