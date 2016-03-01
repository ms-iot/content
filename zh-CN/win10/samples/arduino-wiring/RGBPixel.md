---
layout: default
title: RGBPixel
permalink: /zh-cn/win10/samples/arduino-wiring/RGBPixel.htm
lang: zh-cn
---

# Adafruit RGB 像素带

{% include VerifiedVersion.md %}

了解如何在 Raspberry Pi 2 或 Minnowboard Max 上部署 Arduino 接线草图以控制 RGB 像素带。

![]({{site.baseurl}}/Resources/images/RGBPixel.jpg){:width="400"}

# 所需组件
* [RGB 像素带](http://www.adafruit.com/products/306){:target="_blank"}
* [5V 电源（警告：不可超过 6V 直流）](http://www.adafruit.com/products/276){:target="_blank"}
    * 注意： 像素带每 2.5" 带段会吸取 120mA，所以请相应地选择你的电源。
* [母直流电源适配器](http://www.adafruit.com/products/368){:target="_blank"}

# 连接组件
* [如何给装有直流电源和母直流电源适配器的像素带通电](https://learn.adafruit.com/digital-led-strip/powering){:target="_blank"}
* [如何连接 RGB 像素带以供使用。](https://learn.adafruit.com/digital-led-strip/wiring){:target="_blank"}

# 设置

按照 [Arduino 接线项目指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)创建新的 Arduino 接线项目！

# 代码

使用以下代码替换主 .ino 文件中的现有代码：

{% highlight C++ %}

//verify these variables correspond with the pins you've attached your LED strip to and the number of LEDs on your strip.
const int stripClock = GPIO_6;	//Raspberry Pi2 Pin 31
const int stripData = GPIO_5;	//Raspberry Pi2 Pin 29
const int stripLen = 48;

typedef struct _PIXEL_VALUES {
    BYTE Green;
    BYTE Red;
    BYTE Blue;
} PIXEL_VALUES, *PPIXEL_VALUES;

// Array of stored Pixel values
PIXEL_VALUES Pixels[stripLen];

// Sets the pixel color in our array
void SetPixel(int pixel, BYTE Red, BYTE Green, BYTE Blue)
{
    if (pixel < stripLen)
    {
        Pixels[pixel].Red = Red | 0x80;
        Pixels[pixel].Green = Green | 0x80;
        Pixels[pixel].Blue = Blue | 0x80;
    }
}

// Sends the color of a pixel to the strip
void ShiftPixel(int pixel)
{
    PPIXEL_VALUES PixelValues = &Pixels[pixel];
    BYTE bit;
    int i;

    for (i = 7; i >= 0; i--)
    {
        bit = (PixelValues->Green >> i) & 0x01;
        digitalWrite(stripData, bit);
        digitalWrite(stripClock, HIGH);
        digitalWrite(stripClock, LOW);
    }
    for (i = 7; i >= 0; i--)
    {
        bit = (PixelValues->Red >> i) & 0x01;
        digitalWrite(stripData, bit);
        digitalWrite(stripClock, HIGH);
        digitalWrite(stripClock, LOW);
    }
    for (i = 7; i >= 0; i--)
    {
        bit = (PixelValues->Blue >> i) & 0x01;
        digitalWrite(stripData, bit);
        digitalWrite(stripClock, HIGH);
        digitalWrite(stripClock, LOW);
    }
}

// Sends all the pixel colors to the strip
void ShiftAllPixels()
{
    int i;

    digitalWrite(stripData, 0);
    for (i = 0; i < 8; i++)
    {
        digitalWrite(stripClock, HIGH);
        digitalWrite(stripClock, LOW);
    }
    for (i = 0; i < 8; i++)
    {
        digitalWrite(stripClock, HIGH);
        digitalWrite(stripClock, LOW);
    }
    for (i = 0; i < 8; i++)
    {
        digitalWrite(stripClock, HIGH);
        digitalWrite(stripClock, LOW);
    }

    for (i = 0; i < stripLen; i++)
    {
        ShiftPixel(i);
    }

    digitalWrite(stripData, 0);
    for (i = 0; i < 8; i++)
    {
        digitalWrite(stripClock, HIGH);
        digitalWrite(stripClock, LOW);
    }
    for (i = 0; i < 8; i++)
    {
        digitalWrite(stripClock, HIGH);
        digitalWrite(stripClock, LOW);
    }
}

void setup()
{
    // Set pins to outputs
    pinMode(stripClock, OUTPUT);
    pinMode(stripData, OUTPUT);
    digitalWrite(stripClock, LOW);
    digitalWrite(stripData, LOW);

    // Reset all the pixels
    for (int i = 0; i < stripLen; i++)
    {
        SetPixel(i, 0, 0, 0);
    }
    ShiftAllPixels();
}

void loop()
{
    int i;

    // Set the pixels to Red
    for (i = 0; i < stripLen; i++)
    {
        SetPixel(i, (i & 0x7F), 0, 0);
    }
    ShiftAllPixels();
    delay( 1000 );

    // Set the pixels to Green
    for (i = 0; i < stripLen; i++)
    {
        SetPixel(i, 0, (i & 0x7F), 0);
    }
    ShiftAllPixels();
    delay( 1000 );

    // Set the pixels to Blue
    for (i = 0; i < stripLen; i++)
    {
        SetPixel(i, 0, 0, (i & 0x7F));
    }
    ShiftAllPixels();
    delay( 1000 );

    // Set the pixels to White
    for (i = 0; i < stripLen; i++)
    {
        SetPixel(i, (i & 0x7F), (i & 0x7F), (i & 0x7F));
    }
    ShiftAllPixels();
    delay( 1000 );

    // Set the pixels to gradient from Yellow to Cyan
    for (i = 0; i < stripLen; i++)
    {
        SetPixel(i, ((stripLen - i) & 0x7F), ((128 + (stripLen / 2) + i) & 0x7F), (i & 0x7F));
    }
    ShiftAllPixels();
    delay( 1000 );

    // Set the pixels to random colors
    for (i = 0; i < stripLen; i++)
    {
        SetPixel(i, (BYTE) random(0, 40), (BYTE) random(0, 40), (BYTE) random(0, 40));
    }
    ShiftAllPixels();
    delay( 1000 );

    // Turn the pixels off
    for (i = 0; i < stripLen; i++)
    {
        SetPixel(i, 0, 0, 0);
    }
    ShiftAllPixels();
    delay( 1000 );
}
{% endhighlight %}

##生成和部署
按 F5 来生成并部署项目。

有关如何部署应用的详细说明，请参阅 [Arduino 接线项目指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)！

##结果
你应该看到 LED 像素带轮换一系列颜色，在每种排列方式上花费大约 1 秒。

##是否遇到难题?

有关在处理 Arduino 接线草图时会遇到的常见问题和关注内容，请参阅 [Arduino 接线移植指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm)。

---

[&laquo; 返回到示例]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm){:role="button"}{:class="btn btn-default"}
