---
layout: default
title: SetupBoard
permalink: /win10/SetupMBM.htm
---

<!-- Main jumbotron for a primary marketing message or call to action -->

<div class="row">
    <!-- <h1>Get Started - Setup Your MinnowBoard Max</h1> -->
    <h1>Get Started</h1>
    <div class="col-md-8">
        <p>Learn how to set up the MinnowBoard Max hardware and connect it to your computer.</p>
    </div>
     <div class="row">
        <ul class="nav nav-justified get-started-steps text-center">
            <li>
              <a href="{{site.baseurl}}/GetStarted.htm"><h3 class="inactive">1. Select Your Device</h3></a>
            </li>
            <li>
              <a href="{{site.baseurl}}/win10/SetupMBM.htm"><h3 class="active">2. Set up your MinnowBoard Max</h3></a>
              <span class="glyphicon glyphicon-time"></span> 30min
            </li>
            <li>
              <a href="{{site.baseurl}}/win10/SetupPCMBM.htm"><h3 class="inactive">3. Set up your PC</h3></a>
            </li>
            <li>
              <a href="{{site.baseurl}}/win10/samples/BlinkyMBM.htm"><h3 class="inactive">4. Develop</h3></a>
            </li>
        </ul>
    </div>
</div>

<div class="row">
    <h2>What you need</h2>
    <ol>
        <li>A PC running Windows 10 Insider Preview.</li>
        <li>MinnowBoard Max.</li>
        <li>Power supply.</li>
        <li>A 8gb Class 10 (or better) micro SD card. If you don't have an SD card, we suggest this <a href="http://www.amazon.com/gp/product/B00IVPU786?tag=thewire06-20&linkCode=as2&creative=374929&camp=211189">one</a> or this <a href="http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445/ref=sr_1_15?ie=UTF8&qid=1415926730&sr=8-15&keywords=micro+sd+xd">one</a>.</li>
        <li>HDMI cable (if display is desired).</li>
        <li>Ethernet cable.</li>
    </ol>
</div>

<div class="row">
    <h2>Hook Up Your Board</h2>
    <ol>
        <li>Connect a USB keyboard to one of the USB ports on the board.</li>
        <li>Connect an HDMI monitor to the microHDMI port on the board.</li>
        <li>Connect a network cable to the Ethernet port on the board.</li>
    </ol>
    <img class="device-images" src="{{site.baseurl}}/images/mbm.bmp">
</div>

<div class="row">
    <h2>Update your Firmware</h2>
    <ol class="word-wrap">
        <li>For the current release, only 32 bit Windows 10 IoT Core is supported.  Download the latest 32-Bit Release pre-built BIOS firmware from <a href="http://firmware.intel.com/projects/minnowboard-max" target="_blank">firmware.intel.com/projects/minnowboard-max</a></li>
        <li>Unzip the downloaded file and copy the following files to a FAT formatted USB stick
            <ul>
                <li>*.efi</li>
                <li>*.bin</li>
            </ul>
        </li>
        <li>Power off your minnowboard</li>
        <li>Remove any SD cards and external hard drives </li>
        <li>Plug in the USB stick to the minnowboard </li>
        <li>Connect an HDMI/DVI monitor and USB keyboard
            <ul>
                <li>It is also possible to interact with UEFI and BIOS over a serial connection</li>
            </ul>
        </li>
        <li>Power on your minnowboard </li>
        <li>You should see the UEFI prompt. Run the following commands at the UEFI prompt:
            <ul>
                <li>If your current firmware is 64 bit (this is how the Minnowboard ships)<br/>
                    <kbd>fs0:</kbd><br/>
                    <kbd>.\MinnowBoard.MAX.FirmwareUpdateX64.efi <i>_filename_</i>.bin</kbd>
                </li>
                <li>If your current firmware is 32 bit (if you have already modified the original firmware to be 32 bit)<br/>
                    <kbd>fs0:</kbd><br/>
                    <kbd>.\MinnowBoard.MAX.FirmwareUpdateIA32.efi <i>_filename_</i>.bin</kbd>
                </li>
            </ul>
        </li>
        <li>The system should shut down automatically after the firmware update is complete. </li>
    </ol>

    Note: You might wonder why you need to invoke 'MinnowBoard.MAX.FirmwareUpdateX64.efi' even if we're only supporting a 32 bit version of Windows 10 IoT Core.
    The board usually comes with 64-bit firmware pre-installed on it.  The bitness of the EFI has to match the bitness of the current firmware.  Additionally, the bitness of the bin file has to match the desired bitness of the firmware after updating.
    So the first time you will likely need to use 64-bit EFI and 32-bit BIN.
    The second time and every other time you need to use 32-bit EFI and 32-bit BIN.
    The reason the bitness of the firmware has to match the bitness of the OS is that there is an EFI in the OS image that gets loaded to bootstrap the OS, and that EFI has to be the same bitness as the firmware as well.

</div>

