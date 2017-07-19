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
2. Build the bcm2386 solution (Release or Debug)
    * You can also download the prebuilt binaries from [rpibsp.zip](https://github.com/ms-iot/iot-adk-addonkit/releases/download/RPiBSP/rpibsp.zip) 
3. Launch [IoTCoreShell](https://github.com/ms-iot/iot-adk-addonkit), select arm

    * In ms-iot/bsp project folder, run `tools\binexport.cmd Release (or) Debug C:\RPiBSP` to export the binaries to `C:\RPiBSP` folder. If you are using prebuilt binaries, you can skip this step and unzip the binaries to `C:\RPiBSP`.
    * Run `C:\RPiBSP\build.cmd` to create the cabs in the build output folder (`iot-adk-addonkit\Build\arm\pkgs`)
    * Run `buildpkg all` to process all cab files

{% include note.html text="To build a retail image, you will need to rerun the build.cmd to sign the bsp driver binaries with cross certificates. See IoT Core Manufacturing Guide for detailed instructions." %}

## Intel BSPs

### Bay Trail

[Bay Trail](https://www.intel.com/content/www/us/en/embedded/products/bay-trail/overview.html) drivers are available at [IO Drivers](https://downloadcenter.intel.com/download/25618), [Graphics drivers](https://downloadcenter.intel.com/download/25606)

Steps to create the drivers :

1. Download the drivers
2. Copy the cab files to the build output folder (`iot-adk-addonkit\Build\x86\pkgs`)
3. Launch IoTCoreShell, select x86

    * Run `buildpkg all` to process all cab files

You can also recreate the cab files with the below script, the cab files will be created in the build output folder
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

[Apollo Lake](https://www.intel.com/content/www/us/en/embedded/products/apollo-lake/overview.html) drivers are available at [Apollo Lake BSP](https://www.intel.com/content/www/us/en/embedded/products/apollo-lake/technical-library.html#grouping=3)

### Joule

Joule drivers are available at [Joule BSP](https://downloadcenter.intel.com/download/26797/Windows-10-IoT-Core-Files-for-Intel-Joule-Compute-Module).

Steps to create the drivers :

1. Download the Intel5xx_WinIoT_*_BSP.zip 
2. Copy the Intel5xx folder from the zip file to (`iot-adk-addonkit\Source-x64\BSP\`)
3. Launch IoTCoreShell, select x64

    * Run `buildpkg all` to create all cab files, including the Joule BSP cab files. 
    * Alternatively you can use `buildbsp Intel5xx` to build Joule BSP cabs only. 

The files will be available in the build output folder (`iot-adk-addonkit\Build\x64\pkgs`) 


## Qualcomm BSPs

### DragonBoard 410C

DragonBoard drivers are available at [DragonBoard 410C Software](https://developer.qualcomm.com/hardware/dragonboard-410c/software) under *Windows 10 IoT Core* section.


{% include note.html text="You can copy the BSP cab files to a different folder, say C:\MyBSPs\, and set BSPPKG_DIR=C:\MyBSPs\ in the IoTCoreShell to use these files. You can also modify this setting in the setenv.cmd file" %}

## See also

* [IoT Core Manufacturing Guide](https://msdn.microsoft.com/windows/hardware/commercialize/manufacture/iot/iot-core-manufacturing-guide)
* [Windows ADK IoT Core Add-Ons Overview](https://go.microsoft.com/fwlink/p/?LinkId=735029)
* [IoT Core Add-Ons command-line options](https://msdn.microsoft.com/windows/hardware/commercialize/manufacture/iot/iot-core-adk-addons-command-line-options)
* [IoT Core feature list](https://msdn.microsoft.com/windows/hardware/commercialize/manufacture/iot/iot-core-feature-list)
* [Channel9 Video on Manufacturing Guide](https://channel9.msdn.com/events/Build/2017/B8085)
