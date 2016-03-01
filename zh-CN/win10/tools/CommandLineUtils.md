---
layout: default
title: Windows 10 IoT Core 命令行实用程序
permalink: /zh-cn/win10/tools/CommandLineUtils.htm
lang: zh-cn
---

#Windows 10 IoT Core 命令行实用程序

正在寻找可用于配置设备上的某些设置的工具？ 下面的工具均可预安装在你的设备上，可帮助你实现这一目标！ 在[连接到你的设备]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)后，使用 PowerShell 运行这些命令。

* **更新帐户密码：**

	强烈建议你更新默认的管理员帐户密码。若要更新帐户密码，你可以发出以下命令：`net user Administrator [new password]`（其中 `[new password]` 表示你选择的强密码）。

* **创建本地用户帐户：**

	如果你想要授予其他人访问你的 Windows IoT Core 设备的权限，你可以通过在 `net user [username] [password] /add` 中键入，并使用 PS 创建其他本地用户帐户。如果你想要将此用户添加到其他组（例如管理员组），则使用 `net localgroup Administrators [username] /add`。

* **设置密码**

	若要更改你的设备上的帐户密码，可通过运行 `SetPassword [account-username] [new-password] [old-password]` 来更改帐户密码。

* **查询和设置设备名称：**

	若要确定当前设备名称，只需键入 `hostname`。若要更改你的 Windows IoT Core 设备的名称，应键入 `SetComputerName [new machinename]`。你可能需要重新启动你的设备才能使更改的名称生效。

* **基本网络配置：**

	Windows IoT Core 中将提供多种基本的网络配置实用程序（包括诸如 `ping.exe`、`netstat.exe`、`netsh.exe`、`ipconfig.exe`、`nslookup.exe`、`tracert.exe` 和 `arp.exe` 等命令），你可能已经对这些实用程序很熟悉了。

* **复制实用程序：**

	Microsoft 将提供熟悉的工具，包括 `sfpcopy.exe` 以及 `xcopy.exe`。

* **进程管理：**

	若要查看当前正在运行的进程，可以尝试 `get-process` 或 `tlist.exe`。若要停止正在运行的进程，请键入 `kill.exe [pid or process name]`。

* **设置启动应用：**

	使用启动编辑器在你的 Windows 10 IoT Core 设备上配置启动应用。借助以下选项之一，运行 `IotStartup`：

	* `IotStartup list`，用于列出已安装的应用程序

    * `IotStartup list headed`，用于列出已安装的有外设应用程序

    * `IotStartup list headless`，用于列出已安装的无外设应用程序

    * `IotStartup list [MyApp]`，用于列出已安装的与模式 `MyApp` 匹配的应用程序

    * `IotStartup add`，用于添加有外设和无外设应用程序

    * `IotStartup add headed [MyApp]`，用于添加与模式 `MyApp` 匹配的有外设应用程序模式必须只匹配一个应用程序。

    * `IotStartup add headless [Task1]`，用于添加与模式 `Task1` 匹配的无外设应用程序

    * `IotStartup remove`，用于删除有外设和无外设应用程序

    * `IotStartup remove headed [MyApp]`，用于删除与模式 `MyApp` 匹配的有外设应用程序

    * `IotStartup remove headless [Task1]`，用于删除与模式 `Task1` 匹配的无外设应用程序

    * `IotStartup startup`，用于列出针对启动所注册的有外设和无外设应用程序

    * `IotStartup startup [MyApp]`，用于列出针对启动所注册的且与模式 `MyApp` 匹配的有外设和无外设应用程序

    * `IotStartup startup headed [MyApp]`，用于列出针对启动所注册的且与 `MyApp` 匹配的有外设应用程序

    * `IotStartup startup headless [Task1]`，用于列出针对启动所注册的且与 `Task1` 匹配的无外设应用程序

	* 若要获取进一步帮助，请尝试 `IotStartup help`

* **设置启动选项（无外设与有外设启动）：**

	Windows IoT Core 设备可以设置为有外设设备模式（需要显示功能时）或无外设设备模式（显示功能不是必需项或不可用时）。若要更改此设置，请使用 `setbootoption.exe [headed | headless]`。

		NOTE: Changing this setting will require a reboot in order for the change to take effect.

* **任务计划程序：**

	若要查看计划任务的当前列表，请使用 `schtasks.exe` 命令。你可以使用 `/create` 开关创建新任务，或使用 `/run` 开关运行按需任务。若要获取支持的参数的完整列表，请使用 `schtasks.exe /?`

* **设备驱动程序：**

	设备控制台实用程序在识别和管理已安装的设备和驱动程序方面十分有用。若要获取参数的完整列表，请使用 `devcon.exe /?`

* **注册表访问：**

	如果你需要通过访问注册表来查看或修改设置，请使用 `reg.exe /?` 命令获取有关支持的参数的完整列表。

* **服务：**

	管理 Windows 服务可以通过 `net.exe` 命令来完成。若要查看运行中的服务的列表，请键入 `net start`。若要启动或停止特定的服务，请键入 `net [start | stop] [service name]`。此外，还可以通过 `sc.exe` 命令使用服务控制管理器。

* **启动配置：**

	你可以使用 `bcdedit.exe` 来更改 Windows IoT Core 设备的启动配置。例如，你可以使用 `bcdedit –set testsigning` 命令启用测试签名。

* **关闭/重新启动设备：**

	若要关闭设备，请键入 `shutdown /s /t 0`。若要重新启动该设备，请使用 `/r` 开关而不是 `shutdown /r /t 0` 命令。

* **设置显示器分辨率**

	若要调整连接到你的 Windows 10 IoT Core 设备的显示器的分辨率，请运行 `SetDisplayResolution [width] [height]`。若要查询分辨率，请排除 `[width]` 和 `[height]` 参数。
