---
layout: default
title: Servo
permalink: /en-US/win8/samples/Servo.htm
lang: en-US
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>Support for Windows on Intel Galileo Gen 1 and Gen 2 will end on November 30, 2015</u></h4>
	<p><h5>As we continue to focus on providing a great experience for Makers with Windows 10 IoT Core, we've made the difficult decision to discontinue Windows support on the Galileo platform. We've seen some fantastic innovation with the platform, but unfortunately, it does not meet the minimum hardware requirements for Windows 10 IoT Core. Please click <a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">here</a> to learn more.</h5></p>
</div>

# Servo
Learn how to use the basics of the Servo Library and interact with a Servo.

# Required Components
* [Micro Servo](http://www.adafruit.com/products/169){:target="_blank"}
* 3 wires to connect the servo

# Hooking up Components
If you are using a basic servo that does not require external power, this should be your configuration:<br/>
![]({{site.baseurl}}/Resources/images/ServoDiagram.png)

# Create a new project

1. Create a new project from the template.
1. Hook up the signal wire (orange if you are using the Micro Servo above) to pin 3 on your Galileo.
1. Hook up the ground wire (brown if you are using the Micro Servo above) to the Ground pin on your Galileo.
1. Hook up the voltage wire (red if you are using the Micro Servo above) to the 5V pin on your Galileo.
1. Replace the existing code in main.cpp with the following code:

# Code

### Main.cpp
{% highlight C++ %}
// Main.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "arduino.h"
#include <Servo.h>

int _tmain(int argc, _TCHAR* argv[])
{
    return RunArduinoSketch();
}

Servo myservo;  // create servo object to control a servo

int delayAmount = 2000; // used for spacing out calls
int pin = 3; // the pin that the Servo is on

void setup()
{
    myservo.attach(pin);  // attaches the servo on pin to the servo object
}

void loop()
{
    if (!myservo.attached())
    {
        Log("Servo is not attached\n");
        Log("Servo is attaching\n");
        myservo.attach(pin);
        if (myservo.attached())
        {
            Log("Servo is attached\n");
        }
    }
    else
    {
        Log("Servo is attached\n");
    }

    myservo.write(0); // tells the servo to go to angle 0
    Log("ServoIndex: %d\n", myservo.read());
    Log("ServoIndex in Microseconds: %d\n", myservo.readMicroseconds());
    delay(delayAmount);
    myservo.write(180); // tells the servo to go to angle 180
    Log("ServoIndex: %d\n", myservo.read());
    Log("ServoIndex in Microseconds: %d\n", myservo.readMicroseconds());
    delay(delayAmount);

    if (myservo.attached())
    {
        Log("Servo is attached\n");
        Log("Servo is detaching\n");
        myservo.detach();
        if (!myservo.attached())
        {
            Log("Servo is detached\n");
        }
    }
    else
    {
        Log("Servo is not attached\n");
    }
}

{% endhighlight %}

---

[&laquo; Return to Samples](SampleApps.htm){:role="button"}{:class="btn btn-default"}
