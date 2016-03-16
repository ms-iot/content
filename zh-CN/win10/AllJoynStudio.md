---
layout: default
title: 使用 AllJoyn Studio 扩展
permalink: /zh-cn/win10/AllJoynStudio.htm
lang: zh-cn
---

# 使用 AllJoyn Studio 扩展

[AllSeen 联盟](https://allseenalliance.org/)创建的 AllJoyn 支持物联网。Windows 10 已在其平台中本机内置了 AllJoyn，使开发人员能够轻松利用 AllJoyn“支持 IoT”Windows 10 应用。本文概述了使用通用 Windows 平台 \(UWP\) AllJoyn API 和 Visual Studio 2015 [AllJoyn Studio](https://visualstudiogallery.msdn.microsoft.com/064e58a7-fb56-464b-bed5-f85914c89286) 扩展生成适用于 Windows 10 的应用所需的步骤。

文本实现了发表于 //build/ 2015 的 AllJoyn 会话中所做的承诺：

[AllJoyn： 使用 AllJoyn 生成用于发现、连接并与其他设备和云服务进行交互的通用 Windows 应用](https://channel9.msdn.com/Events/Build/2015/2-623)


## 了解 AllJoyn UWP 应用开发

AllJoyn UWP 应用的三个主要组成部分：

1. 应用布局和设计（XAML 或 HTML）和类组件（C\#、JavaScript、C++ 或 VB）。
2. AllJoyn 核心 API： Windows 10 SDK 中提供了 AllJoyn 标准客户端 API \(C\) 和 Windows.Devices.AllJoyn API \(WinRT\)。
3. 一个或多个 UWP Windows 运行时组件（从 AllJoyn 接口生成此代码）。

下图显示了典型 AllJoyn UWP 项目的体系结构：

![AJ\_UWP\_Architecture]({{site.baseurl}}/Resources/images/AllJoyn/AJ_UWP_Architecture.jpg)

支持 AllJoyn 的 UWP 应用可以是创建器（实现和公开接口，通常为设备）、使用器（使用接口，通常为应用）或两者。使用器和创建器的启动步骤相同，仅在实现细节时稍有不同。

## 创建支持 AllJoyn 的 UWP 应用

请按照以下步骤为 Windows 10 开发支持 AllJoyn 的 UWP 应用：（本文档的后面部分会详细介绍）

1. 准备生成环境。
2. 确定要使用的 AllJoyn 接口，并获取或创建必要的自检 XML。
3. 创建一个 AllJoyn 应用项目，然后选择自检 XML 和代码生成所需的接口。
4. 使用生成的 UWP Windows 运行时组件公开的 API 在应用中实现创建器或使用器。
5. 生成 UI。

## 准备生成环境

Windows 10 版本和相关工具包含编写支持 AllJoyn 的 UWP 应用所需的所有资源。

以下是开始编写代码之前所需的内容：

- 在电脑上安装 [Windows 10](https://www.microsoft.com/windows/)
- 安装 [Visual Studio 2015](https://www.visualstudio.com/downloads/download-visual-studio-vs)（不要使用 Express 版本）
- 从 Visual Studio 库下载 [AllJoyn® Studio](https://visualstudiogallery.msdn.microsoft.com/064e58a7-fb56-464b-bed5-f85914c89286) 扩展。 


## 获取用于 AllJoyn 接口的自检 XML

有三种方法可供你获取开始项目所需的 AllJoyn 接口定义：

1. 从运行时网络上存在的 AllJoyn 创建器中提取自检 XML。
2. 从文档中获取自检 XML；例如： 来自 AllSeen 联盟的 [Lighting 服务框架 \(LSF\) 文档](https://wiki.allseenalliance.org/_media/compliance/alljoyn_lamp_service_14.06_interface_definition.pdf)。
3. 自行创建符合 AllJoyn/[D 总线自检](http://dbus.freedesktop.org/doc/dbus-specification.html)格式的自检 XML。

本文介绍前两种方法 - AllJoyn® Studio 本机支持查询 AllJoyn 创建器的网络并提取其 XML，以及上载自检 XML 文件。从[此处]({{site.baseurl}}/zh-cn/win10/AllJoynProducer.htm)了解如何自行创建。

在 //build/ 2015 处，介绍了支持 AllJoyn 的 toaster 设备，它将用作本文章的示例。此 toaster 公开的控件可用于启动和停止烘烤程序、设置“焦度”和面包烤焦时通知。

![AJ\_toaster]({{site.baseurl}}/Resources/images/AllJoyn/AJ_toaster.jpg)

Toaster 公开以下 XML：

{% highlight XML %}
<node name="/toaster">
  <interface name="org.alljoyn.example.Toaster">
    <annotation name="org.alljoyn.Bus.Secure" value="true"/>
    <description language="en">Example interface for controlling a toaster appliance</description>
    <description language="fr">Interface Exemple de commande d'un appareil de grille-pain</description>
    <property name="Version" type="q" access="read">
      <description>Interface version</description>
      <annotation name="org.freedesktop.DBus.Property.EmitsChangedSignal" value="const"/>
    </property>
    <signal name="ToastBurnt" sessioncast="true">
      <description language="en">Toast is burnt</description>
      <description language="fr">Toast est brûlé</description>
    </signal>
    <method name="StartToasting">
      <description language="en">Start toasting</description>
      <description language="fr">Lancer grillage</description>
    </method>
    <method name="StopToasting">
      <description language="en">Stop toasting</description>
      <description language="fr">Arrêtez de grillage</description>
    </method>
    <property name="DarknessLevel" type="y" access="readwrite">
      <annotation name="org.freedesktop.DBus.Property.EmitsChangedSignal" value="true"/>
      <description language="en">Toasting darkness level</description>
      <description language="fr">Grillage niveau de l'obscurité</description>
    </property>
  </interface>
</node>
{% endhighlight %}

## 创建 AllJoyn 项目

创建项目的常用方式如下所示： 单击 `File->New->New Project` 以开始。

![AJ\_Studio\_NewProject]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_NewProject.png)

选择目标语言的“AllJoyn 应用”模板（随扩展一起安装），而不是导航到 Windows 通用模板。命名项目并选择文件位置，以开始开发。

![AJ\_Studio\_NameProj]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_NameProj.png)

选择一个 AllJoyn 应用模板后，Visual Studio 会立即要求你选择要包含在项目中的 AllJoyn 接口。

![AJ\_Studio\_Interfaces]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Interfaces.png)

__从网络上的设备中提取接口__

如果你在网络上找不到 AllJoyn 设备或接口，请按照[本指南]({{site.baseurl}}/zh-cn/win10/AllJoynTroubleshooting.htm)进行疑难解答。

![AJ\_Studio\_FindDevices]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_FindDevices.png)

要查询网络以获取公开接口，请选择左侧面板中的“网络上的创建器”。这会在网络上找到任何 AllJoyn 创建器并列出他们支持的接口。

![AJ\_Studio\_ListDevices]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_ListDevices.png)

选择要包含在项目中的接口。在这种情况下，我们要使用的仅是 toaster 接口，因此我们只选择“org.alljoyn.example.Toaster”接口。

![AJ\_Studio\_SelectDevices]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_SelectDevices.png)

“操作”列描述项目未生效的更改，从而为新选择的接口显示“添加”。下面我们向接口提供一个友好名称“ToasterLibrary”，这会触发“重命名”操作。

![AJ\_Studio\_DeviceAction]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_DeviceAction.png)

