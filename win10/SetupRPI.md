---
layout: default
title: SetupBoard
permalink: /win10/SetupRPI.htm
---

<!-- Main jumbotron for a primary marketing message or call to action -->
<div class="row">
    <!-- <h1>Get Started - Setup Your Raspberry Pi 2</h1> -->
    <h1>Get Started</h1>
    <div class="col-md-8">
        <p>Learn how to set up the Raspberry Pi 2 and connect it to your computer. Note that this requires you to have a PC running Windows 10 Technical Preview.</p>
    </div>
     <div class="row">
        <ul class="nav nav-justified get-started-steps text-center">
            <li>
              <a href="{{site.baseurl}}/GetStarted.htm"><h3 class="inactive">1. Select Your Device</h3></a>
            </li>
            <li>
              <a href="{{site.baseurl}}/win10/SetupRPI.htm"><h3 class="active">2. Set up your Raspberry Pi 2</h3></a>
              <span class="glyphicon glyphicon-time"></span> 30min
            </li>
            <li>
              <a href="{{site.baseurl}}/win10/SetupPC.htm"><h3 class="inactive">3. Set up your PC</h3></a>
            </li>
            <li>
              <a href="{{site.baseurl}}/win10/samples/Blinky.htm"><h3 class="inactive">4. Develop</h3></a>
            </li>
        </ul>
    </div>
</div>


<div class="row">
    <a name="setup-rpi"></a>
    <h2>What you need</h2>
    <ol>
        <li>A PC running <a href="http://insider.windows.com" target="_blank">Windows 10 Insider Preview</a>.</li>
        <li>Raspberry Pi 2.</li>
        <li>5V micro USB power supply with at least 1.0A current.</li>
			NOTE: You may want to use a higher current power supply (>2.0A) instead if you plan on using several USB peripherals or high-current devices.
        <li>A 8gb Class 10 (or better) micro SD card.</li>
			If you don't have an SD card, we suggest this <a href="http://www.amazon.com/gp/product/B00IVPU786">one</a> or this <a href="http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445">one</a>.
        <li>HDMI cable (if display is desired).</li>
        <li>Ethernet cable.</li>
    </ol>
</div>

<div class="row">
    <h2>Put the Windows 10 IoT Core Insider Preview image on your SD Card</h2>
    <p>We have provided a utility to provision your SD card with the Windows 10 IoT Core Insider Preview.  The following steps can only be executed on a system running <a href="https://insider.windows.com">Windows 10</a> (build 10069 or higher).</p>
    <p>Follow these instructions to configure your SD card:</p>
    <ol class="word-wrap">
        <li>NOTE: you will need to follow these instructions on a physical Windows machine (and not a VM) because you need access to the SD card reader.</li>
        <li>Please sign up with our program on <a href="https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558">Microsoft Connect</a>, which is our software release management platform. You will need to have a <a href="http://www.microsoft.com/en-us/account/default.aspx">Microsoft Account</a>. If you are already signed up with our program on Microsoft Connect, (or are not sure if you signed up earlier) and try to sign up again, don’t worry, you will just see a blank page. If you have not signed up for our program on Connect before, it will prompt you to create a social profile and accept license agreements. You can find step-by-step instructions for signing up for Microsoft Connect <a href="http://ms-iot.github.io/content/SigninMSConnect.htm">here</a>.</li>
        <li><a href="http://connect.microsoft.com/windowsembeddedIoT/Downloads/DownloadDetails.aspx?DownloadID=57782">Download</a> the package "Windows 10 IoT Core Insider Preview Image for Raspberry Pi 2" from Microsoft Connect. If you see a blank page or no downloads listed, please make sure you are signed into Microsoft Connect by looking at your login information at top right part of the screen. Click sign in, if you are not signed in.</li>
        <li>Make a local copy of the flash.ffu contained in the downloaded package "Windows 10 IoT Core Insider Preview Image for Raspberry Pi 2".</li>
        <li>Insert an SD card into your SD card reader.</li>
        <li>Open an administrator command prompt and navigate to the folder containing your local flash.ffu.</li>
        <li>
            Find the disk number that your SD card is on your computer.  This will be used when the image is applied in the next step.  To do this, you can use the diskpart utility.  Run the following commands:<br />
            <kbd>diskpart</kbd><br />
            <kbd>list disk</kbd><br />
            <kbd>exit</kbd>
        </li>
        <li>
            Open the administrator command prompt (to do so, click Start, type "cmd," right-click on "Command Prompt" and then select "Run as administrator"). At the prompt, apply the image to your SD card by running the following command (be sure to replace PhysicalDriveN with the value you found in the previous step, for example, if your SD card is disk number 3, use <kbd>/ApplyDrive:\\.\PhysicalDrive3</kbd> below):<br />
            <kbd>dism.exe /Apply-Image /ImageFile:<fullpath>flash.ffu /ApplyDrive:\\.\PhysicalDriveN /SkipPlatformCheck</fullpath></kbd>
        </li>
        <li>Click on the "Safely Remove Hardware" icon in your task tray and select your USB SD card reader to safely remove it from the system.  Failing to do this can cause corruption of the image.
        </li><br>
		<b>NOTE:</b> If you want to remove Windows 10 IoT Core from your SD card after you are done using it, see the <a href="{{site.baseurl}}/FAQs.htm" target="_blank">FAQ</a> section titled <b>How do I remove Windows 10 IoT Core from my SD card?</b>
    </ol>
</div>

<div class="row">
    <a name="hookupboard"></a>
    <h2>Hook up your Board</h2>
    <ol class="word-wrap">
        <li>Insert micro SD card you prepared in the section above (the slot is on the opposite side of the board shown below).</li>
        <li>Connect a network cable to the Ethernet port on the board.</li>
        <li>Connect an HDMI monitor to the HDMI port on the board.</li>
        <li>Connect the power supply to the micro USB port on the board.</li>
    </ol>
    <img class="device-images" src="{{site.baseurl}}/images/rpi2.png">
</div>

<div class="row">
    <h2>Boot Windows 10 IoT Core Insider Preview</h2>
    <ol class="word-wrap">
        <li>Windows 10 IoT Core Insider Preview will boot automatically after connecting power supply.</li>
        <li>On the very first boot the you will see a blue windows logo and then a black screen for a long time (2 minutes or longer).  Do not power off the board while it is doing first-time setup.  The board will then reboot to a blue-screened application that says “MinWin” at the top.  It will sit on this screen also for a long time (2 minutes or longer).  Again, do not power off the board while this is occurring.  Finally the board will reboot a second time to show DefaultApp, displaying the IP address of the Raspberry Pi 2.
            <br /><br /><ul><img class="device-images" src="{{site.baseurl}}/images/DefaultAppRpi2.png"></ul><br />
        </li>
        <li>Follow the instructions <a href="{{site.baseurl}}/win10/samples/PowerShell.htm">here</a> to use PowerShell to connect to your running device.</li>
        <li>It is <b>highly recommended</b> that you update the default password for the Administrator account.  Please follow the instructions found in the <a href="{{site.baseurl}}/win10/samples/PowerShell.htm">PowerShell</a> documentation.</li>
        <li>Remote Debugger will launch automatically when your Raspberry Pi 2 boots. </li>
    </ol>
</div>
