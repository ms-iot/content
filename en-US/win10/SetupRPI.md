<h3> What you need </h3>
<ul>
  <li>A PC running Windows 10 - as prepared in the previous step.</li>
  <li>Raspberry Pi 2 or 3</li>
  <li>5v Micro USB power supply with at least 1.0A current.  If you plan on using several power-hungry USB peripherals, use a higher current power supply instead (>2.0A).</li>
  <li>8GB Micro SD card - class 10 or better. We suggest this <a href="http://www.amazon.com/gp/product/B00IVPU786" target="_blank">one</a> or this <a href="http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445" target="_blank">one</a>.</li>
  <li>HDMI cable and monitor</li>
  <li>Ethernet Cable</li>
  <li>USB Keyboard</li>
  <li>Micro SD card reader - due to an issue with most internal micro SD card readers, we suggest an external USB micro SD card reader like this <a href="http://www.amazon.com/Transcend-Information-Card-Reader-TS-RDF5K/dp/B009D79VH4" target="_blank">one</a> or this <a href="http://www.amazon.com/Kingston-Digital-MobileLite-Multi-Function-FCR-MLG4/dp/B00KX4TORI" target="_blank"> one</a></li>
</ul>
<h3> Install the Windows 10 IoT Core tools </h3>
<ol class="setup-content-list">
  <li>
    <p>Download a Windows 10 IoT Core image from our <a href="http://ms-iot.github.io/content/en-US/Downloads.htm" target="_blank">downloads page</a>. Save the ISO to a local folder.</p>
    <p><img alt="screenshot: windows 10 iot core iso" class="image-border" src="{{site.baseurl}}/Resources/images/SetupRPI/Iso.PNG" /></p>
  </li>
  <li>
    <p>Double click on the ISO (Iot Core RPi.iso). It will automatically mount itself as a virtual drive so you can access the contents.</p>
    <p><img alt="screenshot: windows 10 iot core msi" class="image-border" src="{{site.baseurl}}/Resources/images/SetupRPI/MSI.PNG" /></p>
  </li>
  <li>
    <p>Install Windows_10_IoT_Core_RPi2.msi. When installation is complete, flash.ffu will be located at C:\Program Files (x86)\Microsoft IoT\FFU\RaspberryPi2.</p>
    <p><img alt="screenshot: windows 10 iot core ffu" class="image-border" src="{{site.baseurl}}/Resources/images/SetupRPI/rpiffu.PNG" /></p>
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
    <p><img alt="screenshot: IoTCoreImageHeloper.exe to flash the sd card" src="{{site.baseurl}}/Resources/images/SetupRPI/ImageHelper.PNG" /></p>
  </li>
  <li>
    <p>Safely remove your USB SD card reader by clicking on "Safely Remove Hardware" in your task tray, or by finding the USB device in File Explorer, right clicking, and choosing "Eject".  Failing to do this can cause corruption of the image.</p>
    <p><b>NOTE:</b> If you want to remove Windows 10 IoT Core from your SD card after you are done using it, see the <a href="{{site.baseurl}}/{{page.lang}}/Faqs.htm" target="_blank"> FAQ </a> section titled "How do I remove Windows 10 IoT Core from my SD card?".</p>
  </li>
</ol>

<h3> Hook up your board </h3>
<ol class="setup-content-list">
  <li>Insert the micro SD card you prepared into your Raspberry Pi 2 or 3 (the slot is indicated by arrow #1 in the image below).</li>
  <li>
    <p>Connect a network cable from your local network to the Ethernet port on the board. Make sure your development PC is on the same network.</p>
    <p><b>NOTE:</b> If you don't have a local wired network, see <a href="{{site.baseurl}}/{{page.lang}}/win10/ConnectToDevice.htm" target="_blank">here</a> for additional connection options.</p>
  </li>
  <li> Connect an HDMI monitor to the HDMI port on the board.</li>
  <li>Connect the power supply to the micro USB port on the board.</li>
  <p><img alt="raspberry pi 2 connections" class="device-images" src="{{site.baseurl}}/Resources/images/rpi2.png"/></p>
</ol>

<h3>Boot Windows 10 IoT Core</h3>
<ol class="setup-content-list">
  <li>Windows 10 IoT Core will boot automatically after connecting the power supply. This process will take a few minutes.  After seeing the Windows logo, your screen may go black for about a minute - don't worry, this is normal for boot up.  You may also see a screen prompting you to choose a language for your Windows 10 IoT Core device - either connect a mouse and choose your option, or wait about a 1-2 minutes for the screen to disappear.</li>
  <li>
    <p>Once the device has booted, the DefaultApp will launch and display the IP address of your RPi2 or RPi3.</p>
    <p><img alt="screenshot: defaultapp at boot up for raspberry pi 2 or 3" class="device-images" src="{{site.baseurl}}/Resources/images/DefaultAppRpi2.png"/></p>
  </li>
</ol>

<h3>Connecting to Your Device</h3>
<ol class="setup-content-list">
  <li>
    <p>You can use <a href="{{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm" target="_blank">Windows Device Portal</a> to connect to your device through your favorite web browser. The device portal provides configuration and device management capabilities, in addition to advanced diagnostic tools to help you troubleshoot and view the real time performance of your Windows IoT Device. <a href="{{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm" target="_blank">Click here to learn how to connect to Windows Device Portal!</a></p>
    <p><img alt="screenshot: device portal to connect to raspberry pi 2 or 3" class="device-images" src="{{site.baseurl}}/Resources/images/deviceportal/deviceportal_small_rpi2.png"/></p>
  </li>
  <li>
    <p>You can also use PowerShell to connect to your device through a command shell. Follow the <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm" target="_blank">PowerShell documentation</a> to use PowerShell to connect to your running device.  You can also follow the <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm" target="_blank">SSH instructions</a> to use SSH to connect to your device.</p>
    <p><img alt="screenshot: use powershell to connect to your raspberry pi 2 or 3" class="device-images" src="{{site.baseurl}}/Resources/images/powershell/connection.png"/></p>
  </li>
</ol>

<p>It is highly recommended that you update the default password for the Administrator account. Instructions are included in the relevant documentation for <a href="{{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm" target="_blank">Windows Device Portal</a> or <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm" target="_blank">Powershell</a>.</p>

<h3> Additional Resources </h3>
<p><a href="{{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm" target="_blank">Supported Peripheral Interfaces and Devices</a></p>
