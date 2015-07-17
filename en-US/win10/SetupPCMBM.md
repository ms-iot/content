---
layout: default
title: Setup your PC for MinnowBoard Max
permalink: /en-US/win10/SetupPCMBM.htm
lang: en-US
---

#Get Started

Learn how to get your computer ready for Windows Developer Program for IoT.

{% include steps.html device="MBM" %}

{% include_relative SetupPCContent.md %}

### Install the Windows 10 IoT Core tools

In addition to Visual Studio, we'll install some tools for Windows 10 IoT Core.

1. [Download](http://go.microsoft.com/fwlink/?LinkId=616848) the ISO for MinnowBoard MAX from the Microsoft Download Center.
2. **Save the ISO** to a local folder

	<img src="{{site.baseurl}}/images/mbm_iso.png">     
	
3. Double clicking on the ISO (IoT Core MBM.iso) will automatically mount it as a virtual CD drive so you can access the contents. 
	
	<img src="{{site.baseurl}}/images/mbm_msi.PNG">  
	
4. Install **Windows_10_IoT_Core_Mbm.msi**. When installation is complete, flash.ffu will be located at **C:\Program Files (x86)\Microsoft IoT\FFU\MinnowBoardMax**
	
	<img src="{{site.baseurl}}/images/mbmffu.PNG">
	
5. Eject the Virtual CD when done