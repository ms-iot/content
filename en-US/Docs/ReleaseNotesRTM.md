--- 
layout: default
title: Release Notes
permalink: /en-US/Docs/ReleaseNotesRTM.htm
lang: en-US
---

# Release Notes for Windows 10 IoT Core
Build Number 15063. April 2017

[Windows 10 IoT Core]({{site.baseurl}}/{{page.lang}}/Explore/IoTCore) enables development of embedded or dedicated-purpose devices and is the choice for the OEMs and developers building Windows solutions for small devices.

This document provides information that supplements other content and documentation for this release of Windows 10 IoT Core.

The packages within this release contain tools and components needed to install Windows 10 IoT Core on Minnowboard Max platform based on Intel Atom processers, Raspberry Pi 2 based on ARM Cortex A7, and Dragonboard 410c based on Qualcomm Snapdragon 400 series processors.   

[Other platforms and processors]({{site.baseurl}}/{{page.lang}}/Explore/deviceoptions ) may be available from partners.

## Privacy Statement

The privacy statement for this version of the Windows operating system can be viewed [here](http://go.microsoft.com/fwlink/?LinkId=506737).

## What's New
* Windows 10 IoT Core Public Release. Please visit [What's New]({{site.baseurl}}/{{page.lang}}/docs/WhatsNew) for detailed information
   * Additional Silicon Support
      * Verified support for Windows 10 IoT Core on Intel Joule, Intel Pentium N4200, Intel Celeron N3350, upcoming Atom x5-E39xx processors (formerly Apollo Lake) and Raspberry Pi 3 SOMs.
      * Toradex has enabled support for their Colibri T30 SOM using the NVIDIA Tegra 3. 
      * Allwinner has enabled support for their Pine 64 and Banana Pi devices using the Allwinner A64 SoC. 
   * Discovering your Remote Devices - No special software is needed to discover your devices that are signed in with your Microsoft Account.
   * New UWP APIs And controls for vibration, brightness, modern connected standby, power management, battery charge  and NFC (w/o HCE). 
   * New busses and capabilities for ARM PCIe, USB function mode, Wi-Fi Direct and  GPIO interrupt counting API. 
   * New Embedded features on Reset/Recovery, On-SOC PWM and Automatic USB provisioning 
   * Improved Tools - VS Code, improved Node.js and Python support, New Windows Device Portal and IoT Dashboard features, VS 2017 support.
   * Cortana on Windows IoT Core - Cortana is now available on Windows 10 IoT Core. Ask Cortana a question.
   * IoT Dashboard Improvements - New features and stability bug fixes
      * Windows Insider Preview builds for Raspberry Pi and Minnowboard 
      * Connecting device using Windows IoT Remote Client 
      * Ipv6 addresses in discovering devices 
      * Uploading device logs while submitting feedback
   *  New high precision GPIO APIs -  New APIs (Windows.Devices.Gpio.GpioInterruptBuffer) for precise and efficient measurement of pulse widths using GPIO interrupts.  GPIO providers include new Interrupt Buffer interface to allow for high precision interrupt timing for applications like rotary encoders and distance measuring devices
   * Azure Device Management Support - OEMs can use the Windows IoT Azure DM client library to add device management capabilities to their Azure IoT hub connected devices.
   * Device Guard for IoT - Device builders can now fully lock down IoT devices and get advanced malware protection against new and unknown malware variants.  This can be done by specifying signing authorities for permissible applications and drivers that run on the device while disallowing execution of unknown or untrusted code.  This means improved security against malware and zero day attacks. 
   * Other updates include: 
      * Improved Update Support 
      * Azure Gateway SDK support 
      * USB drive based auto-provisioning 
      * Device Portal redesign 
      * 64-bit images now supports up to 16,384 MB of memory 
      * WinRT Vibration APIs 
      * Improved language support 
   * Miscellaneous  
      * A change has been made to the default BCD settings to prevent devices from attempting to boot to recovery mode when recovery mode does not exist. 
      * IOT_POWER_SETTINGS feature now includes powercfg.exe. This is available for all architectures (ARM32, x86 and x64). 
      * Changes were made to Applyupdate.exe to add the blockrebooton/blockrebootoff flags 
      * The Class Extensions for Hardware Notification (hwnclx) and USB Function (usbfnclx) have been added to the default IoT Core images

## Known Issues

### Raspberry Pi  

#### Raspberry Pi Display Resolution if monitor is disconnected 
The Raspberry Pi may not maintain Display Resolution if monitor is disconnected. The EDID of the monitor is used to set the resolution of the system when one is connected.  
When disconnected, the Raspberry Pi firmware defaults to what is in the config.txt in the root of the SD card. 

#### Raspberry Pi Video Performance 
Video playback performance on the Raspberry Pi platform has not been optimized.  Animated user elements including XAML-based dropdown menus may exhibit less than optimal performance. 

#### Raspberry Pi Camera Support 
Windows 10 IoT Core support for camera peripheral devices with Raspberry Pi devices is limited. The PiCam device directly connected to the onboard camera bus is not currently supported, as it requires GPU services that are not currently available on the Raspberry Pi because the DirectX driver is not implemented. Modern USB webcams produce data streams that are very demanding on the USB Host controller.  Even when used with low resolution settings webcams will require additional USB fine tuning and specialized control logic.  

#### Raspberry Pi 3 Bluetooth support 
The Raspberry Pi3 built-in Bluetooth driver only supports low bandwidth devices  

#### Serial Port Usage and Access on Raspberry Pi 2 
Raspberry Pi 2 supports the serial transport for communication through the PL011 UART.  This is set by default in kernel debugging scenarios.  An application or device driver can use the PL011 UART to send and receive data with the PL011 device driver turning off the debugger using the following command:   
`bcedit /set debug off` 
 
### Dragon Board 

#### Dragonboard 410c Shutdown 
On the DragonBoard, a shutdown command will not power off the board. The system will restart. Please power off the board by disconnecting the power. 

#### Dragon Board headset & microphone jack  
The Dragonboard BSP has drivers for the headset jack and microphone jack, but it doesn't have either of these jacks on board.  

#### Dragonboard SPI runs at lock speed  
The SPI on the Dragonboard will ignore the requested speed and always run at a preconfigured speed.  

#### Dragonboard Connected Standby 
Connected Standby is not enabled on the Qualcomm Dragonboard by default.  To enable Connected Standby on DragonBoard the following registry key needs to be set to “1” 
<br>
`HKLM\System\Controlset001\Control\Power\CsEnabled=DWORD:1`
<br>
Note that not all platforms have support for CS, so this may not work on other platforms.    

#### Vibration API may not function on some Qualcomm platforms 
The suggested workaround is to add the following registry key: 
<br>
`[HKEY_LOCAL_MACHINE\SYSTEM\controlset001\services\hwnhaptics]` 
<br>
`"EnableOemSecurity"=dword:00000001 `
<br>
For confirmation / verification on an existing image connect with SSH or PowerShell and run the following command: 
<br>
`reg add HKEY_LOCAL_MACHINE\SYSTEM\controlset001\services\hwnhaptics /t REG_DWORD /v EnableOemSecurity /d 1 `

### MinnowBoard  

#### Minnowboard Max Firmware Update 
The MinnowBoard Max will not boot unless the firmware is version .092 or later.  
There may be network connectivity failures in MinnowBoard Max (MBM) firmware version 0.93.   The issue is fixed in firmware version 0.94.) 
The minimum recommended version of the firmware is “MinnowBoard MAX 0.94 32-bit”. Firmware updates can be downloaded from [here](http://go.microsoft.com/fwlink/?LinkId=708613).
  
 
### All Platforms 

#### Mouse Pointer disappears while debugging 
In some cases, the mouse pointer is not visible after deploying or debugging apps with Visual Studio, the mouse pointer should reappear if you change focus using the keyboard (Tab)  

#### Server Applications with SoftAP  
When using the SoftAP clients will not be able to access content exposed by UAP apps.  
To expose UAP applications via SoftAP the following changes must be made from the console on the device :  
<br>
`reg add hklm\system\currentcontrolset\services\mpssvc\parameters /v IoTInboundLoopbackPolicy /t REG_DWORD /d 1 `
<br>
`checknetisolation loopbackexempt -a -n=<AppID for SoftAP App>`
<br>
`checknetisolation loopbackexempt -a -n=<AppID for Additional App> `
<br>
`For example:  checknetisolation loopbackexempt -a -n=IoTOnboardingTask-uwp_1w720vyc4ccym`
<br>
`Reboot`

#### Sensor Driver conflict in pre-built FFUs 
There is a Sensor Driver Conflict in the provided FFUs. The Remote Sensor Framework installs drivers for Compass, Magnetometer, Accelerometer and Gyro. The UWP APIs for accessing these from an application assume just 1 is installed. If you are developing a driver for a physically attached device, the remote driver on the Microsoft provided FFUs will conflict.  
Resolution: The conflicting driver can be removed by connecting to the device via SSH or PowerShell and using the tool devcon.exe to remove the remote sensor driver by typing “devcon.exe remove @”ROOT\REMOTESENSORDRIVER*”. The remote sensor driver does not affect OEM created FFUs. 
 
#### Default Administrator User Name and Password 
The default administrator user name and password are hard coded in the Windows 10 IoT Core image. This is a security risk for the device, and it should not be exposed to an open internet connection until the password has been changed. 
 
#### Volume Controls 
Hardware volume controls for USB microphones and speakers which depend on Windows system to change system volume are currently not supported on Windows 10 IoT Core. 
 
#### USB Keyboards  
Some USB keyboards and mice may not work on IoT Core. Use a different keyboard or mouse. A list of validated peripheral devices can be found [here]({{site.baseurl}}/{{page.lang}}/docs/HardwareCompatList).  
 
#### Screen Orientation 
Setting the orientation to “Portrait” may not be honored in a Universal App 
 
#### Referencing Adapters with AllJoyn Templates 
Attempting to add references to AllJoyn adapter projects may result in errors when using specific SDK versions.  To resolve these errors, change Visual Studio’s target platform to match the current SDK version, then reload the project. 
 
#### Wi-Fi Direct limitations on IoT Core 
 * The IoT Core device must be the connecting device – it will not work as the advertising device with another device initiating the connection.   
 * Advanced pairing must be used.  The sample app demonstrates how to use the advanced pairing API’s to pair the devices prior to connecting. 
 * Not all wireless adapters support Wi-Fi Direct. We have tested and validated that the “Realtek RTL8188EU Wireless Lan 802.11n USB 2.0 Network adapter” works, but other adapters may not be supported. 


#### Non-default drive mode  
On Raspberry Pi and Dragonboard, switching from a non-default drive mode to a different non-default drive mode may produce a glitch on the GPIO pin. WORKAROUND: Set drive mode once at the beginning of the application. 
 
#### Application already running  
The Default startup app may conflict with itself when it is also deployed from Visual Studio. WORKAROUND: Change the default startup app to an application other than that you wish to deploy. 
 
#### BackgroundMediaPlayer.MessageReceivedFromForeground may crash  
The following line of code may crash: `BackgroundMediaPlayer.MessageReceivedFromForeground += OnMessageReceivedFromForeground;`.
<br>
To prevent the crash, add this code so that it is executed first `var player = BackgroundMediaPlayer.Current;` 
 
#### Azure Active Directory Authentication Support  
The Azure Active Directory Authentication Library does not work on Windows 10 IoT Core.  
 
#### Shell Management of Application Crashes 
IoT Core’s shell infrastructure monitors APPX-type applications running on the device for crashes, and restarts those applications when crashes occur.  If the restarted applications continue to crash, the shell will employ a __failfast – a system critical process that causes a bug check and reboot in an attempt to recover.  Comparable logic and handling is used to background tasks and foreground applications in a headed configuration.   

Crash handing and retry logic is captured below: 

Software\Microsoft\Windows NT\CurrentVersion\Winlogon\IoTShellExtension\CBTConfig  (or ForegroundAppConfig for headed) 
* Qword:"FailureResetIntervalMs" – length of time app has to run successfully to reset failures seen to 0. – default is 0x00000000000493E0 == 5 minutes. 
* Qword:"BaseRetryDelayMs"  -- wait time coefficient.  Default is 0xa.
* Dword:"MaxFailureCount". Default is 10.
* DWord:"FallbackExponentNumerator", default is 31.
* Dword:"FallbackExponentDenominator", default is 20.
 
{% highlight CS %}
Fallback_exponent = FallbackExponentNumerator / FallbackExponentDenominator;
// default is 1.55
When app crash is detected:
    if time_since_last_crash > failureresetinterval then crashes_seen = 1
    else ++crashes_seen;

if crashes_seen > MaxFailureCount then __failfast;

else

delay = (dword) ((float)BaseRetryDelayMs * (crashes_seen ** Fallback_exponent))
// wait for delay and relaunch app
{% endhighlight %}
 
#### Time Synchronization  
If time sync is failing or timing out this may be due to unreachable or a distant time server, the following can be done to add additional or local time servers. 
 
* From a command line on the device (eg. SSH, PowerShell) 
w32tm /config /syncfromflags:manual /manualpeerlist:"0.windows.time.com 1.pool.ntp.org 2.something else, ..." 
* You may also make these additions to the registry via a boot script or a custom runtime configuration package included as part of the image creation process if needed. 
For more details, see: 
* [Add a file and a registry setting to an image](https://msdn.microsoft.com/en-us/library/windows/hardware/mt670641(v=vs.85).aspx)
* [Windows 10 IoT Core Image Creation](https://blogs.msdn.microsoft.com/iot/2015/12/14/windows-10-iot-core-image-creation/)

#### Starting the FTP Server 
The FTP Server no longer runs by default at start-up 
<br>
To run once: 
`Login with SSH\PS`
Run this command to start FTP:  
`start ftpd.exe` 
  
To run on every boot users should create a scheduler task. 

    Login with SSH\PS and create a scheduler task:       
    schtasks /create /tn "IoTFTPD" /tr ftpd.exe /ru system /sc onstart 
    schtasks /run /tn “IoTFTPD” 

## Copyright Information 

© Microsoft. All rights reserved. 
 
This document is provided “as-is”.  Information and views expressed in this document, including URL and other Internet Web site references may change without notice. 

Some examples depicted herein are provided for illustration only and are fictitious.  No real association or connection is intended or should be inferred.  

This document does not provide any legal rights to any intellectual property in any Microsoft product.  This document may be used for internal, references purposes. 
  
Microsoft makes no warranties, express or implied.  

Please refer to Microsoft Trademarks for a list of trademarked products. 

All other trademarks are property of their respective owners.  

UPnP™ is a certification mark of the UPnP™ Implementers Corporation. 

Bluetooth® is a trademark owned by Bluetooth SIG, Inc. USA and licensed to Microsoft Corporation. 

Intel is a registered trademark of Intel Corporation. 

Itanium is a registered trademark of Intel Corporation.
 
Portions of this software are based on MCSA Mosaic, developed by the National Center for Supercomputing Applications at the University of Illinois at Urbana-Champaign, distributed under a licensing agreement with Spyglass, Inc. 

This product contains security software licensed from RSA Data Security, Inc. 
 