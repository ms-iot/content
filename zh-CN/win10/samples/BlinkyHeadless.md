---
layout: default
title: 无外设模式的 Blinky 示例
permalink: /zh-CN/win10/samples/BlinkyHeadless.htm
lang: zh-CN
---

##无外设模式的 Blinky 示例

我们将要创建一个简单的 Blinky 应用，并将 LED 连接到你的 Windows IoT Core 设备（Raspberry Pi 2 或 MinnowBoard Max）。请注意 GPIO API 仅在 Windows IoT Core 上可用，因此该示例无法在你的桌面上运行。

###无外设模式

此应用程序专为无外设的设备而设计。若要更好地了解什么是无外设模式以及如何将你的设备配置为无外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。

###在 Visual Studio 中加载项目

可以在[此处](https://github.com/ms-iot/samples/tree/develop/BlinkyHeadless)找到此示例。选择 C++ 版本或 C\# 版本，但请注意此示例仅包含 C\# 版本。在磁盘上生成文件夹的副本，然后从 Visual Studio 打开项目。

确保将“远程调试”设置设为指向 Windows IoT Core 设备。如需指导，请返回基本的“Hello World”[示例]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm)。

如果你正在面向 Minnowboard Max 构建，请选择体系结构下拉列表中的 `x86`。如果你正在面向 Raspberry Pi 2构建，请选择 `ARM`。

确保将 LED 连接到电路板。如需指导，请返回基本的“Blinky”[示例]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)。

请注意，如果应用无法找到任何可用的 GPIO 端口（例如，你在运行 Windows IoT Core 的 VM 上运行该应用时），则该应用不会成功运行。

###我们来看看代码
此示例的代码相当简单。我们使用了一个计时器，每当调用“Tick”事件时，都会切换 LED 的状态。

###计时器代码
下面说明如何使用 C\# 语言设置计时器：

{% highlight C# %}
using Windows.System.Threading;

BackgroundTaskDeferral _deferral;
public void Run(IBackgroundTaskInstance taskInstance)
{
    _deferral = taskInstance.GetDeferral();

    this.timer = ThreadPoolTimer.CreatePeriodicTimer(Timer_Tick, TimeSpan.FromMilliseconds(500));
    . . .
}

private void Timer_Tick(ThreadPoolTimer timer)
{
    . . .
}
{% endhighlight %}

###初始化 GPIO 引脚
为了驱动 GPIO 引脚，首先我们需要将它初始化。以下是 C\# 代码（请注意我们如何在 Windows.Devices.Gpio 命名空间中利用新 WinRT 类）：

{% highlight C# %}
using Windows.Devices.Gpio;

private async void InitGPIO()
{
    var gpio = GpioController.GetDefault();

    if (gpio == null)
    {
        pin = null;
        return;
    }

    pin = gpio.OpenPin(LED_PIN);

    if (pin == null)
    {
        return;
    }

    pin.Write(GpioPinValue.High);
    pin.SetDriveMode(GpioPinDriveMode.Output);
}
{% endhighlight %}

让我们稍微剖析一下这段代码：

* 首先，我们使用 `GpioController.GetDefault()` 获取 GPIO 控制器。

* 如果设备没有 GPIO 控制器，则此函数将返回 `null`。

* 然后，我们尝试通过使用 `LED_PIN` 值调用 `GpioController.OpenPin()` 来打开引脚。

* 获取 `pin` 后，我们会使用 `GpioPin.Write()` 函数将它设置为默认的关闭状态（高）。

* 我们还使用了 `GpioPin.SetDriveMode()` 函数将 `pin` 设置为以输出模式运行。


###修改 GPIO 引脚的状态
在能够访问 `GpioOutputPin` 实例后，便没有必要更改引脚状态来打开或关闭 LED。你可以修改“Timer\_Tick”来执行此操作。

若要打开 LED，只需将值 `GpioPinValue.Low` 写入引脚：

{% highlight C# %}
this.pin.Write(GpioPinValue.Low);
{% endhighlight %}

当然，写入 `GpioPinValue.High` 便会关闭 LED：

{% highlight C# %}
this.pin.Write(GpioPinValue.High);
{% endhighlight %}

记得我们已将 LED 的另一端连接到了 3.3 伏电源，因此，我们需要将引脚驱动到低位，使电流通过 LED。
