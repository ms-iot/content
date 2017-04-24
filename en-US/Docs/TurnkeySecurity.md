---
layout: docs
title: Enabling Secure Boot, BitLocker and Device Guard on Windows 10 IoT Core
description: Learn about enabling Secure Boot, BitLocker encryption and Device Guard on your IoT device.
keyword: secure boot, windows iot, bitlocker, encryption, lockdown, code integrity, CI, security
permalink: /en-US/Docs/TurnkeySecurity.htm
lang: en-US
---

# Enabling Secure Boot, BitLocker and Device Guard on Windows 10 IoT Core

## Introduction  
With the release of Creators Update, Windows 10 IoT Core improves its security feature offerings to include UEFI Secure Boot, BitLocker Device Encryption and Device Guard.  These will allow device builders in creating fully locked down Windows IoT devices that are resilient to many different types of attacks.  Together, these features provide the optimal protection that ensures that a platform will launch in a defined way, while locking out unknown binaries and protecting user data through the use of device encryption.  

### Secure Boot
UEFI Secure Boot is the first policy enforcement point, located in UEFI.  It restricts the system to only allow execution of binaries signed by a specified authority. This feature prevents unknown code from being executed on the platform and potentially weakening the security posture of it. 

### BitLocker Device Encryption
Windows 10 IoT Core also implements a lightweight version of BitLocker Device Encryption, protecting IoT devices against offline attacks.  This capability has a strong dependency on the presence of a TPM on the platform, including the necessary preOS protocol in UEFI that conducts the necessary measurements. These preOS measurements ensure that the OS later has a definitive record of how the OS was launched; however, it does not enforce any execution restrictions.

### Device Guard on Windows IoT Core
Most IoT devices are built as fixed-function devices.  This implies that device builders know exactly which firmware, operating system, drivers and applications should be running on a given device.  In turn, this information can be used to fully lockdown an IoT device by only allowing execution of known and trusted code.  Device Guard on Windows 10 IoT Core can help protect IoT devices by ensuring that unknown or untrusted executable code cannot be run on locked-down devices.


## Locking-down IoT Devices
In order to lockdown a Windows IoT device, the following considerations must be made.
 
### UEFI Platform & Secure Boot
In order to leverage Device Guard capabilities, it is necessary to ensure that the boot binaries and UEFI firmware are signed and cannot be tampered with.  UEFI Secure Boot is the first policy enforcement point, located in UEFI.  It prevents tampering by restricting the system to only allow execution of boot binaries signed by a specified authority. Additional details on Secure Boot, along with key creation and management guidance, is available [here][1].

[1]: https://technet.microsoft.com/en-us/library/dn747883.aspx "Secure Boot"

### Configurable Code Integrity (CCI)
Code Integrity (CI) improves the security of the operating system by validating the integrity of a driver or application each time it is loaded into memory. CI contains two main components - Kernel Mode Code Integrity (KMCI) and User Mode Code Integrity (UMCI).  

Configurable Code Integrity (CCI) is a feature in Windows 10 that allows device builders to lockdown a device and only allow it to run and execute code that is signed and trusted.  To do so, device builders can create a code integrity policy on a 'golden' device (final release version of hardware and software) and then secure and apply this policy on all devices on the factory floor.  

To learn more about deploying code integrity policies, auditing and enforcement, check out the latest technet documentation [here][2].

[2]: https://technet.microsoft.com/en-us/itpro/windows/keep-secure/deploy-code-integrity-policies-steps "Code Integrity"


## Turnkey Security on IoT Core
To facilitate easy enablement of key secrutiy features on IoT Core devices, Microsoft is providing a turnkey 'Security Package' that allows device builders to build fully locked down IoT devices.  This package will help with:
* Provisioning Secure Boot keys and enabling the feature on supported IoT platforms
* Setup and configuration of device encryption using BitLocker 
* Initiating device lockdown to only allow execution of signed applications and drivers

### Pre-requisites:
* A PC running Windows 10 Enterprise
* [Windows 10 SDK][3] - Required for Certificate Generation 
* [Windows 10 ADK][4] - Required for CAB generation
* Reference platform - release hardware with shipping firmware, OS, drivers and applications will be required for final lockdown

