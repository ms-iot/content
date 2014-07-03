---
layout: default
title: Hello Blinky
permalink: /HelloBlinky.htm
---

<div class="container">
  <h1>Hello Blinky</h1>
  <p>Learn to Create, Deploy and Debug a Windows for Intel Galileo project.</p>
  <h3>Wire your Galileo with an LED</h3>
  <p>LEDs are a diode which will emit light when powered. They are polarized - meaning they work only when plugged in correctly. If you find that your LED isn't blinking when you run this sample - flip it.</p><p>In this sample, we are not protecting the LED with a resistor. It will dim over time.</p>
  <img src="images\HelloBlinky.png"/>

  <h3>Create a new Project</h3>
  <p>Open Visual Studio. Select File -> New Project and Select Templates -> Visual C++ -> Windows for IoT -> Galileo Wiring app:<br>
  <img src="images/Nuget_AppCreate.png"/></p>

  <p>Open <kbd>main.cpp</kbd> and replace the code with the following:<br>
{% highlight C++ %}
#include "stdafx.h"
#include "arduino.h"

int _tmain(int argc, _TCHAR* argv[])
{
  return RunArduinoSketch();
}

int led = 13;  // This is the pin the LED is attached to.

void setup()
{
  pinMode(led, OUTPUT); // Configure the pin for OUTPUT so you can turn on the LED.
}

// the loop routine runs over and over again forever:
void loop()
{
  digitalWrite(led, LOW);    // turn the LED off by making the voltage LOW
  Log(L"LED OFF\n");
  delay(1000);               // wait for a second
  digitalWrite(led, HIGH);    // turn the LED on by making the voltage HIGH
  Log(L"LED ON\n");
  delay(1000);               // wait for a second
}
{% endhighlight %}

  <h3>Build and deploy</h3>
  <p>Press F5 to build and deploy your project.</p>
  <p>You may be prompted for credentials. Enter:<br/>
  Username: <kbd>mygalileo\Administrator</kbd><br/>
  Password: <kbd>admin</kbd><br/></p>
  <p><img src="images/VSDeployCred.png" /></p>

  <h3>Result</h3>
  <p>You should see the light blinking. If it isn't blinking, try reversing the LED leads.</p>
  <hr/>

  <a class="btn btn-default" href="SampleApps.htm" role="button">&laquo; Return to Samples</a>
