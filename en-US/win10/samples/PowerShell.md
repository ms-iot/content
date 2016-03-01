---
layout: default
title: Use PowerShell to connect to a Windows 10 IoT Core device.
permalink: /en-US/win10/samples/PowerShell.htm
lang: en-US
---

## Using PowerShell to connect and configure a device running Windows 10 IoT Core

### Remote Administration and Configuration
You can remotely configure and manage any Windows 10 IoT Core device using Windows PowerShell. PowerShell is a task-based command-line shell and scripting language, designed especially for system administration.

Make sure to follow these steps to correctly configure your device running Windows 10 IoT Core to work well with Visual Studio 2015.

### Initiating a PowerShell (PS) Session
* To start a PS session with your Windows 10 IoT Core device, you'll first need to create a trust relationship between your host PC and your device. After booting your Windows IoT Core device, an IP address will be shown on the screen attached to the device:

    ![DefaultApp on Windows 10 IoT Core]({{site.baseurl}}/Resources/images/DefaultApp.png)

    You can find the same information on the Windows 10 IoT Core Dashboard utility.

* Launch an administrator PS console on your local PC. The easiest way to do this is to type 'powershell' in the "Search the web and Windows" textbox near the Windows Start Menu: Windows will find PowerShell on your machine:

    ![Find PowerShell]({{site.baseurl}}/Resources/images/powershell/start-ps.png)

    To start PS as an administrator, right click on the "Windows PowerShell" entry and select "Run as administrator":

    ![Run PowerShell as administrator]({{site.baseurl}}/Resources/images/powershell/start-ps2.png)

    Now you should see the PS console:

    ![PowerShell console]({{site.baseurl}}/Resources/images/powershell/ps.PNG)

	**NOTE:** you may need to start the WinRM service on your desktop to enable remote connections. From the PS console type the following command:

        net start WinRM

* From the PS console, type the following, substituting `<machine-name or IP Address>` with the appropriate value (using your **machine-name** is the easiest to use, but if your device is not uniquely named on your network, try the IP address):

        Set-Item WSMan:\localhost\Client\TrustedHosts -Value <machine-name or IP Address>

    Do enter `Y` to confirm the change.

	**NOTE:** If you want to connect multiple devices, you can use comma and quotation marks to separate each devices.
        
        Set-Item WSMan:\localhost\Client\TrustedHosts -Value "<machine1-name or IP Address>,<machine2-name or IP Address>"
	
* Now you can start a session with your Windows IoT Core device. From you administrator PS console, type:

        Enter-PSSession -ComputerName <machine-name or IP Address> -Credential <machine-name or IP Address or localhost>\Administrator

    In the credential dialog enter the following default password: `p@ssw0rd`
    
  **NOTE:** The connection process is not immediate and can take up to 30 seconds.

    If you successfully connected to the device, you should see the IP address of your device before the prompt.

    ![PowerShell console]({{site.baseurl}}/Resources/images/powershell/ps_device.png)

* **Update account password:**

	It is **highly recommended** that you update the default password for the Administrator account.

    To do this, issue the following commands in your PowerShell connection:

    Replace `[new password]` with a strong password:

        net user Administrator [new password]
        
    Once this is done, you'll need to establish a new PowerShell session using Exit-PSSession and Enter-PSSession with the new credentials.
    
    	Exit-PSSession
    	
    	Enter-PSSession -ComputerName <machine-name or IP Address> -Credential <machine-name or IP Address or localhost>\Administrator

### Troubleshooting Visual Studio Remote Debugger

* To be able to deploy applications from Visual Studio 2015, you will need to make sure the Visual Studio Remote Debugger is running on your Windows IoT Core device. The remote debugger should launch automatically at machine boot time. To double check, use the `tlist` command to list all the running processes from powershell. There should be two instances of msvsmon.exe running on the device.

* It is possible for the Visual Studio Remote Debugger to time out after long periods of inactivity.  If Visual Studio cannot connect to your Windows IoT Core device, try rebooting the device.

### Configure your Windows IoT Core device

* If you want, you can also rename your device. To change the 'computer name', use the `setcomputername` utility:

        setcomputername <new-name>

    You will need to reboot the device for the change to take effect. You can use the `shutdown` command as follows:

        shutdown /r /t 0

    After you reboot, since the computer name was changed, you will need to rerun this command in order to connect to your device using the new name:

        Set-Item WSMan:\localhost\Client\TrustedHosts -Value <new-name>
        
    Your Windows IoT Core Device should now be properly configured and ready to use!

### Commonly used utilities

See the [Command Line Utils]({{site.baseurl}}/{{page.lang}}/win10/tools/CommandLineUtils.htm) page for a list of commands and utilities you can use with PowerShell.

### Known issues with workarounds

**Issue:** A known bug in PowerShell security policies causes the following issues to manifest within the remote session:

* Get-Help returns unexpected matches.

* Get-Command on a specified module returns empty command list.

* Running a cmdlet from any of these modules throws CommandNotFoundException: Appx, NetAdapter, NetSecurity, NetTCPIP, PnpDevice.

* Import-Module on any of the above modules throws PSSecurityException exception with UnauthorizedAccess. Module auto loading does not seem to work either.

**Workaround:** Modify the execution policy within the remote PowerShell session to "RemoteSigned". For more details on the different execution policies, please refer to [https://technet.microsoft.com/en-us/library/ee176961.aspx](https://technet.microsoft.com/en-us/library/ee176961.aspx){:target="_blank"}.

**Issue:** Cmdlets from some modules like NetAdapter are sometimes not visible. For example, Get-Module NetAdapter returns an empty list. 

**Workaround:** Use the '-Force' parameter with Import-Module. For example, `Import-Module NetAdapter -Force`.

**Issue:** Setting execution policy to "AllSigned" breaks PS Remoting. Subsequent attempts to create a remote session fail with a SecurityException loading Typesv3.ps1xml. 

**Workaround:** Use winrs.exe to restore Powershell's execution policy:

* Change console code page `Chcp 65001`
* Logon to a remote cmd.exe shell `Winrs.exe -r:<target> -u:<username> -p:<password> cmd.exe`
* Within remote cmd.exe, modify the appropriate registry key `reg add HKLM\Software\Microsoft\PowerShell\1\ShellIds\Microsoft.PowerShell /v ExecutionPolicy /d RemoteSigned /f`
* Exit remote cmd.exe session `exit`

### Other known issues

* In PS scripts, attributes  to PowerShell class or enumeration do not work. Adding attributed, results in the following exception thrown: 'Type must be a runtime Type object.'

* Outbound CIM and PS Remoting is not supported. Relevant functionality in relying cmdlets will not work. These include: Enter-PSSession, Get-Job, Receive-Job, Import-Module, Invoke-Command, Copy-Item.

* SecureString commands 'ConvertFrom-SecureString' and 'ConvertTo-SecureString' do not work unless the session is created using CredSSP authentication. Otherwise, the '-Key' parameter must be specified. Please see [http://blogs.msdn.com/b/clustering/archive/2009/06/25/9803001.aspx](http://blogs.msdn.com/b/clustering/archive/2009/06/25/9803001.aspx){:target="_blank"} for details on configuring CredSSP authentication.
