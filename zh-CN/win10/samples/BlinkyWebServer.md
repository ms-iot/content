---
layout: default
title: Blinky WebServer 示例
permalink: /zh-cn/win10/samples/BlinkyWebServer.htm
lang: zh-cn
---

##Blinky Webserver

{% include VerifiedVersion.md %}

我们将要创建一个受其他应用的 WebServer 控制的简单 Blinky 应用，并将 LED 连接到你的 Windows IoT 核心版设备。请注意，GPIO API 仅在 Windows IoT 核心版上可用，因此该示例无法在你的桌面上运行。


###在 Visual Studio 中加载项目

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\App2App WebServer` 来查找此示例的源代码。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

确保将 LED 连接到开发板。如需指导，请返回基本“Blinky”[示例]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)。

请注意，如果应用找不到任何可用 GPIO 端口，则该应用将无法成功运行。

###我们来看看代码

我们将要借此示例演示两个观点：如何实现 WebServer，以及如何启用应用到应用的通信。为了演示此观点，本示例包含：

* WebServerApp – 此项目将注册一个 BackgroundTask，用于提供 Web 服务器，并托管应用到应用的通信服务。

* BlinkyApp – 此 UWP 应用类似于 Blinky 示例应用，不过，LED 电源状态由 webserver 控制。


###WebServerApp

若要创建可与我们的 Blinky 应用通信的 WebServer，我们需要完成两项操作：实现实际服务器，并启用应用到应用的通信。实现服务器的核心要素是“StreamSocketListener”。以下是实现服务器所需内容的简化版本：

{% highlight C# %}
public sealed class HttpServer : IDisposable
{
    public void StartServer(int port)
    {
        // Create and bind our StreamSocket to a port and process
        // requests as they arrive
        StreamSocketListener listener = new StreamSocketListener();
        listener.BindServiceNameAsync(port.ToString());
        listener.ConnectionReceived += (s, e) =>
            {
                // Read request from the socket
                using (IInputStream input = e.Socket.InputStream)
                {
                    . . .
                    await input.ReadAsync(buffer, BufferSize, InputStreamOptions.Partial);
                    . . .
                }

                // Parse request and compose response
                . . .

                // Write response to the socket
                using (IOutputStream output = socket.OutputStream)
                {
                    using (Stream resp = output.AsStreamForWrite())
                    {
                        // Update the WebServer client
                        . . .
                    }
                }
            }

    }
}
{% endhighlight %}

为了使它充当服务器，我们需要在 Package.appxmanifest 中添加新功能：

{% highlight XML %}
<Capabilities>
    <Capability Name="internetClient" />
    <Capability Name="internetClientServer" />
</Capabilities>
{% endhighlight %}


为了使它与其他应用通信，我们需要在 Package.appxmanifest 中添加一些特殊配置。具体而言，我们需要添加“windows.appService”扩展。此扩展需要两部分信息：

1. 该扩展的 EntryPoint 属性必须指定 BackgroundTask 的命名空间和类。此 BackgroundTask 将提供应用到应用的通信实现。
2. AppService 的 Name 属性必须指定应用到应用的通信服务的名称。此服务名称（与此应用程序的 PackageFullName 相结合）可被视为所有应用在通信时使用的连接地址。

可对这些属性进行如下所示的修改：

{% highlight XML %}
<Applications>
    <Application Id="App">

        . . .

        <Extensions>
            <uap:Extension Category="windows.appService" EntryPoint="WebServerTask.WebServerBGTask">
                <uap:AppService Name="Ap2AppComService" />
            </uap:Extension>
        </Extensions>
    </Application>
</Applications>
{% endhighlight %}


此时，已建立所有必要的构造块。我们可以着重于将它们组合在一起。首先，必须实现 BackgroundTask。BackgroundTask 是由一个“Run”方法组成的 IBackgroundTask 接口的简单实现。必须在此方法中开始实现 WebServer 和应用到应用的通信。

对于 WebServer，BackgroundTask 必须实例化 WebServer 并实现应用到应用的通信。

{% highlight C# %}
BackgroundTaskDeferral _serviceDeferral;

public void Run(IBackgroundTaskInstance taskInstance)
{
    // Get the deferral object from the task instance
    _serviceDeferral = taskInstance.GetDeferral();

    var appService = taskInstance.TriggerDetails as AppServiceTriggerDetails;
    if (appService != null && appService.Name == "Ap2AppComService")
    {
        // Start our WebServer asynchronously
        HttpServer server = new HttpServer();
        IAsyncAction asyncAction = Windows.System.Threading.ThreadPool.RunAsync(
            (workItem) =>
            {
                // We can pass our AppServiceConnection instance to the WebServer to
                // allow it to participate in the app-to-app communication
                server.StartServer(appService.AppServiceConnection);
            });

        // Implement the app-to-app communication service request listener
        appService.AppServiceConnection.RequestReceived += (sender, args) =>
            {
                var message = args.Request.Message;

                // We can handle various requests from other apps here and respond using
                // 'await args.Request.SendResponseAsync'
                . . .
            };
    }
}
{% endhighlight %}


###BlinkyApp

客户端应用与 Blinky [示例]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm)十分相似。此处补充的主要内容是，我们允许使用 WebServer 来配置 LED 的开/关状态。若要通过应用到应用的机制建立与 WebServer 应用的连接，我们需要：

1. 创建一个 AppServiceConnection 对象

2. 使用来自 WebServer 应用的信息配置 AppServiceConnection：

    * PackageFamilyName - 这特定于每个应用。在我们的示例中，PackageFamilyName 是 `WebServer_hz258y3tkez3a`。它通过 Visual Studio 生成，合并了 appxmanifest 的 Identity.Name 属性和应用证书的哈希值。找到它的便捷方法是部署你的应用并运行 `iotstartup list`。这将针对有外设应用列出 PackageFamilyName，并针对无外设应用列出 PackageFullName（PackageFamilyName 的带有版本的超集）。

    * AppServiceName - 这是在 appxmanifest 的 AppService.Name 属性中指定的值。

3. 发送/接收消息。

{% highlight C# %}
// Initialize the AppServiceConnection
AppServiceConnection appServiceConnection = new AppServiceConnection();
// Provide the PackageFullName of the WebServerApp
appServiceConnection.PackageFamilyName = "WebServer_hz258y3tkez3a";
// Provide the AppService Name specified in WebServerApp's Package.appxmanifest
appServiceConnection.AppServiceName = "Ap2AppComService";

// Establish the app-to-app connection
var res = await appServiceConnection.OpenAsync();
if (res == AppServiceConnectionStatus.Success)
{
    appServiceConnection.RequestReceived += (sender, args) =>
        {
            // Messages received can be handled here as needed
            . . .
        };

    // We can send messages via 'appServiceConnection.SendMessageAsync'
    . . .
}
{% endhighlight %}

###部署和运行示例
若要使 Blinky WebServer 运行，请先部署 WebServer 项目。这将会注册应用到应用的通信机制。然后，部署并运行 Blinky 项目。这将会启动我们的有外设 Blinky 应用，然后初始化并启动应用到应用的通信（同时会启动 Web 服务器）。接下来，可以根据下一步骤的详细描述，使用 Web 客户端进行全面测试。

有关如何部署应用程序的说明，请参阅[此处]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#csharp)的说明。

###Web 客户端
对于我们的示例应用，我们已在 Windows IoT 核心版设备上的 WebServer 中托管了一个简单的客户端。可以通过开发板和端口的 IP 地址（类似于 http://123.456.789.0:8000，在其中你将 123.456.789.0 替换为服务器已部署到的设备的 IP 地址）访问它。然后，可以使用 WebServer 客户端打开和关闭 LED（请参阅以下屏幕截图）。

![WebServer 客户端]({{site.baseurl}}/Resources/images/WebServer/webserver_client.png)
