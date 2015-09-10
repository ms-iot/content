---
layout: default
title: Release Notes
permalink: /en-US/win10/ReleaseNotes.htm
lang: en-US
---

#Release Notes for Windows 10 IoT Core
Insider Preview Build Number 10531.0
&copy; 2015 Microsoft Corporation. All rights reserved

This document provides late-breaking or other information that supplements the documentation included with the Windows 10 IoT Core Insider Preview.

Thank you for downloading Windows 10 IoT Core Insider Preview. Windows 10 IoT Core is the version of Windows 10 intended for development of embedded or dedicated purpose devices and the choice for the Maker community. This package contains the bits and tools needed to install Windows 10 IoT Core on the MinnowBoard Max based on Intel&reg; Atom E38xx series SoC (also referred to as MBM board) and the Raspberry PI2 based on the ARM Cortex-A7 based SoC (also referred to as the RPI).

##Privacy Statement

The privacy statement for this version of the Windows operating system can be viewed here: [http://go.microsoft.com/fwlink/?LinkId=506737](http://go.microsoft.com/fwlink/?LinkId=506737){:target="_blank"}

You can review the privacy statement by pasting the forward link into your browser window.

##What's New
* Windows 10 IoT Core Insider Preview Sept 25 Release
   * Web Server (WebB) additional features (Change computer name, change password, start processess)
   * Secure boot has been enabled
   * Third party pure python libraries can be run
   * Support for popular PWM and ADC external chips through the easy to use in-box APIs via ADC and PWM providers on Github: [https://github.com/ms-iot/BusProviders](https://github.com/ms-iot/BusProviders)
   * Updated base OS build
   * Bug Fixes

##Release Notes

The MinnowBoard Max will not boot with builds of Windows 10 IoT Core which are later than 10240 unless the firmware is version .082 or later. The minimum recommended version of the firmware is “MinnowBoard MAX 0.82 32-Bit”. Firmware updates can be downloaded from [http://firmware.intel.com/projects/minnowboard-max](http://firmware.intel.com/projects/minnowboard-max).

The default administrator user name and password are hard coded in the Windows 10 IoT Core image. This is a security risk for the device, and it should not be exposed to an open internet connection until the password has been changed.

The Windows 10 IoT Core image included in this drop supports the peripherals that are exposed on the MinnowBoard MAX board. Subsequently, Intel&reg; will provide support of the full feature set of the Baytrail processors including the Intel Celeron&trade; Processors J1900/N2930/N2807 and Intel Atom&trade; Processors E38XX.

Windows 10 UWP projects created with Visual Studio RC are not compatible with the current Visual Studio release. Users should create a new blank UWP project or Background Application (IoT) project and copy their source code into the new project. 

Windows 10 IoT Core is still being ported to the Raspberry PI. The video driver for the Raspberry PI is still under development, and its performance has not yet been optimized. Animated user elements, such as XAML based drop down menus in particular, may display poorly. 

With this release of Windows 10 IoT Core for the Raspberry Pi 2, support for camera peripheral devices is limited. The PiCam device directly connected to the onboard camera bus is not currently supported, as it requires GPU services that are not currently available on the Raspberry Pi because the DirectX driver has not been implemented. Modern USB webcams produce data streams that are very demanding on the USB Host controller.  Even when used with low resolution settings webcams will require additional USB fine tuning and specialized control logic. We are planning to support a number of USB cameras in the near future and will publish specific information on supported devices as soon as possible.

Hardware volume controls for USB microphones and speakers which depend on Windows system to change system volume are currently not supported on Windows 10 IoT Core.

Some USB keyboards and mice may not work on the Raspberry PI2. Use a different keyboard or mouse. A list of validated peripheral devices can be found on the documentation at [http://go.microsoft.com/fwlink/?LinkId=619428](http://go.microsoft.com/fwlink/?LinkId=619428){:target="_blank"}.

On the Raspberry Pi2 the GPIO pin 0 and GPIO pin 1 were available to user mode applications in the April release of version of Windows 10 IoT Core, but are no longer available. Attempting to open these pins with Windows::Devices::Gpio::GpioController::OpenPin() will return HRESULT_FROM_WIN32(ERROR_NOT_FOUND). GPIO pins 0 and 1 are reserved on the Raspberry Pi by the HAT specification (https://github.com/raspberrypi/hats) and are under control of VC firmware. For compliance with this specification, these pins should be left unconnected.


##Known Issues

*	Some USB keyboards and mice may not work on the Raspberry PI2. WORKAROUND: Use a different keyboard or mouse. A list of validated peripheral devices can be found in the documentation at [http://go.microsoft.com/fwlink/?LinkId=619428](http://go.microsoft.com/fwlink/?LinkId=619428){:target="_blank"}
*	Setting the orientation to “Portrait” may not be honored in a Universal App (3039042) WORKAROUND: None
*	Some animated user elements may be slow to render and slow to respond to user input on the Raspberry Pi. (2735596). WORKAROUND: Do not use the animated user elements which perform poorly.
*	GPIO pin 4 may behave unexpectedly when switching between drive modes (2938068) WORKAROUND: If you need to switch drive modes, use a pin other than GPIO 4
*	Once the GPIO wake feature is enabled in the UEFI settings of Device Manager it may not be possible to toggle GPIO outputs or read GPIO values using the GPIO WinRT APIs for pins 0-2 on MBM (1894235). WORKAROUND: Do not enable the GPIO wake feature 
*	The Default startup app may conflict with itself when it is also deployed from Visual Studio (4266059). WORKAROUND: Change the default startup app to an application other than that you wish to deploy.
*	When a headed application that uses the IoT Debug Broker is being debugged, an Assert may be triggered when the Debug>Stop menu item is selected. (2385747). WORKAROUND: None.
*	GetNetworkUsageAsync may throw a System.UnauthorizedAccessException (1972129). WORKAROUND: None.
*	BackgroundService Tasks may be listed as both a headed and a headless tasks. (2455442). WORKAROUND: None.
*	The SPI driver may return a malformed buffer which includes two extra bytes at the beginning of the buffer for WriteRead sequence on the MinnowBoard Max (3076149) WORKAROUND: Compensate for the extra bytes in the code making the call by allocating a buffer that is x-2 bytes in size.
*	The IoT Core Default Application may display two different IP addresses for the same adapter where one is a stale address. (3303771). WORKAROUND: None.
*	UART1 flow control/serial handshake on MBM may default to ON and cannot be turned off (2995473). WORKAROUND: Use UART2 instead for devices without flow control.
*	A NULL value may be returned by SerialDevice::FromIdAsync() when devices are connected to the top USB port on MinnowBoardMax (3305304) WORKAROUND: Use the bottom USB port.
*	Data breakpoints have been disabled on the Raspberry Pi2 (4266252). WORKAROUND: Data breakpoints will be enabled in a future release.
*	The Azure Active Directory Authentication Library may not work on Windows 10 IoT Core (4266261). WORKAROUND: Do not use the Azure Active Directory Authentication Library.
*	The MinnowBoard Max and Raspberry Pi2 may be extremely slow to boot up on the first boot when using some 8GB class 10 SD cards. Slow boot times may be over 15 minutes. Subsequent boots will be much quicker on the affected cards (4405440). WORKAROUND: Do not use the affected cards.
*	The SSH Service may crash when an SSH client does not gracefully close a session.  (3581710, 3602012). WORKAROUND: Let the SSH Service restart in this case. 
*	More.com!PAGER::DisplayString may return INVALID_POINTER_READ exception. (1552523) WORKAROUND: None.
*	MediaEncodingProfile.CreateWma(Windows.Media.MediaProperties.AudioEncodingQuality.Auto) may fail on the Raspberry Pi2 with the error message "No suitable transform was found to encode or decode the content. (Exception from HRESULT: 0xC00D5212)". (3634750) WORKAROUND: None.

