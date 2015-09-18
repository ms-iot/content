---
layout: default
title: Python Blinky 服务器示例
permalink: /zh-CN/win10/samples/PythonBlinkyServer.htm
lang: zh-CN
---

##Python Blinky 服务器示例

我们将创建一个简单的 Python Blinky Web 服务器应用，并将 LED 连接到你的 Windows 10 IoT 核心版设备（Raspberry Pi 2 或 MinnowBoard Max）。请注意，GPIO API 仅在 Windows IoT 核心版上可用，因此该示例无法在你的桌面上运行。

###设置你的电脑
* 按照[此处]({{site.baseurl}}/{{page.lang}}/win10/SetupPC.htm)的说明安装 Visual Studio 2015 预览版。

* 为 Windows \(3.\*\) 安装 Python，网址为 [http://www.python.org/downloads](http://www.python.org/downloads){:target="_blank"}

* 从[此处](https://github.com/microsoft/ptvs/releases){:target="_blank"}下载并安装 PTVS \(Python Tools for Visual Studio\) **VS 2015** 最新开发版本。

* 从[此处](https://github.com/ms-iot/python/releases/v1.0Alpha){:target="_blank"}下载并安装 Python UWP SDK \(pyuwpsdk.vsix\)。

###设置你的硬件
此示例的设置与 C\#“Blinky”[示例]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)相同。

###无外设模式

此应用程序专为无外设的设备而设计。若要更好地了解什么是无外设模式以及如何将你的设备配置为无外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。

###在 Visual Studio 中加载项目

可以在[此处](https://github.com/ms-iot/samples/tree/develop/PythonBlinkyServer)找到此示例。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

如果你要针对 MinnowBoard Max 进行生成，请选择体系结构下拉列表中的 `x86`。如果你要针对 Raspberry Pi 2 进行生成，请选择 `ARM`。

确保将 LED 连接到开发板。如需指导，请返回基本“Blinky”[示例]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)。

请注意，如果应用无法找到任何可用的 GPIO 端口（例如，你在运行 Windows IoT 核心版的 VM 上运行该应用时），则该应用不会成功运行。

###我们来看看代码
此示例的代码相当简单。我们使用 _wingpio、http.server 和 socketserver 模块。

*注意：_wingpio 引用已添加到项目并且依赖于不同的配置和平台组合\*

###Blinky 代码
下面介绍了当命中 Web 服务器时如何在 Python 中设置发光 LED：

{% highlight Python %}
import http.server
import socketserver
import _wingpio as gpio

led_pin = 5
led_status = gpio.HIGH

gpio.setup(led_pin, gpio.OUT, gpio.PUD_OFF, led_status)

class BlinkyRequestHandler(http.server.BaseHTTPRequestHandler):
    def do_HEAD(self):
        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
    def do_GET(self):
        global led_status
        if led_status == gpio.LOW:
            self.wfile.write(b"Setting pin to HIGH")
            print('Setting pin to HIGH')
            led_status = gpio.HIGH
        else:
            self.wfile.write(b"Setting pin to LOW")
            print('Setting pin to LOW')
            led_status = gpio.LOW
        gpio.output(led_pin, led_status)

httpd = http.server.HTTPServer(("", 8000), BlinkyRequestHandler)
print('Started web server on port %d' % httpd.server_address[1])
httpd.serve_forever()

{% endhighlight %}

请记住，我们已将 LED 的另一端连接到 3.3 伏电源，因此，我们需要将引脚驱动到低位，使电流通过 LED。

###将 Python 应用部署到 Windows 10 IoT 核心版设备

* 右键单击“项目”节点并选择“属性”

* 确保将“远程计算机”设置设为指向你的设备。如需指导，请返回基本 Python [示例]({{site.baseurl}}/{{page.lang}}/win10/samples/Python.htm)。

**注意： 现在，请使用设备名称而不是 IP 地址。如果设备名称不唯一，请使用设备上的 `setcomputername` 工具来重置设备名称，然后重新启动。可在[此处]({{site.baseurl}}/win10/samples/PowerShell.htm)找到关于此操作的文档**

* 完成所有设置后，你应该可以在 Visual Studio 中按 F5： Python 应用将在设备上部署并启动。

**注意： 启动 Python 的调试程序后，可能需要几分钟的时间来连接和开始调试远程 Python。如果所需的时间超过几分钟，可能是远程设备上的 msvsmon 出现了问题。有关任何潜在的修复/解决方法，请查看常见问题解答。**

* 一旦看到关于 Web 服务器正在启动的消息，你便可以通过单击浏览器中的地址 \(http://<yourdeviceip>:8000\) 来查看 LED 切换开关

###问题/建议

如果有问题，请参考[常见问题]({{site.baseurl}}/{{page.lang}}/Faqs.htm)。
