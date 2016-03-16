---
layout: default
title: Blinky Headless using Lightning Providers sample
permalink: /en-US/win10/samples/BlinkyHeadlessLightning.htm
lang: en-US
---

## Blinky Headless Sample with Lightning Provider

{% include VerifiedVersion.md %}

This sample demonstrates how to communicate with GPIO using the Micorosot.IoT.Providers.Lightning.I2cProvider

It's based on the [BlinkyHeadless sample]({{site.baseurl}}/{{page.lang}}/win10/samples/BlinkyHeadless.htm). And shares the same setup steps as well as most of the code. The only difference is setting the Lightning provider as the default controllers provider.

### Using Lightning Provider

The original code of the Blinky Headless sample used the default GPIO provider for obtaining the GPIO controller:

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

To enable the use of the Lightning provider, the GPIO controller initialization code needs to be modified to set the Lightning provider as the default provider.
In the initialization code below, if the Lightning driver is enabled on the target device, the Lightning provider will be used. Otherwise, the app falls back to using the default provider.

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


### Building and deploying the sample

1. Enable Lightning on your Raspberry Pi2 or MBM device using the the steps outlined in the [Lightning Setup Guide]({{site.baseurl}}/{{page.lang}}/win10/LightningSetup.htm).

1. Ensure the correct version of the Windows SDK is installed on your development machine. The required Windows SDK can be installed from [here](https://dev.windows.com/en-us/downloads/windows-10-developer-preview).

1. Clone the source for the Blinky Background (Headless) sample for Lightning from [Github](https://github.com/ms-iot/BusProviders/tree/develop/Microsoft.IoT.Lightning.Providers) to a local folder.

1. To setup the LED connectons, refer to the [original BlinkyHeadless sample]({{site.baseurl}}/{{page.lang}}/win10/samples/BlinkyHeadless.htm).

1. Load the solution in Visual Studio.

1. Build the app.

1. Deploy and run the app on your device.<br/>
   You can use the [Deploying an App with Visual Studio]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm) for guidance.

