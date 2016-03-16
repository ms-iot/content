---
layout: default
title: HelloWorld
permalink: /zh-cn/win10/samples/HelloWorld.htm
lang: zh-cn
---

##“Hello, World!” 示例

{% include VerifiedVersion.md %}

在此示例中，我们将创建知名度最高的应用“Hello World”，并将其部署到运行 Windows IoT 核心版的任何设备中！

###创建新的 C\# 项目
你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\HelloWorld` 来查找此示例的源代码，但作为练习，本教程将指导你完成从头开始创建此应用的完整步骤。你需要确保已从[此处](https://visualstudiogallery.msdn.microsoft.com/55b357e1-a533-43ad-82a5-a88ac4b01dec)安装了 Windows IoT 核心版项目模板。

1. 启动 Visual Studio 2015。

1. 创建新项目 `(File \| New Project...)`。
       
    * 在“`New Project`”对话框中，导航到“`Universal`”，如下所示（在该对话框的左侧窗格中： “模板”\|“Visual C\#”\|“Windows”\|“通用”）。
    
1. 选择模板 `Blank App (Windows Universal)`。

    * 请记住为你的第一个应用指定一个好名称！ 在本示例中，我们将该项目命名为“HelloWorld”。

    ![应用模板位置]({{site.baseurl}}/Resources/images/HelloWorld/new-cs-project-dialog.PNG)

> ####Windows 10 开发人员模式说明
> 如果这是你创建的第一个项目，Visual Studio 可能会提示你启用 Windows 10 开发人员模式。为此，你将需要按照[此处](https://msdn.microsoft.com/library/windows/apps/xaml/dn706236.aspx){:target="_blank"}提供的步骤操作

###添加对 Windows IoT 扩展 SDK 的引用

由于默认情况下 IoT 扩展 SDK 不会添加到项目，因此我们将需要添加引用，以便 `Windows.Devices.Gpio` 之类的命名空间在项目中可用。若要执行此操作，只需右键单击项目下的“引用”项、选择“添加引用”，然后将生成的对话框导航到 `Universal Windows->Extensions->Windows IoT Extensions for the UWP`、选中该框，并单击“确定”。

![添加扩展 SDK]({{site.baseurl}}/Resources/images/HelloWorld/Add_IoT_Extension_Reference.PNG)

###向 MainPage.xaml 添加内容
让我们向 MainPage 添加一些内容。从“解决方案资源管理器”中，选择“MainPage.xaml”文件。我们想要添加一个文本框和一个按钮，以显示某些交互信息。因此，我们将编辑 XAML 文件来添加这些元素。在设计器的 XAML 部分中找到 `<Grid>` 标记，并添加以下标记。

{% highlight XML %}
<Grid Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    <StackPanel HorizontalAlignment="Center" VerticalAlignment="Center">
    <TextBox x:Name="HelloMessage" Text="Hello, World!" Margin="10" IsReadOnly="True"/>
    <Button x:Name="ClickMe" Content="Click Me!"  Margin="10" HorizontalAlignment="Center"/>
    </StackPanel>
</Grid>
{% endhighlight %}

现在，我们拥有一个文本框和一个按钮，可以添加一些将在按下按钮时执行的代码。在设计图面中双击该按钮： Visual Studio 将在“MainPage.xaml.cs”中向按钮 XAML 标记添加 `Click` 属性，并生成 `ClickMe_Click` 方法。让我们在该方法中添加一行简单的代码。

*MainPage.xaml:*

{% highlight XML %}
<Button x:Name="ClickMe" Content="Click Me!"  Margin="10" HorizontalAlignment="Center" Click="ClickMe_Click"/>
{% endhighlight %}
  
*MainPage.xaml.cs:*

{% highlight C# %}
private void ClickMe_Click(object sender, RoutedEventArgs e)
{
    this.HelloMessage.Text = "Hello, Windows IoT Core!";
}
{% endhighlight %}

###本地生成并测试应用
1. 确保通过调用“生成”\|“生成解决方案”菜单命令正确生成应用。

1. 由于这是一个通用 Windows 平台 \(UWP\) 应用程序，因此也可以在 Visual Studio 计算机上测试该应用： 只需按 F5，该应用就会在你的计算机中运行。你应该会看到如下内容：

    ![HelloWorld 正在运行]({{site.baseurl}}/Resources/images/HelloWorld/HelloWorldAppLocal.PNG)

    在完成验证后，请关闭该应用。
    
    > 如果你想要了解有关通用 Windows 平台应用程序的详细信息，请单击[此处](https://msdn.microsoft.com/library/windows/apps/dn894631.aspx){:target="_blank"}。

###将应用部署到 Windows IoT 核心版设备
1. 当然，我们想要将第一个应用部署到 Windows IoT 核心版设备。轻松。在 [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) 文档中，你可以找到关于为你的 Windows IoT 核心版设备选择唯一名称的说明。在本示例中，我们将在 Visual Studio 的“远程计算机调试”设置中使用该名称（不过你也可以使用自己的 IP 地址）。

    如果你要针对 Minnowboard Max 进行生成，请选择 Visual Studio 工具栏体系结构下拉列表中的 `x86`。如果你要针对 Raspberry Pi 2 或 DragonBoard 进行生成，请选择 `ARM`。

    接下来，在 Visual Studio 工具栏中，单击 `Local Machine` 下拉列表并选择 `Remote Machine`<br/>

    ![RemoteMachine 目标]({{site.baseurl}}/Resources/images/HelloWorld/cs-remote-machine-debugging.png)

1. 此时，Visual Studio 将显示“远程连接”对话框。输入 Windows IoT 核心版设备的 IP 地址或名称（在此示例中，我们使用的是“我的设备”），并选择 `Universal (Unencrypted Protocol)` 身份验证模式。然后单击“选择”。

    ![远程计算机调试]({{site.baseurl}}/Resources/images/HelloWorld/cs-remote-connections.PNG)

    > 几点说明：
    >
    > 1. 你可以使用 IP 地址而不使用 Windows IoT 核心版设备名称。
    >
    > 2. 其次，你可以通过导航到项目属性（在解决方案资源管理器中选择“属性”）验证和/或修改这些值并在左侧选择“调试”选项卡：
    >
    > ![项目属性调试选项卡]({{site.baseurl}}/Resources/images/HelloWorld/cs-debug-project-properties.PNG)

1. 现在，我们可以随时部署到远程 Windows IoT 核心版设备。只需按 F5（或选择 `Debug \| Start Debugging`）即可开始调试应用。你应在 Windows IoT 核心版设备屏幕中看到该应用出现，并且你应该能够单击该按钮。

1. 你可以设置断点、查看变量值等。若要停止应用，请按“停止调试”按钮（或依次选择“调试”\|“停止调试”）。

1. 成功部署和调试你的第一个 UWP 应用程序后，只需将 Visual Studio 工具栏配置下拉列表从 `Debug` 更改为 `Release`，即可创建发布版本。现在，你可以通过依次选择“生成”\|“重新生成解决方案”和“生成”\|“部署解决方案”，生成应用并将其部署到你的设备。

1. 恭喜你！ 你刚刚已经将你的第一个 UWP 应用程序部署到运行 Windows IoT 核心版的设备！

{% include_relative IotStartupContent.md %}
