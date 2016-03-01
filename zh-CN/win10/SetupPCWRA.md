<h3>安装</h3>
<div class="row">
  <div class="col-md-6 col-sm-12 col-no-padding">
    <p>该教程的此部分介绍如何使用 <b>Windows Remote Arduino</b> 库设置 Windows 10 设备（可以是电脑、Surface 或 Windows Phone）以远程控制 Arduino。</p>

    <p>提供从简到难开始使用 Windows Remote Arduino 的三种方法。</p>
    <ol class="inline-list">
      <li><a href="#option-1">从 Microsoft 官方商城下载 Windows Remote Arduino Experience 应用</a></li>
      <li><a href="#option-2">安装 NuGet 程序包</a></li>
      <li><a href="#option-3">将 Windows Remote Arduino 项目文件手动添加到新的 Visual Studio 解决方案。</a></li>
    </ol>
    <p>下载 <b>Windows Remote Arduino Experience</b> 应用允许你运行 Arduino 设备的所有最基本的功能，无需编写任何一行代码！ 可通过使用用户界面上提供的按钮来使用数字读取和写入、模拟读取 (ADC) 和 PWM。这是试验库功能的绝佳方法。</p>
	<p>如果你想要使用 Windows Remote Arduino 开发自己的应用，“选项 2”允许你轻松地将库添加到任何 Visual Studio 解决方案“选项 3”更复杂，但允许你直接向你的解决方案中添加最新的源代码。然后，你将能够查看并完全控制库的运行方式！
  </div>
</div>
<h2 id="option-1">选项 1： 从 Microsoft 官方商城下载 Windows Remote Arduino Experience 应用 </h2>
<div class="row">
  <div class="col-md-6 col-sm-12 col-no-padding">
    <p> 访问 Microsoft 官方商城的<a href="https://www.microsoft.com/store/apps/9nblggh2041m" target="_blank">此链接</a>来下载并安装该应用。 然后，打开应用程序以确保它可以正常运行。</p>

    <p>现在，你已完成 Windows 设备的设置，可以转到下一节以继续。</p>
  </div>
</div>

<h2 id="option-2">选项 2： 安装 NuGet 程序包</h2>

<div class="row">
  <div class="col-md-6 col-sm-12 col-no-padding">
    <p>NuGet 是自动安装程序包并设置依赖项的快速且简单的方法。</p>
    <ol class="inline-list">
      <li><a href="#install-vs">安装 Visual Studio</a></li>
      <li><a href="#new-project">创建一个新项目</a></li>
      <li>在 Visul Studio 中，导航到以下菜单项： “工具”>“NuGet 包管理器”>“程序包管理器控制台”</li>
      <li>在控制台窗口中输入以下命令： <code> Install-Package Windows-Remote-Arduino</code></li>
    </ol>
    <p>作为上述步骤 4 的替代方法，还可以选择“NuGet 包管理器”<b></b>上下文菜单下的“管理适用于解决方案的 NuGet 包”<b></b>，然后手动搜索并安装“Windows Remote Arduino”<b></b>。 有关此程序包的详细信息，请访问 <a href="https://www.nuget.org/packages/Windows-Remote-Arduino">https://www.nuget.org/packages/Windows-Remote-Arduino</a>。</p>

    <p>完成此部分的操作后，请跳到“设备功能”部分以完成应用程序设置。</p>
  </div>
