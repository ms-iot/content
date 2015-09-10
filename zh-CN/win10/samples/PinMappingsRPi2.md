---
layout: default
title: RPi2 引脚映射
permalink: /zh-CN/win10/samples/PinMappingsRPi2.htm
lang: zh-CN
---

##Raspberry Pi 2 引脚映射

![RPi2 排针]({{site.baseurl}}/images/PinMappings/RP2_Pinout.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

Raspberry Pi 2 的硬件接口通过开发板上的 40 排针 **J8** 公开。功能包括：

* **13x** - GPIO 引脚
* **2x** - SPI 总线
* **1x** - I2C 总线
* **2x** - 5V 电源引脚
* **2x** - 3.3V 电源引脚
* **8x** - 接地引脚

##GPIO 引脚

以下 GPIO 引脚可通过 API 访问：

{:.table.table-bordered}
| GPIO\# | 通电拉 | 排针 |
|-------|---------------|--------------------|
| 5 | 上拉 | 29 |
| 6 | 上拉 | 31 |
| 12 | 下拉 | 32 |
| 13 | 下拉 | 33 |
| 16 | 下拉 | 36 |
| 18 | 下拉 | 12 |
| 22 | 下拉 | 15 |
| 23 | 下拉 | 16 |
| 24 | 下拉 | 18 |
| 25 | 下拉 | 22 |
| 26 | 下拉 | 37 |
| 27 | 下拉 | 13 |
| 35 | 上拉 | 红色电源 LED |
| 47 | 上拉 | 绿色活动 LED |

例如，以下代码将 **GPIO 5** 作为输出打开，并在引脚上写出数字“\*\*1\*\*”：

{% highlight C# %}
using Windows.Devices.Gpio;

public void GPIO()
{
    // Get the default GPIO controller on the system
    GpioController gpio = GpioController.GetDefault();
    if (gpio == null)
        return; // GPIO not available on this sytem

    // Open GPIO 5
    using (GpioPin pin = gpio.OpenPin(5))
    {
        // Latch HIGH value
        pin.Write(GpioPinValue.High);
    
        // Set the IO direction as output
        pin.SetDriveMode(GpioPinDriveMode.Output);

    } // Close pin - will revert to its power-on state 
}
{% endhighlight %}

当你打开引脚时，它将处于其通电状态。若要断开拉电阻的连接并获取高阻抗输入，请将驱动程序模式设置为 GpioPinDriveMode.Input：

    pin.SetDriveMode(GpioDriveMode.Input);

当关闭引脚时，它将还原到其通电状态。

##I2C 总线

排针上公开了一个 I2C 控制器 **I2C1**，带有 **SDA** 和 **SCL** 两条线。用于此总线的 1.8K&\#x2126; 内部上拉电阻已安装在开发板上。

* 引脚 3 - **I2C1 SDA**
* 引脚 5 - **I2C1 SCL**

下面的示例将初始化 **I2C1** 并将数据写入地址为 **0x40** 的 I2C 设备：

{% highlight C# %}
using Windows.Devices.Enumeration;
using Windows.Devices.I2c;

public async void I2C()
{
    // Get a selector string for bus "I2C1"
    string aqs = I2cDevice.GetDeviceSelector("I2C1");
    
    // Find the I2C bus controller with our selector string
    var dis = await DeviceInformation.FindAllAsync(aqs);
    if (dis.Count == 0)
        return; // bus not found
    
    // 0x40 is the I2C device address
    var settings = new I2cConnectionSettings(0x40);
    
    // Create an I2cDevice with our selected bus controller and I2C settings
    using (I2cDevice device = await I2cDevice.FromIdAsync(dis[0].Id, settings))
    {
        byte[] writeBuf = { 0x01, 0x02, 0x03, 0x04 };
        device.Write(writeBuf);
    }
}
{% endhighlight %}


##SPI 总线

RPi2 上有 2 个 SPI 总线控制器可用： **SPI0** 和 **SPI1**。

**SPI0** 具有标准的 **MOSI**、**MISO** 和 **SCLK** 线，并且可以配置为使用 **SPI0 CS0** 和 **SPI0 CS1** 两种芯片选择线之一。

* 引脚 19 - **SPI0 MOSI**
* 引脚 21 - **SPI0 MISO**
* 引脚 23 - **SPI0 SCLK**
* 引脚 24 - **SPI0 CS0**
* 引脚 26 - **SPI0 CS1**

**SPI1** 包括 **MOSI**、**MISO** 和 **SCLK** 线，并且只有 **SPI1 CS0** 一种芯片选择线。

* 引脚 38 - **SPI1 MOSI**
* 引脚 35 - **SPI1 MISO**
* 引脚 40 - **SPI1 SCLK**
* 引脚 11 - **SPI1 CS0**

有关如何在总线 **SPI0** 上执行 SPI 写入的示例如下所示：

{% highlight C# %}
using Windows.Devices.Enumeration;
using Windows.Devices.Spi;

public async void SPI()
{
    // Get a selector string for bus "SPI0"
    string aqs = SpiDevice.GetDeviceSelector("SPI0");
    
    // Find the SPI bus controller device with our selector string
    var dis = await DeviceInformation.FindAllAsync(aqs);
    if (dis.Count == 0);
        return; // "SPI0" not found on this system
    
    // Use chip select line CS0
    var settings = new SpiConnectionSettings(0);
    
    // Create an SpiDevice with our bus controller and SPI settings
    using (SpiDevice device = await SpiDevice.FromIdAsync(dis[0].Id, settings))
    {
        byte[] writeBuf = { 0x01, 0x02, 0x03, 0x04 };
        device.Write(writeBuf);
    }
}
{% endhighlight %}
