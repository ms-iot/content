---
layout: default
title: Release Notes
permalink: /zh-CN/win10/ReleaseNotes.htm
lang: zh-CN
---

#Release Notes for Windows 10 IoT Core Insider Preview
&copy; 2015 Microsoft Corporation. All rights reserved

This document provides late-breaking or other information that supplements the documentation included with the Windows 10 IoT Core Insider Preview.

Thank you for downloading the Windows 10 IoT Core Insider Preview.  Windows 10 IoT Core is the version of Windows 10 intended for development of
embedded or dedicated purpose devices and the choice for the Maker community. This package contains the bits and tools needed to install a pre-release of
Windows 10 IoT Core on the MinnowBoard Max based on Intel Atom E38xx series SoC (also referred to as MBM board) and the Raspberry PI2 based on
the ARM Cortex-A7 based SoC (also referred to as the RPI).

##Privacy Statement

The privacy statement for this pre-release version of the Windows operating system can be viewed here: [http://go.microsoft.com/fwlink/?LinkId=506737](http://go.microsoft.com/fwlink/?LinkId=506737){:target="_blank"}

You can review linked terms by pasting the forward link into your browser window.

##What's New
* Windows 10 IoT Core Insider Preview 5/12 Release

    * Updated base OS build
    * Updated login-based web interface for device setup, startup application configuration, and feedback capabilities.

##Release Notes

The default administrator user name and password are hard coded in the Windows 10 IoT Core Insider Preview image. This is a security risk for the
device, and it should not be exposed to an open internet connection until the password has been changed.

The Windows 10 IoT Core image included in this drop supports the peripherals that are exposed on the MinnowBoard MAX board. Subsequently, IntelÆ
will provide support of the full feature set of the Baytrail processors including the IntelÆ CeleronÆ Processors J1900/N2930/N2807 and IntelÆ AtomÆ Processors E38XX.

Windows 10 IoT Core is still being ported to the Raspberry PI. Support for audio input and output on the RPI is still under development and does
not exist at all in this release. The video driver for the Raspberry PI is still under development, and it's performance has not yet been optimized.
Animated user elements, such as XAML based drop down menus, in particular may display poorly.

Bluetooth connectivity is not fully implemented on either the MinnowBoard Max or the Raspberry PI2 for this release.

Wireless networking is not fully implemented on the Raspberry PI2 for this release.

##Known Issues

* The keyboard input may be lost when switching between multiple apps that are running at the same time. (1304429)
* Some USB keyboards and mice may not work on the Raspberry PI2. (2365290). WORKAROUND: Use a different keyboard or mouse. This issue has been seen with a few specific models and is suspected to be a power issue with the USB port. This may resolve by using a powered USB hub.
* XAML WebView may not accept keyboard input (2477598). WORKAROUND: Use a different control to receive input.
* When using the tab key to navigate between TextBoxes, a tab character may incorrectly be inserted into the last TextBox (2504096). WORKAROUND: Manually delete the tab character.
* On a Raspberry PI, a single keyboard keystroke may either not be recognized or may insert multiple characters. (2573557). WORKAROUND: None
* Some Webcam drivers are missing. (2187095). WORKAROUND: None
* Logitech USB speakers may not produce audio output on an MBM (2460925). WORKAROUND: Use an alternate audio output device.
* A list of validated peripheral devices can be found on the documentation at [http://WindowsOnDevices.com](http://WindowsOnDevices.com) (2296724). WORKAROUND: Review the list of validated devices.
* Common Raspberry PI WiFi adapters are not supported in the Windows 10 IoT Core Insider Preview image. (2310140). WORKAROUND: Use an ethernet connection for networking.
* Wireless network may not reconnect after a power cycle on the Raspberry PI (2367736). WORKAROUND: Re-establish the WiFi connection.
* WiFi/Bluetooth USB combo device may not work on the Raspberry PI or MinnowBoard Max (2293778). WORKAROUND: Use another hardware set.
* USB based ethernet adapters may intermittently stall on the Raspberry PI (2459108). WORKAROUND: Use the on-board ethernet adapter.
* Adding enterprise EAP WiFi profile may fail with EAP_E_EAPHOST_METHOD_NOT_INSTALLED (0x80420011) error on the MinnowBoard Max (1416414).WORKAROUND: none.
* The MinnowBoard Max does not support all monitors, particularly some square monitors. (2222035, 2062893). WORKAROUND: Use a different monitor.
* The video output on the MinnowBoard Max may crash after unplugging the HDMI video cable and plugging it back in while the MBM is running. (2096834, 2368396). WORKAROUND: Leave the HDMI cable plugged in while the MBM is running.
* Touch screen input may not work on the MinnowBoard Max when connected to a touch screen monitor. (2171550). WORKAROUND: Use another form of input.
* Videos may freeze when disconnecting or connecting a USB audio adapter on the MinnowBoard Max (2534527). WORKAROUND: Do not play video when connecting or disconnecting a USB audio adapter.
* Some animated user elements may be slow to render and slow to respond to user input. (2643284). WORKAROUND: None.
* The IoT Core Default Application may not display properly on a 1280 x 1024 monitor (2536713). WORKAROUND: Use a monitor with a different resolution.
* DebounceTimeout in the GPIO API surface may not function (1874956). WORKAROUND: None
* Once the GPIO wake feature is enabled in the UEFI settings of Device Manager it may not be possible to toggle any GPIO outputs or read GPIO values using the GPIO WinRT APIs(1894235). WORKAROUND: Do not enable the GPIO wake feature in Device Manager.
* The GPIO interrupt handler can drift out of sync with the actual state of the GPIO pins when a button is attached or when the interrupts occur at a faster rate than the system can process them.. WORKAROUND: Reduce the frequency of the interrupts.
* The GPIO interrupts may become spurious when the drive mode of a GPIO pin is changed. (2116871). WORKAROUND: None
* The system may lock up after feeding a 100KHz square wave to the GPIO input pin with interrupt handler attached (2148240). WORKAROUND: None
* Visual Studio and the IoT ShellExt may conflict when a startup application is deployed. (1244550). WORKAROUND: None
* Sihost may disappear when F5 is debug breakpoint is encountered before the deployed app finishes starting up. (1244514). WORKAROUND: Terminate DefaultApp.exe and restart sihost.
* ICD may fail to generate a bootable Windows 10 IoT Core image for NUC. (1415629). WORKAROUND: None
* A black screen may be seen during boot because the default app is failing on slow class 4 SD cards. (2462306). WORKAROUND: Do not use a class 4 SD card.
* The bootup splash screen may be seen again when the device is shutdown. (2502991). WORKAROUND: None
* The current build of the Windows 10 IoT Core Insider Preview boots twice before starting the IoT Core Default App. (2504963). WORKAROUND: This is expected behavior.
* Windows 10 IoT Core may cause a network broadcast storm when it is initialized using the onboard NIC on the Raspberry PI. (2322325). WORKAROUND: Intialize the device while connected to a network where this will not cause interference.
* Bluetooth Low Energy Gatt Interface Does Not Work On Windows 10 IoT Core Insider Preview (2382852). WORKAROUND:	None. Bluetooth is not fully implemented in this release.
* Recognizers for Inking may not be available in this release of Windows 10 IoT Core (2552947). WORKAROUND: None.
* Loading an Ink control may cause the application to crash (2221749). WORKAROUND: None
* SPI Sample may not work the first time it is deployed to the MinnowBoard Max (2524399). WORKAROUND: Re-deploy the sample to the MBM.
* SPI Sequential Transfer may be malformed at 100KHz on the MinnowBoard Max (1666855). WORKAROUND: Use full duplex with 100 KHz transfer.
* Visual Studio may not debug two startup tasks concurrently (2202979). WORKAROUND: None
* Stopping a background task in Visual Studio may cause a bug check (2366900). WORKAROUND: Do not stop a background task in Visual Studio.
* When a headed application that uses the IoT Debug Broker is being debugged, an Assert may be triggered when the Debug>Stop menu item is selected. (2385747). WORKAROUND: None.
* Opening the package.json file may cause Visual Studio to crash (2457310). WORKAROUND: None.
* Windows.UI.Popups.MessageDialog does not work on this release of Windows 10 IoT Core (1214773). WORKAROUND: None.
* GetNetworkUsageAsync may throw a System.UnauthorizedAccessException (1972129). WORKAROUND: None.
* Windows.Devices.SerialCommunications may not enumerate devices from WinRT UAP App. (2266901). WORKAROUND: None.
* This release of Windows 10 IoT Core does not contain WinRT Windows.System.Profile.HardwareIdentification. (2311696). WORKAROUND: None.
* When Telent is used to send the 'devcon status usb' command on a MinnowBoard Max, it may return error number 28. (1097931). WORKAROUND: None
* The CS signal on SPI may be initially be low until the first data transfer occurs on a MinnowBoard MAx. (1682876). WORKAROUND: The signal should be normal after the first data transfer.
* The Web interface may fail to remove APPX package on the Raspberry PI2. (1910993). WORKAROUND: Use Powershell to remove the APPX package.
* The clipboard may return a "class not recognized" exception. (2221417). WORKAROUND:	None
* Audio task may fail to start in a Universal Windows Application. (2221634). WORKAROUND: None
* Background Transfer may fail with an exception in a Universal Windows Application. (2221657). WORKAROUND: None.
* The Windows 10 IoT Core Insider Preview image is missing the fileinfo.sys. (2230476). WORKAROUND: None.
* After changing the name of a Windows 10 IoT Core device it may not connect using the name as a parameter. (2300166). WORKAROUND:	Connect using the device's IP address.
* I2C restart may use the incorrect CLK level. (2392063). WORKAROUND: None.
* BackgroundService Tasks may be registered as both a headed and a headless tasks. (2455442). WORKAROUND: None.
* System.Diagnostics.Debug.WriteLine may not send to the Output Pane in a Universal Windows Application. (2455800). WORKAROUND: None.
* A faulty CBT may cause a bugcheck in sihost.exe (2478779). WORKAROUND:	None.
* A blank Background Task may throw an error when they are initially deployed. (2551584). WORKAROUND: None.
* When the IoT Core Default Application is connected to a WiFi network, it may display <empty> for the IP address value even though the device has connected successfully. (2640478). WORKAROUND:	None.
