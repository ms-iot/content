---
layout: docs
title: Remote Console App Debugging
description: How to debug a console app remotely on IoT Core
permalink: /en-US/Docs/RemoteDebugging.htm
lang: en-US
---

# Remote Console App Debugging

Here's how to debug your IoT Core console application remotely in Visual Studio:

* You will first need to setup the Remote Debugger on your Windows IoT Core device. First follow the steps [here]({{site.baseurl}}/{{page.lang}}/Docs/AppDeployment) to deploy any other Universal Windows Application on your device (try the HelloWorld project). This will copy all the required binaries to your device. 

* To start the remote debugger on your device, open a Web Browser on your PC and point it to `http://<device name/IP address>:8080` to launch [Windows Device Portal]({{site.baseurl}}/{{page.lang}}/Docs/tools/DevicePortal). In the credentials dialog, use the default username and password: `Administrator`, `p@ssw0rd`. Windows Device Management should launch and display the web management home screen.

* Now navigate to the Debug settings section of Windows Device Portal and click the Start button under Start Visual Studio Remote Debugger. 

    ![WindowsDevicePortalDebugSettings Start remote debugger]({{site.baseurl}}/Resources/images/Console/device_portal_start_debugger.png)

* This will show pop-up a message box and give you the connection information. 

*  In Visual Studio, you can configure your target by editing your project's properties (be sure to make all of the highlighted changes as appropriate to your board's name or IP address):

    ![ConsoleApplication Remote Machine Project Settings]({{site.baseurl}}/Resources/images/Console/console_project_settings.png)

        Note: You can use the IP address instead of the Windows IoT Core device name.

* The project configuration needs to be modified to enable deployment.  To do this, open the Configuration Manager by selecting the Configuration manger from the Solution Configuration drop-down menu on the toolbar.

    ![ConsoleApplication SolutionConfiguration]({{site.baseurl}}/Resources/images/Console/configuration_management.png)

    From the Configuration Manager, ensure that the Deploy checkbox is selected for your project configuration (if this options is disabled, it is likely that the deployment options have not been fully entered into the Debugging tab of the project properties)

    ![ConsoleApplication Remote Machine Project Settings]({{site.baseurl}}/Resources/images/Console/deploy_checkbox.png)

* Now we're ready to deploy to the remote Windows IoT Core device. Simply press F5 (or select Debug \| Start Debugging) to start debugging our app. You can also use Build \| Deploy Solution to simply deploy your application without starting a debug session.

        NOTE: When run from Visual Studio, the output will not display anywhere, but you will be able to set breakpoints, see variable values, etc.

* To stop the app, press on the 'Stop Debugging' button (or select Debug \| Stop Debugging).

* You can now run the application.  Simply open a PowerShell/SSH connection (instructions can be found [here for powershell]({{site.baseurl}}/{{page.lang}}/Docs/PowerShell) and [here for SSH]({{site.baseurl}}/{{page.lang}}/Docs/SSH)) and enter the Remote Command you specified above.

    ![ConsoleApplication Output]({{site.baseurl}}/Resources/images/Console/console_output.png)

* Once you are done debugging your application, remember to stop the remote debugger on the Windows IoT Core device. You can do this by navigating to Debug settings section of Windows Device Portal and clicking on the Stop Remote Debugger button.

    ![WindowsDevicePortalDebugSettings Stop remote debugger]({{site.baseurl}}/Resources/images/Console/device_portal_stop_debugger.png)

