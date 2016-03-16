---
layout: default
title: 使用 Lightning 提供程序的 SPI 屏幕示例
permalink: /zh-cn/win10/samples/SPIDisplayLightning.htm
lang: zh-cn
---

##使用 Lightning 提供程序与 SPI 屏幕通信

{% include VerifiedVersion.md %}

本示例演示如何使用 Micorosot.IoT.Providers.Lightning.SpiProvider 与 SPI 总线控制器进行通信

本示例基于 [SPI 屏幕示例]({{site.baseurl}}/{{page.lang}}/win10/samples/SPIDisplay.htm)上所共享的 SPI 屏幕示例。并共享相同的设置步骤和大部分代码。唯一区别是将 Lightning 提供程序设置为默认控制器提供程序。

###使用 Lightning 提供程序

通过使用默认 GPIO 和 SPI 控制器，按如下方式使用用于初始化 SPI 和 GPIO 控制器的原始代码：

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

现在，为了能够使用 Lightning 提供程序，需要修改 GPIO 和 SPI 控制器初始化代码，以便将 Lightning 提供程序设置为默认提供程序。

在以下初始化代码中，如果在目标设备上启用 Lightning 驱动程序，将使用 Lightning 提供程序。否则，该应用回退到使用默认的提供程序。

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

###生成和部署示例

1. 在 Raspberry Pi2 或 MBM 设备上使用 [Lightning 设置指南]({{site.baseurl}}/{{page.lang}}/win10/LightningSetup.htm)中概述的步骤启用 Lightning。

1. 确保在开发计算机上安装正确版本的 Windows SDK。可从[此处](https://dev.windows.com/zh-cn/downloads/windows-10-developer-preview)安装所需的 Windows SDK。

1. 将用于 Lightning 的 SPI 屏幕示例的源从 [Github](https://github.com/ms-iot/BusProviders/tree/develop/Microsoft.IoT.Lightning.Providers) 克隆到本地文件夹。

1. 若要设置该设备和 SPI 屏幕之间的连接，请参阅[原始 SPI 屏幕示例页面]({{site.baseurl}}/{{page.lang}}/win10/samples/SPIDisplay.htm)。

1. 在 Visual Studio 中加载解决方案。

1. 生成应用。

1. 在设备上部署和运行应用。<br/> 可以使用[使用 Visual Studio 部署应用]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm)作为指南。

1. 和原始 [SPI 屏幕示例]({{site.baseurl}}/{{page.lang}}/win10/samples/SPIDisplay.htm)一样，当你使用运行该应用的设备所附加的键盘进行输入时，可立即将文本发送到 SPI 屏幕。

![SPI 运行]({{site.baseurl}}/Resources/images/SPIDisplay/spidisplay_screenshot.png)
