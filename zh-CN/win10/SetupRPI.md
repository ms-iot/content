---
layout: default
title: SetupBoard
permalink: /win10/SetupRPI.htm
---

#Get Started

Learn how to set up the Raspberry Pi 2 and connect it to your computer. Note that this requires you to have a PC running Windows 10 Technical Preview.

{% include steps.html device="RPI2" %}

##What you need

1. A PC running [Windows 10 Insider Preview](http://insider.windows.com).
2. Raspberry Pi 2.
3. 5V micro USB power supply with at least 1.0A current.

   NOTE: You may want to use a higher current power supply (>2.0A) instead if you plan on using several USB peripherals or high-current devices.
4. A 8gb Class 10 (or better) micro SD card.
If you don't have an SD card, we suggest this [one](http://www.amazon.com/gp/product/B00IVPU786) or this [one](href="http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445).
5. HDMI cable (if display is desired).
6. Ethernet cable.

##Put the Windows 10 IoT Core Insider Preview image on your SD Card

We have provided a utility to provision your SD card with the Windows 10 IoT Core Insider Preview.  The following steps can only be executed on a system running <a href="https://insider.windows.com">Windows 10</a> (build 10069 or higher).

Follow these instructions to configure your SD card:

1. NOTE: you will need to follow these instructions on a physical Windows machine (and not a VM) because you need access to the SD card reader.
2. Please sign up with our program on [Microsoft Connect](https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558), which is our software release management platform. You will need to have a [Microsoft Account](http://www.microsoft.com/en-us/account/default.aspx). If you are already signed up with our program on Microsoft Connect, (or are not sure if you signed up earlier) and try to sign up again, don’t worry, you will just see a blank page. If you have not signed up for our program on Connect before, it will prompt you to create a social profile and accept license agreements. You can find step-by-step instructions for signing up for Microsoft Connect [here](http://ms-iot.github.io/content/SigninMSConnect.htm).
3. [Download](http://connect.microsoft.com/windowsembeddedIoT/Downloads/DownloadDetails.aspx?DownloadID=57782) the package "Windows 10 IoT Core Insider Preview Image for Raspberry Pi 2" from Microsoft Connect. If you see a blank page or no downloads listed, please make sure you are signed into Microsoft Connect by looking at your login information at top right part of the screen. Click sign in, if you are not signed in.
4. Make a local copy of the flash.ffu contained in the downloaded package "Windows 10 IoT Core Insider Preview Image for Raspberry Pi 2".
5. Insert an SD card into your SD card reader.
6. Open an administrator command prompt and navigate to the folder containing your local flash.ffu.
7. Find the disk number that your SD card is on your computer.  This will be used when the image is applied in the next step.  To do this, you can use the diskpart utility.  Run the following commands:

   <kbd>diskpart</kbd>

   <kbd>list disk</kbd>

   <kbd>exit</kbd>

8. Open the administrator command prompt (to do so, click Start, type "cmd," right-click on "Command Prompt" and then select "Run as administrator"). At the prompt, apply the image to your SD card by running the following command (be sure to replace PhysicalDriveN with the value you found in the previous step, for example, if your SD card is disk number 3, use <kbd>/ApplyDrive:\\.\PhysicalDrive3</kbd> below):

   <kbd>dism.exe /Apply-Image /ImageFile:<fullpath>flash.ffu /ApplyDrive:\\.\PhysicalDriveN /SkipPlatformCheck</fullpath></kbd>

9. Click on the "Safely Remove Hardware" icon in your task tray and select your USB SD card reader to safely remove it from the system.  Failing to do this can cause corruption of the image.

**NOTE:** If you want to remove Windows 10 IoT Core from your SD card after you are done using it, see the [FAQ]({{site.baseurl}}/{{page.lang}}/FAQs.htm) section titled **How do I remove Windows 10 IoT Core from my SD card?**


##Hook up your Board

1. Insert micro SD card you prepared in the section above (the slot is on the opposite side of the board shown below).
2. Connect a network cable to the Ethernet port on the board.
3. Connect an HDMI monitor to the HDMI port on the board.
4. Connect the power supply to the micro USB port on the board.

<img class="device-images" src="{{site.baseurl}}/images/rpi2.png">


##Boot Windows 10 IoT Core Insider Preview

1. Windows 10 IoT Core Insider Preview will boot automatically after connecting power supply.
2. On the very first boot the you will see a blue windows logo and then a black screen for a long time (2 minutes or longer).  Do not power off the board while it is doing first-time setup.  The board will then reboot to a blue-screened application that says “MinWin” at the top.  It will sit on this screen also for a long time (2 minutes or longer).  Again, do not power off the board while this is occurring.  Finally the board will reboot a second time to show DefaultApp, displaying the IP address of the Raspberry Pi 2.

   <img class="device-images" src="{{site.baseurl}}/images/DefaultAppRpi2.png">

3. Follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) to use PowerShell to connect to your running device.
4. It is **highly recommended** that you update the default password for the Administrator account. Please follow the instructions found in the [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) documentation.
5. Remote Debugger will launch automatically when your Raspberry Pi 2 boots. 