[3]: https://developer.microsoft.com/en-US/windows/downloads/windows-10-sdk "Windows 10 SDK"
[4]: https://developer.microsoft.com/en-us/windows/hardware/windows-assessment-deployment-kit "Windows 10 ADK"


### Development IoT Devices 
Windows 10 IoT Core works with [several leading SoCs][6] that are utilized in hundreds of devices. Of the [suggested IoT development devices][7], the following provide firmware TPM functionality out of the box, along with Secure Boot, Measured Boot, BitLocker and Device Guard capabilities:
* Qualcomm DragonBoard 410c
* Intel MinnowBoardMax 

**Notes:**
* For Qualcomm's DragonBoard 410c, in order to enable Secure Boot, it may be necessary to provision RPMB. Once the eMMC has been flashed with Windows 10 IoT Core (as per instructions [here][8]), press [Power] + [Vol+] + [Vol-] simultaneously on the device when powering up and select "Provision RPMB" from the BDS menu. *Please note that this is an irreversible step.*
* For Intel's MinnowBoard Max, firmware version must be 0.82 or higher (get the [latest firmware][9]). To enable TPM capabilities, power up board with a keyboard & display attached and press F2 to enter UEFI setup. Go to _Device Manager -> System Setup -> Security Configuration -> PTT_ and set it to _&lt;Enable&gt;_. Press F10 to save changes and proceed with a reboot of the platform.
* For Qualcomm's DragonBoard 410c, in order to enable USB mass storage mode (if required):
  * disconnect everything from DragonBoard
  * be sure the dip switches are all on default (off) position
  * connect Dragonboard's USB OTG Connector to your PC
  * press S2 [power] and S4 [vol-] on your DragonBoard
  * connect Power to your DragonBoard
  * after ~ 10 sec you can release S2 and S4 (or as soon as the next step has begun)
  * Windows should now have recognized an additional mass storage device and mounted a new drive
* BitLocker functionality on Windows 10 IoT Core allows for automatic encryption of NTFS-based OS volume while binding all available NTFS data volumes to it.  For this, it’s necessary to ensure that the EFIESP volume GUID is set to _C12A7328-F81F-11D2-BA4B-00A0C93EC93B_.  

  
[6]: {{site.baseurl}}/{{page.lang}}/explore/SoC "Windows 10 IoT SOCs"
[7]: {{site.baseurl}}/{{page.lang}}/explore/deviceoptions "Windows 10 IoT Core Devices"
[8]: {{site.baseurl}}/{{page.lang}}/Docs/GetStarted/dragonboard/stable/GetStartedStep1.htm "Setup DragonBoard 410c" 
[9]: https://firmware.intel.com/projects/minnowboard-max "MinnowBoard MAX firmware"


### Generating Necessary Lockdown Packages
First, download the [DeviceLockDown Script][10] package, which contains all of the additional tools and scripts required for configuring and locking down devices

**Note:** The _settings.xml_ file contained in this package will allow you to configure various options.  Here, you can specify which keys to use for Secure Boot, specify a certificate for BitLocker data recovery as well as generate and specify signing keys for user-mode and kernel-mode applications and drivers. In order to assist with testing during the initial development cycle, Microsoft has provided pre-generated keys and certificates where appropriate.  This implies that Microsoft Test, Development and Pre-Release binaries are considered trusted.  During final product creation and image generation, be sure to remove these certifcates to ensure a fully locked down device.

1. Start an Administrative PowerShell (PS) console on your Windows 10 PC and navigate to the location of the downloaded script 
2. If using pre-generated keys (for development/testing), skip to #3 below.  If generating your own keys:
  * Update _GenerateKeys.ps1_ script <optional>
  * Issue the following cmd within the PS console:
   `.\GenerateKeys.ps1 -OemName '<your oem name>' -outputPath '<output directory>'`
  * Modify _settings.xml_ to match the newly generated keys
3. Mount your reference hardware platform to your PC, through any appropriate means, including network share or via USB mass storage mode (if available)
4. Update the necessary parameters in _settings.xml:_
  * Mounted path via _Settings -> SIPolicy -> ScanPath_ to path from Step 3
  * Architecture of device via _Settings -> Packaging -> Architecture_ 
  * (Optional) Update package output directory via _Settings -> General -> PackageOutputDirectory_
  * (Optional) Update ownership via _Settings -> Packaging -> OEMName_
  * (Optional) Package signing settings via _Settings -> Packaging -> SignToolOEMSign_ (Additional details available [here][11]) 
