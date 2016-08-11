---
layout: sample
title: HID Injection Sample
permalink: /en-US/samples/HidInjection.htm
samplelink: https://github.com/ms-iot/samples/tree/develop/HIDInjection
lang: en-US
---
# HID Injection
Input injection is needed for many reasons. One of the most requested reasons is to support SPI screens, which have capacitive or resistive touch panels which can be read via I<sup>2</sup>C. 
How do you translate this touch input from the display panel to something Windows can consume?    

Windows 10 IoT Core does not contain the traditional Win32 API [SendInput](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646310(v=vs.85).aspx). SendInput it is tightly bound to the legacy input system, which is not present in the image. 
IoT Core does not currently have a replacement for this API, but we hope to introduce a compatible API in the future. In the meantime, this sample will allow you to deploy a driver to perform low level injection of touch, keyboard and
 mouse events, and can be used until the SendInput equivelent API is available.

The HID Injection sample leverages the [Virtual HID Framework](https://msdn.microsoft.com/en-us/library/windows/hardware/dn925056(v=vs.85).aspx). 

# Prerequisites 
In order to build this driver you will need the following:

  * [Visual Studio 2015 Update 2](http://go.microsoft.com/fwlink/?LinkId=691129) or later.
  * [Windows 10 Driver Development Kit](http://go.microsoft.com/fwlink/p/?LinkId=526733).
  * [Windows 10 Assessment and Deployment Kit](https://msdn.microsoft.com/en-us/windows/hardware/dn913721(v=vs8.5).aspx#winADK).
  * Download the [ms-iot Samples repository](https://github.com/ms-iot/samples/archive/develop.zip) from GitHub, then expand it.
  * [Adafruit USB to TTL Cable](https://www.adafruit.com/products/954) for Kernel Debugging.

Optional:

  * If you have git or the github app installed, you can clone the repository as well.

## Set up the Kernel Debugger
  1. Set up the Kernel debugger for your device by following the [WinDBG instructions]({{site.baseurl}}/{{page.lang}}/Docs/Windbg.htm). 

## Building and Deploying the HID Injector
  1. Be sure you've installed the Visual Studio update and the Windows 10 Driver Development kit before continuing.
  1. On your development machine, use Windows Explorer to navigate to the folder where you downloaded or cloned samples.
  1. Open the project located ```Samples\HidInjector\HidInjector.sln```.
  1. Select the architecture you intend to deploy to: ARM for Raspberry Pi or Dragon Board, x86 for MinnowBoard Max.
  1. You can now build the solution.

### Build the Update package
  1. Open the ```Deployment and Imaging Tools Environment``` from the Start Menu with administrative privileges (Search for the program, then right click on it and select ```Run As Administrator```)
  1. In the command window, cd into your project directory.
  1. cd into the driver directory.
  1. run the script ```CreateDriverPackage.cmd```
  
### Copying the HID Injector to your device
  1. Open a network share on your IoT Core device by opening the Run dialog (Win-R), then entering ```\\\\IP for your IoT Core device\\c$```. Enter credentials if prompted.
  1. Create a ```deploy``` folder on your IoT Core device. 
  1. In Visual Studio, Right Click on the HidInjectorKd project, then select ```Open Folder in File Explorer```.
  1. In the File Explorer that opened on your project, Navigate to the driver directory.
  1. Now, copy the Microsoft.HidInjectionSample.HidInjectionSample.cab to the network folder you opened in the first step.
  
### Installing the HID Injector
   1. Use [SSH]({{site.baseurl}}/{{page.lang}}/Docs/SSH.htm) or [Powershell]({{site.baseurl}}/{{page.lang}}/Docs/PowerShell.htm) to connect to your device. 
   1. Once connected, change to your deployment direcory by typing ```cd deploy```.
   1. Now prepare the install of the driver by typing ```ApplyUpdate -stage Microsoft.HidInjectionSample.HidInjectionSample.cab```.
   1. Now commit the install by typing ```ApplyUpdate -commit```.
   1. Your IoT Core device will reboot, and apply the update.
   
### Verify installation
If you've installed the driver, verify the install by navigating to the Web management console ```http://<your device ip>:8080/devicemanager.htm``` 
and looking for the ```HID Injection Sample``` node.
   
## HID Injector Sample Application
Included in the solution is a C++ console application used to demonstrate communication with the Hid injection Driver. The Driver is discovered by class using ```CM_Get_Device_Interface_List```. 
The sample application will inject Touch, Keyboard and Mouse events by synthesizing a HID block, and calling the driver with that block. The Sample application is C++ 
which requires the [console app procedures for deploying]({{site.baseurl}}/{{page.lang}}/Docs/AppDeployment.htm). 



 

 
    
  





  
