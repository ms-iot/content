---
layout: default
title: 你好，Blinky
permalink: /zh-cn/win10/samples/arduino-wiring/HelloBlinky.htm
lang: zh-cn
---

# 你好，Blinky
了解如何在 Raspberry Pi 2 和 3 或 Minnowboard Max 上部署和调试 Arduino 接线草图以使 LED 闪烁！

## 设置

按照 [Arduino 接线项目指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)创建新的接线项目！

## 代码

此代码包含在 Arduino 接线项目的默认模板中，同时包含在此处（含有其他注释）以供参考。

如果你使用的是 Raspberry Pi，可以选择使用内置 LED，方法是使 `int pin = LED_BUILTIN` 保持原样，在此情况下你无需将 LED 接入 Pi。如果你想要使用 GPIO 引脚，请将此更改为相应的引脚宏（如 `GPIO_5`），并照常按照“将 RPi2 与 LED 连接”部分中的说明进行操作。

{% highlight C++ %}

#if defined(_M_IX86) || defined(_M_X64) // MBM
int pin = GPIO_5;       // Or any other pin available on MBM
#elif defined (_M_ARM) // RPI2
int pin = LED_BUILTIN;  // Or any other pin available on RPI2
#endif


void setup()
{
    // put your setup code here, to run once:
    pinMode(pin, OUTPUT);
}

void loop()
{
    // put your main code here, to run repeatedly:

    digitalWrite(pin, LOW);
    delay(500);
    digitalWrite(pin, HIGH);
    delay(500);
}


{% endhighlight %}


## 将 RPi2 或 RPi3 与 LED 连接

LED 是会在供电时发光的二极管。它们有两极，这意味着它们只有在正确地接通电源时才会工作。通常情况下，较长的脚是正极，较短的脚是负极。此外，如果电路中没有电阻器，决不可以将 LED 直接连接电源和地线。如果没有电阻器降低电流，将烧坏 LED（最好的情况下）并且可能损坏其他硬件！ 对于 LED，通常使用 220 欧姆或 330 欧姆电阻器，但在 220 - 1000 欧姆 \(1Kohm\) 范围内均可接受。

请注意，我们在上述草图中使用的是 `GPIO_5`。这是映射到 Raspberry Pi 2 和 3 上的特定引脚的特殊值。如果将 LED 的正极脚连接到相同引脚，则当我们将该引脚切换为“高”时，在此草图中电路将获得电源，从而打开 LED。下面的 Fritzing 图显示了此连接。如果你希望使用另一个 GPIO 引脚，则需要同时更改草图中的 `GPIO_x` 值（其中 `x` 是 GPIO 引脚编号）以及 LED 的物理接线。

下面是 Raspberry Pi 2 的引出线图：![RPI 引出线]({{site.baseurl}}/Resources/images/arduino_wiring/pi2_pinouts.png)

### Fritzing 图

![LED 接线]({{site.baseurl}}/Resources/images/arduino_wiring/led_fritz.png)

## 生成和部署
按 F5 来生成并部署项目。

有关如何部署应用的详细说明，请参阅 [Arduino 接线项目指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)！

## 结果
你应该可以看到 LED 一亮一暗地闪烁，每种状态约有半秒钟。如果它未闪烁，请尝试倒转 LED 引线。

## 是否遇到难题？

有关在处理 Arduino 接线草图时会遇到的常见问题和关注内容，请参阅 [Arduino 接线移植指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm)。

---

[&laquo; 返回到示例]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm){:role="button"}{:class="btn btn-default"}
