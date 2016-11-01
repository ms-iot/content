---
layout: sample  
title: Wi-Fi Connector  
description: Connect your IoT Core device to Wi-Fi
keyword: Windows 10 IoT Core, Wi-Fi, wifi, connectivity, Beginner
permalink: /en-US/Samples/WiFiConnector.htm  
samplelink: https://github.com/ms-iot/samples/tree/develop/WiFiConnector/CS
lang: en-US  
---  

# Wi-Fi Connector
  
We'll learn how to find and connect to Wi-Fi networks using a Universal Windows Platform (UWP) app that makes use of the [`Windows.Devices.WiFi.WiFiAdapter`](https://msdn.microsoft.com/en-us/library/windows/apps/windows.devices.wifi.wifiadapter.aspx){:target="_blank"} API.  
  
This is a headed sample.  To better understand what headed mode is and how to configure your device to be headed, follow the instructions on the [Headed and Headless mode]({{site.baseurl}}/{{page.lang}}/Docs/HeadlessMode) site.  
  
### Load the project in Visual Studio  
  
You can find the source code for this sample in our [git repository](https://github.com/ms-iot/samples){:target="_blank"}. Clone the project to your machine and open the project from Visual Studio.  

The code for the WiFi Connect sample can be found under: [\WiFiConnect\CS\WiFiConnect](https://github.com/ms-iot/samples/tree/develop/WiFiConnect/CS/WiFiConnect){:target="_blank"}  

### Connecting your WiFi adapter  
  
You'll need:  
  
* A Windows 10 IoT Core capable board with onboard WiFi, such as the Raspberry Pi 3 or DragonBoard 410c or
* A USB WiFi adapter. For a list of supported Wi-Fi adapters see the [Ecosystem Compatibility List]({{site.baseurl}}/{{page.lang}}/Docs/HardwareCompatList){:target="_blank"}
  
### Deploy your app  
  
If you're building for Minnowboard Max, select `x86` as the architecture. If you're building for Raspberry Pi 2 or 3 or DragonBoard , select `ARM`.  


Select **Remote Machine** to point to IoT device and hit F5 to deploy to your device. Go back to the basic 'Hello World' [sample]({{site.baseurl}}/{{page.lang}}/Samples/HelloWorld){:target="_blank"}. if you need guidance   
  
### Test your app   
  
The sample app when deployed displays a screen similar to the one below. 

![App Started]({{site.baseurl}}/Resources/images/WiFiConnectSample/WiFiSample0.png)

If you have a Wi-Fi adapter connected to your board, click on the "Scan Available WiFi Networks" button to start scanning and displaying the list of Wi-Fi networks in the vcinity.

Each WiFi network is identified by its SSID. Aditionally, some information about the SSID including the signal strength, channel frequency and authentication mode are displayed for each. The connection status is also shown for each.

![WiFi SSID list]({{site.baseurl}}/Resources/images/WiFiConnectSample/WiFiSample1.png)

You can connect to the your SSID by clicking on the one you need. If a security key (password) is needed, a dialog will be displayed asking for it. Also, a checkbox asking if the WiFi service should attempt to reconnect to the particular SSID automatically such as at boot time.

![WiFi SSID list]({{site.baseurl}}/Resources/images/WiFiConnectSample/WiFiSample3.png)

A message on the status bar will indicate if the connection has been successful, or if not the reason the connection could not be made.

Finally, because some networks may require additional information that can only be provided through a browser; e.g. Wi-Fi hot spots, the app will open a browser control to enable users to complete a connection as needed. Or, if Internet access is already available, the Bing.com page will be displayed.

![WiFi SSID list]({{site.baseurl}}/Resources/images/WiFiConnectSample/WiFiSample2.png)
  

## Let's look at the code  
 
The code for this sample makes use of the [`Windows.Devices.WiFi.WiFiAdapter`](https://msdn.microsoft.com/en-us/library/windows/apps/windows.devices.wifi.wifiadapter.aspx){:target="_blank"} API.   
 
The **WiFiAdapter** class can be used to scan, find and connect to both open and secure WiFI networks by making use of the Wlan service running on Windows devices.

### Required device capabiity

Accessing the Wi-Fi adapter from your code requires a device capability for WiFi devices added to the manifest. The `wifiControl` DeviceCapability is the one we need. So, we should add it to the AppX manifest, **Package.appxmanifest** file:

**NOTE:** While you can add other capabilities directly by double clicking and opening the **Package.appxmanifest** file in the UI editor, the wifiControl can only be added via the XML editor (Right Click on the file -> Open with -> XML (Text) Editor) and adding the device capability below:
 
{% highlight xml %}  
  <Capabilities>
    <Capability Name="internetClient" />
	<!-- Add the capability here -->
    <DeviceCapability Name="wifiControl" />
  </Capabilities>
{% endhighlight %}  
 
### Scenario Code

The code of this sample is mostly contained within WiFiConnect_Scanrio.xaml and .cs files.  

### Requesting access
The first step to access the device is to request access using the static `WiFiAdapter.RequestAccessAsync()` method.

**Note**, in a headed app, the method must be called from the UI thread. However, in an IOT headless app (Background Application), which doesn't have a UI thread, the method can be called from any thread.

When access is granted, any of the WiFiAdapter methods can now be used. So, we start by trying to find a Wi-Fi adapter on the current device, using the WiFiAdapter device selector.

{% highlight C# %}  
var access = await WiFiAdapter.RequestAccessAsync();
if (access != WiFiAccessStatus.Allowed)
{
    rootPage.NotifyUser("Access denied", NotifyType.ErrorMessage);
}
else
{
    DataContext = this;

    var result = await Windows.Devices.Enumeration.DeviceInformation.FindAllAsync(WiFiAdapter.GetDeviceSelector());
    if (result.Count >= 1)
    {
        firstAdapter = await WiFiAdapter.FromIdAsync(result[0].Id);

        var button = new Button();
        button.Content = string.Format("Scan Available Wifi Networks");
        button.Click += Button_Click;
        Buttons.Children.Add(button);
    }
    else
    {
        rootPage.NotifyUser("No WiFi Adapters detected on this machine.", NotifyType.ErrorMessage);
    }
}
{% endhighlight %} 
 
Alternatively, `WiFiAdapter.FindAllAdaptersAsync()` can be used to find all WiFi adapters to achieve the same. 

{% highlight C# %}  
// Not part of the sample:
var result = await WiFiAdapter.FindAllAdaptersAsync();
if (result.Count >= 1)
{
    firstAdapter = result[0];
    // rest of the code
}
{% endhighlight %} 


### Scanning for Wi-Fi networks

The next step is to scan for available WiFi networks, this can be achieved using the `WiFiAdapter.ScanAsync()` method.

{% highlight C# %}  
 private async void Button_Click(object sender, RoutedEventArgs e)
 {
    await firstAdapter.ScanAsync();
    ConnectionBar.Visibility = Visibility.Collapsed;
    DisplayNetworkReport(firstAdapter.NetworkReport);
}
{% endhighlight %}  

When the scan is complete, the `WiFiAdapter.NetworkReport` property is updated which  can then be used to get and display information to identify each of the wifi networks found using a read-only collection of `WiFiAvailableNetwork`s. We add each to the result collection, so it can then be mapped to Xaml UI using properties of the `WiFiNetworkDisplay` helper class.

{% highlight C# %}  
private void DisplayNetworkReport(WiFiNetworkReport report)
{
    rootPage.NotifyUser(string.Format("Network Report Timestamp: {0}", report.Timestamp), NotifyType.StatusMessage);

    ResultCollection.Clear();

    foreach (var network in report.AvailableNetworks)
    {
        ResultCollection.Add(new WiFiNetworkDisplay(network, firstAdapter));
    }
}
{% endhighlight %}  

### Connecting to a Wi-Fi network

When a Wi-Fi network is selected from the ones displayed, we need to determine if we want to collect the password credential. The Wi-Fi network authentication type is what we need to determine that:

{% highlight C# %}  
// Only show the password box if needed
if (selectedNetwork.AvailableNetwork.SecuritySettings.NetworkAuthenticationType == NetworkAuthenticationType.Open80211)
{
    NetworkKeyInfo.Visibility = Visibility.Collapsed;
}
else
{
    NetworkKeyInfo.Visibility = Visibility.Visible;
}
{% endhighlight %}  

Finally, to connect to the selected network, an overload of `WiFiAdapter.ConnectAsync()` need to be used. The method's overloads allow specifying the available network to connect to, password if needed and whehther or not to automatically reconnect to this network when in range.

The status returned in the async result indicates whether the connection was successful or. Only `WiFiConnectionStatus.Success` indicates success. Other returned values indicates the connection failure reason.
 
{% highlight C# %}  
WiFiConnectionResult result;
if (selectedNetwork.AvailableNetwork.SecuritySettings.NetworkAuthenticationType == Windows.Networking.Connectivity.NetworkAuthenticationType.Open80211)
{
    result = await firstAdapter.ConnectAsync(selectedNetwork.AvailableNetwork, reconnectionKind);
}
else
{
    // Only the password potion of the credential need to be supplied
    var credential = new PasswordCredential();
    credential.Password = NetworkKey.Password;

    result = await firstAdapter.ConnectAsync(selectedNetwork.AvailableNetwork, reconnectionKind, credential);
}

if (result.ConnectionStatus == WiFiConnectionStatus.Success)
{
    rootPage.NotifyUser(string.Format("Successfully connected to {0}.", selectedNetwork.Ssid), NotifyType.StatusMessage);

    // refresh the webpage
    webViewGrid.Visibility = Visibility.Visible;
    toggleBrowserButton.Content = "Hide Browser Control";
    refreshBrowserButton.Visibility = Visibility.Visible;
}
else
{
    rootPage.NotifyUser(string.Format("Could not connect to {0}. Error: {1}", selectedNetwork.Ssid, result.ConnectionStatus), NotifyType.ErrorMessage);
}
{% endhighlight %}  

If you need to disconnect, `WiFiAdapter.Disconnect()` can be used.
  
### To summarize:  
  
* To enable Wi-Fi device access, add the `wifiControl` DeviceCapability to the AppX manifest

* In the code, first thing is to request access to WiFiAdapter methods using `WiFiAdapter.RequestAccessAsync()`
  
* Find available WiFi adapters by enumerating wifi devices using WiFi adapter device selector or `WiFiAdapter.FindAllAdaptersAsync()`
  
* Use the `WiFiAdapter.ScanAsync()` method to find all available networks
  
* Finally, connect to an available network using `WiFiAdapter.ConnectAsync()` and check the connection result
