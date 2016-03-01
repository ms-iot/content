---
layout: default
title: 无外设模式的 Blinky 示例
permalink: /zh-cn/win10/samples/BlinkyHeadless.htm
lang: zh-cn
---

{: .thin-header}
##无外设模式的 Blinky 示例

{% include VerifiedVersion.md %}

我们将创建一个简单的 Blinky 应用，并将 LED 连接到你的 Windows IoT 核心版设备（Raspberry Pi 2、MinnowBoard Max 或 DragonBoard）。请注意，GPIO API 仅在 Windows IoT 核心版上可用，因此该示例无法在你的桌面上运行。

###无外设模式

此应用程序专为无外设的设备而设计。若要更好地了解什么是无外设模式以及如何将你的设备配置为无外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。

###在 Visual Studio 中加载项目

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\BlinkyHeadless` 来查找此示例的源代码。示例代码可采用 C++ 或 C\# 提供，但此处的文档仅详细介绍了 C\# 变体。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

确保将 LED 连接到开发板。如需指导，请返回基本“Blinky”[示例]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)。

请注意，如果应用找不到任何可用 GPIO 端口，则该应用将无法成功运行。

{% include_relative AppDeploymentCS.md %}

完成所有设置后，你应可以在 Visual Studio 中按 F5。Blinky 应用将部署并在 Windows IoT 设备上启动，并且你应会看到通电的 IED 出现闪烁。

###我们来看看代码
此示例的代码相当简单。我们使用了一个计时器，每当调用“Tick”事件时，都会切换 LED 的状态。

{: .thin-header}
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
为了驱动 GPIO 引脚，首先我们需要对其进行初始化。以下是 C\# 代码（请注意我们如何在 Windows.Devices.Gpio 命名空间中利用新 WinRT 类）：

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

让让我们稍稍细分一下此过程：

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
