---
layout: default
title: 智能风扇
permalink: /zh-cn/win8/samples/SmartFan.htm
lang: zh-cn
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>对 Intel Galileo 第 1 代和第 2 代的 Windows 的支持将于 2015 年 11 月 30 日结束</u></h4>
	<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台提供 Windows 支持。我们看到了平台上一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>
</div>

# 智能风扇
使用在大多数 Arduino 工具包中都能够找到的基本组件开发智能风扇，该风扇可根据温度和当前照明打开和关闭。

## 所需组件
* 光敏电阻器
* 10k 欧姆电阻器
* 温度传感器
* 晶体管 \(P2N2222AG\)
* 二极管 \(1N4148\)
* 直流电机
* 330 欧姆电阻器
* 电线
* 试验板

## 连接组件
请确保使用二极管以防止电机烧毁，并确保将正确的电阻器用于光敏电阻器和温度传感器。请勿混淆温度传感器和晶体管，因为这会使晶体管过热。<br /> <img src="{{site.baseurl}}/Resources/images/SmartFanDiagram.png" />

## 创建一个新项目
打开 Visual Studio。依次选择“文件”-\>“新建项目并选择模板”-\>“Visual C++”-\>“Windows for IoT”-\>“Galileo Wiring 应用”

## 代码

### Main.cpp

{% highlight C++ %}
#include "stdafx.h"
#include "arduino.h"

const int MOTOR_PIN    = 10;
const int LIGHT_PIN    = 1;
const int TEMP_PIN     = 0;

// In celcius
const double FAN_ON_TEMP = 20.0;

int _tmain(int argc, _TCHAR* argv[])
{
    return RunArduinoSketch();
}

void init_motor() {
    pinMode(MOTOR_PIN, OUTPUT);
    analogWrite(MOTOR_PIN, 0);
}

void toggle_motor(bool motor_is_on) {
    if (motor_is_on) {
        // Turn off motor
        motor_is_on = false;
        analogWrite(MOTOR_PIN, 0);
	} else {
        // Turn on motor
        motor_is_on = true;
        analogWrite(MOTOR_PIN, 150);
        delay(1);
        analogWrite(MOTOR_PIN, 50);
    }
}

void setup() {
    init_motor();
}

// Analog read returns between 0 - 4095
// Reading between 0 - 5 V Therefore 5 volts / 1024 units
double raw_to_voltage(int reading) {
    return reading * (5.0 / 4096.0);
}

// Convert the voltage
double voltage_to_celcius(double voltage) {
    return 100 * voltage - 50;
}

bool auto_tune_light(int light_sensor_reading) {
    static int min_reading = 4096;
    static int max_reading = 0;
    min_reading = min(min_reading, light_sensor_reading);
    max_reading = max(max_reading, light_sensor_reading);

    // Arbitrary choice here
    if (max_reading - min_reading < 50) return false;

    return (light_sensor_reading > (max_reading - min_reading) * 0.4 + min_reading);
}

int compare_ints(const void* a, const void* b)   // comparison function
{
    int arg1 = *reinterpret_cast<const int*>(a);
    int arg2 = *reinterpret_cast<const int*>(b);
    if (arg1 < arg2) return -1;
    if (arg1 > arg2) return 1;
    return 0;
}

int median_filter(int data_point) {
    static const size_t FRAME_SIZE = 10;
    static int data[FRAME_SIZE];
    static int sorted_data[FRAME_SIZE];
    static size_t data_size = 0;

    //shift data
    data_size = min(FRAME_SIZE, data_size + 1);
    for (int i = data_size - 1; i > 0; i--) {
        data[i] = data[i - 1];
    }
    //add in new value
    data[0] = data_point;

    // Create a sorted array
    memcpy(sorted_data, data, data_size * sizeof(int));
    std::qsort(sorted_data, data_size, sizeof(int), compare_ints);

    // Get median
    return sorted_data[data_size / 2];
}

void loop() {
    static bool motor_is_on = false;

    int light_sensor_reading = analogRead(LIGHT_PIN);
    int temp_sensor_reading  = analogRead(TEMP_PIN);

    int filtered_temp = median_filter(temp_sensor_reading);

    double temp_in_c = voltage_to_celcius(raw_to_voltage(filtered_temp));
    bool is_light = auto_tune_light(light_sensor_reading);

    Log(L"Temp: %f\r\n", temp_in_c);
    Log(L"Light: %d\r\n", light_sensor_reading);

    if (is_light && temp_in_c >= FAN_ON_TEMP && !motor_is_on) {
        toggle_motor(motor_is_on);
        motor_is_on = true;
        Log(L"Motor On\r\n");
    } else if ((!is_light || temp_in_c < FAN_ON_TEMP) && motor_is_on) {
        toggle_motor(motor_is_on);
        motor_is_on = false;
        Log(L"Motor Off\r\n");
    }
}
{% endhighlight %}

## 冷却附加设备
以下信息为可选内容，但可帮助你对开发可能性有所了解。

### 使用 3D 打印机
3D 打印是为你的项目添加装饰、功能性、特征的绝佳方法。对于此特定项目，请尝试从下方提供的链接打印出扇叶或 Intel Galileo 案例。<br /> <a href="http://www.thingiverse.com/thing:322873">扇叶</a><br /> <a href="http://www.thingiverse.com/thing:231507">Intel Galileo 案例</a>

<img style="max-width:100%;margin:20px" src="{{site.baseurl}}/Resources/images/3dfanparts.png" /> <img style="max-width:100%;margin:20px" src="{{site.baseurl}}/Resources/images/3dfanparts_pic.JPG" />

在 <a href="http://www.thingiverse.com">www.thingiverse.com</a> 上可找到更多示例和 3D 模型。请确保通过有策略地分布各个部分来提高打印效率。

### 使用 Web 应用程序控制风扇
创建允许你设置环境温度或控制风扇速度的 Web 应用程序。

### 为风扇添加传感器并增加复杂性
连接 RGB 光以更改颜色，具体取决于风扇速度或室内温度。

### 是否要发挥自己的创意？
我们希望了解你的想法并查看你的附加设备。通过电子邮件向我们发送一小段视频剪辑，展示你为 SmartFan 新添加的出色功能，你将有机会向全世界分享你的想法。


<a class="btn btn-default" href="SampleApps.htm" role="button">&laquo; 返回示例</a>
