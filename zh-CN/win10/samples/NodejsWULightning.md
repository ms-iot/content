---
layout: default
title: NodejsWULightning
permalink: /zh-cn/win10/samples/NodejsWULightning.htm
lang: zh-cn
---

# 带有 Lightning 的 Blinky Node.js（Windows 通用）示例

{% include VerifiedVersion.md %}

在此示例中，我们将使用 [Lightning GPIO 提供程序]({{site.baseurl}}/{{page.lang}}/win10/LightningProviders.htm)来让连接到 Raspberry Pi 2 的 LED 实现闪烁效果。它还包括引用 Node.js 项目中自定义 winmd 文件的步骤。此示例基于 [Blinky 示例]({{site.baseurl}}/{{page.lang}}/win10/samples/NodejsWUBlinky.htm)，并共享相同的设置步骤以及大部分代码。主要区别是将 Lightning 提供程序设置为默认控制器提供程序。


### 设置电脑
* 安装[含有 11 月更新](http://windows.microsoft.com/zh-cn/windows-10/windows-update-faq)的 Windows 10。
* 安装 Visual Studio 2015 Update 1。
* 从[此处](http://aka.ms/ntvsiotlatest)安装适用于 Windows IoT 的最新 Node.js 工具。


### 设置你的硬件
* 此示例的设置与 C\#“Blinky”[示例]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)相同。
* 按照[此页面]({{site.baseurl}}/{{page.lang}}/win10/LightningSetup.htm)中的步骤在 Raspberry Pi 2 上设置 Lightning。


### 创建新的 Node.js（Windows 通用）项目
启动 Visual Studio 2015 并创建新项目（“文件”\|“新建项目...”）。在“`New Project`”对话框中，导航到“`Node.js`”，如下所示（在该对话框的左侧窗格中： “模板”\|“JavaScript”\|“Node.js”）。使用 `Basic Node.js Web Server (Windows Universal)` 模板。

创建项目后，打开 server.js 并使用如下所示的代码替换现有代码：

<UL>

{% highlight JavaScript %}
var http = require('http');
var uwp = require('uwp');

// Inject 'Windows' and 'Microsoft' namespaces to global
uwp.projectNamespace('Windows');
uwp.projectNamespace('Microsoft');

// Check if Lightning is enabled and set the Lightning provider as the default provider
if (Microsoft.IoT.Lightning.Providers.LightningProvider.isLightningEnabled) {
  Windows.Devices.LowLevelDevicesController.defaultProvider = Microsoft.IoT.Lightning.Providers.LightningProvider.getAggregateProvider();
}

var gpioController = Windows.Devices.Gpio.GpioController.getDefault();

// Open pin 5
pin = gpioController.openPin(5);

// Configure pin for output
pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output);

// Write initial 'high' value to pin
pin.write(Windows.Devices.Gpio.GpioPinValue.high);

setInterval(function () {
  // Toggle LED on/off every 1 second
  if (pin.read() == Windows.Devices.Gpio.GpioPinValue.high) {
    pin.write(Windows.Devices.Gpio.GpioPinValue.low);
  } else {
    pin.write(Windows.Devices.Gpio.GpioPinValue.high);
  }
}, 1000);

uwp.close();
{% endhighlight %}
</UL>

下面是以上代码所执行的操作：

* 我们使用 [node-uwp](https://www.npmjs.com/package/uwp) npm 程序包（默认包含在项目中）来允许代码使用 UWP API（在 Windows 和 Microsoft 命名空间内）。
* 检查是否已启用 Lightning 并将其设置为默认提供程序。
* 调用 `GpioController.getDefault()` 以获取 GPIO 控制器。
* 然后，我们尝试通过使用 LED 引脚值调用 `GpioController.openPin()` 来打开引脚。
* 获取 `pin` 后，我们使用 `GpioController.write()` 函数将其设置为默认处于关闭状态 \(High\)。
* 每隔 1000 毫秒（1 秒），就会检查一次 LED 的值，然后将其设置为与当前值相反的值。

### 将 Microsoft.IoT.Lightning.Providers 库添加到项目
* 使用 `git clone https://github.com/ms-iot/BusProviders` 在电脑上克隆总线提供程序存储库。
* 在项目的解决方案资源管理器中，右键单击解决方案节点、依次选择“添加”-\>“现有项目...”，然后添加 \<总线提供程序克隆根目录\>\\Microsoft.IoT.Lightning.Providers\\Providers\\Microsoft.Iot.Lightning.Providers.vcxproj。
* 生成解决方案。
* 在解决方案资源管理器中，右键单击 Node.js 项目（带有 server.js）、依次选择“添加”-\>“现有项...”，然后添加以下文件：
  * \<项目根目录\>\\ARM\\Debug\\Microsoft.Iot.Lightning.Providers\\Microsoft.IoT.Lightning.Providers.dll
  * \<项目根目录\>\\ARM\\Debug\\Microsoft.Iot.Lightning.Providers\\Microsoft.IoT.Lightning.Providers.winmd
* 打开 Package.appxmanifest 文件。添加以下功能：

<UL>

{% highlight XML %}
    <iot:Capability Name="lowLevelDevices" />
    <DeviceCapability Name="109b86ad-f53d-4b76-aa5f-821e2ddf2141"/>
{% endhighlight %}
</UL>

* 然后添加以下扩展：

<UL>

{% highlight XML %}
    <Extension Category="windows.activatableClass.inProcessServer">
      <InProcessServer>
        <Path>Microsoft.IoT.Lightning.Providers.dll</Path>
        <ActivatableClass ActivatableClassId="Microsoft.IoT.Lightning.Providers.LightningPwmProvider" ThreadingModel="both" />
        <ActivatableClass ActivatableClassId="Microsoft.IoT.Lightning.Providers.LightningGpioProvider" ThreadingModel="both" />
        <ActivatableClass ActivatableClassId="Microsoft.IoT.Lightning.Providers.LightningSpiProvider" ThreadingModel="both" />
        <ActivatableClass ActivatableClassId="Microsoft.IoT.Lightning.Providers.LightningI2cProvider" ThreadingModel="both" />
        <ActivatableClass ActivatableClassId="Microsoft.IoT.Lightning.Providers.LightningProvider" ThreadingModel="both" />
        <ActivatableClass ActivatableClassId="Microsoft.IoT.Lightning.Providers.LightningAdcProvider" ThreadingModel="both" />
      </InProcessServer>
    </Extension>
{% endhighlight %}
</UL>

* 生成解决方案。


### 将服务器部署到 Windows IoT 核心版设备
* 转到“项目”菜单，然后选择“\<项目名称\> 属性”（也可以在解决方案资源管理器中右键单击项目节点来访问“属性”）。在“远程计算机”文本框中输入 IP 地址。如果你要针对 Minnowboard Max 进行生成，请选择下拉列表中的 `x86`。如果你要针对 Raspberry Pi 2 或 3 进行生成，请选择 `ARM`。

* 现在，我们可以随时部署到远程 Windows IoT 核心版设备。只需按 F5（或依次选择“调试”\|“开始调试”）即可启动应用。


### GitHub
* NTVS IoT 扩展源代码：[https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
* Node.js UWP 包装器源代码：[https://github.com/ms-iot/node-uwp-wrapper](https://github.com/ms-iot/node-uwp-wrapper)
