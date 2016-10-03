---
layout: docs
title: Setup a default app
description: Learn how to setup defaultapp in Windows IoT Core
keyword: package, driver install
permalink: /en-US/Docs/SetupDefaultApp.htm
lang: en-US
---

# Setup a default app
Here you'll learn the ways to set your application as the default application. The default application is the one that is launched when the system boots.  

## Runtime options
___
During development / experimental phases, you can change the default app by following means.

### Using Windows Device Portal

You can click on **Set as Default App** link next to the app.
![SetupDefaultAppWDP]({{site.baseurl}}/Resources/images/SetupDefaultApp/DefaultAppWDP.png)

### Using the shell

Steps to set the default app using the shell 

1. Connect to the device via [Powershell]({{site.baseurl}}/{{page.lang}}/Docs/PowerShell)

2. List the applications installed using `iotstartup list`

3. Note the appid for the application you want to make as default and set it using `iotstartup add headed <appid>`. For headless app, you should use `iotstartup add headless <appid>`.


## Build time options
___
For large deployments, you can follow one of the below options

### Using install script
When you deploy your app using the update package, you can set the launchapp variable (`set launchapp=1`) in the AppxConfig.cmd.
See [App Installer]({{site.baseurl}}/{{page.lang}}/Samples/AppInstaller) for more details.

### Using provisioning package
You can specify the LaunchAppAtLogin setting in the ICD during the provisioning package creation.
![SetupDefaultAppICD]({{site.baseurl}}/Resources/images/SetupDefaultApp/DefaultAppICD.png)


## How to configure "Home" key
___

Windows 10 IoT Anniversary Update (1607) provides shell support for bringing the default application window to the foreground when another application is currently running.

To enable this behaviour, the following registry key must be added with the virtual key mapping

   `HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\IoTShellExtension\HotKeys`

The virtual key mapping consists of a unique, but descriptively named QWORD registry key with a value that maps a virtual key and its modifier to the “Home” action.  The QWORD value is defined as follows:

	Bit [63-32], [31-20]	: Reserved for future use.  Must be 0.
	Bit [19 - 16] 		: Modifier Key. Possible values are 0x0=No Modifier, Alt=0x1, Ctrl=0x2, Shift=0x4
	Bit [15 - 0] 		: Virtual Key Code.  

See [Virtual Key Code](https://msdn.microsoft.com/library/windows/desktop/dd375731(v=vs.85).aspx) for the key code values.


For example, to make the “Left Windows” key (VK_LWIN) swap back to the default application add the following QWORD registry key:

`HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\IoTShellExtension\HotKeys`

`“VK_LWIN”        QWORD    0x00000000 0000005B`


It is also possible to add additional hot keys to perform the same function.  For example, to allow both the Left and Right Windows keys swap back to the default application add two entries to the registry:

`HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\IoTShellExtension\HotKeys`

`“VK_LWIN”        QWORD    0x00000000 0000005B`

`“VK_RWIN”        QWORD    0x00000000 0000005C`

See [Settings.HotKey sample package](https://github.com/ms-iot/iot-adk-addonkit/blob/master/Common/Packages/Settings.HotKey/Settings.HotKey.pkg.xml)
