---
layout: default
title: SB_BL
permalink: /en-US/win10/SB_BL.htm
lang: en-US
---

# Enabling Secure Boot and BitLocker Device Encryption on Windows 10 IoT Core
Deployment Guide  
_Revision: 1.0_

## Introduction  
UEFI Secure Boot and BitLocker are the keystone features of a locked-down Windows OS that is resilient against offline and boot attacks. UEFI Secure Boot is the first policy enforcement point, located in UEFI. It restricts the system to only allow execution of binaries signed by a specified authority. This feature prevents unknown code from being executed on the platform and potentially weakening the security posture of it. Note that while the limitation to a defined set of publishing authorities excludes all unknown code, it does not necessarily prevent known bad code from being executed (e.g. rollback attack).  
Windows 10 IoT Core also implements a lightweight version of BitLocker Device Encryption, which has a strong dependency on the presence of a TPM on the platform, including the necessary preOS protocol in UEFI that conducts the necessary measurements. These preOS measurements ensure that the OS later has a definitive record of how the OS was launched; however, it does not enforce any execution restrictions.  
Together, Secure and Measured Boot provide the optimal protection that ensures that a platform will launch in a defined way, while locking out unknown binaries and protecting user data through the use of device encryption.  

## Supported IoT Platforms  
The following [Windows 10 IoT Core supported platforms][1] provide firmware TPM capabilities out of the box, along with Secure Boot, Measured Boot and BitLocker capabilities:

* Intel MinnowBoard Max
* Qualcomm DragonBoard 410c

Notes:

* For Intel's MinnowBoard Max, firmware version must be 0.82 or higher. For the current release, only 32-bit Windows 10 IoT Core is supported so be sure to download the [latest 32-bit firmware][2] from Intel and flash it to your board.
* For Qualcomm's DragonBoard 410c, in order to enable Secure Boot, it may be necessary to provision RPMB. Once the eMMC has been flashed with Windows 10 IoT Core (as per instructions [here][3]), press [Power] + [Vol+] + [Vol-] simultaneously on the device when powering up and select "Provision RPMB" from the BDS menu. *Please note that this is an irreversible step.*

[1]: {{site.baseurl}}/{{page.lang}}/GetStarted.htm "Windows 10 IoT Core supported platforms"
[2]: https://firmware.intel.com/projects/minnowboard-max "MinnowBoard MAX firmware"
[3]: {{site.baseurl}}/{{page.lang}}/win10/SetupPCDB410c.htm "Setup DragonBoard 410c"

## Certificate Generation  
This section is pertinent if you are a hardware device manufacturer or developer that wants to create your own UEFI Secure Boot and BitLocker data recovery certificates in order to lock down the platform.  
Note: For testing purposes, you may skip this section and use the pre-generated certificates provided in the [subsequent section][4].  
Details on Secure Boot along with key creation and management guidance is available [here][5]. The below contents are provided for demonstration purposes only and should be adjusted based on your specific product security requirements.  
In order to generate the necessary certificates, we'll make use of the following tools:

* MakeCert.exe
* Pvk2Pfx.exe
* SignTool.exe

These tools are available within the [Windows developer kits][6], which are generally installed along with Visual Studio. With default settings, these binaries are normally located under C:\Program Files (x86)\Windows Kits\10\bin\. Additionally, a set of Windows code signing certificates will also be required.
Download the zip from [here][7], unpack and proceed with the following steps:

1. Run the attached MakeSB.ps1 script in an Administrative PowerShell console to generate a custom set of SecureBoot certificates (this example uses certs under the 'db' location)
  * You can click the **None** button in all UI boxes that will show up to write the private keys without a password to disk. 
