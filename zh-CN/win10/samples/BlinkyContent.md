#Blinky 示例

我们将创建一个简单的 LED 闪烁应用并将 LED 连接到你的 Windows 10 IoT Core 设备。

这是一个有外设的示例。若要更好地了解什么是有外设的模式以及如何将你的设备配置为有外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。

另外，还请注意 GPIO API 仅在 Windows 10 IoT Core 上可用，因此该示例无法在你的桌面上运行。

###在 Visual Studio 中加载项目

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\Blinky`，查找此示例的源代码。示例代码可采用 C++ 或 C\# 提供，但此处的文档仅详细介绍了 C\# 变体。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

###将 LED 连接到你的 Windows IoT 设备

你将会需要一些组件：

* 一个 LED（你喜欢的任意一种颜色）

* 一个 220 &#x2126; 电阻器

* 一块试验板和几根连接线

![电子元件]({{site.baseurl}}/Resources/images/Blinky/components.png)

###适用于 Raspberry Pi 2 \(RPi2\)

我们要将 LED 的一端连接到 RPi2 上的 GPIO 5（JP3 扩展头上的引脚 29），将另一端连接到电阻器，并将电阻器连接到 RPi2 上的 3.3 伏电源。请注意 LED 的正负极非常重要。请确保将较短的腿 \(-\) 连接到 GPIO 5 并将较长的腿 \(+\) 连接到电阻器，否则它不会点亮。

下面是 RPi2 的引出线：

<img src="{{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png" height="400">

<sub>\*使用 [Fritzing](http://fritzing.org/){:target="_blank"} 制作的图像\*</sub>

下面是使用电路组装的试验板可能样子的一个示例：

<img src="{{site.baseurl}}/Resources/images/Blinky/breadboard_assembled_rpi2.png" height="500">

<sub>\*使用 [Fritzing](http://fritzing.org/){:target="_blank"} 制作的图像\*</sub>

###适用于 MinnowBoard Max \(MBM\)

我们要将 LED 的一端连接到 MBM 上的 GPIO 5（JP1 扩展头上的引脚 18），将另一端连接到电阻器，并将电阻器连接到 MBM 上的 3.3 伏电源。请注意 LED 的正负极非常重要。请确保将较短的腿 \(-\) 连接到 GPIO 5 并将较长的腿 \(+\) 连接到电阻器，否则它不会点亮。

以下是 MBM 上的 JP1 连接器：

<img src="{{site.baseurl}}/Resources/images/PinMappings/MBM_Pinout.png" height="400">

<sub>\*使用 [Fritzing](http://fritzing.org/){:target="_blank"} 制作的图像\*</sub>

下面是使用电路组装的试验板可能样子的一个示例：

<img src="{{site.baseurl}}/Resources/images/Blinky/breadboard_assembled.png" height="500">

<sub>\*使用 [Fritzing](http://fritzing.org/){:target="_blank"} 制作的图像\*</sub>

###部署你的应用

{% include_relative AppDeploymentCS.md %}

完成所有设置后，你应可以在 Visual Studio 中按 F5。Blinky 应用将会部署并在 Windows IoT 设备上启动，此时你应会看到 LED 与屏幕上的模拟图像同步闪烁。

<img src="{{site.baseurl}}/Resources/images/Blinky/blinky-screenshot.png" height="400">

恭喜你！ 你已控制了 Windows IoT 设备上的一个 GPIO 引脚！

###我们来看看代码
此示例的代码相当简单。我们使用了一个计时器，每当调用“Tick”事件时，都会切换 LED 的状态。


###计时器代码
下面说明如何使用 C\# 语言设置计时器：

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
    FlipLED();
}
{% endhighlight %}

###初始化 GPIO 引脚
为了驱动 GPIO 引脚，首先我们需要对其进行初始化。以下是 C\# 代码（请注意我们如何在 Windows.Devices.Gpio 命名空间中利用新 WinRT 类）：

{% highlight C# %}
using Windows.Devices.Gpio;

private void InitGPIO()
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

    pin.Write(GpioPinValue.High);
    pin.SetDriveMode(GpioPinDriveMode.Output);

    GpioStatus.Text = "GPIO pin initialized correctly.";
}
{% endhighlight %}

让让我们稍稍细分一下此过程：

* 首先，我们使用 `GpioController.GetDefault()` 获取 GPIO 控制器。

* 如果设备没有 GPIO 控制器，则此函数将返回 `null`。

* 然后，我们尝试通过使用 `LED_PIN` 值调用 `GpioController.OpenPin()` 来打开引脚。

* 获取 `pin` 后，我们会使用 `GpioPin.Write()` 函数将它设置为默认的关闭状态（高）。

* 我们还使用了 `GpioPin.SetDriveMode()` 函数将 `pin` 设置为以输出模式运行。


###修改 GPIO 引脚的状态
在具有 `GpioOutputPin` 实例的访问权限后，没有必要再通过更改引脚状态来打开或关闭 LED。

若要打开 LED，只需将值 `GpioPinValue.Low` 写入引脚：

{% highlight C# %}
this.pin.Write(GpioPinValue.Low);
{% endhighlight %}

当然，写入 `GpioPinValue.High` 便会关闭 LED：

{% highlight C# %}
this.pin.Write(GpioPinValue.High);
{% endhighlight %}

记得我们已将 LED 的另一端连接到了 3.3 伏电源，因此，我们需要将引脚驱动到低位，使电流通过 LED。
