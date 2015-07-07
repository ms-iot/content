---
layout: default
title: Release Notes
permalink: /en-US/win10/ReleaseNotes.htm
lang: en-US
---

#Release Notes for Windows 10 IoT Core Insider Preview
&copy; 2015 Microsoft Corporation. All rights reserved

This document provides late-breaking or other information that supplements the documentation included with the Windows 10 IoT Core Insider Preview.

Thank you for downloading the Windows 10 IoT Core Insider Preview. Windows 10 IoT Core is the version of Windows 10 intended for development of embedded or dedicated purpose devices and the choice for the Maker community. This package contains the bits and tools needed to install a pre-release of Windows 10 IoT Core on the MinnowBoard Max based on Intel Atom E38xx series SoC (also referred to as MBM board) and the Raspberry PI2 based on the ARM Cortex-A7 based SoC (also referred to as the RPI).

##Privacy Statement

The privacy statement for this pre-release version of the Windows operating system can be viewed here: [http://go.microsoft.com/fwlink/?LinkId=506737](http://go.microsoft.com/fwlink/?LinkId=506737){:target="_blank"}

You can review linked terms by pasting the forward link into your browser window.

##What's New
* Windows 10 IoT Core Insider Preview 6/24/2015 Release

   * Updated base OS build (10152.0.fbl_impressive.150618-2341)
   * New FFU Flashing Tool
   * Secure Shell (SSH) server support
   * Audio output on Raspberry Pi 2 (USB-audio and onboard analog output)
   * Web Server (WebB) moved to port 8080 (For Example – http://<device address>:8080)
   * Bug Fixes

##Release Notes

The default administrator user name and password are hard coded in the Windows 10 IoT Core Insider Preview image. This is a security risk for the device, and it should not be exposed to an open internet connection until the password has been changed.

The Windows 10 IoT Core image included in this drop supports the peripherals that are exposed on the MinnowBoard MAX board. Subsequently, IntelÆ will provide support of the full feature set of the Baytrail processors including the IntelÆ CeleronÆ Processors J1900/N2930/N2807 and IntelÆ AtomÆ Processors E38XX.

Windows 10 IoT Core is still being ported to the Raspberry PI. Support for audio input on the RPI is still under development . The video driver for the Raspberry PI is still under development, and it's performance has not yet been optimized. Animated user elements, such as XAML based drop down menus in particular, may display poorly. 

With this release of Windows 10 IoT Core for the Raspberry Pi 2, support for camera peripheral devices is limited. The PiCam device directly connected to the onboard camera bus is not currently supported, as it requires GPU services that are not currently available on the Raspberry Pi because the DirectX driver has not implemented. Modern USB webcams produce data streams that are very demanding on the USB Host controller even when used in low resolution settings which requires fine tuning and specialized control logic. We are planning to support a number of USB cameras in the near future, and will publish specific information on supported devices as soon as possible.

Hardware volume controls for USB microphones and speakers which depend on Windows system to change system volume are currently not supported on Windows 10 IoT Core.

Bluetooth connectivity is not fully implemented on either the MinnowBoard Max or the Raspberry PI2 for this release.

On the Raspberry Pi2 the GPIO pin 0 and GPIO pin 1 were available to usermode applications in the April release of Windows 10 IoT Core Insider Preveiw, but are no longer available. Attempting to open these pins with Windows::Devices::Gpio::GpioController::OpenPin() will return HRESULT_FROM_WIN32(ERROR_NOT_FOUND). GPIO pins 0 and 1 are reserved on the Raspberry Pi by the HAT specification (https://github.com/raspberrypi/hats) and are under control of VC firmware. For compliance with this specification, these pins should be left unconnected.


##Known Issues

* The keyboard input may be lost when switching between multiple apps while debugging. (1304429)
* Some USB keyboards and mice may not work on the Raspberry PI2. (2365290). WORKAROUND: Use a different keyboard or mouse.  A list of validated peripheral devices can be found on the documentation at http://WindowsOnDevices.com (2296724). WORKAROUND: Review the list of validated devices.
* The video output on the MinnowBoard Max may crash after unplugging the HDMI video cable and plugging it back in while the MBM is running. (2096834). WORKAROUND: Leave the HDMI cable plugged in while the MBM is running.
* Setting the orientation to “Portrait” may not be honored in a Universal App (3039042) WORKAROUND: None
* Some animated user elements may be slow to render and slow to respond to user input on the Raspberry Pi. (2735596). WORKAROUND: None.
* After plugging in a Zwave adaptor a bugcheck may occur, usually after several minutes of uptime. (3266675) WORKAROUND: None
* The Default startup app may conflict with itself when deployed also deployed from Visual Studio (1244550). WORKAROUND: Change the default startup app to something else
* Text To Speech APIs for some non-English languages do not work in Windows 10 IoT Core (3024511) WORKAROUND: None.
* Time synchronizes from the network may not occur on the MinnowBoard Max. Raspberry Pi2 running Windows 10 IoT Core may be slow to synchronize the clock to network time after a power cycle. (3283455, 2942694) WORKAROUND: Force a time update with a “w32tm /resync” command.
* When a headed application that uses the IoT Debug Broker is being debugged, an Assert may be triggered when the Debug>Stop menu item is selected. (2385747). WORKAROUND: None.
* GetNetworkUsageAsync may throw a System.UnauthorizedAccessException (1972129). WORKAROUND: None.
* BackgroundService Tasks may be registered as both a headed and a headless tasks. (2455442). WORKAROUND: None.
* System.Diagnostics.Debug.WriteLine may not send to the Output Pane in a Universal Windows Application. (2455800). WORKAROUND: None. .
* The WebB will allow the user to remove the default application which will lead to a bluescreen on boot due to there not being an application to run. (3252594) WORKAROUND: Reflash the SD card.
* The SSH service may crash when issued a “?” parameter to a command (3296951) WORKAROUND: Do not use the “?” parameter.
* The IoT Core Default Application may display two IP addresses for the same adapter. One will be an old/wrong address and the other will be correct. (3303771). WORKAROUND: None.
* On Raspberry Pi, glitches can occur on GPIO pins when switching between certain drive modes with GpioPin.SetDriveMode(). A pin briefly reverts to its default state before taking on the new drive mode. (2938068) WORKAROUND: Call SetDriveMode() once at the beginning of your application.

### MinnowBoardMax Issues
* UART1 flow control/serial handshake defaults to ON and cannot be turned off (2995473). WORKAROUND: Use UART2 instead of UART1.
* The following SerialDevice property values are not supported and will throw an exception if set on UART1 or UART2 (3439146). WORKAROUND: Do not set the following property values.
  * BreakSignalState - True
  * HandShake - XOnXOff, RequestToSendXOnXOff
  * StopBits - OnePointFive
  * IsDataTerminalReadyEnabled - True
  * Parity - Mark
* The SPI driver may return a malformed buffer for SpiDevice.TransferSequential() which includes two extra bytes at the beginning of the buffer. (3076149) WORKAROUND: Use SpiDevice.TransferFullDuplex().
* Enabling GPIO Wake Capability with the BIOS setting *Device Manager -> System Setup -> South Cluster Configuration -> Miscellaneous Configuration -> GPIO Wake Capability : Enabled* will cause all GPIO pins to stop working (1894235). WORKAROUND: Set GPIO Wake Capability to Disabled in the BIOS.
* A USB-Serial device plugged into the top USB port cannot be opened with the Windows.Devices.SerialCommunication.SerialDevice WinRT API. (3305304). WORKAROUND: Plug the device into the bottom USB port.
* Some USB devices may not work correctly when plugged into the top USB port. (2175837). WORKAROUND: Plug the device into the bottom USB port or connect a USB hub.
