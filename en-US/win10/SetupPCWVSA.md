---
layout: default
title: SetupPCWVSA
permalink: /en-US/win10/SetupPCWVSA.htm
lang: en-US
deviceName: WVSA
---

#Get Started

Learn how to get your Windows 10 device ready to use Virtual Shields for Arduino.

{% include steps.html device=page.deviceName %}

#Setup for Windows Virtual Shields for Arduino (Phone and PC)

In this section of the tutorial, you'll prepare a Windows 10 device of your choice by loading it with the Virtual Shields for Arduino application - the program allows you to use your chosen device as a virtual shield for an Arduino board.  This results in some powerful possibilities for Makers, allowing them to utilize voice recognition, touch screens, and other assets of a Windows device with relative ease.

##Hardware

The Virtual Shields for Arduino application can run on any Windows 10 device, but our particular sample will make use of the Windows Phone.

###What you need
 1. Windows Phone running Windows 10 - we recommend the [Lumia 520](http://www.microsoft.com/en-us/mobile/phone/lumia520/){:target="_blank"} or [Lumia 635](http://www.microsoft.com/en-us/mobile/phone/lumia635/){:target="_blank"}.

###Set up your Windows Phone
 1. If your phone is not already running Windows 10, there are options to install preview versions of the software.  Windows Phone 8 users can go to the Microsoft Store app to download the "Windows Insider" application - this app allows the user to opt into receiving Windows 10 Technical Previews as updates.  Follow the prompts and instructions upon opening the app, and continue once your phone is successfully running Windows 10.

##Software

There are two options for installing the Virtual Shields for Arduino on your Windows Phone.

1. [Download the app from the Microsoft Store](#option-1-download-the-app-from-the-microsoft-store).
2. [Sideload the app using a PC and Visual Studio](#option-2-sideload-the-app-using-a-pc-and-visual-studio).

Downloading the app is a much easier, quicker choice.

###Option 1: Download the app from the Microsoft Store

Follow this [link](https://www.microsoft.com/store/apps/9nblgggz0mld){:target="_blank"} to the Microsoft Store page for the app, download the file, and then install. You can then open the application to ensure it runs properly. 

Your device is now setup to be used as a virtual shield for an Arduino!  You can proceed to the next page.

###Option 2: Sideload the app using a PC and Visual Studio

####What you need
 1. Visual Studio 2015 to sideload the Virtual Shields for Arduino app onto a developer-unlocked phone.
 2. This [repository](https://github.com/ms-iot/virtual-shields-universal){:target="_blank"} containing the code for the Virtual Shields for Arduino application.  Either clone the repository or download it as a ZIP on your local disk.  If you're not familiar with git and want to do a proper clone, follow the instructions [here] (https://help.github.com/articles/cloning-a-repository/){:target="_blank"}.

####Set up your Visual Studio 2015
 1. Install Visual Studio 2015 with the Windows 10 Developer Preview tools from [dev.windows.com](https://dev.windows.com/en-us/windows-10-developer-preview-tools){:target="_blank"}.  We recommend the Community Version of Visual Studio, but both Enterprise and Professional will work as well.  If you already have Visual Studio installed, skip to the next step.
 2. In Visual Studio, load the Shield.sln from the repository downloaded in the "What you need" section above.
 3. Ensure your phone is developer-unlocked ([this page](https://msdn.microsoft.com/en-us/library/windows/apps/dn614128.aspx){:target="_blank"} explains how to unlock Windows Phone 8.1, 8, and 7.1; however, the steps are the same for Windows 10 phones).
 4. Deploy the Shield.sln program to your device.  To do this, deploy to a local machine, and be sure to set the architecture of the device as "ARM".
 5. Run the Virtual Shields for Arduino application on your phone to ensure the deploy was successful.  Your Windows 10 device is now setup to be used as a virtual shield!

 {% include nextsteps.html device=page.deviceName %}
