---
layout: default
title: LCD 文本屏幕
permalink: /zh-cn/win10/samples/arduino-wiring/LCDScreen.htm
lang: zh-cn
---

#LCD 文本屏幕

{% include VerifiedVersion.md %}

了解如何在 Raspberry Pi 2 或 Minnowboard Max 上部署和调试 Arduino 接线草图以控制 LCD 屏幕上的文本！

##设置

按照 [Arduino 接线项目指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)创建新的接线项目！

##硬件

在此示例中，我们使用常见的 16 引脚 LCD 屏幕，类似于 Adafruit 中的[此屏幕](https://www.adafruit.com/products/181)。我们使用的确切模型是 **LCM1602C**，但重要的是你应使用可与 Arduino [ LiquidCrystal](https://www.arduino.cc/en/Reference/LiquidCrystal) 库兼容的 16 引脚 LCD。此设备通常包含在 Arduino 初学者工具包中，它是一块出色的 LCD 屏幕（有两排屏幕），并且完全受 GPIO 控制。

你还需要几根电线、一个电位计和一个 220 欧姆的电阻器。

##硬件设置

下面是 Fritzing 图以及我们在代码中使用的确切引出线表。我们还包含了 RPi2 GPIO 标头和 LCD 屏幕的引出线图以供参考。如果需要有关 LCD 屏幕的其他帮助，Adafruit 的网站上有关于[连接 16 引脚 LCD 屏幕](https://learn.adafruit.com/character-lcds)的非常出色的指南。

###Fritzing 图

![LCD Fritzing 图]({{site.baseurl}}/Resources/images/arduino_wiring/pi2_lcd_fritz.png)

####注意：

* VEE 是对比度引脚。如果你想要最大对比度，可以将其连接到 5V。如果你想要能够控制对比度，请将此引脚连接到电位计的输出（如 Fritzing 图所示）！
* R/W 是读/写引脚。在此演示中，你可以将其连接到地线（用于写入）。如果你想要自定义你的草图以便能够读取或写入，请将该引脚连接到另一个 GPIO 引脚，并在需要读取和“低”写入时将其设置为“高”。
* 此演示中未使用 D0 - D3。

###引脚映射表

{:.table.table-bordered .devices}
| LCD 引脚 | Raspberry Pi2 引脚 |
|---------|-------------------|
| GND | 任何接地引脚 |
| VCC | 5V DC（02 或 04） |
| VEE | 5V DC 或 POT 输出 \* |
| RS | GPIO\_20 |
| R/W | 接地或任何其他 GPIO 引脚 \* |
| E | GPIO\_16 |
| D0 | *无* \* |
| D1 | *无* \* |
| D2 | *无* \* |
| D3 | *无* \* |
| D4 | GPIO\_2 |
| D5 | GPIO\_3 |
| D6 | GPIO\_4 |
| D7 | GPIO\_17 |
| BL+ | **使用 220 欧姆电阻器**的 5V DC |
| BL- | 地线 |

###参考图

| LCD 引出线 | Raspberry Pi 2 引出线 |
|:-----------:|:----------------------:|
| ![LCD 屏幕]({{site.baseurl}}/Resources/images/arduino_wiring/lcd_16pins.jpg) | ![RPI 引出线]({{site.baseurl}}/Resources/images/arduino_wiring/pi2_pinouts.png) |

##所需的库

你将需要 LiquidCrystal 库，它包含在 Arduino SDK 中！ 你可以从 Arduino 库文件夹（通常为 C:\\Program Files \(x86\)\\Arduino\\libraries\\LiquidCrystal\\src）中复制两个文件 `LiquidCrystal.h` 和 `LiquidCrystal.cpp`，并将其粘贴到你的解决方案目录中！ 然后，将这两个文件从解决方案目录中拖动到 Visual Studio 中的项目中（通过“解决方案资源管理器”）。


##代码

使用以下代码替换主 .ino 文件中的现有代码：

{% highlight C++ %}

#include <LiquidCrystal.h>

int enablePin = GPIO_16;
int registerSelectPin = GPIO_20;
int dataPin11 = GPIO_2;
int dataPin12 = GPIO_3;
int dataPin13 = GPIO_4;
int dataPin14 = GPIO_17;

//create a pointer to an instance of LiquidCrystal, yet to be created
LiquidCrystal *lcd;

void setup() {
	//create the LiquidCrystal instance with the pins as set
    lcd = new LiquidCrystal( registerSelectPin, enablePin, dataPin11, dataPin12, dataPin13, dataPin14 );
	
    // set up the LCD's number of columns and rows:
    lcd->begin( 16, 2 );
	
    // Print a message to the LCD.
    lcd->print( "hello, world!" );
}

void loop() {
    // set the cursor to column 0, line 1
    // (note: line 1 is the second row, since counting begins with 0):
    lcd->setCursor( 0, 1 );
	
    // print the number of seconds since reset:
    lcd->print( millis() / 1000 );
}


{% endhighlight %}


##生成和部署
按 F5 来生成并部署项目。

有关如何部署应用的详细说明，请参阅 [Arduino 接线项目指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)！

##结果
你应该可以看到 LCD 屏幕的顶行显示“Hello，World!”，应用运行的当前秒数显示在第二行！

![Hello World]({{site.baseurl}}/Resources/images/arduino_wiring/lcd_helloworld.jpg)

##是否遇到难题？

有关在处理 Arduino 接线草图时会遇到的常见问题和关注内容，请参阅 [Arduino 接线移植指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm)。

---

[&laquo; 返回到示例]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm){:role="button"}{:class="btn btn-default"}