2. As a final step, you can export the DRA as PFX for backup purposes using _certmgr.msc_. Start _certmgr.msc_, find the cert issued to 'PFXBitLockerDRA' under _Certificates -> Current User -> Personal -> Certificates_, right click on it select _All Tasks -> Export..._. The dialog will lead through the export process that will produce the BitLockerDRA.pfx file:
  * Export with private Key
  * Personal Information Exchange – PKCS #12 (.pfx)
  * Include all certificates
  * Export all extended properties
  * Set the export password (let's assume 'dra')
  * Set the export file name BitLockerDRA.pfx in the same folder where all other files where created

Note that the included script also provides the information required to secure the DRA key by binding it to the TPM of the platform or create it securely on a SmartCard.

[4]: {{site.baseurl}}/{{page.lang}}/win10/SB_BL.htm#Certificates "Pre-generated Certificates"
[5]: https://technet.microsoft.com/en-us/library/dn747883.aspx "Secure Boot Key Creation and Management Guidance"
[6]: https://msdn.microsoft.com/en-us/windows/hardware/gg454513.aspx "Download kits and tools for Windows"
[7]: https://github.com/ms-iot/security/tree/master/CertGen "CertGen.zip"

## <a name="Certificates"></a>Pre-generated Certificates (for Testing only)  
In order to quickly test and deploy UEFI Secure Boot and Device Encryption functionality when security is **not** a priority, you can use a set of pre-generated certificates and keys (which are used for illustration) in the subsequent sections below. Please note that since the private keys are included in this published package, the resulting platform **cannot be considered trusted or secure**. You should download the zip from [here][8] unpack, and point to these files in the subsequent sections below.

[8]: https://github.com/ms-iot/security/tree/master/PreGenPackage "PreGenPackage.zip"

## Preparing OS Image  
For the following steps, we'll assume that you've flashed the latest Windows 10 IoT Core image for your board (instructions available [here][1] based on your specific board) and that the "MainOS" volume is mounted as volume "v:" on your Windows 10 PC.

1.	Copy the following 3 files to v:\EFI (will be used to set UEFI secure variables for Secure Boot):
  * SetVariable_db.bin
  * SetVariable_kek.bin
  * SetVariable_pk.bin
2.	Copy the provided device encryption task definition to v:\EFI:
  * DETask.xml
3.	Additionally, in order to facilitate data recovery once the device is encrypted, open an administrative CMD prompt on your PC and run the following commands:
  * `reg load HKLM\IoT v:\Windows\System32\config\SOFTWARE`
  * `reg import DRAStore.reg` (point to your 'DRAStore.reg' file location)
  * `reg unload HKLM\IoT`
4. Optionally, copy test tool [t2t.exe][9] to v:\windows\system32.

**Note:** BitLocker functionality on Windows 10 IoT Core allows for automatic encryption of **NTFS-based OS volume** while binding all available **NTFS data volumes** to it. For this, it's necessary to ensure that the EFIESP volume GUID is set correctly. If you're using the **DragonBoard 410c**, you'll need to provide these additional instructions within your administrative CMD window:

* `diskpart`
* `sel disk n` (n for disk number that maps to the DragonBoard under USB Mass Storage Mode)
* `sel parition m` (partition # for EFIESP partition - '28' for DragonBoard410c under Windows 10 IoT Core)
* `set id=C12A7328-F81F-11D2-BA4B-00A0C93EC93B`

**Note:** OEMs and device builders may need to setup Secure Boot and enable BitLocker on their IoT devices at scale. Please refer to the [OEM preparation and deployment guidance documentation][10] to learn more on how to build an OS image with custom files and settings.

[9]: https://github.com/ms-iot/security/tree/master/Urchin/T2T "T2T"
[10]: https://github.com/ms-iot/security/tree/master/Urchin "OEM preparation and deployment guidance documentation"

## Preparing UEFI Firmware  
Depending on your device, you may need to ensure that firmware settings are updated to enable firmware TPM and Secure Boot:

### Intel MinnowBoardMax  
* Firmware must be 32-bit and version 0.82 or higher (get the [latest 32-bit firmware][2])
* To enable TPM capabilities, power up board with a keyboard & display attached and press F2 to enter UEFI setup. Go to _Device Manager -> System Setup -> Security Configuration -> PTT_ and set it to _<Enable>_. Press F10 to save changes and proceed with a reboot of the platform.

### Qualcomm DragonBoard 410c  
* In order to enable Secure Boot, it may be necessary to provision RPMB. Once the image has been prepared as mentioned in the section above, with a display attached to the device, press [Power] + [Vol+] + [Vol-] simultaneously on the device before powering up and select "Provision RPMB" from the BDS menu. **Please note that this is an irreversible step.**
 
## Enabling UEFI Secure Boot and BitLocker  
### UEFI Secure Boot  
Once the device is set and the image prepared, boot the device into Windows and connect to the device from your Windows 10 PC through a remote PowerShell session (instructions on how to connect via PowerShell are availale [here][11]).  
Run the following 3 commands from within the remote powershell session to set UEFI secure variables:

* `FWVar.exe put imagesecurity:db c:\efi\SetVariable_db.bin NV BS RT TA`
* `FWVar.exe put efiglobal:KEK c:\efi\SetVariable_kek.bin NV BS RT TA`
* `FWVar.exe put efiglobal:PK c:\efi\SetVariable_pk.bin NV BS RT TA`

Next, in order to complete lock-down of the platform, reboot device using the command `shutdown /r`.  
**Note:** On an Intel MinnowBoardMax, you may need to manually enable SecureBoot in UEFI. Power up board with a keyboard connected and press F2 to enter UEFI setup. Go to _Device Manager -> Secure Boot Configuration -> Attempt Secure Boot_ and enable this option _<X>_. Press F10 to save changes and proceed with a reboot of the platform.

[11]: {{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm "PowerShell"

### Scheduling BitLocker  
In order to enable BitLocker, the device encryption task must be scheduled. This device encryption task is set to trigger when the TPM is provisioned and ready, also ensuring that device encryption stays enabled on all subsequent boots (should the volume be decrypted offline at any time). Once Secure Boot has been setup and the device booted up, re-initiate a remote PowerShell session and create a new (or append to existing) file labelled "OEMCustomization.cmd" under c:\windows\system32 using the following command:

* `new-item c:\windows\system32\OEMCustomization.cmd -type file -value 'schtasks /Create /TN "\Microsoft\Windows\IoT\DeviceEncryption" /XML c:\efi\DETask.xml /f'`

## Unlocking Encrypted Drives  
When attempting to read contents from an encrypted device offline (e.g. SD card for MinnowBoardMax or DragonBoard's eMMC through USB mass storage mode), 'diskpart' may be used to assign a drive letter to MainOS and Data volume (let's assume v: for MainOS and w: for Data).  
The volumes will appear locked and need to be manually unlocked. This can be done on any machine that has the BitLockerDRA.pfx certificate package installed (included in attachment above). Install the PFX and then run the following commands from an administrative CMD prompt:

* `manage-bde -unlock v: -cert -cf BitLockerDRA.cer`
* `manage-bde -unlock w: -cert -cf BitLockerDRA.cer`

If the contents need to be frequently accessed offline, BitLocker autounlock can be set up for the volumes after the initial unlock using the following commands:

* `manage-bde -autounlock v: -enable`
* `manage-bde -autounlock w: -enable`

## Disabling BitLocker  
Should there arise a need to temporarily disable BitLocker, initate a remote PowerShell session with your IoT device and run the following command: `sectask.exe -disable`.  
**Note:** Dvice encryption will be re-enabled on subsequent device boot unless the scheduled encryption task is disabled.

