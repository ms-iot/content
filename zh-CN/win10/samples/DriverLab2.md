---
layout: default
title: 驱动程序实验 - 使用 Visual Studio 生成驱动程序
permalink: /zh-cn/win10/samples/DriverLab2.htm
lang: zh-cn
---

#在 Visual Studio 中生成驱动程序

Windows IoT 核心版驱动程序由一个或多个文件组成。其中的一些文件是在安装期间用于帮助的简单文本文件，而其他文件则是在编译源代码期间生成的二进制文件。对于此实验，我们感兴趣的是带有以下扩展名的文件： **SYS** 和 **INF**。在本练习中，你将使用 Visual Studio 为特定的平台编译驱动程序。

##在开发计算机上

* 从“生成”菜单中，单击“`Build Solution(Ctrl+Shift+B)`”。如果你使用 MinnowBoard Max，请确保面向 `x86` 生成驱动程序，或者如果你使用 Raspberry Pi 2，请确保面向 `ARM` 生成驱动程序。

    ![驱动程序设置属性]({{site.baseurl}}/Resources/images/DriverLab/driver-build-option.png)

* 现在，你将会获得构成驱动程序的文件集合。请确认在 `DriverSamples\gpiokmdfdemo\Debug\gpiokmdfdemo\` 文件夹下有驱动程序的 **SYS** 和 **INF** 文件。

        gpiokmdfdemo.inf
        gpiokmdfdemo.sys

* 接下来，将生成 ACPI 表，为了让驱动程序在 Windows IoT Core 设备上能够正常工作将需要此表。

    我们将使用 Microsoft ACPI 源语言编译器 \(`asl.exe`\) 来生成 ACPI 表。ASL 编译器随 WDK 分发，而且可以在 `C:\Program Files (x86)\Windows Kits\10\Tools\x86\ACPIVerify\` 中获取

    ASL 编译器将具有扩展名 **ASL** 的文件作为输入参数。你会在 `DriverSamples\gpiokmdfdemo\asl\` 下的 asl 目录中发现 2 个 **ASL** 文件

    如果要部署到 MinnowBoard Max，则使用 `gpiokmdfdemo.asl`。如果要部署到 Raspberry Pi 2，则使用 `rpi2.asl`。

* 将 **ASL** 文件复制到 `C:\Program Files (x86)\Windows Kits\10\Tools\x86\ACPIVerify\` 目录

* 以**管理员**身份打开命令提示符，并导航到 asl 编译器目录：

        cd "C:\Program Files (x86)\Windows Kits\10\Tools\x86\ACPIVerify"

* 如果你使用 MinnowBoard Max，请键入：

        asl.exe gpiokmdfdemo.asl

    如果你使用 Raspberry Pi 2，请键入：

        asl.exe rpi2.asl

* 将在相同目录 \(`C:\Program Files (x86)\Windows Kits\10\Tools\x86\ACPIVerify\`\) 中生成 `ACPITABL.dat` 文件。验证是否已生成此文件。

在下一部分中，你将使用这些文件（**ACPITABL.dat**、**gpiokmdfdemo.inf** 和 **gpiokmdfdemo.sys**）在 Windows IoT 核心版设备上安装驱动程序。

##下一步

[部署驱动程序并确认安装成功]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab3.htm)
