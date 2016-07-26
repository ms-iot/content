---
layout: docs
title: Windows Device Portal
description: Connect to, control, configure, and get advanced diagnostics about your machine from the web
keyword: windows iot, remote, diagnostics
permalink: /en-US/Docs/DevicePortal.htm
lang: en-US
---

# Windows Device Portal
   The Windows Device Portal (WDP) lets you configure and manage your device remotely over a network.
   The main features are documented on the [Windows Device Portal overview page](https://msdn.microsoft.com/en-us/windows/uwp/debug-test-perf/device-portal)

![Device Portal Home]({{site.baseurl}}/Resources/images/deviceportal/deviceportal.png)

## Shared Documentation
___
WDP is a developer tool shared among all Windows 10 devices. Each product has it's unique features, but the core functionality is the same.
Documentation for the main features are found on the [Windows Device Portal overview page](https://msdn.microsoft.com/en-us/windows/uwp/debug-test-perf/device-portal)
The rest of the documentation below will be IoT specific.

## Set up
___
1. Connect your board to the internet

    To get WDP up and running, you first need to connect your device to your network. To do so, connect an Ethernet cable from your board into to your local network.

2. Find your device's IP address

    If your device is connected to a monitor, your IP address is listed on the front page. If you do not see an IP address, your board is not properly connected to your network. ![DefaultApp IP]({{site.baseurl}}/Resources/images/DevicePortal/defaultapp_ip.png)
    
    {% include note.html text="Windows 10 IoT Core Dashboard can also be used to find your device's IP address within **My devices**."%}   
    
3. Connect to WDP through your browser

    Enter the IP address into the address bar. Add :8080 onto the end.![Browser IP]({{site.baseurl}}/Resources/images/DevicePortal/browser_ip.png)
    Unless changed, the default credentials are: Username: `Administrator` Password: `p@ssw0rd`
    {% include note.html text="You can also launch WDP directly from the Windows 10 IoT Core Dashboard - right click on your device and select **Open in Device Portal**" %}   
    

## IoT specific features
___

### Apps
Provides install/uninstall functionality for AppX packages and bundles on your device.
{% include imageborder.html alt="App list" link="/Resources/images/DevicePortal/AppList.png" %}
IoT Core is unique in that it only allows one foreground app to run at one time. The app list is modified to ensure that this is the case. Under the **STARTUP** column, you can select as many background applications to start by default, but can only set one foreground application.  

### App File Explorer
The app file explorer only shows the directories that your apps can see. 
* CameraRoll is shared among all apps
* Documents is shared among all apps
* LocalAppData contains folders specific to each app. This folder will be the same name as your app and other apps cannot access it.

### Debugging

#### Kernel dumps
{% include imageborder.html alt="App list" link="/Resources/images/DevicePortal/Debug1.png" %}
Any system crashes will automatically be logged and available to view through the web management tool.  You can then download the kernel dump and try to figure out what's going on.

#### Process dumps
{% include imageborder.html alt="App list" link="/Resources/images/DevicePortal/Debug2.png" %}
This is similar to Live kernel dumps, but for the user mode processes. 
Clicking the **download** button will cause a 'minidump', and the entire state of that process will be downloaded. This is good for debugging hanging processes.

#### Kernel crash settings
{% include imageborder.html alt="App list" link="/Resources/images/DevicePortal/Debug3.png" %}


### Bluetooth
This page shows you all the bluetooth paired devices and all the devices which are discoverable. To pair with another Bluetooth device, put the device in pairing mode and wait for it to appear in the available devices list.  
{% include imageborder.html alt="App list" link="/Resources/images/DevicePortal/Bluetooth.png" %}

Click on **Pair link** to pair the device. If the device requires a PIN for pairing, it will pop-up a message box displaying the PIN. Once the device is paired, it will show up in the Paired devices list. You can un-pair the device by clicking on **Remove**. 

Once you navigate to the Bluetooth page, your device will be discoverable by other devices. You can also find it from your PC/Phone and pair it from there.

More information on bluetooth can be found on the [bluetooth page](https://go.microsoft.com/fwlink/?linkid=823223).

### IoT Onboarding
ADD TEXT
{% include imageborder.html alt="App list" link="/Resources/images/DevicePortal/OnboardingAllJoyn.png" %}
{% include imageborder.html alt="App list" link="/Resources/images/DevicePortal/OnboardingICS.png" %}
{% include imageborder.html alt="App list" link="/Resources/images/DevicePortal/OnboardingSoftAP.png" %}



### TPM configuration
The Trusted Platform Module (TPM) is a cryptographic coprocessor including capabilities for random number generation, secure generation of cryptographic keys and limitation of their use. It also includes capabilities such as remote attestation and sealed storage. To learn about the TPM and security on IoT Core, visit the [Building secure devices]({{site.baseurl}}/en-US/Docs/BuildingSecureDevices.htm) page and the [TPM]({{site.baseurl}}/en-US/Docs/TPM.htm) page.

### Remote
The Windows IoT Remote Server allows users to see what their device is displaying without connecting a physical monitor to the keyboard.
 


## Additional Information
___

### Changing the default port
1. Launch powershell and [connect to your device.]({{site.baseurl}}/{{page.lang}}/Docs/PowerShell.htm)
2. Set the port:
    {% highlight CS %}
    Reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\IoT\webmanagement /v HttpPort /t REG_DWORD /d <your port number>
    {% endhighlight %}   
	
3. If you want to set the https port

	`Reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\IoT\webmanagement /v UseHttps /t REG_DWORD /d 1 /f`
	
	`Reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\IoT\webmanagement /v HttpsPort /t REG_DWORD /d <your port number> /f`
	
3. Restart the process by restarting service (```net stop webmanagement & net start webmanagement```) it or rebooting the device.


## Additional Resources
___ 

1. [Windows Device Portal overview page](https://msdn.microsoft.com/en-us/windows/uwp/debug-test-perf/device-portal)
2. 