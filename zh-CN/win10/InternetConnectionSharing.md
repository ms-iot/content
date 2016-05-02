---
layout: default
title: Internet 连接共享教程 (TH2)
permalink: /zh-cn/win10/InternetConnectionSharing.htm
lang: zh-CN
---
# 启用 Internet 连接共享

下面是在最新的 Windows 10 IoT 核心版映像上启用 Internet 连接共享 \(ICS\) 的步骤。目标是在软件 WLAN 接入点 \(SoftAP\) 和以太网适配器之间共享 Internet 连接。请注意，将在 Windows 10 IoT 核心版的将来版本中替换此解决方案。

### 先决条件

1.	设备上部署的最新 Windows 10 IoT 核心版 TH2 映像。
2.	支持启动 SoftAP 的 WLAN USB 设备。有关你的平台支持的 WLAN USB 设备，请查看[硬件兼容性列表]({{site.baseurl}}/zh-cn/win10/SupportedInterfaces.htm#WiFi-Dongles){:target="_blank"}。
3.	具有 Internet 访问权限的以太网连接。

## 设置

### 步骤 1： 收集网络信息

1.	在插入 WLAN 硬件保护装置、插入以太网电缆的情况下启动设备。
2.	从 IoT 核心版设备启动 SoftAP。

	默认情况下，如果支持 WLAN 无线收发器且未添加任何 WLAN 配置文件，制造商映像启动一个 IoT 板载应用程序，该应用程序将设置一个 SoftAP。若要启动 SoftAP，UWP 应用程序可以使用 [Windows.Devices.WiFiDirect.WiFiDirectAdvertisementPublisher API](https://msdn.microsoft.com/zh-cn/library/windows/apps/windows.devices.wifidirect.wifidirectadvertisementpublisher.aspx){:target="_blank"}。可以在[此处](https://github.com/ms-iot/samples/tree/develop/IotOnboarding){:target="_blank"}查看 IoT 板载应用程序的源代码。

	> 记录 SoftAP 网络的 SSID。你以后将需要它来通过 WLAN 连接到 IoT 核心版设备。

	对于 IoT 板载应用程序，SSID 将以“AJ\_SoftAPSsid\_”开头，并且可以在应用程序的配置[文件](https://github.com/ms-iot/samples/blob/develop/IotOnboarding/IoTOnboardingTask/Config.xml){:target="_blank"}中更改。

3.	[使用 ssh]({{site.baseurl}}/zh-cn/win10/samples/SSH.htm){:target="_blank"} 远程连接到 IoT 设备。
4.	通过查找网络设备索引和描述来收集有关设备网络的信息。声明要桥接哪些网络需要执行此操作。

	在设备上，运行 **route print** 并收集以下数据：

	> 记录以太网的公共接口网络索引。

	> 记录 SoftAP 的专用接口网络索引（例如“Microsoft WLAN Direct 虚拟适配器 \#2”）。

	例如，SoftAP 通过接口索引 5 公开，适配器描述为“Microsoft WLAN Direct 虚拟适配器 \#2”。

	![route print]({{site.baseurl}}/Resources/images/InternetConnectionSharing/internetconnectionsharing_route.png)

	在设备上，运行 **ipconfig /all** 并收集以下数据：
	> 记录 SoftAP 的专用接口网络适配器名称

    例如，运行“ipconfig /all”曾帮助我们找到名为“本地区域连接\* 3”的特定适配器，该适配器的描述为“Microsoft WLAN Direct 虚拟适配器 \#2”。使用此方法从“route print”中返回的描述中查找适配器名称。

	![ipconfig all]({{site.baseurl}}/Resources/images/InternetConnectionSharing/internetconnectionsharing_ipconfig.png)

### 步骤 2： 编写 Internet 连接共享触发器脚本

使用当前的 Windows 10 IoT 核心版最新 TH2 版本，启动两个网络之间的 Internet 连接共享需要以下步骤：

- 设置注册表项来设置要桥接的专用 \(SoftAP\) 和公共（以太网）网络接口。
- 设置相应的防火墙规则。
- 在专用接口上关闭 DHCP。
- 在专用接口上设置静态 IP 地址。
- 启动 SharedAccess 服务。
- 将命令代码“129”发送到 SharedAccess 服务。

下面是脚本示例和一些可集成到启动序列以自动执行上述步骤的代码。

1. 使用以下内容创建脚本（例如 **ConfigureICS.cmd**）：

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

此脚本将执行除启动/停止 SharedAccess 服务之外的一切操作，并且不会发送服务命令。对于这些任务，它调用到 SharedAccessUtility.exe（需要创建此程序）。

2. 在安装了 [Windows IoT 核心版项目模板扩展](https://visualstudiogallery.msdn.microsoft.com/55b357e1-a533-43ad-82a5-a88ac4b01dec){:target="_blank"}的 Visual Studio 中，创建新的名为“SharedAccessUtility”的“空白 Windows IoT 核心版控制台应用程序”。

![VS 新建项目]({{site.baseurl}}/Resources/images/InternetConnectionSharing/internetconnectionsharing_vs.png)

3. 将 ConsoleApplication.cpp 的内容替换为以下代码：

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

4. 针对目标体系结构（例如版本 x86 ）进行生成，并找到输出 **SharedAccessUtility.exe**

### 步骤 3： 启动 Internet 连接共享

1. 将在步骤 2 中创建的 **ConfigICS.cmd** 脚本复制到设备的某个位置，例如 C:\\test\\
2. 将在步骤 2 中创建的 **SharedAccessUtility.exe** 复制到设备的同一位置，例如 C:\\test\\
3. 在设备上，运行 **C:\\test\\ConfigureICS.cmd start \[public index\] \[private index\] \[private adapter name\]** 在我们的示例中，这意味着 **C:\\test\\ConfigureICS.cmd start 4 5“本地区域连接\* 3”**

此时，设备将为连接到设备的已公布 SSID 的任何客户端启用 Internet 连接共享。
