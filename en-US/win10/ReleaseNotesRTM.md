---
layout: default
title: Release Notes
permalink: /en-US/win10/ReleaseNotesRTM.htm
lang: en-US
---

#Release Notes for Windows 10 IoT Core
Build Number 10586. December 2015

&copy; 2015 Microsoft Corporation. All rights reserved

This document provides late-breaking or other information that supplements the documentation included with the Windows 10 IoT Core.

Thank you for downloading Windows 10 IoT Core. Windows 10 IoT Core is the version of Windows 10 intended for development of embedded or dedicated purpose devices and the choice for the Maker community. This package contains the bits and tools needed to install Windows 10 IoT Core on the MinnowBoard Max based on Intel&reg; Atom E38xx series SoC (also referred to as MBM board), the Raspberry PI2 based on the ARM Cortex-A7 based SoC (also referred to as the RPI) and the DragonBoard 410c based on the QualComm Snapdragon™ 400 series processor (also referred to as the Dragon).

##Privacy Statement

The privacy statement for this version of the Windows operating system can be viewed here: [http://go.microsoft.com/fwlink/?LinkId=506737](http://go.microsoft.com/fwlink/?LinkId=506737){:target="_blank"}

You can review linked terms by pasting the forward link into your browser window.

##What's New
* Windows 10 IoT Core Public Release
   * Support for servicing updates
   * Serial support on Raspberry Pi for TX and RX pins
   * Support for Realtek Wi-Fi chipsets (RTL8188EU & RTL8192EU)
   * High performance GPIO driver option with > 100x improvement
   * Support for the QualComm DragonBoard
   * Updated features for Windows Device Portal
   * Secure boot has been enabled
   * Third party pure python libraries can be run on IoT core
   * PWM and ADC chips have been enabled
   * Updated base OS build
   * Bug Fixes

##Release Notes

The default administrator user name and password are hard coded in the Windows 10 IoT Core image. This is a security risk for the device, and it should not be exposed to an open internet connection until the password has been changed.

The MinnowBoard Max will not boot unless the firmware is version .082 or later. The minimum recommended version of the firmware is “MinnowBoard MAX 0.83 32-Bit”. Firmware updates can be downloaded from [http://go.microsoft.com/fwlink/?LinkId=708613](http://go.microsoft.com/fwlink/?LinkId=708613){:target="_blank"}.

The Windows 10 IoT Core image included in this drop supports the peripherals that are exposed on the MinnowBoard MAX board. Subsequently, Intel&reg; will provide support of the full feature set of the Baytrail processors including the Intel Celeron&trade; Processors J1900/N2930/N2807 and Intel Atom&trade; Processors E38XX.

On the DragonBoard, a shutdown command will not power off the board. The system will restart. Please power off the board by disconnecting the power.

Windows 10 UWP projects created with Visual Studio RC are not compatible with the current Visual Studio release. Users should create a new blank UWP project or Background Application (IoT) project and copy their source code into the new project. 

Windows 10 IoT Core is still being ported to the Raspberry PI. The video driver for the Raspberry PI is still under development, and its performance has not yet been optimized. Animated user elements, such as XAML based drop down menus in particular, may display poorly. 

With this release of Windows 10 IoT Core for the Raspberry Pi 2, support for camera peripheral devices is limited. The PiCam device directly connected to the onboard camera bus is not currently supported, as it requires GPU services that are not currently available on the Raspberry Pi because the DirectX driver has not been implemented. Modern USB webcams produce data streams that are very demanding on the USB Host controller.  Even when used with low resolution settings webcams will require additional USB fine tuning and specialized control logic. We are planning to support a number of USB cameras in the near future and will publish specific information on supported devices as soon as possible.

Hardware volume controls for USB microphones and speakers which depend on Windows system to change system volume are currently not supported on Windows 10 IoT Core.

Some USB keyboards and mice may not work on the Raspberry PI2. Use a different keyboard or mouse. A list of validated peripheral devices can be found on the documentation at [http://go.microsoft.com/fwlink/?LinkId=619428](http://go.microsoft.com/fwlink/?LinkId=619428){:target="_blank"}.

On the Raspberry Pi2 the GPIO pin 0 and GPIO pin 1 were available to user mode applications in the April Insider Preview release of version of Windows 10 IoT Core, but are no longer available. Attempting to open these pins with Windows::Devices::Gpio::GpioController::OpenPin() will return HRESULT_FROM_WIN32(ERROR_NOT_FOUND). GPIO pins 0 and 1 are reserved on the Raspberry Pi by the HAT specification (https://github.com/raspberrypi/hats) and are under control of VC firmware. For compliance with this specification, these pins should be left unconnected.


##Known Issues

*	Windows Device Portal may stop working after a day of continuous uptime. (5458435) WORKAROUND: Restart the device.
*	Setting the orientation to “Portrait” may not be honored in a Universal App (3039042) WORKAROUND: None
*	GPIO pin 4 may behave unexpectedly when switching between drive modes (3890679) WORKAROUND: If you need to switch drive modes, use a pin other than GPIO 4
*	The Default startup app may conflict with itself when it is also deployed from Visual Studio (4266059). WORKAROUND: Change the default startup app to an application other than that you wish to deploy.
*	BackgroundMediaPlayer.MessageReceivedFromForeground may crash. (2199869) WORKAROUND: The following line of code may crash: “BackgroundMediaPlayer.MessageReceivedFromForeground += OnMessageReceivedFromForeground;”. To prevent the crash, add this code so that it is executed first “var player = BackgroundMediaPlayer.Current;”
*	A NULL value may be returned by SerialDevice::FromIdAsync() when devices are connected to the top USB port on MinnowBoardMax (2175837) WORKAROUND: Use the bottom USB port.
*	Data breakpoints have been disabled on the Raspberry Pi2 (4266252). WORKAROUND: None at this time
*	The Azure Active Directory Authentication Library may not work on Windows 10 IoT Core (4266261). WORKAROUND: Do not use the Azure Active Directory Authentication Library.
*	A MediaEncodingProfile.CreateWma( Windows.Media.MediaProperties. AudioEncodingQuality.Auto) method call may fail on the Raspberry Pi 2 with the error message No suitable transform was found to encode or decode the content. (Exception from HRESULT: 0xC00D5212). (4510128) WORKAROUND: None.
*	More.com!PAGER::DisplayString may return INVALID_POINTER_READ exception. (1552523) WORKAROUND: None.
*	When deploying a Node.JS project BackgroundTaskHost.exe may fail with an error.(4873190) WORKAROUND: None.
*	The GPIO/I2C/SPI drivers may be disabled when connecting to the DragonBoard with windbg. (4710796) WORKAROUND: None.
*	The Dragonboard BSP has drivers for the headset jack and microphone jack, but it doesn't have either of these jacks on board. (4791855) WORKAROUND: USB headsets cannot be used without manually disabling these devices
*	The SPI on the Dragonboard may ignore the requested speed and always run at 4.8 Mhz. (5055938) WORKAROUND: None.
*	If an application or background task enter a bad state the device may blue screen instead of allowing an opportunity to connect through an SSH session and reconfigure the device. (5098713) WORKAROUND: None.
*	The ICD image build may fail when using the commercial license. (5291899, 5382557) WORKAROUND: See the information at the following link: [http://go.microsoft.com/fwlink/?LinkId=708623](http://go.microsoft.com/fwlink/?LinkId=708623){:target="_blank"}
*	The SiLabs USB-Serial driver may fail to load with an error 31 "Device Parameters\PortName property is not present." (5307602) WORKAROUND: Unplug the device from the USB port and add the following registry key: [HKEY_LOCAL_MACHINE\system\controlset001\enum\usb\VID_10C4&PID_EA60\0001\Device Parameters]" PortName"="COM3"
*	A conflict may result if a webcam and a USB audio adapter or headset are connected to a Raspberry Pi2 at the same time. (5383535) WORKAROUND: Use an analog headset plugged into the onboard audio jack of the Raspberry Pi2.
*	SiLabs USB Serial adapter may return an error indicating that it cannot open handle (ACCESS DENIED) because the device has already been opened by the ZWaveHeadlessAdapterApp. (5385500) WORKAROUND: Use Windows Device Portal to manually remove the ZWaveHeadlessAdapterApp application.
*	If the device name is set to a value longer than 15 characters, it may cause a boot failure. If this occurs the device will need to be reflashed to recover. (5474244) WORKAROUND: Do not use a device name that is longer than 15 characters.

