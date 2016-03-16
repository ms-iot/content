---
layout: default
title: Console App Sample
permalink: /en-US/win10/samples/ConsoleApp.htm
lang: en-US
---

## MemoryStatus Console Application Sample

{% include VerifiedVersion.md %}

We'll create a simple console application that can be used to query the memory usage on your Windows IoT Core device (Raspberry Pi 2 or 3, MinnowBoard Max, or a DragonBoard). Please note that you need to compile the project for ARM for Raspberry Pi 2 or 3 or DragonBoard and x86 for MinnowBoard Max.

### Load the project in Visual Studio

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\MemoryStatus`.  Make a copy of the folder on your disk and open the project from Visual Studio.

### To create your own project in Visual Studio

* Create a new project (File \| New Project...). In the 'New Project' dialog, navigate to 'Windows IoT Core' as shown below (in the left pane in the dialog: Templates \| Visual C++ \| Windows \| Windows IoT Core).<br/>
Select the template 'Blank Windows IoT Core Console Application'<br/>
Remember to give a good name to your first app! In this example, we called the project 'MemoryStatus'.

    ![Console Application Template Location]({{site.baseurl}}/Resources/images/Console/new_cpp_console_proj.png)

* Let's add some content to the console application. From Solution Explorer, select the 'ConsoleApplication.cpp' file.

    ![ConsoleApplication File]({{site.baseurl}}/Resources/images/Console/console_application.png)

* To add some functionality to our console, add the following memory status query and display code:
<UL>
{% highlight C++ %}
#include "pch.h"

#include <windows.h>
#include <chrono>
#include <thread>

using namespace std;

// Use to convert bytes to KB
#define DIV 1024

// Specify the width of the field in which to print the numbers.
#define MESSAGE_WIDTH 30
#define NUMERIC_WIDTH 10

void printMessage(LPCSTR msg, bool addColon)
{
    cout.width(MESSAGE_WIDTH);
    cout << msg ;
    if (addColon)
    {
        cout << " : ";
    }
}

void printMessageLine(LPCSTR msg)
{
    printMessage(msg, false);
    cout << endl;
}

void printMessageLine(LPCSTR msg, DWORD value)
{
    printMessage(msg, true);
    cout.width(NUMERIC_WIDTH);
    cout << right << value << endl;
}

void printMessageLine(LPCSTR msg, DWORDLONG value)
{
    printMessage(msg, true);
    cout.width(NUMERIC_WIDTH);
    cout << right << value << endl;
}

void checkInput(HANDLE exitEvent)
{
    for (;;)
    {
        char character;
        cin.get(character);
        if (character == 'q')
        {
            ::SetEvent(exitEvent);
            break;
        }
    }
}

int main(int argc, char **argv)
{
    printMessageLine("Starting to monitor memory consumption! Press enter to start monitoring");
    printMessageLine("You can press q and enter at anytime to exit");
    cin.get();
    HANDLE exitEvent = ::CreateEvent(NULL, FALSE, FALSE, NULL);
    if (NULL == exitEvent)
    {
        printMessageLine("Failed to create exitEvent.");
        return -1;
    }
    std::thread inputThread(checkInput, exitEvent);
    for (;;)
    {
        MEMORYSTATUSEX statex;
        statex.dwLength = sizeof(statex);

        BOOL success = ::GlobalMemoryStatusEx(&statex);
        if (!success)
        {
            DWORD error = GetLastError();
            printMessageLine("*************************************************");
            printMessageLine("Error getting memory information", error);
            printMessageLine("*************************************************");
        }
        else
        {
            DWORD load = statex.dwMemoryLoad;
            DWORDLONG physKb = statex.ullTotalPhys / DIV;
            DWORDLONG freePhysKb = statex.ullAvailPhys / DIV;
            DWORDLONG pageKb = statex.ullTotalPageFile / DIV;
            DWORDLONG freePageKb = statex.ullAvailPageFile / DIV;
            DWORDLONG virtualKb = statex.ullTotalVirtual / DIV;
            DWORDLONG freeVirtualKb = statex.ullAvailVirtual / DIV;
            DWORDLONG freeExtKb = statex.ullAvailExtendedVirtual / DIV;

            printMessageLine("*************************************************");

            printMessageLine("Percent of memory in use", load);
            printMessageLine("KB of physical memory", physKb);
            printMessageLine("KB of free physical memory", freePhysKb);
            printMessageLine("KB of paging file", pageKb);
            printMessageLine("KB of free paging file", freePageKb);
            printMessageLine("KB of virtual memory", virtualKb);
            printMessageLine("KB of free virtual memory", freeVirtualKb);
            printMessageLine("KB of free extended memory", freeExtKb);

            printMessageLine("*************************************************");

        }

        if (WAIT_OBJECT_0 == ::WaitForSingleObject(exitEvent, 100))
        {
            break;
        }
    }

    inputThread.join();
    ::CloseHandle(exitEvent);
    printMessageLine("No longer monitoring memory consumption!");
}
{% endhighlight %}
</UL>
* Make sure the app builds correctly invoking the Build \| Build Solution menu command.

* This application can be run in either headed or headless mode.  To better understand what headed and headless mode are and how to configure your device, follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm).

* It is easy to deploy this console application to our Windows IoT Core device. In the [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) documentation, you can find instructions to use `setcomputername` to configure a unique name for your Windows IoT Core device. In this sample, we'll use that name (though you can use your IP address as well) in the 'Remote Machine Debugging' settings in VS.

* You will first need to setup the Remote Debugger on your Windows IoT Core device. First follow the steps [here]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm) to deploy a Universal Windows Application on your device. This will copy all the required binaries to your device. 

* To start remote debugger on your device, open a Web Browser on your PC and point it to `http://<device name/IP address>:8080` to launch [Windows Device Portal]({{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm). In the credentials dialog, use the default username and password: `Administrator`, `p@ssw0rd`. Windows Device Management should launch and display the web management home screen.

