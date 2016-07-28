---
layout: sample  
title: App installer
description: Learn how to install AppX's onto your IoT Core device
keyword: Windows 10 IoT Core, AppX, install
permalink: /en-US/Samples/AppInstaller.htm
samplelink: https://github.com/ms-iot/samples/tree/develop/AppInstall
lang: en-US
---  

# App installer

You can find the source code for this sample on our GitHub [here](https://github.com/ms-iot/samples/tree/develop/AppInstall).

To install your appx on device please do the following:

1. Edit `AppxConfig.cmd`
	- `set AppxName =` your appx's file name (Name only. No need for .appx extension)
	- `set certslist =` your appx's certificate's name. (Name only. No need for .cer extension. You can delimit mutliple certificates with a space.)
	- `set dependencylist =` your appx's dependency names. (Name only. No need for .cer extension. You can delimit mutliple certificates with a space.)
	- `set forceinstall=` **0** if you want to install only newer versions and **1** if you want to force install (uninstalls existing version and installs). Default is **0**
    - `set launchapp=` **1** if you want to set the app as default app and launch , **0** if you just want to install only. Default is **1**	

3. Place your files in the following directories:
	- `c:\AppInstall`: Your Appx, Dependency Appx(s), Certificate(s), all .cmd files in this directory except OEMCustomization.cmd
	- `c:\windows\system32`: OemCustomization.cmd
		
    You can do this by either:    
    - Wrapping the binaries in an OEM Package and include it when you create the image with ICD/Imggen. See .pkg.xml file.
	- Manually copy the files over to disk.
    
4. Restart the device and your appx will be automatically installed on boot.
