---
layout: default
title: 移位寄存器示例
permalink: /zh-cn/win10/samples/ShiftRegisterSample.htm
lang: zh-cn
---

##移位寄存器示例

{% include VerifiedVersion.md %}

![移位寄存器示例图像]({{site.baseurl}}/Resources/images/ShiftRegister/ShiftRegisterProjectPicture_480.png)

在本示例中，我们将一个采用串行输入和并行输出的 8 位移位寄存器连接到你的 Raspberry Pi 2\*，并创建一个使用该移位寄存器控制八个 LED 的简单应用。

这是一个有外设示例，所以请确保你的设备处于有外设模式下，方法为运行以下命令：`setbootoption.exe headed`（更改有外设/无外设状态将需要重新启动）。

*\* 此示例仅适用于 Raspberry Pi 2，而在 Minnowboard Max 或 DragonBoard 410c 上并不受支持。

###将移位寄存器连接到你的设备

你将需要以下组件：

* 一个 Raspberry Pi 2

* 1 个 [74HC595N 串行输入、并行输出的移位寄存器](http://www.digikey.com/product-detail/en/SN74HC595N/296-1600-5-ND/277246)

* 4 个[蓝色 LED](http://www.digikey.com/product-detail/en/C503B-BCS-CV0Z0461/C503B-BCS-CV0Z0461-ND/1922944)

* 4 个[绿色 LED](http://www.digikey.com/product-detail/en/C503B-GCN-CY0C0791/C503B-GCN-CY0C0791-ND/1922940)

* 8 个[ 330 &#x2126; 电阻器](http://www.digikey.com/product-detail/en/CFR-25JB-52-330R/330QBK-ND/1636)

* 一台 HDMI 监视器

* 一块试验板以及多根公母头连接线和双公头连接线

我们先来为试验板上的组件布线，如下图所示。

**注意： 确保在连接电路时关闭 RPi2 电源。若要降低构建期间意外出现短路的几率，这是一个很好的做法。**

![试验板连接]({{site.baseurl}}/Resources/images/ShiftRegister/ShiftRegisterSampleDrawing_bb_50.png)

*使用 [Fritzing](http://fritzing.org/) 制作的图像*


以下是电路原理图：

![电路示意图]({{site.baseurl}}/Resources/images/ShiftRegister/ShiftRegisterSampleDrawing_schem_75.png)

*使用 [Fritzing](http://fritzing.org/) 制作的图像*


####连接 74HC595N 移位寄存器

将移位寄存器置于你的试验板之上，以便它可以跨该试验板的中隙。

![试验板 IC 位置]({{site.baseurl}}/Resources/images/BreadBoardICPlacement.png)

*使用 [Fritzing](http://fritzing.org/) 制作的图像*


通过在 IC 上查找槽口，找到 74HC595N 移位寄存器的引脚 1。如果你需要定向 IC 以便槽口尾部朝向左边，则引脚 1 将是该槽口下方的左下角区域中的第一个引脚。

![74HC595N 引脚位置]({{site.baseurl}}/Resources/images/ShiftRegister/FindNotchPin1.png)

*使用 [Fritzing](http://fritzing.org/) 制作的图像*

74HC595N 的引脚输出如下所示，并且可以在[数据表](http://www.ti.com/lit/ds/symlink/sn74hc595.pdf)中找到。

![74HC595N 引脚输出]({{site.baseurl}}/Resources/images/ShiftRegister/ShiftRegister74HC595_pinout.png)

*使用 [Fritzing](http://fritzing.org/) 制作的图像*

在 74HC595N 移位寄存器上建立以下连接：

* 引脚 1、2、3、4、5、6、7 和引脚 15（**Q0** 至 **Q7**）： 将上述每一个引脚都连接到 330 &#x2126; 电阻器，即一个 330 &#x2126; 电阻器用于每个引脚

* 引脚 8 **GND**： 连接到试验板一侧的地轨（蓝色条带）

* 引脚 9 **Q7'**： 保持不连接

* 引脚 10 **SRCLR**： 连接到 RPi2 上的 **GPIO 12**（引脚 32）（引脚映射如下所示）

* 引脚 11 **SRCLK**： 连接到 RPi2 上的 **GPIO 18**（引脚 12）

* 引脚 12 **RCLK**： 连接到 RPi2 上的 **GPIO 5**（引脚 29）

* 引脚 13 **OE**： 连接到 RPi2 上的 **GPIO 6**（引脚 31）

* 引脚 14 **SER**： 连接到 RPi2 上的 **GPIO 27**（引脚 13）

* 引脚 15 **Q7**： 请参阅上述内容。

* 引脚 16 **VCC**： 连接到试验板一侧的电源轨道（红色条带）

####连接 LED 和电阻器

让我们向试验板添加 LED 和电阻器。

* 如果 8 个 330 &#x2126; 电阻器尚未进行连接，则将它们放置在试验板上，然后将每一个电阻器连接到移位寄存器上相应的输出引脚（Q0 至 Q7）。

* 将 4 个绿色 LED 和 4 个蓝色 LED 的阴极（较短的阴极引线）连接到上一步中放在试验板上的 330 &#x2126; 电阻器的另一端。尝试将这些 LED 排成一排放置在试验板上。你可以自行决定绿色 LED 和蓝色 LED 的先后顺序。我们选择了替换 LED 颜色。

* 将这些 LED 的阳极（较长的阳极引线）连接到试验板一侧的电源轨道（红色条带）

操作完成后，你的试验板上应该会有一行（或几乎接近于一行）蓝色和绿色 LED。

* 每个移位寄存器输出（Q0 至 Q7）都应连接到 330 &#x2126; 电阻器。

* 这些 330 &#x2126; 电阻器中每一个电阻器的另一端都应该连接到某一 LED 的阴极。

* 每个 LED 都应将其阳极连接至电源轨道。

####连接 Raspberry Pi 2

我们需要将 Raspberry Pi 2 上的电源、地线和 I2C 线接入 74HC595N 移位寄存器和试验板。

![Raspberry Pi 2 引脚输出]({{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png)

* 引脚 2 **5V PWR** 连接到试验板一侧的电源轨道（红色条带）

* 引脚 6 **GND** 连接到试验板一侧的地轨（蓝色条带）

* 引脚 12 **GPIO18** 如果尚未连接，连接到移位寄存器上的 **SRCLK**（引脚 11）

* 引脚 13 **GPIO27** 如果尚未连接，连接到移位寄存器上的 **SER**（引脚 14）

* 引脚 29 **GPIO5** 如果尚未连接，连接到移位寄存器上的 **RCLK**（引脚 12）

* 引脚 31 **GPIO6** 如果尚未连接，连接到移位寄存器上的 **OE**（引脚 13）

* 引脚 32 **GPIO12** 如果尚未连接，连接到移位寄存器上的 **SRCLR**（引脚 10）

###创建示例应用

在完成一切设置后，重新打开你的设备的电源。你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\ShiftRegister` 来查找此示例的源代码，但作为练习，本教程将指导你完成从头开始创建此应用的完整步骤。打开 Visual Studio 并创建新的 C\# Windows 通用空白应用。依次单击“文件”-\>“新建”-\>“项目”，然后依次选择“模板”-\>“Visual C\#”-\>“Windows”-\>“通用”-\>“空白应用\(通用 Windows\)”。在本示例中，我们巧妙命名我们的 **ShiftRegisterSample**。

此示例中的代码将执行以下三项操作：

1. 初始化 RPi2 GPIO 引脚和 74HC595N 移位寄存器

2. 在常规时间间隔，它针对移位寄存器的串行输入上的一个数据位进行时钟输入操作。

3. 响应用户输入

    a.根据用户输入更改计时器延迟。这将导致 LED 的闪烁频率出现变化

    b.如果用户单击显示器上的“反转”按钮，将反转 LED 的闪光模式


####向 MainPage.xaml 添加内容

让我们向 MainPage 添加一些内容，这些内容会显示在已连接到 Raspberry Pi 2 的屏幕上。我们想要添加两个文本框、一个滑块和一个按钮。

* 滑块允许用户控制 LED 的闪光频率。

* 按钮允许用户反转 LED 所使用的闪烁模式。

* 文本框将提供有关滑块的信息。

让我们开始吧。

* 从解决方案资源管理器中，选择 MainPage.xaml 文件。

* 在设计器的 XAML 部分中找到 `<Grid>` 标记，并添加以下标记：

<UL>

{% highlight XML %}
<Grid Background="Black">
    <StackPanel HorizontalAlignment="Center" VerticalAlignment="Center">
        <TextBlock x:Name="DelayText" Text="500ms" Margin="10" TextAlignment="Center" FontSize="26.667" />
        <Slider x:Name="Delay" Width="200" Value="500" Maximum="1000" LargeChange="100" SmallChange="10" Margin="10" ValueChanged="Delay_ValueChanged" StepFrequency="10"/>
        <Button Name="ToggleButton" Content="Invert LEDs" FontSize="26.667" Width="400" HorizontalAlignment="Center" Height="50" Margin="10" Background="Red" Click="ToggleButtonClicked" />
        <TextBlock x:Name="GpioStatus" Text="Waiting to initialize GPIO..." Margin="10,50,10,10" TextAlignment="Center" FontSize="26.667" />
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
using Windows.Devices.Gpio;
{% endhighlight %}

添加引用后，让我们开始添加代码。我们针对 MainPage.xaml.cs 实现的完整代码位于本部分的末尾处。以下是该代码的一些关键部分，带有相关说明

变量和常量

{% highlight C# %}
// use these constants for controlling how the initial time interval for clocking in serial data to the shift register.
private const double TIMER_INTERVAL = 100; // value is milliseconds and denotes the timer interval
private const double TIME_DELAY = 1;

// The 74HC595N has five input pins that are used to control the device.
// See the datasheet http://www.ti.com/lit/ds/symlink/sn74hc595.pdf for details
// Shift Register Clock (SRCLK): the clock for the serial input to the shift register
private const int SRCLK_PIN = 18; // GPIO 18 is pin 12 on RPI2 header
private GpioPin shiftRegisterClock;

// Serial input (SER): the serial data input to the shift register. Use in conjunction with SRCLK.
private const int SER_PIN = 27; // GPIO 27 is pin 13 on RPI2 header
private GpioPin serial;

// Storage Register Clock (RCLK): the clock for clocking data from the serial input to the parallel output in the shift register
private const int RCLK_PIN = 5; // GPIO 5 is pin 29 on RPI2 header
private GpioPin registerClock;

// Output Enable (OE): When set low, the each of the eight shift register outputs (Q0, Q1,...Q7) are set high/low depending on the binary value in the storage register
private const int OE_PIN = 6; // GPIO 6 is pin 31 on RPI2 header
private GpioPin outputEnable;

// Storage Register Clock (SRCLK): the clock for clocking the current 8 bits of data from the serial input register to the storage register
private const int SRCLR_PIN = 12; // GPIO 12 is pin 32 on RPI2 header
private GpioPin shiftRegisterClear;

private DispatcherTimer timer;
private byte pinMask = 0x01;
private bool areLedsInverted = true;

private SolidColorBrush redBrush = new SolidColorBrush(Windows.UI.Colors.Red);
private SolidColorBrush grayBrush = new SolidColorBrush(Windows.UI.Colors.LightGray);
{% endhighlight %}

下面是其中一些常量和变量所表示的内容

 * `SRCLK_PIN`、`SER_PIN`、`RCLK_PIN`、`OE_PIN`、`SRCLR_PIN` 均代表已连接到对应的已命名移位寄存器控制引脚的 RPi2 GPIO 的编号。

 * `shiftRegisterClock`、`serial`、`registerClock`、`outputEnable`、`shiftRegisterClear` 均为 GPIO 对象，用于控制连接到对应的已命名移位寄存器引脚的 RPi2 GPIO 引脚。

 * `pinMask` 包含我们以一次一个位的方式计时到移位寄存器的数据位。pinMask 中的位表示 LED 的打开/关闭模式。位值为“1”表示 LED 已关闭，位值为“0”表示 LED 已打开。

方法 `InitializeSystem()`

`InitializeSystem()` 将执行以下操作：

 * 设置可用于控制数据并将其发送到移位寄存器的 RPi2 GPIO

 * 设置可用于控制 RPi2 向移位寄存器发送一个数据位的频率的计时器

{% highlight C# %}
private void InitializeSystem()
{
    // initialize the GPIO pins we will use for bit-banging our serial data to the shift register
    var gpio = GpioController.GetDefault();

    // Show an error if there is no GPIO controller
    if (gpio == null)
    {
        GpioStatus.Text = "There is no GPIO controller on this device.";
        return;
    }

    // setup the RPi2 GPIO that controls the shift register
    shiftRegisterClock = gpio.OpenPin(SRCLK_PIN);
    serial = gpio.OpenPin(SER_PIN);
    registerClock = gpio.OpenPin(RCLK_PIN);
    outputEnable = gpio.OpenPin(OE_PIN);
    shiftRegisterClear = gpio.OpenPin(SRCLR_PIN);

    // reset the pins to a known state
    shiftRegisterClock.Write(GpioPinValue.Low);
    shiftRegisterClock.SetDriveMode(GpioPinDriveMode.Output);
    serial.Write(GpioPinValue.Low);
    serial.SetDriveMode(GpioPinDriveMode.Output);
    registerClock.Write(GpioPinValue.Low);
    registerClock.SetDriveMode(GpioPinDriveMode.Output);
    outputEnable.Write(GpioPinValue.Low);
    outputEnable.SetDriveMode(GpioPinDriveMode.Output);
    shiftRegisterClear.Write(GpioPinValue.Low);
    shiftRegisterClear.SetDriveMode(GpioPinDriveMode.Output);

    // With the shiftRegisterClear GPIO set low, sending a rising edge on the register clock
    // will clear (set all bits to 0) the shift register
    registerClock.Write(GpioPinValue.High);

    // typically, when bit-banging a serial signal out, a delay is needed between setting the output
    // value and sending a rising or falling edge on the clock. However, the setup and hold
    // times for this shift register at 5V are in the nanoseconds (see datasheet) so we can cheat
    // a bit here by not adding a delay before driving the register clock low
    registerClock.Write(GpioPinValue.Low);
    shiftRegisterClear.Write(GpioPinValue.High);

    GpioStatus.Text = "GPIO pin initialized correctly.";

    try
    {
        timer = new DispatcherTimer();
        timer.Interval = TimeSpan.FromMilliseconds(TIMER_INTERVAL);
        timer.Tick += Timer_Tick;
        timer.Start();
    }
    catch (Exception e)
    {
        System.Diagnostics.Debug.WriteLine("Exception: {0}", e.Message);
        return;
    }
}
{% endhighlight %}

方法 `SendDataBit()`

在指定的时间间隔过后，计时器将调用 `SendDataBit()`。此方法可针对表示变量 `pinMask` 中最高有效位 \(MSB\) 的一个数据位进行时钟输出操作。该数据位可将时钟输入到移位寄存器的第一个位位置中。如果将 RPi2 的串行时钟引脚切换为在数据位中输入时钟，还会导致移位寄存器中的前八个数据位将一个位位置移位到上一丢失的位位置。在数据位中输入时钟后，`pinMask` 中的所有位都会向左移动一个位位置。是否选中 `pinMask` 的值取决于以下两个因素：LED 照明模式是否已设置为反转，以及“pinMask”的最低有效位 \(LSB\) 已设置为“1”还是“0”。

{% highlight C# %}
private void SendDataBit()
{
    if ((pinMask & 0x80) > 0)
    {
        serial.Write(GpioPinValue.High);
        shiftRegisterClock.Write(GpioPinValue.High);
        shiftRegisterClock.Write(GpioPinValue.Low);
        registerClock.Write(GpioPinValue.High);
        registerClock.Write(GpioPinValue.Low);
    }
    else
    {
        serial.Write(GpioPinValue.Low);
        shiftRegisterClock.Write(GpioPinValue.High);
        shiftRegisterClock.Write(GpioPinValue.Low);
        registerClock.Write(GpioPinValue.High);
        registerClock.Write(GpioPinValue.Low);
    }

    pinMask <<= 1;
    if (areLedsInverted)
    {
        if (pinMask == 0)
        {
            pinMask = 0x01;
        }
    }
    else
    {
        pinMask |= 0x01;
        if (pinMask == 0xFF)
        {
            pinMask &= 0xFE;
        }
    }
}
{% endhighlight %}

当应用用户在显示屏幕上单击用于反转 LED 的按钮时，将触发 `ToggleButtonClicked()`。此方法可反转 `pinMask` 中的所有位，并且可根据之前的状态设置或清除标志 `areLedsInverted`。最后，它将更改该按钮的颜色（如果 LED 已反转，则为红色；如果 LED 未反转，则为灰色）。

{% highlight C# %}
private void ToggleButtonClicked(object sender, RoutedEventArgs e)
{
    pinMask ^= 0xFF;
    if (areLedsInverted)
    {
        areLedsInverted = false;
        ToggleButton.Background = grayBrush;
    }
    else
    {
        areLedsInverted = true;
        ToggleButton.Background = redBrush;
    }
}
{% endhighlight %}

###生成、部署并运行应用

让我们在自己的 Raspberry Pi 2 上生成、部署和运行应用。

* 如果通过上述代码创建的应用尚未打开，请在 Visual Studio 中打开它。

* 按照[设置远程调试并部署应用]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#csharp)的说明进行操作。

一段时间过后，你将看到已连接到 RPi2 的屏幕出现变化，即，将显示一个滑块、一些文本和一个按钮。LED 将亮起，并将采用“pinMask”中设置的模式。

![ShiftRegister 屏幕截图]({{site.baseurl}}/Resources/images/ShiftRegister/ScreenShotA.png)

恭喜！ 你已成功将一个采用串行输入和并行输出的 8 位移位寄存器连接到你的 Raspberry Pi 2。

###完整的 MainPage.xaml.cs 代码

{% highlight C# %}
using System;
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
using Windows.Devices.Gpio;
// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace ShiftRegisterSample
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        // use these constants for controlling how the initial time interval for clocking in serial data to the shift register.
        private const double TIMER_INTERVAL = 100; // value is milliseconds and denotes the timer interval
        private const double TIME_DELAY = 1;

        // The 74HC595N has five input pins that are used to control the device.
        // See the datasheet http://www.ti.com/lit/ds/symlink/sn74hc595.pdf for details
        // Shift Register Clock (SRCLK): the clock for the serial input to the shift register
        private const int SRCLK_PIN = 18; // GPIO 18 is pin 12 on RPI2 header
        private GpioPin shiftRegisterClock;

        // Serial input (SER): the serial data input to the shift register. Use in conjunction with SRCLK.
        private const int SER_PIN = 27; // GPIO 27 is pin 13 on RPI2 header
        private GpioPin serial;

        // Storage Register Clock (RCLK): the clock for clocking data from the serial input to the parallel output in the shift register
        private const int RCLK_PIN = 5; // GPIO 5 is pin 29 on RPI2 header
        private GpioPin registerClock;

        // Output Enable (OE): When set low, the each of the eight shift register outputs (Q0, Q1,...Q7) are set high/low depending on the binary value in the storage register
        private const int OE_PIN = 6; // GPIO 6 is pin 31 on RPI2 header
        private GpioPin outputEnable;

        // Storage Register Clock (SRCLK): the clock for clocking the current 8 bits of data from the serial input register to the storage register
        private const int SRCLR_PIN = 12; // GPIO 12 is pin 32 on RPI2 header
        private GpioPin shiftRegisterClear;

        private DispatcherTimer timer;
        private byte pinMask = 0x01;
        private bool areLedsInverted = true;

        private SolidColorBrush redBrush = new SolidColorBrush(Windows.UI.Colors.Red);
        private SolidColorBrush grayBrush = new SolidColorBrush(Windows.UI.Colors.LightGray);

        public MainPage()
        {
            this.InitializeComponent();

            // Register for the unloaded event so we can clean up upon exit
            Unloaded += MainPage_Unloaded;

            InitializeSystem();
        }

        private void InitializeSystem()
        {
            // initialize the GPIO pins we will use for bit-banging our serial data to the shift register
            var gpio = GpioController.GetDefault();

            // Show an error if there is no GPIO controller
            if (gpio == null)
            {
                GpioStatus.Text = "There is no GPIO controller on this device.";
                return;
            }

            // setup the RPi2 GPIO that controls the shift register
            shiftRegisterClock = gpio.OpenPin(SRCLK_PIN);
            serial = gpio.OpenPin(SER_PIN);
            registerClock = gpio.OpenPin(RCLK_PIN);
            outputEnable = gpio.OpenPin(OE_PIN);
            shiftRegisterClear = gpio.OpenPin(SRCLR_PIN);

            // reset the pins to a known state
            shiftRegisterClock.Write(GpioPinValue.Low);
            shiftRegisterClock.SetDriveMode(GpioPinDriveMode.Output);
            serial.Write(GpioPinValue.Low);
            serial.SetDriveMode(GpioPinDriveMode.Output);
            registerClock.Write(GpioPinValue.Low);
            registerClock.SetDriveMode(GpioPinDriveMode.Output);
            outputEnable.Write(GpioPinValue.Low);
            outputEnable.SetDriveMode(GpioPinDriveMode.Output);
            shiftRegisterClear.Write(GpioPinValue.Low);
            shiftRegisterClear.SetDriveMode(GpioPinDriveMode.Output);

            // With the shiftRegisterClear GPIO set low, sending a rising edge on the register clock
            // will clear (set all bits to 0) the shift register
            registerClock.Write(GpioPinValue.High);

            // typically, when bit-banging a serial signal out, a delay is needed between setting the output
            // value and sending a rising or falling edge on the clock. However, the setup and hold
            // times for this shift register at 5V is in the nanoseconds (see datasheet) so we can cheat
            // a bit here by not adding a delay before driving the register clock low
            registerClock.Write(GpioPinValue.Low);
            shiftRegisterClear.Write(GpioPinValue.High);

            GpioStatus.Text = "GPIO pin initialized correctly.";

            try
            {
                timer = new DispatcherTimer();
                timer.Interval = TimeSpan.FromMilliseconds(TIMER_INTERVAL);
                timer.Tick += Timer_Tick;
                timer.Start();
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine("Exception: {0}", e.Message);
                return;
            }
        }

        private void MainPage_Unloaded(object sender, object args)
        {
            // Cleanup
            shiftRegisterClock.Dispose();
            serial.Dispose();
            registerClock.Dispose();
            outputEnable.Dispose();
            shiftRegisterClear.Dispose();
        }

        private void SendDataBit()
        {
            if ((pinMask & 0x80) > 0)
            {
                serial.Write(GpioPinValue.High);
                shiftRegisterClock.Write(GpioPinValue.High);
                shiftRegisterClock.Write(GpioPinValue.Low);
                registerClock.Write(GpioPinValue.High);
                registerClock.Write(GpioPinValue.Low);
            }
            else
            {
                serial.Write(GpioPinValue.Low);
                shiftRegisterClock.Write(GpioPinValue.High);
                shiftRegisterClock.Write(GpioPinValue.Low);
                registerClock.Write(GpioPinValue.High);
                registerClock.Write(GpioPinValue.Low);
            }

            pinMask <<= 1;
            if (areLedsInverted)
            {
                if (pinMask == 0)
                {
                    pinMask = 0x01;
                }
            }
            else
            {
                pinMask |= 0x01;
                if (pinMask == 0xFF)
                {
                    pinMask &= 0xFE;
                }
            }
        }

        private void Timer_Tick(object sender, object e)
        {
            SendDataBit();
        }

        private void Delay_ValueChanged(object sender, RangeBaseValueChangedEventArgs e)
        {
            if (timer == null)
            {
                return;
            }
            if (e.NewValue == Delay.Minimum)
            {
                DelayText.Text = "Stopped";
                timer.Stop();
            }
            else
            {
                DelayText.Text = e.NewValue + "ms";
                timer.Interval = TimeSpan.FromMilliseconds(e.NewValue);
                timer.Start();
            }
        }

        private void ToggleButtonClicked(object sender, RoutedEventArgs e)
        {
            pinMask ^= 0xFF;
            if (areLedsInverted)
            {
                areLedsInverted = false;
                ToggleButton.Background = grayBrush;
            }
            else
            {
                areLedsInverted = true;
                ToggleButton.Background = redBrush;
            }
        }
    }
}
{% endhighlight %}
