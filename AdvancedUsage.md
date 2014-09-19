---
layout: default
title: Advanced Usage
permalink: /AdvancedUsage.htm
---

<div class="jumbotron">
  <div class="container">
    <h1>Advanced Usage</h1>
  </div>
</div>

<div class="container">
  <h3>Communication with Galileo</h3>
  <div class="panel-group" id="accordion0">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion0" href="#collapseNetworkShare">
            Open a network share to your Galileo
          </a>
        </h4>
      </div>
      <div id="collapseNetworkShare" class="panel-collapse collapse">
        <div class="panel-body">
          Open up a file explorer window and type the following into the address bar:<br/>
          <kbd>\\YourGalileoName\c$</kbd>
        </div>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion0" href="#collapseRemoteDebugging">
            Configure remote debugging
          </a>
        </h4>
      </div>
      <div id="collapseRemoteDebugging" class="panel-collapse collapse">
        <div class="panel-body">
          <p>
            With your project open in Visual Studio:
            <ul>
              <li>
                Right click on your project (not solution) in the Solution Explorer and select <kbd>Properties</kbd><br/>
                <img src="images/ConfigureRemoteDebugger1.png"/>
              </li>
              <li>Expand <kbd>Configuration Properties</kbd></li>
              <li>Select the <kbd>Debugging</kbd> tree item</li>
              <li>Change the <kbd>Debugger to launch</kbd> to <kbd>Remote Windows Debugger</kbd></li>
              <li>
                Configure the debug page like the following picture, paying close attention to the debug settings:<br>
                <img src="images/ConfigureRemoteDebugger.png"/>
              </li>
            </ul>
          </p>
          <div class="panel panel-info">
            <div class="panel-heading">Visual Studio Debug Settings</div>
            <div class="panel-body">
              Please change the following settings to configure remote debugging:<br/>
              Remote Command: <kbd>c:\test\$(TargetFileName)</kbd><br/>
              Working Directory: <kbd>c:\test</kbd><br/>
              Remote Server Name: <kbd>mygalileo</kbd><br/>
              Deployment Directory: <kbd>c:\test</kbd><br/>
              <br/>
              <b>NOTE:</b> If you want to change the directory that your project is deployed to and run out of you will need to change all of the places it says c:\test\ to your desired path.<br/>
              <b>NOTE:</b> If you change your Galileo's name, you will need to change the Remote Server Name to match.
            </div>
          </div>
            
          <h4>Configure remote deploying</h4>
          Before you close the Property Pages, select the <kbd>Configuration Manager...</kbd> button from the upper right corner.<br/>
          Make sure "Deploy" is checked for your project<br/>
          <img src="images/EnableDeployment.png"/><br/>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion0" href="#collapseUART">
            Allow UART port to be used by HardwareSerial
          </a>
        </h4>
      </div>
      <div id="collapseUART" class="panel-collapse collapse">
        <div class="panel-body">
            This will change it from Kernel Debugger use.
            <ol>
                <li> Shut down Galileo and remove power </li>
                <li> Remove micro-SD card and plug it in to a PC--it mounted as drive “K:” </li>
                <li> In Admin cmd window on PC: </li>
                    <ul>
                        <li> <kbd>bcdedit /store k:\efi\microsoft\boot\bcd /enum</kbd> </li>
                        <li> Verify you got bcd contents </li>
                        <li> <kbd>bcdedit /store k:\efi\microsoft\boot\bcd /set {default} debug No</kbd> </li>
                        <li> <kbd>bcdedit /store k:\efi\microsoft\boot\bcd /set {default} testsigning OFF</kbd> </li>
                        <li> <kbd>bcdedit /store k:\efi\microsoft\boot\bcd /enum</kbd> </li>
                        <li> Verify debug and testsigning are now “No” </li>
                    </ul>
                <li> Safe dismount of micro-SD from PC (eject from Windows Explorer) </li>
                <li> Put micro-SD in Galileo and powered up </li>
            </ol>
        </div>
      </div>
    </div>
  </div>
  <hr/>
  
  <h3>Customized Experience</h3>
  <div class="panel-group" id="accordion1">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion1" href="#collapseGalileoAutorun">
            Making your Galileo run an exe on boot
          </a>
        </h4>
      </div>
      <div id="collapseGalileoAutorun" class="panel-collapse collapse">
        <div class="panel-body">
          <ol>
            <li>From a file explorer window, navigate to <kbd>\\mygalileo\c$\Windows\System32\Boot</kbd></li>
            <li>If prompted enter the username as \Administrator and the password as admin</li>
            <li>Right click on <kbd>autorun.cmd</kbd> and select Edit</li>
            <li>At the end of the file add: <kbd>start YourAppLocation\YourAppName.exe</kbd></li>
          </ol>
        </div>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion1" href="#collapseGalileoName">
            Changing your Galileo's Name
          </a>
        </h4>
      </div>
      <div id="collapseGalileoName" class="panel-collapse collapse">
        <div class="panel-body">
          <p>
            Through telnet, run SetComputerName using the following line<br/>
            <kbd>SetComputerName YourNewName</kbd><br/>
          </p>
          <div class="panel panel-danger">
            <div class="panel-heading">Note:</div>
            <div class="panel-body">
              If you change your Galileo's name, it will break remote deployment and you will need to change the remote debugging/deployment settings on all projects to match.
            </div>
          </div>
        </div>
      </div>
    </div>
  <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion1" href="#collapseTaskList">
            View/Kill Active Tasks
          </a>
        </h4>
      </div>
      <div id="collapseTaskList" class="panel-collapse collapse">
        <div class="panel-body">
          <p>
            Through telnet, run 'tlist' to view currently running tasks<br/>
            <kbd>C:\>tlist</kbd><br/>
            <samp>  0 System Process<br/>
                    4 System<br/>176 smss.exe<br/>
                  256 csrss.exe<br/>
                  284 wininit.exe<br/>
                  292 csrss.exe<br/>
                  308 winlogon.exe<br/>
                  328 services.exe<br/>
                  340 lsass.exe<br/>
                  420 svchost.exe<br/>
                  752 cmd.exe<br/>
                  764 msvsmon.exe<br/>
                  772 Galileo_eboot.exe<br/>
                  780 httpsrv.exe<br/>
                  788 ftpd.exe<br/>
                  796 telnetd.exe<br/>
                  804 mwstartnet.exe<br/>
                  860 msvsmon.exe<br/>
                 1284 TemperatureSensor.exe<br/>
                 1472 cmd.exe<br/>
                  112 tlist.exe
            </samp><br/>
          </p>
          <p>
            Through telnet, run 'kill PID' or 'kill Name' to kill a currently running task<br/>
            <kbd>C:\>kill 1284</kbd><br/>
            <samp>process TemperatureSensor.exe (1284) - '' killed</samp><br/>
            <kbd>C:\>kill TemperatureSensor.exe</kbd><br/>
            <samp>process TemperatureSensor.exe (1284) - '' killed</samp><br/>
          </p>
          <div class="panel panel-danger">
            <div class="panel-heading">Note:</div>
            <div class="panel-body">
              Using 'kill Name' on will close all tasks with that name.
            </div>
          </div>
        </div>
      </div>
    </div>
	
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion1" href="#collapseAddDriver"> Add a driver to Windows</a> </h4>
      </div>
      <div id="collapseAddDriver" class="panel-collapse collapse">
        <div class="panel-body">
          <p> <strong>1.</strong> Copy your windows image (.wim file) to "C:\Temporary\images"<br/><br/>
              <strong>2.</strong> Copy the drivers you wish to add to "C:\Temporary\drivers"<br/><br/>
              <strong>3.</strong> Create an empty folder named "offline" to "C:\Temporary\" so the final path would be "C:\Temporary\offline"<br/><br/>
              <strong>4.</strong> Run a Command Line (cmd.exe) as Administrator.<br/><br/>
              <strong>4a.</strong><i> Get Informations about the image file.</i><br/>
            <kbd>Dism /Get-WimInfo /WimFile:C:\Temporary\images\9600.16384.x86fre.winblue_rtm_iotbuild.140731-1000_galileo_v1.wim</kbd><br/>
            <samp>Deployment Image Servicing and Management tool<br/>
                  Version: 6.3.9600.17031<br/>
                  Details for image : C:\Temporary\images\9600.16384.x86fre.winblue_rtm_iotbuild.140731-1000_galileo_v1.wim<br/>
                  Index : 1<br/>
                  Name : MODERNCORE_INSTALL<br/>
                  Description : <undefined><br/>
                  Size : 800,100,664 bytes<br/>
                  Index : 2<br/>
                  Name : MODERNCORE_BOOT<br/>
                  Description : <undefined><br/>
                  Size : 763,402,132 bytes<br/>
                  The operation completed successfully.<br/>
            </samp><br/>
              <strong>4b.</strong><i> Mount the offline Windows image file.</i><br/>
            <kbd>Dism /Mount-Wim /WimFile:C:\Temporary\images\9600.16384.x86fre.winblue_rtm_iotbuild.140731-1000_galileo_v1.wim /Name:"MODERNCORE_INSTALL" /MountDir:C:\Temporary\offline</kbd><br/>
            <samp>Deployment Image Servicing and Management tool<br/>
                  Version: 6.3.9600.17031<br/>
                  Mounting image<br/>
                  [==========================100.0%==========================]<br/>
                  The operation completed successfully.<br/>
             </samp><br/>
              <strong>4c.</strong><i> Add the specific driver to the offline image.</i><br/>
            <kbd>Dism /Image:C:\Temporary\offline /Add-Driver /Driver:C:\Temporary\drivers\'your_driver_name.inf'</kbd><br/>
            <samp>Deployment Image Servicing and Management tool<br/>
                  Version: 6.3.9600.17031<br/>
                  Image Version: 6.3.9600.16384<br/>
                  Found 1 driver package(s) to install.<br/>
                  Installing 1 of 1 - C:\Temporary\drivers\'your_driver_name.inf': The driver package was successfully installed.<br/>
                  The operation completed successfully.<br/>
             </samp>
          </p>
          <div class="panel panel-danger">
            <div class="panel-heading">Note:</div>
            <div class="panel-body"> For adding multiple drivers use /Recurse option.<br/>
            <kbd>Dism /Image:C:\Temporary\offline /Add-Driver /Driver:C:\Temporary\drivers\ /Recurse</kbd><br/>
            </div>
          </div><br/>
          <p>
              <strong>4d.</strong><i> Commit the changes to the image.</i><br/>
            <kbd>Dism /Unmount-Wim /MountDir:C:\Temporary\offline /Commit</kbd><br/>
            <samp>Image Index : 1<br/>
                  Saving image<br/>
                  [==========================100.0%==========================]<br/>
                  Unmounting image<br/>
                  [==========================100.0%==========================]<br/>
                  The operation completed successfully.<br/>
             </samp><br/>
              <strong>6.</strong> Now you can apply Microsoft Windows to an microSD card as described here: <a href="https://ms-iot.github.io/content/IBoughtAGalileo.htm" target="_blank">Bought or updating your Intel Galileo?</a><br/>
              <strong>7.</strong> To see if your driver works through telnet use 'devcon' command. For devcon command help look <a href="http://msdn.microsoft.com/en-us/library/windows/hardware/ff544746(v=vs.85).aspx" target="_blank">here.</a><br/>
          </p>
        </div>
      </div>
    </div>
	
  </div>
  <hr/>

  <h3>Network Connectivity</h3>
  <div class="panel-group" id="accordion2">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion2" href="#collapseWifiToEthernetAdapter">
            Setup a Wi-Fi to Ethernet adapter
          </a>
        </h4>
      </div>
      <div id="collapseWifiToEthernetAdapter" class="panel-collapse collapse">
        <div class="panel-body">
          <p>An often overlooked option for wirelessly connecting your Galileo to the internet is to use a <a href="http://www.newegg.com/Product/ProductList.aspx?Submit=ENE&DEPA=0&Order=BESTMATCH&Description=wireless+to+ethernet+adapter&N=-1&isNodeId=1" target="_blank">Wi-Fi to Ethernet adapter</a>.</p>
          <img src="images/galileo-wifi-bridge.png"><br/>
          <i>Netgear WNCE2001 pictured</i>
        </div>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion2" href="#collapseBridgeNetworkConnection">
            Bridge your PC's network connection to the Galileo
          </a>
        </h4>
      </div>
      <div id="collapseBridgeNetworkConnection" class="panel-collapse collapse">
        <div class="panel-body">
          <p>You can provide internet connectivity (wireless or other) by sharing, or "bridging", your PC's network connection.</p>
          <p>When you connect your Galileo to your PC directly (as outlined <a href="./SetupGalileo.htm" target="_blank">here</a>), then you can share the network connection the PC is using to connect to the internet with the Galileo by following these steps:</p>
          <ul>
            <li>Open the "<b>Network and Sharing Center</b>" from the Start Screen.</li>
            <img src="images/Start_NetworkandSharingCenter.png"><br/><br/>
            <li>Select "<b>Change adapter settings</b>" from the left hand column.</li>
            <img src="images/NetworkandSharingCenter.png"><br/><br/>
            <li>In the network connection settings select "<b>Layout->Menu bar</b>" from the "<b>Organize</b>" drop down menu.</li>
            <img src="images/NetworkConnections.png"><br/><br/>
            <li>Select your "Ethernet" connection (to the Galileo) and your other connection (to the internet) [<i>"Wi-Fi" pictured</i>].</li>
            <img src="images/NetworkBridgeConnections.png"><br/><br/>
            <li>Wait for connection to be created...</li>
            <img src="images/Status_BridgeWait.png"><br/><br/>
            <li>Once the bridge has been created and new connection will appear, labelled "Network Bridge".</li>
            <img src="images/NetworkBridge.png"><br/><br/>
          </ul>
          <p>Now that your network bridge has been setup, your Galileo should be able to access the internet via your PC's internet connection.</p>
          <p>Use <kbd>ping bing.com</kbd> from a telnet session to your Galileo to confirm.</p>
        </div>
      </div>
    </div>
  </div>
  <hr/>

  <a class="btn btn-default" href="index.htm" role="button">Return to homepage</a>
</div>
