---
layout: default
title: Blinky WebServer Sample
permalink: /en-US/win10/samples/BlinkyWebServer.htm
lang: en-US
---

##Blinky WebServer

{% include VerifiedVersion.md %}

We'll create a simple Blinky app controlled by another app's WebServer and connect a LED to your Windows IoT Core device.  Be aware that the GPIO APIs are
only available on Windows IoT Core, so this sample cannot run on your desktop.


###Load the project in Visual Studio

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\App2App WebServer`.  Make a copy of the folder on your disk and open the
project from Visual Studio.

Make sure you connect the LED to your board. Go back to the basic 'Blinky' [sample]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm) if you need guidance.

Note that the app will not run successfully if it cannot find any available GPIO ports.

###Let's look at the code

We are demonstrating two ideas with this sample: how to implement a WebServer and how to enable app-to-app communication.  To demonstrate
this, the sample contains:

* WebServerApp - this project registers a BackgroundTask which provides a web server and hosts an app-to-app communication service.

* BlinkyApp - this is a UWP app similar to the Blinky sample app except that the LED power state is controlled by the webserver.


###WebServerApp

To create a WebServer that can communicate with our Blinky app, we need to do two things:  implement an actual
server and enable app-to-app communication.  At the core of our server implementation is a 'StreamSocketListener'.
Here is a simplified version of what we need to implement this:

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

To be allowed to function as a server, we need to add a new capability to the Package.appxmanifest:

{% highlight XML %}
<Capabilities>
    <Capability Name="internetClient" />
    <Capability Name="internetClientServer" />
</Capabilities>
{% endhighlight %}


To be allowed to communicate with other apps, we need to add some special configuration to Package.appxmanifest.  Specifically, we to
add the extension: 'windows.appService'.  This extension requires two pieces of information:

1. The extension's EntryPoint attribute must specify the Namespace and Class of a BackgroundTask.  This BackgroundTask will provide
the implementation of our app-to-app communication.
2. The AppService's Name attribute must specify the name of our app-to-app communication service.  This service name can
be thought of, in conjunction with this Application's PackageFullName, as the address of the connection which is used for all
apps communicating.

These properties can be modified like this:

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


At this point, all of the requisite building blocks have been established.  We can focus on putting them together.  First, our
BackgroundTask must be implemented.  A BackgroundTask is a simple implementation of the IBackgroundTask interface which consists
of a 'Run' method.  The implementation of our WebServer and app-to-app communication must begin in this method.

For our WebServer, our BackgroundTask must instantiate our WebServer and implement our app-to-app communication.

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

The client app is very similar to the Blinky [sample]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm).  The major addition here is that we are allowing a WebServer to
be used to configure the on/off state for our LED.  To establish a connection with the WebServer app via the app-to-app mechanism, we
need to:

1. Create an AppServiceConnection object

2. Configure the AppServiceConnection with information from the WebServer app:

    * PackageFamilyName - this is specific to every app.  In our sample, the PackageFamilyName is `WebServer_hz258y3tkez3a`.  It is generated by Visual Studio, which combines the appxmanifest's Identity.Name property and a hash of the App's certificate.  An easy way to find it is to deploy your app and run `iotstartup list`.  This will list the PackageFamilyName for headed apps and PackageFullName (a versioned superset of the PackageFamilyName) for headless apps.

    * AppServiceName - this is the value specified in the appxmanifest's AppService.Name property.

3. Send/receive messages.

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

###Deploy and Run Sample
To get the Blinky WebServer running, first deploy the WebServer project.  This will register the app-to-app communication mechanism.  Then deploy and run the Blinky project.  This will start our headed Blinky app and initialize and start the app to app communication (which will also start the web server).  You can then test it all with the web client as detailed in the next step.

For instructions on how to deploy applications, see the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#csharp).

###Web Client
For our sample app, we have hosted a simple client in our WebServer on the Windows Windows IoT Core device. It can be accessed via the IP address
of the board and the port (something like http://123.456.789.0:8000 where you replace 123.456.789.0 with the IP address
of the device the server has been deployed to). The webserver client can then be used to toggle the LED on and off
(see screenshot below).

![WebServer Client]({{site.baseurl}}/images/WebServer/webserver_client.png)
