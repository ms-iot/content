---
layout: default
title: Use SSH to connect to a Windows IoT Core device.
permalink: /en-US/win10/samples/SSH.htm
lang: en-US
---

## Using SSH to connect and configure a device running Windows IoT Core

### Download a SSH client
In order to connect to your device using SSH, you'll first need to download a SSH client, such as [PuTTY](http://the.earth.li/~sgtatham/putty/latest/x86/putty.exe).

### Connect to your device
* In order to connect to your device, you need to first get the IP address of the device.  After booting your Windows IoT Core device, an IP address will be shown on the screen attached to the device:

    ![DefaultApp on Windows IoT Core]({{site.baseurl}}/Resources/images/DefaultApp.png)

* Now launch PuTTY and enter the IP address in the `Host Name` text box and make sure the `SSH` radio button is selected.  Then click `Open`.

    ![PuTTY Configuration]({{site.baseurl}}/Resources/images/ssh/putty_config.png)

* If you're connecting to your device for the first time from your computer, you may see the following security alert.  Just click `Yes` to continue.

    ![PuTTY Security Alert]({{site.baseurl}}/Resources/images/ssh/putty_security_prompt.png)

* If the connection was successful, you should see `login as:` on the screen, prompting you to login.  
    Enter `Administrator` and press enter.  Then enter the default password `p@ssw0rd` as the password and press enter.

    ![PuTTY Login]({{site.baseurl}}/Resources/images/ssh/putty_login.png)

    If you were able to login successfully, you should see something like this:

    ![PuTTY Console]({{site.baseurl}}/Resources/images/ssh/putty_console.png)

### Update account password

It is **highly recommended** that you update the default password for the Administrator account.

To do this, enter the following command in the PuTTY console, replacing `[new password]` with a strong password:
    
    net user Administrator [new password]
    
### Configure your Windows IoT Core device
* To be able to deploy applications from Visual Studio 2015, you will need to make sure the Visual Studio Remote Debugger is running on your Windows IoT Core device. The remote debugger should launch automatically at machine boot time. To double check, use the tlist command to list all the running processes from powershell. There should be two instances of msvsmon.exe running on the device.

* It is possible for the Visual Studio Remote Debugger to time out after long periods of inactivity. If Visual Studio cannot connect to your Windows IoT Core device, try rebooting the device.

* If you want, you can also rename your device. To change the 'computer name', use the `setcomputername` utility:

        setcomputername <new-name>

    You will need to reboot the device for the change to take effect. You can use the `shutdown` command as follows:

        shutdown /r /t 0
        
### Commonly used utilities

See the [Command Line Utils]({{site.baseurl}}/{{page.lang}}/win10/tools/CommandLineUtils.htm) page for a list of commands and utilities you can use with SSH.
