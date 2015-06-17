---
layout: default
title: “推送”按钮示例
permalink: /zh-CN/win10/samples/PushButton.htm
lang: zh-CN
---

##“推送”按钮示例

![“推送”按钮图像]({{site.baseurl}}/images/PushButton/PushbuttonSample.jpg)

在本示例中，我们会将“推送”按钮和 LED 连接到 Raspberry Pi 2。我们将使用 GPIO 读取“推送”按钮的状态并控制 LED。

这是一个有外设示例，所以请确保你的设备处于有外设模式下，方法是运行以下命令：`setbootoption.exe headed`（更改有外设/无外设状态需要重新启动）。

另外，还请注意 GPIO API 仅在 Windows IoT 核心版上可用，因此该示例无法在你的桌面上运行。


###组件

你将需要以下组件：

* 一个 [EG1311-ND 触摸按钮](http://www.digikey.com/product-detail/en/320.02E11.08BLK/EG1311-ND/101397)

* 一个[红色 LED](http://www.digikey.com/product-detail/en/C5SMF-RJS-CT0W0BB1/C5SMF-RJS-CT0W0BB1-ND/2341832)

* 一个 [330 &\#x2126; 电阻器](http://www.digikey.com/product-detail/en/CFR-25JB-52-330R/330QBK-ND/1636)

* 一个 [10k &\#x2126; 电阻器](http://www.digikey.com/product-detail/en/CFR-25JB-52-10K/10KQBK-ND/338)

* 一块试验板以及多根公母头连接线和双公头连接线

###连接到你的设备

我们先来为试验板上的组件布线，如下图所示。

![试验板连接]({{site.baseurl}}/images/PushButton/PushButton_bb.png)

*使用 [Fritzing](http://fritzing.org/) 制作的图像*


以下是电路原理图：

![电路示意图]({{site.baseurl}}/images/PushButton/PushButton_schem.png)

*使用 [Fritzing](http://fritzing.org/) 制作的图像*

####连接 LED

* 将 LED 阴极（较短的阴极引线）连接到 Raspberry Pi 2 的引脚 13 \(GPIO 27\)

* 将 LED 阳极（较长的阳极引线）连接到 330 &\#x2126; 电阻器中的一条引线

* 将 330 &\#x2126; 电阻器的另一端连接到 Raspberry Pi 2 上的引脚 1 \(3.3V\)

####连接触摸按钮

* 将触摸按钮中的一个引脚连接到 Raspberry Pi 2 的引脚 29 \(GPIO 5\) 以及 10k &\#x2126; 电阻器的一端

* 将 10k &\#x2126; 电阻器的另一端连接到 Raspberry Pi 2 上的引脚 2 \(5V\)

* 将触摸按钮中的另一个引脚连接到地线


下面是 RPi2 的引脚输出：

![Raspberry Pi 2 引脚输出]({{site.baseurl}}/images/PinMappings/RP2_Pinout.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

###部署你的应用

你可以在[此处](https://github.com/ms-iot/samples/tree/develop/PushButton/CS)找到此示例的完整代码。本示例是采用 C\# 编写的。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

确保将“远程调试”设置设为指向 Windows IoT 设备。如需指导，请参考基本“Hello World”[示例]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm)。如果你要针对 Raspberry Pi 2 进行生成，请选择 `ARM`。

完成所有设置后，你应该可以在 Visual Studio 中按 F5。PushButton 应用将会在 Windows IoT 设备上部署并启动；在你按下该按钮后，你应该会看到 LED 与屏幕上的模拟图像同步闪烁。


###我们来看看代码
此示例的代码相当简单。每次按“推送”按钮时，我们都会查看 LED 的状态。

###初始化 GPIO 引脚
为了驱动 GPIO 引脚，首先我们需要对其进行初始化。以下是 C\# 代码（请注意我们如何在 Windows.Devices.Gpio 命名空间中利用新 WinRT 类）：

{% highlight C# %}
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
        pushButton = gpio.OpenPin(PB_PIN);
        pin = gpio.OpenPin(LED_PIN);

        // Show an error if the pin wasn't initialized properly
        if (pin == null)
        {
            GpioStatus.Text = "There were problems initializing the GPIO LED pin.";
            return;
        }
        if (pushButton == null)
        {
            GpioStatus.Text = "There were problems initializing the GPIO Push Button pin.";
            return;
        }

        pushButton.SetDriveMode(GpioPinDriveMode.Input);
        pin.SetDriveMode(GpioPinDriveMode.Output);

        GpioStatus.Text = "GPIO pin initialized correctly.";
    }

{% endhighlight %}

让让我们稍稍细分一下此过程：

* 首先，我们使用 `GpioController.GetDefault()` 获取 GPIO 控制器。

* 如果设备没有 GPIO 控制器，此函数将返回 `null`。

* 然后，我们尝试通过使用 `PB_PIN` 和 `LED_PIN` 值调用 `GpioController.OpenPin()` 来打开引脚。

* 通过使用 `GpioPin.SetDriveMode()` 函数，将 `pin` 设置为在输出模式下运行，并将 `pushButton` 设置为在输入模式下运行。

* 获取 `pin` 之后，我们在默认情况下使用 `GpioPin.Write()` 函数将它设置为关闭状态（高）。


###修改 GPIO 引脚的状态

按下“推送”按钮时，将读取输入值并打开 LED。

{% highlight C# %}
    private void FlipLED()
    {
        pushButtonValue = pushButton.Read();
        if (pushButtonValue == GpioPinValue.High)
        {
            pin.Write(GpioPinValue.High);
        }
        else if (pushButtonValue == GpioPinValue.Low)
        {
            pin.Write(GpioPinValue.Low);
        }
    }


{% endhighlight %}

记得我们已将 LED 的另一端连接到 3.3 伏电源，因此，我们需要将引脚驱动到低位，使电流通过 LED。
