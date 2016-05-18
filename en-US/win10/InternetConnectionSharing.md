---
layout: default
title: Internet Connection Sharing Tutorial (TH2)
permalink: /en-US/win10/InternetConnectionSharing.htm
lang: en-US
---
# Enabling Internet Connection Sharing

Below are steps to enable Internet Connection Sharing (ICS) on latest Windows 10 IoT Core images. Goal is to share Internet Connection between a Software Wi-Fi Access Point (SoftAP) and Ethernet adapter. Please note that this solution will be replaced in future releases of Windows 10 IoT Core.

### Prerequisites

1.	Latest Windows 10 IoT Core TH2 image deployed on device.
2.	Wi-Fi USB device capable of starting a SoftAP. Consult the [Hardware Compatibility List]({{site.baseurl}}/en-US/win10/SupportedInterfaces.htm#WiFi-Dongles){:target="_blank"} for supported Wi-Fi USB devices for your platform.
3.	Ethernet connection with Internet Access.

## Setup

### Step 1: Gathering Network Information

1.	Boot up device with Wi-Fi dongle plugged in, Ethernet cable plugged in.
2.	Start SoftAP from the IoT Core device.

	By default, Maker images start an IoT Onboarding application that will setup a SoftAP if Wi-Fi radio is capable and no WLAN profile has been added. To start SoftAP, UWP applications can use the [Windows.Devices.WiFiDirect.WiFiDirectAdvertisementPublisher API](https://msdn.microsoft.com/en-us/library/windows/apps/windows.devices.wifidirect.wifidirectadvertisementpublisher.aspx){:target="_blank"}. The source code for the IoT Onboarding application can be seen [here](https://github.com/ms-iot/samples/tree/develop/IotOnboarding){:target="_blank"}.

	> Record the SSID of the SoftAP network. You will need it later to connect to your IoT Core device via Wi-Fi.

	For IoT Onboarding application the SSID will start with "AJ\_SoftAPSsid\_" and can be changed in application's configuration [file](https://github.com/ms-iot/samples/blob/develop/IotOnboarding/IoTOnboardingTask/Config.xml){:target="_blank"}.

3.	Remotely connect to the IoT device [using ssh]({{site.baseurl}}/en-US/Samples/SSH.htm){:target="_blank"}.
4.	Collect information about device networks by finding network device indexes and descriptions. This is needed to declare which networks to bridge.

	On device, run **route print** and collect the following data:

	> Record PUBLIC Interface network index for the Ethernet.

	> Record PRIVATE Interface network index for the SoftAP (e.g. “Microsoft Wi-Fi Direct Virtual Adapter #2”).

	For example, the SoftAP is exposed through interface index 5, adapter description “Microsoft Wi-Fi Direct Virtual Adapter #2”.

	![route print]({{site.baseurl}}/Resources/images/InternetConnectionSharing/internetconnectionsharing_route.png)

	On device, run **ipconfig /all** and collect the following data:
	> Record PRIVATE Interface network adapter name for the SoftAP

    For example, running "ipconfig /all" helped us find specific adapter named “Local Area Connection* 3” that has a description of “Microsoft Wi-Fi Direct Virtual Adapter #2”. Use this method to manually find Adapter Name from the Description returned in “route print”.

	![ipconfig all]({{site.baseurl}}/Resources/images/InternetConnectionSharing/internetconnectionsharing_ipconfig.png)

### Step 2: Scripting Internet Connection Sharing trigger

With current Windows 10 IoT Core latest TH2 build, starting Internet Connection Sharing between two networks requires the following steps:

- Set registry keys to set private (SoftAP) and public (Ethernet) network interfaces to bridge.
- Set appropriate firewall rules.
- Turns off DHCP on private interface.
- Sets static IP address on private interface.
- Starts SharedAccess service.
- Sends command code “129” to SharedAccess service.

Below is an example of a scripts and a little code to automate the above steps that can be integrated into startup sequence.

1. Create a script (e.g. **ConfigureICS.cmd**) with the following content:

{% highlight console %}
echo off

set START_OR_STOP=%1
set PUBLIC_INDEX=%2
set PRIVATE_INDEX=%3
set PRIVATE_INTERFACE_NAME=%4

if "%4"=="" (
  goto usage
)

if "%START_OR_STOP%"=="start" (

  REM Set the public and private interface registry keys
  reg add HKEY_LOCAL_MACHINE\System\SA /f /v private /t REG_DWORD /d %PRIVATE_INDEX%
  reg add HKEY_LOCAL_MACHINE\System\SA /f /v public /t REG_DWORD /d %PUBLIC_INDEX%

  REM Set the firewall rules to allow DHCP to work
  netsh advfirewall firewall add rule name=\"AllowPort67In\" protocol=UDP dir=in localport=67 action=allow
  netsh advfirewall firewall add rule name=\"AllowPort68In\" protocol=UDP dir=in localport=68 action=allow
  netsh advfirewall firewall add rule name=\"AllowPort67Out\" protocol=UDP dir=out localport=67 action=allow
  netsh advfirewall firewall add rule name=\"AllowPort68Out\" protocol=UDP dir=out localport=68 action=allow
  netsh advfirewall firewall add rule name=\"AllowPort53Out\" protocol=UDP dir=out localport=53 action=allow
  netsh advfirewall firewall add rule name=\"AllowPort53In\" protocol=UDP dir=in localport=53 action=allow

  REM Turn off DHCP and set static IP for private interface
  netsh interface ip set address %4 static 192.168.137.1

  REM Start sharing
  call SharedAccessUtility.exe start

) else if "%START_OR_STOP%"=="stop" (

  REM Stop sharing
  call SharedAccessUtility.exe stop

  REM Set the public and private interface registry keys
  reg add HKEY_LOCAL_MACHINE\System\SA /f /v private /t REG_DWORD /d 0
  reg add HKEY_LOCAL_MACHINE\System\SA /f /v public /t REG_DWORD /d 0

  REM Clear the firewall rules
  netsh advfirewall firewall delete rule name="AllowPort67In"
  netsh advfirewall firewall delete rule name="AllowPort68In"
  netsh advfirewall firewall delete rule name="AllowPort67Out"
  netsh advfirewall firewall delete rule name="AllowPort68Out"
  netsh advfirewall firewall delete rule name="AllowPort53Out"
  netsh advfirewall firewall delete rule name="AllowPort53In"

  REM Reenable DHCP for private interface
  netsh interface ip set address %4 dhcp

) else (
  goto usage
)

goto eof

:usage
ECHO USAGE: %0 [start ^| stop] [public interface index] [private interface index] [private interface name]
ECHO e.g. %0 start 1 2 "Ethernet"

:eof
{% endhighlight %}

This script will do everything but start/stop SharedAccess service, and does not send service command. For those tasks it calls to SharedAccessUtility.exe, which needs to be created.

2. In Visual Studio with [Windows IoT Core Project Templates extensions](https://visualstudiogallery.msdn.microsoft.com/55b357e1-a533-43ad-82a5-a88ac4b01dec){:target="_blank"} installed, create a new “Blank Windows IoT Core Console Application” Visual C++ project, named **SharedAccessUtility**.

![VS new project]({{site.baseurl}}/Resources/images/InternetConnectionSharing/internetconnectionsharing_vs.png)

3. Replace contents of ConsoleApplication.cpp with the following code:

{% highlight C++ %}
#include "pch.h"
#include <ws2tcpip.h>
#include <iphlpapi.h>
#include <mstcpip.h>
#include <stdio.h>

#define SHARED_ACCESS_NAME L"SharedAccess"
#define START_SHARING_CONTROL 129

DWORD StartSharedAccessService(SC_HANDLE *phScm, SC_HANDLE *phSvc)
{
    DWORD dwError = ERROR_SUCCESS;
    SERVICE_STATUS svcStatus = { 0 };

    // open a handle to SCM
    *phScm = OpenSCManager(NULL, NULL, SC_MANAGER_CONNECT);
    if (*phScm == NULL)
    {
        dwError = GetLastError();
        printf("\nOpenSCManager failed; error = %d", dwError);
    }
    else
    {
        // open a handle to the service
        *phSvc = OpenService(*phScm, SHARED_ACCESS_NAME, SERVICE_START | SERVICE_QUERY_STATUS | SERVICE_QUERY_CONFIG | SERVICE_STOP | SERVICE_USER_DEFINED_CONTROL);
        if (*phSvc == NULL)
        {
            dwError = GetLastError();
            printf("\nOpenService failed; error = %d", dwError);
        }
        else
        {
            if (!StartService(*phSvc, 0, NULL))
            {
                dwError = GetLastError();
                if (dwError != ERROR_SERVICE_ALREADY_RUNNING)
                {
                    printf("\nStartService failed; error = %d", dwError);
                }
                else
                {
                    dwError = ERROR_SUCCESS;
                    printf("\nService already running.");
                }
            }

            if (dwError == ERROR_SUCCESS)
            {
                if (QueryServiceStatus(*phSvc, &svcStatus) && svcStatus.dwCurrentState != SERVICE_RUNNING)
                {
                    for (int i = 0; i < 10; i++)
                    {
                        printf("\nWaiting 1 second for service to start.");
                        Sleep(1000);
                        if (QueryServiceStatus(*phSvc, &svcStatus))
                        {
                            if (svcStatus.dwCurrentState == SERVICE_RUNNING)
                            {
                                printf("\nService is running.");
                                // it is, so break out
                                dwError = ERROR_SUCCESS;
                                break;
                            }
                            else
                            {
                                if (svcStatus.dwCurrentState == SERVICE_STOPPED)
                                {
                                    printf("\nService could not run.");
                                    // it is, so break out
                                    dwError = ERROR_SERVICE_NOT_ACTIVE;
                                    break;
                                }
                            }
                        }
                        else
                        {
                            printf("\nWaiting more time.");
                        }
                    }
                }
            }
        }
    }

    if (dwError == ERROR_SUCCESS) //service is running
    {
        if (!ControlService(*phSvc, START_SHARING_CONTROL, &svcStatus))
        {
            dwError = GetLastError();
            printf("\nControl service for start sharing failure, %d", dwError);
        }
        else
        {
            printf("\nSharing started");
        }
    }

    // Service cleanup done at the main.
    return dwError;
}


DWORD StopSharedAccessService(SC_HANDLE *phSvc)
{
    DWORD dwError = ERROR_SUCCESS;
    SERVICE_STATUS svcStatus = { 0 };

    if (!QueryServiceStatus(*phSvc, &svcStatus))
    {
        dwError = GetLastError();
        printf("\nFailed to query sharedaccess, %d", dwError);
    }
    else
    {
        if (svcStatus.dwCurrentState != SERVICE_STOPPED)
        {
            if (ControlService(*phSvc, SERVICE_CONTROL_STOP, &svcStatus))
            {
                if (QueryServiceStatus(*phSvc, &svcStatus) && svcStatus.dwCurrentState != SERVICE_STOPPED)
                {
                    for (int i = 0; i < 10; i++)
                    {
                        printf("\nWaiting 1 second for service to stop.");
                        Sleep(1000);
                        if (QueryServiceStatus(*phSvc, &svcStatus))
                        {
                            if (svcStatus.dwCurrentState == SERVICE_STOPPED)
                            {
                                printf("\nService stopped.");
                                // it is, so break out
                                dwError = ERROR_SUCCESS;
                                break;
                            }
                            else
                            {
                                printf("\nWaiting more time.");
                            }
                        }
                    }
                }
            }
        }
    }
    return dwError;
}

void ShowUsage()
{
    printf("Usage: SharedAccessUtility.exe start | stop\n"
        "Setup: Make sure the public and private interfaces are up and running and that the SharedAccess registry keys are set.");
}

int __cdecl
main(
    __in int argc,
    __in_ecount(argc) LPSTR argv[]
    )
{
    SC_HANDLE hScm = NULL;
    SC_HANDLE hSvc = NULL;
    DWORD dwError = NO_ERROR;
    bool startSharing = true;

    if (argc < 2)
    {
        ShowUsage();
        return -1;
    }
    else
    {
        if (strcmp(argv[1], "start") == 0 || strcmp(argv[1], "/start") == 0)
        {
            startSharing = true;
        }
        else if (strcmp(argv[1], "stop") == 0 || strcmp(argv[1], "/stop") == 0)
        {
            startSharing = false;
        }
        else
        {
            ShowUsage();
            return -1;
        }
    }

    dwError = startSharing ? StartSharedAccessService(&hScm, &hSvc) : StopSharedAccessService(&hSvc);

    // Cleanup
    if (hSvc != NULL)
    {
        CloseServiceHandle(hSvc);
        hSvc = NULL;
    }
    if (hScm != NULL)
    {
        CloseServiceHandle(hScm);
        hScm = NULL;
    }
    return 0;
}

{% endhighlight %}

4. Build for target architecture, e.g. Release x86, and locate output **SharedAccessUtility.exe**

### Step 3: Starting Internet Connection Sharing

1. Copy **ConfigICS.cmd** script created in Step 2 to device in some location, e.g. to C:\test\
2. Copy **SharedAccessUtility.exe** created in Step 2 to device in the same location, e.g. C:\test\
3. On device, run **C:\test\ConfigureICS.cmd start [public index] [private index] [private adapter name]**
	In our example, this would mean **C:\test\ConfigureICS.cmd start 4 5 "Local Area Connection* 3"**

At this point device will enable internet connection sharing for any client connected to the device’s advertised SSID.
