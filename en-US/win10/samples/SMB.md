---
layout: default
title: Using Windows File Sharing
permalink: /en-US/win10/samples/SMB.htm
lang: en-US
---

## Using Windows file sharing to transfer files to and from your device

### Accessing your files using Windows file sharing
* The file sharing server on your Windows IoT Core device starts automatically on boot.  In order to connect to it, you need the IP address of your device.  You can find the IP address on the default app that boots when your device starts.

    ![DefaultApp on Windows IoT Core]({{site.baseurl}}/Resources/images/DefaultApp.png)
    
* Once you have the IP, open up **File Explorer** on your computer and type `\\<TARGET_DEVICE>\c$`, where `<TARGET_DEVICE>` is either the name or the IP Address of your Windows IoT Core device, then hit Enter.  Enter your administrator username and password if prompted. The username should be prefixed with the IP Address of your Windows IoT Core device. Example: '192.168.1.118\Administrator'.

    ![File explorer]({{site.baseurl}}/Resources/images/smb/smb_file_explorer.png)

* Now you can access the files on your device using Windows file sharing.

### Starting and stopping the file sharing server
* Connect to your device through [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) or [SSH]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm).
* By default the file sharing  server is started when the device is booted.
* To stop the file sharing  server, type `net stop Server /y`
* To start the file sharing  server, type `net start Server`

    ![Server start and stop]({{site.baseurl}}/Resources/images/smb/smb_start_stop.png)
    
### Disabling and enabling the file sharing server on startup
* Connect to your device through [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) or [SSH]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm).
* By default the file sharing  server is started when the device is booted.
* To disable the file sharing  server so that it does not start when the device starts, type `reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\services\lanmanserver /v Start /t REG_DWORD /d 0x3 /f`
* To enable the file sharing  server so that starts when the device starts, type `reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\services\lanmanserver /v Start /t REG_DWORD /d 0x2 /f`

    ![Server enable disable]({{site.baseurl}}/Resources/images/smb/smb_enable_disable.png)
