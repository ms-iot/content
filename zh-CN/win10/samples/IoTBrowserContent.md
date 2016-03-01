#IoT 浏览器示例

{% include VerifiedVersion.md %}

我们将为你的 Windows 10 IoT 核心版设备创建简单的 Web 浏览器应用程序。

这是一个有外设示例。若要更好地了解什么是有外设模式以及如何将你的设备配置为有外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。

由于此示例只使用标准 Windows UWP 功能，因此它还可以在桌面上运行。

该示例基于 Windows。

###在 Visual Studio 中加载项目

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\IoTBrowser` 来查找此示例的源代码。示例代码为 C\#。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

{% include_relative AppDeploymentCS.md %}

完成所有设置后，你应该可以在 Visual Studio 中按 F5。IoT 浏览器应用将在 Windows IoT 设备上部署并启动。

###我们来看看代码
此示例的代码相当简单：

<ul>
<li>嵌入 webview 控件</li>
<li>作为地址栏的文本框</li>
<li>用于启动导航的“转到”按钮</li>
<li>以及三个收藏夹按钮</li>
</ul>

当按下“转到”按钮时，我们将调用 Web 导航帮助程序方法以执行实际导航。

###UX 代码
    <Grid Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
        <Grid.RowDefinitions>
            <RowDefinition Height="65"></RowDefinition>
            <RowDefinition Height="*"></RowDefinition>
            <RowDefinition Height="65"></RowDefinition>
        </Grid.RowDefinitions>

        <!--Address bar-->
        <StackPanel Grid.Row="0" Orientation="Horizontal">
            <TextBox x:Name="Web_Address" FontSize="24" TextWrapping="Wrap" Text="http://www.bing.com" VerticalAlignment="Center" VerticalContentAlignment="Center" Height="54" Width="958" KeyUp="Web_Address_KeyUp"/>
            <Button x:Name="Go_Web" Content="Go!" HorizontalAlignment="Right" VerticalAlignment="Center" Height="60" Width="107" Click="Go_Web_Click"/>
        </StackPanel>

        <!--Web view control-->
        <WebView x:Name="webView" Grid.Row="1"/>

        <!--Favorites buttons-->
        <StackPanel Grid.Row="2" Orientation="Horizontal" >
            <Button x:Name="Go_WOD" VerticalAlignment="Center" HorizontalAlignment="Center" Height="60" Width="120" Margin="0,0,15,0" Click="Go_WOD_Click">
                <TextBlock Text="Windows on Devices" TextWrapping="Wrap"/>
            </Button>
            <Button x:Name="Go_Hackster" Content="Hackster.io" VerticalAlignment="Center" Height="60" Width="120" Margin="0,0,15,0" Click="Go_Hackster_Click"/>
            <Button x:Name="Go_GitHub" Content="GitHub.com" VerticalAlignment="Center" Height="60" Width="120" Margin="0,0,15,0" Click="Go_GitHub_Click"/>
        </StackPanel>
    </Grid>

###DoWebNavigate 导航帮助程序方法
此帮助程序通过 Web\_Address.Text 中的当前值使用 WebView.Navigate 方法

###DoWebNavigate 代码
    if (Web_Address.Text.Length > 0)
    {
        webView.Navigate(new Uri(Web_Address.Text));
    }

###“收藏夹”按钮
三个收藏夹只使用预配置的值填充地址栏，然后调用 DoWebNavigate 帮助程序。

###收藏夹代码
    private void Go_Hackster_Click(object sender, RoutedEventArgs e)
    {
        Web_Address.Text = "https://www.hackster.io/windowsiot";
        DoWebNavigate();
    }
