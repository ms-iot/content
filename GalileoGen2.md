---
layout: code
title: Configure Intel Galileo Gen2
permalink: /GalileoGen2.htm
---

# Running Windows on my Intel Galileo Gen 2
This guide will show you how to install and run the Windows Developer Program for IoT on a Intel Galileo Gen 2. Please note that the version of Windows released for Intel Galileo Gen 2 is not compatible with Intel Galileo Gen 1 and should only be used on a Gen 2 board.

# Applying Microsoft Windows to an microSD card
Requirements:

* A microSD card reader or SD card reader with a microSD card adapter
* A 16gig or 32gig microSD card
* Ensure that you are enrolled in the [Windows Developer Program for IoT](https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558){:target="_blank"}. 

Please download the following files to your computer:

* [Microsoft Windows for the Windows Developer Program for IoT for Intel Galileo Gen 2](file://wod/release/9600.16384.x86fre.winblue_rtm_iotbuild.140815-1515_galileo_v2.wim){:target="_blank"}
* [apply-BootMedia.cmd](http://go.microsoft.com/fwlink/?LinkID=403796){:target="_blank"}

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
apply-bootmedia.cmd -destination {YourSDCardDrive} -image {.wimFile} -hostname mygalileo -password admin
~~~

  Example:

~~~
apply-bootmedia.cmd -destination e:\ -image 9600.16384.x86fre.winblue_rtm_iotbuild.140815-1515_galileo_v2.wim -hostname mygalileo -password admin
~~~

**NOTE:**

* The path where your files are stored on your PC should not contain spaces or you will reach a known [bug](https://connect.microsoft.com/windowsembeddedIoT/feedbackdetail/view/953685) during installation.
* Depending on the speed of your microSD card, SD card reader and computer, writing Microsoft Windows to the microSD card can take between 30 minutes and 2 hours.


## Booting Windows
* Remove power from your Intel Galileo.
* Insert the microSD card you created above.
* Power on your board.
* Windows will take about 2 minutes to boot.

# Using the Gen 2 developer package.


[&laquo; Return to homepage](index.htm){: .btn .btn-default} 








