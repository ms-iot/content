---
layout: default
title: Blinky WebServer Sample
permalink: /en-US/win10/samples/BlinkyWebServer.htm
lang: en-US
---

## Blinky WebServer

{% include VerifiedVersion.md %}

We'll create a simple Blinky app controlled by another app's web server on your Windows IoT Core device.  Be aware that the GPIO APIs are
only available on Windows IoT Core, so this sample cannot run on your desktop.


### Load the project in Visual Studio

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\App2App WebServer`.  Make a copy of the folder on your disk and open the
project from Visual Studio.

Make sure you connect the LED to your board. Go back to the basic 'Blinky' [sample]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm) if you need guidance.

Note that the app will not run successfully if it cannot find any available GPIO ports.

### Let's look at the code

We are demonstrating two ideas with this sample: how to implement a WebServer and how to enable app-to-app communication.  To demonstrate
this, the sample contains:

* BlinkyApp - this is a UWP app that toggles an LED connected to your Windows IoT Core device.  An app-to-app communication service is hosted which enables communication with a web server.

* HttpServer - this is a background application that provides a simple web server, sending BlinkyApp updates based on input from the web page.


### BlinkyApp

The client app is very similar to the Blinky [sample]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm).  The major addition here is that we are allowing a web server to
be used to configure the on/off state for our LED.  

To allow other apps to communicate with BlinkyApp, we need to add some special configuration to Package.appxmanifest.  Specifically, we need to
add the extension: 'windows.appService'.  This extension requires two pieces of information:

1. The extension's EntryPoint attribute must specify the Namespace and Class of a BackgroundTask.  This BackgroundTask will provide
the implementation of our app-to-app communication.  We've defined a separate Windows Runtime Component project, App2AppCommunication,
and class, App2AppCommunication.AppService, to show how this is accomplished.
2. The AppService's Name attribute must specify the name of our app-to-app communication service.  This service name can
be thought of, in conjunction with this Application's PackageFullName, as the address of the connection which is used for all
apps communicating.

For this sample, this is what the additions to Package.appxmanifest look like:

{% highlight XML %}
<Applications>
    <Application Id="App">

        . . .

        <Extensions>
            <uap:Extension Category="windows.appService" EntryPoint="App2AppCommunication.AppService">
                <uap:AppService Name="App2AppComService" />
            </uap:Extension>
        </Extensions>
    </Application>
</Applications>
{% endhighlight %}

The AppService's implementation is quite simple.  For this sample, we simply receive a request from another app,
verify that the request is intended for our app, update the LocalSettings, and notify the GUI app that the settings
have changed:

{% highlight C# %}
public void Run(IBackgroundTaskInstance taskInstance)
{
    // Get the deferral object from the task instance
    serviceDeferral = taskInstance.GetDeferral();

    var appService = taskInstance.TriggerDetails as AppServiceTriggerDetails;
    if (appService != null &&
        appService.Name == "App2AppComService")
    {
        appServiceConnection = appService.AppServiceConnection;
        appServiceConnection.RequestReceived += (sender, args) => {
            var messageDefferal = args.GetDeferral();
            ApplicationData.Current.LocalSettings.Values["BlinkyState"] = args.Request.Message["Command"] as string;
            messageDefferal.Complete();

            ApplicationData.Current.SignalDataChanged();
        };
    }
}
{% endhighlight %}


### HttpServer

To create a web server that can communicate with BlinkyApp, we need to implement an actual
server.  At the core of our server implementation is a 'StreamSocketListener'.
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


We will use a Background Application to run the WebServer.  To do this, we simply need to instantiate our HttpServer class in the BackgroundTask's 'Run' method.  To communicate with 
the GUI app, we will invoke the app-to-app communication that was configured in BlinkyApp.

1. Create an AppServiceConnection object

2. Configure the AppServiceConnection with information from the WebServer app:

    * PackageFamilyName - this is specific to every app.  In our sample, the PackageFamilyName is `BlinkyWebService_1w720vyc4ccym`.  It is generated by Visual Studio, which combines the appxmanifest's Identity.Name property and a hash of the App's certificate.  An easy way to find it is to deploy your app and run `iotstartup list`.  This will list the PackageFamilyName for headed apps and PackageFullName (a versioned superset of the PackageFamilyName) for headless apps.

    * AppServiceName - this is the value specified in the appxmanifest's AppService.Name property.

3. Send/receive messages.

{% highlight C# %}
BackgroundTaskDeferral _serviceDeferral;
HttpServer _server;

public void Run(IBackgroundTaskInstance taskInstance)
{
    // Get the deferral object from the task instance
    _serviceDeferral = taskInstance.GetDeferral();

    // Start our WebServer
    _server = new HttpServer();
    IAsyncAction asyncAction = Windows.System.Threading.ThreadPool.RunAsync(
        (workItem) =>
        {
            // Initialize the AppServiceConnection
            AppServiceConnection appServiceConnection = new AppServiceConnection();
            // Provide the PackageFullName of the BlinkyApp
            appServiceConnection.PackageFamilyName = "BlinkyWebService_1w720vyc4ccym";
            // Provide the AppService Name specified in BlinkyApp's Package.appxmanifest
            appServiceConnection.AppServiceName = "App2AppComService";

            // Establish the app-to-app connection
            var res = await appServiceConnection.OpenAsync();

            // We can send Messages ti other apps using
            // 'appServiceConnection.SendMessageAsync'

            // We can pass our AppServiceConnection instance to the WebServer to
            // allow it to participate in the app-to-app communication
            _server.StartServer(appServiceConnection);
        });
    }
}
{% endhighlight %}


### Deploy and Run Sample
To get the Blinky WebServer running, first deploy the Blinky project.  This will start the GUI app and register the app-to-app communication mechanism.  Then deploy and run the HttpServer project.  You can then test it all with the web client as detailed in the next step.

For instructions on how to deploy applications, see the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#csharp).

### Web Client
For our sample app, we have hosted a simple client in our HttpServer on the Windows Windows IoT Core device. It can be accessed via the IP address
of the board and the port (something like http://123.456.789.0:8000 where you replace 123.456.789.0 with the IP address
of the device the server has been deployed to). The webserver client can then be used to toggle the LED on and off
(see screenshot below).

![WebServer Client]({{site.baseurl}}/Resources/images/WebServer/webserver_client.png)
