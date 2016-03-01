---
layout: default
title: Blinky UI using Lightning Providers sample
permalink: /en-US/win10/samples/BlinkyUILightning.htm
lang: en-US
deviceName: RPI2
---

## Blinky UI Sample with Lightning Provider

{% include VerifiedVersion.md %}

This sample demonstrates how to communicate with GPIO using the Micorosot.IoT.Providers.Lightning.I2cProvider

It's based on the [Blinky UI sample]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm) and shares the same setup steps. The main difference is setting the Lightning provider as the default controllers provider.

### Using Lightning Provider

The original code of the Blinky sample used the default GPIO provider for obtaining the GPIO controller:

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


To enable the use of the Lightning provider, the GPIO controller initialization code needs to be modified to set the Lightning provider as the default provider.<br/>
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

        gpioController = await GpioController.GetDefaultAsync(); /* Get the default GPIO controller on the system */
        if (gpioController == null)
        {
            // ...
        }
}

{% endhighlight %}


### Building and deploying the sample

1. Enable Lightning on your Raspberry Pi2 or MBM device using the the steps outlined in the [Lightning Setup Guide]({{site.baseurl}}/{{page.lang}}/win10/LightningSetup.htm).

1. Ensure the correct version of the Windows SDK is installed on your development machine. The required Windows SDK can be installed from [here](https://dev.windows.com/en-us/downloads/windows-10-developer-preview).

1. Clone the source for the Blinky sample for Lightning from [Github](https://github.com/ms-iot/BusProviders/tree/develop/Microsoft.IoT.Lightning.Providers) to a local folder.

1. To setup the LED connectons, refer to the [original Blinky sample]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm).

1. Load the solution in Visual Studio.

1. Build the app.

1. Deploy and run the app on your device.  You can use the [Deploying an App with Visual Studio]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm) for guidance.

![Blinky Output]({{site.baseurl}}/Resources/images/Lightning/BlinkyUI.png)
