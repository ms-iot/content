---
layout: default
title: SPI Display using Lightning Providers samples
permalink: /en-US/win10/samples/SPIDisplayLightning.htm
lang: en-US
---

## Communicate with SPI Display using Lightning providers

{% include VerifiedVersion.md %}

This sample demonstrates how to communicate with SPI bus controllers using the Micorosot.IoT.Providers.Lightning.SpiProvider

It's based on the SPI Display sample shared on [SPI Display sample]({{site.baseurl}}/{{page.lang}}/win10/samples/SPIDisplay.htm). And shares the same setup steps and most of the code. The only difference is setting the Lightning provider as the default controllers provider.

### Using Lightning Provider

Using the default GPIO and SPI controllers, the original code for initializing SPI and GPIO controllers used the following:

{% highlight C# %}

// Initializing the controllers and Spi device in the original Weather Station sample code

private async void InitAll()
{
    try
    {
        InitGpio();             /* Initialize the GPIO controller and GPIO pins */
        await InitSpi();        /* Initialize the SPI controller                */
        await InitDisplay();    /* Initialize the display                       */
    }

    // ...
}

private void InitGpio()
{
    try
    {
        IoController = GpioController.GetDefault(); /* Get the default GPIO controller on the system */
        // ...
    }
    // ...
}

private async Task InitSpi()
{
    try
    {
        var settings = new SpiConnectionSettings(SPI_CHIP_SELECT_LINE); /* Create SPI initialization settings                               */
        settings.ClockFrequency = 10000000;                             /* Datasheet specifies maximum SPI clock frequency of 10MHz         */
        settings.Mode = SpiMode.Mode3;                                  /* The display expects an idle-high clock polarity, we use Mode3
                                                                         * to set the clock polarity and phase to: CPOL = 1, CPHA = 1
                                                                         */

        string spiAqs = SpiDevice.GetDeviceSelector(SPI_CONTROLLER_NAME);       /* Find the selector string for the SPI bus controller          */
        var devicesInfo = await DeviceInformation.FindAllAsync(spiAqs);         /* Find the SPI bus controller device with our selector string  */
        SpiDisplay = await SpiDevice.FromIdAsync(devicesInfo[0].Id, settings);  /* Create an SpiDevice with our bus controller and SPI settings */

    }
    // ...
}

{% endhighlight %}

Now, to enable the use of the Lightning provider, the GPIO and SPI controllers initialization code needs to be modified to set the Lightning provider as the default.

In the initialization code below, if the Lightning driver is enabled on the target device, the Lightning provider will be used. Otherwise, the app falls back to using the default provider.

{% highlight C# %}
using Microsoft.IoT.Lightning.Providers;

private async void InitAll()
{
    try
    {
        InitLightningProvider();
        await InitGpio();       /* Initialize the GPIO controller and GPIO pins */
        await InitSpi();        /* Initialize the SPI controller                */
        await InitDisplay();    /* Initialize the display                       */
    }
    // ...
}

// Set Lightning provider as the default

private void InitLightningProvider()
{
    // Set the Lightning Provider as the default if Lightning driver is enabled on the target device
    if (LightningProvider.IsLightningEnabled)
    {
        LowLevelDevicesController.DefaultProvider = LightningProvider.GetAggregateProvider();
    }
}

/* Initialize the SPI bus */
private async Task InitSpi()
{
    // The SPI initialization code works the same regardless of the current default provider
    try
    {
        var settings = new SpiConnectionSettings(SPI_CHIP_SELECT_LINE); /* Create SPI initialization settings                               */
        settings.ClockFrequency = 10000000;                             /* Datasheet specifies maximum SPI clock frequency of 10MHz         */
        settings.Mode = SpiMode.Mode3;                                  /* The display expects an idle-high clock polarity, we use Mode3    
                                                                            * to set the clock polarity and phase to: CPOL = 1, CPHA = 1         
                                                                            */

        SpiController controller = await SpiController.GetDefaultAsync();     /* Get the default SPI controller */

        SpiDisplay = controller.GetDevice(settings);             /* Get the Spi Display device using its settings */

    }
    // ...
}


/* Initialize the GPIO */
private async Task InitGpio()
{
    // The GPIO controller initialization code works the same regardless of the current default provider
    try
    {
        IoController = GpioController.GetDefault(); /* Get the default GPIO controller on the system */
        // ...
    }
    // ...
}
{% endhighlight %}

### Building and deploying the sample

1. Enable Lightning on your Raspberry Pi2 or MBM device using the the steps outlined in the [Lightning Setup Guide]({{site.baseurl}}/{{page.lang}}/win10/LightningSetup.htm).

1. Ensure the correct version of the Windows SDK is installed on your development machine. The required Windows SDK can be installed from [here](https://dev.windows.com/en-us/downloads/windows-10-developer-preview).

1. Clone the source for the SPI Display sample for Lightning from [Github](https://github.com/ms-iot/BusProviders/tree/develop/Microsoft.IoT.Lightning.Providers) to a local folder.

1. To setup the connections between the device and the SPI display, refer to the [original SPI Display sample page]({{site.baseurl}}/{{page.lang}}/win10/samples/SPIDisplay.htm).

1. Load the solution in Visual Studio.

1. Build the app.

1. Deploy and run the app on your device.<br/>
   You can use the [Deploying an App with Visual Studio]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm) for guidance.

1. Same as the original [SPI Display sample]({{site.baseurl}}/{{page.lang}}/win10/samples/SPIDisplay.htm), you can now send text to the SPI display when you enter it using a keyboard attached to the device running the app.

![SPI running]({{site.baseurl}}/Resources/images/SPIDisplay/spidisplay_screenshot.png)
