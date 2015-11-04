---
layout: default
title: Setup your DragonBoard410c
permalink: /en-US/win10/SetupDB410c.htm
lang: en-US
deviceName: DB410c
---

#Get Started

Learn how to set up the DragonBoard410c and connect it to your computer.

{% include steps.html device=page.deviceName %}


##What you need
1. **A PC running Windows 10** (Prepared on the previous page)

2. **DragonBoard410c**

3. **12V power supply** - with at least 1.0A current.
		If you plan on using several power-hungry USB peripherals, use a higher current power supply instead (>2.0A)
		
4. **HDMI cable and monitor** - DragonBoard only supports monitors that use native HDMI interfaces, support a 16x9 aspect ratio, and output 1280x720p60. Other monitors may not function properly.

5. **USB - Keyboard and Mouse** - [Seeing issues with USB?]({{site.baseurl}}/{{page.lang}}/Faqs.htm#dragonboard)

6. **Logic-level shifter** - *recommended* - Many peripheral devices require 3.3v or 5v logic level voltages. The DragonBoard 410c supplies 1.8v logic and therefore may require a logic level shifter when connecting your DragonBoard to these types of peripheral devices. Some example shifters include: [Adafruit 8-channel Logic Level Converter](https://www.adafruit.com/products/395) and [SparkFun 4-channel Voltage-Level Translator](https://www.sparkfun.com/products/11771).
We will show you how to use these shifters in any of our samples that require them for DragonBoard. To see an example of one such sample, refer to the DragonBoard section of the [SPI Accelerometer Sample]({{site.baseurl}}/{{page.lang}}/win10/samples/SPIAccelerometer.htm).  You may also refer to [SparkFun's Hookup Guide](https://learn.sparkfun.com/tutorials/txb0104-level-shifter-hookup-guide?_ga=1.63563695.1225669924.1446058808). You will not require this device in order to get started with the DragonBoard.


####Note:

Unlike the Raspberry Pi 2 and Minnowboard Max, you *do not* need an SD card to load the Windows IoT Core image to your DragonBoard. The image will be directly uploaded to the board!


## Connect the DragonBoard to the Host PC
1. First, we must enable download mode by setting the first boot switch on the back of the board to: ”USB Boot”. Refer to the image below for a demonstration of the proper configuration.
<img class="image-border" src="{{site.baseurl}}/images/SetupDB410c/dragonboard_usbboot.png">
The first of the four switches are set to ON, and the other 3 switches are set to OFF.

2. Connect a USB cable to the Dragonboard’s microUSB port and connect the other end to an empty USB port on the Host PC
 
3. Connect the Dragonboard to the Power supply 


## Download the Win10 IoT Core Image to the DragonBoard
1. Start the DragonBoard Update Tool you installed during the previous step.
<img class="image-border" src="{{site.baseurl}}/images/SetupDB410c/DB410c_UpdateTool.png" height="200">

2. The Update Tool should detect the DragonBoard and the Connection Status should show: “Connected”.

3. In the DragonBoard Update Tool click the “Browse” button and locate the Win10 IoT Core Image file you downloaded during the HostPC setup

4. Click the “Program” Button and wait for the image to be downloaded to the board.
    
	**Please Note:** The download will overwrite any previous content of the eMMC memory

5. Once the download is complete, disconnect the power supply from the board and change the boot switches back to the OFF position.

6. The DragonBoard is now ready to boot into Win10 IoT Core OS.



## First Boot 
1. Connect Mouse, Keyboard and Display to the board and plug in the power supply

2. After a few seconds you should see the Win10 IoT boot-logo and shortly after you should see the Win10 IoT Core default application:
<img class="image-border" src="{{site.baseurl}}/images/SetupDB410c/DB410c_DefaultApp.jpg" height="200">

## Connecting to a Network

The DragonBoard410c has onboard WiFi, but you may also choose to use a USB Ethernet Adapter to connect to a local network with an Ethernet cable.

#### Connecting to a Wireless Network
- Click the Settings button next to the clock on the Win10 IoT Core default application.
- On the Settings page, select "Network & Wi-Fi" via the menu on the left.
- Your DragonBoard will automatically begin scanning for wireless networks.
- Once your network appears in the list, select it and click the "Connect" button to connect.

#### Using a USB Ethernet Adapter

DragonBoard supports the [TRENDnet TU2-ET100](http://www.trendnet.com/products/proddetail.asp?status=view&prod=280_TU2-ET100) USB ethernet adapter. You need only to connect the adapter via USB and connect it to your local network using a standard ethernet cable. 

Other network adapters may also be compatable with DragonBoard, although they may not have been tested.

## Connect to your DragonBoard

1. Follow the [PowerShell documentation here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) to use PowerShell to connect to your running device.  You can also follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm) to use SSH to connect to your device.

2. It is **highly recommended** that you update the default password for the Administrator account.
    To do this, issue the following commands in your PowerShell connection:

    Replace `[new password]` with a strong password:

        net user Administrator [new password]

    Once this is done, you'll need to re-establish the current session using enable-psSession with the new credentials.

	
{% include nextsteps.html device=page.deviceName %}