5. Execute the following commands to generate required packages:
  * `Import-Module .\IotDeviceGuardPackage.psm1`
  * `New-IotDeviceGuardPackage -ConfigFileName .\settings.xml`
    Note: For testing on the Qualcomm DragonBoard 410c with pre-generated keys, you can use 'QCDB_settings.xml' file.

[10]: https://github.com/ms-iot/security/tree/master/TurnkeySecurity "Turnkey Security"
[11]: https://msdn.microsoft.com/en-us/windows/hardware/commercialize/manufacture/iot/build-retail-image "Signing for Commercialization"


### Installing Lockdown Packages
Once the packages are generated, they can be installed with the final image creation process.  Visit the [IoT Commercialization][12] page to learn how to add packages to an IoT image. For testing and validation efforts, install the generated packages by doing the following:
1. Copy the .cab files to the device under a directory e.g. c:\OemInstall
  * OEM.Custom.Cmd.cab
  * OEM.Security.BitLocker.cab
  * OEM.Security.SecureBoot.cab
  * OEM.Security.DeviceGuard.cab
2. Connect to the device ([using SSH][13] or using [Powershell][14] )
3. Initiate staging of the generated packages by issueing the following commands:
  * `applyupdate -stage c:\OemInstall\OEM.Custom.Cmd.cab`
  * `applyupdate -stage c:\OemInstall\OEM.Security.BitLocker.cab`
  * `applyupdate -stage c:\OemInstall\OEM.Security.SecureBoot.cab`
  * `applyupdate -stage c:\OemInstall\OEM.Security.DeviceGuard.cab`
4. Finally, commit the packages via: 
  * `applyupdate -commit`

The device will reboot into update OS (showing gears) to install the packages and will reboot again to main OS.  Once the device reboots back into MainOS, Secure Boot will be enabled and SIPolicy should be engaged.  Since BitLocker requires Secure Boot provisioning to be completed and the feature to be active, reboot once more to activate BitLocker encryption.  

[12]: https://msdn.microsoft.com/en-us/windows/hardware/commercialize/manufacture/iot/add-a-provisioning-package-to-an-image "Packaging for Commercialization"
[13]: {{site.baseurl}}/{{page.lang}}/Docs/ssh.htm "SSH"
[14]: {{site.baseurl}}/{{page.lang}}/Docs/PowerShell.htm "PowerShell"

### Developing with CodeSigning Enforcement Enabled
Once the packages are generated and lockdown is activated, any binaries introduced into the image during development will need to be signed appropriately. If you’re using the Microsoft generated keys for development and testing purposes only, ensure that your user-mode binaries are signed with the key located in the downloaded package under _.\Keys\OEM-UMCI.pfx_. For kernel-mode signing, such as for drivers, you’ll need to specify your own signing keys.


### Unlocking Encrypted Drives  
During development and testing, when attempting to read contents from an encrypted device offline (e.g. SD card for MinnowBoardMax or DragonBoard's eMMC through USB mass storage mode), 'diskpart' may be used to assign a drive letter to MainOS and Data volume (let's assume v: for MainOS and w: for Data).
The volumes will appear locked and need to be manually unlocked. This can be done on any machine that has the BitLockerDRA.pfx certificate installed (included in the downloaded package). Install the PFX and then run the following commands from an administrative CMD prompt:

* `manage-bde -unlock v: -cert -cf BitLockerDRA.cer`
* `manage-bde -unlock w: -cert -cf BitLockerDRA.cer`

If the contents need to be frequently accessed offline, BitLocker autounlock can be set up for the volumes after the initial unlock using the following commands:

* `manage-bde -autounlock v: -enable`
* `manage-bde -autounlock w: -enable`

### Disabling BitLocker  
Should there arise a need to temporarily disable BitLocker, initate a remote PowerShell session with your IoT device and run the following command: `sectask.exe -disable`.  
**Note:** Device encryption will be re-enabled on subsequent device boot unless the scheduled encryption task is disabled.
