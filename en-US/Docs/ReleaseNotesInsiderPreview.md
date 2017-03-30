---
layout: default
title: Release Notes
permalink: /en-US/Docs/ReleaseNotesInsiderPreview.htm
lang: en-US
---

# Release Notes for Windows 10 IoT Core
Build Number 15051. March 2017

&copy; 2017 Microsoft Corporation. All rights reserved

This document provides late-breaking or other information that supplements the documentation included with the Windows 10 IoT Core.

Thank you for downloading Windows 10 IoT Core. Windows 10 IoT Core is the version of Windows 10 intended for development of embedded or dedicated purpose devices and the choice for the Maker community. The packages within this release contain tools and content needed to install Windows 10 IoT Core on Minnowboard Max platform based on Intel Atom processers, Raspberry Pi 2/3 based on Broadcom 2836/2837, and Dragonboard 410c based on Qualcomm Snapdragon 400 series processors.


## Privacy Statement

The privacy statement for this version of the Windows operating system can be viewed here: [http://go.microsoft.com/fwlink/?LinkId=506737](http://go.microsoft.com/fwlink/?LinkId=506737){:target="_blank"}

You can review linked terms by pasting the forward link into your browser window.

## What's new in this build: 
* Fixes to improve reliability
* Fix issue that prevented the kernel debugger from attaching to RPI devices.


## Known issues in this build:
* BluetoothLE paired devices may throw and exception and fail to function properly
* Raspberry PI images may crash on their first boot. Consecutive boots start up correctly
* When updating the IoT Default App may be uninstalled
* Network connectivity failures in MinnowBoard Max (MBM) firmware version 0.93. (Fixed in firmware version 0.94.) 
* F5 driver deployment from Visual Studio does not work on IoT Core
* Joule - Debugger will time out on a breakpoint when using C++.



## Cortana Instructions and Known Issues 
### To try Cortana: 
* Please check “Start Cortana on Boot” on Device Settings of Windows Device Portal and restart the device.  
* Navigate to Device Settings on top right of default application, click ‘Cortana & Search Settings’, this will launch the consent page for Cortana. After you click ‘sure’ to accept the consent, you are all set for Cortana. 
* When you want to check your reminder, or traffic near you, you will be prompted to sign in with MSA. Please sign in so that you will have full experience Cortana.  

### You need to get one microphone and one speaker connected with your device.  
* On the Device Settings page of Windows Device Portal, check if your microphone and speaker is the one displayed against Speakers and Microphone. Click the Refresh button and make sure the correct peripherals are displayed.  
* Adjust the volume for both to be in the range 40-70%. (Please make sure Microphone is not 0.0)  
* Please sign in with your MSA credentials when it is prompted. MSA is what you use to sign in to Microsoft services such as Windows, Office, Outlook.com, OneDrive, Skype, Xbox, Cortana and more. An MSA enables Cortana to be a smart and personal assistant, and leverages user information to provide a compelling and useful experience. 

### Here is the hardware that we recommend:  
* Microphone: Microsoft LifeCam HD 3000, Blue Snowball iCE Condenser Microphone, Cardioid, Sound Tech CM-1000USB Table Top Conference Meeting Microphone 
* Speaker: Logitech S150 USB Speakers 

### Questions you can ask: 
* What is the traffic to my home? 
* What song is this? 
* How’s the weather? 
* Tell me a joke. 
 
### How to exit Cortana 
* Say “Hey, Cortana” and then say “Cancel” 

### Not supported in IoT Cortana: 
* Music playback 
* Calendar 
* Alarm 
* Timer 

## IoT Core general known issues and work arounds

### For Raspberry Pi

#### Raspberry Pi Display Resolution if monitor is disconnected 
The Raspberry Pi may not maintain Display Resolution if monitor is disconnected. The EDID of the monitor is used to set the resolution of the system when one is connected.  
When disconnected, the Raspberry Pi firmware defaults to what is in the config.txt in the root of the SD card. 

#### Raspberry Pi Video Performance 
Video playback performance on the Raspberry Pi platform is not optimized.  Animated user elements including XAML-based dropdown menus may exhibit less than optimal performance. 
 
#### Raspberry Pi Camera Support 
Support for camera peripheral devices is limited. The PiCam device directly connected to the onboard camera bus is not supported due to limitations in the platform to support D3D Modern USB webcams produce data streams that are very demanding on the USB Host controller.  Even when used with low resolution settings webcams will require additional USB fine tuning and specialized control logic. 

#### Raspberry Pi3 Bluetooth support 
The Raspberry Pi3 built-in Bluetooth driver only supports low bandwidth devices (7910553) 

#### Serial Port Usage and Access on RPi2 
Raspberry Pi 2 supports the serial transport for communication through the PL011 UART.  This is set by default in kernel debugging scenarios.  An application or device driver can use the PL011 UART to send and receive data with the PL011 device driver turning off the debugger using the following command:
bcedit /set debug off 

#### Data breakpoints have been disabled on the Raspberry Pi2
No workaround at this time.

#### Disabling the onboard adapters for Raspberry Pi 3
The Raspberry Pi 3 has onboard Bluetooth which must be disabled to use a different dongle to disable to onboard Bluetooth, open a telnet/ssh session and run: 
reg add hklm\system\controlset001\services\BtwSerialH5Bus /v Start /t REG_DWORD /d 4 
You may disable WiFi with the following command: 
reg add hklm\system\controlset001\services\bcmsdh43xx /v Start /t REG_DWORD /d 4 
 

### For Dragon Board

#### Dragonboard 410c Shutdown
On the DragonBoard, a shutdown command will not power off the board. The system will restart. Please power off the board by disconnecting the power.

#### Dragon Board and windbg
The GPIO/I2C/SPI/UART drivers will be disabled when connecting to the DragonBoard with windbg.

#### Dragon Board headset & microphone jack
The Dragonboard BSP has drivers for the headset jack and microphone jack, but it doesn't have either of these jacks on board.  

#### Dragonboard SPI runs at 4.8Mhz
The SPI on the Dragonboard will ignore the requested speed and always run at 4.8 Mhz.  

#### Dragonboard Connected Standby 
Connected Standby is not enabled on the Qualcomm Dragonboard by default.  To enable Connected Standby on DragonBoard the following registry key needs to be set to “1” 

HKLM\System\Controlset001\Control\Power\CsEnabled=DWORD:1 

Note that not all platforms have support for CS.  This may not work on all platforms.    



### For Joule 
#### Firmware Update Required 
The Intel Joule requires a firmware update to properly load Windows IoT Core. Please follow the install process detailed at https://developer.microsoft.com/en-us/windows/iot/Docs/GetStarted/joule/GetStartedStep1.htm to use IoT Core with Joule. 

#### Graphics Support Limited 
A graphics driver to enable hardware acceleration is not included in the Joule image. The system will use software rendering which will impact performance and CPU utilization. 

### For MinnowBoard
#### Minnowboard Max Boot and Firmware Update 
The MinnowBoard Max will not boot unless the firmware is version .092 or later. The minimum recommended version of the firmware is “MinnowBoard MAX 0.92 32-Bit”. Firmware updates can be downloaded from  
http://go.microsoft.com/fwlink/?LinkId=708613.

#### Minnow Board Peripheral Support
The Windows 10 IoT Core image included in this drop supports the peripherals that are exposed on the MinnowBoard MAX board. Subsequently, Intel&reg; will provide support of the full feature set of the Baytrail processors including the Intel Celeron&trade; Processors J1900/N2930/N2807 and Intel Atom&trade; Processors E38XX.


### For All Platforms 

#### Mouse Pointer disappears while debugging 
In some cases, the mouse pointer is not visible after deploying or debugging apps with Visual Studio, the mouse pointer should reappear if you change focus using the keyboard (Tab).


#### Server Applications with SoftAP
When using the SoftAP clients will not be able to access content exposed by UAP apps.  
To expose UAP applications via SoftAP the following changes must be made from the console on the device:  

reg add hklm\system\currentcontrolset\services\mpssvc\parameters /v IoTInboundLoopbackPolicy /t REG_DWORD /d 1 
checknetisolation loopbackexempt -a -n=<AppID for SoftAP App> 
checknetisolation loopbackexempt -a -n=<AppID for Additional App>  

For example:  checknetisolation loopbackexempt -a -n=IoTOnboardingTask-uwp_1w720vyc4ccym 
Reboot 


#### Sensor Driver conflict in pre-built FFUs 
There is a Sensor Driver Conflict in the provided FFUs. The Remote Sensor Framework installs drivers for Compass, Magnetometer, Accelerometer and Gyro. The UWP APIs for accessing these from an application assume just 1 is installed. If you are developing a driver for a physically attached device, the remote driver on the Microsoft provided FFUs will conflict.

Resolution: The conflicting driver can be removed by connecting to the device via SSH or Powershell and using the tool devcon.exe to remove the remote sensor driver by typing “devcon.exe remove @”ROOT\REMOTESENSORDRIVER*”. The remote sensor driver does not affect OEM created FFUs.


#### Default Administrator User Name and Password
The default administrator user name and password are hard coded in the Windows 10 IoT Core image. This is a security risk for the device, and it should not be exposed to an open internet connection until the password has been changed.

#### Volume Controls
Hardware volume controls for USB microphones and speakers which depend on Windows system to change system volume are currently not supported on Windows 10 IoT Core. 

#### USB Keyboards  
Some USB keyboards and mice may not work on IoT Core. Use a different keyboard or mouse. A list of validated peripheral devices can be found on the [documentation here]({{site.baseurl}}/{{page.lang}}/Docs/HardwareCompatList).


#### Screen Orientation
Setting the orientation to “Portrait” may not be honored in a Universal App.

#### Referencing Adapters with AllJoyn Templates
Attempting to add references to AllJoyn adapter projects may result in errors when using specific SDK versions.  To resolve these errors, change Visual Studio’s target platform to match the current SDK version, then reload the project.

#### WiFi Direct limitations on IoTCore
* The IoTCore device has to be the connecting device – it will not work as the advertising device with another device initiating the connection.   
* Advanced pairing must be used.  The sample app demonstrates how to use the advanced pairing API’s to pair the devices prior to connecting. 
* Not all wireless adapters support WiFi direct. We have tested and validated that the “Realtek RTL8188EU Wireless Lan 802.11n USB 2.0 Network adapter” works, but other adapters may not be supported. 


#### Non-default drive mode
On Raspberry Pi and Dragonboard, switching from a non-default drive mode to a different non-default drive mode may produce a glitch on the GPIO pin. WORKAROUND: Set drive mode once at the beginning of the application.

#### Application already running
The Default startup app may conflict with itself when it is also deployed from Visual Studio. WORKAROUND: Change the default startup app to an application other than that you wish to deploy. 

#### BackgroundMediaPlayer.MessageReceivedFromForeground may crash
The following line of code may crash: “BackgroundMediaPlayer.MessageReceivedFromForeground += OnMessageReceivedFromForeground;”. To prevent the crash, add this code so that it is executed first “var player = BackgroundMediaPlayer.Current;” 

#### Azure Active Directory Authentication Support
The Azure Active Directory Authentication Library does not work on Windows 10 IoT Core.  

#### Shell Management of Application Crashes
IoT Core’s shell infrastructure monitors APPX-type applications running on the device for crashes, and restarts those applications when crashes occur.  If the restarted applications continue to crash, the shell will employ a __failfast – a system critical process that causes a bugcheck and reboot in an attempt to recover.  Comparable logic and handling is used to background tasks and foreground applications in a headed configuration.   Crash handing and retry logic is captured below:

Software\Microsoft\Windows NT\CurrentVersion\Winlogon\IoTShellExtension\CBTConfig  (or ForegroundAppConfig for headed) 
Qword:"FailureResetIntervalMs" – length of time app has to run successfully to reset failures seen to 0. – default is 0x00000000000493E0 == 5 minutes 
Qword:"BaseRetryDelayMs"  -- wait time coefficient.  Default is 0xa. 
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


#### Time Synchronization  
If time sync is failing or timing out this may be due to unreachable or a distant time server, the following can be done to add additional or local time servers. 

1) From a command line on the device (eg. SSH, Powershell) 
w32tm /config /syncfromflags:manual /manualpeerlist:"0.windows.time.com 1.pool.ntp.org 2.something else, ..." 

2) You may also make these additions to the registry via a boot script or a custom runtime configuration package included as part of the image creation process if needed. 
For more details, see: 

https://msdn.microsoft.com/en-us/library/windows/hardware/mt670641(v=vs.85).aspx  

https://blogs.msdn.microsoft.com/iot/2015/12/14/windows-10-iot-core-image-creation/   

### Starting the FTP Server 
The FTP Server no longer runs by default at start-up 

To run once: 
Login with SSH\PS and run this command to start FTP:  
start ftpd.exe 

To run on every boot Users should create a scheduler task: 
Login with SSH\PS and create a scheduler task: 
schtasks /create /tn "IoTFTPD" /tr ftpd.exe /ru system /sc onstart 
Schtasks /run /tn “IoTFTPD”