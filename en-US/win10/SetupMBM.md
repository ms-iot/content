---
layout: default
title: Setup your MinnowBoard Max
permalink: /en-US/win10/SetupMBM.htm
lang: en-US
deviceName: MBM
---

#Get Started

Learn how to set up the MinnowBoard Max hardware and connect it to your computer.

{% include steps.html device=page.deviceName %}

##What you need
1. **A PC running Windows 10** (Prepared in the previous step)
1. **MinnowBoard Max**
1. **Power supply**
1. <a name="MBM_SDcard"></a>**8GB micro SD card** - class 10 or better. (We suggest this [one](http://www.amazon.com/gp/product/B00IVPU786){:target="_blank"} or this [one](http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445){:target="_blank"})
1. **HDMI cable and monitor**
1. **Ethernet cable**
1. **Micro SD card reader** (Due to an issue with most internal SD card readers, we suggest an external USB card reader like this [one](http://www.amazon.com/dp/B009D79VH4){:target="_blank"} or this [one](http://www.amazon.com/dp/B0096FB5CW){:target="_blank"})
1. **USB keyboard**

##Hook Up Your Board
1. **Connect a USB keyboard** to one of the USB ports on the board.
2. **Connect an HDMI monitor** to the microHDMI port on the board.
3. **Connect a network cable** to the Ethernet port on the board. Make sure your development PC is on the same network.

	**NOTE:** If you don't have a local wired network, see [here]({{site.baseurl}}/{{page.lang}}/win10/ConnectToDevice.htm) for additional connection options.

![mbm]({{site.baseurl}}/images/mbm.bmp){:device-images}

##Update your device Firmware

* For the current release, only 32 bit Windows 10 IoT Core is supported.  Download the latest 32-Bit Release pre-built BIOS firmware from [firmware.intel.com/projects/minnowboard-max](http://firmware.intel.com/projects/minnowboard-max){:target="_blank"}
* Unzip the downloaded file and copy the following files to a FAT formatted USB stick
	* *.efi
    * *.bin
* Power off your MinnowBoard
* Remove any SD cards and external hard drives
* Plug in the USB stick to the MinnowBoard
* Connect an HDMI/DVI monitor and USB keyboard
* Power on your MinnowBoard
* You should see the UEFI prompt. Run the following commands at the UEFI prompt:
	* If your current firmware is 64 bit (this is how the MinnowBoard ships)

		<kbd>fs0:</kbd>

		<kbd>.\MinnowBoard.MAX.FirmwareUpdateX64.efi _filename_.bin</kbd>

    * If your current firmware is 32 bit (if you have already modified the original firmware to be 32 bit)

		<kbd>fs0:</kbd>

		<kbd>.\MinnowBoard.MAX.FirmwareUpdateIA32.efi _filename_.bin</kbd>

		e.g.

        <kbd>Shell> fs0:</kbd>

        <kbd>fs0:\> .\MinnowBoard.MAX.FirmwareUpdateIA32.efi MinnowBoard.MAX.I32.079.R01.bin</kbd>

* The system should shut down automatically after the firmware update is complete.

		Note: If you are not able to go to the fs0: partition, try a different flash drive. Certain flash drives won't be bootable even after you copy efi/bin files.

You might wonder why you need to invoke 'MinnowBoard.MAX.FirmwareUpdateX64.efi' even if we're only supporting a 32 bit version of Windows 10 IoT Core.
The board usually comes with 64-bit firmware pre-installed on it.  The bitness of the EFI has to match the bitness of the current firmware.  Additionally, the bitness of the bin file has to match the desired bitness of the firmware after updating.
So the first time you will likely need to use 64-bit EFI and 32-bit BIN.
The second time and every other time you need to use 32-bit EFI and 32-bit BIN.
The reason the bitness of the firmware has to match the bitness of the OS is that there is an EFI in the OS image that gets loaded to bootstrap the OS, and that EFI has to be the same bitness as the firmware as well.

## Install the Windows 10 IoT Core tools

1. [Download](http://go.microsoft.com/fwlink/?LinkId=616848) the ISO for MinnowBoard MAX from the Microsoft Download Center.

2. **Save the ISO** to a local folder

	<img class="image-border" src="{{site.baseurl}}/images/mbm_iso.png">

3. Double clicking on the ISO (IoT Core MBM.iso) will automatically mount it as a virtual CD drive so you can access the contents.

	<img class="image-border" src="{{site.baseurl}}/images/mbm_msi.PNG">

4. Install **Windows_10_IoT_Core_Mbm.msi**. When installation is complete, flash.ffu will be located at **C:\Program Files (x86)\Microsoft IoT\FFU\MinnowBoardMax**

	<img class="image-border" src="{{site.baseurl}}/images/mbmffu.PNG">

5. Eject the Virtual CD when done

##Put the Windows 10 IoT Core image on your SD card

1. **Insert a micro SD card** into your SD card reader.

2. **Use IoTCoreImageHelper.exe** to flash the SD card. Search for "WindowsIoT" from start menu and select the shortcut "WindowsIoTImageHelper"

	<img src="{{site.baseurl}}/images/ImagerHelperSearch.PNG">.

3. The tool will enumerate devices as shown.
	Select the SD card you want to flash and then provide the location of the ffu and flash the image.

	<img src="{{site.baseurl}}/images/mbm_imagehelper.PNG">

4. Click on the **Safely Remove Hardware** icon in your task tray and select your USB SD card reader to safely remove it from the system.  Failing to do this can cause corruption of the image.

**NOTE:** If you want to remove Windows 10 IoT Core from your SD card after you are done using it, see the [FAQ]({{site.baseurl}}/{{page.lang}}/Faqs.htm) section titled **How do I remove Windows 10 IoT Core from my SD card?**.

**NOTE:** IoTCoreImageHelper.exe is the recommended tool to flash the SD card. However, instructions are available for using the [DISM command line tool]({{site.baseurl}}/{{page.lang}}/win10/samples/DISM.htm) directly

##Set Required BIOS Settings and boot Windows 10 IoT Core

* Insert your micro SD Card into your MBM.  At any point, if you turn on your MBM without an SD card inserted, you will be required to configure the boot order again.
* When you boot, press F2 to get to the BIOS settings.
* Navigate to Device Manager -> System Setup -> South Cluster Configuration -> LPSS & SCC Configuration
    * Set "LPSS PWM #1 Support" to Disable
    * Set "LPSS PWM #2 Support" to Disable
* Navigate back to top level and select Boot Maintenance Manager-> Boot Options > Change Boot Order
* Highlight the boot order list (when it is highlighted, you will see "Change the order" on the right side of the screen) and press enter
* Highlight "EFI Misc Device" and press '+' to move it to the top of the list. If it does not move by '+', simply select "EFI Misc Device" and press enter to boot to it.
* Commit these changes and exit.
* The MBM should automatically boot to the card (this initial boot may take up to 2 minutes, subsequent boots should take less than 30 seconds). If it does not, it will boot to the UEFI shell, and you will have to execute the following in the UEFI shell to boot Windows:

	<kbd>fs1:</kbd><br/>

	<kbd>efi\boot\bootia32.efi</kbd>

* Once the device has booted, the DefaultApp will launch and display the IP address of MBM.
![mbm]({{site.baseurl}}/images/DefaultAppMBM.png){:device-images}

* If you have loaded a previous version of IoT Core on your MBM you will need to go through the following steps for your first boot (make sure you have your SD card with IoT Core inserted):
  1. Power on MBM device and press F2.
  2. Go to Boot Manager and select EFI Internal shell.
  3. Identify EFIESP partition (it might be FS1: hence assuming EFIESP partition as FS1: below)
  4. Type FS1:
  5. Cd EFI
  6. Run  DeleteSbcpVariableFW.efi (This will clear UEFI variables)
  7. Now boot up the device.

* Follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) to use PowerShell to connect to your running device.  You can also follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm) to use SSH to connect to your device.
* It is **highly recommended** that you update the default password for the Administrator account.
    To do this, issue the following commands in your PowerShell connection:

    Replace `[new password]` with a strong password:

        net user Administrator [new password]

    Once this is done, you'll need to re-establish the current session using enable-psSession with the new credentials.

##Additional Resources
* [Supported Peripheral Interfaces and Devices]({{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm){:target="_blank"}

{% include nextsteps.html device=page.deviceName %}

