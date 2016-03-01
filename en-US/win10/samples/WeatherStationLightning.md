---
layout: default
title: WeatherStation using Lightning Providers sample
permalink: /en-US/win10/samples/WeatherStationLightning.htm
lang: en-US
---

## Communicate with an I2C sensor using Lightning I2c provider

{% include VerifiedVersion.md %}

This sample demonstrates how to communicate with an I2c device using the Micorosot.IoT.Providers.Lightning.I2cProvider

It's based on the WeatherShield sample shared on [Github](https://github.com/ms-iot/samples/tree/develop/WeatherStation/CS/WeatherStation). And shares the same setup steps and most of the code. The only difference is how the sensor device is initialized in each.

### Using Lightning Provider

The original sample used the default I2C provider for obtaining the I2C sensor device follows:

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

Now, to enable the use of the Lightning provider, the I2C initialization code needs to be modified to set the Lightning provider as the default provider.

In the initialization code below, if the Lightning driver is enabled on the target device, the Lightning provider will be used. Otherwise, the app falls back to using the default provider.

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

### Building and deploying the sample

1. Enable Lightning on your Raspberry Pi2 or MBM device using the the steps outlined in the [Lightning Setup Guide]({{site.baseurl}}/{{page.lang}}/win10/LightningSetup.htm).

1. Ensure the correct version of the Windows SDK is installed on your development machine. The required Windows SDK can be installed from [here](https://dev.windows.com/en-us/downloads/windows-10-developer-preview).

1. Clone the source for the WeatherStation sample for Lightning from [Github](https://github.com/ms-iot/BusProviders/tree/develop/Microsoft.IoT.Lightning.Providers) to a local folder.

1. To setup the connections between the device and the weather shield, refer to the original [build lab](https://www.hackster.io/windowsiot/build-hands-on-lab-iot-weather-station-using-windows-10).

1. Load the solution in Visual Studio.

1. Build the app.

1. Press F5 to run and deploy the app to your device.<br/>
   You can use the [Deploying an App with Visual Studio]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm) for guidance.

1. Open the Debug Output pane in Visual Studio (Debug->Windows->Output) and you should be able to watch the sensor data as it's being read by your application.

![Weather Station Debug Output]({{site.baseurl}}/Resources/images/Lightning/WeatherStationDebug.png)
