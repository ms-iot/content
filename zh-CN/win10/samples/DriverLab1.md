---
layout: default
title: 驱动程序实验 - 打开现有驱动程序的项目
permalink: /zh-CN/win10/samples/DriverLab1.htm
lang: zh-CN
---

##打开现有驱动程序的项目

###在开发计算机上

* 可以在[此处](https://github.com/ms-iot/samples/tree/develop/DriverSamples)找到此示例。
* 在 Visual Studio 的“文件”菜单中，选择“打开”\|“项目”。
* 在“打开项目”对话框中，导航到示例驱动程序所在的文件夹，突出显示扩展名为 SLN 的文件，然后选择“打开”。
    * 在 DriverSamples 文件夹中，你会在 `gpiokmdfdemo\gpiokmdfdemo.sln` 中找到 VS 解决方案。
    * `gpiokmdfdemo` 将生成一个 GPIO 内核模式外围设备驱动程序。
* 在 Visual Studio 中，切换到“解决方案资源管理器”。展开“头文件”和“源文件”节点，并检查所生成文件的内容。你应该会发现，某个驱动程序项目可以实现大多数驱动程序所需的主干代码。


###下一步
[使用 Visual Studio 生成驱动程序]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab2.htm)
