---
layout: default
title: RGB LED 示例
permalink: /zh-cn/win10/samples/RGBLED.htm
lang: zh-cn
---

##RGB LED 示例

{% include VerifiedVersion.md %}

[在 Github 上查看代码](https://github.com/ms-iot/samples/blob/develop/RGBLED/CS/MainPage.xaml.cs)

在此示例中，我们会将三色 LED 连接到 Raspberry Pi 2。LED 将闪烁，同时在红色、蓝色与绿色之间更改颜色。

这是一个有外设示例，所以请确保你的设备处于有外设模式下，方法为运行以下命令：`setbootoption.exe headed`（更改有外设/无外设状态需要重新启动）。

另外，还请注意 GPIO API 仅在 Windows IoT 核心版上可用，因此该示例无法在你的桌面上运行。


###组件

你将需要以下组件：

* 1 个 [754-1615-ND 三色 LED](http://www.digikey.com/product-detail/en/WP154A4SUREQBFZGC/754-1615-ND/3084119){:target="_blank"}

* 1 个 [330 &#x2126; 电阻器](http://www.digikey.com/product-detail/en/CFR-25JB-52-330R/330QBK-ND/1636){:target="_blank"}

* 2 个 [100 &#x2126; 电阻器](http://www.digikey.com/product-detail/en/CFR-25JB-52-100R/100QBK-ND/246){:target="_blank"}

* 一块试验板以及多根公母头连接线和双公头连接线

###连接到你的设备

我们先来为试验板上的组件布线，如下图所示。

![试验板连接]({{site.baseurl}}/Resources/images/RGBLED/RGBLED_bb.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

以下是电路原理图：

![电路示意图]({{site.baseurl}}/Resources/images/RGBLED/RGBLED-schematic_schem.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

三色 LED 的引出线如下所示，并且可以在[数据表](http://www.kingbrightusa.com/Resources/images/catalog/SPEC/WP154A4SUREQBFZGC.pdf){:target="_blank"}中找到。

![三色 LED 引出线]({{site.baseurl}}/Resources/images/RGBLED/RGBLED_Pinout.png)

####连接三色 LED

* 将三色 LED 插入试验板，如页面顶部的试验板图中所示。

* 将 330 &#x2126; 电阻器的一端连接到三色 LED 的红色引线上。

* 将 330 &#x2126; 电阻器的另一端连接到 Raspberry Pi 2 的引脚 29 GPIO5。

* 将 100 &#x2126; 电阻器的一端连接到三色 LED 的蓝色引线上。

* 将 100 &#x2126; 电阻器的另一端连接到 Raspberry Pi 2 的引脚 31 GPIO6。

* 将 100 &#x2126; 电阻器的一端连接到三色 LED 的绿色引线上。

* 将 100 &#x2126; 电阻器的另一端连接到 Raspberry Pi 2 上的引脚 33 GPIO13。

* 将三色 LED 的阴极（最长的阴极引线）连接到引脚 6 GND。

下面是 RPi2 的引出线：

![Raspberry Pi 2 引出线]({{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

###部署你的应用

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\RGBLED` 来查找此示例的源代码。本示例是采用 C\# 编写的。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

按照[设置远程调试并部署应用]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#csharp)的说明进行操作。RGBLED 应用将在 MBM 上部署并启动，此时你应看到 LED 与屏幕上的模拟图像同步闪烁。

###我们来看看代码

首先，我们将获取默认的 GPIO 控制器，然后检查它不是 NULL。`GpioController.GetDefault()` 在不包含 GPIO 控制器的平台上返回 NULL。

{% highlight C# %}
        private void Page_Loaded(object sender, RoutedEventArgs e)
        {
            var gpio = GpioController.GetDefault();

            // Show an error if there is no GPIO controller
            if (gpio == null)
            {
                GpioStatus.Text = "There is no GPIO controller on this device.";
                return;
            }
{% endhighlight %}

接下来，我们将打开稍后将在程序中使用的引脚。RGB LED 需要 3 个 gpio 引脚，每个引脚用来驱动 LED 的每个颜色通道。代码会采取不同的行为，具体取决于它在哪个平台上运行。如果在 Raspberry Pi 上运行，我们将使用引脚 5、6 和 13，因为它们在标头上以物理方式彼此相邻。如果不在 Raspberry Pi 上运行，我们将采用前 3 个可用引脚。此外，跳过在已知硬件平台上连接到板载功能的引脚有一定的逻辑性。

{% highlight C# %}
            var deviceModel = GetDeviceModel();
            if (deviceModel == DeviceModel.RaspberryPi2)
            {
                // Use pin numbers compatible with documentation
                const int RPI2_RED_LED_PIN = 5;
                const int RPI2_GREEN_LED_PIN = 13;
                const int RPI2_BLUE_LED_PIN = 6;

                redpin = gpio.OpenPin(RPI2_RED_LED_PIN);
                greenpin = gpio.OpenPin(RPI2_GREEN_LED_PIN);
                bluepin = gpio.OpenPin(RPI2_BLUE_LED_PIN);
            }
            else
            {
                // take the first 3 available GPIO pins
                var pins = new List<GpioPin>(3);
                for (int pinNumber = 0; pinNumber < gpio.PinCount; pinNumber++)
                {
                    // ignore pins used for onboard LEDs
                    switch (deviceModel)
                    {
                        case DeviceModel.DragonBoard410:
                            if (pinNumber == 21 || pinNumber == 120)
                                continue;
                            break;
                    }

                    GpioPin pin;
                    GpioOpenStatus status;
                    if (gpio.TryOpenPin(pinNumber, GpioSharingMode.Exclusive, out pin, out status))
                    {
                        pins.Add(pin);
                        if (pins.Count == 3)
                        {
                            break;
                        }
                    }
                }

                if (pins.Count != 3)
                {
                    GpioStatus.Text = "Could not find 3 available pins. This sample requires 3 GPIO pins.";
                    return;
                }

                redpin = pins[0];
                greenpin = pins[1];
                bluepin = pins[2];
            }
{% endhighlight %}

接下来，我们将引脚初始化为较高驱动的输出，这会导致 LED 关闭。我们还能显示哪些引脚编号处于使用状态。如果你没有使用 Raspberry Pi，请将 RGB LED 连接到在屏幕中显示的引脚。

{% highlight C# %}
            redpin.Write(GpioPinValue.High);
            redpin.SetDriveMode(GpioPinDriveMode.Output);
            greenpin.Write(GpioPinValue.High);
            greenpin.SetDriveMode(GpioPinDriveMode.Output);
            bluepin.Write(GpioPinValue.High);
            bluepin.SetDriveMode(GpioPinDriveMode.Output);

            GpioStatus.Text = string.Format(
                "Red Pin = {0}, Green Pin = {1}, Blue Pin = {2}",
                redpin.PinNumber,
                greenpin.PinNumber,
                bluepin.PinNumber);
{% endhighlight %}

最后，我们会启动用于轮换显示 LED 颜色的定期计时器。我们会使用 `DispatcherTimer`，因为我们将更新计时器回调上的 UI。如果我们无需更新该 UI，则使用在独立线程上运行的 `System.Threading.Timer` 会更好。我们在 UI 线程上可以执行的操作越少，UI 的响应速度会更快。

{% highlight C# %}
            timer = new DispatcherTimer();
            timer.Interval = TimeSpan.FromMilliseconds(500);
            timer.Tick += Timer_Tick;
            timer.Start();
        }
{% endhighlight %}

在计时器回调中，我们将点亮当前活动的 LED 并更新 UI。

{% highlight C# %}
        private void FlipLED()
        {
            Debug.Assert(redpin != null && bluepin != null && greenpin != null);

            switch (ledStatus)
            {
                case LedStatus.Red:
                    //turn on red
                    redpin.Write(GpioPinValue.High);
                    bluepin.Write(GpioPinValue.Low);
                    greenpin.Write(GpioPinValue.Low);

                    LED.Fill = redBrush;
                    ledStatus = LedStatus.Green;    // go to next state
                    break;
                case LedStatus.Green:

                    //turn on green
                    redpin.Write(GpioPinValue.Low);
                    greenpin.Write(GpioPinValue.High);
                    bluepin.Write(GpioPinValue.Low);

                    LED.Fill = greenBrush;
                    ledStatus = LedStatus.Blue;     // go to next state
                    break;
                case LedStatus.Blue:
                    //turn on blue
                    redpin.Write(GpioPinValue.Low);
                    greenpin.Write(GpioPinValue.Low);
                    bluepin.Write(GpioPinValue.High);

                    LED.Fill = blueBrush;
                    ledStatus = LedStatus.Red;      // go to next state
                    break;
            }
        }

        private void Timer_Tick(object sender, object e)
        {
            FlipLED();
        }
{% endhighlight %}
