<h3> What you need </h3>
<ul>
  <li>A PC running Windows 10 - as prepared in the previous step.</li>
  <li>MinnowBoard MAX</li>
  <li>Power supply with at least 1.0A current.  If you plan on using several power-hungry USB peripherals, use a higher current power supply instead (>2.0A).</li>
  <li>8GB Micro SD card - class 10 or better. We suggest this <a href="http://www.amazon.com/gp/product/B00IVPU786" target="_blank">one</a> or this <a href="http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445" target="_blank">one</a>.</li>
  <li>HDMI cable and monitor</li>
  <li>Ethernet Cable</li>
  <li>USB keyboard</li>
  <li>Micro SD card reader - due to an issue with most internal micro SD card readers, we suggest an external USB micro SD card reader like this <a href="http://www.amazon.com/Transcend-Information-Card-Reader-TS-RDF5K/dp/B009D79VH4" target="_blank">one</a> or this <a href="http://www.amazon.com/Kingston-Digital-MobileLite-Multi-Function-FCR-MLG4/dp/B00KX4TORI" target="_blank"> one</a></li>
 </ul>
<h3> Hook Up Your Board</h3>
<ol class="setup-content-list">
  <li><b>Connect a USB keyboard</b> to one of the USB ports on the board.</li>
  <li><b>Connect an HDMI monitor</b> to the microHDMI port on the board.</li>
  <li>
    <b>Connect a network cable</b> to the Ethernet port on the board. Make sure your development PC is on the same network.
    <ul>
      <li><b>NOTE:</b> If you don't have a local wired network, see <a href="{{site.baseurl}}/{{page.lang}}/win10/ConnectToDevice.htm" target="_blank">here</a> for additional connection options.</li>
    </ul>
  </li>
  <p><img alt="minnowboard max connections" src="{{site.baseurl}}/Resources/images/mbm.bmp" class="device-images"/></p>
</ol>

<h3>Update Your Device Firmware</h3>
<ol class="setup-content-list">
  <li>Download the latest 32-Bit Release pre-built BIOS firmware from <a href="http://firmware.intel.com/projects/minnowboard-max" target="_blank"> firmware.intel.com/projects/minnowboard-max </a> <br>For the current release, only 32 bit is supported, however if you have a new board or are currently running the 64-bit firmware you will need to download <u>both</u> the 64 and the 32 bit versions and use the 64 bit instructions below. </li>
  <li>
    Unzip the downloaded file and copy the following files to a FAT formatted USB stick
    <ul>
      <li>*.efi</li>
      <li>*.bin</li>
    </ul>
  </li>
  <li>Power off your MinnowBoard</li>
  <li>Remove any SD cards and external hard drives</li>
  <li>Plug in the USB stick to the MinnowBoard</li>
  <li>Power on your MinnowBoard</li>
  <li>
    You should see the UEFI prompt. Run the following commands at the UEFI prompt:
  </li>
  <li>
    <p>If your current firmware is 64 bit (this is how the MinnowBoard ships)</p>
      <kbd>fs0:</kbd>
      <kbd>.\MinnowBoard.MAX.FirmwareUpdateX64.efi _filename_.bin</kbd>
    <p> If your current firmware is 32 bit (if you have already modified the original firmware to be 32 bit) </p>
      <kbd>fs0:</kbd>
      <kbd>.\MinnowBoard.MAX.FirmwareUpdateIA32.efi _filename_.bin</kbd>
    <p> e.g. </p>
      <kbd>Shell> fs0:</kbd>
      <kbd>fs0:\> .\MinnowBoard.MAX.FirmwareUpdateIA32.efi MinnowBoard.MAX.I32.079.R01.bin</kbd>
  </li>
  <li>
    The system should shut down automatically after the firmware update is complete.
    <ul>
      <li> NOTE: If you are not able to go to the fs0: partition, try a different flash drive. Certain flash drives won't be bootable even after you copy efi/bin files.</li>
    </ul>
  </li>
