---
layout: default
title: Release Notes
permalink: /en-US/win10/ReleaseNotes.htm
lang: en-US
---

#Release Notes for Windows 10 IoT Core
&copy; 2015 Microsoft Corporation. All rights reserved

This document provides late-breaking or other information that supplements the documentation included with the Windows 10 IoT Core.

Thank you for downloading Windows 10 IoT Core. Windows 10 IoT Core is the version of Windows 10 intended for development of embedded or dedicated purpose devices and the choice for the Maker community. This package contains the bits and tools needed to install Windows 10 IoT Core on the MinnowBoard Max based on Intel&reg; Atom E38xx series SoC (also referred to as MBM board) and the Raspberry PI2 based on the ARM Cortex-A7 based SoC (also referred to as the RPI).

##Privacy Statement

The privacy statement for this version of the Windows operating system can be viewed here: [http://go.microsoft.com/fwlink/?LinkId=506737](http://go.microsoft.com/fwlink/?LinkId=506737){:target="_blank"}

You can review linked terms by pasting the forward link into your browser window.

##What's New
* Windows 10 IoT Core Public Release
   * Wi-Fi support
   * Bluetooth support
   * Updated base OS build
   * Bug Fixes

##Release Notes

The default administrator user name and password are hard coded in the Windows 10 IoT Core image. This is a security risk for the device, and it should not be exposed to an open internet connection until the password has been changed.

The Windows 10 IoT Core image included in this drop supports the peripherals that are exposed on the MinnowBoard MAX board. Subsequently, Intel&reg; will provide support of the full feature set of the Baytrail processors including the Intel Celeron&trade; Processors J1900/N2930/N2807 and Intel Atom&trade; Processors E38XX.

Windows 10 UWP projects created with Visual Studio RC are not compatible with the current Visual Studio release. Users should create a new blank UWP project or Background Application (IoT) project and copy their source code into the new project. 

Windows 10 IoT Core is still being ported to the Raspberry PI. The video driver for the Raspberry PI is still under development, and its performance has not yet been optimized. Animated user elements, such as XAML based drop down menus in particular, may display poorly. 

With this release of Windows 10 IoT Core for the Raspberry Pi 2, support for camera peripheral devices is limited. The PiCam device directly connected to the onboard camera bus is not currently supported, as it requires GPU services that are not currently available on the Raspberry Pi because the DirectX driver has not been implemented. Modern USB webcams produce data streams that are very demanding on the USB Host controller.  Even when used with low resolution settings webcams will require additional USB fine tuning and specialized control logic. We are planning to support a number of USB cameras in the near future and will publish specific information on supported devices as soon as possible.

Hardware volume controls for USB microphones and speakers which depend on Windows system to change system volume are currently not supported on Windows 10 IoT Core.

Some USB keyboards and mice may not work on the Raspberry PI2. Use a different keyboard or mouse. A list of validated peripheral devices can be found on the documentation at [http://go.microsoft.com/fwlink/?LinkId=619428](http://go.microsoft.com/fwlink/?LinkId=619428){:target="_blank"}.

On the Raspberry Pi2 the GPIO pin 0 and GPIO pin 1 were available to user mode applications in the April release of version of Windows 10 IoT Core, but are no longer available. Attempting to open these pins with Windows::Devices::Gpio::GpioController::OpenPin() will return HRESULT_FROM_WIN32(ERROR_NOT_FOUND). GPIO pins 0 and 1 are reserved on the Raspberry Pi by the HAT specification (https://github.com/raspberrypi/hats) and are under control of VC firmware. For compliance with this specification, these pins should be left unconnected.


##Known Issues

*	The keyboard input to the default boot application may be lost when launching an application via the debugger WORKAROUND: Reboot after debugging if you wish to use the default boot application via the keyboard. (1304429)
*	Some USB keyboards and mice may not work on the Raspberry PI2. WORKAROUND: Use a different keyboard or mouse. A list of validated peripheral devices can be found in the documentation at [http://go.microsoft.com/fwlink/?LinkId=619428](http://go.microsoft.com/fwlink/?LinkId=619428){:target="_blank"}
*	The video output on the MinnowBoard Max may crash after unplugging the HDMI video cable and plugging it back in while the MBM is running. (2096834). WORKAROUND: Leave the HDMI cable plugged in while the MBM is running.
*	Setting the orientation to “Portrait” may not be honored in a Universal App (3039042) WORKAROUND: None
*	Some animated user elements may be slow to render and slow to respond to user input on the Raspberry Pi. (2735596). WORKAROUND: Do not use the animated user elements which perform poorly.
*	GPIO pin 4 may behave unexpectedly when switching between drive modes (2938068) WORKAROUND: If you need to switch drive modes, use a pin other than GPIO 4
*	Once the GPIO wake feature is enabled in the UEFI settings of Device Manager it may not be possible to toggle GPIO outputs or read GPIO values using the GPIO WinRT APIs for pins 0-2 on MBM (1894235). WORKAROUND: Do not enable the GPIO wake feature 
*	The Default startup app may conflict with itself when it is also deployed from Visual Studio (1244550). WORKAROUND: Change the default startup app to an application other than that you wish to deploy.
*	Time synchronizes from the network and may be slow to synchronize the clock after a power cycle. (3283455, 2942694) WORKAROUND: Force a time update with a “w32tm /resync” command.
*	When a headed application that uses the IoT Debug Broker is being debugged, an Assert may be triggered when the Debug>Stop menu item is selected. (2385747). WORKAROUND: None.
*	Clicking an external link in a web browser can cause a foreground app to crash. The crash is due to the browser control attempting to have the OS open a new window or tab which is not supported by IoT Core. (3468443) WORKAROUND: Add the http or https protocol handler to your application so that the calls do not get routed to the OS. 
*	GetNetworkUsageAsync may throw a System.UnauthorizedAccessException (1972129). WORKAROUND: None.
*	BackgroundService Tasks may be listed as both a headed and a headless tasks. (2455442). WORKAROUND: None.
*	The SPI driver may return a malformed buffer which includes two extra bytes at the beginning of the buffer for WriteRead sequence on the MinnowBoard Max (3076149) WORKAROUND: Compensate for the extra bytes in the code making the call by allocating a buffer that is x-2 bytes in size.
*	The IoT Core Default Application may display two different IP addresses for the same adapter where one is a stale address. (3303771). WORKAROUND: None.
*	UART1 flow control/serial handshake on MBM may default to ON and cannot be turned off (2995473). WORKAROUND: Use UART2 instead for devices without flow control.
*	Location (Geolocator.RequestAccessAsync()) may not work as expected. (3359968) WORKAROUND: None.
*	BackgroundMediaPlayer.MessageReceivedFromForeground may crash. (3486027) WORKAROUND: The following line of code may crash: “BackgroundMediaPlayer.MessageReceivedFromForeground += OnMessageReceivedFromForeground;”. To prevent the crash, add this code so that it is executed first “var player = BackgroundMediaPlayer.Current;”
*	A NULL value may be returned by SerialDevice::FromIdAsync() when devices are connected to the top USB port on MinnowBoardMax (2175837) WORKAROUND: Use the bottom USB port.
*	Data breakpoints have been disabled on the Raspberry Pi2 (3370713). WORKAROUND: None at this time
*	The Azure Active Directory Authentication Library may not work on Windows 10 IoT Core (3379181). WORKAROUND: Do not use the Azure Active Directory Authentication Library.
*	The MinnowBoard Max and Raspberry Pi2 may be extremely slow to boot up on the first boot when using some 8GB class 10 SD cards. Slow boot times may be over 15 minutes. Subsequent boots will be much quicker on the affected cards (3416260). WORKAROUND: Do not use the affected cards.
*	The SSH Service may crash when an SSH client does not gracefully close a session.  (3581710, 3602012). WORKAROUND: The SSH Service will restart in this case. 
*	When the device name is longer than 16 characters it may bluescreen while booting with a “CRITICAL_PROCESS_DIED” message (3622767). WORKAROUND: Use less than 16 characters in the device name.
*	USB speakers may not play audio on the Raspberry Pi2 (3627304). WORKAROUND: Disable the analog audio to enable USB audio.
*	MediaEncodingProfile.CreateWma(Windows.Media.MediaProperties.AudioEncodingQuality.Auto) may fail on the Raspberry Pi2 with the error message "No suitable transform was found to encode or decode the content. (Exception from HRESULT: 0xC00D5212)". (3634750) WORKAROUND: None.

