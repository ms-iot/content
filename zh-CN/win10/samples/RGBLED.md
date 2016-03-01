---
layout: default
title: RGB LED 示例
permalink: /zh-CN/win10/samples/RGBLED.htm
lang: zh-CN
---

##RGB LED 示例

在此示例中，我们会将三色 LED 连接到 Raspberry Pi 2。LED 将闪烁，同时在红色、蓝色与绿色之间更改颜色。

这是一个有外设示例，所以请确保你的设备处于有外设模式下，方法为运行以下命令：`setbootoption.exe headed`（更改有外设/无外设状态将需要重新启动）。

另外，还请注意 GPIO API 仅在 Windows IoT 核心版上可用，因此该示例无法在你的桌面上运行。


###组件

你将需要以下组件：

* 一个 [754-1615-ND 三色 LED](http://www.digikey.com/product-detail/en/WP154A4SUREQBFZGC/754-1615-ND/3084119){:target="_blank"}

* 一个 [330 &\#x2126; 电阻器](http://www.digikey.com/product-detail/en/CFR-25JB-52-330R/330QBK-ND/1636){:target="_blank"}

* 2x [100 &\#x2126; 电阻器](http://www.digikey.com/product-detail/en/CFR-25JB-52-100R/100QBK-ND/246){:target="_blank"}

* 一块试验板以及多根公母头连接线和双公头连接线

###连接到你的设备

我们先来为试验板上的组件布线，如下图所示。

![试验板连接]({{site.baseurl}}/Resources/images/RGBLED/RGBLED_bb.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

以下是电路原理图：

![电路示意图]({{site.baseurl}}/Resources/images/RGBLED/RGBLED-schematic_schem.png)

####连接 LED

* 将 LED 的三个引线分别连接到 Raspberry Pi 2 的引脚 29、31、33（GPIO 5、6、13）

* 请注意，红色引线应通过 330 &\#x2126; 电阻器连接到 Raspberry Pi 2 的引脚 29。

* 蓝色和绿色引线应通过 100 &\#x2126; 电阻器分别连接到 Raspberry Pi 2 的引脚 31 和 33。

* 将 LED 的阳极（较长的阳极引线）连接到引脚 6 \(GND\)

下面是 RPi2 的引出线：

![Raspberry Pi 2 引出线]({{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

###部署你的应用

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\RGBLED`，查找此示例的源代码。本示例是采用 C\# 编写的。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

按照[设置远程调试和部署应用]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#csharp)的说明进行操作。RGBLED 应用将在 MBM 上部署并启动，此时你应看到 LED 与屏幕上的模拟图像同步闪烁。

###我们来看看代码
此示例的代码相当简单。我们使用了一个计时器，每当调用“Tick”事件时，都会切换 LED 的状态。

###计时器代码
下面说明如何使用 C\# 语言设置计时器：

{% highlight C# %}
public MainPage()
{
    // ...

    this.timer = new DispatcherTimer();
    this.timer.Interval = TimeSpan.FromMilliseconds(500);
    this.timer.Tick += Timer_Tick;
    this.timer.Start();

    // ...
}

private void Timer_Tick(object sender, object e)
{
    FlipLED();
}
{% endhighlight %}

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
                redpin = null;
                bluepin = null;
                greenpin = null;
                GpioStatus.Text = "There is no GPIO controller on this device.";
                return;
            }

           redpin = gpio.OpenPin(REDLED_PIN);
           bluepin = gpio.OpenPin(BLUELED_PIN);
           greenpin = gpio.OpenPin(GREENLED_PIN);

            // Show an error if the pin wasn't initialized properly
            if (redpin == null || bluepin == null || greenpin == null)
            {
                GpioStatus.Text = "There were problems initializing the GPIO red/blue/green pin.";
                return;
            }

            redpin.Write(GpioPinValue.High);
            redpin.SetDriveMode(GpioPinDriveMode.Output);
            bluepin.Write(GpioPinValue.High);
            bluepin.SetDriveMode(GpioPinDriveMode.Output);
            greenpin.Write(GpioPinValue.High);
            greenpin.SetDriveMode(GpioPinDriveMode.Output);

            GpioStatus.Text = "GPIO blue/red/green pin initialized correctly.";
        }
{% endhighlight %}

让让我们稍稍细分一下此过程：

* 首先，我们使用 `GpioController.GetDefault()` 获取 GPIO 控制器。

* 如果设备没有 GPIO 控制器，则此函数将返回 `null`。

* 然后，我们尝试通过使用 `REDLED_PIN`、`BLUELED_PIN` 和 `GREENLED_PIN` 值调用 `GpioController.OpenPin()` 来打开引脚。

* 获取 `redpin`、`bluepin` 和 `greenpin` 后，我们使用 `GpioPin.Write()` 函数将其设置为默认为“高”。

* 我们还使用 `GpioPin.SetDriveMode()` 函数将引脚设置为在输出模式下运行。


###修改 GPIO 引脚的状态
在具有 `GpioOutputPin` 实例的访问权限后，没有必要再通过更改引脚状态来打开或关闭 LED。

若要打开 LED，只需将值 `GpioPinValue.High` 写入引脚：


{% highlight C# %}
private void FlipLED()
        {
            if (LEDStatus == 0)
            {
               LEDStatus = 1;
                if (redpin != null && bluepin != null && greenpin != null)
                {
                    //turn on red
                    redpin.Write(GpioPinValue.High);
                    bluepin.Write(GpioPinValue.Low);
                    greenpin.Write(GpioPinValue.Low);
                }
            }
            else if (LEDStatus == 1)
            {
                LEDStatus = 2;
                if (redpin != null && bluepin != null && greenpin != null)
                {
                    //turn on blue
                    redpin.Write(GpioPinValue.Low);
                    bluepin.Write(GpioPinValue.High);
                    greenpin.Write(GpioPinValue.Low);
                }
            }

          else
            {
                LEDStatus = 0;
                if (redpin != null && bluepin != null && greenpin != null)
                {
                    //turn on green
                    redpin.Write(GpioPinValue.Low);
                    bluepin.Write(GpioPinValue.Low);
                    greenpin.Write(GpioPinValue.High);
                }
              }
        }
{% endhighlight %}
