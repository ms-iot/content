---
layout: default
title: 电位计示例
permalink: /zh-CN/win10/samples/potentiometer.htm
lang: zh-CN
---

## 电位计传感器示例
此示例使用以下两种功能：SPI 和 GPIO。将电位计传感器连接到 ADC，然后通过 SPI 引脚将 ADC 连接到 Raspberry Pi 2。Raspberry Pi 2 读取传感器模拟输入数据并将其输出到屏幕。我们也有一个 LED，用于指示输出状态。此示例只有 C\# 版本。

## 所需部件
- [1 个 LED](http://www.digikey.com/product-detail/en/C5SMF-RJS-CT0W0BB1/C5SMF-RJS-CT0W0BB1-ND/2341832)
- [1 个 330 &\#x2126; 电阻器](http://www.digikey.com/product-detail/en/CFR-25JB-52-330R/330QBK-ND/1636)
- [1 个 MCP3002 10 位 ADC](http://www.digikey.com/product-detail/en/MCP3002-I%2FP/MCP3002-I%2FP-ND/319412) 或 [1 个 MCP3208 12 位 ADC](http://www.digikey.com/product-search/en?KeyWords=mcp3208%20ci%2Fp&WT.z_header=search_go)
- [1 个 10k &\#x2126; 裁边器电位计](http://www.digikey.com/product-detail/en/3362P-1-103TLF/3362P-103TLF-ND/1232540)
- Raspberry Pi 2 板
- 一块试验板和几根电线
- HDMI 监视器

## 部件查看

* MCP3002 或 MCP3208

下面是本例中使用的 MCP3002 和 MCP3208 模拟到数字转换器 \(ADC\) 的引脚输出。

![电子元件]({{site.baseurl}}/images/Potentiometer/MCP3002.PNG) ![电子元件]({{site.baseurl}}/images/Potentiometer/MCP3208.PNG)

* Raspberry Pi 2

  <img src="{{site.baseurl}}/images/PinMappings/RP2_Pinout.png" height="400">

## 部件连接

1. 将电位计连接到 MCP3002；Wiper 引脚（10k 配平电位计上的中间引脚）应连接到 MCP3002 上的 `CH0`

连接详细信息如下：

![整体电路图]({{site.baseurl}}/images/Potentiometer/OverallCon-3002.PNG)；

在每个型号的 Raspberry Pi 2 上，引脚布局可能稍有不同。但与 MCP3002 连接的引脚应如下所示：

- MCP3002： VDD/VREF - Raspberry Pi 2 上的 5V
- MCP3002： CLK - Raspberry Pi 2 上的“SPI0 SCLK”
- MCP3002： Dout - Raspberry Pi 2 上的“SPI0 MISO”
- MCP3002： Din - Raspberry Pi 2 上的“SPI0 MOSI”
- MCP3002： CS/SHDN - Raspberry Pi 2 上的“SPI0 CS0”
- MCP3002： DGND - Raspberry Pi 2 上的 GND
- MCP3002： CH0 - 电位计输出引脚

2. **替代项： 如果你使用的是 MCP3208**，将电位计连接到 MCP3208；Wiper 引脚（10k 配平电位计上的中间引脚）应连接到 MCP3208 上的 `CH0`

连接详细信息如下：

![整体电路图]({{site.baseurl}}/images/Potentiometer/OverallCon-3208.PNG)

在每个型号的 Raspberry Pi 2 上，引脚布局可能稍有不同。但与 MCP3208 连接的引脚应如下所示：

- MCP3208： VDD - Raspberry Pi 2 上的 5V
- MCP3208： VREF - Raspberry Pi 2 上的 5V
- MCP3208： CLK - Raspberry Pi 2 上的“SPI0 SCLK”
- MCP3208： Dout - Raspberry Pi 2 上的“SPI0 MISO”
- MCP3208： Din - Raspberry Pi 2 上的“SPI0 MOSI”
- MCP3208： CS/SHDN - Raspberry Pi 2 上的“SPI0 CS0”
- MCP3208： DGND - Raspberry Pi 2 上的 GND

## 查看代码

可以在[此处](https://github.com/ms-iot/samples/tree/develop/PotentiometerSensor)找到此示例。

让我们来看看代码。我们使用了一个计时器，并且每次调用“Tick”事件时，我们都会通过 MCP3002 ADC 读取传感器输出值，如果该值高于我们在代码中设置的阈值数字，LED 便会亮起。

* 采用 C\# 的计时器代码设置计时器：

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
	LightLED();
}
{% endhighlight %}

* 初始化 GPIO 和 SPI 引脚

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
private void InitGpio()
{
    var gpio = GpioController.GetDefault();

    // Show an error if there is no GPIO controller
    if (gpio == null)
    {
        pin = null;
        GpioStatus.Text = "There is no GPIO controller on this device.";
        return;
    }

    pin = gpio.OpenPin(LED_PIN);

    // Show an error if the pin wasn't initialized properly
    if (pin == null)
    {
        GpioStatus.Text = "There were problems initializing the GPIO pin.";
        return;
    }
    pin.SetDriveMode(GpioPinDriveMode.Output);
    pin.Write(GpioPinValue.High);
    pin.Write(GpioPinValue.Low);
    pin.Write(GpioPinValue.High);
    GpioStatus.Text = "GPIO pin initialized correctly.";
}
{% endhighlight %}

* 通过 SPI 通信读取传感器数据并使 LED 亮起

{% highlight C# %}
private int LEDStatus = 0;
private const int LED_PIN = 6;
private GpioPin pin;

/*Raspberry Pi 2  Parameters*/
private const string SPI_CONTROLLER_NAME = "SPI0";  /* For Raspberry Pi 2, use SPI0                             */
private const Int32 SPI_CHIP_SELECT_LINE = 0;       /* Line 0 maps to physical pin number 24 on the RPi2        */

/*Channel configuration for MCP3208, Uncomment this if you are using MCP3208*/

// byte[] readBuffer = new byte[3]; /*this is defined to hold the output data*/
// byte[] writeBuffer = new byte[3] { 0x06, 0x00, 0x00 };//00000110 0 0; /* It is SPI port serial input pin, and is used to load channel configuration data into the device*/

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
private void LightLED()
{
    /*Uncomment this if you are using MCP3208*/
	// if (res > (4096/2))
    // {
    //     pin.Write(GpioPinValue.Low);
    // }else
    // {
    //     pin.Write(GpioPinValue.High);
    // }

	/*Uncomment this if you are using MCP3002*/
    if (res > 1024/2)
    {
        pin.Write(GpioPinValue.Low);
    }else
    {
        pin.Write(GpioPinValue.High);
    }
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
选择 `Debug` 和 `ARM` 配置、选择 `Remote Machine`、右键单击该项目、在“属性”下单击“调试标记”、将 Raspberry Pi 2 IP 放入“远程计算机”字段中，然后取消单击 `Use authentication`

按 `F5`

启用电位计按钮后，你将在屏幕上看到数字出现变化。此外，当该数字大于 2^10/2 时，LED 将会打开。否则，LED 处于关闭状态。

<img src="{{site.baseurl}}/images/Potentiometer/Deploy.PNG" height="400">
