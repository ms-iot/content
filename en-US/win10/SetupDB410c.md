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

3. **12V power supply** - with at least 1.0A current
		If you plan on using several power-hungry USB peripherals, use a higher current power supply instead (>2.0A)
		
4. **HDMI cable and monitor**

5. **USB- Keyboard and Mouse**


## Connect the DragonBoard to the Host PC
1. Put the board in download mode by setting the first boot switch on the back of the board to: ”USB Boot”.
(First switch set to ON other 3 switches set to OFF).

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

3. Follow the [PowerShell documentation here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) to use PowerShell to connect to your running device.  You can also follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm) to use SSH to connect to your device.

4. It is **highly recommended** that you update the default password for the Administrator account.
    To do this, issue the following commands in your PowerShell connection:

    Replace `[new password]` with a strong password:

        net user Administrator [new password]

    Once this is done, you'll need to re-establish the current session using enable-psSession with the new credentials.

	
{% include nextsteps.html device=page.deviceName %}
