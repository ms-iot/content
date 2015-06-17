---
layout: default
title: Python for IoT 示例
permalink: /zh-CN/win10/samples/Python.htm
lang: zh-CN
---

##Python 应用

###设置你的电脑

* 按照[此处]({{site.baseurl}}/{{page.lang}}/win10/SetupPC.htm)的说明安装 Visual Studio 2015 预览版。

* 为 Windows \(3.\*\) 安装 Python，网址为 [http://www.python.org/downloads](http://www.python.org/downloads){:target="_blank"}

* 从[此处](https://github.com/microsoft/ptvs/releases){:target="_blank"}下载并安装 PTVS \(Python Tools for Visual Studio\) **VS 2015** 最新开发版本。

* 从[此处](https://github.com/ms-iot/python/releases/v1.0Alpha){:target="_blank"}下载并安装 Python UWP SDK \(pyuwpsdk.vsix\)。

###创建新的 Python 项目

* 基于 `Template > Python > Windows 10 IoT Core > Background Application (IoT)` 创建新项目

###输出 Hello World!

修改 *StartupTask.py*，如下所示

{% highlight Python %}
print("Hello, World from IoT!")
{% endhighlight %}

###将 Python 应用部署到 Windows 10 IoT 核心版设备

* 右键单击“项目”节点并选择“属性”

* 确保将“远程计算机”设置设为指向你的设备（按计算机名称）。如需指导，请返回基本“Hello World”[示例]({{site.baseurl}}/win10/samples/HelloWorld.htm)。

**注意： 现在，请使用设备名称而不是 IP 地址。如果设备名称不唯一，请使用设备上的 `setcomputername` 工具来重置设备名称，然后重新启动。可在[此处]({{site.baseurl}}/win10/samples/PowerShell.htm)找到关于此操作的文档**

* 完成所有设置后，你应该可以在 Visual Studio 中按 F5： Python 应用将在设备上部署并启动。

**注意： 启动 Python 的调试程序后，可能需要几分钟的时间来连接和开始调试远程 Python。如果所需的时间超过几分钟，可能是远程设备上的 msvsmon 出现了问题。有关任何潜在的修复/解决方法，请查看常见问题解答。**

###从 Python 使用 Windows 设备（例如 GPIO、I2C、SPI）

* 在 Python 项目中右键单击引用节点

* 单击“添加引用...”

* 单击“浏览”选项卡

* 从[此处](https://github.com/ms-iot/samples/tree/master/PyWinDevices)下载 pywindevices 内容

* 导航到 RPi2 的 ARM 或 MBM 的 win32

* 针对设备类型和要使用的配置选择 PYD 文件（例如，如果要使用调试配置，则选择 _wingpio\_d.pyd；如果要使用发行配置，则选择 _wingpio.pyd）

* 将“导入”**_wingpio 作为 gpio\*\* 添加到 StartupTask.py

* 开始使用 gpio 函数（与针对 I2C 或 SPI 所采用的步骤类似）

* 可在[此处](https://github.com/ms-iot/samples/tree/master/PyWinDevices/docs)找到 WinDevices 文档

###问题/建议

如果有问题，请参考[常见问题]({{site.baseurl}}/{{page.lang}}/Faqs.htm)。
