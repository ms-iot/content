---
layout: default
title: 使用 Lightning 提供程序的 WeatherStation 示例
permalink: /zh-cn/win10/samples/WeatherStationLightning.htm
lang: zh-cn
---

##使用 Lightning I2c 提供程序与 I2C 传感器通信

{% include VerifiedVersion.md %}

本示例演示如何使用 Micorosot.IoT.Providers.Lightning.I2cProvider 与 I2c 设备通信

本示例基于 [Github](https://github.com/ms-iot/samples/tree/develop/WeatherStation/CS/WeatherStation) 上所共享的 WeatherShield 示例。并共享相同的设置步骤和大部分代码。唯一的区别是传感器设备各自的初始化方式不同。

###使用 Lightning 提供程序

如下所示，原始示例曾使用默认 I2C 提供程序来获取 I2C 传感器设备：

{% highlight C# %}

// Initializing the sensor device in the original Weather Station sample code

I2cDevice sensor;

public async void Run(IBackgroundTaskInstance taskInstance)
{
    deferral = taskInstance.GetDeferral();

    String aqs = I2cDevice.GetDeviceSelector("I2C1");
    IReadOnlyList<DeviceInformation> dis = await DeviceInformation.FindAllAsync(aqs);
    //Ox40 was determined by looking at the datasheet for the device
    sensor = await I2cDevice.FromIdAsync(dis[0].Id, new I2cConnectionSettings(0x40));

    timer = ThreadPoolTimer.CreatePeriodicTimer(Timer_Tick, TimeSpan.FromMilliseconds(1000));
}
{% endhighlight %}

现在，为能够使用 Lightning 提供程序，需要修改 I2C 初始化代码，以便将 Lightning 提供程序设置为默认提供程序。

在以下初始化代码中，如果在目标设备上启用 Lightning 驱动程序，将使用 Lightning 提供程序。否则，该应用回退到使用默认的提供程序。

{% highlight C# %}
using Microsoft.IoT.Lightning.Providers;

I2cDevice sensor;

public async void Run(IBackgroundTaskInstance taskInstance)
{
    deferral = taskInstance.GetDeferral();

    // Set the Lightning Provider as the default if Lightning driver is enabled on the target device
    if (LightningProvider.IsLightningEnabled)
    {
        LowLevelDevicesController.DefaultProvider = LightningProvider.GetAggregateProvider();
    }

    // This code works the same regardless of the current default provider
    I2cController controller = await I2cController.GetDefaultAsync();
    //Ox40 was determined by looking at the datasheet for the device
    sensor = controller.GetDevice(new I2cConnectionSettings(0x40));

    timer = ThreadPoolTimer.CreatePeriodicTimer(Timer_Tick, TimeSpan.FromMilliseconds(1000));
}

{% endhighlight %}

###生成和部署示例

1. 在 Raspberry Pi2 或 MBM 设备上使用 [Lightning 设置指南]({{site.baseurl}}/{{page.lang}}/win10/LightningSetup.htm)中概述的步骤启用 Lightning。

1. 确保在开发计算机上安装正确版本的 Windows SDK。可从[此处](https://dev.windows.com/zh-cn/downloads/windows-10-developer-preview)安装所需的 Windows SDK。

1. 将用于 Lightning 的 WeatherStation 示例的源从 [Github](https://github.com/ms-iot/BusProviders/tree/develop/Microsoft.IoT.Lightning.Providers) 克隆到本地文件夹。

1. 若要设置该设备和 Weather Shield 之间的连接，请参阅原始的[生成实验室](https://www.hackster.io/windowsiot/build-hands-on-lab-iot-weather-station-using-windows-10)。

1. 在 Visual Studio 中加载解决方案。

1. 生成应用。

1. 按 F5 运行应用并将其部署到你的设备。<br/> 可以使用[使用 Visual Studio 部署应用]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm)作为指南。

1. 在 Visual Studio 中打开“调试输出”窗格（“调试”-\>“Windows”-\>“输出”），你应该能够在应用程序读取传感器时查看其数据。

![气象站调试输出]({{site.baseurl}}/Resources/images/Lightning/WeatherStationDebug.png)
