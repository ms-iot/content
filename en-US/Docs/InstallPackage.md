---
layout: docs
title: Create and install a package
description: Learn how to create and install package in Windows IoT Core
keyword: package, driver install
permalink: /en-US/Docs/InstallPackage.htm
lang: en-US
---

# Create and install a package
[Packages](https://msdn.microsoft.com/windows/hardware/commercialize/manufacture/iot/iot-core-manufacturing-guide#Packages) are the logical building blocks of IoT Core. From device drivers to system files, every component must be contained in a package. This is the smallest servicable unit on the device.

## Step 1: Get set up
___

### Install the tools

1. [Windows Assessment and Deployment Kit(Windows ADK)](http://go.microsoft.com/fwlink/?LinkId=526803)
2. [IoT Core ADK Add-Ons](https://github.com/ms-iot/iot-adk-addonkit/)
3. [Windows Driver Kit (WDK)](https://developer.microsoft.com/en-us/windows/hardware/windows-driver-kit)

### Set up your environment

* Edit `\IoT-ADK-AddonKit\Tools\setOEM.cmd` to set the OEM_NAME
* Launch `IoTCoreShell.cmd` ( this one launches in the elevated prompt )
* Select the required architecture in the `Set Environment for Architecture` prompt
* Install test signing certificates using `InstallOEMCerts` . This is required *only once* for the PC.

To create your own image (FFU), [get the tools needed to customize Windows IoT Core](https://msdn.microsoft.com/windows/hardware/commercialize/manufacture/iot/set-up-your-pc-to-customize-iot-core)

## Step 2: Create a new package
___
1. Create a **package definition xml file** (.pkg.xml file), and specify the files and reg keys you want to add. 
      Learn more at [Specifying components in a package](https://msdn.microsoft.com/en-us/library/dn789218) and [Elements and Attributes of a package](https://msdn.microsoft.com/en-us/library/dn756796)

2. Build the package: `buildpkg.cmd filename.pkg.xml`. The .cab file will be created in the build directory `\IoT-ADK-AddonKit\Build\<arch>\pkgs`.

### Create a package with files and reg keys
Below is an example for specifying files and reg keys.
 
{% highlight XML %}
<?xml version="1.0" encoding="utf-8"?>
<Package xmlns="urn:Microsoft.WindowsPhone/PackageSchema.v8.00"
   Owner="OEMName"           OwnerType="OEM"
   ReleaseType="Test"        Platform="PlaformName"
   Component="ComponentName" SubComponent="SubName">
   <Components>
      <OSComponent>
         <Files>
            <File Source="$(_RELEASEDIR)\test_file1.dll"/>
            <File Source="$(_RELEASEDIR)\toBeRenamed.dat"
               DestinationDir="$(runtime.system32)\test" Name="test.dat"/>
         </Files>
         <RegKeys>
            <RegKey KeyName="$(hklm.software)\OEMName\test">
               <RegValue Name="StringValue" Value="Test string" Type="REG_SZ"/>
               <RegValue Name="DWordValue" Value="12AB34CD" Type="REG_DWORD"/>
               <RegValue Name="BinaryValue" Value="12,AB,CD,EF" Type="REG_BINARY"/>
            </RegKey>
            <RegKey KeyName="$(hklm.software)\OEMName\EmptyKey"/>
         </RegKeys>
      </OSComponent>
   </Components>
</Package>
{% endhighlight %}

### Create an Appx package

Use [appx2pkg.cmd tool](https://github.com/ms-iot/iot-adk-addonkit/blob/master/Tools/appx2pkg.cmd) to generate the .pkg.xml file for a given appx file. 

This tool expects the appx dependencies in the sub directory named "dependencies" in the folder containing the appx file. If you require the appx to be installed on the boot, you should also include OEMCustomisation.cmd file to invoke the AppInstall command as shown in [Appx Installation sample]({{site.baseurl}}/{{page.lang}}/Samples/AppInstaller.htm).

See also

* [Sample Appx package](https://github.com/ms-iot/iot-adk-addonkit/blob/develop/Source-arm/Packages/Appx.Main/Appx.Main.pkg.xml) 
* [Lab 1b: Add an app to your image](https://msdn.microsoft.com/windows/hardware/commercialize/manufacture/iot/deploy-your-app-with-a-standard-board)


### Create a driver package

The driver package contains the references (InfSource) to the Inf file for the driver and also lists all the files referenced in the Inf file. You can author the driver .pkg.xml file manually or use [inf2pkg.cmd tool](https://github.com/ms-iot/iot-adk-addonkit/blob/master/Tools/inf2pkg.cmd) that generates package xml based on the input inf file.

[`inf2cab.cmd` tool](https://github.com/ms-iot/iot-adk-addonkit/blob/master/Tools/inf2cab.cmd) creates the package xml file and also builds the cab file directly by invoking `buildpkg.cmd` internally.

{% include note.html text="Windows IoT Core supports Universal Inf only" %}

See also

* [Sample Driver Package](https://github.com/ms-iot/iot-adk-addonkit/blob/develop/Source-arm/BSP/CustomRpi2/Packages/CustomRPi2.GPIO/CustomRPi2.GPIO.pkg.xml) 

## Step 3: Install on device
---

* Connect to the device ( [using SSH]({{site.baseurl}}/{{page.lang}}/Docs/SSH) or [using Powershell]({{site.baseurl}}/{{page.lang}}/Docs/powershell) )
* Copy the <filename>.cab file to the device to a directory say C:\OemInstall
* Initiate staging of the package using `applyupdate -stage C:\OemInstall\<filename>.cab`. Note that this step is be repeated for each package, when you have multiple packages to install.
* Commit the packages using `applyupdate -commit`.

The device will reboot into the update OS (showing gears) to install the packages and will reboot again to main OS. This process can take a few minutes.

