---
layout: default
title: 16x2 LCD
permalink: /zh-cn/win8/samples/16x2LCD.htm
lang: zh-cn
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>对 Intel Galileo 第 1 代和第 2 代上的 Windows 的支持将于 2015 年 11 月 30 日结束</u></h4>
		<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台的 Windows 支持。我们看到了平台的一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>
</div>

# 16x2 LCD
了解如何借助 Arduino 液晶库使用 16x2 LCD 防火墙。

# 所需组件
* [16x2 LCD](https://www.sparkfun.com/products/255){:target="_blank"}
* 提供所需对比度的电阻器（查看 LCD 的规格表）

# 连接组件
如果使用上面列出的 16x2 LCD，请按照以下关系图：

![16x2]({{site.baseurl}}/Resources/images/16x2LCDDiagram.png)

# 创建一个新项目

1. 从模板创建新项目。
1. 转到 [Arduino 的液晶库 GitHub](https://github.com/arduino/Arduino/tree/master/libraries/LiquidCrystal){:target="_blank"}，然后下载 LiquidCrystal.cpp 和 LiquidCrystal.h 文件。
1. 通过 Windows 资源管理器，在新项目的文件夹中放置 LiquidCrystal.cpp 和 LiquidCrystal.h 文件
1. 根据你可能需要的 16x2 LCD 指定其他引脚以供 LiquidCrystal 库使用。
1. 将在 stdafx.h 和 main.cpp 中的现有代码替换为以下代码：

# 代码

### stdafx.h

{% highlight C++ %}
// stdafx.h : include file for standard system include files,
// or project specific include files that are used frequently, but
// are changed infrequently
//

#pragma once

#include "targetver.h"

#include <stdio.h>
#include <tchar.h>
#include "arduino.h"
#include "LiquidCrystal.h" // we need this library for the LCD commands
{% endhighlight %}

### Main.cpp

{% highlight C++ %}
// Main.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"

int RS = 4;
int ENABLE = 5;

LiquidCrystal lcd = LiquidCrystal(RS, ENABLE, D6, D7, D8, D9); // define our LCD and which pins to use

int _tmain(int argc, _TCHAR* argv [])
{
    return RunArduinoSketch();
}

void setup()
{
    Log(L"LCD Sample\n");

    lcd.begin(16, 2); // need to specify how many columns and rows are in the LCD unit (it calls clear at the end of begin)

    lcd.setCursor(0, 0);
    lcd.print("Hello!");

    lcd.setCursor(0, 1);
    lcd.print(3.14159, 4); // prints a double, the 2nd number is the digits to print after the .
}

void loop()
{
}
{% endhighlight %}

---
[&laquo; 返回到示例](SampleApps.htm){:role="button"}{:class="btn btn-default"}
