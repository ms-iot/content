---
layout: default
title: Setup your Intel Galileo
permalink: /en-US/win8/SetupGalileo.htm
lang: en-US
deviceName: Galileo
---

#Get Started

This guide will show you how to install and run the Windows Developer Program for IoT on an Intel Galileo Gen1 or Gen2.

{% include steps.html device=page.deviceName %}

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>Support for Windows on Intel Galileo Gen 1 and Gen 2 has ended on November 30, 2015</u></h4>
	<p><h5>As we continue to focus on providing a great experience for Makers with Windows 10 IoT Core, we've made the difficult decision to discontinue Windows support on the Galileo platform. We've seen some fantastic innovation with the platform, but unfortunately, it does not meet the minimum hardware requirements for Windows 10 IoT Core. Please click <a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">here</a> to learn more.</h5></p>	
</div>

## Step 1: Sign up for Microsoft Connect
We release Windows for Galileo through the Microsoft Connect program.  Please go to the [Microsoft Connect](https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558){:target="_blank"} site to sign up.  You can find step-by-step instructions for signing up for Microsoft Connect [here]({{site.baseurl}}/{{page.lang}}/SigninMSConnect.htm){:target="_blank"}.

## Creating a Microsoft Windows bootable microSD card

### Before you image your microSD card
Please ensure that you are imaging your microSD card for a known reason. If you are experiencing a Windows problem, please visit [Microsoft Connect](http://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558){:target="_blank"} to file a bug, and the MS IoT team will respond.

Known reasons to image your microSD card include:

* Setting up a new Intel Galileo
* You are updating to a new version of the Microsoft Windows image supplied as part of the Windows Developer Program for IoT.
* You updated your Intel Galileo firmware, but did not update your Microsoft Windows image.
* Your Intel Galileo boots, but running sketches fails.
* You have a corrupted SD card.


Requirements:

* A microSD card reader or SD card reader with a microSD card adapter
* A 16gig or larger microSD card

Software Packages:

* [apply-BootMedia.cmd](http://go.microsoft.com/fwlink/?LinkID=403796){:target="_blank"}
* [Microsoft Windows for Intel Galileo](http://go.microsoft.com/fwlink/?LinkID=513083&clcid=0x409){:target="_blank"}

***NOTE:***
As of December 2014, only a single Windows image is needed for either Intel Galileo Gen1 or Gen2.

# Write Windows to the microSD card

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


## Intel Galileo Gen 1 Firmware Update
Intel has released Firmware version 1.0.3 which needs to be applied to your board before running Microsoft Windows.

Please follow the [Intel's Getting Started Guide](https://communities.intel.com/docs/DOC-22796){:target="_blank"}. Once you've followed the firmware update instructions, you do not need to continue following the Getting Started guide as the instructions do not apply to Microsoft Windows running on the Intel Galileo board.

**NOTE:**
: When extracting the Intel Galileo package, please extract into the root of your drive and make sure that the path does not contain spaces.

## Intel Galileo Gen 2 Firmware Update
<p><span class="label label-default"> Updated: 3/30/2015</span></p>
The Intel Galileo Gen 2 requires Firmware version 1.0.4.

Please follow the [Intel's Getting Started Guide](https://software.intel.com/en-us/articles/getting-started-with-the-intel-galileo-board-on-windows#terminal){:target="_blank"}. Once you've followed the firmware update instructions, you do not need to continue following the Getting Started guide as the instructions do not apply to Microsoft Windows running on the Intel Galileo board.

## Connecting and booting Windows
Connecting the Galileo directly to your computer will allow you to communicate with just your Galileo. Your computer will still have internet connectivity, and your computer will be able to communicate with your Galileo.

**IMPORTANT NOTE:**
: Intel Galileo Gen1 and Gen2 use different power supplies. Please only use the 12 volt power supply with the Gen2 and a 5 volt power supply with Gen1.


1. Connect one end of the network cable to the ethernet port on your Galileo
1. Connect the other end of the network cable to your computer using a built in Ethernet port or a USB Ethernet adapter.
1. Plug the power cord in
1. You should see activity on the microSD light as it boots. The LED is circled in green in the following pictures.

<!--![](/Resources/images/SDLed.png)-->
<img class="device-images" src="{{site.baseurl}}/Resources/images/SDLed.png">

<!--![](/Resources/images/IntelGalileoGen2.jpg)-->
<img class="device-images" src="{{site.baseurl}}/Resources/images/IntelGalileoGen2.jpg">

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

<!--![](/Resources/images/TelnetLogin.png)-->
<img class="device-images" src="{{site.baseurl}}/Resources/images/TelnetLogin.png">

## Shutting down the Galileo
Before you unplug the power from the Galileo, it is advisable to gracefully shut it down. To do this:

1. Telnet to the Galileo as described above
1. Enter the following command to shutdown:
    ```shutdown /s /t 0```
After the microSD activity LED stops blinking, you may unplug the Galileo.

NOTE
: If you do not shut the Galileo down, the next boot will take much longer. During this time, Windows will run a check disk on the SD card to verify the integrity of the file system. Please allow this to finish.

{% include nextsteps.html device=page.deviceName %}
