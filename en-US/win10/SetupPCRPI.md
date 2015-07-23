---
layout: default
title: Setup your PC for Raspberry Pi 2
permalink: /en-US/win10/SetupPCRPI.htm
lang: en-US
---

#Get Started

Learn how to get your computer ready for Windows Developer Program for IoT.

{% include steps.html device="RPI2" %}

{% include_relative SetupPCContent.md %}

### Install the Windows 10 IoT Core tools

In addition to Visual Studio, we'll install some tools for Windows 10 IoT Core.

1. [Download](http://go.microsoft.com/fwlink/?LinkId=616847) the ISO for the Raspberry Pi 2 from the Microsoft Download Center.

2. **Save the ISO** to a local folder

	<img class="image-border" src="{{site.baseurl}}/images/SetupRPI/Iso.PNG">

3. Double clicking on the ISO (IoT Core RPi.iso) will automatically mount it as a virtual CD drive so you can access the contents.

	<img class="image-border" src="{{site.baseurl}}/images/SetupRPI/MSI.PNG">

4. Install **Windows_10_IoT_Core_RPi2.msi**. When installation is complete, flash.ffu will be located at **C:\Program Files (x86)\Microsoft IoT\FFU\RaspberryPi2**

	<img class="image-border" src="{{site.baseurl}}/images/SetupRPI/rpiffu.PNG">

5. Eject the Virtual CD when done
