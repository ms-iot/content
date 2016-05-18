---
layout: default
title: AppX Creation and Deployment
permalink: /en-US/win10/samples/Appx.htm
lang: en-US
---

# Creating and Deploying Appx to Windows IoT Core

Learn how to create and deploy appx packages to Windows IoT Core.

### How to Create an Appx package for your VS Project

We'll walk through the steps required to create an Appx Package from your Visual C# UWP Project. You can follow similar approach for Visual C++ projects as well.

* Open your project in Visual Studio. Then right click on the project and select Unload Project.

  ![Unload Project Option]({{site.baseurl}}/Resources/images/appx/unload_project_menu.png)

* Now right click on the unloaded project and select Edit <Project>.csproj file.

  ![Edit Csproj Option]({{site.baseurl}}/Resources/images/appx/edit_projectproj.png)

* This will open the <Project>.csproj file in Visual Studio. Now Add the following item to the "globals" property group of the .csproj file

{% highlight XML %}
<GenerateAppxPackageOnBuild>true</GenerateAppxPackageOnBuild>
{% endhighlight %}

* So that it looks something like the following

{% highlight XML %}
<PropertyGroup>
  <Configuration Condition=" '$(Configuration)' == '' ">Debug</Configuration>
  <Platform Condition=" '$(Platform)' == '' ">AnyCPU</Platform>
  <ProjectGuid>{5dcaf393-c15b-4874-aef2-d143d4a4a8ac}</ProjectGuid>
  <OutputType>AppContainerExe</OutputType>
  <AppDesignerFolder>Properties</AppDesignerFolder>
  <RootNamespace>MyApp</RootNamespace>
  <AssemblyName>MyApp</AssemblyName>
  <DefaultLanguage>en-US</DefaultLanguage>
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

* Now reload the project by doing right click on the project and selecting Reload Project Option.
* Open the Package.appxmanifest file and in the "Identity" field, update the "publisher" field as shown below

{% highlight XML %}
<Identity
  Name="MyApp"
  Publisher="CN=Microsoft Corporation, O=Microsoft Corporation, L=Redmond, S=Washington, C=US"
  Version="1.0.0.0" />
{% endhighlight %}

* Rebuild the project (Build->Rebuild Solution)
* Currently the only way to sign the appx package is to use the signtool utility from a razzle window.

  Launch a razzle window and run:

  {% highlight sh %}
  signtool sign /a /u 1.3.6.1.5.5.7.3.3 /r "Microsoft Testing Root Certificate Authority 2010" /fd SHA256 /s my /n "Microsoft Corporation" /c "1.3.6.1.4.1.311.21.8.7587021.751874.11030412.6202749.3702260.207.195000.4717730" <AppxFilePath>
  {% endhighlight %}


### How to Deploy an Appx package to your Windows IoT Core Machine

You can deploy/install an Appx package to your machine running Windows Windows IoT Core by simply following the steps below

* Copy the signed package to the machine running Windows IoT Core either by mounting the VHD/FFU or just doing FTP://hostname in any File Explorer window
* Telnet to the Windows IoT Core machine by using Username:DefaultAccount and empty password.
* Run the following command


{% highlight sh %}
MinDeployAppX /add /PackagePath:<AppxFilePath>
{% endhighlight %}


* After installing the Appx, run the following command to get the App's UserModelId


{% highlight sh %}
MinDeployAppX /FetchAppUserModelId /PackagePath:<AppxFilePath>
{% endhighlight %}


* You can now launch the app by running the following command


{% highlight sh %}
Testapplauncher /AppID <AppUserModelID>
{% endhighlight %}
