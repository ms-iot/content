---
layout: docs
title: Setup DefaultApp
description: Learn how to setup defaultapp in Windows IoT Core
keyword: package, driver install
permalink: /en-US/Docs/SetupDefaultApp.htm
lang: en-US
---

# Setup DefaultApp
Here you'll learn the ways to set your application as the default application. The default application is the one that is launched when the system boots.  

## Runtime options
___
During development phases / experimental phases, you can change the default app by following means.

### Using Windows Device Portal

You can click on **Set as Default App** link next to the app.
![SetupDefaultAppWDP]({{site.baseurl}}/Resources/images/SetupDefaultApp/DefaultAppWDP.png)

### Using the shell

Steps to set the default app using the shell 
1. Connect to the device via [Powershell]({{site.baseurl}}/{{page.lang}}/Docs/PowerShell.htm)
2. List the applications installed using `iotstartup list`
3. Note the appid for the application you want to make as default and set it using `iotstartup headed <appid>`
4. Reboot the device and the device will startup to the selected application

## Build time options
___
For large deployments, you can follow one of the below options

### Using install script
When you deploy your app using the update package, you can set the launchapp variable (`set launchapp=1`) in the AppxConfig.cmd.
See [App Installer]({{site.baseurl}}/{{page.lang}}/Samples/AppInstaller.htm) for more details.

### Using provisioning package
You can specify the LaunchAppAtLogin setting in the ICD during the provisioning package creation.
![SetupDefaultAppICD]({{site.baseurl}}/Resources/images/SetupDefaultApp/DefaultAppICD.png)

