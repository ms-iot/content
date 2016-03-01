<h3>Installation</h3>
<p>This section of the tutorial explains how to setup your Windows 10 device - be it a PC, Surface, or Windows Phone - to remotely control an Arduino using the <b>Windows Remote Arduino</b> library.</p>
<p>There are two ways to get started using Windows Remote Arduino:</p>
<ol class="inline-list">
      <li><a href="#option-1">Install the NuGet package</a></li>
      <li><a href="#option-2">Manually add the Windows Remote Arduino project files to a new Visual Studio solution.</a></li>
</ol>
<p>If you'd like to develop your own apps using Windows Remote Arduino, option 1 will allow you to easily add the library to any Visual Studio solution. Option 2 is more complex, but will allow you to add the latest source code directly to your solution. You will then be able to see and control exactly how the library operates!</p>

<h2 id="option-1">Option 1: Install the NuGet package</h2>
<p>NuGet is a quick and easy way to automatically install the packages and setup dependencies.</p>
<ol class="inline-list">
  <li><a href="#install-vs">Install Visual Studio</a></li>
  <li><a href="#new-project">Create a New Project</a></li>
  <li>In Visul Studio, navigate to the following menu item: Tools > NuGet Package Manager > Package Manager Console</li>
  <li>Enter the following command into the console window: <code> Install-Package Windows-Remote-Arduino</code></li>
</ol>
<p>As an alternative to step 4 above, you can also select <b>Manage NuGet packages for Solution</b> under the <b>NuGet Package Manager</b> context menu and manually search for and install <b>Windows Remote Arduino</b>.  Visit <a href="https://www.nuget.org/packages/Windows-Remote-Arduino">https://www.nuget.org/packages/Windows-Remote-Arduino</a> for more information on this package.</p>
<p>Once you're done with this section, skip to the Device Capabilities section to finish setting up the application.</p>

<h2 id="option-2">Option 2: Add the Windows Remote Arduino projects to a Visual Studio solution</h2>
<h3 id="install-vs">Step 1: Install Visual Studio</h3>
<p>We recommend <a href="http://go.microsoft.com/fwlink/?LinkID=534599" target="_blank">Visual Studio Community Edition</a>, but Visual Studio Professional 2015 and Visual Studio Enterprise 2015 will work as well (available <a href="https://www.visualstudio.com/vs-2015-product-editions" target="_blank"> here </a>). If you already have Visual Studio installed, you can proceed directly to the next step.</p>
<h3 id="new-project">Step 2: Create a new project</h3>
<ol class="setup-content-list">
  <li>
    <p>Open Visual Studio.  Select <b>File -> New Project</b>.</p>
    <p><img src="{{site.baseurl}}/Resources/images/remote-wiring/create_00.png" /></p>
  </li>
  <li>You can now select your language of choice. Windows Remote Arduino is a WinRT component, meaning it is compatible with C++, C#, or JavaScript - for this sample you'll want C#.</li>
  <li>
    <p>You'll see I have chosen C# by expanding the <b>Visual C#</b> menu. Select the <b>Windows</b> option and choose <b>Blank App (Windows Universal)</b>. If you are building for Windows 8.1, you'll want <b>Blank App (Windows 8.1 Universal)</b>.</p>
    <p><img src="{{site.baseurl}}/Resources/images/remote-wiring/create_01.png" /></p>
  </li>
</ol>

