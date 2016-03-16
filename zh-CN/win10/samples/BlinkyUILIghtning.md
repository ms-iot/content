---
layout: default
title: 使用 Lightning 提供程序的 Blinky UI 示例
permalink: /zh-cn/win10/samples/BlinkyUILightning.htm
lang: zh-cn
deviceName: RPI2
---

##带有 Lightning 提供程序的 Blinky UI 示例

{% include VerifiedVersion.md %}

本示例演示如何使用 Micorosot.IoT.Providers.Lightning.I2cProvider 与 GPIO 通信

它基于 [Blinky UI 示例]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)，并且共享相同的设置步骤。主要区别是将 Lightning 提供程序设置为默认控制器提供程序。

###使用 Lightning 提供程序

Blinky 示例的原始代码曾使用默认 GPIO 提供程序来获取 GPIO 控制器：

{% highlight C# %}

// Original Blinky UI sample code

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


为了能够使用 Lightning 提供程序，需要修改 GPIO 控制器初始化代码，以便将 Lightning 提供程序设置为默认提供程序。<br/> 在以下初始化代码中，如果目标设备上启用 Lightning 驱动程序，将使用 Lightning 提供程序。否则，该应用回退到使用默认的提供程序。

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

        gpioController = await GpioController.GetDefaultAsync(); /* Get the default GPIO controller on the system */
        if (gpioController == null)
        {
            // ...
        }
}

{% endhighlight %}


###生成和部署示例

1. 在 Raspberry Pi2 或 MBM 设备上使用 [Lightning 设置指南]({{site.baseurl}}/{{page.lang}}/win10/LightningSetup.htm)中概述的步骤启用 Lightning。

1. 确保在开发计算机上安装正确版本的 Windows SDK。可从[此处](https://dev.windows.com/zh-cn/downloads/windows-10-developer-preview)安装所需的 Windows SDK。

1. 将用于 Lightning 的 Blinky 示例的源从 [Github](https://github.com/ms-iot/BusProviders/tree/develop/Microsoft.IoT.Lightning.Providers) 复制到本地文件夹。

1. 若要设置 LED 连接，请参考[原始 Blinky 示例]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)。

1. 在 Visual Studio 中加载解决方案。

1. 生成应用。

1. 在设备上部署和运行应用。可以使用[使用 Visual Studio 部署应用]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm)作为指南。

![Blinky 输出]({{site.baseurl}}/Resources/images/Lightning/BlinkyUI.png)
