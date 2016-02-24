Download and Flash
<div class="row">
  <div class="col-md-12 col-xs-24 col-no-padding">
    <p>To set up Windows 10 IoT Core, you need to use the Windows 10 IoT Core Dashboard.</p>
    <ol class="inline-list">
      <li><b>Launch Windows 10 IoT Core Dashboard</b>. You can install Windows 10 IoT Core Dashboard here. You must have Windows 10 or better</li>
      <li><b>Click “Set up a new device”</b>. You can install Windows 10 IoT Core Dashboard here. You must have Windows 10 or better</li>
      <li><b>Select “Raspberry Pi 3” from the dropdown</b>. Each board has its own specialized image that differs per board.</li>
      <li><b>Make sure your SD card is compliant</b>. We require that the SD card be at least 2 GB in size. Slower and older cards have a tendency to be inconsistent when flashing and may fail to work. For a list of recommended cards</li> 
      <li><b>Download and install</b>. A window will pop up to show you the progress of the flashing. This can take several minutes depending on the speed of your card.</li> 
      <li><b>Plug the SD card into your board and power on</b>. You have the option to plug in a display, but it is not necessary. For best results, plug it in before you power on the device. First boot will take several minutes as the Operating System does its initial installation.
    </ol>
  </div>
  <div class="col-md-12 col-sm-24">
    <img src="{{site.baseurl}}/images/get-started/dashboard-1.png" />
  </div>
</div>

Connect the board to the network
<div class="row">
  <div class="col-md-12 col-xs-24 col-no-padding">
    <p>There are currently two ways to get connected depending on what kind of equipment you have; WiFi and ethernet. <b>Connecting via Ethernet is recommended</b> because of it’s reliability.</p>
    <p>Connect via ethernet</p>
    <ol class="inline-list">
      <li><b>Connect an Ethernet cable from your network into your board.</b> The board will automatically connect to your network.</li>
      <li><b>Go to "My Devices".</b> From my devices, you can discover your device and configure it (including connecting to Wi-Fi).</li>
    </ol>
    
    <p>Connect via Wi-Fi</p>
    <ol class="inline-list">
      <li><b>Go to "My devices".</b> my devices, you can dsicover your device and configure it (including connecting to Wi-Fi).</li>  
      <li><b>Find your board and click “Configure Device”.</b> If your board has a WiFi adapater and it has not yet be set up, it will start to broadcast itself as a network (shown in the figure to the right). Unconfigured boards will begin with "AJ_" (e.g. AJ_58EA6C68).
      If you don’t see your board, make sure that you’ve allowed enough time for your board to boot. If all else fails, reboot your device.
      <li><b>Enter your network credentials.</b> Your computer will now connect to your board.</li> 
    </ol>
  </div>
  <div class="col-md-12 col-sm-24">
    <img src="{{site.baseurl}}/images/get-started/dashboard-2.png" />
  </div>
</div>

Configure your board
<div class="row">
  <div class="col-md-12 col-xs-24 col-no-padding">
    <p>Once you have successfully connected your board to the network, you can return to the “My devices” tab to configure the name and password.</p>
    <ol class="inline-list">
      <li><b>Find your device in the list, and click the edit symbol (pencil symbol)</b>. This will take you to settings page. From the settings page you can launch Windows Device Portal, and set basic settings. </li>
      <li><b>Set your name and change your password (highly recommended)</b>. All devices start with a default password. The <b>default password is “p@ssw0rd”</b>. We highly suggest you change it.</li> 
    </ol>
  </div>
  <div class="col-md-12 col-sm-24">
    <img src="{{site.baseurl}}/images/get-started/dashboard-3.png" />
  </div>
</div>

Quick-Run samples
<div class="row">
  <div class="col-md-12 col-xs-24 col-no-padding">
    <p>Quick-Run samples are pre-built and require no compiling or coding to get going. This is a great way to make sure everything is working and easily play with your board.</p>
    <ol class="inline-list">
      <li><b>Navigate to “Quick-run samples”</b> in the left nav bar.</li>
      <li><b>Select a sample.</b></li> 
      <li><b>Select your board from the drop down list and launch the sample.</b>  In the background, the dashboard will temporarily install the quick-run sample onto you device. Once loaded, the device will broadcast a webpage over the network and IoT Dashboard will automatically connect to it. This lets you control the app without having to plug in a monitor directly to your device.</li>
    </ol>
  </div>
  <div class="col-md-12 col-sm-24">
    <img src="{{site.baseurl}}/images/get-started/dashboard-4.png" />
  </div>
</div>