__从文件加载 XML__

通过“浏览”按钮选择任意数量的自检 XML 文件，以查看其所包含的接口。

![AJ\_Studio\_BrowseXML]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_BrowseXML.png)

导航到并选择适当的 XML（在此处，我们使用的是 toaster.xml）。

![AJ\_Studio\_BrowseXML\_2]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_BrowseXML_2.png)

AllJoyn® Studio 加载 XML 后，它会解析各种接口和内部包含的描述，从而允许你选择想要支持的接口。

![AJ\_Studio\_BrowseXML\_3]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_BrowseXML_3.png)

“操作”列描述项目未生效的更改，从而为新选择的接口显示“添加”。

![AJ\_Studio\_BrowseXML\_4]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_BrowseXML_4.png)

在此处，我们已选择包含“org.alljoyn.example.Toaster”接口并向其提供一个友好名称“ToasterLibrary”，这会触发“重命名”操作。

![AJ\_Studio\_BrowseXML\_5]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_BrowseXML_5.png)

__添加和删除接口__

完成这些步骤后，会将生成的文件自动添加到 C++ Windows 运行时组件（具有上述友好名称），并添加为对应用程序项目的引用。但是，根命名空间仍是“org.alljoyn.example.Toaster”，与接口定义的相同。任何访问这些组件的类都需要具有组件根命名空间的“using”子句。

![AJ\_Studio\_SolutionExplorer]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_SolutionExplorer.png)

_提示： 立即生成已生成的组件，以便从 IntelliSense 中受益。_

创建 AllJoyn 应用解决方案后，你始终可以返回并修改要使用的接口。从主菜单栏中，依次单击“AllJoyn”-\>“添加/删除接口...”以启动接口管理器。

![AJ\_Studio\_AddInterfaces]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_AddInterfaces.png)

