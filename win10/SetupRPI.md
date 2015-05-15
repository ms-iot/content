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
        <li><b>Windows 10 Insider Preview</b> - must be a physical Windows machine (not a VM).</li>
        <li><b>Raspberry Pi 2</b>.</li>
        <li><b>5V micro USB power supply </b> - with at least 1.0A current.</li>
        <li><b>8GB micro SD card</b> - class 10 or better. (We suggest this <a href="http://www.amazon.com/gp/product/B00IVPU786?tag=thewire06-20&linkCode=as2&creative=374929&camp=211189">one</a> or this <a href="http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445/ref=sr_1_15?ie=UTF8&qid=1415926730&sr=8-15&keywords=micro+sd+xd">one)</a>.</li>
        <li><b>HDMI cable</b> (if display is desired).</li>
        <li><b>Ethernet cable</b>.</li>
    </ol>

		    If you are using several USB peripherals or high-current devices, use a higher current power supply (>2.0A). 
</div>

<div class="row">
    <h2>Put the Windows 10 IoT Core Insider Preview image on your SD card</h2>
    <p>We have provided a utility to provision your SD card with the Windows 10 IoT Core Insider Preview.  The following steps can only be executed on a system running <a href="https://insider.windows.com">Windows 10</a> (build 10069 or higher).</p>
    <p>NOTE: you will need to follow these instructions on a <b>physical Windows machine</b> (and not a VM) because you need access to the SD card reader.</p>
	<p>Follow these instructions to configure your SD card:</p>
    <ol class="word-wrap">
		<li>
			Please <b>sign up on <a href="https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558">Microsoft Connect</a></b>, which is our software release management platform.
			<ul>
			<li> You will need to have a Microsoft email account (<a href="http://outlook.com/">outlook.com</a>, <a href="http://hotmail.com/">hotmail.com</a>, <a href="http://live.com/">live.com</a> etc.).</li> 
			<li>If you are already signed up with our program on Microsoft Connect, (or are not sure if you signed up earlier), you will just see a blank page.</li>
			<li>If you have not signed up for our program on Connect before, it will prompt you to create a social profile and accept license agreements. You can find step-by-step instructions for signing up for Microsoft Connect <a href="http://ms-iot.github.io/content/SigninMSConnect.htm">here</a>.</li>
			</ul>
		</li> 
		<li> Once signed in, navigate to <b> surveys </b>, and complete all of surveys. 
			<img class="device-images" src="{{site.baseurl}}/images/SetupRPI/connect1.png">
		</li>
		<li>
			<a href="http://connect.microsoft.com/windowsembeddedIoT/Downloads/DownloadDetails.aspx?DownloadID=57782">Download</a> the <b>package</b> "Windows 10 IoT Core Insider Preview Image for Raspberry Pi 2" from Microsoft Connect.
			<ul>
			<li>If you see a blank page or no downloads listed, please make sure you are signed into Microsoft Connect by looking at your login information at top right part of the screen. Click sign in, if you are not signed in.</li>
			</ul>
		</li>
		<li> 
			<b>Select your board type </b> from the downloads, and proceed to download the files 
			<img src="{{site.baseurl}}/images/SetupRPI/connect3.png">
			<img src="{{site.baseurl}}/images/SetupRPI/connect4.png">
		</li>
		<li>
			A window will pop up on your desktop.Click <b>Browse</b>, select where you want to place the folder and click <b> Transfer </b>
			<img src="{{site.baseurl}}/images/SetupRPI/download1.png">
			When it's done transferring, close the window.
			<img src="{{site.baseurl}}/images/SetupRPI/download2.png">
		</li>
        <li>
			<b>Make a local copy</b> of the flash.ffu contained in Windows_IoT_Core_RPI2_BUILD.zip found <a href="{{site.downloadurl}}" target="_blank">here</a>
			<img src="{{site.baseurl}}/images/SetupRPI/flash2.png">
		</li>
		<li>
			<b>Insert an SD card</b> into your SD card reader.
		</li>
        <li>
			Open an <b>admininistrator command prompt</b> 
			<img class="device-images" src="{{site.baseurl}}/images/SetupRPI/cmd.jpg">
			and navigate to the folder containing your local flash.ffu.
		</li>
        <li>
            <b>Find the disk number</b> that your SD card is on your computer.  This will be used when the image is applied in the next step.  To do this, you can use the <b>diskpart</b> utility.  Run the following commands:<br />
            <kbd>diskpart</kbd><br />
            <kbd>list disk</kbd><br />
            <kbd>exit</kbd>
			<img  src="{{site.baseurl}}/images/SetupRPI/diskpart.png">
        </li>
        <li>
            Using the administrator command prompt, apply the image to your SD card by running the following command (be sure to replace PhysicalDriveN with the value you found in the previous step, for example, if your SD card is disk number 3, use <kbd>/ApplyDrive:\\.\PhysicalDrive3</kbd> below):<br />
            <kbd>dism.exe /Apply-Image /ImageFile:<fullpath>flash.ffu /ApplyDrive:\\.\PhysicalDriveN /SkipPlatformCheck</fullpath></kbd>

			<img  src="{{site.baseurl}}/images/SetupRPI/applyDrive.png">
        </li>
        <li>
			Click on the <b>Safely Remove Hardware</b> icon in your task tray and select your USB SD card reader to safely remove it from the system.  Failing to do this can cause corruption of the image.
		</li>
    </ol>
</div>

<div class="row">
	<a name="hookupboard"></a>
	<h2>Hook up your board</h2>
    <ol class="word-wrap">
        <li><b>Insert the micro SD card</b> you prepared in the section above (the slot is on the opposite side of the board shown below).</li>
        <li><b>Connect a network cable</b> to the Ethernet port on the board.</li>
        <li><b>Connect an HDMI monitor</b> to the HDMI port on the board.</li>
        <li><b>Connect the power supply</b> to the micro USB port on the board.</li>
    </ol>
    <img class="device-images" src="{{site.baseurl}}/images/rpi2.png">
</div>

<div class="row">
    <h2>Boot Windows 10 IoT Core Insider Preview</h2>
    <ol class="word-wrap">
        <li>Windows 10 IoT Core Insider Preview will boot automatically after connecting power supply.</li>
        <li>On the very first boot Windows IoT Core will do some first boot configurations and it will display a default blue colored application while this is happening. <b>Wait for a few minutes</b> and the board will automatically restart. This will happen only once and then DefaultApp should come up, displaying the IP address of the Raspberry Pi 2.
            <br /><br /><ul><img class="device-images" src="{{site.baseurl}}/images/DefaultAppRpi2.png"></ul><br />
        </li>
        <li>Follow the instructions <a href="{{site.baseurl}}/win10/Samples/PowerShell.htm">here</a> to use PowerShell to connect to your running device.</li>
        <li>It is <b>highly recommended</b> that you update the default password for the Administrator account.  Please follow the instructions found in the <a href="{{site.baseurl}}/win10/Samples/PowerShell.htm">PowerShell</a> documentation.</li>
        <li>Remote Debugger will launch automatically when your Raspberry Pi 2 boots. </li>
    </ol>
</div>
