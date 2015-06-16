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

可采用三种方法将 Windows Remote Arduino 库添加到解决方案，顺序为从简到难。

1. [安装 NuGet 程序包](#option-1-install-the-nuget-package)
2. [将 Windows Remote Arduino 项目文件手动添加到解决方案](#option-2-add-the-windows-remote-arduino-projects-to-your-solution)
3. [手动编译 Windows Remote Arduino 解决方案并在解决方案中引用 WinMD 文件。](#option-3-manually-compile-and-add-references-to-your-solution)

在这些选项中，安装 NuGet 程序包是目前为止最简单的方法。

##选项 1： 安装 NuGet 程序包

NuGet 是自动安装程序包并设置依存关系的快速且简单的方法。遗憾的是，Windows 10 中尚不支持 NuGet。

##选项 2： 将 Windows Remote Arduino 项目添加到解决方案

###第 1 步： 创建新项目

- “文件”-\>“新建项目”

 ![新建项目]({{site.baseurl}}/images/remote-wiring/create_00.png)

- 选择你的语言。Windows Remote Arduino 是一个 WinRT 组件，这意味着它与 C++、C\# 或 JavaScript 兼容。

- 通过展开“Visual C\#”菜单，你将看到我选择了 C\#。如果你要针对 Windows 8.1 进行生成，请选择“Windows”选项，然后选择“空白应用（Windows 通用）”或“空白应用（Windows 8.1 通用）”。

 ![Windows 通用]({{site.baseurl}}/images/remote-wiring/create_01.png)


###第 2 步： 将 Windows Remote Arduino 项目添加到解决方案

- 克隆 [Windows Remote Arduino GitHub 存储库](https://github.com/ms-iot/remote-wiring/)。

- 在“解决方案资源管理器”中右键单击你的解决方案，然后选择“添加”\>“现有项目”

 ![添加现有项目]({{site.baseurl}}/images/remote-wiring/project_00.png)

- 导航到存储库的本地副本。你将在此处看到我已将其克隆到 **C:\\git\\remote-wiring**，但你可以选择不同的目录。然后，针对你的生成环境（Windows 10 或 Windows 8.1）打开适当的解决方案文件夹。

 ![打开解决方案目录]({{site.baseurl}}/images/remote-wiring/compile_00.png)

- 让我们从串行项目开始操作 \(Microsoft.Maker.Serial\)。打开此目录。

 ![串行目录]({{site.baseurl}}/images/remote-wiring/project_01.png)

- 选择 *.vcxproj* 文件。（如果你要面向 Windows 8.1，必须先在 Windows 和 Windows Phone 平台目录之间进行选择。你无需针对 Windows 10 执行此操作，因为它通用于所有平台。）

 ![选择 vcxproj]({{site.baseurl}}/images/remote-wiring/project_02.png)

- 右键单击任意项目，然后选择“生成依存关系”-\>“项目依存关系”

 ![项目依存关系]({{site.baseurl}}/images/remote-wiring/project_03.png)

- Windows Remote Arduino 的项目依存关系应该已配置。但是，也可以验证是否为每个项目选择了正确的依存关系。选择下拉列表中的每个项目并验证其是否具有正确的依存关系。

 * 串行不具有依存关系。
 * Firmata 取决于串行。
 * RemoteWiring 取决于串行和 Firmata。

 最后，在下拉列表中选择你的项目，然后选择每个 Microsoft.Maker 项目作为你的项目的依存关系。

 ![依存关系]({{site.baseurl}}/images/remote-wiring/project_04.png)

- 右键单击项目中的“引用”。选择“添加引用”

 ![添加引用]({{site.baseurl}}/images/remote-wiring/project_05.png)

- 在“Windows 通用”选项卡下，选择“扩展”子菜单并选择“Microsoft Visual C++ AppLocal 运行时程序包”版本 14.0。

 ![AppLocal 程序包]({{site.baseurl}}/images/remote-wiring/applocal.png)

- 在“项目”选项卡下，选择所有三个 Microsoft.Maker 项目

 ![项目引用]({{site.baseurl}}/images/remote-wiring/project_06.png)

- 通过选择“生成”-\>“全部重新生成”重新生成你的解决方案

 ![全部重新生成]({{site.baseurl}}/images/remote-wiring/compile_03.png)

- 验证你是否已将必要的[设备功能](#device-capabilities)添加到你的项目清单。

###第 3 步： 享受乐趣！

你现在可以在源代码中直接使用这三个项目。你将注意到，我已构造了一个 BluetoothSerial 对象并将其附加到我的 RemoteDevice 对象，因此我在 .cs 文件顶部包含了两个相应的命名空间。

 ![享受乐趣！]({{site.baseurl}}/images/remote-wiring/utilize_00.png)


##选项 3： 手动编译引用并将其添加到你的解决方案

手动编译 WinRT 组件库会生成可在项目中引用的 .winmd 和 .dll 文件。

###第 1 步： 编译 Windows Remote Arduino 解决方案

- 克隆 [Windows Remote Arduino GitHub 存储库](https://github.com/ms-iot/remote-wiring/)。
- 打开存储库的本地副本。你将在此处看到我已将其克隆到 **C:\\git\\remote-wiring**，但你可以选择不同的目录。然后，针对你的生成环境（Windows 10 或 Windows 8.1）打开适当的解决方案文件夹。

 ![打开解决方案目录]({{site.baseurl}}/images/remote-wiring/compile_00.png)

- 打开解决方案文件 \(.sln\)。如果你未在“查看”选项卡上启用“文件扩展名”，可以查找类型“Microsoft Visual Studio 解决方案”。（如果你要面向 Windows 8.1，必须先在 Windows 和 Windows Phone 平台目录之间进行选择。你无需针对 Windows 10 执行此操作，因为它通用于所有平台）

 ![打开解决方案文件]({{site.baseurl}}/images/remote-wiring/compile_01.png)

- 选择正确的生成目标。如果你计划将应用程序部署到 Raspberry Pi2 或 Windows Phone，你将希望选择 ARM。否则，如果你要面向电脑平台，请选择 x86 或 x64。如果你要面向 MinnowBoardMax，请选择 x86。

 ![选择生成目标]({{site.baseurl}}/images/remote-wiring/compile_02.png)

- “生成”-\>“重新生成解决方案”

 ![重新生成解决方案]({{site.baseurl}}/images/remote-wiring/compile_03.png)

- 解决方案应在大约一分钟内生成。

 ![成功生成]({{site.baseurl}}/images/remote-wiring/compile_04.png)

###第 2 步： 创建新项目

- “文件”-\>“新建项目”

 ![新建项目]({{site.baseurl}}/images/remote-wiring/create_00.png)

- 选择你的语言。Windows Remote Arduino 是一个 WinRT 组件，这意味着它与 C++、C\# 或 JavaScript 兼容。

- 通过展开“Visual C\#”菜单，你将看到我选择了 C\#。如果你要针对 Windows 8.1 进行生成，请选择“Windows”选项，然后选择“空白应用（Windows 通用）”或“空白应用（Windows 8.1 通用）”。

 ![Windows 通用]({{site.baseurl}}/images/remote-wiring/create_01.png)

###第 3 步： 引用 WinMD 文件

- 在新项目中，在“解决方案资源管理器”中找到“引用”项。右键单击并选择“添加引用...”

 ![添加引用]({{site.baseurl}}/images/remote-wiring/ref_00.png)

- 在“Windows 通用”选项卡下，选择“扩展”子菜单并选择“Microsoft Visual C++ AppLocal 运行时程序包”版本 14.0。

 ![AppLocal 程序包]({{site.baseurl}}/images/remote-wiring/applocal.png)

- 选择左侧的“浏览”选项卡，然后单击底部的“浏览”按钮。

 ![浏览]({{site.baseurl}}/images/remote-wiring/ref_01.png)

- 找到你存储 Windows Remote Arduino 存储库的目录，并打开相应的项目文件夹。
  * 如果你已将库编译为“ARM”，你将像我一样使用下面的“ARM”文件夹，然后使用“ARM”内的“Debug”。
  * 同样，可以在“x64\\Debug”文件夹中找到 x64。
  * x86 将只位于“Debug”中，正如你可以在下面的屏幕截图中看到的一样。

 ![打开调试文件夹]({{site.baseurl}}/images/remote-wiring/ref_02.png)

- 请注意，当我针对 ARM 平台（如 Windows Phone 10）进行编译时，我位于“ARM\\Debug”目录内。我们将首先打开“Microsoft.Maker.Serial”文件夹。

 ![打开“串行”文件夹]({{site.baseurl}}/images/remote-wiring/ref_03.png)

- 选择 WinMD 文件，然后按“添加”。

 ![添加 WinMD]({{site.baseurl}}/images/remote-wiring/ref_04.png)

- 为位于其各自文件夹中的所有三个 WinMD 文件重复步骤 3 - 5。*你可以在其他项目文件夹中找到其他 WinMD 文件，因为它们引用其他项目。仅为每个目录引用正确的 WinMD。*

 ![为所有三个引用重复之前的步骤]({{site.baseurl}}/images/remote-wiring/ref_05.png)

- **将来将自动执行后续的几个步骤，但现在这几个步骤是必需的。**

 现在，我们必须手动将 WinMD 文件与其各自的 .dll 文件“连接”起来。右键单击该项目（不是解决方案），然后选择“卸载项目”。

 ![卸载项目]({{site.baseurl}}/images/remote-wiring/ref_06.png)

- 为你的项目名称选择“编辑 .csproj”选项。

 ![编辑 csproj]({{site.baseurl}}/images/remote-wiring/ref_07.png)

- 在此 XML 文件附近，找到“引用”部分，特别是刚刚在步骤 3 - 6 中添加的项目的三个 `<Reference>` 标记。

 ![找到引用标记]({{site.baseurl}}/images/remote-wiring/ref_08.png)

- 必须将两个标记添加到 `<HintPath>` 标记下这些 `<Reference>` 标记中的每一个。<br/>

{% highlight XML %}
 `<IsWinMDFile>true</IsWinMDFile>
 `<Implementation>%PROJECT%.dll</Implementation>
{% endhighlight %}

 其中 *%PROJECT%* 是适用于该 `<Reference>` 标记的项目的名称。我们在此处添加了全部三个标记（尽管只有一个突出显示）。因此你可以添加文本以准确匹配以下屏幕截图中的内容。无需考虑安装项目的位置，`<HintPath>` 标记会为我们处理该问题。

 ![其他标记]({{site.baseurl}}/images/remote-wiring/ref_09.png)

- 再次右键单击该项目并选择“重新加载项目”。如果系统提示你进行保存，请选择“是”。

 ![重新加载项目]({{site.baseurl}}/images/remote-wiring/ref_10.png)

- 验证你是否已将必要的[设备功能](#device-capabilities)添加到你的项目清单。


###第 4 步： 享受乐趣！

你现在可以在源代码中直接使用这三个项目。你将注意到，我已构造了一个 BluetoothSerial 对象并将其附加到我的 RemoteDevice 对象，因此我在 .cs 文件顶部包含了两个相应的命名空间。

 ![享受乐趣！]({{site.baseurl}}/images/remote-wiring/utilize_00.png)


#设备功能

每个 Windows 项目将包含一个清单文件，该文件必须配置为允许特定权限，例如蓝牙和 USB 连接。幸运的是，配置这些权限相当容易。

你将需要通过右键单击并选择“查看代码”选项来打开项目的 package.appxmanifest 文件。然后，找到 <Capabilities> 标记，并将以下一个或两个标记块粘贴为子节点。

####注意：
对于 **Windows 8.1**，你需要在 `<Package>` 标记内将以下命名空间添加到 XML 文件顶部。

{% highlight XML %}
xmlns:m2="http://schemas.microsoft.com/appx/2013/manifest"
{% endhighlight %}

##启用蓝牙功能
你将需要在 <Capabilities> 标记内将以下 XML 块之一添加到你的清单文件，才能调用 WinRT 应用程序的蓝牙/USB 功能，具体取决于你要面向的操作系统版本。

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


##启用 USB 功能
你将需要将以下 XML 块之一添加到你的清单文件，才能调用 WinRT 应用程序的 USB 功能，具体取决于你要面向的操作系统版本。

###Windows 10

{% highlight XML %}
<DeviceCapability Name="serialcommunication">
  <Device Id="any">
    <Function Type="name:serialPort"/>
  </Device>
</DeviceCapability>
{% endhighlight %}

###Windows 8.1

{% highlight XML %}
<m2:DeviceCapability Name="serialcommunication">
  <m2:Device Id="any">
    <m2:Function Type="name:serialPort"/>
  </m2:Device>
</m2:DeviceCapability>
{% endhighlight %}
