---
layout: sample
title: Weather station (using Lightning Providers)
permalink: /en-US/Samples/WeatherStationLightning.htm
keyword: Windows 10 IoT Core, beginner, breadboard, potentiometer, sensor, weather station
description: Communicate with an I2C sensor using Lightning I2c provider
samplelink: https://github.com/ms-iot/BusProviders/tree/develop/Microsoft.IoT.Lightning.Providers
lang: en-US
---

# Weather station (using Lightning Providers)

This sample demonstrates how to communicate with an I2c device using the Micorosot.IoT.Providers.Lightning.I2cProvider.

It is based on the [Weather Station sample]({{site.baseurl}}/{{page.lang}}/samples/arduino-wiring/WeatherStation.htm) and shares the same setup steps and most of the code. 

### Using Default Provider (Default Controller Driver/Inbox Driver)

The original sample used the default I2C provider for obtaining the I2C sensor device as follows:

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

The sample code using the default I2C provider, [Weather Station sample](https://github.com/ms-iot/samples/tree/develop/WeatherStation).

### Using the Lightning provider

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

1. Enable Lightning on your Raspberry Pi2 or MBM device using the the steps outlined in the [Lightning Setup Guide]({{site.baseurl}}/{{page.lang}}/Docs/LightningSetup).

1. Ensure the correct version of the Windows SDK is installed on your development machine. The required Windows SDK can be installed from [here](https://dev.windows.com/en-us/downloads/windows-10-developer-preview).

1. Clone the source for the WeatherStation sample for Lightning from [Github](https://github.com/ms-iot/BusProviders/tree/develop/Microsoft.IoT.Lightning.Providers) to a local folder.

1. To setup the connections between the device and the weather shield, refer to the original [sample]({{site.baseurl}}/{{page.lang}}/samples/arduino-wiring/WeatherStation.htm).

1. Load the solution in Visual Studio.

1. Select "Weather Station (Universal Windows)" as the Startup Project.

1. Build the app.

1. Press F5 to run and deploy the app to your device.<br/>
   You can use the [Deploying an App with Visual Studio]({{site.baseurl}}/{{page.lang}}/Docs/AppDeployment) for guidance.

1. Open the Debug Output pane in Visual Studio (Debug->Windows->Output) and you should be able to watch the sensor data as it's being read by your application.

![Weather Station Debug Output]({{site.baseurl}}/Resources/images/Lightning/WeatherStationDebug.png)
