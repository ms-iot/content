---
layout: default
title: SetupPCWRA
permalink: /zh-CN/win10/samples/BasicWRA.htm
lang: zh-CN
---

#入门

了解如何为使用 Windows Remote Arduino 开发 IoT 应用程序准备好你的电脑。

{% include steps.html device="WRA" %}

##基本的 Windows Remote Arduino

在本项目中，我们将使用 Windows Remote Arduino 打开和关闭 LED。这是一个简单示例，但将显示该库可为你提供的用于创建更多高级项目的功能。开始吧！

##硬件

你始终可以使用 USB 连接开始操作，但让我们介绍蓝牙设备和 LED 的简单连接，我们将使用 Windows Remote Arduino 库通过蓝牙打开和关闭该 LED！

###组成部分

- 你需要以下组成部分：
	* Arduino（Uno 如下图所示）
	* 蓝牙设备（[Sparkfun Mate Silver](https://www.sparkfun.com/products/12576) 如图所示）**或者** USB 电缆
	* 一块试验板
	* 一个 330Ω 电阻器
	* 一个 LED
	* 几根电线 <br/>

	![项目启动]({{site.baseurl}}/images/remote-wiring/samples/basic/parts.JPG)


###设置

本部分将介绍如何连接蓝牙设备和 LED，以便使用 Windows Remote Arduino 切换 LED。如果你喜欢使用 USB，则可以跳过蓝牙连接步骤！

- 在 Arduino 上，将试验板上的电源轨和地轨分别连接到 5V 和 GND 引脚。使用颜色编码电线（红色和黑色）将使跟踪电源连接更容易。

 ![项目启动]({{site.baseurl}}/images/remote-wiring/samples/basic/step01.JPG)

- 在试验板上插入你的蓝牙设备，并在试验板上将 VCC 和 GND 引脚分别连接到电源轨和地轨。

 ![VCC 和接地]({{site.baseurl}}/images/remote-wiring/samples/basic/step02.JPG)

- 将蓝牙设备上的 TX-0 引脚连接到 Arduino 上的 RX 引脚。同样，将蓝牙设备上的 RX-1 引脚连接到 Arduino 上的 TX 引脚。

 ![发送和接收]({{site.baseurl}}/images/remote-wiring/samples/basic/step03.JPG)

   * 请注意图像中的黄色电线从蓝牙设备的传输引脚转到 Arduino 的接收引脚，对于橙色电线则相反。此步骤对蓝牙设备和 Arduino 之间建立串行通信非常重要，从而允许从一台设备传输的消息由其他设备接收。

 ![发送和接收]({{site.baseurl}}/images/remote-wiring/samples/basic/step03_2.JPG) ![发送和接收]({{site.baseurl}}/images/remote-wiring/samples/basic/step03_3.JPG)

   * 请确保你的代码在建立此连接之前已在 Arduino 上上载。Arduino Uno 使用相同的串行（TX 和 RX）引脚用于刷写设备，这将在另一台设备连接到这些串行引脚时阻止任何代码上载到它。

- 将 LED 添加到试验板。请注意较长（或弯曲）的腿是阳极（正值），较短的腿是阴极（负值）。

 ![LED]({{site.baseurl}}/images/remote-wiring/samples/basic/step04.JPG)

- 使用 330Ω 电阻器将 LED 的阴极连接到试验板的地轨。如图所示，330Ω 电阻器带有橙色、棕色、金色条纹。

 ![LED 接地]({{site.baseurl}}/images/remote-wiring/samples/basic/step05.JPG)

- 将 LED 的阳极连接到 Arduino 上的任何数字 I/O 引脚。我们在示例中使用引脚 5。

 ![LED 电源]({{site.baseurl}}/images/remote-wiring/samples/basic/step06.JPG)

- 你的安装程序现在已准备好！ 它应该类似于下图所示的安装程序。同样，如果你喜欢使用 USB，则可能没有在此处显示的串行线连接。

 ![已完成]({{site.baseurl}}/images/remote-wiring/samples/basic/final.JPG)


##代码

现在，我们全部设置完毕，让我们来看一些代码！

- 创建你的项目

 通过遵循安装指南中的步骤，我已设置名为 RemoteBlinky 的项目。在下面的屏幕截图中，你将会看到代码隐藏文件 MainPage.xaml.cs，它只创建蓝牙连接对象并将其传递到构造函数中的 RemoteDevice 类 。你将看到我已在此示例中指定我的设备名称。构建你的对象之前，你还可以通过调用 BluetoothSerial（和 USBSerial）类中的静态 `.listAvailableDevicesAsync()` 函数枚举可用设备。

 ![项目启动]({{site.baseurl}}/images/remote-wiring/samples/basic/project00.png)

###针对 USB 的注意事项：
 `USBSerial` 有许多选项可用于指定你的设备。在构造函数中，你可以提供你设备的 VID 和 PID、仅限 VID 或 `DeviceInformation` 对象（从上述 `listAvailableDevicesAsync` 函数中获取）。同样，`BluetoothSerial` 可以提供一个设备 ID（作为字符串）、设备名称（也是字符串），或 `DeviceInformation` 对象。

可以通过执行以下步骤获取你的 USB 设备的 VID 和 PID 组合： <ul> <li>通过控制面板或通过按 <i>Windows + Pause</i> 键打开设备管理器，然后选择左侧的<i>设备管理器</i>链接。</li> <li>展开<i>端口（COM 和 LPT）</i>菜单</li> <li>右键单击你的 Arduino 设备，然后选择<i>详细信息</i>选项卡上的“属性”</li> <li>，并从下拉菜单中选择“硬件ID”<i></i>。</li> <li>你可以在<i>值</i>框中看到多个项，而任何项将具有匹配的 PID 和 VID。</li> <li>这些项将具有格式“USB\\VID\_\*\*\*\*&PID\_\*\*\*\*”，其中“ \*\*\* ”是数字 ID 值。</li> <li>你可以*只*放入数字，或者还包含"VID\_"来保证你将正确地将识别设备。例如：保证<br/></li> </ul> `USBSerial usb = new USBSerial( "VID_2341", "PID_0043" );`<br/>**仅**为以下硬件设备工作：

![USB 设备]({{site.baseurl}}/images/remote-wiring/samples/basic/vidpid.png)

接下来，我会将回调函数添加到 BluetoothSerial 对象上的 ConnectionEstablished 事件。在连接蓝牙设备时，将会自动调用此函数。你将注意到此时我尚未在该函数中实现任何操作。最后，调用连接对象上的 `.begin()` 以告诉它进行连接。

###针对 USB 的注意事项：
USBSerial 类仍有你可订阅的 ConnectionEstablished 事件。它将始终在正确的时间在这两个类中调用，以便你能够在任一情况下重复使用你的代码！ 但是，请注意在进行任何连接尝试之前，必须调用 `.begin()` 函数。`.begin()` 函数的参数对蓝牙*不重要*，但如果连接到 Arduino 设备，则必须使用 `SerialConfig.8N1` 作为第二个参数！ 无论你使用哪种连接类型，该示例的其余部分都将完全相同地工作。

 ![项目启动]({{site.baseurl}}/images/remote-wiring/samples/basic/project01.png)

- 跳转到 MainPage.xaml 文件并创建将会打开和关闭 LED 的一对按钮。你会注意到我已将按钮回调添加到 `Click` 事件并将 `IsEnabled` 属性设置为 false，然后你会在下一步看到原因！

 ![项目启动]({{site.baseurl}}/images/remote-wiring/samples/basic/project02.png)

- 我已在此步骤中实现了三个函数。首先，`OnConnectionEstablished` 函数现在启用 UI 线程上的按钮！ 因为发生此操作通常要花费数秒钟，所以这可保证仅在蓝牙连接准备就绪时启用这些按钮。

- 我还在按钮回调 `OnButton_Click` 和 `OffButton_Click` 中设置了 `.digitalWrite()` 调用

 ![项目启动]({{site.baseurl}}/images/remote-wiring/samples/basic/project04.png)

- 构建和部署！ 在建立连接时将启用你的按钮，而且你可以自由地随意打开和关闭你的 LED！ 下面是在 Windows Phone 10 上运行的此基本示例的屏幕截图。

 ![项目启动]({{site.baseurl}}/images/remote-wiring/samples/basic/screenshot.png)


我确实希望你享受复制此项目，并将其作为基准，用于“制造商”项目的不可思议的新设置！
