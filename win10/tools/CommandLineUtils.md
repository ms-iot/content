---
layout: default
title: Windows 10 IoT Core Command Line Utils
permalink: /win10/tools/CommandLineUtils.htm
---

<div class="container" markdown="1">

#Windows 10 IoT Core Command Line Utils

Looking to configure some of the settings on your device? The below tools all come pre-installed on your device to help you with that! Use PowerShell to run these commands after [connecting to your device]({{site.baseurl}}/win10/samples/PowerShell.htm).

* **Update account password:**

	It is highly recommended that you update the default password for the Administrator account. To do this, you can issue the following command: `net user Administrator [new password]` where `[new password]` represents a strong password of your choice. 

* **Create local user accounts:** 

	If you wish to give others access to your Windows IoT Core device, you can create additional local user accounts using PS by typing in `net user [username] [password] /add`. If you wish to add this user to other groups, such as the Administrator group, use `net localgroup Administrators [username] /add`. 

* **Set password**

	To change the password on an account on your device, run `SetPassword [account-username] [new-password] [old-password]` to change the account password.
	
* **Query and set device name:** 

	To identify your current device name, simply type `hostname`. To change the name of your Windows IoT Core device, type `SetComputerName [new machinename]`. You may need to restart your device for the name change to take effect. 

* **Basic network configuration:**

	Many of the basic network configuration utilities you may already be familiar with are available in Windows IoT Core, including commands such as `ping.exe`, `netstat.exe`, `netsh.exe`, `ipconfig.exe`, `nslookup.exe`, `tracert.exe`, and `arp.exe`. 

* **Copy utilities:**

	Microsoft is providing familiar tools, including `sfpcopy.exe` as well as `xcopy.exe`. 

* **Process Management:** 

	To view currently running processes, you can try either `get-process` or alternatively `tlist.exe`. To stop a running process, type `kill.exe [pid or process name]`.

* **Setting startup app:** 

	Use the startup editor to configure startup apps on your Windows IoT Core device. Run `Startup` with any of the following options:

	* `Startup /d` displays the list of startup apps.
	
	* `Startup /a [name] [path]` adds an app with name `name` located at path `path` to the list of startup tasks.

	* `Startup /r [name]` removes an app with name `name` from the list of startup tasks.
	
	* For further help, try `startup.exe /?` 
	
* **Set Boot Option (Headless vs. headed boot):** 

	Windows IoT Core devices can be set to headed (when display capabilities are required) or headless (when a display is not required or available) device mode. To change this setting, use `setbootoption.exe [headed | headless]`. 

		NOTE: Changing this setting will require a reboot in order to see the effect.
		
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

* **List Services**

	This utility lists all the NT Services running on your Windows 10 IoT Core device. From a PowerShell session on your device, run `ListServices` to run the utility.

* **Set display resolution**

	To adjust the resolution of a display connected to your Windows 10 IoT Core device, run `SetDisplayResolution [width] [height]`. To query the resolution, exclude the `[width]` and `[height]` parameters.

</div>