{: .thin-header}
#Blinky 示例

{% include VerifiedVersion.md %}

我们将创建一个简单的 LED 闪烁应用并将 LED 连接到你的 Windows 10 IoT Core 设备。

这是一个有外设的示例。若要更好地了解什么是有外设的模式以及如何将你的设备配置为有外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。

另外，还请注意 GPIO API 仅在 Windows 10 IoT Core 上可用，因此该示例无法在你的桌面上运行。

###在 Visual Studio 中加载项目

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\Blinky` 来查找此示例的源代码。示例代码可采用 C++ 或 C\# 提供，但此处的文档仅详细介绍了 C\# 变体。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

###将 LED 连接到你的 Windows IoT 设备

