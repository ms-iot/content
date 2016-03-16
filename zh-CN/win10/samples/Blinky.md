---
layout: default
title: Blinky 示例
permalink: /zh-cn/win10/samples/Blinky.htm
lang: zh-cn
---

{: .thin-header}
##Blinky 示例

我们将创建一个简单的 LED 闪烁应用并将 LED 连接到你的 Windows 10 IoT Core 设备。

这是一个有外设的示例。若要更好地了解什么是有外设的模式以及如何将你的设备配置为有外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。

另外，还请注意 GPIO API 仅在 Windows 10 IoT Core 上可用，因此该示例无法在你的桌面上运行。

###在 Visual Studio 中加载项目

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\Blinky` 来查找此示例的源代码。示例代码可采用 C++ 或 C\# 提供，但此处的文档仅详细介绍了 C\# 变体。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

###将 LED 连接到你的 Windows IoT 设备


你将会需要一些组件：

* 一个 LED（任何你喜欢的颜色）

* 一个 220 &#x2126;适用于 Raspberry Pi 2 和 MinnowBoard Max 或 330 &#x2126; 的电阻器；适用于 DragonBoard 的电阻器

* 一块试验板和几根连接线

![电子元件]({{site.baseurl}}/Resources/images/Blinky/components.png)

###适用于 Raspberry Pi 2 \(RPi2\)

1. 将 LED 的较短的脚连接到 RPi2 上的 GPIO 5（扩展头上的引脚 29）。
2. 将 LED 的较长的脚连接到电阻器。
3. 将电阻器的另一端连接到 RPi2 上的 3.3V 引脚之一。
4. 请注意 LED 的正负极非常重要。（此配置通常称为低电平有效）

下面是 RPi2 的引出线：

<img src="{{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png" style="max-height:400px;">

下面是组装了电路的试验板的可能外观的一个示例：

<img src="{{site.baseurl}}/Resources/images/Blinky/breadboard_assembled_rpi2_kit.jpg" style="max-height:500px;">

<sub>\*使用 [Fritzing](http://fritzing.org/){:target="_blank"} 制作的图像\*</sub>


###适用于 MinnowBoard Max \(MBM\)

我们要将 LED 的一端连接到 MBM 上的 GPIO 5（JP1 扩展头上的引脚 18），将另一端连接到电阻器，并将电阻器连接到 MBM 上的 3.3 伏电源。请注意 LED 的正负极非常重要。请确保将较短的腿 \(-\) 连接到 GPIO 5 并将较长的腿 \(+\) 连接到电阻器，否则它不会点亮。

以下是 MBM 上的 JP1 连接器：

<img src="{{site.baseurl}}/Resources/images/PinMappings/MBM_Pinout.png" style="max-height:400px;">

下面是组装了电路的试验板的可能外观的一个示例：

<img src="{{site.baseurl}}/Resources/images/Blinky/breadboard_assembled.png" style="max-height:500px;">

<sub>\*使用 [Fritzing](http://fritzing.org/){:target="_blank"} 制作的图像\*</sub>

###适用于 DragonBoard 410c \(DB\)

作为参考，下图概述了低速扩展连接器的功能

<img src="{{site.baseurl}}/Resources/images/PinMappings/DB_Pinout.png" style="max-height:500px;">

执行以下步骤来创建电路：

1. 将 LED 的较短的脚连接到 DB 上的 GPIO 12（扩展头上的引脚 24）。
2. 将 LED 的较长的脚连接到电阻器。
* 请注意，LED 的正负极非常重要（此配置通常称为低电平有效）。
3. 将电阻的另一端连接到 1.8V（扩展头上的引脚 35）。

下面是组装了电路的试验板的可能外观的图示：

<img src="{{site.baseurl}}/Resources/images/Blinky/breadboard_assembled_db_kit.png" style="max-height:500px;">

<sub>使用 [Fritzing](http://fritzing.org/){:target="_blank"} 制作的图像</sub>

最后，示例代码的 _MainPage.xaml.cs_ 文件的 LED\_PIN 变量需要进行以下修改：

~~~
private const int LED_PIN = 12;
~~~
{: .language-c\#}

###部署你的应用

1. 应用程序在 Visual Studio 中打开后，在工具栏下拉列表中设置体系结构。如果你要针对 MinnowBoard Max 进行生成，请选择 `x86`。如果你要针对 Raspberry Pi 2 或 DragonBoard 进行生成，请选择 `ARM`。

2. 接下来，在 Visual Studio 工具栏中，单击 `Local Machine` 下拉列表并选择 `Remote Machine`<br/>

    ![RemoteMachine 目标]({{site.baseurl}}/Resources/images/AppDeployment/cs-remote-machine-debugging.png)

3. 此时，Visual Studio 将显示“远程连接”对话框。如果以前使用过 [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) 设置设备的唯一名称，可在此处输入该名称（在此示例中，我们使用的是 **my-device**）。否则，使用 Windows IoT 核心版设备的 IP 地址。输入设备名称/IP 后，选择 `Universal` 进行 Windows 身份验证，然后单击“选择”。

    ![远程计算机调试]({{site.baseurl}}/Resources/images/AppDeployment/cs-remote-connections.PNG)

4. 可通过导航到项目属性（在解决方案资源管理器中选择“属性”）并在左侧选择 `Debug` 选项卡来验证或修改这些值：

    ![项目属性调试选项卡]({{site.baseurl}}/Resources/images/AppDeployment/cs-debug-project-properties.PNG)

完成所有设置后，你应可以在 Visual Studio 中按 F5。如果有任何缺少的程序包未在设置期间安装，Visual Studio 可能会提示你立即获取它们。Blinky 应用将在 Windows IoT 设备上部署并启动，此时你应看到 LED 与屏幕上的模拟图像同步闪烁。

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

    timer = new DispatcherTimer();
    timer.Interval = TimeSpan.FromMilliseconds(500);
    timer.Tick += Timer_Tick;
    InitGPIO();
    if (pin != null)
    {
        timer.Start();
    }

    // ...
}

private void Timer_Tick(object sender, object e)
{
    if (pinValue == GpioPinValue.High)
    {
        pinValue = GpioPinValue.Low;
        pin.Write(pinValue);
        LED.Fill = redBrush;
    }
    else
    {
        pinValue = GpioPinValue.High;
        pin.Write(pinValue);
        LED.Fill = grayBrush;
    }
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
    pinValue = GpioPinValue.High;
    pin.Write(pinValue);
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
pin.Write(GpioPinValue.Low);
{% endhighlight %}

当然，写入 `GpioPinValue.High` 便会关闭 LED：

{% highlight C# %}
pin.Write(GpioPinValue.High);
{% endhighlight %}

记得我们已将 LED 的另一端连接到了 3.3 伏电源，因此，我们需要将引脚驱动到低位，使电流通过 LED。<h3><a href="{{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm">下一个： 其他教程和示例</a></h3>