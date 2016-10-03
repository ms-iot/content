---
layout: docs
title: OEM license requirements
description: System requirements for OEMs
keyword: OEM, windows 10 iot core
permalink: /en-US/Docs/OEMLicenseRequirements.htm
lang: en-US
---

# OEM license requirements

As part of signing the Windows 10 IoT Core OEM license agreement, you are required to meet these system requirements for the Windows 10 IoTCore device.

## SMBIOS Support
___

System firmware should implement the support for SMBIOS that complies with the [SMBIOS Specification](https://msdn.microsoft.com/library/windows/hardware/dn932824(v=vs.85).aspx#system_fundamentals_smbios_smbiosspecification).

{% include note.html text="If you are re-using the BIOS/Firmware/UEFI, make sure make sure to update the entries." %}


## Compliance with minimum hardware requirements
___

Review the IoTCore sections of [Minimum hardware requirements](https://msdn.microsoft.com/en-us/library/windows/hardware/dn915086(v=vs.85).aspx)

## Board Support Package (BSP) information
___

The following information is recommended to be updated on every BSP update, to enable proper telemetry reporting.

* **BSP Version** : Create and update the following registry keys on the device that represents the current installed BSP package version.

        HKLM\SYSTEM\Platform\DeviceTargetingInfo\PhoneFirmwareRevision
        HKLM\SYSTEM\Platform\DeviceTargetingInfo\OneCoreFwV 
		
In addition to this, OEM may also provide the following information to be stored in the OS registry ( in addition to the FW provided above)

* **Manufacturer Name** : Create the following registry keys on the device to store the Manufacturer Name.

        HKLM\SYSTEM\Platform\DeviceTargetingInfo\PhoneManufacturer
        HKLM\SYSTEM\Platform\DeviceTargetingInfo\OneCoreManufacturer

* **Model Name** : Create the following registry keys on the device to store the Model Name - this can be a concatenated string of Product Name and SKU.

        HKLM\SYSTEM\Platform\DeviceTargetingInfo\PhoneFirmwareRevision
		HKLM\SYSTEM\Platform\DeviceTargetingInfo\OneCoreManufacturerModelName 

### 1. Steps to add this info to image

* Edit the sample package definition file provided below with the appropriate values
{% highlight XML %}
<?xml version="1.0" encoding="utf-8"?>
<Package xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns:xsd="http://www.w3.org/2001/XMLSchema"
         Owner="$(OEMNAME)" Component="BSP" SubComponent="DeviceInfo"
         OwnerType="OEM" ReleaseType="Production" Platform="Any"
         xmlns="urn:Microsoft.WindowsPhone/PackageSchema.v8.00">
  <Components>
    <OSComponent>
        <RegKeys>
            <RegKey KeyName="$(hklm.system)\Platform\DeviceInfo">
                <RegValue Name="OneCoreManufacturer" Type="REG_SZ"
                    Value="Contoso"/>
                <RegValue Name="OneCoreManufacturerModelName" Type="REG_SZ"
                    Value="ProductA SKU1"/>
                <RegValue Name="OneCoreFwV" Type="REG_SZ"
                    Value="10.0.1.0"/>
                <RegValue Name="PhoneManufacturer" Type="REG_SZ"
                    Value="Contoso"/>
                <RegValue Name="PhoneManufacturerModelName" Type="REG_SZ"
                    Value="ProductA SKU1"/>
                <RegValue Name="PhoneFirmwareRevision" Type="REG_SZ"
                    Value="10.0.1.0"/>
            </RegKey>
         </RegKeys> 
    </OSComponent>
  </Components>
</Package>
{% endhighlight %}

* Create the package using `buildpkg.cmd` 
* Include this package in the image creation, see [Windows 10 IoT Core manufacturing guide](https://msdn.microsoft.com/windows/hardware/commercialize/manufacture/iot/iot-core-manufacturing-guide) for instructions.

