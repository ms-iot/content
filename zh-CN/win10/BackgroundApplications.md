---
layout: default
title: 后台应用程序
permalink: /zh-cn/win10/BackgroundApplications.htm
lang: zh-cn
---

#开发后台应用程序

后台应用程序是没有直接 UI 的应用程序。部署和配置完成后，这些应用程序将在计算机启动时启动，并将持续运行，不受任何进程生命期管理资源使用的限制。如果这些应用程序崩溃或退出，系统将自动重新启动它们。这些后台应用程序有一个非常简单的执行模型。模板将创建实现“IBackgroundTask”接口并生成空的“运行”方法的类。此“运行”方法将是通向你的应用程序的入口点。

![IBackground 任务]({{site.baseurl}}/Resources/images/BackgroundApplications/backgroundTaskScreenshot.png)

需特别注意的一点是，默认情况下，应用程序将在运行方法完成时关闭。这意味着遵循运行等待输入或在计时器上的服务器的常用 IoT 模式的应用将会过早地发现应用退出这一情况。若要阻止这种情况发生，必须调用“GetDeferral”方法才能阻止应用程序退出。可在[此处](https://msdn.microsoft.com/zh-cn/library/windows/apps/windows.applicationmodel.background.backgroundtaskdeferral.aspx)查找有关延迟模式的详细信息。

##后台应用程序可从何处安装？ 

可在[此处](https://visualstudiogallery.msdn.microsoft.com/55b357e1-a533-43ad-82a5-a88ac4b01dec)从 Visual Studio 库中下载并安装 IoT 模板以启用后台应用程序。或者，可通过在 [Visual Studio 库](https://visualstudiogallery.msdn.microsoft.com/)中或直接从“扩展和更新”对话框（“工具”\>“扩展和更新”\>“联机”）中的 Visual Studio 搜索 `Windows IoT Core Project Templates` 来找到模板。

##哪些语言可用？

可找到采用以下语言的**后台应用程序 \(IoT\)** 模板：

* **C++**`File > New > Project > Installed > Visual C++ > Windows > Windows IoT Core`
* **C\#**`File > New > Project > Installed > Visual C# > Windows > Windows IoT Core`
* **Visual Basic**`File > New > Project > Installed > Visual Basic > Windows > Windows IoT Core`
* **JavaScript**`File > New > Project > Installed > JavaScript > Windows > Windows IoT Core`

##如何使用后台应用程序？ 

创建后台应用程序与创建后台任务十分相似。在启动后台应用程序时，将调用运行方法：

{% highlight C++ %}
public void Run(IBackgroundTaskInstance taskInstance)
{
}
{% endhighlight %}

当运行方法结束时，除非创建延迟对象，否则后台应用程序将结束。针对异步编程，常见做法是使用延迟，如下所示：

{% highlight C++ %}
private BackgroundTaskDeferral deferral;
public void Run(IBackgroundTaskInstance taskInstance)
{
    deferral = taskInstance.GetDeferral();
    
    //
    // TODO: Insert code to start one or more asynchronous methods
    //
}
{% endhighlight %}

一旦使用延迟，后台应用程序将继续运行，直到调用延迟对象的完成方法。

{% highlight C++ %}

deferral.Complete();

{% endhighlight %}

在后台应用程序的开始和最终结束之间，大多数通用 Windows 平台 \(UWP\) API 均可用（若要了解例外情况，请参阅[不可用 API]({{site.baseurl}}/{{page.lang}}/win10/UnavailableApis.htm) 列表）。

##如何启动后台应用程序？

此问题可分解为部署和调用两个方面。

若要部署后台应用程序，可执行以下任一操作：

* 使用 Visual Studio 的 F5（将生成、部署和调用）。有关详细信息，请参阅 [Hello World 示例]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm#deploy-the-app-to-your-windows-iot-core-device)，我们将在其中介绍如何从 Visual Studio 部署和启动。

    **注意：**这不会将后台应用程序配置为在设备启动时启动。

* 通过依次选择“项目”\>“应用商店”\>“创建应用包”，在 Visual Studio 中创建 AppX。创建 AppX 后，可使用 [Windows Device Portal]({{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm#apps) 来将其部署到 Windows 10 IoT 核心版设备。

若要调用后台应用程序，可执行以下任一操作：

* 如上所述，Visual Studio 的 F5 功能将部署并立即启动后台应用程序。

    **注意：**这不会将后台应用程序配置为在设备启动时启动。

* 对于已部署到 IoT 设备的后台应用程序，可使用 iotstartup.exe 实用工具将后台应用程序配置为在设备启动时启动。若要将后台应用程序指定为启动应用，请按照以下说明进行操作（**将应用名称**替换为下面的 `BackgroundApplication1`）：

    1. 通过 Windows IoT 核心版设备启动 PowerShell \(PS\) 会话，如[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)所述。

    2. 在 PS 会话中，键入：

            [192.168.0.243]: PS C:\> iotstartup list BackgroundApplication1

    3. 此时应看到后台应用程序的完整名称，如下所示：

            Headed   : BackgroundApplication1-uwp_cqewk5knvpvee!App
            Headless : BackgroundApplication1-uwp_1.0.0.0_x86__cqewk5knvpvee

    4. 实用工具将确认后台应用程序是否为“无外设”应用程序，并且安装是否正确。你还可能看到后台应用程序的有外设项，但这可以忽略不计。

    5. 现在，可轻松地将此应用设置为“启动应用”。只需键入以下命令：

            [192.168.0.243]: PS C:\> iotstartup add headless BackgroundApplication1

    6. 实用工具将确认后台应用程序是否已添加到无外设“启动应用”列表：

            Added Headless: BackgroundApplication1-uwp_1.0.0.0_x86__cqewk5knvpveeplication1

    7. 继续下一步，然后重新启动 Windows IoT 核心版设备。在 PS 会话中，可以发出关闭命令：

            [192.168.0.243]: PS C:\> shutdown /r /t 0

    8. 设备重新启动后，后台应用程序将自动启动，并且 Windows 10 IoT 核心版将确保其在停止时会重新启动。

    9. 可通过键入以下命令，从无外设启动应用列表中删除后台应用程序：

            [192.168.0.243]: PS C:\> iotstartup remove headless BackgroundApplication1

    10. 该实用工具将确认已从无外设“启动应用”列表中删除后台应用程序：

            Removed headless: BackgroundApplication1-uwp_1.0.0.0_x86__cqewk5knvpvee

