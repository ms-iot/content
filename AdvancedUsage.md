---
layout: code
title: Advanced Usage
permalink: /AdvancedUsage.htm
---

<div class="jumbotron">
  <div class="container">
    <h1>Advanced Usage</h1>
  </div>
</div>

<div class="panel-group" id="accordion0">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion0" href="#collapseNetworkShare">
            <h2>Open a network share to your Galileo</h2>
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
</div>

---

<div class="panel-group" id="accordion1">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion1" href="#collapseGalileoAutorun">
            <h2>Making your Galileo run an exe on boot</h2>
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
</div>

---

<div class="panel-group" id="accordion2">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion2" href="#collapseGalileoName">
            <h2>Changing your Galileo's Name</h2>
          </a>
        </h4>
      </div>
      <div id="collapseGalileoName" class="panel-collapse collapse">
        <div class="panel-body">
            Through telnet, run SetComputerName using the following line<br/>
            <kbd>SetComputerName YourNewName</kbd> <br/>
            
            <div class="panel panel-danger">
                <div class="panel-heading">Note:</div>
                <div class="panel-body">If you change your Galileo's name, it will break remote deployment and you will need to change the remote debugging/deployment settings on all projects to match.</div>
            </div>
        </div>
    </div>
  </div>
</div>

---

<div class="panel-group" id="accordion3">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion3" href="#collapseRemoteDebugging">
            <h2>Configure remote debugging</h2>
          </a>
        </h4>
      </div>
      <div id="collapseRemoteDebugging" class="panel-collapse collapse">
        <div class="panel-body">
            <p>With your project open in Visual Studio:
                <ul>
                    <li>Right click on your project (not solution) in the Solution Explorer and select <kbd>Properties</kbd></li>
                        <img src="images/ConfigureRemoteDebugger1.png"/>
                    <li>expand <kbd>Configuration Properties</kbd></li>
                    <li>select the <kbd>Debugging</kbd> tree item</li>
                    <li>Change the <kbd>Debugger to launch</kbd> to <kbd>Remote Windows Debugger</kbd></li>
                    <li>Configure the debug page like the following picture, paying close attention to the debug settings:<br>
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
                Remote Server Nane: <kbd>mygalileo</kbd><br/>
                Deployment Directory: <kbd>c:\test</kbd><br/>
                <br/>
                Note: If you want to change the directory that your project is deployed to and run out of you will need to change all of the places it says c:\test\ to your desired path.<br/>
                Note: If you change your Galileo's name, you will need to change the Remote Server Name to match.
                </div>
            </div>
            
            <h3>Configure remote deploying</h3>
            Before you close the Property Pages, select the <kbd>Configuration Manager...</kbd> button from the upper right corner.<br/>
            Make sure "Deploy" is checked for your project<br/>
            <img src="images/EnableDeployment.png"/><br/>
        </div>
    </div>
  </div>
</div>
  
  
