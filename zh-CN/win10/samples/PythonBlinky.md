---
layout: default
title: Python Blinky 示例
permalink: /zh-cn/win10/samples/PythonBlinky.htm
lang: zh-cn
---

##Python Blinky 示例

{% include VerifiedVersion.md %}

我们将创建一个简单的 Python Blinky 应用，并将 LED 连接到你的 Windows 10 IoT 核心版设备（Raspberry Pi 2 或 MinnowBoard Max）。请注意，GPIO API 仅在 Windows IoT 核心版上可用，因此该示例无法在你的桌面上运行。

###设置电脑
* 按照[此处]({{site.baseurl}}/{{page.lang}}/GetStarted.htm)的说明设置你的设备和电脑。

* 为 Windows \(3.\*\) 安装 Python，网址为 [http://www.python.org/downloads](http://www.python.org/downloads){:target="_blank"}

* 从[此处](https://github.com/microsoft/ptvs/releases){:target="_blank"}下载并安装 PTVS \(Python Tools for Visual Studio\) **VS 2015** 最新版本。

* 从[此处](https://github.com/ms-iot/python/releases){:target="_blank"}下载并安装 Python UWP SDK \(pyuwpsdk.vsix\) 最新版本。

###设置你的硬件
此示例的设置与 C\#“Blinky”[示例]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)相同。

###无外设模式

此应用程序专为无外设的设备而设计。若要更好地了解什么是无外设模式以及如何将你的设备配置为无外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。

###在 Visual Studio 中加载项目

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\BlinkyHeadless\Python` 来查找此示例的源代码。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

如果你要针对 MinnowBoard Max 进行生成，请选择体系结构下拉列表中的 `x86`。如果你要针对 Raspberry Pi 2 进行生成，请选择 `ARM`。

确保将 LED 连接到开发板。如需指导，请返回基本“Blinky”[示例]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)。

请注意，如果应用找不到任何可用 GPIO 端口，则该应用将无法成功运行。

###我们来看看代码
此示例的代码相当简单。我们使用 \_wingpio 和时间模块。

*\*注意：\_wingpio 引用已添加到项目并且依赖于不同的配置和平台组合。\* *对于新项目，请从 [CPython UWP SDK](https://github.com/ms-iot/python/releases) 版本下载 pywindevices.zip，并将相应的引用添加到你的项目。*

###Blinky 代码
下面介绍了如何在 Python 中设置发光 LED：

{% highlight Python %}
import _wingpio as gpio
import time

led_pin = 5
pinValue = gpio.HIGH

gpio.setup(led_pin, gpio.OUT, gpio.PUD_OFF, gpio.HIGH)

while True:
    if pinValue == gpio.HIGH:
        pinValue = gpio.LOW
        gpio.output(led_pin, pinValue)
    else:
        pinValue = gpio.HIGH
        gpio.output(led_pin, pinValue)

    time.sleep(0.5)

gpio.cleanup()
{% endhighlight %}

请记住，我们已将 LED 的另一端连接到 3.3 伏电源，因此，我们需要将引脚驱动到低位，使电流通过 LED。

###将 Python 应用部署到 Windows 10 IoT 核心版设备

* 按照[设置远程调试并部署应用]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#python)的说明进行操作。

	**注意： 现在，请使用设备名称而不是 IP 地址。如果设备名称不唯一，请使用设备上的 `setcomputername` 工具来重置设备名称，然后重新启动。可在[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)**找到关于此操作的文档

* Python 应用将在设备上部署并启动。

	**注意： 启动 Python 的调试程序后，可能需要几分钟的时间来连接和开始调试远程 Python。如果所需的时间超过几分钟，可能是远程设备上的 msvsmon 出现了问题。有关任何潜在的修复/解决方法，请查看常见问题解答。**

###问题/建议

如果有问题，请参考[常见问题]({{site.baseurl}}/{{page.lang}}/Faqs.htm)。
