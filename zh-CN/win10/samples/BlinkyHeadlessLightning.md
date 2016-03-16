---
layout: default
title: 使用 Lightning 提供程序的无外设模式的 Blinky 示例
permalink: /zh-cn/win10/samples/BlinkyHeadlessLightning.htm
lang: zh-cn
---

##带有 Lightning 提供程序的无外设模式的 Blinky 示例

{% include VerifiedVersion.md %}

本示例演示如何使用 Micorosot.IoT.Providers.Lightning.I2cProvider 与 GPIO 通信

它基于 [BlinkyHeadless 示例]({{site.baseurl}}/{{page.lang}}/win10/samples/BlinkyHeadless.htm)。并共享相同的设置步骤以及大部分代码。唯一的区别是将 Lightning 提供程序设置为默认控制器提供程序。

###使用 Lightning 提供程序

无外设模式的 Blinky 示例的原始代码曾使用默认 GPIO 提供程序来获取 GPIO 控制器：

{% highlight C# %}

// Original Blinky Headless sample code

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

为了能够使用 Lightning 提供程序，需要修改 GPIO 控制器初始化代码，以便将 Lightning 提供程序设置为默认提供程序。在以下初始化代码中，如果目标设备上启用 Lightning 驱动程序，将使用 Lightning 提供程序。否则，该应用回退到使用默认的提供程序。

{% highlight C# %}
using Microsoft.IoT.Lightning.Providers;
using Windows.Devices.Gpio;

private async void InitGPIO()
{
    // Set the Lightning Provider as the default if Lightning driver is enabled on the target device
    if (LightningProvider.IsLightningEnabled)
    {
        LowLevelDevicesController.DefaultProvider = LightningProvider.GetAggregateProvider();
    }

    // Remaining initialization code works the same regardless of the current default provider

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

    pin.SetDriveMode(GpioPinDriveMode.Output);
    pin.Write(GpioPinValue.High);
}
{% endhighlight %}


###生成和部署示例

1. 在 Raspberry Pi2 或 MBM 设备上使用 [Lightning 设置指南]({{site.baseurl}}/{{page.lang}}/win10/LightningSetup.htm)中概述的步骤启用 Lightning。

1. 确保在开发计算机上安装正确版本的 Windows SDK。可从[此处](https://dev.windows.com/zh-cn/downloads/windows-10-developer-preview)安装所需的 Windows SDK。

1. 将 Lightning 的 Blinky Background（无外设）示例的源从 [Github](https://github.com/ms-iot/BusProviders/tree/develop/Microsoft.IoT.Lightning.Providers) 克隆到本地文件夹。

1. 若要设置 LED 连接，请参考[原始 BlinkyHeadless 示例]({{site.baseurl}}/{{page.lang}}/win10/samples/BlinkyHeadless.htm)。

1. 在 Visual Studio 中加载解决方案。

1. 生成应用。

1. 在设备上部署和运行应用。<br/> 可以使用[使用 Visual Studio 部署应用]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm)作为指南。

