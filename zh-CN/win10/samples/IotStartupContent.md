
###将应用设置为启动应用

1. 你还可以将应用设置为 Windows IoT 核心版设备的“启动应用”，以便在该设备重新启动时，将自动启动该应用。为此，需要在 Windows IoT 核心版设备上运行一个名为 iotstartup 的命令行实用工具。我们将使用 PowerShell 执行此操作。

1. 通过你的 Windows IoT 核心版设备启动 PowerShell \(PS\) 会话，如[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)所述。

1. 在 PS 会话中，键入（为简单起见，我们假定该应用的名称为 HelloWorld，**请替换应用的实际名称**）：

        [192.168.0.243]: PS C:\> iotstartup list HelloWorld

    此时你应看到 UWP 应用程序的完整名称，如下所示：

        Headed   : HelloWorld_n2pe7ts0w7wey!App

    实用工具将确认你的应用是否是“有外设”应用程序，以及是否正确安装。

1. 现在，可以轻松地将此应用设置为“启动应用”。只需键入以下命令：

        [192.168.0.243]: PS C:\> iotstartup add headed HelloWorld

    实用工具将确认你的应用现在是否已成为新的有外设启动应用：

        AppId changed to HelloWorld_n2pe7ts0w7wey!App

1. 继续下一步，然后重新启动 Windows IoT 核心版设备。在 PS 会话中，可以发出关闭命令：

        [192.168.0.243]: PS C:\> shutdown /r /t 0

1. 设备重新启动后，你将看到你的应用自动启动。

1. 此时，可以还原回将 DefaultApp 用作“启动应用”。只需键入以下命令：

        [192.168.0.243]: PS C:\> iotstartup add headed IoTCoreDefaultApp

    实用工具将确认 IoTCoreDefaultApp 现在是否已成为新的有外设启动应用：

        AppId changed to IoTCoreDefaultApp_kwmcxzszfer2y!App
