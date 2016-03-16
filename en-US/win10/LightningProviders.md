---
layout: default
title: Using Microsoft.IoT.Lightning.Providers library and sample code
permalink: /en-US/win10/LightningProviders.htm
lang: en-US
---

# Microsoft.IoT.Lightning.Providers library and sample code
Microsoft.IoT.Lightning.Providers library contains a set of providers to interface with the GPIO, SPI and I2C buses through the Lightning direct memory access driver.

The library as well as sample code can be obtained in source format from [GitHub](https://github.com/ms-iot/BusProviders/tree/develop/Microsoft.IoT.Lightning.Providers){:target="_blank"}.

## Using the library

The Microsoft.IoT.Lightning.Providers library includes a set of Windows.Devices.*Providers WinRT APIs enabling UWP apps to make use of the Lightning driver to communicate with and control GPIO, I2C and SPI devices.

The current version of library includes this set of providers:

* `Microsoft.IoT.Lightning.Providers.Lightning.Adc.Provider`
* `Microsoft.IoT.Lightning.Providers.Lightning.Gpio.Provider`
* `Microsoft.IoT.Lightning.Providers.Lightning.I2c.Provider`
* `Microsoft.IoT.Lightning.Providers.Lightning.Pwm.Provider`
* `Microsoft.IoT.Lightning.Providers.Lightning.Spi.Provider`

### Checking for the Lightning (DMAP) driver

To check if Lightning is enabled, the `LightningProvider.IsLightningEnabled` property should be used. In general, it is always a good practice to verify if the Lightning driver is enabled before using the Lightning provider APIs. 
{% highlight C# %}
if (Microsoft.IoT.Lightning.Providers.LightningProvider.IsLightningEnabled)
{
    // Do something with the Lightning providers
}
{% endhighlight %}

### General usage pattern

The simplest way to use the providers is to set the Lightning Provider as the default inside your app. 

The code below will, if the Lightning Provider is available, set <code>Microsoft.IoT.Lightning.Providers.LightningProvider</code> as the default provider. Otherwise, when no default provider is explicitly set, the various busses will fall back to the default one.

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

After you have a controller for the desired bus, you can use it as you normally would. 

### Using Lightning for individual buses

If you want to use a different default provider, the sections below show how you can use the Lightning providers for individual busses. 

#### For GPIO bus controller:

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

#### For I2C bus controller:

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

#### For SPI bus controller:
using Microsoft.IoT.Lightning.Providers;
using Windows.Devices;
using Windows.Devices.Spi;

{% highlight C# %}
if (LightningProvider.IsLightningEnabled)
{
    SpiController controller =  (await SpiController.GetControllersAsync(LightningSpiProvider.GetSpiProvider()))[0];
    SpiDevice SpiDisplay = controller.GetDevice(spiConnectionSettings);
}
{% endhighlight %}

## Lightning Provider Samples

The following samples demonstrate using the Lightning providers with supported bus types:

* [Blinky (UI) with Lightning Provider]({{site.baseurl}}/{{page.lang}}/win10/samples/BlinkyUILightning.htm) demonstrates GPIO with Lightning Provider in a foreground application

* [BlinkyHeadless with Lightning Provider]({{site.baseurl}}/{{page.lang}}/win10/samples/BlinkyHeadlessLightning.htm) demonstrates GPIO with Lightning Provider in a headless application

* [SPIDisplay with Lightning Provider]({{site.baseurl}}/{{page.lang}}/win10/samples/SPIDisplayLightning.htm) demonstrates the usage of the API to control a device using SPI with Lightning Provider

* [WeatherStation with Lightning Provider]({{site.baseurl}}/{{page.lang}}/win10/samples/WeatherStationLightning.htm) demonstrates interacting with a device using I2C with Lightning Provider

## Build Requirements

### Update Application Package manifest

Also, you need to manually update the Application Package manifest manually to reference the Lightning device interface:

{% highlight XML %}
<iot:Capability Name="lowLevelDevices" />
<DeviceCapability Name="109b86ad-f53d-4b76-aa5f-821e2ddf2141"/>
{% endhighlight %}

* The first is a capability that will enable the application to access custom devices.
* The second is the device guid id for the Lightning interface

Both capabilities must be added to the AppX manifest of your project under the `<Capabilities>` node.

![AppX Manifest Capabailities]({{site.baseurl}}/Resources/images/Lightning/update_manifest.png)

### Windows SDK Update

Windows SDK required for building and using the library is 10.0.10586.0 or higher which can be downloaded from [here](https://dev.windows.com/en-US/downloads/windows-10-sdk).

For more information on obtaining and setting up the required Windows SDK and other tools, refer to [Setting up your PC Guide]({{site.baseurl}}/{{page.lang}}/win10/SetupPCRPI.htm).

### Nuget Package Dependencies

The Lightning Provider library depends on the [Microsoft.IoT.Lightning Nuget package](https://www.nuget.org/packages/Microsoft.IoT.Lightning), which in turn depends on the [Arduino SDK Nuget package](https://www.nuget.org/packages/Microsoft.IoT.SDKFromArduino). Both Nuget packages are referenced in the library projects, and are available from Nuget.org.

If needed, source code for each is also available on GitHub at the [Lightning](https://github.com/ms-iot/lightning) and [Arduino SDK](https://github.com/ms-iot/arduino-sdk) repositories.

Currently, Microsoft.IoT.Lightning Nuget is still pre-release, so should be updated from Nuget.org, when newer versions are available.

In order to install prerelease (current) version of Microsoft.IoT.Lightning Nuget package as well as receive prerelease updates to the Lightning package, make sure to set the "Include prerelease" option in the Nuget Package Manager.

1. Right click References in your project
1. Click "Manage Nuget Packages..."
1. Select package sources for Lightning nuget
1. Click "Include prerelease".
1. Click "Install" to install the nuget package to your project

![Package Manager Config]({{site.baseurl}}/Resources/images/Lightning/Nuget_PackageManager.png)

## Runtime Requirements

### Windows IoT Core Fall Update required
Lightning providers support is currently included in the Fall Update builds for Windows IoT Core.
You can download a Windows 10 IoT Core image from our [downloads page]({{site.baseurl}}/{{page.lang}}/Downloads.htm ). Click on "Download Insider Preview" for your device type.

### Direct Memory Mapped driver must be enabled
 
The APIs in the Lightning Provider library require the Lightning Direct Memory Mapped driver to be enabled on the target device. Both Raspberry Pi2 and MinnowBoard Max have the driver available, but not enabled by default.

The driver can be enabled using the Windows Devices Web Portal. Refer to the [Lightning Setup Guide]({{site.baseurl}}/{{page.lang}}/win10/LightningSetup.htm) for detailed information on how to enable the Lightning driver.

![Devices Page]({{site.baseurl}}/Resources/images/Lightning/dmap4.png)

