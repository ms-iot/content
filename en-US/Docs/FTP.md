---
layout: docs
title: Using FTP
description: Using FTP to transfer files to and from your Windows 10 IoT Core device
keyword: FTP, windows iot, remote
permalink: /en-US/Docs/FTP.htm
lang: en-US
---


# Using FTP to transfer files to and from your Windows 10 IoT Core device

## Starting the FTP server on your device
___
* By default, the FTP server is disabled on your IoT Core device.  In order to start the FTP server on your device, first you need to connect to your device through [PowerShell]({{site.baseurl}}/{{page.lang}}/Docs/PowerShell.htm) or [SSH]({{site.baseurl}}/{{page.lang}}/Docs/SSH.htm).
* Type `start C:\Windows\System32\ftpd.exe`
* You can check that the server is running by typing `tlist`, which will list all the running processes.  If the FTP server is running, you should see `ftpd.exe` in the list.

    ![FTP Start]({{site.baseurl}}/Resources/images/ftp/ftp_start.png)

## Stopping the FTP server on your device<a name="stopftp"/>
___
* In order to stop the FTP server on your IoT Core device, first you need to connect to your device through [PowerShell]({{site.baseurl}}/{{page.lang}}/Docs/PowerShell.htm) or [SSH]({{site.baseurl}}/{{page.lang}}/Docs/SSH.htm).  
* If you connected using PowerShell, type `kill -processname ftpd*` to stop the FTP process.

    ![FTP PowerShell Stop]({{site.baseurl}}/Resources/images/ftp/ftp_kill_powershell.png)
    
* If you connected using SSH, type `kill ftpd*` to stop the FTP process.

    ![FTP SSH Stop]({{site.baseurl}}/Resources/images/ftp/ftp_kill_ssh.png)
	
## Accessing your files over FTP<a name="accessftp"/>
___
* The FTP server on your IoT Core device starts automatically on boot.  In order to connect to it, you need the IP address of your device.  You can find the IP address on the default app that boots when your device starts.

    ![DefaultApp on Windows IoT Core]({{site.baseurl}}/Resources/images/DefaultApp.png)
    
* Once you have the IP, open up **File Explorer** on your PC and type `ftp://<TARGET_DEVICE>`, where `<TARGET_DEVICE>` is either the name or the IP address of your device, then hit Enter.  Enter your administrator username and password if prompted.

    ![FTP explorer]({{site.baseurl}}/Resources/images/ftp/ftp_explorer.png)

* Now you can access the files on your device through FTP.

## Changing the root FTP directory
___
* By default the FTP server displays all the folders in the device's root directory C:\\.  In order to change the root directory, follow the same steps to start the FTP server, except you need to pass in the root directory as a parameter.
* In order to change it, first connect to your device through [PowerShell]({{site.baseurl}}/{{page.lang}}/Docs/PowerShell.htm) or [SSH]({{site.baseurl}}/{{page.lang}}/Docs/SSH.htm).
* [Stop](#stopftp) the FTP process if it's already running.
* Type `start C:\Windows\System32\ftpd.exe <PATH_TO_DIRECTORY>`, where `<PATH_TO_DIRECTORY>` is the absolute path to the directory you want to set as the root directory, such as `C:\Users\DefaultAccount`.

    ![FTP Start with Parameter]({{site.baseurl}}/Resources/images/ftp/ftp_start_parameter.png)
    
* Now when you [connect](#accessftp) to your device through FTP, you will see the contents of the root directory you set.

    ![FTP explorer with new root directory]({{site.baseurl}}/Resources/images/ftp/ftp_explorer_parameter.png)

* In order to make this change permanent, you need to edit the script that starts the FTP server when the device turns on.  To do this, open up **File Explorer** and type `\\<TARGET_DEVICE>\c$\Windows\System32`, where `<TARGET_DEVICE>` is either the name or the IP address of your device.

    ![FTP explorer edit script]({{site.baseurl}}/Resources/images/ftp/ftp_edit_script.png)
    
* Find `IoTStartupOnBoot.cmd`, right-click it, and click **Edit**.

    ![FTP explorer right-click]({{site.baseurl}}/Resources/images/ftp/ftp_right_click.png)
    
* If a security dialog pops up, just click **Run**.

    ![FTP security dialog]({{site.baseurl}}/Resources/images/ftp/ftp_security_warning.png)
    
* Your default text editor should now open.  Find the line that contains `start ftpd.exe`.

    ![FTP command]({{site.baseurl}}/Resources/images/ftp/ftp_edit_command.png)

* Change it to `start ftpd.exe <PATH_TO_DIRECTORY>`, where `<PATH_TO_DIRECTORY>` is the absolute path to the directory you want to set as the root directory, such as `C:\Users\DefaultAccount`.  Then save the file and close the window.

    ![FTP new command]({{site.baseurl}}/Resources/images/ftp/ftp_save.png)
    
* Now when you reboot your device, the FTP server will start with your new root directory.