---
layout: default
title: Alljoyn Mock 适配器教程
permalink: /zh-CN/win10/samples/MockAdapterTutorial.htm
lang: zh-CN
---

##Alljoyn Mock 适配器示例

[在 Github 上获取代码](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AlljoynMockAdapter/MockAdapter.zip?raw=true)

本教程将演示 AllJoyn 设备系统网桥 \(DSB\) 公开和控制 mock BACnet 设备的功能。

## 先决条件

1. 运行 Windows 10 核心版 10240+ 的 Raspberry Pi2
2. 具有 Windows 10 的电脑或便携式计算机 • Windows 10 预览版 – 版本 10240+
3. AllJoyn 资源管理器 \(AJX\)

  * [AllJoynExplorer\_1.0.0.2.zip](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoynExplorer_1.0.0.2.zip?raw=true){:target="_blank"} - 此 zip 包含 AllJoyn 资源管理器 AppX 捆绑包。
  * [AllJoyn\_Explorer\_Setup\_Guide\_v1.0.pdf](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_Setup_Guide_v1.0.pdf?raw=true){:target="_blank"} - 有关安装和启动 AllJoyn 资源管理器的手册。
  * [AllJoyn\_Explorer\_User\_Guide\_v1.0.pdf](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_User_Guide_v1.0.pdf?raw=true){:target="_blank"} - 此 pdf 包含有关如何使用 AllJoyn 资源管理器的文档

## 设置 Raspberry Pi2

1. 将你的 Raspberry Pi2 连接到 LAN
2. 接通电源以启动 Raspberry Pi2
3. 验证电脑是否可以访问带有 Windows IoT Core Watcher 的 Raspberry Pi2

## 在 Visual Studio 中运行 Mock BACnet 适配器

1. 将[此处](https://github.com/ms-iot/samples-private/blob/rtm/AllJoyn/AllJoynMockAdapter/MockAdapter.zip?raw=true)的 MockAdapter.zip 文件下载到你的本地计算机上的某一位置
2. 导航到下载的 zip 文件所在的文件夹。右键单击该文件，然后单击“全部解压缩...”以解压缩到所选的文件夹。
3. 导航到解压缩的文件夹，然后在 Visual Studio 中打开 MockAdapter.sln 解决方案文件。
4. 在 Visual Studio 中打开该解决方案后，导航到解决方案资源管理器，并右键单击 HeadlessAdapterApp 项目。选择“设置为启动项目”。

![set\_startup]({{site.baseurl}}/Resources/images/AllJoyn/mockadapter_vs.png)

5. 	在主菜单栏中，依次选择“调试”-\>“HeadlessAdapterApp 属性...”
6.	按照[设置远程调试和部署应用]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#cpp)的说明进行操作

## 通过 Alljoyn 资源管理器控制 Mock 设备

我们将使用 AllJoyn 资源管理器 \(AJX\) 来导航设备、对象和接口。

启动 AlljoynExplorer。AJX 应查找以下四种设备：

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



