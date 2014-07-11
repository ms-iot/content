---
layout: default
title: Hello Blinky
permalink: /HelloBlinky.htm
---

<div class="container">
  <h1>Hello Blinky</h1>
  <p>Learn to Create, Deploy and Debug a Windows Developer Program for IoT project.</p>

  <h3>Create a new Project</h3>
  <p>Open Visual Studio. Select File -> New Project and Select Templates -> Visual C++ -> Windows for IoT -> Galileo Wiring app</p>
  <img src="images/Nuget_AppCreate.png"/>

  <h3>Code</h3>
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
  <i>This code is included in the default template, and is included here for reference.</i>

  <h3>Wire your Galileo with an LED</h3>
  <p>LEDs are diodes which will emit light when powered. They are polarized - meaning they work only when plugged in correctly. Typically, the longer leg is the positive lead, so plug it into pin 13 and the shorter leg into ground.</p>
  <img src="images\HelloBlinky.png"/>
  <p>NOTE: In this sample, we are not protecting the LED with a resistor. It will dim over time. Also, the color of the LED can vary, without creating problems.</p>

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
