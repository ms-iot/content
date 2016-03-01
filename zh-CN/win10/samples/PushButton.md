---
layout: default
title: “推送”按钮示例
permalink: /zh-cn/win10/samples/PushButton.htm
lang: zh-cn
---

##“推送”按钮示例

{% include VerifiedVersion.md %}

[在 GitHub 上查看代码](https://github.com/ms-iot/samples/tree/develop/PushButton/CS){:target="_blank"}

在此示例中，我们将“推送”按钮连接到你的 Raspberry Pi 2、MinnowBoard Max 或 DragonBoard 410c 并将其用于控制 LED。我们使用 GPIO 中断来检测按下该按钮的时间并切换 LED 进行响应。

![“推送”按钮图像]({{site.baseurl}}/Resources/images/PushButton/PushButtonSample.png)

这是一个有外设示例，所以请确保你的设备处于有外设模式下，方法为运行以下命令：`setbootoption.exe headed`（更改有外设/无外设状态需要重新启动）。

另外，还请注意 GPIO API 仅在 Windows IoT 核心版上可用，因此该示例无法在你的桌面上运行。


###组件

你将需要以下组件：

* 一个 [EG1311-ND 触摸按钮](http://www.digikey.com/product-detail/en/320.02E11.08BLK/EG1311-ND/101397){:target="_blank"}

* 1 个[红色 LED](http://www.digikey.com/product-detail/en/C5SMF-RJS-CT0W0BB1/C5SMF-RJS-CT0W0BB1-ND/2341832){:target="_blank"}

* 1 个 [330 &#x2126; 电阻器](http://www.digikey.com/product-detail/en/CFR-25JB-52-330R/330QBK-ND/1636){:target="_blank"}

* 一块试验板以及多根用于 Raspberry Pi 2 或 MinnowBoard Max 的公母头连接线或用于 DragonBoard 的双公头连接线

###将电路连接到你的设备

我们先来为试验板上的组件布线。根据你的设备，查看以下相应的 **Raspberry Pi 2、MinnowBoard Max 或 DragonBoard 410c** 部分。

#### Raspberry Pi 2

| 试验板图 | 示意图 |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| ![试验板连接]({{site.baseurl}}/Resources/images/PushButton/RPi2_PushButton_bb.png) | ![电路示意图]({{site.baseurl}}/Resources/images/PushButton/RPi2_PushButton_schem.png) |

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

#####连接 LED

* 将 LED 阴极（较短的阴极引线）连接到 Raspberry Pi 2 的引脚 31 \(GPIO 6\)

* 将 LED 阳极（较长的阳极引线）连接到 330 &#x2126; 电阻器中的一条引线

* 将 330 &#x2126; 电阻器的另一端连接到 Raspberry Pi 2 上的引脚 1 \(3.3V\)

#####连接“推送”按钮

* 将“推送”按钮中的一个引脚连接到 Raspberry Pi 2 的引脚 29 \(GPIO 5\)

* 将“推送”按钮中的另一个引脚连接到地线

下面是 RPi2 的引出线：

![Raspberry Pi 2 引出线]({{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

#### MinnowBoard Max

| 试验板图 | 示意图 |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| ![试验板连接]({{site.baseurl}}/Resources/images/PushButton/MBM_PushButton_bb.png) | ![电路示意图]({{site.baseurl}}/Resources/images/PushButton/MBM_PushButton_schem.png) |

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

#####连接 LED

* 将 LED 阴极（较短的阴极引线）连接到 MinnowBoard Max 的引脚 20 \(GPIO 6\)

* 将 LED 阳极（较长的阳极引线）连接到 330 &#x2126; 电阻器中的一条引线

* 将 330 &#x2126; 电阻器的另一端连接到 MinnowBoard Max 上的引脚 4 \(3.3V\)

#####连接“推送”按钮

* 将“推送”按钮中的一个引脚连接到 MinnowBoard Max 的引脚 18 \(GPIO 5\)

* 将“推送”按钮中的另一个引脚连接到引脚 2（地线）

下面是 MBM 的引出线：

![MinnowBoard Max 引出线]({{site.baseurl}}/Resources/images/PinMappings/MBM_Pinout.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

#### DragonBoard 410c

作为参考，下图概述了低速扩展连接器的功能

![DragonBoard 低速扩展连接器]({{site.baseurl}}/Resources/images/PinMappings/DB_pinout.png)

执行下列步骤以连接 LED：

* 将 LED 阴极（较短的阴极引线）连接到引脚 25 \(GPIO 13\)
* 将 LED 阳极（较长的阳极引线）连接到 330 &#x2126; 电阻器中的一条引线
* 将 330 &#x2126; 电阻器的另一端连接到引脚 35 \(1.8V PWR\)

执行以下步骤来连接“推送”按钮：

* 将“推送”按钮中的一个引脚连接到引脚 23 \(GPIO 36\)
* 将“推送”按钮中的另一个引脚连接到引脚 1 \(GND\)

组装了电路的试验板的可能外观如下所示：

![DragonBoard 推送按钮试验板]({{site.baseurl}}/Resources/images/PushButton/DB_PushButton_bb.png)

电路示意图如下图所示：

![DragonBoard 推送按钮示意图]({{site.baseurl}}/Resources/images/PushButton/DB_PushButton_schem.png)

最后，示例代码的 **MainPage.xml.cs** 文件的 LED\_PIN 和 BUTTON\_PIN 变量需要进行如下修改：

~~~
private const int LED_PIN = 13;
private const int BUTTON_PIN = 36;
~~~
{: .language-c\#}

###生成和运行示例

1. 在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载包含我们所有示例的 zip。
1. 在 Visual Studio 中打开 `samples-develop\PushButton\CS\PushButton.csproj`。
1. 如果你有 **Raspberry Pi 2** 或 **DragonBoard 410c**，请为目标体系结构选择 `ARM`。否则，为 **MinnowBoard Max** 选择 `x86`
1. 转到 `Build -> Build Solution`
1. 从调试目标中选择 `Remote Machine`
1. 点击 F5 以进行部署和调试。输入你的设备的 IP 地址并为身份验证类型选择 `Universal`。

###我们来看看代码

首先，我们打开将使用的 GpioPin 资源。将按钮连接到活动的 LOW 配置中的 GPIO5，这意味着当未按下该按钮时信号值为 HIGH，而当按下该按钮时信号值将变为 LOW。我们将使用已连接到 GPIO6 的 LED（这是在活动的 LOW 配置中连接的），这意味着当该引脚值为 HIGH 时将关闭 LED，而当该引脚值为 LOW 时将打开 LED。

{% highlight C# %}
buttonPin = gpio.OpenPin(BUTTON_PIN);
ledPin = gpio.OpenPin(LED_PIN);
{% endhighlight %}

我们首先通过将 HIGH 值锁存到该引脚上，在 OFF 状态下初始化 LED。当我们将驱动器模式更改为“输出”时，输出值将随即锁存到该引脚上。当我们最初打开引脚时锁存的输出值未定义，因此我们应该始终先将该引脚设置为已知状态，然后再将其更改为输出。请记住，我们已将 LED 的另一端连接到 3.3V，因此我们需要将引脚驱动到低位，才能使电流通过 LED。

{% highlight C# %}
// Initialize LED to the OFF state by first writing a HIGH value
// We write HIGH because the LED is wired in a active LOW configuration
ledPin.Write(GpioPinValue.High); 
ledPin.SetDriveMode(GpioPinDriveMode.Output);
{% endhighlight %}

接下来，我们将设置按钮引脚。对于 Raspberry Pi 2 或 DragonBoard 410c，我们将充分利用其内置了可激活的上拉式电阻器这一优势。我们使用内置的上拉式电阻器，这样无需在外部提供电阻器。MinnowBoard Max 具有的 10k&#x2126; 上拉式电阻器在默认情况下处于打开状态并且不可配置，因此我们将进行检查以确保此驱动器模式受支持。

{% highlight C# %}
// Check if input pull-up resistors are supported
if (buttonPin.IsDriveModeSupported(GpioPinDriveMode.InputPullUp))
	buttonPin.SetDriveMode(GpioPinDriveMode.InputPullUp);
else
	buttonPin.SetDriveMode(GpioPinDriveMode.Input);
{% endhighlight %}

接下来，我们将连接 GPIO 中断侦听器。这是每次该引脚状态更改时都会调用的事件。我们还将 DebounceTimeout 属性设置为 50 毫秒，以筛选出由电气噪声引起的虚假事件。按钮属于机械型设备，可在单次按下按钮后多次建立和中断连接。由于我们不希望调用过多的事件，因此我们将筛选出这些虚假事件。

{% highlight C# %}
// Set a debounce timeout to filter out switch bounce noise from a button press
buttonPin.DebounceTimeout = TimeSpan.FromMilliseconds(50);

// Register for the ValueChanged event so our buttonPin_ValueChanged 
// function is called when the button is pressed
buttonPin.ValueChanged += buttonPin_ValueChanged;
{% endhighlight %}

在按钮中断处理程序中，我们将查看 GPIO 边缘信号，以确定是按下还是释放该按钮。如果已按下该按钮，我们将转换 LED 的状态。

{% highlight C# %}
private void buttonPin_ValueChanged(GpioPin sender, GpioPinValueChangedEventArgs e)
{
	// toggle the state of the LED every time the button is pressed
	if (e.Edge == GpioPinEdge.FallingEdge)
	{
		ledPinValue = (ledPinValue == GpioPinValue.Low) ?
			GpioPinValue.High : GpioPinValue.Low;
		ledPin.Write(ledPinValue);
	}
{% endhighlight %}

我们还希望根据引脚的当前状态来更新用户界面，以便我们可以在 UI 线程上调用更新操作。当我们不希望等待异步操作完成时，若要禁止显示编译器警告，必须捕获本地变量中异步方法的结果。

{% highlight C# %}
// need to invoke UI updates on the UI thread because this event
// handler gets invoked on a separate thread.
var task = Dispatcher.RunAsync(CoreDispatcherPriority.Normal, () => {
	if (e.Edge == GpioPinEdge.FallingEdge)
	{
		ledEllipse.Fill = (ledPinValue == GpioPinValue.Low) ? 
			redBrush : grayBrush;
		GpioStatus.Text = "Button Pressed";
	}
	else
	{
		GpioStatus.Text = "Button Released";
	}
});
{% endhighlight %}

就这么简单！ 每次按下该按钮时，你应该能看到 LED 状态出现变化。
