---
layout: default
title: Setup your PC for the DragonBoard410c
permalink: /en-US/win10/SetupPCDB410c.htm
lang: en-US
deviceName: DB410c
---

#Get Started

Learn how to get your computer ready for Windows Developer Program for IoT.

{% include steps.html device=page.deviceName %}



## Install the DragonBoard update Tool

1. Download the DragonBoard Update Tool by selecting the download link appropriate for your PC: [x86](https://developer.qualcomm.com/download/db410c/windows-10-iot-update-tool-dragonboard-410c-x86.zip) or [x64](https://developer.qualcomm.com/download/db410c/windows-10-iot-update-tool-dragonboard-410c-x64.zip)

2. Right click on the downloaded zip file and select extract all. This will create a new folder with the same name as the downloaded zip file.

3. Open the folder and double click the setup.exe file.

4. Follow the instructions and when prompted allow the USB driver to install by clicking “install”.
   <img class="image-border" src="{{site.baseurl}}/images/SetupDB410c/DB410c_UpdateTool_DriverInstall.png">

5. The installer will create a shortcut to the DragonBoard Update Tool on your desktop and in your start menu, under Qualcomm->DragonBoardUpdate Tool.



## Download the DragonBoard Win10 IoT Core Image

1. Download the Win10 IoT Core Image- ISO from the following [website](http://go.microsoft.com/fwlink/?LinkId=657684)
 
2. Double click the downloaded ISO file. This will automatically mount the ISO as a new virtual CD-drive. 
(Look for a new CD-ROM drive)

3. The mounted virtual drive contains an installer file “Windows_10_IoT_Core_QCDB410C.msi”. Double click the file to start the installation. 
    <img class="image-border" src="{{site.baseurl}}/images/SetupDB410c/DB410c_WindowsInstaller.JPG">

    The installer creates a new directory: C:\Program Files (x86)\Microsoft IoT\FFU\QCDB410C\ which contains the DragonBoard410c image file “flash.ffu”.
    <img class="image-border" src="{{site.baseurl}}/images/SetupDB410c/DB410c_FlashFile_FFU.JPG">

    Unlike Raspberry Pi 2 and Minnowboard Max, we will not be applying this FFU to an SD card. Instead, we will use this flash file on the next page.

4. Eject the virtual CD-drive when done.



{% include_relative SetupPCContent.md %}

{% include nextsteps.html device=page.deviceName %}
