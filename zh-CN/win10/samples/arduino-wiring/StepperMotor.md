---
layout: default
title: 步进马达
permalink: /zh-cn/win10/samples/arduino-wiring/StepperMotor.htm
lang: zh-cn
---

# 步进马达

{% include VerifiedVersion.md %}

了解如何在控制步进马达的 Raspberry Pi 2 或 Minnowboard Max 上创建 Arduino 接线草图。该应用在一个循环中以默认正向模式、默认反向模式和小步正向模式的方式运行该马达。

##设置

按照 [Arduino 接线项目指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)创建新的布接线项目！

## 所需组件
* [Sparkfun 步进马达 - 68 oz.in](https://www.sparkfun.com/products/10846)
* [Sparkfun Big Easy Driver](https://www.sparkfun.com/products/12859)

## 连接组件

根据以下 Fritzing 图连接电路。

![步进 Fritzing]({{site.baseurl}}/Resources/images/arduino_wiring/StepperMotorFritz.PNG)

1. 首先将 Raspberry Pi 2 连接到 Big Easy Driver。
   1. 将该驱动程序上的 ENABLE 引脚连接到 Pi 上的引脚 12 \(GPIO 18\)。
   2. 将该驱动程序上的 MS1、MS2 和 MS3 引脚分别连接到引脚 36、38 和 40。（GPIO 16、GPIO 20 和 GPIO 21）
   3. 将该驱动程序上的 STEP 引脚连接到 Pi 上的引脚 10 \(GPIO 15\)。
   4. 将该驱动程序上的 DIR 引脚连接到 Pi 上的引脚 8 \(GPIO 14\)。
   5. 最后，将该驱动程序上的 GND 引脚连接到 Pi 上的引脚 39。
2. 接下来，将马达连接到该驱动程序。该马达的黑色和绿色电缆连接到驱动程序上标有“A”的引脚，而马达上的红色和蓝色电缆连接到驱动程序上标有“B”的引脚。
3. 向该驱动程序提供 12V/2A 电源，方法为将电源的正极引线连接到驱动程序上标有“M+”的引脚，而将负极引线连接到标有“GND”的引脚。

## 代码

使用以下代码替换主 .ino 文件中的现有代码：

{% highlight C++ %}

UCHAR stp = GPIO_15;
UCHAR dir = GPIO_14;
UCHAR MS1 = GPIO_16;
UCHAR MS2 = GPIO_20;
UCHAR MS3 = GPIO_21;
UCHAR EN = GPIO_18;

//Declare variables for functions
int x;

void setup() {
	pinMode(stp, OUTPUT);
	pinMode(dir, OUTPUT);
	pinMode(MS1, OUTPUT);
	pinMode(MS2, OUTPUT);
	pinMode(MS3, OUTPUT);
	pinMode(EN, OUTPUT);
	digitalWrite(EN, LOW); //Pull enable pin low to set FETs active and allow motor control
}

//Main loop
void loop() {
	//Step Forward Default
	digitalWrite(dir, LOW); //Pull direction pin low to move "forward"
	digitalWrite(MS1, LOW);
	digitalWrite(MS2, LOW);
	digitalWrite(MS3, LOW);
	for (x = 1; x<1000; x++)  //Loop the forward stepping enough times for motion to be visible
	{
		digitalWrite(stp, HIGH); //Trigger one step forward
		delay(1);
		digitalWrite(stp, LOW); //Pull step pin low so it can be triggered again
		delay(1);
	}
	delay(1000);
	
	//Step Reverse Default
	digitalWrite(dir, HIGH); //Pull direction pin high to move in "reverse"
	digitalWrite(MS1, LOW);
	digitalWrite(MS2, LOW);
	digitalWrite(MS3, LOW);
	for (x = 1; x<1000; x++)  //Loop the stepping enough times for motion to be visible
	{
		digitalWrite(stp, HIGH); //Trigger one step
		delay(1);
		digitalWrite(stp, LOW); //Pull step pin low so it can be triggered again
		delay(1);
	}
	delay(1000);

	//Small Step Mode
	digitalWrite(dir, LOW); //Pull direction pin low to move "forward"
	digitalWrite(MS1, HIGH); //Pull MS1,MS2, and MS3 high to set logic to 1/16th microstep resolution
	digitalWrite(MS2, HIGH);
	digitalWrite(MS3, HIGH);
	for (x = 1; x<1000; x++)  //Loop the forward stepping enough times for motion to be visible
	{
		digitalWrite(stp, HIGH); //Trigger one step forward
		delay(1);
		digitalWrite(stp, LOW); //Pull step pin low so it can be triggered again
		delay(1);
	}
	delay(1000);
}
{% endhighlight %}


##生成和部署
按 F5 来生成并部署项目。

有关如何部署应用的详细说明，请参阅 [Arduino 接线项目指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)！

##结果
你应该看到步进马达无限地正向转动、接着以反向模式转动，最后以小步模式转到，然后继续从头开始！

##是否遇到难题?

有关在处理 Arduino 接线草图时会遇到的常见问题和关注内容，请参阅 [Arduino 接线移植指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm)。

---

[&laquo; 返回到示例]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm){:role="button"}{:class="btn btn-default"}
