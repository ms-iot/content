---
layout: default
title: Blinky WVSA
permalink: /en-US/win10/samples/BlinkyWVSA.htm
lang: en-US
---

#Get Started

Learn how to get your PC ready for developing IoT applications using Virtual Shields for Arduino.

{% include steps.html device="WVSA" %}

##Hello World speech-enabled LED example

With your Windows Phone (or potentially any Windows 10 device!) and your Arduino prepared as detailed in the previous steps of this tutorial, you're now ready to try our sample.

1. Prepare your Arduino board by hooking up an LED with a resistor to pin 8 as per this diagram:
(image)
2. Make sure that your Arduino is still uploaded with the HelloWorld-Speech-Eventing sample, and then plug the Arduino into a power supply.
3. Run the Virtual Shields for Arduino app on the Windows Phone you prepared previously.
4. If everything has been setup properly, your phone should welcome you with an audio cue. You can now say 'on' or 'off' to switch the LED on your Arduino between on and off! 


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
