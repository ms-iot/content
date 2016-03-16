---
layout: default  
title: ProcessLauncher 示例  
permalink: /zh-cn/win10/samples/ProcessLauncherSample.htm  
lang: zh-cn  
---  
  
#ProcessLauncher 示例  
  
我们将了解如何使用 `Windows.System.ProcessLauncher` API 在通用 Windows 平台 \(UWP\) 应用上启动外部进程 \(exe\)。

这是一个有外设示例。若要更好地了解什么是有外设模式以及如何将你的设备配置为有外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。

###需要 Windows IoT 核心版秋季更新

`Windows.System.ProcessLauncher` API 是 Windows IoT 核心版秋季更新的新增内容。你可以在我们的[下载页]({{site.baseurl}}/{{page.lang}}/Downloads.htm)下载带有秋季更新的 Windows 10 IoT 核心版映像。

###需要 Windows SDK 更新

若要使用 `ProcessLauncher` API 和 Windows IoT 核心版秋季更新的其他新功能，还需要更高版本的 Windows SDK。需要 Windows SDK 10.0.10586.0 或更高版本，在[此处](https://dev.windows.com/zh-cn/downloads/windows-10-sdk)即可下载。

有关获取和设置所需 Windows SDK 和其他工具的详细信息，请参阅[设置电脑指南]({{site.baseurl}}/{{page.lang}}/win10/SetupPCRPI.htm)。

###在 Visual Studio 中加载项目  
  
你可以通过在[此处](https://github.com/ms-iot/samples/tree/develop/WebCamSample/CS){:target="_blank"}下载所有示例的 zip 来查找此示例的源代码。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

ProcessLauncher 示例的代码可在 <samples root folder>\\ProcessLauncher\\CS 下找到
 
###部署你的应用  
 
如果你要针对 Minnowboard Max 进行生成，请选择 `x86` 作为体系结构。如果你要针对 Raspberry Pi 2 或 DragonBoard 进行生成，请选择 `ARM`。

选择“远程计算机”以指向 IoT 设备并点击 F5 以部署到你的设备。如需指导，请返回基本“Hello World”[示例]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm){:target="_blank"}。
  
###测试你的应用   
  
示例应用在部署时会显示与以下屏幕类似的屏幕：

![应用已启动]({{site.baseurl}}/Resources/images/ProcessLauncherSample/ProcessLauncher0.png)

继续操作、单击“运行命令”按钮来启动在“命令”编辑框中指定的应用程序 SampleConsoleApplication.exe，该应用程序也是在示例应用中生成和部署的可执行 Win32 应用程序。

运行时，SampleConsoleApplication exe 会向“标准输出”和“标准错误”框发送输出。还应显示该进程的返回错误代码 100。

![SampleConsoleApplication 输出]({{site.baseurl}}/Resources/images/ProcessLauncherSample/ProcessLauncher1.png)

##我们来看看代码  
 
本示例的代码使用 `Windows.System.ProcessLauncher` API，它是 Windows IoT 核心版上提供的系统管理合约 API 的一部分。
 
若要使用该 API，我们需要完成几项操作。

###添加对 Windows IoT 扩展 SDK 的引用

由于默认情况下 IoT 扩展 SDK 不会添加到项目，因此我们将需要添加对它的引用，以便它的各种类型（包括 `Windows.System.SystemManagement.ProcessLauncher`）在项目中可用。

若要执行此操作，请右键单击项目下的“引用”项、选择“添加引用”，然后将生成的对话框导航到 `Universal Windows->Extensions->Windows IoT Extensions for the UWP`，确保已选择正确版本 10.0.10586.0 或更高版本，再选中该复选框并单击“确定”。

![添加扩展 SDK]({{site.baseurl}}/Resources/images/ProcessLauncherSample/AddIoTExtensionReference.png)


### 添加 systemManagement 功能

从代码访问 `Windows.System.ProcessLauncher` API 需要 `systemManagement` IOT 功能。所以，我们需要将其添加到 AppX 清单，即 **Package.appxmanifest** 文件：

**注意：** 虽然你可以通过在 UI 编辑器中双击并打开 **Package.appxmanifest** 文件来直接添加其他功能，但 **systemManagement** 功能只能通过 XML 编辑器（右键单击该文件 -\>“打开方式”-\>“XML\(文本\)编辑器”）并添加以下功能才能添加：
 
{% highlight xml %}  
<Package
  xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10"
  xmlns:mp="http://schemas.microsoft.com/appx/2014/phone/manifest"
  xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10"
  xmlns:iot="http://schemas.microsoft.com/appx/manifest/iot/windows10"
  IgnorableNamespaces="uap mp iot">


  <Capabilities>
    <Capability Name="internetClient" />
	<!-- Add the capability here -->
    <iot:Capability Name="systemManagement" />
  </Capabilities>
{% endhighlight %}  
 
### 启动进程

`ProcessLauncher` API 提供许多静态方法重载来使用可执行的文件名以及可选参数和其他选项来启动新应用。

以下是启动新进程的示例的一部分。启动进程后，我们使用其返回的 `await` 以获取退出代码。

{% highlight C# %}   
var result = await ProcessLauncher.RunToCompletionAsync(cmd.Text, args.Text == null ? string.Empty : args.Text, options);

ProcessExitCode.Text += "Process Exit Code: " + result.ExitCode;
{% endhighlight %} 

###使用标准流 

虽然退出代码通常足以让我们知道某个可执行文件是否成功，但有时候我们需要读取程序中的输出；例如在应用中记录信息或显示该文本。

`ProcessLauncherOptions` 类支持在 UWP 应用和外部进程之间共享标准输入、输出和错误流。

* `ProcessLauncherOptions.StandardInput` 属于类型 `Windows.Storage.Streams.IInputStream`，并且由外部进程**读取**
* `ProcessLauncherOptions.StandardOutput` 和 `ProcessLauncherOptions.StandardError` 均是 `Windows.Storage.Streams.IInputStream` 属性，由外部进程用于**写入**标准输出或标准错误

现在，让我们了解如何将输出流传递到可执行文件，然后再读取写入到其中的内容。

为了能够读取数据和将数据写入流，我们将流创建为 `Windows.Storage.Streams.InMemoryRandomAccessStream` 对象。`InMemoryRandomAccessStream` 可以强制转换为输入流或输出流，这正是我们所需要的功能。我们会将其作为 `IOutputStream` 传递到 `ProcessLauncherOptions`，然后在外部 exe 完成写入到其中后将其数据读取为 `IInputStream`。

以下是该示例的相关代码。首先，我们将初始化流对象：

{% highlight C# %}   
var options = new ProcessLauncherOptions();
var standardOutput = new InMemoryRandomAccessStream();
var standardError = new InMemoryRandomAccessStream();
options.StandardOutput = standardOutput;
options.StandardError = standardError;
{% endhighlight %} 

然后，我们将选项传递到 `RunToCompletionAsync()` 方法：

{% highlight C# %}   
var result = await ProcessLauncher.RunToCompletionAsync(cmd.Text, args.Text == null ? string.Empty : args.Text, options);
{% endhighlight %} 

最后，在获取 `InMemoryRandomAccessStream` 作为输入流后，读取其中的数据：

{% highlight C# %}   
using (var outStreamRedirect = standardOutput.GetInputStreamAt(0))
{
    var size = standardOutput.Size;
    using (var dataReader = new DataReader(outStreamRedirect))
    {
        var bytesLoaded = await dataReader.LoadAsync((uint)size);
        var stringRead = dataReader.ReadString(bytesLoaded);
        StdOutputText.Text += stringRead;
    }
}
{% endhighlight %} 

**注意**，虽然没有在此示例中使用标准输入流，但也可以将其与 `ProcessLauncher` API 一起使用。

###将可执行的应用程序与 AppX 程序包包含在一起

`ProcessLauncher` API 可启动打包为相同 AppX 的一部分的可执行程序。因此，该示例中包括示例 Win32 控制台应用 SampleConsoleApplication。

该程序本身非常简单，但它演示了 ProcessLauncher API 的各个方面，包括参数传递以及共享标准输出和标准错误流。

以下是示例控制台应用的主要方法：

{% highlight C++ %}  
int main(int argc, char **argv)
{
    std::cout << "Hi there!" << std::endl;
    std::cout << "I'm running in a different process!" << std::endl << std::endl;

    std::cout << "There are " << argc << " arguments passed to this application (including the exe name):" << std::endl;
    for (int i = 0; i < argc; i++)
    {
        std::cout << "\t" << i << ") \"" << argv[i] << "\"" << std::endl;
    }

    std::cerr << "Nothing is wrong! I just wanted to try writing to the std error stream." << std::endl;

    return 100;
}
{% endhighlight %}  

应用程序已作为*控制台应用程序*添加到了解决方案。若要创建你自己的控制台应用程序，请参阅[控制台应用程序示例]({{site.baseurl}}/{{page.lang}}/win10/samples/ConsoleApp.htm)。

若要能够在运行时查找和调用 SampleConsoleApplication exe，我们需要将输出 exe 与 AppX 一起打包。我们已将其添加到示例应用程序。但是，为了在你自己的应用程序中执行相同操作，你可以遵循以下步骤：

1. 将输出 exe 放在与 C\# 示例相同的文件夹中。右键单击 C++ 控制台应用项目、选择“属性”，然后打开“常规”选项卡
1. 将输出目录更改为与 C\# 示例（或子文件夹）相同的目录，然后单击“确定”![控制台应用程序属性]({{site.baseurl}}/Resources/images/ProcessLauncherSample/ConsoleApplicationProperties.png)
1. 生成控制台应用程序来创建 exe，并将其放置在新位置处
1. 将该 exe 添加到 UWP 项目： 右键单击该项目、依次选择“添加”-\>“现有项”
1. 浏览并选择刚刚生成的 exe
1. 在 exe 添加到 UWP 项目后，我们需要确保它添加到了 AppX 程序包布局，方法是右键单击 exe 并选择“属性”
1. 将“生成操作”更改为“内容”
1. 将“复制到输出目录”更改为“始终”![Exe 文件属性]({{site.baseurl}}/Resources/images/ProcessLauncherSample/ExeProperties.png)
1. 最后，为了确保在每次部署主应用时均会生成 exe，我们需要更改项目依赖关系，方法是右键单击解决方案、选择“项目依赖关系”并使 UWP 项目在控制台应用上具有依赖关系 ![生成依赖关系]({{site.baseurl}}/Resources/images/ProcessLauncherSample/BuildDependencies.png)

现在，每当生成或部署解决方案时，它都将确保控制台应用程序 exe 处于最新状态，并使用 AppX 的其余部分对其进行部署。
  
## 运行多个可执行文件

在指定相对路径（例如 *SampleConsoleApp.exe*、*.\\SampleConsoleApp.exe* 或子文件夹 *subfolder\\SampleConsoleApp.exe*）时，`ProcessLauncher` API 将查找从已部署的 AppX 的程序包根开始的 exe 文件。

但是，该 API 还能够通过指定诸如 c:\\windows.system32\\ipconfig.exe 的绝对路径来在设备上的任何位置运行应用

若要使用外部 exe，该 exe 必须添加到“允许列表”。需要该操作才能防止恶意应用运行。

若要将某个 exe 添加到“允许列表”，请在以下注册命令中添加或替换注册值：

`reg.exe ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\EmbeddedMode\ProcessLauncher" /v AllowedExecutableFilesList /t REG_MULTI_SZ /d "c:\windows\system32\ipconfig.exe\0c:\windows\system32\tlist.exe\0"`

**注意**，`ProcessLauncher` API 在当前用户凭据或 **DefautlAccount** 下启动可执行文件，以便需要管理员权限的应用将无法正确运行。

继续操作，使用 [SSH]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm){:target="_blank"} 或 [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm){:target="_blank"} 在设备上运行上述命令。然后，在示例应用（无需重新启动）中键入命令 `c:\windows\system32\ipconfig.exe`。你应该得到与如下所示相类似的输出：

![应用已启动]({{site.baseurl}}/Resources/images/ProcessLauncherSample/ProcessLauncher2.png)

### 使用进程启动器白名单配置工具

此外，为了克服使用注册命令的限制，进程启动器白名单配置工具可用于非常轻松地向 ProcessLauncher“允许列表”添加可执行文件或删除其中的可执行文件。

该工具作为 [GitHub](https://github.com/ms-iot/iot-utilities){:target="_blank"} 上 *Windows 10 IoT 实用程序*的一部分提供。

若要使用该工具：

* 从 [GitHub](https://github.com/ms-iot/iot-utilities){:target="_blank"} 克隆或下载 *Windows 10 IoT 实用程序*的 zip
* 在 *ProcessLauncherWhitelist* 下打开和生成解决方案 
* 使用 [FTP]({{site.baseurl}}/{{page.lang}}/win10/samples/FTP.htm){:target="_blank"} 将可执行文件复制到你的设备
* 使用 [SSH]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm){:target="_blank"} 或 [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm){:target="_blank"} 在设备上运行该文件

![进程启动器配置]({{site.baseurl}}/Resources/images/ProcessLauncherSample/ProcessLauncherWhiteListConfigTool.png)

