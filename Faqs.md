---
layout: default
title: Home
permalink: /Faqs.htm
---
<div class="row col-md-12">
    <div class="col-md-2 col-xs-12 faq-nav section-heading">
        <h1>FAQs</h1>
        <a href="#rpi2"><h4>Setting up Raspberry Pi 2</h4></a>

        <a href="#uwp"><h4>UWP apps</h4></a>

        <a href="#features"><h4>Features</h4></a>

        <a href="#galileo"><h4>Intel Galileo</h4></a>

        <a href="#errors"><h4>Errors</h4></a>
    </div>

    <div class="col-md-8 col-md-offset-4 col-xs-8 col-xs-offset-4 section-heading">
        <a name="rpi2"></a>
        <h2 class="faq-h2">Setting up Raspberry Pi</h2>
        <p><em>I can't download the Windows 10 IoT Core Insider Preview image for Raspberry Pi. I see a blank screen.</em></p>
        <p>We release the Windows 10 IoT Core for Raspberry Pi 2 through our program on Microsoft Connect, which also provides a platform for bug reporting and providing feedback. To be able to download the image, you need to be signed up for our program on Microsoft Connect <u>and</u> signed in. If you have not signed up for our program on Microsoft Connect yet, please <a href="https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558" target="_blank">click here to sign up</a>. You can find step-by-step instructions for signing up or using Microsoft Connect <a href="http://ms-iot.github.io/content/SigninMSConnect.htm" target="_blank">here</a>. If you have already signed up for this program on Microsoft Connect, and try to sign up again, don't worry. You will just see a blank page.</p>
        <p>Please make sure you are signed in to Microsoft Connect before trying to download the image.</p>
        <p><em>Why does my screen appear cropped or stretched?</em></p>
        <p>This can happen on some monitors.   To work around this force the board into DVI mode (vs. HDMI mode).  You can read more about this <a href='https://www.raspberrypi.org/forums/viewtopic.php?t=5851'>here</a>. Mount the SD card to a local PC and proceed to edit the file in the EFIESP partition. For example if the partition is mark as H drive, edit H:\config.txt by adding the following line.<br/><br/>
        hdmi_group=2                # forces DVI timing to be used
        <p><em>Can I set up a Raspberry Pi 2 using Windows 8.1?</em></p>
        <p>You will need Windows 10 on your PC to be able to set up Raspberry Pi 2 running Windows 10 IoT Core.</p>
		<p><em>Why does my SD card have to be 8gb, do you really need all that space?</em></p>
        <p>The IoT Core image is under 1gb, the 8gb is meant to give you space to install additional content on your device.</p>
        <br />
        <a name="uwp"></a>
        <h2 class="faq-h2">Universal Windows Platform (UWP) Apps</h2>
        <p><em>I get "You need to enable Developer Mode" on my Vistual Studio machine.  What do I do?</em></p>
        <p>In a later builds of windows there will be a settings page "For developers" that will allow you to control this.  Until then you can work around this using the Group Policy editor. </br>
        <ol>
        <li>Run Gpedit.msc </li>
	<li>Under [Local Computer Policy > Computer Configuration > Administrative Templates > Windows Components > App Package Deployment] enable the following policies:</li>
	<ul><li>Allow all trusted apps to install (will enable sideloading of trust signed apps such as for enterprise apps)</li>
	<li>Allow development of Windows Store apps without installing a developer license (will enable developer F5 mode installs like the dev license would on win8.1)</li>
	</ul></ol>
        <p><em>Are true console apps supported on Windows 10 IoT Core?</em></p>
        <p>True “console” apps aren’t really going to be supported for the IoT core OS, headless or not. You can still deploy and run a standard win32 console app here, it just won’t be connected to any on-device console. When running headless you should just get that black screen. When running headed the only supported UI is via the UWP UI stacks (XAML, HTML, DirectX).</p>
        <br />
        <a name="features"></a>
        <h2 class="faq-h2">Features</h2>
        <p><em>Is WiFi supported on Windows 10 IoT Core?</em></p>
        <p>We are in the process of getting WiFi ready, but it is not in the build that is currently publicly available.</p>
        <br />
        <p><em>Is Bluetooth currently supported on Windows 10 IoT Core?</em></p>
        <p>We are in the process of getting Bluetooth ready, but it is not in the build that is currently publicly available.</p>
        <br />
        <a name="galileo"></a>
        <h2 class="faq-h2">Intel Galileo</h2>
        <p><em>Can I run Windows 10 IoT Core on the Intel Galileo Gen 1 or Gen 2 board?</em></p>
        <p>We have no plans to bring Windows 10 to the Intel Galileo board at this time. </p>
        <br />
        <p><em>Will you continue to support the Windows Developer Program for IoT for Galileo?</em></p>
        <p>We’ve been overwhelmed by the interest in our Windows 8.1 based program and appreciate all the incredible feedback the community has provided. While there will be no new feature development for the Galileo release we will continue to support this release for as long as significant community activity exists.</p>
        <br />
        <a name="errors"></a>
        <h2 class="faq-h2">Errors</h2>
        <p><em>I’ve downloaded the RPi2.ffu image and tried to apply image from the administrator prompt using this command:<br />dism.exe /Apply-Image /ImageFile:Rpi2.ffu /ApplyDrive:\\.\PhysicalDrive1 /SkipPlatformCheck<br />I am getting the following error:<br />c:\Temp>dism.exe /Apply-Image /ImageFile:Rpi2.ffu /ApplyDrive:\\.\PhysicalDrive1  /SkipPlatformCheck<br /><br />
    Deployment Image Servicing and Management tool<br />
    Version: 6.3.9600.17031<br /><br />
    Error: 87<br /><br />
    The /applydrive option is not recognized in this context.<br />
    For more information, refer to the help.<br />
    </em></p>
        <p>You need to use DISM on Windows 10 and not Windows 8.1.</p>
        <br />
        <p><em>I want to move files from a host computer onto the RP2 via the remote power shell session. I’ve tried making a shared folder on my host computer (allow access to “everyone”), but the RP2 remote session fails with what seems to be an access denied error when I try to copy from the host shared folder. Has anyone done this successfully or have a good suggestion for how to do this?</em></p>
        <p>If you're just trying to copy files across and not doing this as part of some PowerShell script you're authoring, you can do it without PowerShell. You can try accessing your RPi2 from your local PC with "\\<IP>\c$" and see if that works for your scenario. If you can't do that, you do have access issues.</p>
        <br />
        <br />
        <p><em>My C++ or Python Background Application is building and deploying successfully, but hangs indefinitely after launching.  How do I resolve this?</em></p>
        <p>There is a known issue being actively investigated that sporadically occurs on some SD cards.  This can be worked around using the following command via a PowerShell session with the device:
        <div><b>reg add "hklm\software\microsoft\visualstudio\debugger" /v EmulateExclusiveBreakpoints /t REG_DWORD /d 0</b></div>        </p>
        <br />
        <p><em>My C#/VB UWP App successfully builds, deploys and launches using Visual Studio, but when I use iotstartup.exe to make my App the 'Startup App' all I see is the splash screen.  How do I resolve this?</em></p>
        <p>There is a known issue being actively investigated that occurs with C#/VB Apps as the 'Startup App'.  This can be worked around by changing your App's configuration to Release (rather than Debug) and redeploying
        to your device.  Note that another workaround is to use C++ rather than C#/VB.</p>
        <br />
        <br />
        <p><em>My C#/VB UWP App successfully builds, deploys but fails to start with the error "Unable to activate Windows Store App [appX]. The activation request failed with error 'The wait operation timed out'.  How do I resolve this?</em></p>
        <p>This occurs if you have put Pi2 into headless mode instead of headed mode. To put this back to headed mode issue the following command from powershell </p>
        <p>setbootoption.exe headed</p>
        <br />
    </div>
</div>
