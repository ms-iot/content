---
layout: default  
title: WLAN 连接示例  
permalink: /zh-cn/win10/samples/WifiConnectSample.htm  
lang: zh-cn  
---  
  
#WLAN 连接示例  
  
我们将了解如何使用通用 Windows 平台 \(UWP\) 应用（可使用 [`Windows.Devices.WiFi.WiFiAdapter`](https://msdn.microsoft.com/zh-cn/library/windows/apps/windows.devices.wifi.wifiadapter.aspx){:target="_blank"} API）来查找和连接到 WLAN 网络。
  
这是一个有外设示例。若要更好地了解什么是有外设模式以及如何将你的设备配置为有外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。
  
###在 Visual Studio 中加载项目  
  
你可以通过在[此处](https://github.com/ms-iot/samples/tree/develop/WebCamSample/CS){:target="_blank"}下载所有示例的 zip 来查找此示例的源代码。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

可在以下位置找到 WLAN 连接示例的代码：<samples root folder>\\WLANConnect\\CS\\WLANConnect

###连接 WLAN 适配器  
  
你将需要：
  
* WLAN 适配器，例如官方 Raspberry Pi WLAN 硬件保护装置。或者，有关 WLAN 适配器的列表，请查看[生态系统兼容性列表]({{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm){:target="_blank"}
  
将 WLAN 适配器连接到 IoT 设备上的其中一个 USB 端口
  
###部署你的应用  
  
如果你要针对 Minnowboard Max 进行生成，请选择 `x86` 作为体系结构。如果你要针对 Raspberry Pi 2 或 DragonBoard 进行生成，请选择 `ARM`。


选择“远程计算机”以指向 IoT 设备并点击 F5 以部署到你的设备。如需指导，请返回基本“Hello World”[示例]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm){:target="_blank"}。
  
###测试你的应用   
  
示例应用在部署时会显示与以下屏幕类似的屏幕。

![应用已启动]({{site.baseurl}}/Resources/images/WiFiConnectSample/WiFiSample0.png)

如果已将 WLAN 适配器连接到你的开发板，请单击“扫描可用的 WLAN 网络”按钮以开始扫描并在 vcinity 中显示 WLAN 网络列表。

每个 WLAN 网络都由其 SSID 进行标识。此外，还会针对每个网络显示有关 SSID 的某些信息（包括信号强度、通道频率和身份验证模式）。还会针对每个网络显示连接状态。

![WLAN SSID 列表]({{site.baseurl}}/Resources/images/WiFiConnectSample/WiFiSample1.png)

可以通过单击所需网络连接到你的 SSID。如果需要安全密钥（密码），会显示要求输入密码的对话框。另外，还会显示一个复选框，用于询问 WLAN 服务是否应尝试自动重新连接到特定的 SSID（例如在启动时）。

![WLAN SSID 列表]({{site.baseurl}}/Resources/images/WiFiConnectSample/WiFiSample3.png)

状态栏上的消息将指示连接是否已成功；如果不成功，会显示无法建立连接的原因。

最后，因为某些网络可能需要只能通过浏览器提供的其他信息（例如 WLAN 热点），因此该应用将打开浏览器控制以允许用户按需完成连接。或者，如果 Internet 访问已可用，将显示 Bing.com 页面。

![WLAN SSID 列表]({{site.baseurl}}/Resources/images/WiFiConnectSample/WiFiSample2.png)
  

##我们来看看代码  
 
此示例的代码使用 [`Windows.Devices.WiFi.WiFiAdapter`](https://msdn.microsoft.com/zh-cn/library/windows/apps/windows.devices.wifi.wifiadapter.aspx){:target="_blank"} API。
 
**WiFiAdapter** 类可以用于通过使用 Windows 设备上运行的 WLAN 服务来扫描、查找和连接到开放和安全的 WLAN 网络。

### 所需的设备功能

从你的代码访问 WLAN 适配器要求添加到清单的 WLAN 设备的设备功能。`wifiControl` DeviceCapability 是我们需要的功能。所以，我们应将其添加到 AppX 清单，即 **Package.appxmanifest** 文件：

**注意：** 虽然你可以通过在 UI 编辑器中双击并打开 **Package.appxmanifest** 文件来直接添加其他功能，但 wifiControl 只能通过 XML 编辑器（右键单击该文件 -\>“打开方式”-\>“XML\(文本\)编辑器”）并添加以下设备功能来添加：
 
{% highlight xml %}  
  <Capabilities>
    <Capability Name="internetClient" />
	<!-- Add the capability here -->
    <DeviceCapability Name="wifiControl" />
  </Capabilities>
{% endhighlight %}  
 
###方案代码

此示例的代码通常包含在 WLANConnect\_Scanrio.xaml 和 .cs 文件中。

###请求访问
访问设备的第一步是使用静态 `WiFiAdapter.RequestAccessAsync()` 方法来请求访问。

**注意**，在有外设应用中，必须从 UI 线程调用该方法。但是，在 IOT 无外设应用（后台应用程序）中，它不具有 UI 线程，可以从任何线程调用该方法。

授予访问权限后，可立即使用任何 WiFiAdapter 方法。因此，我们首先尝试使用 WLANAdapter 设备选择器在当前设备上查找 WLAN 适配器。

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
 
或者，使用 `WiFiAdapter.FindAllAdaptersAsync()` 来查找所有 WLAN 适配器，以达成相同目的。

{% highlight C# %}  
// Not part of the sample:
var result = await WiFiAdapter.FindAllAdaptersAsync();
if (result.Count >= 1)
{
    firstAdapter = result[0];
    // rest of the code
}
{% endhighlight %} 


###扫描 WLAN 网络

下一步是扫描可用的 WLAN 网络，可使用 `WiFiAdapter.ScanAsync()` 方法来实现此操作。

{% highlight C# %}  
 private async void Button_Click(object sender, RoutedEventArgs e)
 {
    await firstAdapter.ScanAsync();
    ConnectionBar.Visibility = Visibility.Collapsed;
    DisplayNetworkReport(firstAdapter.NetworkReport);
}
{% endhighlight %}  

扫描完成后，将更新 `WiFiAdapter.NetworkReport` 属性，该属性可用于获取和显示信息，以便标识使用 `WiFiAvailableNetwork` 的只读集合找到的每个 WLAN 网络。我们会将每个网络添加到结果集合，以便可以使用 `WiFiNetworkDisplay` 帮助程序类的属性将其映射到 Xaml UI。

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

###连接到 WLAN 网络

当选择其中一个显示的 WLAN 网络时，我们需要确定是否要收集密码凭据。WLAN 网络身份验证类型是我们需要确定的内容：

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

最后，若要连接到所选的网络，需要使用 `WiFiAdapter.ConnectAsync()` 的重载。该方法的重载允许指定要连接的可用网络、密码（如果需要）以及是否自动重新连接到处于范围内的此网络。

异步结果中返回的状态会指示连接是否已成功。仅 `WiFiConnectionStatus.Success` 指示成功。其他返回的值指示连接失败的原因。
 
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

如果需要断开连接，可使用 `WiFiAdapter.Disconnect()`。
  
###总结：  
  
* 若要启用 WLAN 设备访问，请将 `wifiControl` DeviceCapability 添加到 AppX 清单

* 在该代码中，首先使用 `WiFiAdapter.RequestAccessAsync()` 请求对 WLANAdapter 方法的访问权限
  
* 通过使用 WLAN 适配器设备选择器或 `WiFiAdapter.FindAllAdaptersAsync()` 枚举 WLAN 设备来查找可用的 WLAN 适配器
  
* 使用 `WiFiAdapter.ScanAsync()` 方法查找所有可用的网络
  
* 最后，使用 `WiFiAdapter.ConnectAsync()` 连接到可用的网络，并检查连接结果