在此处，你可以单击“浏览...”来添加更多 XML 文件，或取消选择现有接口。取消选择接口会将其操作更新为“删除”，单击“确定”按钮将从解决方案中删除关联的 Windows 运行时组件。

![AJ\_Studio\_AddXML]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_AddXML.png)

查看解决方案资源管理器，会发现已删除该 Windows 运行时组件。

![AJ\_Studio\_SolutionExplorer\_2]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_SolutionExplorer_2.png)

## 后续步骤

实现 AllJoyn 功能时，务必始终包含“Windows.Devices.AllJoyn”命名空间，以及你想要使用的接口的命名空间。

![AJ\_Studio\_namespace]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_namespace.png)

__实现 AllJoyn 使用器__

生成的接口代码包含观察程序和用于查找并控制创建器的使用器类。通过创建新的 AllJoynBusAttachment 实现观察程序、使用该 AllJoynBusAttachment 初始化观察程序、注册可查找创建器的观察程序（“添加”事件），然后启动该观察程序。

![AJ\_Studio\_Code\_1]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_1.png)

只要观察程序找到创建器，就会触发 ToasterWatcher\_Added 事件。使用此事件注册使用器。请注意，Visual Studio 将通过快速操作生成必要的 shell 方法。

![AJ\_Studio\_Code\_2]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_2.png)

生成该方法会产生以下 shell 代码：

![AJ\_Studio\_Code\_3]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_3.png)

使用正确逻辑填充 shell 代码可支持注册使用器。

![AJ\_Studio\_Code\_4]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_4.png)

请注意，只要观察程序发现创建器，就会触发此事件。如果你希望找到多个创建器，请保留使用器的数据结构，因为每个创建器会有一个使用器。

为创建器将发出的各种信号注册事件 – 属性更改信号是使用器类的直接成员，而其他信号是信号类的成员（只需像以前一样，使用快速操作为这些事件生成 shell 代码）。


![AJ\_Studio\_Code\_5]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_5.png)

使用使用器对象读写属性，以及调用方法。

![AJ\_Studio\_Code\_6]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_6.png)

### 实现 AllJoyn 创建器

__实现服务__

创建器会实现公开其接口的服务。为实现创建器，首先要为其服务创建一个类。

![AJ\_Studio\_Code\_7]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_7.png)

将接口的命名空间添加到“using”语句，然后继承为该服务生成的 shell 接口并使用快速操作实现该类。

![AJ\_Studio\_Code\_8]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_8.png)

在此处，快速操作将填写必要的组件。

![AJ\_Studio\_Code\_9]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_9.png)

该代码的所有必要部分已准备就绪以供运行，但仍需要为每个方法和属性调用实现实际逻辑。

![AJ\_Studio\_Code\_10]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_10.png)

将 SetDarknessLevelAsync 用作一个示例，我们会使用某个任务来创建成功结果。如果失败，将返回 ToasterSetDarknessLevelResult.CreateFailureResult\(\)。

![AJ\_Studio\_Code\_11]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_11.png)

实现方法和属性调用的其余部分以完成该服务。

__实现创建器__

创建创建器相当简单 – 创建新的 AllJoynBusAttachment、使用该 AllJoynBusAttachment 初始化创建器、初始化为该创建器新建的服务，然后启动该创建器。

![AJ\_Studio\_Code\_12]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_12.png)

由于该服务包含大部分逻辑，因此保留实现的主要功能将发送属性更改的信号和非状态事件的离散信号。必要时通过方法调用实现这些功能。

![AJ\_Studio\_Code\_13]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_13.png)

__详细信息__

如果已正确完成本文档中的所有指示，你可以随时开始在应用中编写 AllJoyn 代码。

有关参考，请查看 Microsoft 示例 GitHub 上的 AllJoyn 通用 Windows 应用示例以了解 [AllJoyn 创建器](https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/AllJoyn/ProducerExperiences)和 [AllJoyn 使用器](https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/AllJoyn/ConsumerExperiences)。

有关如何创建 AllJoyn 应用的详细演练，请观看 //build 2015 中的 AllJoyn 会话 623：

[“AllJoyn： 使用 AllJoyn 生成用于发现、连接并与其他设备和云服务进行交互的 Windows 应用”](https://channel9.msdn.com/Events/Build/2015/2-623)。

请注意，Windows 策略禁止在同一台计算机上的两个 UWP 应用之间的 AllJoyn 通信，除非它们已启用环回异常（例如，从 Visual Studio 直接部署时）。有关启用环回免除的详细说明，请参阅[此处](https://msdn.microsoft.com/zh-cn/library/windows/apps/Hh780593.aspx)。



