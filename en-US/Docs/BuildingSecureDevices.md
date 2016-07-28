---
layout: default
title: Building Secure Devices with Windows 10 IoT Core
description: Learn more about things to consider in hardware design and setup to build secure IoT devices
keyword: secure IoT devices, TPM, trusted platform module, BitLocker, encryption, secure boot 
permalink: /en-US/Docs/BuildingSecureDevices.htm
lang: en-US
---

# Building Secure Devices with Windows 10 IoT Core
Suggested Guidelines  
_Revision: 1.0_

## Introduction  
With the introduction of Windows 10 IoT Core, Microsoft is bringing strong enterprise grade security features that can be leveraged on smaller, resource constrained classes of IoT devices.  In order for these security features to offer tangible benefits, the hardware platform must also provide a means to anchor them. This document provides high-level guidance to OEM device builders and security conscious 'Makers' who are looking to select appropriate hardware and build, configure, and ship a secure IoT device to their customers. 

## Firmware  
On general purpose computing devices that are "open," such as PCs, users can access firmware settings during device boot through various key combinations (e.g. F2 enters UEFI setup on most PCs today). This can allow users to make changes in how the platform boots as well as enable and disable various device ports, functions, and other potential security features available on the device.  Given the sensitive nature of such modifications, IoT devices should not function like “open devices,” and should function more like "locked-down" devices, similar to mobile phones, where access to firmware is generally not permitted.  This can normally be accomplished by ensuring you are using locked-down firmware in your production device. Locked-down firmware should be available through your firmware provider.  At minimum, on devices where locked-down firmware is not available or potentially unsuitable, such as for use by Makers, consider protecting firmware settings access via a strong administrator password.

## Enabling Secure Boot
Windows 10 IoT Core will boot on devices that implement Unified Extensible Firmware Interface (UEFI).  The UEFI standard implements a security feature known as Secure Boot. This allows a device to only boot trusted software by restricting the system to only allow execution of binaries signed by a specified authority.  When a device is powered-up, UEFI Secure Boot checks the signature of each piece of boot software, including firmware drivers and the OS.  If the signatures do not match (e.g. if an attacker were to replace the original image with a compromised OS) the platform will not boot. If the signatures are verified and good, the device continues to boot and then gives control to the operating system.  Note that while the limitation to a defined set of publishing authorities excludes all unknown code, it does not necessarily prevent known bad code from being executed (e.g. rollback attacks).  Enabling Secure Boot is strongly recommended if your firmware supports it. 
Device manufacturers will need to store the Secure Boot databases onto their devices.  This includes the signature database (db), revoked signatures database (dbx), and Key Enrollment Key database (KEK).  These databases are generally stored on the firmware nonvolatile RAM (NV-RAM) at manufacturing time. The signature database (db) and the revoked signatures database (dbx) list the signers or image hashes of UEFI applications, operating system loaders (such as the Microsoft Operating System Loader or Boot Manager), and UEFI drivers that can be loaded on the device, as well as the revoked images for items that are no longer trusted and may not be loaded. The Key Enrollment Key database (KEK) is a separate database of signing keys that can be used to update the signature database and revoked signatures database. Microsoft requires a specified key to be included in the KEK database so that in the future Microsoft can add new operating systems to the signature database or add known bad images to the revoked signatures database.
After these databases have been added, and after final firmware validation and testing, firmware is locked from editing and a platform key (PK) can be generated and added. The PK can subsequently be used to sign updates to the KEK or make any desired changes to the secure variables. 
Device builders should contact their firmware manufacturer for tools and assistance in creating these databases. Visit this [TechNet article][1] for more information about Secure Boot key creation and management.

[1]: https://technet.microsoft.com/en-us/library/dn747883.aspx "Secure Boot Key Creation and Management"

