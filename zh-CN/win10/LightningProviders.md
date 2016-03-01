---
layout: default
title: 使用 Microsoft.IoT.Lightning.Providers 库和示例代码
permalink: /zh-cn/win10/LightningProviders.htm
lang: zh-cn
---

#Microsoft.IoT.Lightning.Providers 库和示例代码
Microsoft.IoT.Lightning.Providers 库包含一组通过 Lightning 直接内存访问驱动程序与 GPIO、SPI 和 I2C 总线连接的提供程序。

可以在 [GitHub](https://github.com/ms-iot/BusProviders/tree/develop/Microsoft.IoT.Lightning.Providers){:target="_blank"} 的源格式中获取库和示例代码。

##使用库

Microsoft.IoT.Lightning.Providers 库包含一组 Windows.Devices.\*Providers WinRT API，使 UWP 应用可以使用 Lightning 驱动程序与 GPIO、I2C 和 SPI 设备通信并对其加以控制。

当前版本的库包含此组提供程序：

* `Microsoft.IoT.Lightning.Providers.Lightning.Adc.Provider`
* `Microsoft.IoT.Lightning.Providers.Lightning.Gpio.Provider`
* `Microsoft.IoT.Lightning.Providers.Lightning.I2c.Provider`
* `Microsoft.IoT.Lightning.Providers.Lightning.Pwm.Provider`
* `Microsoft.IoT.Lightning.Providers.Lightning.Spi.Provider`

###检查 Lightning \(DMAP\) 驱动程序

若要检查是否已启用 Lightning，应使用 `LightningProvider.IsLightningEnabled` 属性。通常，最好在使用 Lightning 提供程序 API 之前验证 Lightning 驱动程序是否已启用。

{% highlight C# %}
if (Microsoft.IoT.Lightning.Providers.LightningProvider.IsLightningEnabled)
{
    // Do something with the Lightning providers
}
{% endhighlight %}

###一般使用模式

使用提供程序的最简单方法是在应用内部将 Lightning 提供程序设置为默认提供程序。

如果 Lightning 提供程序可用，以下代码会将 <code>Microsoft.IoT.Lightning.Providers.LightningProvider</code> 设置为默认提供程序。否则，在没有显式设置任何默认提供程序时，各种总线将退回到默认提供程序。

{% highlight C# %}
using Microsoft.IoT.Lightning.Providers;
using Windows.Devices;
if (LightningProvider.IsLightningEnabled)
{
    LowLevelDevicesController.DefaultProvider = LightningProvider.GetAggregateProvider();
}

gpioController = await GpioController.GetDefaultAsync();
i2cController = await I2cController.GetDefaultAsync();
spiController = await SpiController.GetDefaultAsync();
{% endhighlight %}

为所需总线配备了控制器后，你可以像往常一样使用它。

###将 Lightning 用于个别总线

如果你需要使用不同的默认提供程序，以下部分将介绍如何将 Lightning 提供程序用于个别总线。

####对于 GPIO 总线控制器：

{% highlight C# %}
using Microsoft.IoT.Lightning.Providers;
using Windows.Devices;
using Windows.Devices.Gpio;

if (LightningProvider.IsLightningEnabled)
{
    GpioController gpioController = (await GpioController.GetControllersAsync(LightningGpioProvider.GetGpioProvider()))[0];
    GpioPin pin = gpioController.OpenPin(LED_PIN, GpioSharingMode.Exclusive);
}
{% endhighlight %}

####对于 I2C 总线控制器：

{% highlight C# %}
using Microsoft.IoT.Lightning.Providers;
using Windows.Devices;
using Windows.Devices.I2c;

if (LightningProvider.IsLightningEnabled)
{
    I2cController controller =  (await I2cController.GetControllersAsync(LightningI2cProvider.GetI2cProvider()))[0];
    I2cDevice sensor = controller.GetDevice(new I2cConnectionSettings(0x40));
}

{% endhighlight %}

####对于 SPI 总线控制器：

{% highlight C# %}
using Microsoft.IoT.Lightning.Providers;
using Windows.Devices;
using Windows.Devices.Spi;

if (LightningProvider.IsLightningEnabled)
{
    SpiController controller =  (await SpiController.GetControllersAsync(LightningSpiProvider.GetSpiProvider()))[0];
    SpiDevice SpiDisplay = controller.GetDevice(spiConnectionSettings);
}
{% endhighlight %}

##Lightning 提供程序示例

以下示例演示了如何使用 Lightning 提供程序以及受支持的总线类型：

* [带有 Lightning 提供程序的 Blinky \(UI\)]({{site.baseurl}}/{{page.lang}}/win10/samples/BlinkyUILightning.htm) 演示了前台应用程序中带有 Lightning 提供程序的 GPIO

* [带有 Lightning 提供程序的 BlinkyHeadless]({{site.baseurl}}/{{page.lang}}/win10/samples/BlinkyHeadlessLightning.htm) 演示了无外设应用程序中带有 Lightning 提供程序的 GPIO

* [带有 Lightning 提供程序的 SPIDisplay]({{site.baseurl}}/{{page.lang}}/win10/samples/SPIDisplayLightning.htm) 演示了使用 API 控制使用带有 Lightning 提供程序的 SPI 的设备

* [带有 Lightning 提供程序的 WeatherStation]({{site.baseurl}}/{{page.lang}}/win10/samples/WeatherStationLightning.htm) 演示了与使用带有 Lightning 提供程序的 I2C 的设备进行交互

##生成要求

###更新应用程序包清单

此外，你需要手动更新应用程序包清单来引用 Lightning 备接口：

{% highlight XML %}
<iot:Capability Name="lowLevelDevices" />
<DeviceCapability Name="109b86ad-f53d-4b76-aa5f-821e2ddf2141"/>
{% endhighlight %}

* 首先是使应用程序可以访问自定义设备的功能。
* 其次是适用于该 Lightning 接口的设备 GUID ID

两种功能都必须添加到 `<Capabilities>` 节点下的项目的 AppX 清单。

![AppX 清单功能]({{site.baseurl}}/Resources/images/Lightning/update_manifest.png)

###Windows SDK 更新

生成和使用库所需的 Windows SDK 为 10.0.10586.0 或更高版本（可以从[此处](https://dev.windows.com/zh-cn/downloads/windows-10-sdk)下载）。

有关获取和设置所需的 Windows SDK 及其他工具的详细信息，请参阅[设置电脑指南]({{site.baseurl}}/{{page.lang}}/win10/SetupPCRPI.htm)。

### Nuget 包依赖关系

Lightning 提供程序库依赖于 [Microsoft.IoT.Lightning Nuget 包](https://www.nuget.org/packages/Microsoft.IoT.Lightning)，该包反过来又依赖于 [Arduino SDK Nuget 包](https://www.nuget.org/packages/Microsoft.IoT.SDKFromArduino)。这两个 Nuget 包在库项目中引用，并且可以从 Nuget.org 中获取。

如果需要，每个包的源代码也可用于 [Lightning](https://github.com/ms-iot/lightning) 和 [Arduino SDK](https://github.com/ms-iot/arduino-sdk) 存储库中的 GitHub 上。

Microsoft.IoT.Lightning Nuget 目前仍是预发行版，因此当更新的版本可用时，应从 Nuget.org 进行更新。

为了能够安装预发行版（当前版本）的 Microsoft.IoT.Lightning Nuget 包以及接收 Lightning 程序包的预发行更新，请务必在 Nuget 包管理器中设置“包含预发行版”。

1. 右键单击项目中的“引用”
1. 单击“管理 Nuget 包...”
1. 选择 Lightning Nuget 的程序包源
1. 单击“包含预发行版”。
1. 单击“安装”以将 Nuget 包安装到你的项目中

![程序包管理器配置]({{site.baseurl}}/Resources/images/Lightning/Nuget_PackageManager.png)

##运行时要求

###需要 Windows IoT 核心版秋季更新
目前仅 Windows IoT 核心版的秋季更新版本中包含 Lightning 提供程序支持。你可以从我们的[下载页]({{site.baseurl}}/{{page.lang}}/Downloads.htm)下载 Windows 10 IoT 核心版映像。根据你的设备类型，单击“下载 Insider Preview”。

### 必须启用直接内存映射的驱动程序
 
Lightning 提供程序库中的 API 需要在目标设备上启用 Lightning 直接内存映射的驱动程序。Raspberry Pi2 和 MinnowBoard Max 都有可用的驱动程序，但默认情况下不启用。

可以使用 Windows Devices Web Portal 启用驱动程序。有关如何启用 Lightning 驱动程序的详细信息，请参阅 [Lightning 设置指南]({{site.baseurl}}/{{page.lang}}/win10/LightningSetup.htm)。

![设备页面]({{site.baseurl}}/Resources/images/Lightning/dmap4.png)

