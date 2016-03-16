---
layout: default
title: 映像创建过程和相关工具
permalink: /zh-CN/win10/ImageCreation.htm
lang: zh-CN
---

##映像创建过程和相关工具

###系统安装

我们将使用命令行工具 `imggen` 创建自定义的 Windows IoT 核心版映像。此工具作为 Windows 评估和部署 \(ADK\) 工具包的一部分进行提供。

###安装 Windows 10 IoT 核心版程序包

装载 Windows 10 IoT 核心版程序包 \[ISO\]（TODO：添加用于 ISO 的安装位置）并安装 `Windows_10_IoT_Core_Packages.msi`。

###使用 imggen 创建 MBM 映像

你可以使用 `imggen` 自定义自己的映像。该工具支持以下功能：通过 Spkgs 向你的映像添加驱动程序、可执行文件和二进制文件来进行自定义。这非常类似于立即完成针对 Windows Phone 操作系统的程序包创建的相关步骤。若要抢先查看此工作原理，需使用我们之前复制的 MBM 示例，然后进行尝试。

注意： 从你的计算机中删除任何 USB 可移动存储设备。当可能有任何便携式 U 盘或 SD 卡读卡器连接到你的系统时，映像处理工具将暂停尝试卸载文件系统。若要避免此情况，请立即拔出这些设备。稍后，你可以将它们重新插入系统。

* 打开提升的部署和映像处理工具环境命令提示符，并向你的路径中添加手机工具目录。

        set path=%PATH%;%KITSROOT%\tools\bin\i386

* 设置 BSP 文件使用的 AKROOT 变量

        set AKROOT=%KITSROOT%

* 为你的 FFU 创建一个输出目录（和日志文件）

        md C:\FFU

* 导航到你的输出目录

        cd /d C:\FFU

* 运行 imggen 以创建你的 FFU

        imggen.cmd flash.FFU "%KITSROOT%\OEMInputSamples\MBM\ProductionOEMInput.xml" "%KITSROOT%\MSPackages" x86

* 等待映像创建完成。通常，完成此过程大约需要花费 10-15 分钟的时间。注意，完成此过程可能会多花费一些时间，因为需显示一些警告。

这将在你的 FFU 文件夹中生成一个 Flash.ffu 文件。你可以在[此处]({{site.baseurl}}/{{page.lang}}/GetStarted.htm)找到有关如何将一个带有 Windows IoT 核心版映像的 FFU 部署到 SD 卡的说明（请参阅“将 Windows IoT 核心版映像放在你的微型 SD 卡上”部分）。
