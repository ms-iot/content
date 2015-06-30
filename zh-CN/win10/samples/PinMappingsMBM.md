---
layout: default
title: MinnowBoard Max 引脚映射
permalink: /zh-CN/win10/samples/PinMappingsMBM.htm
lang: zh-CN
---
##MinnowBoard Max 引脚映射

![MinnowBoard Max 排针]({{site.baseurl}}/images/PinMappings/MBM_Pinout.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

MinnowBoard Max 的硬件接口通过开发板上的 26 排针 **JP1** 公开。功能包括：

* **10x** - GPIO 引脚
* **1x** - SPI 总线
* **1x** - I2C 总线
* **1x** - 5V 电源引脚
* **1x** - 3.3V 电源引脚
* **2x** - 接地引脚

请注意，MinnowBoard Max 在所有 IO 引脚上使用 3.3V 逻辑级别。此外所有引脚由 [TXS0104E](http://www.ti.com/product/txs0104e) 电平转换器缓冲，电源和接地引脚除外。这些电平转换器显示为开放收集器输出，并带有 **10K&\#x2126; 电阻式上拉，无论 IO 设置为输入还是输出该上拉都存在。** 电平转换器的开放收集器性质意味着引脚可以强输出“０”，但只能弱输出“１”。在连接从引脚（例如 LED）消耗电流的设备时记住这一点很重要。有关将 LED 接合到 MinnowBoard Max 的正确方法，请参阅 [Blinky 示例]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)。


##GPIO 引脚

以下 GPIO 引脚可通过 API 访问：

* **GPIO 0**
* **GPIO 1**
* **GPIO 2**
* **GPIO 3**
* **GPIO 4**
* **GPIO 5**
* **GPIO 6**
* **GPIO 7**
* **GPIO 8**
* **GPIO 9**

例如，以下代码将 **GPIO 5** 作为输出打开，并在引脚上写出数字“\*\*1\*\*”：

{% highlight C# %}
using Windows.Devices.Gpio;

public void GPIO()
{
	GpioController Controller = GpioController.GetDefault(); /* Get the default GPIO controller on the system */

	GpioPin Pin = Controller.OpenPin(5);        /* Open GPIO 5                      */
	Pin.SetDriveMode(GpioPinDriveMode.Output);  /* Set the IO direction as output   */
	Pin.Write(GpioPinValue.High);               /* Output a digital '1'             */
}
{% endhighlight %}

##I2C 总线

有一个在排针上公开的 I2C 控制器 **I2C5**，以及两条线 **SDA** 和 **SCL**。10K&\#x2126; 内部上拉电阻已存在于这些线上。

* 引脚 15 - **I2C5 SDA**
* 引脚 13 - **I2C5 SCL**

以下示例初始化 **I2C5** 并将数据写入带有地址 **0x40** 的 I2C 设备：

{% highlight C# %}
using Windows.Devices.Enumeration;
using Windows.Devices.I2c;

public async void I2C()
{
	var settings = new I2cConnectionSettings(0x40); /* 0x40 is the I2C device address   */
	settings.BusSpeed = I2cBusSpeed.FastMode;       /* FastMode = 400KHz                */

	string aqs = I2cDevice.GetDeviceSelector("I2C5");                       /* Find the selector string for the I2C bus controller                   */
	var dis = await DeviceInformation.FindAllAsync(aqs);                    /* Find the I2C bus controller device with our selector string           */
	I2cDevice Device = await I2cDevice.FromIdAsync(dis[0].Id, settings);    /* Create an I2cDevice with our selected bus controller and I2C settings */

	byte[] WriteBuf = new byte[] { 0x01, 0x02, 0x03, 0x04}; /* Some data to write to the device */

	Device.Write(WriteBuf);
}
{% endhighlight %}

###I2C 问题

MinnowBoard Max 具有已知的 I2C 总线问题，可导致某些 I2C 设备发生通信问题。通常，I2C 设备将在总线请求期间确认其地址。但是，在某些条件下，此确认无法通过电平转换器传播回 MBM，因此 CPU 认为设备未响应并取消总线事务。该问题似乎与 IO 引脚上 [TXS0104E](http://www.ti.com/product/txs0104e) 水平转换器相关，这可能由于线上的电压尖脉冲而过早触发。当前的解决方案是插入一个与 I2C SCK 线串联的 100 欧姆电阻，这有助于消除尖脉冲。并非所有设备都会受影响，因此只在你无法顺利获取总线响应时需要此解决方法。

##SPI 总线

MBM 上提供一个 SPI 控制器 **SPI0**：

* 引脚 9 - **SPI0 MOSI**
* 引脚 7 - **SPI0 MISO**
* 引脚 11 - **SPI0 SCLK**
* 引脚 5 - **SPI0 CS0**

有关如何在总线 **SPI0** 上执行 SPI 写入的示例如下所示：

{% highlight C# %}
using Windows.Devices.Enumeration;
using Windows.Devices.Spi;

public async void SPI()
{
	var settings = new SpiConnectionSettings(0); /* Create SPI initialization settings using chip select line CS0 */
	settings.ClockFrequency = 10000000;          /* Set clock to 10MHz                                            */

	string spiAqs = SpiDevice.GetDeviceSelector("SPI0");                         /* Find the selector string for the SPI bus controller          */
	var devicesInfo = await DeviceInformation.FindAllAsync(spiAqs);              /* Find the SPI bus controller device with our selector string  */
	SpiDevice Device = await SpiDevice.FromIdAsync(devicesInfo[0].Id, settings); /* Create an SpiDevice with our bus controller and SPI settings */

	byte[] WriteBuf = new byte[] { 0x01, 0x02, 0x03, 0x04 }; /* Some data to write to the device */

	Device.Write(WriteBuf);
}
{% endhighlight %}
