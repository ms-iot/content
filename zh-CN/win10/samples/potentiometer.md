---
layout: default
title: 电位计示例
permalink: /zh-cn/win10/samples/Potentiometer.htm
lang: zh-cn
---

## 电位计传感器示例

{% include VerifiedVersion.md %}

此示例演示了如何将旋转电位计和 LED 连接到 Raspberry Pi 2 或 DragonBoard 410c。我们使用基于 SPI 的 ADC（模拟数字转换器）从该电位计读取值，并根据旋钮位置控制 LED。

## 所需部件
- [1 个 LED](http://www.digikey.com/product-detail/en/C5SMF-RJS-CT0W0BB1/C5SMF-RJS-CT0W0BB1-ND/2341832){:target="_blank"}
- [1 个 330 &#x2126; 电阻器](http://www.digikey.com/product-detail/en/CFR-25JB-52-330R/330QBK-ND/1636){:target="_blank"}
- ADC
    - Raspberry Pi 2
        - [一个 MCP3002 10 位 ADC](http://www.digikey.com/product-detail/en/MCP3002-I%2FP/MCP3002-I%2FP-ND/319412){:target="_blank"} 或[一个 MCP3208 12 位 ADC](http://www.digikey.com/product-search/en?KeyWords=mcp3208%20ci%2Fp&WT.z_header=search_go){:target="_blank"}
    - DragonBoard 410c
        - [一个 MCP3008 10 位 ADC](http://www.microchip.com/wwwproducts/Devices.aspx?dDocName=en010530){:target="_blank"} 或[一个 MCP3208 12 位 ADC](http://www.digikey.com/product-search/en?KeyWords=mcp3208%20ci%2Fp&WT.z_header=search_go){:target="_blank"}
        - [一个电压级别的转换器突围](https://www.sparkfun.com/products/11771){:target="_blank"}
- [一个 10k &#x2126; 微调电位计](http://www.digikey.com/product-detail/en/3362P-1-103TLF/3362P-103TLF-ND/1232540){:target="_blank"}
- Raspberry Pi 2 或 DragonBoard 410c 单个开发板计算机
- 一块试验板和几根电线
- HDMI 监视器和 HDMI 电缆

## 部件查看

在此示例中，你可以选择使用 MCP3002、MCP3008 或 MCP3208 ADC（模拟数字转换器）。芯片之间的差异在于输入通道数和分辨率。12 位的分辨率比 10 位选项更准确，而通道数则决定可以读取的不同输入数。其中任意选项均适用于该示例。

以下是 MCP3002 和 MCP3208 ADC 的引出线。

| MCP3002 | MCP3008 或 MCP3208 |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| ![MCP3002 引出线]({{site.baseurl}}/Resources/images/Potentiometer/MCP3002.PNG) | ![MCP3208 引出线]({{site.baseurl}}/Resources/images/Potentiometer/MCP3208.PNG) |

###Raspberry Pi

####Raspbery Pi 引出线

![Raspberry Pi 2 引出线]({{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png)

####电线和连接

#####MCP3002
如果你已选择使用 **MCP3002**，则按如下方式组装电路。请注意，wiper 引脚（10k 电位计上的中间引脚）应连接到 MCP3002 上的 `CH0`。有关详细信息，你还可以参阅[数据表](http://ww1.microchip.com/downloads/en/DeviceDoc/21294E.pdf){:target="_blank"}。

连接详细信息如下：

![整体电路图]({{site.baseurl}}/Resources/images/Potentiometer/OverallCon-3002.PNG)

MCP3002 应该按如下方式进行连接：

- MCP3002： VDD/VREF - Raspberry Pi 2 上的 3.3V
- MCP3002： CLK - Raspberry Pi 2 上的“SPI0 SCLK”
- MCP3002： Dout - Raspberry Pi 2 上的“SPI0 MISO”
- MCP3002： Din - Raspberry Pi 2 上的“SPI0 MOSI”
- MCP3002： CS/SHDN - Raspberry Pi 2 上的“SPI0 CS0”
- MCP3002： Vss - Raspberry Pi 2 上的 GND
- MCP3002： CH0 - 电位计 wiper 引脚


#####MCP3208 或 MCP3008
如果你已选择使用 **MCP3208** 或 **MCP3008**，则按如下方式组装电路。请注意，wiper 引脚（10k 电位计上的中间引脚）应连接到 MCP3208 上的 `CH0`。有关详细信息，你还可以参阅 [MCP3208 数据表](http://pdf.datasheetcatalog.com/datasheets2/43/435228_1.pdf){:target="_blank"}或 [MCP3008 数据表](http://ww1.microchip.com/downloads/en/DeviceDoc/21295C.pdf){:target="_blank"}。

连接详细信息如下：

![整体电路图]({{site.baseurl}}/Resources/images/Potentiometer/OverallCon-3208.PNG)

MCP3208 应该按如下方式进行连接：

- MCP3208： VDD - Raspberry Pi 2 上的 3.3V
- MCP3208： VREF - Raspberry Pi 2 上的 3.3V
- MCP3208： AGND - Raspberry Pi 2 上的 GND
- MCP3208： CLK - Raspberry Pi 2 上的“SPI0 SCLK”
- MCP3208： Dout - Raspberry Pi 2 上的“SPI0 MISO”
- MCP3208： Din - Raspberry Pi 2 上的“SPI0 MOSI”
- MCP3208： CS/SHDN - Raspberry Pi 2 上的“SPI0 CS0”
- MCP3208： DGND - Raspberry Pi 2 上的 GND
- MCP3208： CH0 - 电位计 wiper 引脚

###DragonBoard 410c

对于 DragonBoard 410c，你将需要[电压级别的转换器突围](https://www.sparkfun.com/products/11771)。

####DragonBoard 引出线

![DragonBoard 引出线]({{site.baseurl}}/Resources/images/PinMappings/DB_Pinout.png)

####电线和连接

#####MCP3208

如下所示，将 MCP3208 连接到电压级别的转换器突围：

* 在转换器突围上将 Vdd 连接到 VccB \(5 V\)
* 在转换器突围上将 Vref 连接到 VccB \(5 V\)
* 在转换器突围上将 AGND 连接到 GND
* 在转换器突围上将 CLK 连接到 B1
* 在转换器突围上将 DOUT 连接到 B3
* 在转换器突围上将 DIN 连接到 B2
* 在转换器突围上将 CS 连接到 B4
* 将 DGND 连接到 GND 
* 将通道 0 连接到电位计 wiper 引脚（脚 2）
* 将电位计的脚 1 连接到 GND 
* 将电位计的脚 3 连接到 VccB \(5 V\) 
* 将电位计的脚 3 连接到 330 &#x2126; 电阻器
* 将 330 &#x2126; 电阻器连接到 LED 的阴极
* 在 DragonBoard 上将 LED 的阳极连接到引脚 24 \(GPIO 12\)
* 将转换器突围上的 A1 连接到引脚 8 \(SPI0 SCLK\)
* 将转换器突围上的 A3 连接到引脚 10 \(SPI0 MISO\)
* 将转换器突围上的 A2 连接到引脚 14 \(SPI0 MOSI\)
* 将转换器突围上的 A4 连接到引脚 12 \(SPI CS N\)
* 在 DragonBoard 上将转换器突围上的 VccA 连接到引脚 35 \(1.8 V\)
* 在 DragonBoard 上将转换器突围上的 VccB 连接到引脚 37 \(5 V\)

下面是组装了电路的试验板的可能外观的图示：

![DragonBoard 电位计试验板]({{site.baseurl}}/Resources/images/Potentiometer/breadboard_db410c.png)

最后，示例代码的 **MainPage.xaml.cs** 文件的 LED\_PIN 变量需要进行以下修改：

~~~
private const int LED_PIN = 12;
~~~
{: .language-c\#}

#####MCP3008
如果你已选择使用 **MCP3008**，则可以在上图中将 MCP3208 切换为 MCP3008。

###生成和运行示例

1. 在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载包含我们所有示例的 zip。
2. 在 Visual Studio 中打开 `samples-develop\PotentiometerSensor\CS\PotentiometerSensor.csproj`。
3. 在 **MainPage.xaml.cs** 中查找 `ADC_DEVICE` 变量，并将其更改为 **AdcDevice.MCP3002**、**AdcDevice.MCP3208** 或 **AdcDevice.MCP3008**，具体取决于上面所接入的 ADC
4. 验证 GPIO 引脚编号是否适用于你的开发板。（GPIO 5 适用于 Raspberry Pi 2 和 MinnowBoard Max。GPIO 12 适用于 DragonBoard）
5. 如果你使用的是 Raspberry Pi 2 或 DragonBoard，请选择 `ARM` 用于目标体系结构。选择 `x86` 用于 MinnowBoard Max。
6. 转到 `Build -> Build Solution`
7. 从调试目标中选择 `Remote Machine`
8. 点击 F5 以进行部署和调试。输入你的设备的 IP 地址并为身份验证类型选择 `Universal`
 
当转动电位计旋钮时，你将看到屏幕上的数字出现变化，该数字指示电位计旋钮的位置。当数字大于 ADC 分辨率的一半（对于 **MCP3002**，此数字为 **512**。对于 **MCP3008** 或 **MCP3208**，此数字为 **2048**）时，将打开 LED。否则，它将处于关闭状态。

| ----------------------------------------------------------------------------------------- |-| ---------------------------------------------------------------------------------- |
| ![运行 LED 的应用关闭]({{site.baseurl}}/Resources/images/Potentiometer/AppRunning-LEDOff.png) | | ![运行 LED 的应用打开]({{site.baseurl}}/Resources/images/Potentiometer/AppRunning-LEDOn.png) |
| ![试验板 LED 关闭]({{site.baseurl}}/Resources/images/Potentiometer/Breadboard-LEDOff.png) | | ![试验板 LED 打开]({{site.baseurl}}/Resources/images/Potentiometer/Breadboard-LEDOn.png) |

##我们来看看代码

此处的代码将执行两个主要任务：

1. 第一，此代码将初始化 SPI 总线和 LED GPIO 引脚。

2. 第二，我们会按照定义的时间间隔从 ADC 读取相关数据并相应更新显示。

让我们从深入了解初始化开始吧。首先初始化的就是 **InitGPIO\(\)** 中的 GPIO LED 引脚。

{% highlight C# %}
private void InitGpio()
{
	var gpio = GpioController.GetDefault();

	/* Show an error if there is no GPIO controller */
	if (gpio == null)
	{
		throw new Exception("There is no GPIO controller on this device");
	}

	ledPin = gpio.OpenPin(LED_PIN);

	/* GPIO state is initially undefined, so we assign a default value before enabling as output */
	ledPin.Write(GpioPinValue.High);        
	ledPin.SetDriveMode(GpioPinDriveMode.Output);
}
{% endhighlight %}

* 我们从通过 **GpioController.GetDefault\(\)** 函数检索设备上的默认 GPIO 控制器开始。

* 由于我们已将 LED 连接到 GPIO 4，因此我们将在 GPIO 控制器上打开此引脚。

* 最后，在将引脚设置为输出前，向其中写入默认值。

接下来，我们将初始化 SPI 总线。这允许 RPi2 与 ADC 通信以读取电位计位置。

{% highlight C# %}
private async Task InitSPI()
{
	try
	{
		var settings = new SpiConnectionSettings(SPI_CHIP_SELECT_LINE);
		settings.ClockFrequency = 500000;   /* 0.5MHz clock rate                                        */
		settings.Mode = SpiMode.Mode0;      /* The ADC expects idle-low clock polarity so we use Mode0  */

		string spiAqs = SpiDevice.GetDeviceSelector(SPI_CONTROLLER_NAME);
		var deviceInfo = await DeviceInformation.FindAllAsync(spiAqs);
		SpiADC = await SpiDevice.FromIdAsync(deviceInfo[0].Id, settings);
	}

	/* If initialization fails, display the exception and stop running */
	catch (Exception ex)
	{
		throw new Exception("SPI Initialization Failed", ex);
	}
}
{% endhighlight %}

* 首先，我们为 SPI 总线指定某些配置设置：
1. 指定要使用的芯片选择线。我们已将 ADC 接入芯片选择线 0，这就是我们要在此处使用的选择线。
2. 时钟频率谨慎设置为 0.5 MHz，这在 ADC 功能内非常适合。
3. 将 **settings.Mode** 设置为 **SpiMode.Mode0**。这将为总线配置时钟极性和相位。

* 接下来，我们为 SPI 控制器获取类选择字符串。此控制器可控制外露排针上的 SPI 线。然后，我们使用该选择字符串来获取与字符串名称匹配的 SPI 总线。

* 最后，我们将通过之前获取的设置和总线控制器创建一个新的 **SpiDevice**。

在所有初始化均完成后，我们将创建一个定时计时器，以每 100 毫秒读取数据一次。

{% highlight C# %}
private async void InitAll()
{
	// ...

	/* Now that everything is initialized, create a timer so we read data every 500mS */
	periodicTimer = new Timer(this.Timer_Tick, null, 0, 100);

	StatusText.Text = "Status: Running";
}
{% endhighlight %}

此计时器将调用 **Timer\_Tick\(\)** 函数。这将通过从 ADC 读取启动：

{% highlight C# %}
public void ReadADC()
{
	byte[] readBuffer = new byte[3]; /* Buffer to hold read data*/
	byte[] writeBuffer = new byte[3] { 0x00, 0x00, 0x00 };

	/* Setup the appropriate ADC configuration byte */
	switch (ADC_DEVICE)
	{
		case AdcDevice.MCP3002:
			writeBuffer[0] = MCP3002_CONFIG;
			break;
		case AdcDevice.MCP3208:
			writeBuffer[0] = MCP3208_CONFIG;
			break;
	}

	SpiADC.TransferFullDuplex(writeBuffer, readBuffer); /* Read data from the ADC                           */
	adcValue = convertToInt(readBuffer);                /* Convert the returned bytes into an integer value */

	/* UI updates must be invoked on the UI thread */
	var task = this.Dispatcher.RunAsync(Windows.UI.Core.CoreDispatcherPriority.Normal, () =>
	{
		textPlaceHolder.Text = adcValue.ToString();         /* Display the value on screen                      */
	});
}
{% endhighlight %}

* 首先，我们通过要发送到 ADC 的某些配置数据设置 **writeBuffer**

* 接下来，我们通过调用 **SpiADC.TransferFullDuplex\(\)** 来编写配置数据并读回 ADC 结果

* 在 **convertToInt\(\)** 函数内，我们将返回的字节数组转换为一个整数

* 最后，我们使用 ADC 结果更新 UI

紧接着，我们基于 ADC 结果控制 LED

{% highlight C# %}
/* Turn on/off the LED depending on the potentiometer position    */
private void LightLED()
{
	int adcResolution = 0;

	switch (ADC_DEVICE)
	{
		case AdcDevice.MCP3002:
			adcResolution = 1024;
			break;
		case AdcDevice.MCP3208:
			adcResolution = 4096;
			break;
	}

	/* Turn on LED if pot is rotated more halfway through its range */
	if (adcValue > adcResolution / 2)
	{
		ledPin.Write(GpioPinValue.Low);
	}
	/* Otherwise turn it off                                        */
	else
	{
		ledPin.Write(GpioPinValue.High);
	}
}
{% endhighlight %}

* 如果电位计的旋转幅度超过其范围的一半，我们将打开 LED。否则，它将处于关闭状态。

就这么简单！ 现在，你已了解如何使用 ADC，你可以将各种模拟传感器连接到你的 Raspberry Pi 2。



