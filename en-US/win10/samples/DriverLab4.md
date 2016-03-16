---
layout: default
title: Driver Lab - Use Visual Studio to deploy a driver
permalink: /en-US/win10/samples/DriverLab4.htm
lang: en-US
---

## Use Visual Studio to deploy a driver 

In this exercise, you will configure your Visual Studio driver project so that you can compile and deploy a driver for a specific platform during driver development phase.  Note that currently this procedure requires that your target device reboot after the driver is deploy and as a result it may take a couple of minutes for the entire deployment to complete.
For this exercise you can use the gpiokmdfdemo sample driver found [here](https://github.com/ms-iot/samples/tree/develop/DriverSamples).

### On the target device
This section describes the steps required to configure your target device for driver development.

* Make sure that your device has an IoTCore image installed by following the instructions [here]({{site.baseurl}}/{{page.lang}}/GetStarted.htm).
* Connect to your target device via Powershell as described in the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm).
* For current release there are a few provisioning steps you need to do.  These steps will be automated in the future.
* Now configure your target device so that it can interact with Visual Studio.  Through the PowerShell window enter the commands listed below.
		
		cd c:\windows\system32
		.\sc.exe config sshsvc start=disabled
		.\sc.exe stop sshsvc
		.\sc.exe config TestSirepSvc start=auto
		.\sc.exe start TestSirepSvc
		.\reg.exe add HKLM\SOFTWARE\Microsoft\SystemCertificates\Root\Certificates\8a334aa8052dd244a647306a76b8178fa215f344
		
Your target device is now configured for driver development using Visual Studio.

### On the development computer

* Install the Windows Driver Kit on your development machine by following the instructions [here](https://msdn.microsoft.com/en-US/windows/hardware/dn913721(v=vs.8.5).aspx).  You will need to install the SDK and WDK.

* Install the certificates so that the driver is signed correctly and can run on your target device.  In later steps, when you sign your driver make sure to use the 'WDKTestCert'. From a command prompt execute the commands listed below:

		cd c:\Program Files (x86)\Windows Kits\10\Tools\bin\i386
		Set WPDKContentRoot=c:\Program Files (x86)\Windows Kits\10		
		InstallOEMCerts.cmd

 Add your target device to Visual Studio
* Open Visual Studio and select Driver > Test > Configure Devices > Add New Device
* Enter a user friendly Display Name for your target device
* Select Device Type = Mobile
* For Choose Device find and highlight your device.  You can find your device by matching the IP address of your device the one listed in the Choose Device window.
* Click Next to move to the next step.
* Assure that Host IP matches the IP address of your development machine.
* Click Next to move to the next step.
* Click Finish to complete the configuration.
	
 Configure your Visual Studio project 
* Make sure the Target Platform Version matches the SDK installed on your development machine. Select Project Properties from the Solution Explorer window.  Under General Configuration Properties assure that the Target Platform Version matches the SDK installed on your development computer.  You can check the version of the SDK from the Control Panel > Programs > Programs and Features. 
* Under Project Properties > Driver Signing > Test Certificate select test certificate
* Always update the package version each and every time a new compiled driver is to be deployed to the target device.  Any number is fine, just keep incrementing the number.  The package version is found under Project Properties > PackageGen > Version
* Your Visual Studio project is now ready to build and deploy a driver to your target device.
	

* Next, if you are using the sample gpiokmdfdemo driver you need to generate ACPI table and copy to your target device.  Follow the steps [here]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab2.htm).


Build and install the demo driver using Visual Studio

* From the Build menu, click `Build Solution(Ctrl+Shift+B)`. Make sure that you are building for `x86` if you are using a MinnowBoard Max, or `ARM` if you are using a Raspberry Pi 2 or 3.  Visual Studio will build your driver and deploy the driver to your target device.

    ![Driver Settings properties]({{site.baseurl}}/Resources/images/DriverLab/driver-build-option.png)

* The target device will reboot.  After the reboot, make sure PowerShell is still connected to it, otherwise, re-connect to the target device using the PowerShell `enter-pssession` command as described [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm).

* Your driver will now be installed on your target device.
* You can check the status of the driver by following the steps [here]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab3.htm).
* Please refer to the web site [here](https://msdn.microsoft.com/en-US/windows/hardware/dn913721(v=vs.8.5).aspx) for information on creating driver new driver and using Visual Studio to deploy the driver as discussed on this page.
