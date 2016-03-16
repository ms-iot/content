---
layout: default
title: SpiTestTool
permalink: /zh-cn/win10/samples/SpiTestTool.htm
lang: zh-cn
---

## SpiTestTool 示例

{% include VerifiedVersion.md %}

[在 Github 上查看代码](https://github.com/ms-iot/samples/blob/develop/SpiTestTool/main.cpp)

SpiTestTool 是用于在命令行上与 SPI 设备交互的实用工具。SpiTestTool 是采用 C++/CX 编写的，演示了如何从命令行应用程序使用 WinRT 组件。生成的工具是非常有用的调试辅助工具。

### 用法

    SpiTestTool: Command line SPI testing utility
    Usage: SpiTestTool.exe [-list] [-n FriendlyName] [-c ChipSelectLine] [-m Mode] [-d DataBitLength] [-f ClockFrequency]

      -list           List available SPI controllers and exit.
      FriendlyName    The friendly name of the SPI controller over which
                      you wish to communicate. This parameter is
                      optional and defaults to the first enumerated SPI
                      controller.
      ChipSelectLine  The chip select line to use. This parameter is
                      optional and defaults to 0.
      Mode            The SPI mode to use (0-3). This parameter is
                      optional and defaults to Mode 0.
      DataBitLength   The data bit length to use. This parameter is optional
                      and defaults to 8.
      ClockFrequency  The SPI clock frequency to use. This parameter is
                      optional and defaults to 4Mhz.

    Examples:
      Connect to the first SPI controller found with default settings
      (ChipSelectLine=0, Mode=0, DataBitLength=8, Frequency=4Mhz):
        SpiTestTool.exe

      List available SPI controllers and exit:
        SpiTestTool.exe -list

      Connect to SPI1 in mode 2, with default speed (4Mhz) and chip
      select line (0):
        SpiTestTool.exe -n SPI1 -m 2

      Connect to chip select 1 on SPI1 in mode 2 at 1Mhz:
        SpiTestTool.exe -c 1 -n SPI1 -m 2 -f 1000000

    Commands:
    > write { 00 11 22 .. FF }         Write bytes to device
    > read N                           Read N bytes
    > writeread { 00 11 .. FF } N      Write bytes then read N bytes
    > fullduplex { 00 11 .. FF }       Perform full duplex transfer
    > info                             Display device information
    > help                             Display this help message
    > quit                             Quit

示例会话：

      spitesttool.exe
      > info
              DeviceId: \\?\ACPI#MSFT8000#1#{dcde6af9-6610-4285-828f-caaf78c424cc}\SPI0
        ChipSelectLine: 0
                  Mode: 0
         DataBitLength: 8
        ClockFrequency: 4000000
      > write {1 2 3 4}
      > read 8
       0 ff ff ff ff ff ff ff
      > writeread {aa bb} 4
       bb ff ff ff
      > fullduplex {aa bb cc dd}
       0 aa b7 99
      > q

### 生成和运行示例

1. 将[示例](https://github.com/ms-iot/samples)存储库克隆到本地计算机。
1. 在 Visual Studio 中打开 `SpiTestTool\SpiTestTool.sln`
1. 选择目标体系结构。
   - 为 Raspberry Pi 选择 `ARM`
   - 为 MinnowBoardMax 选择 `x86`
1. 转到 `Build -> Build Solution`
1. 将 `SpiTestTool.exe` 从生成输出文件夹复制到你的设备。
1. 通过 SSH 复制到你的设备并运行 `SpiTestTool.exe`（当然，需使用相应的命令行参数）

创建 C++/CX 命令行程序记录在 [I2cTestTool 示例](I2cTestTool.htm)中。