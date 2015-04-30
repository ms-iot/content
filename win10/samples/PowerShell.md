---
layout: default
title: Use PowerShell to connect to a Windows IoT Core device.
permalink: /win10/samples/PowerShell.htm
---

<div class="container" markdown="1">
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

* From the PS console, type the following, substituting `<machine-name or IP Address>` with the appropriate value (using your **machine-name** is the easiest to use, but if your device is not uniquely named on your network, try the IP address):

        Set-Item WSMan:\localhost\Client\TrustedHosts -Value <machine-name or IP Address>

    Do enter `Y` to confirm the change.

* Note: there is a known issue with PS that can cause a StackOverflowException on the PS client machine.  To work around this type the following line before the Enter-PsSession:

        remove-module psreadline -force

* Note: you may need to start the WinRM service on your desktop to enable remote connections using the following command:

        net start WinRM

* Now you can start a session with you Windows IoT Core device. From you administrator PS console, type:

        Enter-PsSession -ComputerName <machine-name or IP Address> -Credential <machine-name or IP Address or localhost>\Administrator

    In the credential dialog enter the following default password: `p@ssw0rd`

        NOTE: The connection process is not immediate and can take up to 30 seconds.

* **Update account password:**

	It is **highly recommended** that you update the default password for the Administrator account. 
    
    To do this, issue the following commands in your PowerShell connection: 
    
    * `net user Administrator [new password]` where `[new password]` represents a strong password of your choice.  

    * `schtasks /Delete /TN Microsoft\Windows\IoT\Startup /F`


###Configure your Windows IoT Core device

* To be able to deploy applications from Visual Studio 2015, you will need to make sure the Visual Studio Remote Debugger is running on your Windows IoT Core device. The remote debugger should launch automatically at machine boot time. To double check, use the `tlist` command to list all the running processes from powershell. There should be two instances of msvsmon.exe running on the device.

* It is possible for the Visual Studio Remote Debugger to time out after long periods of inactivity.  If Visual Studio cannot connect to your Windows IoT Core device, try rebooting the device.

* If you want, you can also rename your device. To change the 'computer name', use the `setcomputername` utility:

        setcomputername <new-name>

    You will need to reboot the device for the change to take effect. You can use the `shutdown` command as follows:

        shutdown /r /t 0

###Commonly used utilities

Below is a list of common configuration tasks and corresponding utilities that have been made available in PowerShell.

* **Update account password:**

	It is highly recommended that you update the default password for the Administrator account. To do this, you can issue the following command: `net user Administrator [new password]` where `[new password]` represents a strong password of your choice.

* **Create local user accounts:**

	If you wish to give others access to your Windows IoT Core device, you can create additional local user accounts using PS by typing in `net user [username] [password] /add`. If you wish to add this user to other groups, such as the Administrator group, use `net localgroup Administrators [username] /add`.

* **Query and set device name:**

	To identify your current device name, simply type `hostname`. To change the name of your Windows IoT Core device, type `SetComputerName [new machinename]`. You may need to restart your device for the name change to take effect.

* **Basic network configuration:**

	Many of the basic network configuration utilities you may already be familiar with are available in Windows IoT Core, including commands such as `ping.exe`, `netstat.exe`, `netsh.exe`, `ipconfig.exe`, `nslookup.exe`, `tracert.exe`, and `arp.exe`.

* **Copy utilities:**

	Microsoft is providing familiar tools, including `sfpcopy.exe` as well as `xcopy.exe`.

* **Process Management:**

	To view currently running processes, you can try either `get-process` or alternatively `tlist.exe`. To stop a running process, type `kill.exe [pid or process name]`. To start a process,

* **Setting startup app:**

	Use the startup editor to configure startup apps on your Windows IoT Core device. To see a list of current startup apps, type `startup.exe /d`. To add an app to startup, `type startup.exe /a [Name] [Command]`. For further help, try `startup.exe /?`

* **Headless vs. headed boot:**

	Windows IoT Core devices can be set to headed (when display capabilities are required) or headless (when a display is not required or available) device mode. To change this setting, use `setbootoption.exe [headed | headless]`.

* **Task scheduler:**

	To view the current list of scheduled tasks, use the `schtasks.exe` command. You can create new tasks with the `/create` switch or run on-demand tasks with the `/run` switch. For a full list of supported parameters, use `schtasks.exe /?`

* **Device drivers:**

	The device console utility is useful in identifying and managing installed devices and drivers. For a full list of parameters, use `devcon.exe /?`

* **Registry Access:**

	If you need to access the registry to view or modify settings, use the `reg.exe /?` Command for the full list of supported parameters.

* **Services:**

	Managing Windows services can be accomplished via the `net.exe` command. To see a list of running services, type `net start`. To start or stop a specific service, type `net [start | stop] [service name]`. Alternatively, you can also use the service control manager via `sc.exe` command.

* **Boot configuration:**

	You can make changes to the boot configuration of your Windows IoT Core device using `bcdedit.exe`. For instance, you can enable testsigning with `bcdedit –set testsigning` on command.

* **Shutdown/restart device:**

	To shut down your device, type `shutdown /s /t 0`. To restart the device, use the `/r` switch instead with the command `shutdown /r /t 0`.

See the [Command Line Utils]({{site.baseurl}}/win10/tools/CommandLineUtils.htm) page for a list of commands and utilities you can use with PowerShell.

</div>
