---
layout: default
title: AppX 创建与部署
permalink: /zh-cn/win10/samples/Appx.htm
lang: zh-cn
---

#创建 Appx 并将其部署到 Windows IoT Core

了解如何创建 appx 程序包并将其部署到 Windows IoT Core。

### 如何为 VS 项目创建 Appx 程序包

我们将演练从 Visual C\# UWP 项目创建 Appx 程序包所需的步骤。也可遵循用于 Visual C++ 项目的类似方法。

* 在 Visual Studio 中打开你的项目。然后，右键单击该项目并选择“卸载项目”。

  ![“卸载项目”选项]({{site.baseurl}}/Resources/images/appx/unload_project_menu.png)

* 现在，请右键单击卸载的项目并选择“编辑 <Project>.csproj 文件”。

  ![“编辑 Csproj”选项]({{site.baseurl}}/Resources/images/appx/edit_projectproj.png)

* 这将在 Visual Studio 中打开 <Project>.csproj 文件。现在，请将以下项添加到 .csproj 文件的“globals”属性组

{% highlight XML %}
<GenerateAppxPackageOnBuild>true</GenerateAppxPackageOnBuild>
{% endhighlight %}

* 使其类似于这样

{% highlight XML %}
<PropertyGroup>
  <Configuration Condition=" '$(Configuration)' == '' ">Debug</Configuration>
  <Platform Condition=" '$(Platform)' == '' ">AnyCPU</Platform>
  <ProjectGuid>{5dcaf393-c15b-4874-aef2-d143d4a4a8ac}</ProjectGuid>
  <OutputType>AppContainerExe</OutputType>
  <AppDesignerFolder>Properties</AppDesignerFolder>
  <RootNamespace>MyApp</RootNamespace>
  <AssemblyName>MyApp</AssemblyName>
  <DefaultLanguage>zh-cn</DefaultLanguage>
  <TargetPlatformIdentifier>UAP</TargetPlatformIdentifier>
  <TargetPlatformVersion>10.0.9910.0</TargetPlatformVersion>
  <TargetPlatformMinVersion>10.0.9910.0</TargetPlatformMinVersion>
  <MinimumVisualStudioVersion>14</MinimumVisualStudioVersion>
  <EnableProjectNCompatibleProfile>true</EnableProjectNCompatibleProfile>
  <FileAlignment>512</FileAlignment>
  <ProjectTypeGuids>{A5A43C5B-DE2A-4C0C-9213-0A381AF9435A};{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}</ProjectTypeGuids>
  <DebugEngines>{2E36F1D4-B23C-435D-AB41-18E608940038}</DebugEngines>
  <PackageCertificateKeyFile>MyApp_TemporaryKey.pfx</PackageCertificateKeyFile>
  <GenerateAppxPackageOnBuild>true</GenerateAppxPackageOnBuild>
</PropertyGroup>
{% endhighlight %}

* 现在，请重新加载项目，方法是右键单击该项目并选择“重新加载项目”选项。
* 打开 Package.appxmanifest 文件，然后在“Identity”字段中，按如下所示更新“publisher”字段

{% highlight XML %}
<Identity
  Name="MyApp"
  Publisher="CN=Microsoft Corporation, O=Microsoft Corporation, L=Redmond, S=Washington, C=US"
  Version="1.0.0.0" />
{% endhighlight %}

* 重新生成项目（“生成”-\>“重新生成解决方案”）
* 目前，为 appx 程序包签名的唯一方法是使用 razzle 窗口中的 signtool 实用工具。

  启动 razzle 窗口并运行以下命令：

  {% highlight sh %}
  signtool sign /a /u 1.3.6.1.5.5.7.3.3 /r "Microsoft Testing Root Certificate Authority 2010" /fd SHA256 /s my /n "Microsoft Corporation" /c "1.3.6.1.4.1.311.21.8.7587021.751874.11030412.6202749.3702260.207.195000.4717730" <AppxFilePath>
  {% endhighlight %}


### 如何将 Appx 程序包部署到 Windows IoT 核心版计算机

只需执行以下步骤，即可在运行 Windows IoT 核心版的计算机上部署/安装 Appx 程序包

* 通过装载 VHD/FFU 或者仅在任一“文件资源管理器”窗口中执行 FTP://hostname，将签名的程序包复制到运行 Windows IoT 核心版的计算机
* 使用 Username:DefaultAccount 和空密码对 Windows IoT 核心版计算机执行 Telnet。
* 运行以下命令


{% highlight sh %}
MinDeployAppX /add /PackagePath:<AppxFilePath>
{% endhighlight %}


* 安装 Appx 后，运行以下命令获取应用的 UserModelId


{% highlight sh %}
MinDeployAppX /FetchAppUserModelId /PackagePath:<AppxFilePath>
{% endhighlight %}


* 现在，可以通过运行以下命令来启动应用


{% highlight sh %}
Testapplauncher /AppID <AppUserModelID>
{% endhighlight %}
