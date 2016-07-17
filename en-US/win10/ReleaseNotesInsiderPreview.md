---
layout: default
title: Release Notes
permalink: /en-US/win10/ReleaseNotesInsiderPreview.htm
lang: en-US
---

# Release Notes for Windows 10 IoT Core
Build Number 14376. July 2016

&copy; 2016 Microsoft Corporation. All rights reserved

This document provides late-breaking or other information that supplements the documentation included with the Windows 10 IoT Core.

Thank you for downloading Windows 10 IoT Core. Windows 10 IoT Core is the version of Windows 10 intended for development of embedded or dedicated purpose devices and the choice for the Maker community. This package contains the bits and tools needed to install Windows 10 IoT Core on the MinnowBoard Max based on Intel&reg; Atom E38xx series SoC (also referred to as MBM board), the Raspberry PI2 based on the ARM Cortex-A7 based SoC (also referred to as the RPI) and the DragonBoard 410c based on the QualComm Snapdragon™ 400 series processor (also referred to as the Dragon).

## Privacy Statement

The privacy statement for this version of the Windows operating system can be viewed here: [http://go.microsoft.com/fwlink/?LinkId=506737](http://go.microsoft.com/fwlink/?LinkId=506737){:target="_blank"}

You can review linked terms by pasting the forward link into your browser window.

## What's new in this build: 
* Updated OS files including core OS bug fixes.
* In headless mode, the OS should no longer display the boot logo after loading.
* Devices should no longer report as virtual in the dashboard.
* Updates to the RPi3 Serial driver to address stability issues with BT.


## Known issues in this build:
* Portions of the Windows Device Portal/WEBB are not functional including Apps, Processes and Bluetooth Pairing.
* It is required to flash/update Minnow Board Max UEFI/Firmware to .92 or latest to avoid issues during boot.
* Speech Recognition and Speech sample apps are failing in some cases when using the Raspberry Pi on IoT Core. 

## Release Notes

#### Sensor Driver conflict in pre-built FFUs
There is a Sensor Driver Conflict in the provided FFUs. The Remote Sensor Framework installs drivers for Compass, Magnetometer, Accelerometer and Gyro. The UWP APIs for accessing these from an application assume just 1 is installed. If you are developing a driver for a physically attached device, the remote driver on the Microsoft provided FFUs will conflict. 
Resolution: The conflicting driver can be removed by connecting to the device via SSH or Powershell and using the tool devcon.exe to remove the remote sensor driver by typing “devcon.exe remove @”ROOT\REMOTESENSORDRIVER*”. The remote sensor driver does not affect OEM created FFUs.

#### Minnowboard Max Boot and Firmware Update
The MinnowBoard Max will not boot unless the firmware is version .082 or later. The minimum recommended version of the firmware is "MinnowBoard MAX 0.83 32-Bit". Firmware updates can be downloaded from [http://go.microsoft.com/fwlink/?LinkId=708613](http://go.microsoft.com/fwlink/?LinkId=708613){:target="_blank"}.

#### Default Administrator User Name and Password
The default administrator user name and password are hard coded in the Windows 10 IoT Core image. This is a security risk for the device, and it should not be exposed to an open internet connection until the password has been changed.

#### Dragonboard 410c Shutdown
On the DragonBoard, a shutdown command will not power off the board. The system will restart. Please power off the board by disconnecting the power.

#### Minnow Board Peripheral Support
The Windows 10 IoT Core image included in this drop supports the peripherals that are exposed on the MinnowBoard MAX board. Subsequently, Intel&reg; will provide support of the full feature set of the Baytrail processors including the Intel Celeron&trade; Processors J1900/N2930/N2807 and Intel Atom&trade; Processors E38XX.

#### Raspberry Pi Video Performance
Video playback performance on the Raspberry Pi platform has not been optimized.  Animated user elements including XAML-based dropdown menus may exhibit less than optimal performance.

#### Raspberry Pi Camera Support
With this release of Windows 10 IoT Core for the Raspberry Pi 2, support for camera peripheral devices is limited. The PiCam device directly connected to the onboard camera bus is not currently supported, as it requires GPU services that are not currently available on the Raspberry Pi because the DirectX driver has not been implemented. Modern USB webcams produce data streams that are very demanding on the USB Host controller.  Even when used with low resolution settings webcams will require additional USB fine tuning and specialized control logic. We are planning to support a number of USB cameras in the near future and will publish specific information on supported devices as soon as possible.

#### Volume Controls
Hardware volume controls for USB microphones and speakers which depend on Windows system to change system volume are currently not supported on Windows 10 IoT Core.

#### USB Keyboards 
Some USB keyboards and mice may not work on IoT Core. Use a different keyboard or mouse. A list of validated peripheral devices can be found on the [documentation here](({{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm){:target="_blank"}.

#### Screen Orientation
Setting the orientation to "Portrait" may not be honored in a Universal App

#### Referencing Adapters with AllJoyn Templates
Attempting to add references to AllJoyn adapter projects may result in errors when using specific SDK versions.  To resolve these errors, change Visual Studio’s target platform to match the current SDK version, then reload the project.

#### Serial Port Usage and Access on RPi2
Raspberry Pi 2 supports the serial transport for communication through the PL011 UART.  This is set by default in kernel debugging scenarios.  An application or device driver can use the PL011 UART to send and receive data with the PL011 device driver turning off the debugger using the following command:  

bcdedit /set debug off

#### <a name="wifidirect"></a>WiFi Direct limitations on IoTCore
1. The IoTCore device has to be the connecting device – it will not work as the advertising device with another device initiating the connection.  
2. Advanced pairing must be used.  The sample app demonstrates how to use the advanced pairing API’s to pair the devices prior to connecting.
3. Not all wireless adapters support WiFi direct. We have tested and validated that the "Realtek RTL8188EU Wireless Lan 802.11n USB 2.0 Network adapter" works, but other adapters may not be supported.
 
#### Non-default drive mode 
On Raspberry Pi and Dragonboard, switching from a non-default drive mode to a different non-default drive mode may produce a glitch on the GPIO pin. WORKAROUND: Set drive mode once at the beginning of the application.

#### Application already running 
The Default startup app may conflict with itself when it is also deployed from Visual Studio. WORKAROUND: Change the default startup app to an application other than that you wish to deploy.

#### BackgroundMediaPlayer.MessageReceivedFromForeground may crash 
The following line of code may crash: "BackgroundMediaPlayer.MessageReceivedFromForeground += OnMessageReceivedFromForeground;". To prevent the crash, add this code so that it is executed first "var player = BackgroundMediaPlayer.Current;"

#### Data breakpoints have been disabled on the Raspberry Pi2  
No workaround at this time

#### Azure Active Directory Authentication Support 
The Azure Active Directory Authentication Library does not work on Windows 10 IoT Core. 

#### Dragon Board and windbg 
The GPIO/I2C/SPI/UART drivers will be disabled when connecting to the DragonBoard with windbg. 

#### Dragon Board headset & microphone jack 
The Dragonboard BSP has drivers for the headset jack and microphone jack, but it doesn't have either of these jacks on board. 

#### Dragonboard SPI runs at 4.8Mhz 
The SPI on the Dragonboard will ignore the requested speed and always run at 4.8 Mhz. 

#### <a name="shellcrashes"></a>Shell Management of Application Crashes
IoT Core’s shell infrastructure monitors APPX-type applications running on the device for crashes, and restarts those applications when crashes occur.  If the restarted applications continue to crash, the shell will employ a __failfast – a system critical process that causes a bugcheck and reboot in an attempt to recover.  Comparable logic and handling is used to background tasks and foreground applications in a headed configuration.   Crash handing and retry logic is captured below:

<pre>
  Software\Microsoft\Windows NT\CurrentVersion\Winlogon\IoTShellExtension\CBTConfig  (or ForegroundAppConfig for headed)
    Qword:"FailureResetIntervalMs" – length of time app has to run successfully to reset failures seen to 0. – default is 0x00000000000493E0 == 5 minutes
    Qword:"BaseRetryDelayMs"  -- wait time coefficient.  Default is 0xa.
    Dword:"MaxFailureCount". Default is 10
    DWord:"FallbackExponentNumerator", default is 31.
    Dword:"FallbackExponentDenominator", default is 20


Fallback_exponent = FallbackExponentNumerator / FallbackExponentDenominator; // default is 1.55

When app crash is detected:
    if time_since_last_crash > failureresetinterval then crashes_seen = 1
    else ++crashes_seen;
    
    if crashes_seen > MaxFailureCount then __failfast;
    else
      delay = (dword) ((float)BaseRetryDelayMs * (crashes_seen ** Fallback_exponent))
      wait for delay and relaunch app
</pre>

#### Raspberry Pi audio and direct memory mapped drivers

On Raspberry Pi, audio via the 3.5mm jack stops working when the direct memory mapped drivers are enabled.

WORKAROUND: After the direct memory mapped drivers have been enabled, run:

    reg add HKEY_LOCAL_MACHINE\SYSTEM\DriverDatabase\DeviceIds\ACPI\BCM2844 /v dmap.inf /t REG_BINARY /d 02ff0100
    reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\enum\ACPI\bcm2844\0 /v ConfigFlags /t REG_DWORD /d 0x20
    devcon restart acpi\bcm2844

Verify that the driver for the PWM device node is `BCM2836 PWM Controller`:

    C:\Data>devcon status acpi\bcm2844
    ACPI\BCM2844\0
        Name: BCM2836 PWM Controller
        Driver is running.
    1 matching device(s) found.

#### Time Synchronization 
If time sync is failing or timing out this may be due to unreachable or a distant time server, the following can be done to add additional or local time servers.

* From a command line on the device (eg. SSH, Powershell)
<pre>w32tm /config /syncfromflags:manual /manualpeerlist:"0.windows.time.com 1.pool.ntp.org 2.something else, ..."</pre>
* You may also make these additions to the registry via a boot script or a custom runtime configuration package included as part of the image creation process if needed.
	* For more details, see:
		* https://msdn.microsoft.com/en-us/library/windows/hardware/mt670641(v=vs.85).aspx 
		* https://blogs.msdn.microsoft.com/iot/2015/12/14/windows-10-iot-core-image-creation/  

#### Starting the FTP Server 
The FTP Server no longer runs by default at start-up 

* To run once: 
	Login with SSH\PS and run this command to start FTP: start ftpd.exe 

* To run on every boot Users should create a scheduler task: 
	Login with SSH\PS and create a scheduler task:       
	schtasks /create /tn "IoTFTPD" /tr ftpd.exe /ru system /sc onstart 
	Schtasks /run /tn “IoTFTPD”