<h3>Step 3: Add Windows Remote Arduino projects to your solution</h3>
<ol class="setup-content-list">
  <li>Clone the <A href="https://github.com/ms-iot/remote-wiring/" target="_blank">Windows Remote Arduino GitHub repository</a>.  If you're not familiar with Git and want to do a proper clone, follow the instructions <a href="https://help.github.com/articles/cloning-a-repository/" target="_blank">here</a>.</li>
  <li>
    <p>Right-click on your solution in the Solution Explorer and select <b>Add -> Existing Project</b>.</p>
    <p><img src="{{site.baseurl}}/Resources/images/remote-wiring/project_00.png" /></p>
  </li>
  <li>
    <p>Navigate to your local copy of the repository. You'll see here that I've cloned it to <b>C:\git\remote-wiring</b>, but you can choose a different directory. Then, open the appropriate solution folder for your build environment (either Windows 10 or Windows 8.1).</p>
    <p><img src="{{site.baseurl}}/Resources/images/remote-wiring/compile_00.png" /></p>
  </li>
  <li>
    <p>We need to add three projects - <b>Microsoft.Maker.Firmata</b>, <b>Microsoft.Maker.RemoteWiring</b>, and <b>Microsoft.Maker.Serial</b> - to the project solution.  Let's start with the Serial project (Microsoft.Maker.Serial). Open this directory.</p>
    <p><img src="{{site.baseurl}}/Resources/images/remote-wiring/project_01.png" /></p>
  </li>
  <li>
    <p>Select the *.vcxproj* file. (If you are targeting Windows 8.1, you will first have to choose between Windows and Windows Phone platform directories. You do not have to do this for Windows 10, as it is Universal to all platforms.)</p>
    <p><img src="{{site.baseurl}}/Resources/images/remote-wiring/project_02.png" /></p>
  </li>
  <li>
    <p>Repeat the previous steps for all three Microsoft.Maker projects.  Once they've all been added to your solution, right-click on <b>References</b> in the original project you made, not one of the newly added Microsoft.Maker projects. Select <b>Add Reference</b>.</p>
    <p><img src="{{site.baseurl}}/Resources/images/remote-wiring/project_05.png"/></p>
  </li>
  <li>
    <p>Under the <b>Projects</b> tab, select all three of the Microsoft.Maker projects.</p>
    <p><img src="{{site.baseurl}}/Resources/images/remote-wiring/project_06.png"></p>
  </li>
  <li>
    <p>Rebuild your solution by selecting <b>Build -> Rebuild Solution</b>.</p>
    <p><img src="{{site.baseurl}}/Resources/images/remote-wiring/compile_03.png"></p>
  </li>
  <li>Verify you have added the necessary <a href="#device-capabilities">Device Capabilities</a> to your project manifest.  Once you've completed the section below, your device will be ready to go!</li>
</ol>

<h3>Device Capabilities</h3>

<p>Each Windows project will contain a manifest file that must be configured to allow certain permissions, such as Bluetooth and USB connectivity. Fortunately, it is fairly easy to configure these.</p>

<p>You will need to open the package.appxmanifest file of your project by right-clicking the file and selecting the "View Code" option. Then, find the &lt;Capabilities&gt; tag and insert the relevant code snippets from the "Enabling Bluetooth Capabilities", "Enabling Network Capabilities", and "Enabling USB Capabilities" subsections below.</p>

<p>NOTE: For Windows 8.1, you will need to add the following namespace to the top of the XML file, inside the &lt;Package&gt; tag.</p>

{% highlight XML %}
xmlns:m2="http://schemas.microsoft.com/appx/2013/manifest"
{% endhighlight %}

<h2>Enabling Bluetooth Capabilities</h2>
<p>In order to invoke the Bluetooth capabilities of a WinRT application, you must add the relevant DeviceCapability tags below inside the &lt;Capabilities&gt; tag of the <b>Package.appxmanifest</b> file.</p>

<h3>Windows 10</h3>

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


<h2>Enabling Network Capabilities</h2>
<p>In order to invoke the network socket capabilities of a WinRT application, you will need to add the following code inside the &lt;Capabilities&gt; tag of the <b>Package.appxmanifest</b> file.</p>

<h3>Windows 10 and Windows 8.1</h3>

{% highlight XML %}
<Capability Name="privateNetworkClientServer"/>
<Capability Name="internetClientServer"/>
{% endhighlight %}


<h2>Enabling USB Capabilities</h2>
<p>In order to invoke the USB capabilities of a WinRT application, you must add the relevant DeviceCapability tags below inside the &lt;Capabilities&gt; tag of the <b>Package.appxmanifest</b> file.</p>

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

Unfortunately, this library does not support USB on Windows 8.1.
