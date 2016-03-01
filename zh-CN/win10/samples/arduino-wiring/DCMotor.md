---
layout: default
title: Arduino 接线 DC 马达示例
permalink: /zh-cn/win10/samples/arduino-wiring/DCMotor.htm
lang: zh-cn
---

#Arduino 接线 DC 马达示例

DC 马达是制造商工具箱的基本元素之一。不管是驱动自主式机器人还是转动冷却风扇，DC 马达都是一种相对简单的用于完成任务的方式！ 在此示例中，我们将使用脉冲宽度调制 \(PWM\) 变换马达的速度。

##组件

你将需要：

* 一台支持 Windows 10 IoT 核心版的设备，例如 Raspberry Pi 2 或 Minnowboard Max。
* 一个[来自 Adafruit 的 PCA9685 16 通道 12 位 PWM 控制器](http://www.adafruit.com/product/815)。
* 一个 330 Ω 电阻器。
* 一个 1N1407 二极管。
* 一个 P2N2 222A 晶体管 \(NPN\)
* 分类排列的电线

##硬件设置

马达汲取的电流要多于 Raspberry Pi 2 上的引脚可以安全提供的电流。因此，我们使用晶体管将马达连接到外部电源。晶体管类似于开关；当我们为其提供少量的电流时，它可以启用更大的电流。对于马达，我们使用的是 5V DC 适配器，可以提供至少 1A 的电流。可以使用电流容量多于马达所需的适配器；因为适配器应仅提供马达所需的电流。

我们还使用了一个二极管来保护 PCA9685 开发板和 Raspberry Pi 以免回流电流损坏硬件。二极管会启用只朝一个方向流动的电源流。

我们强烈建议你使用 PCA9685 PWM 控制器。你可以使用跳线帽或扩展板，但此扩展板直接受 Microsoft 支持并将提供最佳体验。

此外，控制器不应该设置任何 I2C 硬件地址引脚。下面是 PCA9685 PWM 控制器上的 I2C 引脚图，其中未设置任何引脚（因而硬件 I2C 地址为默认 0x40）。

![PCA9685 I2C]({{site.baseurl}}/Resources/images/arduino_wiring/pca9685_i2c.jpg)

请参考下面的 Fritzing 图连接马达和 PWM 控制器。

###Fritzing 图

![RPI 引出线]({{site.baseurl}}/Resources/images/arduino_wiring/dcmotor.png)

###引出线说明

PCA9685 PWM 控制器应该按如下方式连接：

####Raspberry Pi 2

- VCC - Raspberry Pi 2 上的 5V（引脚 2 或 4）
- SDA - Raspberry Pi 2 上的 SDA1 引脚（引脚 3）
- SCL - Raspberry Pi 2 上的 SCL1 引脚（引脚 5）
- OE - *保持断开连接状态*
- GND - Raspberry Pi 2 上的 GND（所示的引脚 14 或任何其他 GND 引脚）

####外部电源

- V+ - 外部电源的正极
- GND - 外部电源的负极（地线）

请参考上面的 Fritzing 图来了解剩余电路连接。


##代码

使用以下代码替换主 .ino 文件中的现有代码：

{% highlight C++ %}


/*
 * The motor must be connected to one of the 3-pin connectors on the PWM hat (or similar device)
 * The function analogWrite( unsigned int pin, unsigned int speed ) will assume that the given pin
 *   number refers to the channel of the same number on the hat. Therefore, you should refer to the
 *   16 channels of a 16-channel PWM hat as [ 0 - 15 ]. In this case, we've set 0 as the MOTOR_PIN which
 *   means that channel 0 will be used on the hat. 
 */
const int MOTOR_PIN = 0;
const int MILLIS_PER_SECOND = 1000;
const int PWM_MAX_SPEED = 255;
const int PWM_MIN_SPEED = 0;

void setup()
{
    //analog write commands do not require pinModes to be set. They will be inferred by the function type
}


void motorOnThenOff()
{
    int number_of_seconds = 3;

    //turn the motor on for 1 second
    Log( "Setting speed to max\n" );
    analogWrite( MOTOR_PIN, PWM_MAX_SPEED );
    delay( MILLIS_PER_SECOND * number_of_seconds );

    //turn the motor off for one second
    Log( "Setting speed to min\n" );
    analogWrite( MOTOR_PIN, PWM_MIN_SPEED );
    delay( MILLIS_PER_SECOND * number_of_seconds );
}


void motorAccelerateAndDecelerate()
{
    int speed;

    //increase speed at a moderate pace
    for( speed = 0; speed <= PWM_MAX_SPEED; ++speed )
    {
        Log( "Setting speed to " );
        Log( speed.ToString()->Begin() );
        Log( "\n" );

        analogWrite( MOTOR_PIN, speed );
        delay( 25 );
    }


    //decrease speed at a moderate pace
    for( speed = 252; speed >= PWM_MIN_SPEED; --speed )
    {
        Log( "Setting speed to " );
        Log( speed.ToString()->Begin() );
        Log( "\n" );

        analogWrite( MOTOR_PIN, speed );
        delay( 25 );
    }
}


void loop()
{
    motorOnThenOff();
    motorAccelerateAndDecelerate();

    //delay for a moment before restarting
    analogWrite( MOTOR_PIN, PWM_MIN_SPEED );
    delay( MILLIS_PER_SECOND );
}


{% endhighlight %}


##生成和部署
按 F5 来生成并部署项目。

有关如何部署应用的详细说明，请参阅 [Arduino 接线项目指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)！

##结果

马达应以最大速度运行 3 秒、停止 3 秒，然后从停止状态加速到最大速度，再从最大速度进入停止状态。然后，马达将在重新启动整个过程前停止一秒钟。

##是否遇到难题？

有关在处理 Arduino 接线草图时会遇到的常见问题和关注内容，请参阅 [Arduino 接线移植指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm)。

---

[&laquo; 返回到示例]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm){:role="button"}{:class="btn btn-default"}
