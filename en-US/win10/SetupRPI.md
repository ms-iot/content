---
layout: default
title: Setup your Raspberry Pi 2
permalink: /en-US/win10/SetupRPI.htm
lang: en-US
---

#Get Started

Learn how to set up the Raspberry Pi 2 and connect it to your computer.

{% include steps.html device="RPI2" %}

##What you need

1. **A PC running Windows 10 IoT Core** (Prepared in the previous step)
2. **Raspberry Pi 2**
3. **5V micro USB power supply** - with at least 1.0A current
		If you plan on using several power-hungry USB peripherals, use a higher current power supply instead (>2.0A)
4. **8GB micro SD card** - class 10 or better. (We suggest this [one](http://www.amazon.com/gp/product/B00IVPU786){:target="_blank"} or this [one](http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445){:target="_blank"})
5. **HDMI cable and monitor**
6. **Ethernet cable**
7. **Micro SD card reader**

##Put the Windows 10 IoT Core image on your SD card

1. **Insert a micro SD card** into your SD card reader.

2. **Use IoTCoreImageHelper.exe** to flash the SD card. Search for "WindowsIoT" from start menu and select the shortcut "WindowsIoTImageHelper"

	<img src="{{site.baseurl}}/images/ImagerHelperSearch.PNG">

3. The tool will enumerate devices as shown.
	Select the SD card you want to flash and then provide the location of the ffu and flash the image.

	<img src="{{site.baseurl}}/images/SetupRPI/ImageHelper.PNG">

4. Click on the **Safely Remove Hardware** icon in your task tray and select your USB SD card reader to safely remove it from the system.  Failing to do this can cause corruption of the image.

	**NOTE:** If you want to remove Windows 10 IoT Core from your SD card after you are done using it, see the [FAQ]({{site.baseurl}}/{{page.lang}}/Faqs.htm) section titled **How do I remove Windows 10 IoT Core from my SD card?**.

	**NOTE:** IoTCoreImageHelper.exe is the recommended tool to flash the SD card. However, instructions are available for using [DISM command line tool]({{site.baseurl}}/{{page.lang}}/win10/samples/DISM.htm) directly

##Hook up your board

1. **Insert the micro SD card** you prepared (the slot is on the opposite side of the board shown below).
2. **Connect a network cable** from your local network to the Ethernet port on the board. Make sure your development PC is on the same network.

	**NOTE:** If you don't have a local wired network, see [here]({{site.baseurl}}/{{page.lang}}/win10/ConnectToDevice.htm) for additional connection options.

3. **Connect an HDMI monitor** to the HDMI port on the board.
4. **Connect the power supply** to the micro USB port on the board.

<img class="device-images" src="{{site.baseurl}}/images/rpi2.png">

##Boot Windows 10 IoT Core
1. Windows 10 IoT Core will boot automatically after connecting power the supply. This will take a few minutes.
2. Once the device has booted, the DefaultApp will launch and display the IP address of RPi2.

	<img class="device-images" src="{{site.baseurl}}/images/DefaultAppRpi2.png">

3. Follow the [PowerShell documentation here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) to use PowerShell to connect to your running device.  You can also follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm) to use SSH to connect to your device.
4. It is **highly recommended** that you update the default password for the Administrator account.
    To do this, issue the following commands in your PowerShell connection:

    Replace `[new password]` with a strong password:

        net user Administrator [new password]

    Once this is done, you'll need to re-establish the current session using enable-psSession with the new credentials.