## Implementing TPMs  
A Trusted Platform Module (TPM), is a cryptographic coprocessor including capabilities for random number generation, secure generation of cryptographic keys and limitation of their use. It also includes capabilities such as remote attestation and sealed storage. TPM’s technical specification is publicly available and is driven by a standards body called the Trusted Computing Group (TCG).  TPM 2.0 is available as a discrete component (from various manufacturers) as well as within some SOCs, implemented in firmware.
Devices that incorporate a TPM can create cryptographic keys and encrypt them so that they can only be decrypted by the TPM. This process, often called “wrapping” or “binding” a key, can help protect the key from disclosure. Each TPM has a master “wrapping” key, called the storage root key (SRK), which is stored within the TPM itself. The private portion of a key created in a TPM is never exposed to any other component, software, process, or person. Furthermore, devices that incorporate a TPM can also create a key that has not only been wrapped but is also tied to certain platform measurements. This type of key can only be unwrapped when those platform measurements have the same values that they had when the key was created. This process is called “sealing” the key to the TPM while decrypting the key is called “unsealing.” The TPM can also seal and unseal data generated outside of the TPM. With this sealed key and software such as BitLocker Drive Encryption, you can lock data until specific hardware or software conditions are met. 
With a TPM, private portions of key pairs are kept separate from the memory controlled by the operating system. Keys can be sealed to the TPM, and certain assurances about the state of a system (assurances that define the “trustworthiness” of a system) can be made before the keys are unsealed and released for use. Because the TPM uses its own internal firmware and logic circuits for processing instructions, it does not rely on the operating system and is not exposed to vulnerabilities that might exist in the operating system or application software.

**Note:** Though some devices may incorporate an older TPM 1.2 chip, Windows 10 IoT Core only supports TPM 2.0.

## Enabling BitLocker Encryption  
In order to protect data at rest (i.e. date stored on a device), Microsoft brought its enterprise-grade BitLocker Drive Encryption technology to IoT devices in Windows 10 IoT Core.  BitLocker ensures that data stored on a device remains encrypted, even if the device is tampered with while the OS is not running.  This helps protect against "offline attacks," attacks made by disabling or circumventing the installed operating system, or made by physically separating the storage media from the device in order to attack the data separately. 
BitLocker uses a Trusted Platform Module (TPM) to provide enhanced protection for your data and to assure early boot component integrity. This helps protect your data from theft or unauthorized viewing by encrypting the entire Windows volume and any data partitions that might be present on your device.
For additional instructions on how to enable BitLocker on Windows 10 IoT Core, follow the steps outlined [here][2].

[2]: {{site.baseurl}}/{{page.lang}}/Docs/SB_BL.htm "Enabling Secure Boot and BitLocker"

## Onboard Storage Options
Development boards, like the popular Raspberry Pi 3, offer flexibility and allow developers to easily boot any platform via a removable SD card.  For most industry IoT devices, such flexibility is not desirable and can make such devices an easy target for attacks. Instead, when designing your hardware, consider using an eMMC storage for your smaller, low cost IoT devices.  Embedded storage makes it significantly more difficult to separate the content from the device and in turn, reduces the potential of introducing malware onto the device or data theft. 

## Developer Tools  
When building your Windows 10 IoT Core image final shipping device using ICD (Image Configuration Designer), ensure that no developer tools are included in your retail image.  Tools that allows developers to remotely access and debug IoT Core devices should not be present on production systems as these can potentially open up your device to attacks.  Make sure that if you're using our developer tools like ftp server, SSH, or PowerShell in your images during development, that you test and validate your scenarios on retail IoT Core images that do not include these tools.

## User Accounts  
Most users are familiar with the notion of taking "ownership" of devices like PCs and phones - the idea of personalizing the device when unboxed and setting up credentials to access the device. Unlike consumer PCs and phones, IoT devices are not intended to serve as general purpose computing devices. Instead, they are usually single-app, fixed purpose devices. Though Windows supports the notion of device administrators that can remotely connect to devices during a development cycle, such support on industry IoT devices can pose a threat, especially when weak passwords are used.  In general, Microsoft recommends that no "default" accounts or passwords should be created on Windows 10 IoT Core devices.


