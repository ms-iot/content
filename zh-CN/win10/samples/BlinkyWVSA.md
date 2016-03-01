<h3>Hello World 支持语音的 LED 示例</h3>
<p>将你的 Windows Phone（或任何可能的 Windows 10 设备！）和 Arduino 按本教程的上述步骤准备就绪后，你现在便可以试用我们的示例。</p>
<ol class="inline-list">
  <li>通过将带有电阻器的 LED 连接到引脚 8 来准备你的 Arduino 开发板。</li>
  <li>确保你的 Arduino 仍然上载有 HelloWorld-Speech-Eventing 示例，然后将 Arduinos 插入电源。</li>
  <li>在你以前准备的 Windows Phone 上运行 Virtual Shields for Arduino 应用。</li>
  <li>如果正确完成所有设置，你的手机应使用音频提示欢迎你。你现在可以通过说“打开”或“关闭”来打开和关闭 Arduino 上的 LED。</li>
</ol>

<h3>Arduino 接线示意图： Hello World 示例</h3>

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
