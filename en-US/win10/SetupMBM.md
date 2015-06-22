---
layout: default
title: Setup your MinnowBoard Max
permalink: /en-US/win10/SetupMBM.htm
lang: en-US
---

#Get Started

Learn how to set up the MinnowBoard Max hardware and connect it to your computer.

{% include steps.html device="MBM" %}

##What you need
* A PC running Windows 10 Insider Preview.
* MinnowBoard Max.
* Power supply.
* A 8gb Class 10 (or better) micro SD card. If you don't have an SD card, we suggest this [one](http://www.amazon.com/gp/product/B00IVPU786?tag=thewire06-20&linkCode=as2&creative=374929&camp=211189){:target="_blank"} or this [one](http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445/ref=sr_1_15?ie=UTF8&qid=1415926730&sr=8-15&keywords=micro+sd+xd){:target="_blank"}.
* HDMI cable (if display is desired).
* Ethernet cable.

##Hook Up Your Board
* Connect a USB keyboard to one of the USB ports on the board.
* Connect an HDMI monitor to the microHDMI port on the board.
* Connect a network cable to the Ethernet port on the board.

![mbm]({{site.baseurl}}/images/mbm.bmp){:device-images}

##Update your Firmware

* For the current release, only 32 bit Windows 10 IoT Core is supported.  Download the latest 32-Bit Release pre-built BIOS firmware from [firmware.intel.com/projects/minnowboard-max](http://firmware.intel.com/projects/minnowboard-max){:target="_blank"}
* Unzip the downloaded file and copy the following files to a FAT formatted USB stick
	* *.efi
    * *.bin
* Power off your minnowboard
* Remove any SD cards and external hard drives
* Plug in the USB stick to the minnowboard
* Connect an HDMI/DVI monitor and USB keyboard
        * It is also possible to interact with UEFI and BIOS over a serial connection
* Power on your minnowboard
* You should see the UEFI prompt. Run the following commands at the UEFI prompt:
	* If your current firmware is 64 bit (this is how the Minnowboard ships)

		<kbd>fs0:</kbd>

		<kbd>.\MinnowBoard.MAX.FirmwareUpdateX64.efi _filename_.bin</kbd>

    * If your current firmware is 32 bit (if you have already modified the original firmware to be 32 bit)

		<kbd>fs0:</kbd>

		<kbd>.\MinnowBoard.MAX.FirmwareUpdateIA32.efi _filename_.bin</kbd>

		e.g.

        Shell> fs0:

        fs0:\> .\MinnowBoard.MAX.FirmwareUpdateIA32.efi MinnowBoard.MAX.I32.079.R01.bin

* The system should shut down automatically after the firmware update is complete.

Note: You might wonder why you need to invoke 'MinnowBoard.MAX.FirmwareUpdateX64.efi' even if we're only supporting a 32 bit version of Windows 10 IoT Core.
The board usually comes with 64-bit firmware pre-installed on it.  The bitness of the EFI has to match the bitness of the current firmware.  Additionally, the bitness of the bin file has to match the desired bitness of the firmware after updating.
So the first time you will likely need to use 64-bit EFI and 32-bit BIN.
The second time and every other time you need to use 32-bit EFI and 32-bit BIN.
The reason the bitness of the firmware has to match the bitness of the OS is that there is an EFI in the OS image that gets loaded to bootstrap the OS, and that EFI has to be the same bitness as the firmware as well.

Note 2: If you are not able to go to fs0 partition, try a different flash drive. Certain flash drives won't be bootable even after you copy efi/bin files.



##Put the Windows 10 IoT Core Insider Preview image on your SD Card
We have provided a utility to provision your SD card with the Windows 10 IoT Core Insider Preview. If you don't have an SD card, we suggest this [one](http://www.amazon.com/gp/product/B00IVPU786?tag=thewire06-20&linkCode=as2&creative=374929&camp=211189){:target="_blank"} or this [one](http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445/ref=sr_1_15?ie=UTF8&qid=1415926730&sr=8-15&keywords=micro+sd+xd){:target="_blank"}.  The following steps can only be executed on a system running [Windows 10](https://insider.windows.com){:target="_blank"} (build 10069 or higher).
Follow these instructions to configure your SD card:

* NOTE: you will need to follow these instructions on a physical Windows machine (and not a VM) because you need access to the SD card reader.
* Please sign up with our program on [Microsoft Connect](https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558){:target="_blank"}, which is our software release management platform. You will need to have a [Microsoft Account](http://www.microsoft.com/en-us/account/default.aspx){:target="_blank"}. If you are already signed up with our program on Microsoft Connect, (or are not sure if you signed up earlier) and try to sign up again, don’t worry, you will just see a blank page. If you have not signed up for our program on Connect before, it will prompt you to create a social profile and accept license agreements. You can find step-by-step instructions for signing up for Microsoft Connect [here](https://connect.microsoft.com/windowsembeddedIoT/Downloads/DownloadDetails.aspx?DownloadID=57783){:target="_blank"}.
* [Download](https://connect.microsoft.com/windowsembeddedIoT/Downloads/DownloadDetails.aspx?DownloadID=57783) the package "Windows 10 IoT Core Insider Preview Image for MinnowBoard MAX" from Microsoft Connect. If you see a blank page or no downloads listed, please make sure you are signed into Microsoft Connect by looking at your login information at top right part of the screen. Click sign in, if you are not signed in.
* **Download the ISO** to a local folder

	<img src="{{site.baseurl}}/images/mbm_iso.png">     
	
	Double clicking on the ISO (IoT Core MBM.iso) will automatically mount it as a virtual CD drive so you can access the contents. 
	
	<img src="{{site.baseurl}}/images/mbm_msi.png">  
	
	Install "Windows_10_IoT_Core_Mbm.msi". When installation is complete, flash.ffu will be located at "C:\Program Files (x86)\Microsoft IoT\FFU\MinnowBoardMax"
	
	<img src="{{site.baseurl}}/images/mbmffu.png">
	
	Eject the Virtual CD when done
	
* Insert an SD card into your SD card reader.
* **Use WindowsIoTImageHelper.exe** to flash the SD card. Search for "WindowsIoT" from start menu and select the tool "WindowsIoTImageHelper"

	<img src="{{site.baseurl}}/images/ImagerHelperSearch.png">. 
	
* The tool will enumerate devices as shown. 
	Select the SD card you want to flash and the provide the location of the ffu and flash the image.

	<img src="{{site.baseurl}}/images/mbm_ImageHelper.png">

* Click on the "Safely Remove Hardware" icon in your task tray and select your USB SD card reader to safely remove it from the system.  Failing to do this can cause corruption of the image.
**NOTE:** If you want to remove Windows 10 IoT Core from your SD card after you are done using it, see the [FAQ]({{site.baseurl}}/{{page.lang}}/Faqs.htm) section titled **How do I remove Windows 10 IoT Core from my SD card?**.

* **Alternatively, you can use DISM to flash the SD card**. Open an admininistrator command prompt and navigate to the folder containing your local flash.ffu.
* Find the disk number that your SD card is on your computer.  This will be used when the image is applied in the next step.  To do this, you can use the diskpart utility.  Run the following commands:<br />

	<kbd>diskpart</kbd>

    <kbd>list disk</kbd>

    <kbd>exit</kbd>

* Using the admininistrator command prompt, apply the image to your SD card by running the following command (be sure to replace PhysicalDriveN with the value you found in the previous step, for example, if your SD card is disk number 3, use <kbd>/ApplyDrive:\\.\PhysicalDrive3</kbd> below):
	
	<kbd>dism.exe /Apply-Image /ImageFile:<fullpath>flash.ffu /ApplyDrive:\\.\PhysicalDriveN /SkipPlatformCheck</fullpath></kbd>

* Click on the "Safely Remove Hardware" icon in your task tray and select your USB SD card reader to safely remove it from the system.  Failing to do this can cause corruption of the image.
**NOTE:** If you want to remove Windows 10 IoT Core from your SD card after you are done using it, see the [FAQ]({{site.baseurl}}/{{page.lang}}/Faqs.htm) section titled **How do I remove Windows 10 IoT Core from my SD card?**.


##Set Required BIOS Settings and boot Windows 10 IoT Core

* Insert your newly flashed SD Card into your MBM.  At any point, if you turn on your MBM without an SD card inserted, you will be required to configure the boot order again.
* Hook up a physical keyboard to the USB port on MBM. For display, you can either connect an HDMI monitor or use the serial port.
* When you boot, press F2 to get to the BIOS settings.
* Navigate to Device Manager -> System Setup -> South Cluster Configuration -> LPSS & SCC Configuration
    * Set "LPSS & SCC Device Mode" to "ACPI Mode"
    * Set "DDR50 Capability Support for SDCard" to "Disable"
    * Set "ACPI Reporting MMC/SD As" to "Non-Removable"
* Navigate back to top level and select Boot Mainenance Manager-> Boot Options > Change Boot Order
* Highlight the boot order list (when it is highlighted, you will see "Change the order" on the right side of the screen) and press enter
* Highlight "EFI Misc Device" and press '+' to move it to the top of the list. If it does not move by '+', simply select "EFI Misc Device" and press enter to boot to it.
* Commit these changes and exit.
* The MBM should automatically boot to the card (this initial boot may take up to 2 minutes, subsequent boots should take less than 30 seconds). If it does not, it will boot to the UEFI shell, and you will have to execute the following in the UEFI shell to boot Windows:

	<kbd>fs1:</kbd><br/>

	<kbd>efi\boot\bootia32.efi</kbd>

* On the very first boot the Windows 10 IoT Core will do some first boot configurations and it will display a default blue colored application while this is happening. Wait for a few minutes and the board will automatically restart. This will happen only once and then DefaultApp should come up, displaying the IP address of MBM.
![mbm]({{site.baseurl}}/images/DefaultAppMBM.png){:device-images}


* If you have loaded a pervious verion of IoT Core on your MBM you will need to go through the following steps for your first boot (make sure you have your SD card with IoT Core inserted:
  1. Power on MBM device and press F2.
  2. Go to Boot Manager tab and select EFI Internal shell.
  3. Identify EFIESP partition (it might be FS1: hence assuming EFIESP partition as FS1: below)
  4. Type FS1:\ 
  5. Cd EFI
  6. Run  DeleteSbcpVariableFW.efi (This will clear UEFI variables)
  7. Now boot up the device.
* Follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) to use PowerShell to connect to your running device.
* It is **highly recommended** that you update the default password for the Administrator account. Please follow the instructions found in the [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) documentation.
* Remote Debugger will launch automatically when your device boots.
