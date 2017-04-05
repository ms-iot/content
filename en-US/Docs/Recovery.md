---
layout: docs
title: Windows 10 IoT Core Recovery
description: We describe how to recover IoT Core devices
keyword: windows iot, image creation, recovery, windows iot
permalink: /en-US/Docs/Recovery.htm
lang: en-US
---

# Windows 10 IoT Core Recovery

Device recovery is a process to recover inoperable devices due to incorrect or bad storage state. This is done by booting into a known safe OS or recovery OS and re-flash the storage media.
{% include note.html text="This process does not recover from hardware failures of storage (e.g. catastrophic media failure)" %}

The key elements of recovery process are

* **Safe OS** : Windows provides [Windows Preinstallation Environment (WinPE)](https://msdn.microsoft.com/en-us/windows/hardware/commercialize/manufacture/desktop/winpe-intro) which is a minimal OS with basic graphics support and boots to a command prompt. This is delivered with Windows ADK for x86/AMD64 architectures. For ARM, WinPE can be obtained through Microsoft OEM channel. For certain hardware configurations and storage media types, specific drivers may be required to be added to WinPE to boot successfully. This OS can be configured to launch on boot, the flashing app with a predefined location for the recovery images.
* **Recovery SW** : SW Image used to re-flash the devices
* **Recovery design choice** : Based on the location of the Safe OS and the recovery software, various design choices are available. The design choice is influenced by the hardware available (eg. USB port). These require changes in the BSP to realize the complete functionality.

## Recovery using bootable USB

In this method, we boot the device from USB (with bootable safe OS and the FFU) and flash the device with the FFU present in the USB.

* [WinPE: Create USB bootable drive](https://msdn.microsoft.com/en-us/windows/hardware/commercialize/manufacture/desktop/winpe-create-usb-bootable-drive) provides information on creating a bootable USB drive.
* [Deploy Windows using Full Flash Update(FFU)](https://msdn.microsoft.com/en-us/windows/hardware/commercialize/manufacture/desktop/deploy-windows-using-full-flash-update--ffu) provides information on storing FFU files in USB.

Hardware Requirements:

* Requires device to have an USB port
* May require hardware key (or key combination) to trigger this

BSP Changes:

* Requires changes to respond to HW trigger (key/key combinations) to boot from USB
* Alternative design choice could be to prioritize boot from USB always, this way there is no explicit need to trigger this. However, this also means anytime a bootable USB is detected the device will enter this state.

## Recovery using built-in safe OS

In this method, the device contains a safe OS in a separate partition.
Based on the location of the recovery SW, there can be few options. They are detailed below.

### Recovery SW from USB device/ SD card

In this option, the Recovery SW is picked up from the attached USB device/ SD card.

Hardware Requirements:

* Requires either SD card interface or USB port (mass storage)
* May require hardware key (or key combination) to trigger

BSP Changes:

* Requires changes to respond to HW trigger (key/key combinations) to boot into the safe OS in separate partition
* Drivers for USB device / SD card interfaces may need to be added to Safe OS
* Device layout changes to store safe OS (size can be smaller to accommodate only the safe OS)
* Flashing tool to update only the main OS and Data partitions and skip updating the safe OS partition. This is essential to preserve the safe OS to be able to retry recovery if there is a power loss during a recovery process.

### Recovery SW from recovery partition

This option is like earlier option, with only difference of storing the Recovery SW in the recovery partition itself. The device layout for this approach may differ in the size of the recovery partition (larger to accommodate the Recovery SW and potentially a backup Recovery SW).

A key point to note about this approach is that the Recovery SW present in the device will become very old over time and the OS version after the recovery will fall-off the update train. One way to mitigate this issue is to refresh the Recovery SW image on the device using the BSP update path at a yearly cadence.

### Recovery SW from cloud

In this option, the Recovery SW is downloaded from a predefined cloud service / web location. The cloud service needs to be setup so that it can securely offer the Recovery SW to the device.
To realize this option, the safe OS must support network connectivity, so Wi-Fi drivers need to be added to the safe OS and in addition to that, the Wi-Fi profile in the main OS should be also made available for safe OS to connect to the network.

