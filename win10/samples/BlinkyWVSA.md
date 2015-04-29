---
layout: default
title: Blinky WVSA
permalink: /win10/samples/BlinkyWVSA.htm
---

<div class="row">
  <h1>Get Started</h1>
  <div class="col-md-8">
    <p>Learn how to get your PC ready for developing IoT applications using Windows Remote Arduino.</p>
  </div>
  <ul class="nav nav-justified get-started-steps text-center">
      <li>
        <a href="{{site.baseurl}}/GetStarted.htm"><h3 class="inactive">1. Select Your Device</h3></a>
      </li>
      <li>
        <a href="{{site.baseurl}}/win10/SetupWVSA.htm"><h3 class="inactive">2. Set up your Device</h3></a>
      </li>
      <li>
        <a href="{{site.baseurl}}/win10/SetupPCWVSA.htm"><h3 class="inactive">3. Set up your PC</h3></a>
      </li>
      <li>
        <a href="{{site.baseurl}}/win10/samples/BlinkyWVSA.htm"><h3 class="active">4. Develop</h3></a>
      </li>
  </ul>
</div>

<div class="col-md-12" markdown="1">
#Hello World (Blinky) speech-enabled LED example

In your Arduino IDE (version 1.62 or better), go to the menu item File->Examples->VirtualShield->HelloWorld-Speech-Eventing.

Hook up an LED with a resister to pin 8 as per this diagram:
(image)

Run the Windows Virtual Shields for Arduino app.

Compile, and upload your Arduino sketch.

Your phone should welcome you. You can say 'on' or 'off' to turn on or off your LED.


##Arduino Wiring Sketch : Hello World example

{% highlight C++ %}
#include <ArduinoJson.h>

#include <VirtualShield.h>
#include <Text.h>
#include <Speech.h>
#include <Recognition.h>

VirtualShield shield;	          // identify the shield
Text screen = Text(shield);	      // connect the screen
Speech speech = Speech(shield);	  // connect text to speech
Recognition recognition = Recognition(shield);	  // connect speech to text

int LED_PIN = 8;

void recognitionEvent(ShieldEvent* event)
{
  if (event->resultId > 0) {
	digitalWrite(LED_PIN, recognition.recognizedIndex == 1 ? HIGH : LOW);
    screen.printAt(4, "Heard " + String(recognition.recognizedIndex == 1 ? "on" : "off"));
	recognition.listenFor("on,off", false);	    // reset up the recognition after each event
  }
}

// when Bluetooth connects, or the 'Refresh' button is pressed
void refresh(ShieldEvent* event)
{
    String message = "Hello Virtual Shields. Say the word 'on' or 'off' to affect the LED";

	screen.clear();
	screen.print(message);
    speech.speak(message);

	recognition.listenFor("on,off", false);	// NON-blocking instruction to recognize speech
}

void setup()
{
	pinMode(LED_PIN, OUTPUT);
	pinMode(LED_PIN, LOW);

	recognition.setOnEvent(recognitionEvent);	// set up a function to handle recognition events (turns auto-blocking off)
    shield.setOnRefresh(refresh);

    // begin() communication - you may specify a baud rate here, default is 115200
	shield.begin();
}

void loop()
{
	shield.checkSensors();		    // handles Virtual Shield events.
}
{% endhighlight %}
</div>
