---
layout: default
title: 电位计示例
permalink: /zh-cn/win10/samples/tempSensor.htm
lang: zh-cn
---

## 温度/力传感器示例
此示例使用 SPI 通信。温度/力传感器已连接到 ADC，ADC 已通过 SPI 引脚连接到 Raspberry Pi 2。ADC 将模拟传感器输出转换为数字值，然后由 Raspberry Pi 2 使用 SPI 读取。从 ADC 读取的值显示在连接到 Raspberry Pi 2 的屏幕上。这基本上是一个简化版本的电位计传感器示例，其中包含 LED 光作为额外输出。你还可以在此示例中使用力传感器。尝试轻轻或用力按力传感器以查看数据输出差异。此示例只有 C\# 版本。

## 在开始之前阅读
此示例假设已按照以下方式预设置 Raspberry Pi 2：

- Raspberry Pi 2 已连接到 HDMI 监视器
- SD 图像卡已连接到 Pi 2
- 以太网电缆已连接到 Pi 2
- Raspberry Pi 2 已通电

## 所需部件

- [1 个 MCP3002 10 位 ADC](http://www.digikey.com/product-detail/en/MCP3002-I%2FP/MCP3002-I%2FP-ND/319412) 或 [1 个 MCP3208 12 位 ADC](http://www.digikey.com/product-search/en?KeyWords=mcp3208%20ci%2Fp&WT.z_header=search_go)
- [1 个 TMP36 温度传感器](http://www.digikey.com/product-detail/en/TMP36GT9Z/TMP36GT9Z-ND/820404)或 [1 个 FSR 402 力传感器](http://www.digikey.com/product-detail/en/30-81794/1027-1001-ND/2476468)
- Raspberry Pi 2 板
- 一块试验板和几根电线
- HDMI 监视器

## 部件查看

* MCP3002 或 MCP3208

下面是本例中使用的 MCP3002 和 MCP3208 模拟到数字转换器 \(ADC\) 的引脚输出。

![电子元件]({{site.baseurl}}/Resources/images/TempSensor/MCP3002.png) ![电子元件]({{site.baseurl}}/Resources/images/TempSensor/MCP3208.png)

* Raspberry Pi 2

  <img src="{{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png" height="400">

## 部件连接

1. 将 TMP36 温度传感器连接到 MCP3002；`Sensor output pin`（中间引脚）应连接到 MCP3002 上的 `CH0`；

如果你使用的是只有两条引线的[力传感器](http://www.digikey.com/product-detail/en/30-81794/1027-1001-ND/2476468)，请将左引线设置为 5V，然后将另一条引线连接到 MCP3002 上的 `CH0`。

连接详细信息如下：

![整体电路图]({{site.baseurl}}/Resources/images/TempSensor/temp_mcp3002.png); ![整体电路图]({{site.baseurl}}/Resources/images/TempSensor/force_mcp3002.png);

在每个型号的 Raspberry Pi 2 上，引脚布局可能稍有不同。但与 MCP3002 连接的引脚应如下所示：

- MCP3002： VDD/VREF - Raspberry Pi 2 上的 5V
- MCP3002： CLK - Raspberry Pi 2 上的“SPI0 SCLK”
- MCP3002： Dout - Raspberry Pi 2 上的“SPI0 MISO”
- MCP3002： Din - Raspberry Pi 2 上的“SPI0 MOSI”
- MCP3002： CS/SHDN - Raspberry Pi 2 上的“SPI0 CS0”
- MCP3002： DGND - Raspberry Pi 2 上的 GND
- MCP3002： CH0- 传感器输出引脚

2. **替代项： 如果你使用的是 MCP3208**，请将温度传感器连接到 MCP3208；`Sensor output pin`（中间引脚）应连接到 MCP3208 上的 `CH0`。

连接详细信息如下：

![整体电路图]({{site.baseurl}}/Resources/images/TempSensor/OverallCon_mcp3208.PNG)

在每个型号的 Raspberry Pi 2 上，引脚布局可能稍有不同。但与 MCP3208 连接的引脚应如下所示：

- MCP3208： VDD - Raspberry Pi 2 上的 5V
- MCP3208： VREF - Raspberry Pi 2 上的 5V
- MCP3208： CLK - Raspberry Pi 2 上的“SPI0 SCLK”
- MCP3208： Dout - Raspberry Pi 2 上的“SPI0 MISO”
- MCP3208： Din - Raspberry Pi 2 上的“SPI0 MOSI”
- MCP3208： CS/SHDN - Raspberry Pi 2 上的“SPIO CS0”
- MCP3208： DGND - Raspberry Pi 2 上的 GND

## 查看代码

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\TempSensor`，查找此示例的源代码。

让我们来看看代码。我们在示例中使用计时器，每次调用“刻度”事件时，会通过 ADC 读取传感器数据，并且该值将显示在屏幕上。

* 计时器代码

使用 C\# 设置计时器：

{% highlight C# %}
public MainPage()
{
	// ...

	this.timer = new DispatcherTimer();
	this.timer.Interval = TimeSpan.FromMilliseconds(500);
	this.timer.Tick += Timer_Tick;
	this.timer.Start();

	// ...
}
private void Timer_Tick(object sender, object e)
{
	DisplayTextBoxContents();
}
{% endhighlight %}

* 初始化 SPI 引脚

{% highlight C# %}
private async void InitSPI()
{
    try
    {
        var settings = new SpiConnectionSettings(SPI_CHIP_SELECT_LINE);
        settings.ClockFrequency = 500000;// 10000000;
        settings.Mode = SpiMode.Mode0; //Mode3;

        string spiAqs = SpiDevice.GetDeviceSelector(SPI_CONTROLLER_NAME);
        var deviceInfo = await DeviceInformation.FindAllAsync(spiAqs);
        SpiDisplay = await SpiDevice.FromIdAsync(deviceInfo[0].Id, settings);
    }

    /* If initialization fails, display the exception and stop running */
    catch (Exception ex)
    {
        throw new Exception("SPI Initialization Failed", ex);
    }
}
{% endhighlight %}

* 通过 SPI 通信读取传感器数据

{% highlight C# %}

/*Raspberry Pi 2  Parameters*/
private const string SPI_CONTROLLER_NAME = "SPI0";  /* For Raspberry Pi 2, use SPI0                             */
private const Int32 SPI_CHIP_SELECT_LINE = 0;       /* Line 0 maps to physical pin number 24 on the RPi2        */

/*Channel configuration for MCP3208, Uncomment this if you are using MCP3208*/

// byte[] readBuffer = new byte[3]; /*this is defined to hold the output data*/
// byte[] writeBuffer = new byte[3] { 0x06, 0x00, 0x00 };//00000110 00; /* It is SPI port serial input pin, and is used to load channel configuration data into the device*/

/*Channel configuration for MCP3002, Uncomment this if you are using MCP3002*/
byte[] readBuffer = new byte[3]; /*this is defined to hold the output data*/
byte[] writeBuffer = new byte[3] { 0x68, 0x00, 0x00 };//00001101 00; /* It is SPI port serial input pin, and is used to load channel configuration data into the device*/

private SpiDevice SpiDisplay;

// create a timer
private DispatcherTimer timer;
int res;

public void DisplayTextBoxContents()
{
    SpiDisplay.TransferFullDuplex(writeBuffer, readBuffer);
    res = convertToInt(readBuffer);
    textPlaceHolder.Text = res.ToString();

}
{% endhighlight %}

* 将传感器位数据转换为数字形式

{% highlight C# %}
/* This is the conversion for MCP3208 which is a 12 bits output; Uncomment this if you are using MCP3208 */
// public int convertToInt(byte[] data)
// {
//    int result = data[1] & 0x0F;
//    result <<= 8;
//    result += data[2];
//    return result;
// }
/* */

/* This is the conversion for MCP3002 which is a 10 bits output; Uncomment this if you are using MCP3002 */
public int convertToInt(byte[] data)
{
    int result = data[0] & 0x03;
    result <<= 8;
    result += data[1];
    return result;
}
{% endhighlight %}

## 部署示例
选择 `Debug` 和 `ARM` 配置、选择 `Remote Machine`、右键单击该项目、在“属性”下单击“调试”标记、将 Raspberry Pi 2 IP 放入“远程计算机”字段中，然后选择 `Universal` 身份验证。

按 `F5`

如果你使用的是温度传感器，你可以尝试握住传感器或对其施加一些热量，以查看输出会如何变化。如果你使用的是力传感器，你可以用力或轻轻地握住它，以查看输出在屏幕上如何变化。你还可以将传感器切换到光传感器来使用它。

<img src="{{site.baseurl}}/Resources/images/TempSensor/Deploy.png" height="400">
