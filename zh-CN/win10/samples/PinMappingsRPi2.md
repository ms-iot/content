---
layout: default
title: RPi2 引脚映射
permalink: /zh-cn/win10/samples/PinMappingsRPi2.htm
lang: zh-cn
---

##Raspberry Pi 2 引脚映射

![RPi2 排针]({{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

Raspberry Pi 2 的硬件接口通过开发板上的 40 排针 **J8** 公开。功能包括：

* **17x** - GPIO 引脚
* **1x** - SPI 总线
* **1x** - I2C 总线
* **2x** - 5V 电源引脚
* **2x** - 3.3V 电源引脚
* **8x** - 接地引脚

##<a name="RPi2_GPIO">GPIO 引脚

以下 GPIO 引脚可通过 API 访问：

{:.table.table-bordered}
| GPIO\# | 通电拉 | 排针 |
|-------|---------------|--------------------|
| 4 | 上拉 | 7 |
| 5 | 上拉 | 29 |
| 6 | 上拉 | 31 |
| 12 | 下拉 | 32 |
| 13 | 下拉 | 33 |
| 16 | 下拉 | 36 |
| 17 | 下拉 | 11 |
| 18 | 下拉 | 12 |
| 19 | 下拉 | 35 |
| 20 | 下拉 | 38 |
| 21 | 下拉 | 40 |
| 22 | 下拉 | 15 |
| 23 | 下拉 | 16 |
| 24 | 下拉 | 18 |
| 25 | 下拉 | 22 |
| 26 | 下拉 | 37 |
| 27 | 下拉 | 13 |
| 35 | 上拉 | 红色电源 LED |
| 47 | 上拉 | 绿色活动 LED |

例如，以下代码将 **GPIO 5** 作为输出打开，并在该引脚上写下数字“**1**”：

{% highlight C# %}
using Windows.Devices.Gpio;

public void GPIO()
{
    // Get the default GPIO controller on the system
    GpioController gpio = GpioController.GetDefault();
    if (gpio == null)
        return; // GPIO not available on this system

    // Open GPIO 5
    using (GpioPin pin = gpio.OpenPin(5))
    {
        // Latch HIGH value first. This ensures a default value when the pin is set as output
        pin.Write(GpioPinValue.High);
    
        // Set the IO direction as output
        pin.SetDriveMode(GpioPinDriveMode.Output);

    } // Close pin - will revert to its power-on state 
}
{% endhighlight %}

当你打开引脚时，它将处于其通电状态。若要断开拉电阻的连接并获取高阻抗输入，请将驱动程序模式设置为 GpioPinDriveMode.Input：

    pin.SetDriveMode(GpioDriveMode.Input);

当关闭引脚时，它将还原到其通电状态。

##<a name="RPi2_UART"></a>串行 UART

RPi2 上有一个串行 UART： **UART0**

* Pin 8 - **UART0 TX**
* Pin 10 - **UART0 RX**

以下示例初始化 **UART0** 并依次执行写入和读取操作：


{% highlight C# %}
using Windows.Storage.Streams;
using Windows.Devices.Enumeration;
using Windows.Devices.SerialCommunication;

public async void Serial()
{
	string aqs = SerialDevice.GetDeviceSelector("UART0");                   /* Find the selector string for the serial device   */
	var dis = await DeviceInformation.FindAllAsync(aqs);                    /* Find the serial device with our selector string  */
	SerialDevice SerialPort = await SerialDevice.FromIdAsync(dis[0].Id);    /* Create an serial device with our selected device */

	/* Configure serial settings */
	SerialPort.WriteTimeout = TimeSpan.FromMilliseconds(1000);
	SerialPort.ReadTimeout = TimeSpan.FromMilliseconds(1000);
	SerialPort.BaudRate = 9600;
	SerialPort.Parity = SerialParity.None;         
	SerialPort.StopBits = SerialStopBitCount.One;
	SerialPort.DataBits = 8;

	/* Write a string out over serial */
	string txBuffer = "Hello Serial";
	DataWriter dataWriter = new DataWriter();
	dataWriter.WriteString(txBuffer);
	uint bytesWritten = await SerialPort.OutputStream.WriteAsync(dataWriter.DetachBuffer());

	/* Read data in from the serial port */
	const uint maxReadLength = 1024;
	DataReader dataReader = new DataReader(SerialPort.InputStream);
	uint bytesToRead = await dataReader.LoadAsync(maxReadLength);
	string rxBuffer = dataReader.ReadString(bytesToRead);
}
{% endhighlight %}

请注意，你必须将以下功能添加到 UWP 项目中的 **Package.appxmanifest** 文件，才能运行串行 UART 代码：

    Visual Studio 2015 has a known bug in the Manifest Designer (the visual editor for appxmanifest files) that affects the serialcommunication capability.  If 
    your appxmanifest adds the serialcommunication capability, modifying your appxmanifest with the designer will corrupt your appxmanifest (the Device xml child 
    will be lost).  You can workaround this problem by hand editting the appxmanifest by right-clicking your appxmanifest and selecting View Code from the 
    context menu.

{% highlight xml %}
  <Capabilities>
    <DeviceCapability Name="serialcommunication">
      <Device Id="any">
        <Function Type="name:serialPort" />
      </Device>
    </DeviceCapability>
  </Capabilities>
{% endhighlight %}

##<a name="RPi2_I2C"></a>I2C 总线

排针上公开了一个 I2C 控制器 **I2C1**，带有 **SDA** 和 **SCL** 两条线。用于此总线的 1.8K&#x2126; 内部上拉电阻已安装在开发板上。

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


##<a name="RPi2_SPI"></a>SPI 总线

RPi2 上提供一个 SPI 总线控制器。**SPI0** 具有标准的 **MOSI**、**MISO** 和 **SCLK** 线，并且可以配置为使用 **SPI0 CS0** 和 **SPI0 CS1** 两种芯片选择线之一。

* 引脚 19 - **SPI0 MOSI**
* 引脚 21 - **SPI0 MISO**
* 引脚 23 - **SPI0 SCLK**
* 引脚 24 - **SPI0 CS0**
* 引脚 26 - **SPI0 CS1**

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
