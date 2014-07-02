---
layout: code
title: Tips and Tricks
permalink: /Tips.htm
---

<div class="jumbotron">
  <div class="container">
    <h1>Tips and Tricks</h1>
  </div>
</div>


## Making your Galileo run an exe on boot
Edit the autorun.cmd file in Windows\System32\Boot and add the following line<br/>
<kbd>start "YourAppLocation\YourAppName"</kbd>

---

## Changing your Galileo's Name
Through telnet, run SetComputerName using the following line<br/>
<kbd>SetComputerName {YourNewName}</kbd> <br/>

<div class="panel panel-danger">
    <div class="panel-heading">Note:</div>
    <div class="panel-body">If you change your Galileo's name, it will break the remote deployment scripts and you will need to change the settings in your projects.</div>
</div>

---

<div class="panel-group" id="accordion1">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion1" href="#collapseRemoteDebugging">
            <h2>Configure remote debugging</h2>
          </a>
        </h4>
      </div>
      <div id="collapseRemoteDebugging" class="panel-collapse collapse">
        <div class="panel-body">
            <p>Inside Visual Studio:
                <ul>
                    <li>select the <kbd>Project</kbd> menu</li>
                    <li>select <kbd><i>Your App's Name</i> Properties</kbd></li>
                    <li>select the <kbd>Debugging</kbd> tree item</li>
                    <li>Change the <kbd>Debugger to launch</kbd> to <kbd>Remote Windows Debugger</kbd></li>
                    <li>Configure the debug page like the following picture, paying close attention to the debug settings:<br>
                        <img src="images\ConfigureRemoteDebugger.png"/>
                    </li>
                </ul>
            </p>
            <div class="panel panel-info">
                <div class="panel-heading">Visual Studio Debug Settings</div>
                <div class="panel-body">
                Please change the following settings to configure remote debugging:<br/>
                Remote Command: <kbd>c:\test\$(TargetFileName)</kbd><br/>
                Working Directory: <kbd>c:\test</kbd><br/>
                Remote Server Nane: <kbd>mygalileo</kbd><br/>
                Deployment Directory: <kbd>c:\test</kbd><br/>
                <br/>
                Note: If you want to change the directory that your project is deployed to and run out of you will need to change all of the places it says c:\test\ to your path.<br/>
                Note: If you change your Galileo's name, you will need to change the Remote Server Name to match.
                </div>
            </div>
            
            <div class="panel panel-danger">
                <div class="panel-heading">Laptop Users please note:</div>
                <div class="panel-body">If you are connecting Galileo to your laptop either directly or via a USB Ethernet adapter, please disable Wireless. Visual Studio may not find your computer by name if you leave wireless on. </div>
            </div>
            
            <h3>Configure remote deploying</h3>
            Before you close the Property Pages, select the <kbd>Configuration Manager...</kbd> button from the upper right corner.<br/>
            Make sure "Deploy" is checked for your project<br/>
            <img src="images\EnableDeployment.png"/><br/>
        </div>
      </div>
    </div>
  </div>
  
  