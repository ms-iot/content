---
layout: default
title: Alljoyn Mock 适配器教程
permalink: /zh-cn/win10/samples/MockAdapterTutorial.htm
lang: zh-cn
---

##Alljoyn Mock 适配器示例

{% include VerifiedVersion.md %}

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\AllJoyn\Samples\MockAdapter` 来查找此示例的源代码。示例代码在 C++ 中可用。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

本教程将演示 AllJoyn 设备系统网桥 \(DSB\) 公开和控制 mock 设备的功能。

## 先决条件

1. 运行 Windows 10 核心版 10240+ 的 Raspberry Pi2
2. 安装 Windows 10 10240 以上版本的电脑或笔记本电脑
3. 安装 [IoT Explorer for AllJoyn]({{site.baseurl}}/zh-cn/win10/AllJoyn.htm#AllJoynExplorer){:target="_blank"} 应用。

## 设置 Raspberry Pi2

1. 将你的 Raspberry Pi2 连接到 LAN
2. 接通电源以启动 Raspberry Pi2
3. 验证电脑是否可以访问带有 Windows IoT Core Watcher 的 Raspberry Pi2

## 在 Visual Studio 中运行 Mock 适配器

1. 在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载包含我们所有示例的 zip。
2. 在 Visual Studio 中打开 `samples-develop\AllJoyn\Samples\MockAdapter\MockAdapter.sln`。
3. 导航到“解决方案资源管理器”，然后右键单击 HeadlessAdapterApp 项目。选择“设置为启动项目”。

![set\_startup]({{site.baseurl}}/Resources/images/MockAdapter/mockadapter_vs.png)

4. 	在主菜单栏中，依次选择“调试”-\>“HeadlessAdapterApp 属性...”
5.	按照[设置远程调试并部署应用]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#cpp)的说明进行操作

## 通过 IoT Explorer for Alljoyn 控制 Mock 设备

我们将使用 IoT Explorer for Alljoyn 来浏览设备、对象和接口。

启动 IoT Explorer for AllJoyn 应用。该应用应查找以下四种设备：

* DSB Mock 适配器 – Microsoft DSB： 这是 Mock 适配器 DSB
* Mock BACnet 温度传感器 - Microsoft 温度传感器 155：Mock 温度传感器设备
* Mock BACnet 可调光开关 - Microsoft 调光控件 725：Mock 可调光开关设备
* Mock BACnet 开关 - Microsoft 2 X 开关：Mock 开关设备。

![AJx\_Mock1]({{site.baseurl}}/Resources/images/MockAdapter/mock_ajx1.png)

选择 Mock BACnet 开关对象。

![AJx\_Mock2]({{site.baseurl}}/Resources/images/MockAdapter/mock_ajx2.png)

选择 Mock\_BACnet\_Switch 对象。

![AJx\_Mock3]({{site.baseurl}}/Resources/images/MockAdapter/mock_ajx3.png)

  Mock\_BACnet\_Switch 对象的接口视图将列出多个接口。其中的大多数接口都是默认 AllJoyn 接口，例如 Introspectable 接口。选择 com.microsft.DSBMockAdapter.MockBACnetSwitch.MainInter... 接口。

![AJx\_Mock4]({{site.baseurl}}/Resources/images/MockAdapter/mock_ajx4.png)

选择 DeviceReset 方法。

![AJx\_Mock5]({{site.baseurl}}/Resources/images/MockAdapter/mock_ajx5.png)

 在方法输入参数部分中，键入“重置”并按下“调用”。应该会显示状态 OK。

![AJx\_Mock6]({{site.baseurl}}/Resources/images/MockAdapter/mock_ajx6.png)
