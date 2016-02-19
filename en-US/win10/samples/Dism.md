---
layout: default
title: Use DISM to image the SD card for Windows IoT Core device
permalink: /en-US/win10/samples/DISM.htm
lang: en-US
---

## Using DISM to flash micro SD card for Windows IoT Core device

### An alternative method to WindowsIoTImageHelper

**Dism.exe** is installed "C:\Program Files (x86)\Microsoft IoT\Dism" if you followed instructions to set up [Raspberry PI]({{site.baseurl}}/{{page.lang}}/win10/SetupRPI.htm) or [Minnowboard Max]({{site.baseurl}}/{{page.lang}}/win10/SetupMBM.htm)

* Open an administrator command prompt and navigate to the folder containing your local flash.ffu.

* Find the disk number that your SD card is on your computer.  This will be used when the image is applied in the next step.  To do this, you can use the diskpart utility.  Run the following commands:<br />

	<kbd>diskpart</kbd>

    <kbd>list disk</kbd>

    <kbd>exit</kbd>

* Using the administrator command prompt, apply the image to your SD card by running the following command (be sure to replace PhysicalDriveN with the value you found in the previous step, for example, if your SD card is disk number 3, use <kbd>/ApplyDrive:\\.\PhysicalDrive3</kbd> below):
	
	<kbd>dism.exe /Apply-Image /ImageFile:<fullpath>flash.ffu /ApplyDrive:\\.\PhysicalDriveN /SkipPlatformCheck</fullpath></kbd>

* Click on the "Safely Remove Hardware" icon in your task tray and select your USB SD card reader to safely remove it from the system.  Failing to do this can cause corruption of the image.

**NOTE:** If you want to remove Windows 10 IoT Core from your SD card after you are done using it, see the [FAQ]({{site.baseurl}}/{{page.lang}}/Faqs.htm) section titled **How do I remove Windows 10 IoT Core from my SD card?**.