<div class="row">
    <h2>Put the Windows 10 IoT Core Insider Preview image on your SD Card</h2>
    <p>We have provided a utility to provision your SD card with the Windows 10 IoT Core Insider Preview. If you don't have an SD card, we suggest this <a href="http://www.amazon.com/gp/product/B00IVPU786?tag=thewire06-20&linkCode=as2&creative=374929&camp=211189">one</a> or this other <a href="http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445/ref=sr_1_15?ie=UTF8&qid=1415926730&sr=8-15&keywords=micro+sd+xd">one</a>.  The following steps can only be executed on a system running <a href="https://insider.windows.com">Windows 10</a> (build 10069 or higher).</p>
    <p>Follow these instructions to configure your SD card:</p>
    <ol class="word-wrap">
        <li>NOTE: you will need to follow these instructions on a physical Windows machine (and not a VM) because you need access to the SD card reader.</li>
        <li>Please sign up with our program on <a href="https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558">Microsoft Connect</a>, which is our software release management platform. You will need to have a <a href="http://www.microsoft.com/en-us/account/default.aspx">Microsoft Account</a>. If you are already signed up with our program on Microsoft Connect, (or are not sure if you signed up earlier) and try to sign up again, don’t worry, you will just see a blank page. If you have not signed up for our program on Connect before, it will prompt you to create a social profile and accept license agreements. You can find step-by-step instructions for signing up for Microsoft Connect <a href="https://connect.microsoft.com/windowsembeddedIoT/Downloads/DownloadDetails.aspx?DownloadID=57783">here</a>.</li>
        <li><a href="https://connect.microsoft.com/windowsembeddedIoT/Downloads/DownloadDetails.aspx?DownloadID=57783">Download</a> the package "Windows 10 IoT Core Insider Preview Image for MinnowBoard MAX" from Microsoft Connect. If you see a blank page or no downloads listed, please make sure you are signed into Microsoft Connect by looking at your login information at top right part of the screen. Click sign in, if you are not signed in.</li>
        <li>Insert an SD card into your SD card reader.</li>
        <li>Open an admininistrator command prompt and navigate to the folder containing your local flash.ffu.</li>
        <li>
            Find the disk number that your SD card is on your computer.  This will be used when the image is applied in the next step.  To do this, you can use the diskpart utility.  Run the following commands:<br />
            <kbd>diskpart</kbd><br />
            <kbd>list disk</kbd><br />
            <kbd>exit</kbd>
        </li>
        <li>
            Using the admininistrator command prompt, apply the image to your SD card by running the following command (be sure to replace PhysicalDriveN with the value you found in the previous step, for example, if your SD card is disk number 3, use <kbd>/ApplyDrive:\\.\PhysicalDrive3</kbd> below):<br />
            <kbd>dism.exe /Apply-Image /ImageFile:<fullpath>flash.ffu /ApplyDrive:\\.\PhysicalDriveN /SkipPlatformCheck</fullpath></kbd>
        </li>
        <li>Click on the "Safely Remove Hardware" icon in your task tray and select your USB SD card reader to safely remove it from the system.  Failing to do this can cause corruption of the image.
        </li><br>
		<b>NOTE:</b> If you want to remove Windows 10 IoT Core from your SD card after you are done using it, see the <a href="{{site.baseurl}}/FAQs.htm" target="_blank">FAQ</a> section titled <b>How do I remove Windows 10 IoT Core from my SD card?</b>.
    </ol>
</div>

<div class="row">
    <h2>Set Required BIOS Settings and boot Windows 10 IoT Core</h2>
    <ol class="word-wrap">
        <li>Insert your newly flashed SD Card into your MBM.  At any point, if you turn on your MBM without an SD card inserted, you will be required to configure the boot order again.</li>
        <li>Hook up a physical keyboard to the USB port on MBM. For display, you can either connect an HDMI monitor or use the serial port.</li>
        <li>When you boot, press F2 to get to the BIOS settings. </li>
        <li>Navigate to Device Manager -> System Setup -> South Cluster Configuration -> LPSS & SCC Configuration </li>
        <ol>
            <li>Set "LPSS & SCC Device Mode" to "ACPI Mode" </li>
            <li>Set "DDR50 Capability Support for SDCard" to "Disable" </li>
            <li>Set "ACPI Reporting MMC/SD As" to "Non-Removable"</li>
        </ol>
        <li>Navigate back to top level and select Boot Mainenance Manager-> Boot Options > Change Boot Order </li>
        <li>Highlight the boot order list (when it is highlighted, you will see "Change the order" on the right side of the screen) and press enter </li>
        <li>Highlight "EFI Misc Device" and press '+' to move it to the top of the list </li>
        <li>Commit these changes and exit. </li>
        <li>The MBM should automatically boot to the card (this initial boot may take up to 2 minutes, subsequent boots should take less than 30 seconds). If it does not, it will boot to the UEFI shell, and you will have to execute the following in the UEFI shell to boot Windows:<br/>
            <kbd>fs1:</kbd><br/>
            <kbd>efi\boot\bootia32.efi</kbd>
        </li>
        <li>On the very first boot the Windows 10 IoT Core will do some first boot configurations and it will display a default blue colored application while this is happening. Wait for a few minutes and the board will automatically restart. This will happen only once and then DefaultApp should come up, displaying the IP address of MBM.
            <br/><br/><ul><img class="device-images" src="{{site.baseurl}}/images/DefaultAppMBM.png"></ul><br/>
        </li>
        <li>Follow the instructions <a href="{{site.baseurl}}/win10/samples/PowerShell.htm">here</a> to use PowerShell to connect to your running device.</li>
        <li>It is <b>highly recommended</b> that you update the default password for the Administrator account.  Please follow the instructions found in the <a href="{{site.baseurl}}/win10/samples/PowerShell.htm">PowerShell</a> documentation.</li>
        <li>Remote Debugger will launch automatically when your device boots. </li>
    </ol>
</div>
