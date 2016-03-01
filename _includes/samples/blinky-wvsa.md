<h3>Hello World speech-enabled LED example</h3>
<p>With your Windows Phone (or potentially any Windows 10 device!) and your Arduino prepared as detailed in the previous steps of this tutorial, you're now ready to try our sample.</p>
<ol class="inline-list">
  <li>Prepare your Arduino board by hooking up an LED with a resistor to pin 8.</li>
  <li>Make sure that your Arduino is still uploaded with the HelloWorld-Speech-Eventing sample, and then plug the Arduino into a power supply.</li>
  <li>Run the Windows Virtual Shields for Arduino app on the Windows Phone you prepared previously.</li>
  <li>If everything has been setup properly, your phone should connect to your Arduino sketch and welcome you with an audio cue. You can now say 'on' or 'off' to your Windows 10 device to switch the LED on your Arduino between on and off!</li>
</ol>

<h3>Arduino Wiring Sketch : Hello World example</h3>

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

<h3>More examples with Windows Virtual Shields for Arduino</h3>
<p>Now that you know the basics of using the Windows Virtual Shields for Arduino library, you can explore other projects using the technology.  View the sample <a href="https://www.youtube.com/watch?v=6twpmU7FRlA" target="_blank">here</a> for another simple example, and see the project <a href="https://www.hackster.io/windowsiot/virtual-shield-draw-mode-38db04" target="_blank">here</a> for an end-to-end solution.
