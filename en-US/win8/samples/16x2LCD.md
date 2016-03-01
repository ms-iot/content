---
layout: default
title: 16x2 LCD
permalink: /en-US/win8/samples/16x2LCD.htm
lang: en-US
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>Support for Windows on Intel Galileo Gen 1 and Gen 2 will end on November 30, 2015</u></h4>
		<p><h5>As we continue to focus on providing a great experience for Makers with Windows 10 IoT Core, we've made the difficult decision to discontinue Windows support on the Galileo platform. We've seen some fantastic innovation with the platform, but unfortunately, it does not meet the minimum hardware requirements for Windows 10 IoT Core. Please click <a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">here</a> to learn more.</h5></p>
</div>

# 16x2 LCD
Learn how to use the 16x2 LCD shield with the Arduino Liquid Crystal Library.

# Required Components
* [16x2 LCD](https://www.sparkfun.com/products/255){:target="_blank"}
* a resistor that provides your desired contrast (look at your LCD's spec sheet)

# Hooking up Components
If you are using the 16x2 LCD listed above, follow the diagram below:

![16x2]({{site.baseurl}}/Resources/images/16x2LCDDiagram.png)

# Create a new project

1. Create a new project from the template.
1. Go to [Arduino's Liquid Crystal Library GitHub](https://github.com/arduino/Arduino/tree/master/libraries/LiquidCrystal){:target="_blank"} and download the LiquidCrystal.cpp and LiquidCrystal.h files.
1. Place the LiquidCrystal.cpp and LiquidCrystal.h files in your new project's folder via Windows Explorer
1. Based on your 16x2 LCD you may need to specify other pins for use with the LiquidCrystal library.
1. Replace the existing code in stdafx.h and main.cpp with the following code:

# Code

### stdafx.h
{% highlight C++ %}
// stdafx.h : include file for standard system include files,
// or project specific include files that are used frequently, but
// are changed infrequently
//

#pragma once

#include "targetver.h"

#include <stdio.h>
#include <tchar.h>
#include "arduino.h"
#include "LiquidCrystal.h" // we need this library for the LCD commands
{% endhighlight %}

### Main.cpp
{% highlight C++ %}
// Main.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"

int RS = 4;
int ENABLE = 5;

LiquidCrystal lcd = LiquidCrystal(RS, ENABLE, D6, D7, D8, D9); // define our LCD and which pins to use

int _tmain(int argc, _TCHAR* argv [])
{
    return RunArduinoSketch();
}

void setup()
{
    Log(L"LCD Sample\n");

    lcd.begin(16, 2); // need to specify how many columns and rows are in the LCD unit (it calls clear at the end of begin)

    lcd.setCursor(0, 0);
    lcd.print("Hello!");

    lcd.setCursor(0, 1);
    lcd.print(3.14159, 4); // prints a double, the 2nd number is the digits to print after the .
}

void loop()
{
}
{% endhighlight %}

---
[&laquo; Return to Samples](SampleApps.htm){:role="button"}{:class="btn btn-default"}
