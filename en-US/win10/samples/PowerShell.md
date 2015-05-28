---
layout: default
title: Use PowerShell to connect to a Windows IoT Core device.
permalink: /en-US/win10/samples/PowerShell.htm
lang: en-US
---

##Using PowerShell to connect and configure a device running Windows IoT Core

### Remote Administration and Configuration
You can remotely configure and manage any Windows IoT Core device using Windows PowerShell. PowerShell is a task-based command-line shell and scripting language, designed especially for system administration.

Make sure to follow these steps to correctly configure your VM or device running Windows IoT Core to work well with VisualStudio 2015.

###Initiating a PowerShell (PS) Session
* To start a PS session with your Windows IoT Core device, you'll first need to create a trust relationship between your host PC and your device. After booting your Windows IoT Core device, an IP address will be shown on the screen attached to the device:

    ![DefaultApp on Windows IoT Core]({{site.baseurl}}/images/DefaultApp.png)

    You can find the same information on the Windows IoT Core Watcher utility.

* Launch an administrator PS console on your local PC. The easiest way to do this is to type 'powershell' in the "Search the web and Windows" textbox near the Windows Start Menu: Windows will find PowerShell on your machine:

    ![Find PowerShell]({{site.baseurl}}/images/powershell/start-ps.png)

    To start PS as an administrator, right click on the "Windows PowerShell" entry and select "Run as administrator":

    ![Run PowerShell as administrator]({{site.baseurl}}/images/powershell/start-ps2.png)

    Now you should see the PS console:

    ![PowerShell console]({{site.baseurl}}/images/powershell/ps.PNG)

* Note: you may need to start the WinRM service on your desktop to enable remote connections. From the PS console type the following command:

        PS C:\> net start WinRM

* From the PS console, type the following, substituting `<machine-name or IP Address>` with the appropriate value (using your **machine-name** is the easiest to use, but if your device is not uniquely named on your network, try the IP address):

        PS C:\> Set-Item WSMan:\localhost\Client\TrustedHosts -Value <machine-name or IP Address>

    Do enter `Y` to confirm the change.

* Note: there is a known issue with PS that can cause a StackOverflowException on the PS client machine.  To work around this type the following line before the Enter-PsSession:

        PS C:\> remove-module psreadline -force

* Now you can start a session with you Windows IoT Core device. From you administrator PS console, type:

        PS C:\> Enter-PsSession -ComputerName <machine-name or IP Address> -Credential <machine-name or IP Address or localhost>\Administrator

    In the credential dialog enter the following default password: `p@ssw0rd`

        NOTE: The connection process is not immediate and can take up to 30 seconds.

    If you successfully connected to the device, you should see the IP address of your device before the prompt.

    ![PowerShell console]({{site.baseurl}}/images/powershell/ps_device.png)

* **Update account password:**

	It is **highly recommended** that you update the default password for the Administrator account.

    To do this, issue the following commands in your PowerShell connection:

    Replace `[new password]` with a strong password:

        [192.168.0.243]: PS C:\> net user Administrator [new password]

    The following command only needs to be run once:

        [192.168.0.243]: PS C:\> schtasks /Delete /TN Microsoft\Windows\IoT\Startup /F

###Configure your Windows IoT Core device

* To be able to deploy applications from Visual Studio 2015, you will need to make sure the Visual Studio Remote Debugger is running on your Windows IoT Core device. The remote debugger should launch automatically at machine boot time. To double check, use the `tlist` command to list all the running processes from powershell. There should be two instances of msvsmon.exe running on the device.

* It is possible for the Visual Studio Remote Debugger to time out after long periods of inactivity.  If Visual Studio cannot connect to your Windows IoT Core device, try rebooting the device.

* If you want, you can also rename your device. To change the 'computer name', use the `setcomputername` utility:

        [192.168.0.243]: PS C:\> setcomputername <new-name>

    You will need to reboot the device for the change to take effect. You can use the `shutdown` command as follows:

        [192.168.0.243]: PS C:\> shutdown /r /t 0

    After you reboot, you may need to rerun this command in order to connect to your device using the new name:

        PS C:\> Set-Item WSMan:\localhost\Client\TrustedHosts -Value <new-name>

###Commonly used utilities

See the [Command Line Utils]({{site.baseurl}}/{{page.lang}}/win10/tools/CommandLineUtils.htm) page for a list of commands and utilities you can use with PowerShell.