* Now navigate to the Debugging section of Windows Device Portal and click the Start button under Start Visual Studio Remote Debugger. 

    ![WindowsDevicePortalDebugSettings Target]({{site.baseurl}}/Resources/images/Console/device_portal_start_debugger.png)

* This will show pop-up a message box and give you the connection information. 

*  In Visual Studio, you can configure your target by editing your project's properties (be sure to make all of the highlighted changes as appropriate to your board's name or IP address):

    ![RemoteMachineProjectSettings Target]({{site.baseurl}}/Resources/images/Console/console_project_settings.png)

        Note: You can use the IP address instead of the Windows IoT Core device name.

* The project configuration needs to be modified to enable deployment.  To do this, open the Configuration Manager by selecting the Configuration manger from the Solution Configuration drop-down menu on the toolbar.

    ![SolutionConfiguration Target]({{site.baseurl}}/Resources/images/Console/configuration_management.png)

    From the Configuration Manager, ensure that the Deploy checkbox is selected for your project configuration (if this options is disabled, it is likely that the deployment options have not been fully entered into the Debugging tab of the project properties)

    ![RemoteMachineProjectSettings Target]({{site.baseurl}}/Resources/images/Console/deploy_checkbox.png)

* Now we're ready to deploy to the remote Windows IoT Core device. Simply press F5 (or select Debug \| Start Debugging) to start debugging our app. You can also use Build \| Deploy Solution to simply deploy your application without starting a debug session.

        NOTE: When run from Visual Studio, the output will not display anywhere, but you will be able to set breakpoints, see variable values, etc.

* To stop the app, press on the 'Stop Debugging' button (or select Debug \| Stop Debugging).

* Congratulations! You just deployed your first console application to a device running Windows IoT Core!

* You can now run the application as you would any other application.  Simply open a PowerShell/SSH connection (instructions can be found [here for powershell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) and [here for SSH]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm)) and enter the Remote Command you specified above.

    ![ConsoleOutput Target]({{site.baseurl}}/Resources/images/Console/console_output.png)

* Once you are done debugging Console Applications, remember to kill the remote debugger on the Windows IoT Core device. Use powershell/SSH to open a console session and run the following commnand

    `kill msvsmon.exe`



