---
layout: default
title: SetupBoard
permalink: /en-US/win10/SetupRPI.htm
lang: en-US
---

#Get Started

Learn how to set up the Raspberry Pi 2 and connect it to your computer. Note that this requires you to have a PC running Windows 10 Technical Preview.

{% include steps.html device="RPI2" %}

##What you need
1. **Windows 10 Insider Preview** - must be a physical Windows machine (not a VM).
2. **Raspberry Pi 2**.
3. **5V micro USB power supply** - with at least 1.0A current.
4. **8GB micro SD card** - class 10 or better. (We suggest this [one](http://www.amazon.com/gp/product/B00IVPU786) or this [one](http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445))
5. **HDMI cable** (if display is desired).
6. **Ethernet cable**.

If you are using several USB peripherals or high-current devices, use a higher current power supply (>2.0A).


##Put the Windows 10 IoT Core Insider Preview image on your SD card
We have provided a utility to provision your SD card with the Windows 10 IoT Core Insider Preview.  The following steps can only be executed on a system running [Windows 10](https://insider.windows.com) (build 10069 or higher).

NOTE: you will need to follow these instructions on a **physical Windows machine** (and not a VM) because you need access to the SD card reader.

Follow these instructions to configure your SD card:

1. Please **sign up on [Microsoft Connect](https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558)**, which is our software release management platform.
	* You will need to have an [MSA](https://login.live.com/)
	* If you are already signed up with our program on [Microsoft Connect](https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558), (or are not sure if you signed up earlier), you will just see a blank page.
	* If you have not signed up for our program on Connect before, it will prompt you to create a social profile and accept license agreements.
	Follow the step-by-step instructions for [signing up for Microsoft Connect](http://ms-iot.github.io/content/SigninMSConnect.htm) to get going.

2. Once signed in, navigate to **surveys**, and complete all of surveys.

	<img class="device-images" src="{{site.baseurl}}/images/SetupRPI/connect1.PNG">

3. [Download](http://connect.microsoft.com/windowsembeddedIoT/Downloads/DownloadDetails.aspx?DownloadID=57782) the **package** "Windows 10 IoT Core Insider Preview Image for Raspberry Pi 2" from Microsoft Connect.
	* If you see a blank page or no downloads listed, please make sure you are signed into Microsoft Connect by looking at your login information at top right part of the screen. Click sign in, if you are not signed in.
4. **Select your board type** from the downloads, and proceed to download the files

	<img src="{{site.baseurl}}/images/SetupRPI/connect3.PNG">

	<img src="{{site.baseurl}}/images/SetupRPI/connect4.PNG">

5. A window will pop up on your desktop.Click **Browse**, select where you want to place the folder and click **Transfer**

	<img src="{{site.baseurl}}/images/SetupRPI/download1.PNG">

	When it's done transferring, close the window.

	<img src="{{site.baseurl}}/images/SetupRPI/download2.PNG">
6. **Make a local copy** of the flash.ffu contained in <a href="{{site.downloadurl}}" target="_blank">Windows_IoT_Core_RPI2_BUILD.zip</a>

	<img src="{{site.baseurl}}/images/SetupRPI/flash2.PNG">

7. **Insert an SD card** into your SD card reader.
8. Open an **admininistrator command prompt** and navigate to the folder containing your local flash.ffu.

	<img class="device-images" src="{{site.baseurl}}/images/SetupRPI/cmd.jpg">

9. **Find the disk number** that your SD card is on your computer.  This will be used when the image is applied in the next step.  To do this, you can use the **diskpart** utility.  Run the following commands:

	<kbd>diskpart</kbd>

	<kbd>list disk</kbd>

	<kbd>exit</kbd>

	<img  src="{{site.baseurl}}/images/SetupRPI/diskpart.PNG">

10. Using the administrator command prompt, apply the image to your SD card.
	Run the following command:

	<kbd>dism.exe /Apply-Image /ImageFile:<fullpath>flash.ffu /ApplyDrive:\\.\PhysicalDriveN /SkipPlatformCheck</fullpath></kbd>

	* Be sure to replace PhysicalDriveN with the value you found in the previous step, for example, if your SD card is disk number 3, use

	<kbd>/ApplyDrive:\\.\PhysicalDrive3</kbd>

	<img  src="{{site.baseurl}}/images/SetupRPI/applyDrive.PNG">

11. Click on the **Safely Remove Hardware** icon in your task tray and select your USB SD card reader to safely remove it from the system.  Failing to do this can cause corruption of the image.


##Hook up your board

1. **Insert the micro SD card** you prepared in the section above (the slot is on the opposite side of the board shown below).
2. **Connect a network cable** to the Ethernet port on the board.
3. **Connect an HDMI monitor** to the HDMI port on the board.
4. **Connect the power supply** to the micro USB port on the board.

	<img class="device-images" src="{{site.baseurl}}/images/rpi2.png">


##Boot Windows 10 IoT Core Insider Preview
1. Windows 10 IoT Core Insider Preview will boot automatically after connecting power supply.
2. On the very first boot Windows IoT Core will do some first boot configurations and it will display a default blue colored application while this is happening. **Wait for a few minutes** and the board will automatically restart. This will happen only once and then DefaultApp should come up, displaying the IP address of the Raspberry Pi 2.
	<img class="device-images" src="{{site.baseurl}}/images/DefaultAppRpi2.png">
3. Follow the [Powershell documentation]({{site.baseurl}}/win10/samples/PowerShell.htm) <a href="{{site.baseurl}}/win10/samples/PowerShell.htm">here</a> to use PowerShell to connect to your running device.
4. It is **highly recommended** that you update the default password for the Administrator account.
5. Remote Debugger will launch automatically when your Raspberry Pi 2 boots.
