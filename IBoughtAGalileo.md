---
layout: code
title: Updating your Intel Galileo
permalink: /IBoughtAGalileo.htm
---

# Running Windows on my Intel Galileo
If you have bought your own Intel Galileo or received one through the Windows Developer Program for IoT, now you can update it to run Windows. The version of Microsoft Windows released for the Windows Developer Program for IoT requires an Intel Galileo Gen 1 with 1.0.2 firmware. Gen 2 of the Galileo is not supported by this release.

# Before you image your microSD card
Please ensure that you are imaging your miniSD card for a known reason. If you are experiencing a bug, please do not image. Instead, please visit [Microsoft Connect](http://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558){:target="_blank"} to file a bug, and the MS IoT team will respond.

Known reasons to image your microSD card include:

* You are updating to a new version of the Microsoft Windows image supplied as part of the Windows Developer Program for IoT.
* You updated your Intel Galileo firmware, but did not update your Microsoft Windows image. Your Intel Galileo boots, but running sketches fails.
* You have a corrupted SD card.

# Applying Microsoft Windows to an microSD card
Requirements:

* A microSD card reader or SD card reader with a microSD card adapter
* A 16gig or 32gig microSD card
* MicroUSB cable
* [Intel Galileo Software package](http://downloadmirror.intel.com/24000/eng/Intel_Galileo_Arduino_SW_1.5.3_on_Windows_v1.0.2.zip){:target="_blank"}
* Ensure that you are enrolled in the [Windows Developer Program for IoT](https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558){:target="_blank"}. 

Please download the following files to your computer:

* [Microsoft Windows for the Windows Developer Program for IoT](http://go.microsoft.com/fwlink/?LinkID=403150){:target="_blank"}
* [apply-BootMedia.cmd](http://go.microsoft.com/fwlink/?LinkID=403796){:target="_blank"}

# Intel Galileo Firmware Update
Intel has released Firmware version 1.0.2 which needs to be applied to your board before running Microsoft Windows. 

Please follow the [Intel's Getting Started Guide](https://communities.intel.com/docs/DOC-22796){:target="_blank"}. Once you've followed the firmware update instructions, you do not need to continue following the Getting Started guide as the instructions do not apply to Microsoft Windows running on the Intel Galileo board.

NOTE:
: When extracting the Intel Galileo package, please extract into the root of your drive.

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
apply-bootmedia.cmd -destination e:\ -image 9600.16384.x86fre.winblue_rtm_iotbuild.140731-1000_galileo_v1.wim -hostname mygalileo -password admin
~~~

NOTE:
* Beware the path where your files are stored on your PC not to contain spaces or you will get in a known BUG at install. (https://connect.microsoft.com/windowsembeddedIoT/feedbackdetail/view/953685)
* Depending on the speed of your microSD card, SD card reader and computer, writing Microsoft Windows to the microSD card can take between 30 minutes and 2 hours.


## Booting Windows
* Remove power from your Intel Galileo.
* Insert the microSD card you created above.
* Power on your board.
* Windows will take about 2 minutes to boot.

<br/>
<a class="btn btn-default" href="index.htm" role="button">Return to homepage</a>