</ol>
<p> You might wonder why you need to invoke 'MinnowBoard.MAX.FirmwareUpdateX64.efi' even if we're only supporting a 32 bit version of Windows 10 IoT Core.
    The board usually comes with 64-bit firmware pre-installed on it.  The bitness of the EFI has to match the bitness of the current firmware.  Additionally, the bitness of the bin file has to match the desired bitness of the firmware after updating.
    So the first time you will likely need to use 64-bit EFI and 32-bit BIN.
    The second time and every other time you need to use 32-bit EFI and 32-bit BIN.
    The reason the bitness of the firmware has to match the bitness of the OS is that there is an EFI in the OS image that gets loaded to bootstrap the OS, and that EFI has to be the same bitness as the firmware as well.</p>
    
<h3> Install the Windows 10 IoT Core tools </h3>
<ol class="setup-content-list">
  <li>
    <p>Download a Windows 10 IoT Core image from our <a href="{{site.baseurl}}/{{page.lang}}/Downloads.htm" target="_blank">downloads page</a>. Save the ISO to a local folder.</p>
    <p><img alt="screenshot: iso for windows 10 iot core for minnowboard max" class="image-border" src="{{site.baseurl}}/Resources/images/mbm_iso.png" /></p>
  </li>
  <li>
    <p>Double clicking on the ISO (IoT Core MBM.iso) will automatically mount it as a virtual CD drive so you can access the contents.</p>
    <p><img alt="screenshot: msi for windows 10 iot core for minnowboard max" class="image-border" src="{{site.baseurl}}/Resources/images/mbm_msi.PNG" /></p>
  </li>
  <li>
    <p>Install <b>Windows_10_IoT_Core_Mbm.msi</b>. When installation is complete, flash.ffu will be located at <b>C:\Program Files (x86)\Microsoft IoT\FFU\MinnowBoardMax</b>.</p>
    <p><img alt="screenshot: ffu for windows 10 iot core for minnowboard max" class="image-border" src="{{site.baseurl}}/Resources/images/mbmffu.PNG"/></p>
  </li>
  <li>Eject the Virtual CD when installation is complete - this can be done by navigating to the top folder of File Explorer, right clicking on the virtual drive, and selecting "Eject".</li>
</ol>

<h3> Put the Windows 10 IoT Core image on your SD card </h3>
<ol class="setup-content-list">
  <li>Insert a Micro SD Card into your SD card reader.</li>
  <li>
    <p>Use IoTCoreImageHelper.exe to flash the SD card. Search for "WindowsIoT" from start menu and select the shortcut "WindowsIoTImageHelper".</p>
    <p><img alt="screenshot: search for IoTCoreImageHeloper.exe to flash the sd card" src="{{site.baseurl}}/Resources/images/ImagerHelperSearch.PNG"/></p>
  </li>
  <li>
    <p>The tool will enumerate devices as shown. Select the SD card you want to flash, and then provide the location of the ffu to flash the image.</p>
    <p><b>NOTE:</b> IoTCoreImageHelper.exe is the recommended tool to flash the SD card. However, instructions are available for using <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/DISM.htm" target="_blank">DISM command line tool</a> directly.</p>
    <p><img alt="IoTCoreImageHeloper.exe to flash the sd card" src="{{site.baseurl}}/Resources/images/mbm_imagehelper.PNG"/></p>
  </li>
  <li>
    <p>Safely remove your USB SD card reader by clicking on "Safely Remove Hardware" in your task tray, or by finding the USB device in File Explorer, right clicking, and choosing "Eject".  Failing to do this can cause corruption of the image.</p>
    <p><b>NOTE:</b> If you want to remove Windows 10 IoT Core from your SD card after you are done using it, see the <a href="{{site.baseurl}}/{{page.lang}}/Faqs.htm" target="_blank"> FAQ </a> section titled "How do I remove Windows 10 IoT Core from my SD card?".</p>
  </li>
