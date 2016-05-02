---
layout: default
title: DragonBoard 引脚映射
permalink: /zh-cn/win10/samples/PinMappingsDb.htm
lang: zh-cn
---
# DragonBoard 引脚映射

Dragonboard 的硬件接口通过开发板上的 40 排针公开。功能包括：

* **11x** - GPIO 引脚
* **2x** - 串行 UART
* **1x** - SPI 总线
* **2x** - I2C 总线
* **1x** - 5V 电源引脚
* **1x** - 1.8V 电源引脚
* **4x** - 接地引脚

请注意，Drangonboard Max 在所有 IO 引脚上使用 1.8V 逻辑级别。

## <a name="DB_GPIO">GPIO 引脚

以下 GPIO 引脚可通过 API 访问：

{:.table.table-bordered}
| GPIO\# | 排针 |头名称|
|-------|--------------------|-----------|
| 36 | 23 | A |
| 12 | 24 | B |
| 13 | 25 | C |
| 69 | 26 | D |
| 115 | 27 | E |
| 不适用 | 28 | f |
| 24 | 29 | G |
| 25 | 30 | H |
| 35 | 31 | I |
| 34 | 32 | J |
| 28 | 33 | K |
| 33 | 34 | L |
| 21 | |USER\_LED\_1 |         


例如，以下代码将 **GPIO 36** 作为输出打开，并在该引脚上写下数字“**1**”：
         
{% highlight C# %}
using Windows.Devices.Gpio;
         
public void GPIO()
{
	GpioController Controller = GpioController.GetDefault(); /* Get the default GPIO controller on the system */

	GpioPin Pin = Controller.OpenPin(21);        /* Open GPIO 21                      */
	Pin.SetDriveMode(GpioPinDriveMode.Output);  /* Set the IO direction as output   */
	Pin.Write(GpioPinValue.High);               /* Output a digital '1'             */
}
{% endhighlight %}

### GPIO 问题
* 输出在 GPIO 24 上不起作用，输入正常工作
* 引脚会在启动时配置为 InputPullDown，但在首次打开时将更改为 Input \(floating\)
* 关闭时，引脚不会还原为默认状态
* 当多个引脚上启用了中断时，可能会看到假中断


## <a name="DB_UART"></a>串行 UART

Dragonboard 上提供了两个串行 UART：**UART0** 和 **UART1**

**UART0** 具有标准 **UART0 TX** 和 **UART0 RX** 线以及流控制信号 **UART0 CTS** 和 **UART0 RTS**。

* 引脚 5 - **UART1 TX**
* 引脚 7 - **UART1 RX**
* 引脚 3 - **UART1 CTS**
* 引脚 9 - **UART1 RTS**



**UART1** 仅包含 **UART1 TX** 和 **UART1 RX** 线。

* 引脚 11 - **UART2 TX**
* 引脚 13 - **UART2 RX**



以下示例初始化 **UART1** 并依次执行写入和读取操作：


{% highlight C# %}
using Windows.Storage.Streams;
using Windows.Devices.Enumeration;
using Windows.Devices.SerialCommunication;

public async void Serial()
{
	string aqs = SerialDevice.GetDeviceSelector("UART1");                   /* Find the selector string for the serial device   */
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

请注意，必须将以下功能添加到 UWP 项目中的 **Package.appxmanifest** 文件，才能运行串行 UART 代码：

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

## <a name="DB_I2C"></a>I2C 总线

有两个 I2C 控制器

在排针上公开的 **I2C0**，带有 **SDA** 和 **SCL** 两条线

* 引脚 17 - **I2C0 SDA**
* 引脚 15 - **I2C0 SCL**

在排针上公开的 **I2C1**，带有 **SDA** 和 **SCL** 两条线

* 引脚 21 - **I2C1 SDA**
* 引脚 19 - **I2C1 SCL**

以下示例将初始化 **I2C0** 并将数据写入地址为 **0x40** 的 I2C 设备：

{% highlight C# %}
using Windows.Devices.Enumeration;
using Windows.Devices.I2c;

public async void I2C()
{
	var settings = new I2cConnectionSettings(0x40); /* 0x40 is the I2C device address   */
	settings.BusSpeed = I2cBusSpeed.FastMode;       /* FastMode = 400KHz                */

	string aqs = I2cDevice.GetDeviceSelector("I2C0");                       /* Find the selector string for the I2C bus controller                   */
	var dis = await DeviceInformation.FindAllAsync(aqs);                    /* Find the I2C bus controller device with our selector string           */
	I2cDevice Device = await I2cDevice.FromIdAsync(dis[0].Id, settings);    /* Create an I2cDevice with our selected bus controller and I2C settings */

	byte[] WriteBuf = new byte[] { 0x01, 0x02, 0x03, 0x04}; /* Some data to write to the device */

	Device.Write(WriteBuf);
}
{% endhighlight %}


## <a name="DB_SPI"></a>SPI 总线

DB 上提供一个 SPI 控制器 **SPI0**

* 引脚 10 - **SPI0 MOSI**
* 引脚 14 - **SPI0 MISO**
* 引脚 8 - **SPI0 SCLK**
* 引脚 12 - **SPI0 CS0**

### SPI 问题
SPI 时钟固定在 4.8mhz。请求的 SPI 时钟将被忽略。

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
