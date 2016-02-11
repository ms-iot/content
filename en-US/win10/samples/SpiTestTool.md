---
layout: default
title: SpiTestTool
permalink: /en-US/win10/samples/SpiTestTool.htm
lang: en-US
---

## SpiTestTool Sample

{% include VerifiedVersion.md %}

[View the code on Github](https://github.com/ms-iot/samples/blob/develop/SpiTestTool/main.cpp)

SpiTestTool is a utility for interacting with SPI devices on the command
line. SpiTestTool is written in C++/CX and shows how to consume WinRT components
from command line applications. The resulting tool is a useful debugging aid.

### Usage

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

Example session:

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

### Building and running the sample

1. Clone the [samples](https://github.com/ms-iot/samples)
   repository to your local machine.
1. Open `SpiTestTool\SpiTestTool.sln` in Visual Studio
1. Select the target architecture.
   - Select `ARM` for Raspberry Pi
   - Select `x86` for MinnowBoardMax
1. Go to `Build -> Build Solution`
1. Copy `SpiTestTool.exe` from the build output folder to your device.
1. SSH into your device and run `SpiTestTool.exe` (with appropriate command
   line parameters, of course)

Creating a C++/CX command line program is documented in the
[I2cTestTool sample](I2cTestTool.htm).