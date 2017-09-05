---
layout: docs
title: OEM license requirements
description: System requirements for OEMs
keyword: OEM, windows 10 iot core
permalink: /en-US/Docs/OEMLicenseRequirements.htm
lang: en-US
---

# OEM license requirements

The process of licensing Windows 10 IoTCore product and the OEM license agreement is provided at [Windows 10 IoT Core Commercialization](https://www.windowsforiotdevices.com/).

As  part of signing the Windows 10 IoT Core OEM license agreement, you are required to meet these system requirements for the Windows 10 IoTCore device.

## SMBIOS Support
___

The system firmware must implement support for SMBIOS that complies with System Management BIOS Reference Specification, Version 2.4 or later. The SMBIOS implementation must follow all conventions and include all required structures and fields as indicated in the SMBIOS Specification, Section 3.2, and follow all conformance requirements as indicated in Section 4. Bit 2 in the BIOS Characteristics Extension Byte 2 field must be set (Section 3.3.1.2.2 of the specification). The length of the Type 1 (System Information) table must be at least 1Bh bytes (includes SKU Number and Family fields from Version 2.4 of the specification).

The following are the minimum required fields in SMBIOS for IoTCore 

* (Table 1, offset 04h) System Manufacturer
* (Table 1, offset 05h) System Product Name
* (Table 1, offset 19h) System SKU
* (Table 1, offset 1Ah) System Family

These fields gain prominence as fields which will be used for identifying unique system configurations for telemetry and servicing. The Manufacturer, Product Name, SKU Number and Family fields must not be longer than 64 characters in length. Avoid leading or trailing spaces or other invisible characters.

Design Notes: SKU Number has been moved to a required field in order to improve telemetry reporting. We encourage the OEM to be careful to fill in Manufacturer consistently and to fill in SKU Number with a value that can identify what the OEM considers a unique system configuration for telemetry and servicing.

See [SMBIOS Specification](https://msdn.microsoft.com/library/windows/hardware/dn932824(v=vs.85).aspx#system_fundamentals_smbios_smbiosspecification) for more information.

{% include note.html text="If you are re-using the BIOS/Firmware/UEFI, make sure make sure to update the entries." %}


## Compliance with minimum hardware requirements
___

Review the IoTCore sections of [Minimum hardware requirements](https://msdn.microsoft.com/library/windows/hardware/dn915086(v=vs.85).aspx)
