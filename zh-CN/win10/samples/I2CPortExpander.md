---
layout: default
title: I2C 端口扩展器示例
permalink: /zh-cn/win10/samples/I2CPortExpander.htm
lang: zh-cn
---

##I2C 端口扩展器示例

{% include VerifiedVersion.md %}

![I2C 端口扩展器图像]({{site.baseurl}}/Resources/images/I2CPortExpander/PortExpanderProjectPicture_480.png)

在本示例中，我们会将一个 I2C 端口扩展器连接到你的 Raspberry Pi 2，并创建一个简单的应用，以便将该端口扩展器用于读取触摸开关的状态并控制 LED。无需具备 I2C 或端口扩展器的相关背景知识。如果你希望了解有关 I2C 的详细信息，Sparkfun 提供了一个出色的[与 I2C 相关的教程](https://learn.sparkfun.com/tutorials/i2c){:target="_blank"}。

这是一个有外设示例，所以请确保你的设备处于有外设模式下，方法为运行以下命令：`setbootoption.exe headed`（更改有外设/无外设状态需要重新启动）。

###将 I2C 端口扩展器连接到你的设备

你将需要以下组件：

* 一个 Raspberry Pi 2

* PDIP 程序包中的<a name="I2C_PortExpander"></a>一个 [MCP23008 8 位 I/O 端口扩展器](http://www.digikey.com/product-detail/en/MCP23008-E%2FP/MCP23008-E%2FP-ND/735951){:target="_blank"}

* 一个[红色 LED](http://www.digikey.com/product-detail/en/C5SMF-RJS-CT0W0BB1/C5SMF-RJS-CT0W0BB1-ND/2341832){:target="_blank"}

* 1 个[触摸开关](http://www.digikey.com/product-detail/en/320.02E11.08BLK/EG1311-ND/101397){:target="_blank"}

* 1 个 [330 &#x2126; 电阻器](http://www.digikey.com/product-detail/en/CFR-25JB-52-330R/330QBK-ND/1636){:target="_blank"}

* 1 个 [10k &#x2126; 电阻器](http://www.digikey.com/product-detail/en/CFR-25JB-52-10K/10KQBK-ND/338){:target="_blank"}

* 一台 HDMI 监视器

* 一块试验板以及多根公母头连接线和双公头连接线

我们先来为试验板上的组件布线，如下图所示。

**注意： 确保在连接电路时关闭 RPi2 电源。若要降低构建期间意外出现短路的几率，这是一个很好的做法。**

![试验板连接]({{site.baseurl}}/Resources/images/I2CPortExpander/I2cPortExpanderDrawing_bb_750.png)

*使用 [Fritzing](http://fritzing.org/) 制作的图像*


以下是电路原理图：

![电路示意图]({{site.baseurl}}/Resources/images/I2CPortExpander/I2cPortExpanderDrawing_schem.png)

*使用 [Fritzing](http://fritzing.org/) 制作的图像*


####连接 MCP23008 端口扩展器

将 MCP23008 端口扩展器置于你的试验板之上，以便它可以跨该试验板的中隙。

![试验板 IC 位置]({{site.baseurl}}/Resources/images/BreadBoardICPlacement.png)

*使用 [Fritzing](http://fritzing.org/) 制作的图像*


 通过在 IC 上查找槽口，找到该端口扩展器的引脚 1。如果你需要定向 IC 以便槽口尾部朝向左边，则引脚 1 将是该槽口下方的左下角区域中的第一个引脚。

![MCP23008 引脚位置]({{site.baseurl}}/Resources/images/I2CPortExpander/MCP23008_PortExpander_bb.png)

*使用 [Fritzing](http://fritzing.org/) 制作的图像*

MCP23008 的引脚输出如下所示，并且可以在[数据表](http://ww1.microchip.com/downloads/en/DeviceDoc/21919e.pdf){:target="_blank"}中找到。

![MCP23008 引脚输出]({{site.baseurl}}/Resources/images/I2CPortExpander/MCP23008_Pinout.PNG)

*使用 [Fritzing](http://fritzing.org/) 制作的图像*


在 MCP23008 端口扩展器上建立以下连接：

* 引脚 1 **SCL**： 连接到 RPi2 上的 **I2C1 SCL**（引脚 5）（引脚映射如下所示）

* 引脚 2 **SDA**： 连接到 RPi2 上的 **I2C1 SDA**（引脚 3）

* 引脚 3 **A2**： 连接到试验板一侧的地轨（蓝色条带）

* 引脚 4 **A1**： 连接到试验板一侧的地轨

* 引脚 5 **A0**： 连接到试验板一侧的地轨

* 引脚 6 **重置**： 连接到试验板一侧的电源轨道（红色条带）

* 引脚 9 **VSS**： 连接到试验板一侧的地轨

* 引脚 10 **GP0**： 连接到 LED 的阴极（较短的阴极引线）

* 引脚 11 **GP1**： 连接到 10k &#x2126; 电阻器中的一条引线和触摸开关的一个引脚

* 引脚 18 **VDD**： 连接到试验板一侧的电源轨道

让 MCP23008 上的剩余引脚保持不连接。


####连接 LED

* 如果尚未连接，则将 LED 阴极（较短的阴极引线）连接到 MCP23008 端口扩展器的引脚 10

* 将 LED 阳极（较长的阳极引线）连接到 330 &#x2126; 电阻器中的一条引线

* 将 330 &#x2126; 电阻器的另一端连接到试验板一侧的电源轨道（红色条带）


####连接触摸开关

* 如果尚未连接，则将 10k &#x2126; 电阻器中的一条引线连接到 MCP23008 端口扩展器的引脚 11

* 将 10k &#x2126; 电阻器的另一端连接到试验板一侧的电源轨道（红色条带）

* 如果尚未连接，则将触摸开关中的一个引脚连接到 MCP23008 端口扩展器的引脚 11

* 将触摸开关中的另一个引脚连接到试验板一侧的地轨（蓝色条带）


####连接 Raspberry Pi 2

我们需要将 Raspberry Pi 2 上的电源、地线和 I2C 线接入 MCP23008 端口扩展器和试验板。

![Raspberry Pi 2 引脚输出]({{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png)

* 引脚 1 **3.3V PWR** 连接到试验板一侧的电源轨道（红色条带）

* 引脚 3 **I2C1 SDA** 如果尚未连接，连接到 MCP23008 端口扩展器的引脚 2

* 引脚 5 **I2C1 SCL** 如果尚未连接，连接到 MCP23008 端口扩展器的引脚 1

* 引脚 6 **GND** 连接到试验板一侧的地轨（蓝色条带）

I2C 总线需要在 SDA 和 SCL 线上使用上拉式电阻器。但是，我们在本例中使用的 Raspberry Pi 2 SDA 和 SCL 引脚已经有上拉式电阻器（它们已连接到 RPi2），所以我们不需要添加任何其他外部上拉式电阻器。有关 RPi2 IO 引脚的更多详细信息，请参阅 [Raspberry Pi 2 引脚映射页面]({{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm)。

###创建示例应用

在完成一切设置后，重新打开你的设备的电源。你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\I2CPortExpander` 来查找此示例的源代码，但作为练习，本教程将指导你完成从头开始创建此应用的完整步骤。打开 Visual Studio 并创建新的 C\# Windows 通用空白应用。依次单击“文件”-\>“新建”-\>“项目”，然后依次选择“模板”-\>“Visual C\#”-\>“Windows”-\>“通用”-\>“空白应用\(通用 Windows\)”。我们已将此示例命名为 **I2cPortExpanderLedSample**。

此示例中的代码将执行以下几项操作：

1. 初始化 I2C 总线和端口扩展器

2. 通过 I2C 与端口扩展器通信，以按照固定的时间间隔打开和关闭 LED

3. 通过 I2C 与端口扩展器通信，以按照固定的时间间隔检查触摸开关的状态（即，是否已被按下）

4. 将在已连接到 Raspberry Pi 2 的显示器上显示 LED 的开/关状态和触摸开关的按下/释放状态

5. 当触摸开关已按下时，LED 将停止闪光；当触摸开关已释放时，LED 将重新开始闪光

6. 检查用户是否已更改 LED 的闪光频率，并按需更新 LED 的闪光频率

####向 MainPage.xaml 添加内容

让我们向 MainPage 添加一些内容，这些内容会显示在已连接到 Raspberry Pi 2 的屏幕上。我们想要添加一个圆圈、两个文本框和一个滑块。圆圈用于模拟 LED 的开/关状态。滑块允许用户控制 LED 的闪光频率。文本框将提供有关滑块的信息并报告触摸按钮的状态。

* 从解决方案资源管理器中，选择 MainPage.xaml 文件。

* 在设计器的 XAML 部分中找到 `<Grid>` 标记，并添加以下标记：

<UL>

{% highlight XML %}
<Grid Background="Black">
    <StackPanel HorizontalAlignment="Center" VerticalAlignment="Center">
        <Ellipse x:Name="Led" Fill="LightGray" Stroke="White" Width="100" Height="100" Margin="10"/>
        <TextBlock x:Name="DelayText" Text="500ms" Margin="10" TextAlignment="Center" FontSize="26.667" />
        <Slider x:Name="Delay" Width="200" Value="500" Maximum="1000" LargeChange="100" SmallChange="10" Margin="10" ValueChanged="Delay_ValueChanged" StepFrequency="10"/>
        <TextBlock x:Name="ButtonStatusText" Text="Button Status: Initializing...." Margin="10,50,10,10" TextAlignment="Center" FontSize="26.667" />
    </StackPanel>
</Grid>
{% endhighlight %}
</UL>

####将代码添加到 MainPage.xaml.cs

在向 MainPage.xaml.cs 添加任何代码之前，我们需要添加对 Windows IoT 扩展 SDK 的引用。

 * 在“解决方案资源管理器”中，右键单击“引用”，然后选择“添加引用...”

 * 在“引用管理器”窗口中，单击“Windows 通用”旁的箭头，然后单击“扩展”

 * 在“Windows IoT 扩展 SDK”旁的框中放入一个复选标记，然后单击“确定”

 * 从解决方案资源管理器打开 MainPage.xaml.cs（可能需要先单击 MainPage.xaml 旁边的箭头）

 * 在 MainPage.xaml 的顶部添加以下行

{% highlight C# %}
using Windows.Devices.Enumeration;
using Windows.Devices.I2c;
{% endhighlight %}


添加引用后，让我们开始添加代码。我们针对 MainPage.xaml.cs 实现的完整代码位于本部分的末尾处。以下是该代码的一些关键部分，带有相关说明


变量和常量

{% highlight C# %}
// use these constants for controlling how the I2C bus is setup
private const string I2C_CONTROLLER_NAME = "I2C1"; //specific to RPI2
private const byte PORT_EXPANDER_I2C_ADDRESS = 0x20; // 7-bit I2C address of the port expander
private const byte PORT_EXPANDER_IODIR_REGISTER_ADDRESS = 0x00; // IODIR register controls the direction of the GPIO on the port expander
private const byte PORT_EXPANDER_GPIO_REGISTER_ADDRESS = 0x09; // GPIO register is used to read the pins input
private const byte PORT_EXPANDER_OLAT_REGISTER_ADDRESS = 0x0A; // Output Latch register is used to set the pins output high/low
private const double TIMER_INTERVAL = 500; // value is milliseconds and denotes the timer interval
private const double BUTTON_STATUS_CHECK_TIMER_INTERVAL = 50;

private byte LED_GPIO_PIN = 0x01; // using GPIO pin 0 on the port expander for the LED
private byte PUSHBUTTON_GPIO_PIN = 0x02; // using GPIO pin 1 on the port expander for reading the toggle button status

private byte iodirRegister; // local copy of I2C Port Expander IODIR register
private byte gpioRegister; // local copy of I2C Port Expander GPIO register
private byte olatRegister; // local copy of I2C Port Expander OLAT register

private I2cDevice i2cPortExpander;
private DispatcherTimer ledTimer;
private DispatcherTimer buttonStatusCheckTimer;

private bool isLedOn = false;
private bool isButtonPressed = false;

private SolidColorBrush redBrush = new SolidColorBrush(Windows.UI.Colors.Red);
private SolidColorBrush grayBrush = new SolidColorBrush(Windows.UI.Colors.LightGray);
{% endhighlight %}

下面是其中一些常量和变量所表示的内容

 * `I2C_CONTROLLER_NAME` 包含字符串常量 `I2C1`，它是 Raspberry Pi 2 上 I2C 控制器的名称。

 * `PORT_EXPANDER_I2C_ADDRESS` 是我们使用的端口扩展器的 I2C 地址。\*

 * `PORT_EXPANDER_IODIR_REGISTER_ADDRESS`、`PORT_EXPANDER_GPIO_REGISTER_ADDRESS`、`PORT_EXPANDER_OLAT_REGISTER_ADDRESS` 均为端口扩展器中的寄存器地址，它们分别对应于 IODIR 寄存器、GPIO 寄存器和 OLAT 寄存器。\*

 * `TIMER_INTERVAL` 是 LED 在打开或关闭之间切换的启动时间间隔（以毫秒为单位）。

 * `BUTTON_STATUS_CHECK_TIMER_INTERVAL` 是每次检查触摸开关状态的时间间隔（以毫秒为单位）

 * `iodirRegister`、`gpioRegister` 和 `olatRegister` 是相关值的本地副本，它们分别对应于端口扩展器中的三种寄存器。

\* 有关详细信息，请参阅 [MCP23008 数据表](http://ww1.microchip.com/downloads/en/DeviceDoc/21919e.pdf){:target="_blank"}。

方法 `InitializeSystem()`

`InitializeSystem()` 将执行以下操作：

 * 在 Raspberry Pi 2 上设置 I2C 通信

 * 将端口扩展器配置为能够打开和关闭 LED 并获取触摸开关状态

 * 初始化端口扩展器寄存器 IODIR、GPIO 和 OLAT 的本地副本

 * 设置两个计时器 - 一个用于控制 LED，另一个用于检查触摸开关状态

操作完成后，变量 `i2cPortExpander` 将用于处理 Raspberry Pi 2 I2C 总线。

{% highlight C# %}
private async void InitializeSystem()
{
    byte[] i2CWriteBuffer;
    byte[] i2CReadBuffer;
    byte bitMask;

    // initialize I2C communications
    try
    {
        var i2cSettings = new I2cConnectionSettings(PORT_EXPANDER_I2C_ADDRESS);
        string deviceSelector = I2cDevice.GetDeviceSelector(I2C_CONTROLLER_NAME);
        var i2cDeviceControllers = await DeviceInformation.FindAllAsync(deviceSelector);
        i2cPortExpander = await I2cDevice.FromIdAsync(i2cDeviceControllers[0].Id, i2cSettings);
    }
    catch (Exception e)
    {
        System.Diagnostics.Debug.WriteLine("Exception: {0}", e.Message);
        return;
    }

    // initialize I2C Port Expander registers
    try
    {
        // initialize local copies of the IODIR, GPIO, and OLAT registers
        i2CReadBuffer = new byte[1];

        // read in each register value on register at a time (could do this all at once but
        // for example clarity purposes we do it this way)
        i2cPortExpander.WriteRead(new byte[] { PORT_EXPANDER_IODIR_REGISTER_ADDRESS }, i2CReadBuffer);
        iodirRegister = i2CReadBuffer[0];

        i2cPortExpander.WriteRead(new byte[] { PORT_EXPANDER_GPIO_REGISTER_ADDRESS }, i2CReadBuffer);
        gpioRegister = i2CReadBuffer[0];

        i2cPortExpander.WriteRead(new byte[] { PORT_EXPANDER_OLAT_REGISTER_ADDRESS }, i2CReadBuffer);
        olatRegister = i2CReadBuffer[0];

        // configure the LED pin output to be logic high, leave the other pins as they are.
        olatRegister |= LED_GPIO_PIN;
        i2CWriteBuffer = new byte[] { PORT_EXPANDER_OLAT_REGISTER_ADDRESS, olatRegister };
        i2cPortExpander.Write(i2CWriteBuffer);

        // configure only the LED pin to be an output and leave the other pins as they are.
        // input is logic low, output is logic high
        bitMask = (byte)(0xFF ^ LED_GPIO_PIN); // set the LED GPIO pin mask bit to '0', all other bits to '1'
        iodirRegister &= bitMask;
        i2CWriteBuffer = new byte[] { PORT_EXPANDER_IODIR_REGISTER_ADDRESS, iodirRegister };
        i2cPortExpander.Write(i2CWriteBuffer);

    }
    catch (Exception e)
    {
        System.Diagnostics.Debug.WriteLine("Exception: {0}", e.Message);
        return;
    }

    // setup our timers, one for the LED blink interval, the other for checking button status
    try
    {
        ledTimer = new DispatcherTimer();
        ledTimer.Interval = TimeSpan.FromMilliseconds(TIMER_INTERVAL);
        ledTimer.Tick += LedTimer_Tick;
        ledTimer.Start();

        buttonStatusCheckTimer = new DispatcherTimer();
        buttonStatusCheckTimer.Interval = TimeSpan.FromMilliseconds(BUTTON_STATUS_CHECK_TIMER_INTERVAL);
        buttonStatusCheckTimer.Tick += ButtonStatusCheckTimer_Tick;
        buttonStatusCheckTimer.Start();
    }
    catch (Exception e)
    {
        System.Diagnostics.Debug.WriteLine("Exception: {0}", e.Message);
        return;
    }
}
{% endhighlight %}

方法 `FlipLED()`

只要 LED 计时器一接近其时间间隔长度的尾声，ledTimer 便会调用 `FlipLED()`。此时间间隔最初设定为 500 毫秒，但用户可以通过显示在已连接到 RPi2 的监视器上的滑块更改该时间间隔。

 此方法可确定 LED 当前是处于打开状态还是关闭状态。

 * 如果 LED 当前处于关闭状态，它会将相关命令发送给端口扩展器以打开 LED，并将显示器上圆圈的颜色设置为红色。

 * 如果 LED 当前处于打开状态，它会将相关命令发送给端口扩展器以关闭 LED，并将显示器上圆圈的颜色设置为灰色。

{% highlight C# %}
private void FlipLED()
{
    byte bitMask;
    if (isLedOn == true)
    {
        // turn off the LED
        isLedOn = false;
        olatRegister |= LED_GPIO_PIN;
        i2cPortExpander.Write(new byte[] { PORT_EXPANDER_OLAT_REGISTER_ADDRESS, olatRegister });
        Led.Fill = grayBrush;
    }
    else
    {
        // turn on the LED
        isLedOn = true;
        bitMask = (byte)(0xFF ^ LED_GPIO_PIN);
        olatRegister &= bitMask;
        i2cPortExpander.Write(new byte[] { PORT_EXPANDER_OLAT_REGISTER_ADDRESS, olatRegister });
        Led.Fill = redBrush;
    }
}
{% endhighlight %}

`CheckButtonStatus()` 可与端口扩展器通信，以获取触摸开关状态。它将读取端口扩展器上的 GPIO 寄存器，并检查第二个位的值，该值对应于开关的状态。

 * 如果 GPIO 寄存器的第二个位为“0”，则表示该开关当前已按下。

 * 如果 GPIO 寄存器的第二个位为“1”，则表示该开关当前已释放。

此方法可更新显示到屏幕的文本框中的文本，以便于反映该开关的状态。

{% highlight C# %}
private void CheckButtonStatus()
{
    byte[] readBuffer = new byte[1];
    i2cPortExpander.WriteRead(new byte[] { PORT_EXPANDER_GPIO_REGISTER_ADDRESS }, readBuffer);

    // a button press results in a logic low for the GPIO pin
    if ((byte)(readBuffer[0] & PUSHBUTTON_GPIO_PIN) == 0x00  )
    {
        ButtonStatusText.Text = "Button Status: Pressed";
        isButtonPressed = true;
    }
    else
    {
        ButtonStatusText.Text = "Button Status: Released";
        isButtonPressed = false;
    }
}
{% endhighlight %}

###生成、部署并运行应用

让我们在自己的 Raspberry Pi 2 上生成、部署和运行应用。

* 如果通过上述代码创建的应用尚未打开，请在 Visual Studio 中打开它。

* 按照[设置远程调试并部署应用]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#csharp)的说明进行操作。

一段时间过后，你将看到已连接到 RPi2 的屏幕上出现变化，即，将显示一个圆圈、一些文本和一个滑块。试验板上的 LED 将开始打开和关闭。

![I2C 端口扩展器屏幕截图]({{site.baseurl}}/Resources/images/I2CPortExpander/I2CPortExpanderScreenShot_300p.png)

恭喜！ 你已成功将一个 I2C 端口扩展器连接到你的 Raspberry Pi 2。

###完整的 MainPage.xaml.cs 代码

{% highlight C# %}
using System;
//using System.Diagnostics;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using Windows.Devices.Enumeration;
using Windows.Devices.I2c;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace I2cPortExpanderLedSample
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        // use these constants for controlling how the I2C bus is setup
        private const string I2C_CONTROLLER_NAME = "I2C1"; //specific to RPI2
        private const byte PORT_EXPANDER_I2C_ADDRESS = 0x20; // 7-bit I2C address of the port expander
        private const byte PORT_EXPANDER_IODIR_REGISTER_ADDRESS = 0x00; // IODIR register controls the direction of the GPIO on the port expander
        private const byte PORT_EXPANDER_GPIO_REGISTER_ADDRESS = 0x09; // GPIO register is used to read the pins input
        private const byte PORT_EXPANDER_OLAT_REGISTER_ADDRESS = 0x0A; // Output Latch register is used to set the pins output high/low
        private const double TIMER_INTERVAL = 500; // value is milliseconds and denotes the timer interval
        private const double BUTTON_STATUS_CHECK_TIMER_INTERVAL = 50;

        private byte LED_GPIO_PIN = 0x01; // using GPIO pin 0 on the port expander for the LED
        private byte PUSHBUTTON_GPIO_PIN = 0x02; // using GPIO pin 1 on the port expander for reading the toggle button status

        private byte iodirRegister; // local copy of I2C Port Expander IODIR register
        private byte gpioRegister; // local copy of I2C Port Expander GPIO register
        private byte olatRegister; // local copy of I2C Port Expander OLAT register

        private I2cDevice i2cPortExpander;
        private DispatcherTimer ledTimer;
        private DispatcherTimer buttonStatusCheckTimer;

        private bool isLedOn = false;
        private bool isButtonPressed = false;

        private SolidColorBrush redBrush = new SolidColorBrush(Windows.UI.Colors.Red);
        private SolidColorBrush grayBrush = new SolidColorBrush(Windows.UI.Colors.LightGray);

        public MainPage()
        {
            this.InitializeComponent();

            // Register for the unloaded event so we can clean up upon exit
            Unloaded += MainPage_Unloaded;

            InitializeSystem();
        }

        private async void InitializeSystem()
        {
            byte[] i2CWriteBuffer;
            byte[] i2CReadBuffer;
            byte bitMask;

            // initialize I2C communications
            try
            {
                var i2cSettings = new I2cConnectionSettings(PORT_EXPANDER_I2C_ADDRESS);
                i2cSettings.BusSpeed = I2cBusSpeed.FastMode;
                string deviceSelector = I2cDevice.GetDeviceSelector(I2C_CONTROLLER_NAME);
                var i2cDeviceControllers = await DeviceInformation.FindAllAsync(deviceSelector);
                i2cPortExpander = await I2cDevice.FromIdAsync(i2cDeviceControllers[0].Id, i2cSettings);
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine("Exception: {0}", e.Message);
                return;
            }

            // initialize I2C Port Expander registers
            try
            {
                // initialize local copies of the IODIR, GPIO, and OLAT registers
                i2CReadBuffer = new byte[1];

                // read in each register value on register at a time (could do this all at once but
                // for example clarity purposes we do it this way)
                i2cPortExpander.WriteRead(new byte[] { PORT_EXPANDER_IODIR_REGISTER_ADDRESS }, i2CReadBuffer);
                iodirRegister = i2CReadBuffer[0];

                i2cPortExpander.WriteRead(new byte[] { PORT_EXPANDER_GPIO_REGISTER_ADDRESS }, i2CReadBuffer);
                gpioRegister = i2CReadBuffer[0];

                i2cPortExpander.WriteRead(new byte[] { PORT_EXPANDER_OLAT_REGISTER_ADDRESS }, i2CReadBuffer);
                olatRegister = i2CReadBuffer[0];

                // configure the LED pin output to be logic high, leave the other pins as they are.
                olatRegister |= LED_GPIO_PIN;
                i2CWriteBuffer = new byte[] { PORT_EXPANDER_OLAT_REGISTER_ADDRESS, olatRegister };
                i2cPortExpander.Write(i2CWriteBuffer);

                // configure only the LED pin to be an output and leave the other pins as they are.
                // input is logic low, output is logic high
                bitMask = (byte)(0xFF ^ LED_GPIO_PIN); // set the LED GPIO pin mask bit to '0', all other bits to '1'
                iodirRegister &= bitMask;
                i2CWriteBuffer = new byte[] { PORT_EXPANDER_IODIR_REGISTER_ADDRESS, iodirRegister };
                i2cPortExpander.Write(i2CWriteBuffer);

            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine("Exception: {0}", e.Message);
                return;
            }

            // setup our timers, one for the LED blink interval, the other for checking button status
            try
            {
                ledTimer = new DispatcherTimer();
                ledTimer.Interval = TimeSpan.FromMilliseconds(TIMER_INTERVAL);
                ledTimer.Tick += LedTimer_Tick;
                ledTimer.Start();

                buttonStatusCheckTimer = new DispatcherTimer();
                buttonStatusCheckTimer.Interval = TimeSpan.FromMilliseconds(BUTTON_STATUS_CHECK_TIMER_INTERVAL);
                buttonStatusCheckTimer.Tick += ButtonStatusCheckTimer_Tick;
                buttonStatusCheckTimer.Start();
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine("Exception: {0}", e.Message);
                return;
            }
        }

        private void MainPage_Unloaded(object sender, object args)
        {
            /* Cleanup */
            i2cPortExpander.Dispose();
        }

        private void FlipLED()
        {
            byte bitMask;
            if (isLedOn == true)
            {
                // turn off the LED
                isLedOn = false;
                olatRegister |= LED_GPIO_PIN;
                i2cPortExpander.Write(new byte[] { PORT_EXPANDER_OLAT_REGISTER_ADDRESS, olatRegister });
                Led.Fill = grayBrush;
            }
            else
            {
                // turn on the LED
                isLedOn = true;
                bitMask = (byte)(0xFF ^ LED_GPIO_PIN);
                olatRegister &= bitMask;
                i2cPortExpander.Write(new byte[] { PORT_EXPANDER_OLAT_REGISTER_ADDRESS, olatRegister });
                Led.Fill = redBrush;
            }
        }

        private void TurnOffLED()
        {
            isLedOn = false;
            olatRegister |= LED_GPIO_PIN;
            i2cPortExpander.Write(new byte[] { PORT_EXPANDER_OLAT_REGISTER_ADDRESS, olatRegister });
            Led.Fill = grayBrush;
        }

        private void CheckButtonStatus()
        {
            byte[] readBuffer = new byte[1];
            i2cPortExpander.WriteRead(new byte[] { PORT_EXPANDER_GPIO_REGISTER_ADDRESS }, readBuffer);

            // a button press results in a logic low for the GPIO pin
            if ((byte)(readBuffer[0] & PUSHBUTTON_GPIO_PIN) == 0x00  )
            {
                ButtonStatusText.Text = "Button Status: Pressed";
                isButtonPressed = true;
            }
            else
            {
                ButtonStatusText.Text = "Button Status: Released";
                isButtonPressed = false;
            }
        }

        private void LedTimer_Tick(object sender, object e)
        {
            if (isButtonPressed == false)
            {
                FlipLED();
            }
        }

        private void ButtonStatusCheckTimer_Tick(object sender, object e)
        {
            CheckButtonStatus();
        }

        private void Delay_ValueChanged(object sender, RangeBaseValueChangedEventArgs e)
        {
            if (ledTimer == null)
            {
                return;
            }
            if (e.NewValue == Delay.Minimum)
            {
                DelayText.Text = "Stopped";
                ledTimer.Stop();
                TurnOffLED();
            }
            else
            {
                DelayText.Text = e.NewValue + "ms";
                ledTimer.Interval = TimeSpan.FromMilliseconds(e.NewValue);
                ledTimer.Start();
            }
        }
    }
}
{% endhighlight %}
