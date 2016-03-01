---
layout: default
title: SetupPCWRA
permalink: /zh-CN/win10/SetupPCWRA.htm
lang: zh-CN
---

#入门

了解如何使电脑为使用 Windows Remote Arduino 开发 IoT 应用程序做好准备。

{% include steps.html device="WRA" %}

##安装

可采用两种方法将 Windows Remote Arduino 库添加到解决方案，顺序为从简到难。

1. [安装 NuGet 程序包](#option-1-install-the-nuget-package)
2. [将 Windows Remote Arduino 项目文件手动添加到解决方案](#option-2-add-the-windows-remote-arduino-projects-to-your-solution)

在这些选项中，安装 NuGet 程序包是目前为止最简单的方法。

##选项 1： 安装 NuGet 程序包

NuGet 是自动安装程序包并设置依存关系的快速且简单的方法。遗憾的是，Windows 10 中尚不支持 NuGet。

##选项 2： 将 Windows Remote Arduino 项目添加到解决方案

###第 1 步： 创建新项目

- “文件”-\>“新建项目”

 ![新建项目]({{site.baseurl}}/Resources/images/remote-wiring/create_00.png)

- 选择所需语言。Windows Remote Arduino 是 WinRT 组件，这意味着它与 C++、C\# 或 JavaScript 兼容。

- 通过展开“Visual C\#”菜单，你将看到我选择了 C\#。如果你要针对 Windows 8.1 进行生成，请选择“Windows”选项，然后选择“空白应用（Windows 通用）”或“空白应用（Windows 8.1 通用）”。

 ![Windows 通用]({{site.baseurl}}/Resources/images/remote-wiring/create_01.png)


###第 2 步： 将 Windows Remote Arduino 项目添加到解决方案

- 克隆 [Windows Remote Arduino GitHub 存储库](https://github.com/ms-iot/remote-wiring/){:target="_blank"}。

- 在“解决方案资源管理器”中右键单击你的解决方案，然后选择“添加”\>“现有项目”

 ![添加现有项目]({{site.baseurl}}/Resources/images/remote-wiring/project_00.png)

- 导航到存储库的本地副本。你将在此处看到我已将其克隆到 **C:\\git\\remote-wiring**，但你可以选择不同的目录。然后，针对你的生成环境（Windows 10 或 Windows 8.1）打开适当的解决方案文件夹。

 ![打开解决方案目录]({{site.baseurl}}/Resources/images/remote-wiring/compile_00.png)

- 让我们从串行项目开始操作 \(Microsoft.Maker.Serial\)。打开此目录。

 ![串行目录]({{site.baseurl}}/Resources/images/remote-wiring/project_01.png)

- 选择 *.vcxproj* 文件。（如果你要面向 Windows 8.1，必须先在 Windows 和 Windows Phone 平台目录之间进行选择。你无需针对 Windows 10 执行此操作，因为它通用于所有平台。）

 ![选择 vcxproj]({{site.baseurl}}/Resources/images/remote-wiring/project_02.png)

- 右键单击项目中的“引用”。选择“添加引用”

 ![添加引用]({{site.baseurl}}/Resources/images/remote-wiring/project_05.png)

- 在“项目”选项卡下，选择所有三个 Microsoft.Maker 项目

 ![项目引用]({{site.baseurl}}/Resources/images/remote-wiring/project_06.png)

- 通过选择“生成”-\>“全部重新生成”重新生成你的解决方案

 ![全部重新生成]({{site.baseurl}}/Resources/images/remote-wiring/compile_03.png)

- 验证你是否已将必要的[设备功能](#device-capabilities)添加到你的项目清单。

###第 3 步： 享受乐趣！

现在可在源代码中直接使用这三个项目。值得注意的是，我已构造了一个 BluetoothSerial 对象并将其附加到我的 RemoteDevice 对象，因此我在 `MainPage.xaml.cs` 文件顶部包含了两个相应命名空间。

 ![享受乐趣！]({{site.baseurl}}/Resources/images/remote-wiring/utilize_00.png)


#设备功能

每个 Windows 项目将包含一个清单文件，该文件必须配置为允许特定权限，例如蓝牙和 USB 连接。幸运的是，配置这些权限相当容易。

你将需要通过右键单击并选择“查看代码”选项来打开项目的 package.appxmanifest 文件。然后，找到 <Capabilities> 标记，并将以下一个或两个标记块粘贴为子节点。

####注意：
对于 **Windows 8.1**，你需要在 `<Package>` 标记内将以下命名空间添加到 XML 文件顶部。

{% highlight XML %}
xmlns:m2="http://schemas.microsoft.com/appx/2013/manifest"
{% endhighlight %}

##启用蓝牙功能
你需要将以下 XML 块之一添加到你的 `Package.appxmanifest` 文件，以便调用 WinRT 应用程序的蓝牙功能。右键单击此文件并选择“查看代码”。具体语法取决于所面向的操作系统版本。

必须在 `<Capabilities>` 标记*中*添加这些 DeviceCapability 标记。

###Windows 10

{% highlight XML %}
<DeviceCapability Name="bluetooth.rfcomm">
  <Device Id="any">
    <Function Type="name:serialPort"/>
  </Device>
</DeviceCapability>
{% endhighlight %}

###Windows 8.1

{% highlight XML %}
<m2:DeviceCapability Name="bluetooth.rfcomm">
  <m2:Device Id="any">
    <m2:Function Type="name:serialPort"/>
  </m2:Device>
</m2:DeviceCapability>
{% endhighlight %}


##启用网络功能
需要在 <Capabilities> 标记中将以下 XML 块之一添加到清单文件，以便调用 WinRT 应用程序的网络套接字功能。

###Windows 10 和 Windows 8.1

{% highlight XML %}
<Capability Name="privateNetworkClientServer"/>
<Capability Name="internetClientServer"/>
{% endhighlight %}


##启用 USB 功能
需要将以下 XML 块之一添加到 `Package.appxmanifest` 文件，以便调用 WinRT 应用程序的 USB 功能。右键单击此文件并选择“查看代码”。具体语法取决于所面向的操作系统版本。

必须在 `<Capabilities>` 标记*中*添加这些 DeviceCapability 标记。

    Visual Studio 2015 has a known bug in the Manifest Designer (the visual editor for appxmanifest files) that affects the serialcommunication capability.  If 
    your appxmanifest adds the serialcommunication capability, modifying your appxmanifest with the designer will corrupt your appxmanifest (the Device xml child 
    will be lost).  You can workaround this problem by hand editting the appxmanifest by right-clicking your appxmanifest and selecting View Code from the 
    context menu.

###Windows 10

{% highlight XML %}
<DeviceCapability Name="serialcommunication">
  <Device Id="any">
    <Function Type="name:serialPort"/>
  </Device>
</DeviceCapability>
{% endhighlight %}

###Windows 8.1

遗憾的是，此库在 Windows 8.1 上不支持 USB。
