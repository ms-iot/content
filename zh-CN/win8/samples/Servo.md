---
layout: default
title: 伺服
permalink: /zh-cn/win8/samples/Servo.htm
lang: zh-cn
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>对 Intel Galileo 第 1 代和第 2 代的 Windows 的支持将于 2015 年 11 月 30 日结束</u></h4>
	<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台提供 Windows 支持。我们看到了平台上一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>
</div>

# 伺服
了解如何使用伺服库的基础知识以及如何与伺服交互。

# 所需组件
* [Micro 伺服](http://www.adafruit.com/products/169){:target="_blank"}
* 连接伺服的 3 条线

# 连接组件
如果使用无需外部电源的基本伺服，应进行如下配置：<br/> ![]({{site.baseurl}}/Resources/images/ServoDiagram.png)

# 创建一个新项目

1. 使用模板创建新项目。
1. 在 Galileo 上将信号线（如果使用上述的 Micro 伺服，则为橘黄色线）连接到引脚 3。
1. 在 Galileo 上将地线（如果使用上述的 Micro 伺服，则为棕色线）连接到地线引脚。
1. 在 Galileo 上将电压线（如果使用上述的 Micro 伺服，则为红色线）连接到 5V 引脚。
1. 使用以下代码替换 main.cpp 中的现有代码：

# 代码

### Main.cpp

{% highlight C++ %}
// Main.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "arduino.h"
#include <Servo.h>

int _tmain(int argc, _TCHAR* argv[])
{
    return RunArduinoSketch();
}

Servo myservo;  // create servo object to control a servo

int delayAmount = 2000; // used for spacing out calls
int pin = 3; // the pin that the Servo is on

void setup()
{
    myservo.attach(pin);  // attaches the servo on pin to the servo object
}

void loop()
{
    if (!myservo.attached())
    {
        Log("Servo is not attached\n");
        Log("Servo is attaching\n");
        myservo.attach(pin);
        if (myservo.attached())
        {
            Log("Servo is attached\n");
        }
    }
    else
    {
        Log("Servo is attached\n");
    }

    myservo.write(0); // tells the servo to go to angle 0
    Log("ServoIndex: %d\n", myservo.read());
    Log("ServoIndex in Microseconds: %d\n", myservo.readMicroseconds());
    delay(delayAmount);
    myservo.write(180); // tells the servo to go to angle 180
    Log("ServoIndex: %d\n", myservo.read());
    Log("ServoIndex in Microseconds: %d\n", myservo.readMicroseconds());
    delay(delayAmount);

    if (myservo.attached())
    {
        Log("Servo is attached\n");
        Log("Servo is detaching\n");
        myservo.detach();
        if (!myservo.attached())
        {
            Log("Servo is detached\n");
        }
    }
    else
    {
        Log("Servo is not attached\n");
    }
}

{% endhighlight %}

---

[&laquo; 返回示例](SampleApps.htm){:role="button"}{:class="btn btn-default"}
