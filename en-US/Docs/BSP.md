---
layout: docs
title: Windows 10 IoT Core BSP
description: We describe how to get BSPs for IoT Core
keyword: windows iot, image creation, bsp, windows iot
permalink: /en-US/Docs/BSP.htm
lang: en-US
---

# Windows 10 IoT Core BSPs
Board Support Packages (BSP) is a collection of drivers/settings required to run IoT Core on a hardware platform.
These are provided by the hardware vendors/silicon vendors.
Below you can find information on where you can get the BSPs for the supported platforms.

## Raspberry Pi BSP
Raspberry drivers are available at [ms-iot/bsp](https://github.com/ms-iot/bsp).

Steps to create the drivers :

1. Check out ms-iot/bsp project
2. Build the bcm2386 solution
3. In IoTCoreShell ( See [ms-iot/iot-adk-addonkit](https://github.com/ms-iot/iot-adk-addonkit) )

    * in bsp project folder, run `tools\binexport.cmd Release/Debug` to export the binaries
    * run `buildbsp Rpi2` to create the cabs in the build output folder

You can also download the prebuilt binaries available in the release : [rpibsp.zip](https://github.com/ms-iot/iot-adk-addonkit/releases/download/RPiBSP/rpibsp.zip)

## Intel BSPs

### Bay Trail

Bay Trail drivers are available at [IO Drivers](https://downloadcenter.intel.com/download/25618), [Graphics drivers](https://downloadcenter.intel.com/download/25606)

Steps to create the drivers :

1. Download the drivers 
2. Copy the cab files from the zip to a directory , say C:\IntelBSP\BYT
3. In IoTCoreShell 

    * `set BSPPKG_DIR=C:\IntelBSP\BYT` to specify the cab files location
    * `buildfm bsp MBM` (or) you can call `buildpkg all` to process the cab files

You can also recreate the cab files with the below script, 
(set the DIR_ROOT value appropriately)


    @echo off

    setlocal
    set DIR_ROOT=D:\IntelBSP\BYT\333669_002_bsp_windows_10_iot_core-32_bit
    set OEM_NAME=Intel
    set SIGNFILES=None
    call inf2cab.cmd %DIR_ROOT%\Drivers\x86\GPIO\iaiogpio.inf BYT.GPIO
    call inf2cab.cmd %DIR_ROOT%\Drivers\x86\HSUART\iaiouart.inf BYT.UART
    call inf2cab.cmd %DIR_ROOT%\Drivers\x86\I2C\iaioi2c.inf BYT.I2C
    call inf2cab.cmd %DIR_ROOT%\Drivers\x86\SPI\iaiospi.inf BYT.SPI
    
    set DIR_ROOT=D:\IntelBSP\BYT\INTEL_HDGraphics_Win10IoTCore_v36.19.0_1227_PV
    call inf2cab.cmd %DIR_ROOT%\emgd_gfx_36_19_0_1227\igdlh.inf GFX.Build1227
    endlocal


### Apollo Lake

Apollo Lake drivers are available at [Apollo Lake BSP](http://www.intel.com/content/www/us/en/embedded/products/apollo-lake/mr2-best-known-configuration.html) 

### Joule

Joule drivers are available at [Joule Drivers](https://downloadcenter.intel.com/)

## Qualcomm BSPs

Contact [Qualcomm](mailto:pahwang@qti.qualcomm.com) for the BSPs.





