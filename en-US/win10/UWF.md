---
layout: default
title: Using the Unified Write Filter for Windows 10 IoT Core
permalink: /en-US/win10/UWF.htm
lang: en-US
---
# Using the Unified Write Filter on Windows 10 IoT Core

The Unified Write Filter (UWF) is a feature to protect physical storage media from data writes. UWF intercepts all write attempts to a protected volume and redirects those write attempts to a virtual overlay. This improves the reliability and stability of your device and reduces the wear on write-sensitive media, such as flash memory media like solid-state drives.

More information on UWF is available [here](https://msdn.microsoft.com/en-us/windows/hardware/mt572001).

## How to Install UWF on a System Running Windows 10 IoT Core
*             On your development system, download the [UWF Installation package](http://go.microsoft.com/fwlink/?LinkId=708427).
*             Double click on `UWF.MSI`. When the installation is complete, the x86 and ARM packages will be extracted to `C:\Program Files (x86)\Microsoft IoT\UWF`. Launch [Powershell](http://ms-iot.github.io/content/en-US/win10/samples/PowerShell.htm) or [ssh](http://ms-iot.github.io/content/en-US/win10/samples/SSH.htm) and access your device running Windows 10 IoT Core.
* From Powershell or ssh, do the following:
  *           Create a temporary folder on the target machine (e.g. ```C:\UWFTemp```).
  *           Based on your target machine architecture, copy either the x86 or ARM UWF packages (including the lang pack) from your developer machine to `C:\UWFTemp`.
  *           Run these commands to install the packages to your IoT device system image:
    * `ApplyUpdate –stage C:\UWFTemp\Microsoft-IoTUAP-UnifiedWriteFilter-Package.cab`
    * `ApplyUpdate –stage C:\UWFTemp\Microsoft-IoTUAP-UnifiedWriteFilter-Package_Lang_en-us.cab`
    * `ApplyUpdate –commit`
*             The Device will boot to the Update OS, install UWF features, and reboot to the MainOS.
*             Once the device comes back to the MainOS, the UWF feature is ready and available to use. This can be verified by typing ```uwfmgr.exe``` into your Powershell or SSH window.

  ![uwfmgr.exe on Windows 10 IoT Core]({{site.baseurl}}/Resources/images/uwfmgr.png)


## How to include UWF in Your Custom FFU 
**NOTE:** This process is for OEMs and developers who have the ability to create a custom FFU for their Windows 10 IoT Core device. This assumes that you have installed the OS packages on your development machine and the `FMFiles` and `OEMInputSamples` folders are available under `C:\Program Files(x86)\Windows Kits\10`.

*             On your development system, download the [UWF Installation package](http://go.microsoft.com/fwlink/?LinkId=708427).
*             Double click on `UWF.MSI`. When the installation is complete, the x86 and ARM packages will be extracted to `C:\Program Files (x86)\Microsoft IoT\UWF`.
*             Copy `UWF Microsoft-IoTUAP-UnifiedWriteFilter-Package.cab` and `Microsoft-IoTUAP-UnifiedWriteFilter-Package_Lang_en-us.cab` from `C:\Program Files (x86)\Microsoft IoT\UWF\<arch>` to `C:\Program Files (x86)\Windows Kits\10\MSPackages\Retail\<arch>\fre\`.
*             Create a UWF feature manifest and put it in `C:\Program Files (x86)\Windows Kits\10\FMFiles\<arch>\UWFFM.xml`.

{% highlight XML %}
<?xml version="1.0" encoding="utf-8"?>
<FeatureManifest xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://schemas.microsoft.com/embedded/2004/10/ImageUpdate">
  <BasePackages>
     <PackageFile Path="$(mspackageroot)\Retail\$(cputype)\$(buildtype)" Name="Microsoft-IoTUAP-UnifiedWriteFilter-Package.cab" Language="*" />
  </BasePackages>
  
  <Features>
    <Microsoft />
    <MSFeatureGroups />
    <OEM />     
    <OEMFeatureGroups />
  </Features>
</FeatureManifest>

{% endhighlight %}

*             Open `C:\Program Files (x86)\Windows Kits\10\OEMInputSamples\MBM(or)RPi2(or)DragonBoard\RetailOEMInput\ProductionOEMInput.xml` and add `%AKROOT%\FMFiles\x86\UWFFM.xml` under `AdditionalFMs`.
*             Create the image\FFU using [ICD imagegen](http://ms-iot.github.io/content/en-US/win10/CreateIoTCorePro.htm).


## How to Use UWF
UWF can be configured using the uwfmgr.exe tool via a Powershell or SSH session.
* For example, the following combination of commands enable uwfmgr and configure to protect the C drive

  `uwfmgr.exe filter enable`
  <br>
  `uwfmgr.exe volume protect c:`

**NOTE:** The device needs to be rebooted to apply any changes to the UWF configuration. 
* With the exception of some commands listed below, the full list of uwfmgr.exe options is available [here](https://msdn.microsoft.com/en-us/windows/hardware/mt572002). Review the default settings of the Overlay configurations and adapt them per your requirements.

## Protecting a Data Volume
Data volume in IoT Core can be protected using the GUID for the volume. 
The GUID for the available volumes can be found through the following command

  `C:\dir /AL`
  <br>
  `uwfmgr.exe volume protect \\?\Volume {GUID}`


  ![Protecting Volume on Windows 10 IoT Core]({{site.baseurl}}/Resources/images/uwfmgr_protect.png)

## Unsupported uwfmgr.exe Commands
Note uwfmgr.exe on Windows 10 IoT Core does not support commands listed below.

{% highlight XML %}
    Filter 
        Shutdown 
        Restart 

    Servicing 
        Enable 
        Disable 
        Update-Windows
{% endhighlight %}