</div>
<h2 id="option-3">选项 3： 将 Windows Remote Arduino 项目添加到 Visual Studio 解决方案</h2>
<h3 id="install-vs">步骤 1： 安装 Visual Studio</h3>
<p>我们建议安装 <a href="http://go.microsoft.com/fwlink/?LinkID=534599"target="_blank">Visual Studio 社区版</a>，但 Visual Studio Professional 2015 和 Visual Studio Enterprise 2015 也将正常工作（可从<a href="https://www.visualstudio.com/vs-2015-product-editions" target="_blank">此处</a>获取）。如果已安装 Visual Studio，可以直接跳到下一步以继续。</p>
<h3 id="new-project">步骤 2： 创建一个新项目</h3>
<ol class="setup-content-list">
   <div class="row">
     <div class="col-md-6 col-sm-12">
       <li>打开 Visual Studio。 依次选择“文件”>“新建项目”<b></b>。</li>
     </div>
     <div class="col-md-6 col-sm-12">
       <img src="{{site.baseurl}}/Resources/images/remote-wiring/create_00.png">
     </div>
   </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>现在，可以选择所需语言。Windows Remote Arduino 是 WinRT 组件，这意味着它与 C++、C# 或 JavaScript 兼容 - 对于此示例，你将需要 C#。</li>
        </div>
        <div class="col-md-6 col-sm-12">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>通过展开“Visual C#”<b></b>菜单，你将看到我选择了 C#。选择“Windows”<b></b>选项，然后选择“空白应用(Windows 通用)”<b></b>。如果你要针对 Windows 8.1 进行生成，需要使用“空白应用(Windows 8.1 通用)”<b></b>。</li>
        </div>
        <div class="col-md-6 col-sm-12">
          <img src="{{site.baseurl}}/Resources/images/remote-wiring/create_01.png">
        </div>
      </div>
    </ol>

    <h3>Step 3: Add Windows Remote Arduino projects to your solution</h3>
    <ol class="setup-content-list">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>Clone the <A href="https://github.com/ms-iot/remote-wiring/" target="_blank">Windows Remote Arduino GitHub repository</a>.  If you're not familiar with Git and want to do a proper clone, follow the instructions <a href="https://help.github.com/articles/cloning-a-repository/" target="_blank">here</a>.</li>
        </div>
        <div class="col-md-6 col-sm-12">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>Right-click on your solution in the Solution Explorer and select <b>Add -> Existing Project</b>.</li>
        </div>
        <div class="col-md-6 col-sm-12">
          <img src="{{site.baseurl}}/Resources/images/remote-wiring/project_00.png">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>Navigate to your local copy of the repository. You'll see here that I've cloned it to <b>C:\git\remote-wiring</b>, but you can choose a different directory. Then, open the appropriate solution folder for your build environment (either Windows 10 or Windows 8.1).</li>
        </div>
        <div class="col-md-6 col-sm-12">
          <img src="{{site.baseurl}}/Resources/images/remote-wiring/compile_00.png">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>We need to add three projects - <b>Microsoft.Maker.Firmata</b>, <b>Microsoft.Maker.RemoteWiring</b>, and <b>Microsoft.Maker.Serial</b> - to the project solution.  Let's start with the Serial project (Microsoft.Maker.Serial). Open this directory.</li>
        </div>
        <div class="col-md-6 col-sm-12">
          <img src="{{site.baseurl}}/Resources/images/remote-wiring/project_01.png">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>Select the *.vcxproj* file. (If you are targeting Windows 8.1, you will first have to choose between Windows and Windows Phone platform directories. You do not have to do this for Windows 10, as it is Universal to all platforms.)</li>
        </div>
        <div class="col-md-6 col-sm-12">
          <img src="{{site.baseurl}}/Resources/images/remote-wiring/project_02.png">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>Repeat the previous steps for all three Microsoft.Maker projects.  Once they've all been added to your solution, right-click on <b>References</b> in the original project you made, not one of the newly added Microsoft.Maker projects. Select <b>Add Reference</b>.</li>
        </div>
        <div class="col-md-6 col-sm-12">
          <img src="{{site.baseurl}}/Resources/images/remote-wiring/project_05.png">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>Under the <b>Projects</b> tab, select all three of the Microsoft.Maker projects.</li>
        </div>
        <div class="col-md-6 col-sm-12">
          <img src="{{site.baseurl}}/Resources/images/remote-wiring/project_06.png">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>Rebuild your solution by selecting <b>Build -> Rebuild Solution</b>.</li>
        </div>
        <div class="col-md-6 col-sm-12">
          <img src="{{site.baseurl}}/Resources/images/remote-wiring/compile_03.png">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>Verify you have added the necessary <a href="#device-capabilities">Device Capabilities</a> to your project manifest.  Once you've completed the section below, your device will be ready to go!</li>
        </div>
        <div class="col-md-6 col-sm-12">
        </div>
      </div>
    </ol>
<div class="row">
  <div class="col-md-6 col-sm-12 col-no-padding">
	<a name="device-capabilities"></a>
    <h3>设备功能</h3>

    <p>每个 Windows 项目将包含一个清单文件，该文件必须配置为允许特定权限，例如蓝牙和 USB 连接。幸运的是，配置这些权限相当容易。</p>

    <p>你将需要通过右键单击项目的 package.appxmanifest 文件并选择“查看代码”选项来打开该文件。然后，查找 &lt;功能> 标记，并从下面的“启用蓝牙功能”、“启用网络功能”和“启用 USB 功能”子部分中插入相关代码段。</p>

    <p>注意： 对于 Windows 8.1，你需要在 &lt;程序包> 标记内将以下命名空间添加到 XML 文件顶部。</p>

    {% highlight XML %}
    xmlns:m2="http://schemas.microsoft.com/appx/2013/manifest"
    {% endhighlight %}

    <h2>启用蓝牙功能</h2>
    <p>必须在“Package.appxmanifest”<b></b>文件的 &lt;功能> 标记内添加以下相关 DeviceCapability 标记，才可以调用 WinRT 应用程序的蓝牙功能。</p>

    <h3>Windows 10</h3>
  </div>
</div>

{% highlight XML %}
<DeviceCapability Name="bluetooth.rfcomm">
  <Device Id="any">
    <Function Type="name:serialPort"/>
  </Device>
</DeviceCapability>
{% endhighlight %}

<h3>Windows 8.1</h3>

{% highlight XML %}
<m2:DeviceCapability Name="bluetooth.rfcomm">
  <m2:Device Id="any">
    <m2:Function Type="name:serialPort"/>
  </m2:Device>
</m2:DeviceCapability>
{% endhighlight %}


<h2>启用网络功能</h2>
<p>需要在“Package.appxmanifest”<b></b>文件的 &lt;功能> 标记内添加以下代码，才可以调用 WinRT 应用程序的网络套接字功能。</p>

<h3>Windows 10 和 Windows 8.1</h3>

{% highlight XML %}
<Capability Name="privateNetworkClientServer"/>
<Capability Name="internetClientServer"/>
{% endhighlight %}


<h2>启用 USB 功能</h2>
<p>必须在“Package.appxmanifest”<b></b>文件的 &lt;功能> 标记内添加以下相关 DeviceCapability 标记，才可以调用 WinRT 应用程序的 USB 功能。</p>

    Visual Studio 2015 has a known bug in the Manifest Designer (the visual editor for appxmanifest files) that affects the serialcommunication capability.  If
    your appxmanifest adds the serialcommunication capability, modifying your appxmanifest with the designer will corrupt your appxmanifest (the Device xml child
    will be lost).  You can workaround this problem by hand editting the appxmanifest by right-clicking your appxmanifest and selecting View Code from the
    context menu.

<h3>Windows 10</h3>

{% highlight XML %}
<DeviceCapability Name="serialcommunication">
  <Device Id="any">
    <Function Type="name:serialPort"/>
  </Device>
</DeviceCapability>
{% endhighlight %}

<h3>Windows 8.1</h3>

遗憾的是，此库在 Windows 8.1 上不支持 USB。
