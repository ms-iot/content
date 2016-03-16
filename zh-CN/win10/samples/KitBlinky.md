---
layout: default
title: Blinky 示例
permalink: /zh-cn/win10/samples/KitBlinky.htm
step: win10/samples/KitBlinky.htm
lang: zh-cn
deviceName: RPI2
kit: Starter Pack for Windows 10 IoT Core on Raspberry Pi2
---
<ol class="breadcrumb">
  <li><a href="{{site.baseurl}}/{{page.lang}}/AdafruitMakerKit.htm">初学者包概述</a></li>
  <li class="active">Blinky 示例</li>
</ol>

<h1 class="thin-header">第 1 课： 简介和设置</h1>
{% include kit-steps.html device=page.deviceName %}

<hr/>

{: .thin-header}
#Blinky 示例

让我们使用 LED 创建一个简单的 Blinky 应用来测试你的设置。

###在 Visual Studio 中加载项目

你可以通过在[此处](https://github.com/ms-iot/adafruitsample/archive/master.zip)下载所有示例的 zip 并导航到 `Blinky` 来查找此示例的源代码。示例代码可采用 C++ 或 C\# 提供，但此处的文档仅详细介绍了 C\# 变体。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

###将 LED 连接到你的 Windows IoT 设备

你将会需要一些组件：

* 一个 LED（任何你喜欢的颜色）

* 一个 560 &#x2126; 电阻器（[电阻器颜色代码](https://en.wikipedia.org/wiki/Electronic_color_code)，绿色、蓝色、棕色、金色）

* 一块试验板
* 两根公母头连接线

![电子元件]({{site.baseurl}}/Resources/images/AdafruitStarterPack/KitBlinkyMaterials.jpg){:.device-images}

{% include_relative BlinkyRPIGpio.md %}

<img class="device-images" src="{{site.baseurl}}/Resources/images/Blinky/breadboard_assembled_rpi2_kit.jpg" height="400">

<sub>\*使用 [Fritzing](http://fritzing.org/){:target="_blank"} 制作的图像\*</sub>

###部署你的应用

1. 应用程序在 Visual Studio 中打开后，将工具栏下拉列表中的体系结构设置为 `ARM`。

2. 接下来，在 Visual Studio 工具栏中，单击 `Local Machine` 下拉列表并选择 `Remote Machine`<br/>

    ![RemoteMachine 目标]({{site.baseurl}}/Resources/images/AppDeployment/piKit-remote-machine-debugging.png)

3. 此时，Visual Studio 将显示“远程连接”对话框。如果以前使用过 [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) 设置设备的唯一名称，可在此处输入该名称（在此示例中，我们使用的是 **my-device**）。否则，使用 Windows IoT 核心版设备的 IP 地址。输入设备名称/IP 后，选择 `Universal` 进行 Windows 身份验证，然后单击“选择”。

    ![远程计算机调试]({{site.baseurl}}/Resources/images/AppDeployment/cs-remote-connections.PNG)

4. 可通过导航到项目属性（在“解决方案资源管理器”中选择“属性”）并在左侧选择 `Debug` 选项卡来验证或修改这些值：

    ![项目属性调试选项卡]({{site.baseurl}}/Resources/images/AppDeployment/cs-debug-project-properties.PNG)

完成所有设置后，你应该可以在 Visual Studio 中按 F5 来部署该代码。

恭喜！ 你已控制了 Windows IoT 设备上的一个 GPIO 引脚。

{% include_relative BlinkyCodeCS.md%}

<div class="row lineTop">
  <div class="text-right col-xs-24">
    <h2 class="thin-header"><a href="{{site.baseurl}}/{{page.lang}}/win10/samples/WorldMapOfMakers.htm">下一步： 第 2 课 - 初学者项目</a></h2>
  </div>
</div>