</ol>

<h3>Set Required BIOS Settings and boot Windows 10 Iot Core</h3>
<ol class="setup-content-list">
  <li>Insert your micro SD Card into your MBM.  At any point, if you turn on your MBM without an SD card inserted, you will be required to configure the boot order again.</li>
  <li>When you boot, press F2 to get to the BIOS settings.</li>
  <li>
    Navigate to Device Manager -> System Setup -> South Cluster Configuration -> LPSS & SCC Configuration
    <ul>
      <li>Set "LPSS PWM #1 Support" to Disable</li>
      <li>Set "LPSS PWM #2 Support" to Disable</li>
    </ul>
  </li>
  <li>Navigate back to top level and select Boot Maintenance Manager-> Boot Options > Change Boot Order</li>
  <li>Highlight the boot order list (when it is highlighted, you will see "Change the order" on the right side of the screen) and press enter</li>
  <li>Highlight "EFI Misc Device" and press '+' to move it to the top of the list. If it does not move by '+', simply select "EFI Misc Device" and press enter to boot to it.</li>
  <li>Commit these changes and exit.</li>
  <li>The MBM should automatically boot to the card (this initial boot may take up to 2 minutes, subsequent boots should take less than 30 seconds). If it does not, it will boot to the UEFI shell, and you will have to execute the following in the UEFI shell to boot Windows:
    <kbd>fs1:</kbd><br/>
    <kbd>efi\boot\bootia32.efi</kbd>
  </li>
  <li>
    <p>Once the device has booted, the DefaultApp will launch and display the IP address of MBM.</p>
    <p><img alt="screenshot: defaultapp at boot up for minnowboard max" src="{{site.baseurl}}/Resources/images/DefaultAppMBM.png"/></p>
  </li>
</ol>

<p>If you have loaded a previous version of IoT Core on your MBM you will need to go through the following steps for your first boot (make sure you have your SD card with IoT Core inserted):</p>
<ol class="setup-content-list">
  <li>Power on MBM device and press F2.</li>
  <li>Go to Boot Manager and select EFI Internal shell.</li>
  <li>Identify EFIESP partition (it might be FS1: hence assuming EFIESP partition as FS1: below)</li>
  <li>Type FS1:</li>
  <li>Cd EFI</li>
  <li>Run  DeleteSbcpVariableFW.efi (This will clear UEFI variables)</li>
  <li>Now boot up the device.</li>
</ol>

<h3>Connecting to Your Device</h3>
<ol class="setup-content-list">
  <li>
    <p>You can use <a href="{{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm" target="_blank">Windows Device Portal</a> to connect to your device through your favorite web browser. The device portal provides configuration and device management capabilities, in addition to advanced diagnostic tools to help you troubleshoot and view the real time performance of your Windows IoT Device. <a href="{{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm" target="_blank">Click here to learn how to connect to Windows Device Portal!</a></p>
    <p><img alt="screenshot: device portal to connect to minnowboard max" class="device-images" src="{{site.baseurl}}/Resources/images/deviceportal/deviceportal_small_mbm.png" /></p>
  </li>
  <li>
    <p>You can also use PowerShell to connect to your device through a command shell. Follow the <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm" target="_blank">PowerShell documentation</a> to use PowerShell to connect to your running device.  You can also follow the <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm" target="_blank">SSH instructions</a> to use SSH to connect to your device.</p>
    <p><img alt="screenshot: use powershell to connect to your minnowboard max" class="device-images" src="{{site.baseurl}}/Resources/images/powershell/connection.png"/></p>
  </li>
</ol>

<p>It is highly recommended that you update the default password for the Administrator account. Instructions are included in the relevant documentation for <a href="{{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm" target="_blank">Windows Device Portal</a> or <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm" target="_blank">Powershell</a>.</p>

<h3> Additional Resources </h3>
<p><a href="{{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm" target="_blank">Supported Peripheral Interfaces and Devices</a></p>

