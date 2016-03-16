---
layout: default
title: Home
permalink: /en-US/Faqs.htm
lang: en-US
---
<div class="row col-md-24">
    <div class="col-md-6 col-xs-12 faq-nav section-heading">
        <h1>FAQs</h1>
        <a href="#rpi2"><h4>Setting up Raspberry Pi 2 or 3</h4></a>

        <a href="#uwp"><h4>UWP apps</h4></a>

        <a href="#features"><h4>Features</h4></a>

        <a href="#commercialization"><h4>Commercialization</h4></a>

        <a href="#galileo"><h4>Intel Galileo</h4></a>

        <a href="#errors"><h4>Errors</h4></a>

        <a href="#mbm_usb_port"><h4>MinnowBoard Max</h4></a>

        <a href="#dragonboard"><h4>DragonBoard</h4></a>
    </div>

    <div class="col-md-16 col-md-offset-2 col-xs-8 col-xs-offset-4 section-heading">
        <a name="rpi2"></a>
        <h2 class="faq-h2">Setting up Raspberry Pi</h2>
        <p class="bold"><em>Why does my screen appear cropped or stretched?</em></p>
        <p>This can happen on some monitors. To work around this force the board into DVI mode (vs. HDMI mode).  You can read more about this <a href='https://www.raspberrypi.org/forums/viewtopic.php?t=5851'>here</a>. Mount the SD card to a local PC and proceed to edit the file in the EFIESP partition. For example if the partition is marked as H drive, edit H:\config.txt by adding the following line.<br/><br/>
        <pre>hdmi_group=2                # forces DVI timing to be used</pre>
        <p class="bold"><em>Can I set up a Raspberry Pi 2 or 3 using Windows 8.1?</em></p>
        <p>You will need Windows 10 on your PC to be able to set up Raspberry Pi 2 or 3 running Windows 10 IoT Core.</p>
		<p class="bold"><em>Why does my SD card have to be 8gb, do you really need all that space?</em></p>
        <p>The IoT Core image is under 1gb, the 8gb is meant to give you space to install additional content on your device.</p>
		<p class="bold"><em>How do I remove Windows 10 IoT Core from my SD card?</em></p>
        <p>After you've flashed the Windows 10 IoT Core image to your SD card, the reported size of the card will drop to 67.3MB. In order to restore the card back for general use, you'll need to run a series commands in an elevated command prompt (Simply reformatting the card alone won't work):
		<ul>
		<li><kbd>diskpart</kbd></li>
		<li><kbd>list disk</kbd> (This command lists the drives you have connected to your computer. Take note of the disk number of your SD card)</li>
		<li><kbd>select disk &lt;number&gt;</kbd> (Replace <kbd>&lt;number&gt;</kbd> with the disk number of your SD card from the previous step</li>
		<li><kbd>clean</kbd></li>
		<li><kbd>create partition primary</kbd></li>
		<li><kbd>format fs=ntfs quick</kbd></li>
		<li><kbd>exit</kbd></li>
		</ul>
		Your SD card is now ready for general purpose use again.
       </p>
        <a name="uwp"></a>
        <h2 class="faq-h2">Universal Windows Platform (UWP) Apps</h2>
        <p class="bold"><em>I get "You need to enable Developer Mode" on my Vistual Studio machine.  What do I do?</em></p>
        <p>In a later builds of windows there will be a settings page "For developers" that will allow you to control this.  Until then you can work around this using the Group Policy editor.  More details <a href='https://msdn.microsoft.com/en-us/library/windows/apps/dn706236.aspx'>here</a></br>
        <ol>
        <li>Run Gpedit.msc </li>
	<li>Under [Local Computer Policy > Computer Configuration > Administrative Templates > Windows Components > App Package Deployment] enable the following policies:</li>
	<ul><li>Allow all trusted apps to install (will enable sideloading of trust signed apps such as for enterprise apps)</li>
	<li>Allow development of Windows Store apps without installing a developer license (will enable developer F5 mode installs like the dev license would on win8.1)</li>
	</ul></ol></p>
        <p class="bold"><em>Are true console apps supported on Windows 10 IoT Core?</em></p>
        <p>True "console" apps aren't really going to be supported for the IoT core OS, headless or not. You can still deploy and run a standard win32 console app here, it just won't be connected to any on-device console. When running headless you should just get that black screen. When running headed the only supported UI is via the UWP UI stacks (XAML, HTML, DirectX).</p>
        <br />
        <p class="bold"><em>Which languages can be used to create UWP apps that can run on Windows 10 IoT Core?</em></p>
        <p>You can develop your UWP apps in C#, C++, JavaScript, VB, Node.js, Python and Arduino Wiring.</p>
        <br />
        <a name="features"></a>
        <h2 class="faq-h2">Features</h2>
        <p class="bold"><em>Is WiFi supported on Windows 10 IoT Core?</em></p>
        <p>WiFi support for some adapters is now available in the public release of Windows 10 IoT Core. Click <a href="http://ms-iot.github.io/content/en-US/win10/SetupWiFi.htm">here</a> to learn more.</p>
        <br />
        <p class="bold"><em>Is Bluetooth currently supported on Windows 10 IoT Core?</em></p>
        <p>Bluetooth support for some dongles is now available in the public release of Windows 10 IoT Core. Click <a href="http://ms-iot.github.io/content/en-US/win10/Bluetooth.htm">here</a> to learn more</p>
        <br />
        <a name="commercialization"></a>
        <h2 class="faq-h2">Commercialization</h2>
        <p class="bold"><em>Can I commercialize my Proof of Concept on Windows 10 IoT Core?</em></p>
        <p>Yes. If you already have a Proof of Concept with Windows 10 IoT Core, <a href="http://go.microsoft.com/fwlink/?LinkId=708649" target="_blank">click here</a> to find your options on how to commercialize your device.</p>
        <br />
        <a name="galileo"></a>
        <h2 class="faq-h2">Intel Galileo</h2>
        <p class="bold"><em>Will you continue to support the Windows Developer Program for IoT for Intel Galileo?</em></p>
        <p>No. We continue to focus on providing a great experience for Makers with Windows 10 IoT Core. While we've seen some fantastic innovation with the platform, unfortunately it does not meet the minimum hardware requirements for Windows 10 IoT Core.</p>
        <br />
		<p class="bold"><em>When will the support for Windows on Galileo end?</em></p>
        <p>The support for Windows on Galileo has ended on November 30, 2015.</p>
        <br />
		<p class="bold"><em>What can I do with my existing projects on Galileo?</em></p>
        <p>Wiring support is now available on Windows 10 IoT Core running on Raspberry Pi 2 or 3. This allows you to migrate your existing Galileo projects to Windows 10 IoT Core.</p>
        <br />
        <a name="errors"></a>
        <h2 class="faq-h2">Errors</h2>
        <p class="bold"><em>When I try to build a project, I see this error: <br />"The package Microsoft.CSharp with version 4.0.0 could not be found in C:\Users\...\.nuget\packages. Run a NuGet package restore to download the package." <br />How do I resolve this?</em></p>
        <p>Be sure your project has a saved solution file (*.sln). The Nuget package manager requires a saved solution file to update the Nuget dependencies. You can ensure that a solution file exists by selecting File > Save All.</p>
        <br />
        <p class="bold"><em>I've downloaded the RPi2.ffu image and tried to apply image from the administrator prompt using this command:<br />dism.exe /Apply-Image /ImageFile:Rpi2.ffu /ApplyDrive:\\.\PhysicalDrive1 /SkipPlatformCheck<br />I am getting the following error:<br />c:\Temp>dism.exe /Apply-Image /ImageFile:Rpi2.ffu /ApplyDrive:\\.\PhysicalDrive1  /SkipPlatformCheck<br /><br />
        Deployment Image Servicing and Management tool<br />
        Version: 6.3.9600.17031<br /><br />
        Error: 87<br /><br />
        The /applydrive option is not recognized in this context.<br />
        For more information, refer to the help.<br />
        </em></p>
        <p>You need to use DISM on Windows 10 and not Windows 8.1.</p>
        <br />
        <p class="bold"><em>I want to move files from a host computer onto the RP2 via the remote power shell session. I've tried making a shared folder on my host computer (allow access to "everyone"), but the RP2 remote session fails with what seems to be an access denied error when I try to copy from the host shared folder. Has anyone done this successfully or have a good suggestion for how to do this?</em></p>
        <p>If you're just trying to copy files across and not doing this as part of some PowerShell script you're authoring, you can do it without PowerShell. You can try accessing your RPi2 from your local PC with "\\<IP>\c$" and see if that works for your scenario. If you can't do that, you do have access issues.</p>
        <br />
        <br />
        <p class="bold"><em>My C++ or Python Background Application is building and deploying successfully, but hangs indefinitely after launching.  How do I resolve this?</em></p>
        <p>There is a known issue being actively investigated that sporadically occurs on some SD cards.  This can be worked around using the following command via a PowerShell session with the device:
        <div>reg add "hklm\software\microsoft\visualstudio\debugger" /v EmulateExclusiveBreakpoints /t REG_DWORD /d 0</div>        </p>
        <br />
        <br />
        <p class="bold"><em>My C#/VB UWP App successfully builds, deploys but fails to start with the error "Unable to activate Windows Store App [appX]. The activation request failed with error 'The wait operation timed out'.  How do I resolve this?</em></p>
        <p>This occurs if you have put Pi2 into headless mode instead of headed mode. To put this back to headed mode issue the following command from powershell </p>
        <p>setbootoption.exe headed</p>
        <br />
        <br />
        <p class="bold"><em>My Node.js UWP project fails to load after installing the latest release (NTVS Bundle VS 2015.exe v1.0).  How do I resolve this?</em></p>
        <p>If you installed the first version of NTVS IoT Extension Beta, and then install the latest release which is bundled in NTVS Bundle VS 2015, you will see
        a project load error. The error will be something like "The imported project "...\Microsoft.NodejsUap.targets" was not found". To resolve this problem, do
        the following:
        <ul><li>Right click on the project and select Edit &lt;Your Project Name&gt;.</li>
        <li>Look for "NodejsUap" in the project file, replace it with "NodejsUwp", and save.</li></ul>
        If you attempt to deploy the app, it will crash immediately. To fix this:
        <ul><li>Open Package.appxmanifest.</li>
        <li>Replace all occurences of "winuniversalnode" with "nodeuwp" and save.</li></ul></p>
        <br />
		<a name="mbm_usb_port"></a>
        <h2 class="faq-h2">MinnowBoard Max</h2>
        <p class="bold"><em>Known issues with the top USB port</em></p>
        <p>You may experience degrading performance and lack of key functionality with USB devices plugged into the top port.  At this time we suggest using only the bottom port for USB peripherals.  We are currently investigating this issue.</p>
        <br />

    <a name="dragonboard"></a>
        <h2 class="faq-h2">DragonBoard</h2>
        <p class="bold"><em>USB Issues</em></p>
        <p>The Dragonboard is not capable of powering more than one USB device and needs a powered USB hub when connecting multiple devices to the same USB port.</p>
        <br />
    </div>
</div>
