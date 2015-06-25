---
layout: default
title: Setup your Raspberry Pi 2
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
4. **8GB micro SD card** - class 10 or better. (We suggest this [one](http://www.amazon.com/gp/product/B00IVPU786){:target="_blank"} or this [one](http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445){:target="_blank"})
5. **HDMI cable** (if display is desired).
6. **Ethernet cable**.

If you are using several USB peripherals or high-current devices, use a higher current power supply (>2.0A).


##Put the Windows 10 IoT Core Insider Preview image on your SD card
We have provided a utility to provision your SD card with the Windows 10 IoT Core Insider Preview.  The following steps can only be executed on a system running [Windows 10](https://insider.windows.com){:target="_blank"} (build 10069 or higher).

NOTE: you will need to follow these instructions on a **physical Windows machine** (and not a VM) because you need access to the SD card reader.

Follow these instructions to configure your SD card:

1. [Download](http://go.microsoft.com/fwlink/?LinkId=616847) the ISO for Raspberry Pi 2 from the Microsoft Download Center.

2. **Save the ISO** to a local folder

	<img src="{{site.baseurl}}/images/SetupRPI/iso.png">     
	
3. Double clicking on the ISO (IoT Core RPi.iso) will automatically mount it as a virtual CD drive so you can access the contents. 
	
	<img src="{{site.baseurl}}/images/SetupRPI/msi.png">  
	
4. Install "Windows_10_IoT_Core_RPi2.msi". When installation is complete, flash.ffu will be located at "C:\Program Files (x86)\Microsoft IoT\FFU\RaspberryPi2"
	
	<img src="{{site.baseurl}}/images/SetupRPI/rpiffu.png">
	
5. Eject the Virtual CD when done
	
6. **Insert an SD card** into your SD card reader.

7. **Use WindowsIoTImageHelper.exe** to flash the SD card. Search for "WindowsIoT" from start menu and select the tool "WindowsIoTImageHelper"

	<img src="{{site.baseurl}}/images/ImagerHelperSearch.png">

8. The tool will enumerate devices as shown. 
	Select the SD card you want to flash and then provide the location of the ffu and flash the image.

	<img src="{{site.baseurl}}/images/SetupRPI/ImageHelper.png">

9. Click on the **Safely Remove Hardware** icon in your task tray and select your USB SD card reader to safely remove it from the system.  Failing to do this can cause corruption of the image.

**NOTE:** WindowsIoTImageHelper is the recommended tool to flash the SD card. However, instructions are available for using [DISM]({{site.baseurl}}/{{page.lang}}/win10/samples/dism.htm) directly

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
3. Follow the [PowerShell documentation here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) to use PowerShell to connect to your running device.  You can also follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm) to use SSH to connect to your device.
4. It is **highly recommended** that you update the default password for the Administrator account.
5. Remote Debugger will launch automatically when your Raspberry Pi 2 boots.
