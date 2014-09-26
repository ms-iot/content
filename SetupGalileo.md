---
layout: code
title: Setup your Intel Galileo
permalink: /SetupGalileo.htm
---

# Setting up your Intel Galileo
This guide will show you how to install and run the Windows Developer Program for IoT on an Intel Galileo Gen1 or Gen2.

## Creating a Microsoft Windows bootable microSD card

### Before you image your microSD card
Please ensure that you are imaging your miniSD card for a known reason. If you are experiencing a Windows problem, please visit [Microsoft Connect](http://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558){:target="_blank"} to file a bug, and the MS IoT team will respond.

Known reasons to image your microSD card include:

* Setting up a new Intel Galileo
* You are updating to a new version of the Microsoft Windows image supplied as part of the Windows Developer Program for IoT.
* You updated your Intel Galileo firmware, but did not update your Microsoft Windows image. 
* Your Intel Galileo boots, but running sketches fails.
* You have a corrupted SD card.



###Requirements

* A microSD card reader or SD card reader with a microSD card adapter
* A 16GB or larger microSD card
* Ensure that you are enrolled in the [Windows Developer Program for IoT](https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558){:target="_blank"}. 

Software Packages:

* [apply-BootMedia.cmd](http://go.microsoft.com/fwlink/?LinkID=403796){:target="_blank"}

Depending on which Intel Galileo generation you are using, download one of the following Windows Images:

* [Microsoft Windows Intel Galileo Gen 1](http://go.microsoft.com/fwlink/?LinkID=403150){:target="_blank"}
* [Microsoft Windows Intel Galileo Gen 2](file://wod/release/Galileo/9600.16384.x86fre.winblue_rtm_iotbuild.140815-1515_galileo_v2.wim){:target="_blank"}


### Write Windows to the microSD card

* Format the microSD card with the Fat32 file system. 
* Open an Administrative command prompt:
  * Open the Start screen
  * type `cmd`
  * right click or tap and hold on `Command Prompt`, then select `Run as Administrator`
* If you are running on Windows 7 please follow [these instructions](ImageOnWin7.htm){:target="_blank"} before proceeding.
* In the command window, type the following:

~~~
cd /d %USERPROFILE%\Downloads
apply-bootmedia.cmd -destination {YourSDCardDrive} -image {.wimFile downloaded above} -hostname mygalileo -password admin
~~~


## Intel Galileo Gen 1 Setup
The Intel Galileo Gen 1 requires at least firmware 1.0.2 in order to run Microsoft Windows. 

Please follow the [Intel's Getting Started Guide](https://communities.intel.com/docs/DOC-22796){:target="_blank"}. Once you've followed the firmware update instructions, you do not need to continue following the Getting Started guide as the instructions do not apply to Microsoft Windows running on the Intel Galileo board.

**NOTE:**
: When extracting the Intel Galileo package, please extract into the root of your drive and make sure that the path does not contain spaces.

## Intel Galileo Gen 2 Setup
**Gen2 Preflight NOTE:**
: The Intel Galileo Gen 2 does not currently require a firmware update, but WILL the next time the WIM is updated.
: Also note that the Gen 2 requires a registry fix after first boot.

## Connecting and booting Windows
Connecting the Galileo directly to your computer will allow you to communicate with just your Galileo. You will still have internet connectivity, and your computer will be able to communicate with your Galileo.

1. Connect one end of the network cable to the ethernet port on your Galileo
1. Connect the other end of the network cable to your computer using the built in Ethernet port or a USB Ethernet adapter.
1. Plug the power cord in
1. You should see activity on the microSD light as it boots. The LED is at the bottom left of this picture.

![](images/SDLed.png)

NOTE:
: Windows on Galileo can take about 2 minutes to boot. During this time you will see the microSD activity LED flashing rapidly. Once it stops flashing for a few seconds, the Galileo is fully booted.
  


## Telnet into your Galileo
The main reason you'll want to telnet into your Galileo is so that you can interact with your Galileo and gracefully shut it down.

On your desktop select Start->Run and type ```telnet mygalileo```.
When prompted by telnet, use the following username and password:

~~~
Username: Administrator
Password: admin
~~~

![](images/TelnetLogin.png)

## Apply Gen 2 GPIO Fix
In order to use GPIO on Gen 2, you need to apply a registry fix after first boot.

1. Download [Gen 2 GPIO patch](file://wod/release/Galileo/DSDT.reg){:target="_blank"}
1. Copy the patch above to your galileo - from a command line - ```copy DSDT.reg \\mygalileo\c$\```
1. Telnet to mygalileo
1. from the command line in telnet run ```reg import DSDT.reg```
1. from the command line in telnet run ```shutdown /r /t 0```
1. Wait for a reboot.

## Shutting down the Galileo
Before you unplug the power from the Galileo, it is advisable to gracefully shut it down. To do this:

1. Telnet to the Galileo as described above
1. Enter the following command to shutdown:
    ```shutdown /s /t 0```
After the microSD activity LED stops blinking, you may unplug the Galileo.

NOTE
: If you do not shut the Galileo down, the next boot will take much longer. During this time, Windows will run a check disk on the SD card to verify the integrity of the file system. Please allow this to finish.

[&laquo; Return to homepage](index.htm){: .btn .btn-default} 
[Continue to Samples &raquo;](SampleApps.htm){: .btn .btn-default} 
