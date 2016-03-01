---
layout: default
title: Weather Shield 传感器
permalink: /zh-cn/win8/samples/WeatherShieldSensors.htm
lang: zh-cn
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>对 Intel Galileo 第 1 代和第 2 代的 Windows 的支持将于 2015 年 11 月 30 日结束</u></h4>
	<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台提供 Windows 支持。我们看到了平台上一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>
</div>

# Weather Shield 传感器
了解如何使用 Weather Shield 传感器创建简单的应用。

# 所需组件
* [Sparkfun Weather Shield](https://www.sparkfun.com/products/12081){:target="_blank"}

# 连接组件
将 Weather Shield 放置到 Galileo 开发板顶部，确保排好引脚顺序。

# 创建一个新项目

1. 使用模板创建新项目。
1. 转到 [HTU21D 存储库](https://github.com/sparkfun/HTU21D_Breakout){:target="_blank"}，并下载 HTU21D.cpp 和 HTU21D.h 文件。
1. 转到 [MPL3115A2 存储库](https://github.com/sparkfun/MPL3115A2_Breakout/){:target="_blank"}，并下载 MPL3115A2.cpp 和 MPL3115A2.h 文件。
1. 将 HTU21D 和 MPL3115A2 库文件放置在新项目中。
1. 使用以下代码替换 main.cpp 中的现有代码：

# 代码

### Main.cpp

{% highlight C++ %}
/*
Main.cpp : Defines the entry point for the console application.
*/

#include "stdafx.h"
#include "HTU21D.h"
#include "MPL3115A2.h"

#include "arduino.h"

MPL3115A2 myPressure;
HTU21D myHumidity;

int _tmain(int argc, _TCHAR* argv [])
{
    return RunArduinoSketch();
}

//Give me temperature in fahrenheit!
float readTempF()
{
    return((myPressure.readTemp() * 9.0) / 5.0 + 32.0); // Convert celsius to fahrenheit
}

void setup() {
    Log(L"WeatherShieldSample\n\n");

    // initialize the digital pin as an output.
    Wire.begin();        // Join i2c bus

    // Test Multiple slave addresses:
    Wire.beginTransmission(0x40);
    Wire.write(0xE7);  // Address of data to get
    Wire.endTransmission(false); // Send data to I2C dev with option for a repeated start. THIS IS NECESSARY and not supported before Arduino V1.0.1!
    if (Wire.requestFrom(0x40, 1) != 1)
    {
        Log(L"Error reading from humidity sensor\n");
    }

    byte status = Wire.read();
    Log(L"Humidity sensor status 0x%0x\n\n", status);

    myHumidity.begin();
    myPressure.begin();

    // Configure the sensor
    myPressure.setModeBarometer(); // Measure pressure in Pascals from 20 to 110 kPa
    myPressure.setOversampleRate(7); // Set Oversample to the recommended 128
    myPressure.enableEventFlags(); // Enable all three pressure and temp event flags
}

void loop()
{
    float pressure = myPressure.readPressure();
    Log(L"Pressure(Pa): %lf\n", pressure);
    float altitude = myPressure.readAltitudeFt();
    Log(L"altitude(Ft): %lf\n", altitude);
    float temperature = readTempF();
    Log(L"Temperature(F): %lf\n", temperature);
    float humidity = myHumidity.readHumidity();
    Log(L"Humidity(f): %lf\n\n", humidity);
}
{% endhighlight %}


---

[&laquo; 返回示例](SampleApps.htm){:role="button"}{:class="btn btn-default"}
