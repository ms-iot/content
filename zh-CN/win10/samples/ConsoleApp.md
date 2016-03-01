---
layout: default
title: 控制台应用示例
permalink: /zh-cn/win10/samples/ConsoleApp.htm
lang: zh-cn
---

##MemoryStatus 控制台应用程序示例

{% include VerifiedVersion.md %}

我们将要创建一个可用于在 Windows IoT 核心版设备（Raspberry Pi 2、MinnowBoard Max 或 DragonBoard）上查询内存使用情况的简单控制台应用程序。请注意，你需要针对 Raspberry Pi 2 或 DragonBoard 的 ARM 和 MinnowBoard Max 的 x86 编译项目。

###在 Visual Studio 中加载项目

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\MemoryStatus` 来查找此示例的源代码。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

###在 Visual Studio 中创建你自己的项目

* 创建新项目（“文件”\|“新建项目...”）。在“新建项目”对话框中，如下所示导航到“Windows IoT Core”（在该对话框的左窗格中： 模板 \| Visual C++ \| Windows \| Windows IoT Core）。<br/> 选择模板“空白 Windows IoT Core 控制台应用程序”<br/>请记得为你的第一个应用指定一个好记的名称！ 在本示例中，我们将项目命名为“MemoryStatus”。

    ![控制台应用程序模板位置]({{site.baseurl}}/Resources/images/Console/new_cpp_console_proj.png)

* 让我们来向该控制台应用程序添加一些内容。从解决方案资源管理器中，选择“ConsoleApplication.cpp”文件。

    ![ConsoleApplication 文件]({{site.baseurl}}/Resources/images/Console/console_application.png)

* 若要向我们的控制台添加一些功能，请添加以下内存状态查询和显示代码：

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

* 确保通过调用“生成”\|“生成解决方案”菜单命令正确生成应用。

* 此应用程序既能在有外设模式下运行，也能在无外设模式下运行。若要更好地了解什么是有外设模式和无外设模式以及如何配置设备，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。

* 可轻松将此控制台应用程序部署到 Windows IoT 核心版设备。在 [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) 文档中，你可以找到关于使用 `setcomputername` 为你的 Windows IoT Core 设备配置唯一名称的说明。在本示例中，我们将在 VS 的“远程计算机调试”设置中使用该名称（不过你也可以使用自己的 IP 地址）。

* 首先，需要在 Windows IoT 核心版设备上设置远程调试器。首先按照[此处]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm)的步骤在设备上部署通用 Windows 应用程序。这会将所有必需的二进制文件复制到你的设备。

* 若要在设备上启动远程调试器，请打开电脑上的 Web 浏览器并将其指向 `http://<device name/IP address>:8080` 以启动 [Windows Device Portal]({{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm)。在凭据对话框中，使用默认的用户名和密码：`Administrator`，`p@ssw0rd`。Windows 设备管理应启动并显示 Web 管理主屏幕。

* 现在导航到 Windows Device Portal 的“调试”部分，并单击“启动 Visual Studio 远程调试器”下的“开始”按钮。

    ![WindowsDevicePortalDebugSettings 目标]({{site.baseurl}}/Resources/images/Console/device_portal_start_debugger.png)

* 这将弹出一个消息框并提供连接信息。

*  在 Visual Studio 中，你可以通过编辑项目的属性配置你的目标（请确保所有突出显示的更改均适用于开发板的名称或 IP 地址）：

    ![RemoteMachineProjectSettings 目标]({{site.baseurl}}/Resources/images/Console/console_project_settings.png)

        Note: You can use the IP address instead of the Windows IoT Core device name.

* 项目配置需修改为启用部署。为此，请从工具栏的“解决方案配置”下拉菜单中选择“配置管理器”，以打开配置管理器。

    ![SolutionConfiguration 目标]({{site.baseurl}}/Resources/images/Console/configuration_management.png)

    在配置管理器中，确保已针对自己的项目配置选中了“部署”复选框（如果此选项处于禁用状态，则很可能是因为部署选项未全部输入到项目属性的“调试”选项卡中）

    ![RemoteMachineProjectSettings 目标]({{site.baseurl}}/Resources/images/Console/deploy_checkbox.png)

* 现在，我们可以随时部署到远程 Windows IoT Core 设备。只需按 F5（或依次选择“调试”\|“启动调试”）即可开始调试应用。你也可以通过使用“生成”\|“部署解决方案”，仅部署你的应用程序，而无需启动调试会话。

        NOTE: When run from Visual Studio, the output will not display anywhere, but you will be able to set breakpoints, see variable values, etc.

* 若要停止应用调试，请按“停止调试”按钮（或依次选择“调试”\|“停止调试”）。

* 恭喜你！ 你已将第一个控制台应用程序部署到运行 Windows IoT Core 的设备！

* 现在，你可以运行该应用程序，就像运行其他任何应用程序一样。只需打开 PowerShell/SSH 连接（可在[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)和[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm)分别获取有关 PowerShell 和 SSH 的说明），并输入上面指定的远程命令。

    ![ConsoleOutput 目标]({{site.baseurl}}/Resources/images/Console/console_output.png)

* 完成调试控制台应用程序后，请记得终止 Windows IoT 核心版设备上的远程调试器。使用 PowerShell/SSH 打开控制台会话并运行以下命令

    `kill msvsmon.exe`



