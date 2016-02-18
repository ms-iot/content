---
layout: default
title: MCP23017Sample
permalink: /en-US/win8/samples/MCP23017-Sample.htm
lang: en-US
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>Support for Windows on Intel Galileo Gen 1 and Gen 2 will end on November 30, 2015</u></h4>
	<p><h5>As we continue to focus on providing a great experience for Makers with Windows 10 IoT Core, we've made the difficult decision to discontinue Windows support on the Galileo platform. We've seen some fantastic innovation with the platform, but unfortunately, it does not meet the minimum hardware requirements for Windows 10 IoT Core. Please click <a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">here</a> to learn more.</h5></p>
</div>

# MCP23017 Sample
Use an MCP23017 - i2c 16 input/output port expander in a Windows Developer Program for IoT project.  This sample assumes you have been through the "HelloBlinky" sample and have already created a Windows On Devices Project.

## Add the MCP23017 Sample parts list
* 1 x MCP23017 ([Adafruit Products](http://www.adafruit.com/search?q=MCP23017){:target="_blank"})
* 4 x LEDs
* 4 x Resistors for the LEDs
* 2 x Resistors for the I2C lines
* 4 x Push buttons

## Create a new Project
Open Visual Studio. Select File -> New Project and Select Templates -> Visual C++ -> Windows for IoT -> Galileo Wiring app
![AppCreate]({{site.baseurl}}/Resources/images/Nuget_AppCreate.png)

## Add the MCP23017 Sample Code
You will need to add the MCP23017.h & MCP23017.cpp to your project from [Adafruit GitHub](https://github.com/adafruit/Adafruit-MCP23017-Arduino-Library){:target="_blank"} and update your Main.cpp.

## Main.cpp Code
{% highlight C++ %}
// Main.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "arduino.h"
#include "MCP23017.h"

//
// This sample supports 4 LEDs on port B of our MCP23017 IO expander
// and 4 buttons on port A of our expander.  It has 2 modes: "cycle mode"
// and "input mode".  By default, the program is in cycle mode, lighting
// each LED in sequence.  If the user presses a button, the program enters
// input mode where each button is able to light it's corresponding LED.
// If the user stops pressing buttons for 1.5 seconds, the program falls
// back into cycle mode.
//

// use an MCP23017 IO Expander on I2C address 0x20.
MCP23017 expander(0x20);

// Every program needs an entry point.  This is ours.
int _tmain(int argc, _TCHAR* argv[])
{
    return RunArduinoSketch();
}

// The setup function gets called once when the program starts.
void setup()
{
	// Initialize the IO Expander
	expander.Init();

	// Configure all 8 pins on port A for input
	expander.SetPortAInputPins(0xff);

	// Invert port A so that a low logic level (pressed) returns a high bit.
	expander.SetPortAInvert(0xff);

	// Add internal pull-up resistors to all the port A pins so that the default is "not pressed".
	expander.SetPortAPullUp(0xff);

	// Configure all 8 pins on port B for output
	expander.SetPortBInputPins(0x00);

	// Turn all teh LEDs off.
	expander.WritePortB(0x00);
}

// the loop routine runs over and over again forever.
void loop()
{
	// Is the program in "input mode"
	static bool inputMode = false;

	// Keep track of our last button press so we know when to fall out of input mode
	static unsigned long lastPressTime = 0;

	// How long without input (in milliseconds) before we fall out of input mode?
	const unsigned long timeout = 1500;

	// Keep track of which LEDs are lit when we're in cycle mode.
	static unsigned char lights = 0x01;

	// Read the buttons on the IO Expander
	unsigned char buttons = expander.ReadPortA();

	if (buttons != 0)
	{
		// If any buttons are pressed, go into input mode
		inputMode = true;
		lastPressTime = millis();
	}
	else
	{
		// If no buttons are pressed, check our timeout and possibly fall out of input mode
		if (millis() - lastPressTime >= timeout)
		{
			inputMode = false;
		}
	}

	if (inputMode)
	{
		// In input mode, light the LEDs according to the pressed buttons
		expander.WritePortB(buttons);
	}
	else
	{
		// In cycle mode, write the LEDs according to our cycle counter.
		expander.WritePortB(lights);

		// Shift to the next LED
		lights <<= 1;

		// If we've gone past the 4th LED, go back to the first one.
		if (lights >= 0x10)
		{
			lights = 0x01;
		}

		// And leave it lit for 100 milliseconds before cycling again.
		Sleep(100);
	}
}
{% endhighlight %}

## Wire your Galileo with an MCP23017
LEDs are diodes which will emit light when powered. They are polarized - meaning they work only when plugged in correctly.
![LED Wiring]({{site.baseurl}}/Resources/images/MCP23017Sample.png)


## Result
You should see the 4 LEDs blinking. Pressing a button will light the LED associated with that button until the button is released.

---
[&laquo; Return to Samples](SampleApps.htm){: .btn .btn-default}
