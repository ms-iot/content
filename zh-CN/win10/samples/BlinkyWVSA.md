---
layout: default
title: Blinky WVSA
permalink: /zh-CN/win10/samples/BlinkyWVSA.htm
lang: zh-CN
---

#入门

了解如何为使用 Windows Remote Arduino 开发 IoT 应用程序准备好你的电脑。

{% include steps.html device="WVSA" %}

##Hello World \(Blinky\) 支持语音的 LED 示例

在你的 Arduino IDE（版本 1.62 或更高版本）中，转到菜单项“文件”-\>“示例”-\>“VirtualShield”-\>“HelloWorld-语音-事件”。

根据此关系图使用一个电阻器将 LED 连接到引脚 8：（图）

运行适用于 Arduino 应用的 Windows 虚拟防火墙。

编译并上载你的 Arduino 草图。

你的手机应欢迎你。可以说“打开”或“关闭”来打开或关闭你的 LED。


##Arduino 接线示意图： Hello World 示例

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
