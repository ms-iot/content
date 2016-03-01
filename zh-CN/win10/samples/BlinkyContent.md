{% include_relative BlinkyIntro.md %}

你将会需要一些组件：

* 一个 LED（任何你喜欢的颜色）

* 一个 220 &#x2126;适用于 Raspberry Pi 2 和 MinnowBoard Max 或 330 &#x2126; 的电阻器；适用于 DragonBoard 的电阻器

* 一块试验板和几根连接线

![电子元件]({{site.baseurl}}/Resources/images/Blinky/components.png)

{% include_relative BlinkyRPIGpio.md %}

<img src="{{site.baseurl}}/Resources/images/Blinky/breadboard_assembled_rpi2_kit.jpg" height="500">

<sub>\*使用 [Fritzing](http://fritzing.org/){:target="_blank"} 制作的图像\*</sub>

{% include_relative BlinkyMBMGpio.md %}

{% include_relative BlinkyDBGpio.md %}

{% include_relative AppDeploymentCS.md %}

完成所有设置后，你应可以在 Visual Studio 中按 F5。如果有任何缺少的程序包未在设置期间安装，Visual Studio 可能会提示你立即获取它们。Blinky 应用将在 Windows IoT 设备上部署并启动，此时你应看到 LED 与屏幕上的模拟图像同步闪烁。

<img src="{{site.baseurl}}/Resources/images/Blinky/blinky-screenshot.png" height="400">

恭喜你！ 你已控制了 Windows IoT 设备上的一个 GPIO 引脚。

{% include_relative BlinkyCodeCS.md%}
