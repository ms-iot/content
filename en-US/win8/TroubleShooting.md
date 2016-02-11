---
layout: default
title: Troubleshooting
permalink: /en-US/win8/TroubleShooting.htm
lang: en-US
---

<div class="row">
  <div class="col-xs-24">
    <header class="page-title-header">
      <h1 class="page-title">Troubleshooting</h1>
    </header>
  </div>
</div>

<div class="row">
  <div class="col-xs-24">
    <h3>Hardware</h3>
    <div class="panel-group" id="accordion1">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion1" href="#collapsePower">
              The board isn't powering on.
            </a>
          </h4>
        </div>
        <div id="collapsePower" class="panel-collapse collapse">
          <div class="panel-body">
            Check the Galileo Power.
            <ul>
              <li>Is the barrel plugged into the board?</li>
              <li>Is the outlet plugged in and have power?</li>
              <li>Does the board have lights on?</li>
            </ul>
            If the power is connected, and the board plugged in, then you may have a bad adapter or board. Try another power supply or board.
          </div>
        </div>
      </div>
    </div>
    <hr />

    <h3>Visual Studio</h3>
    <div class="panel-group" id="accordion3">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion3" href="#collapseWontConnect">
              Visual Studio won't connect to a Galileo
            </a>
          </h4>
        </div>
        <div id="collapseWontConnect" class="panel-collapse collapse">
          <div class="panel-body">
            There are a number of reasons why Visual Studio won't connect to the Galileo:
            <ul>
              <li>The Galileo isn't powered on.</li>
              <li>
                <p>The Galileo isn't connected on the same subnet as the desktop computer.</p>
                <p>This is often caused by a laptop on wireless attempting to communitcate with a wired galileo. The best solution is to have the Galileo's ethernet connected to the desktop via a dedicated ehternet port or USB ethernet adapter.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion3_1" href="#collapseNoNuGet">
              fatal error C1083: Cannot open include file: 'arduino.h': No such file or directory
            </a>
          </h4>
        </div>
        <div id="collapseNoNuGet" class="panel-collapse collapse">
          <div class="panel-body">
            <p>When you have received this message after creating a new project and trying to build and compile, then you may be missing the Galileo C++ SDK NuGet package. Also, Intellisense will be underlining all code relating the Arduino SDK (pictured below).</p>
            <img src="{{site.baseurl}}/Resources/images/vs_missing_nuget_build_errors.png"><br /><br />
            <p>
              To recover, go to the <b><i>TOOLS-&gt;NuGet Package Manager-&gt;Manage NuGet Packages for Solution...</i></b> menu.<br />
              <ul>
                <li>
                  Confirm the NuGet Package is not already installed...
                  <img src="{{site.baseurl}}/Resources/images/nuget_not_installed.png">
                </li>
                <br />
                <li>
                  Search for the <b><i>Galileo C++ SDK</i></b> NuGet package
            </p>
            <img src="{{site.baseurl}}/Resources/images/nuget_search.png">
            </li>
            <br />
            <li>
              Install the NuGet package
              <img src="{{site.baseurl}}/Resources/images/nuget_search_galileo.png">
            </li>
            </ul>
            When you return to your project, the Intellisense errors should be cleared up and your project should compile.
            </p>
          </div>
        </div>
      </div>
    </div>
    <hr />

    <h3>Windows on Intel Galileo</h3>
    <div class="panel-group" id="accordion4">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion4" href="#collapseWindowsBoot">
              Windows doesn't appear to boot
            </a>
          </h4>
        </div>
        <div id="collapseWindowsBoot" class="panel-collapse collapse">
          <div class="panel-body">
            To Diagnose Windows not booting, it would be helpful to have a Windows Kernel Debugger installed while booting so the Experiences team can help diagnose the issue.

            <ol>
              <li>
                Install <a href="http://msdn.microsoft.com/en-US/windows/desktop/bg162891">Debugging tools for Windows</a>
              </li>
              <li>
                Connect to your Galileo via serial. Gen1 requires an RS232 serial cable with a 3.5mm jack. Gen2 requires an RS232 with 6 way inline connector.
              </li>
              <li>
                Open <kbd>WinDBG</kbd> and connect the kernel debugger (File -> Kernel Debugger...) to the COM port above.
              </li>
              <li>Boot windows and look for failures.</li>
            </ol>

            The most likely cause of Windows boot failure is incompatible Galileo Firmware. Ensure that you are <a href="IBoughtAGalileo.htm">running the latest firmware</a>.
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion4" href="#collapseApplyBootMedia">
              ApplyBootMedia.cmd does not work
            </a>
          </h4>
        </div>
        <div id="collapseApplyBootMedia" class="panel-collapse collapse">
          <div class="panel-body">
            If ApplyBootMedia is failing, follow these steps to check for known issues:<br />
            <ul>
              <li>Make sure that the SD card has been reformatted with the FAT32 system and that it is empty.</li>
              <li>Make sure that the path for both the .wim and ApplyBootMedia.cmd do not contain spaces.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <hr />

    <h3>GalileoWatcher</h3>
    <div class="panel-group" id="accordian5">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordian5" href="#collapseEmon">
              The Galileo doesn't appear on GalileoWatcher
            </a>
          </h4>
        </div>
        <div id="collapseEmon" class="panel-collapse collapse">
          <div class="panel-body">
            Make sure you have allowed it through the firewall.

            To check it's firewall configurations go to Control Panel > System and Security > Windows Firewall > Allowed Apps</li>
            <img src="{{site.baseurl}}/Resources/images/GalileoWatcherFirewall.png" />
          </div>
        </div>
      </div>
    </div>
    <hr />

    <h3>Remote Deployment</h3>
    <div class="panel-group" id="accordian6">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordian6" href="#collapseRemoteDeployment1">
              Operation is taking longer than expected
            </a>
          </h4>
        </div>
        <div id="collapseRemoteDeployment1" class="panel-collapse collapse">
          <div class="panel-body">
            Don't freak out! This happens due to the debugging over ethernet.
          </div>
        </div>
      </div>

      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordian7" href="#collapseRemoteDeployment2">
              Unable to start debugging. The connection with the remote endpoint was terminated.
            </a>
          </h4>
        </div>
        <div id="collapseRemoteDeployment2" class="panel-collapse collapse">
          <div class="panel-body">
            This can sometimes happen when the name resolution is not working. Try using the IP Address shown for your Galileo in the the GalileoWatcher.
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordian9" href="#collapseRemoteDeployment4">
              Unable to start program 'c:\{File}'. The system cannot find the file specified.
            </a>
          </h4>
        </div>
        <div id="collapseRemoteDeployment4" class="panel-collapse collapse">
          <div class="panel-body">
            <h3>Configure remote deploying for your project</h3>
            Right click on your project and select Properties.<br />
            Select the <kbd>Configuration Manager...</kbd> button from the upper right corner.<br />
            Make sure "Deploy" is checked for your project<br />
            Also make sure that your remote Debugger settings are set correctly. See <a href="AdvancedUsage.htm#collapseRemoteDebugging">Configure Remote Debugging</a> on the "Advanced Usage" page.
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordian10" href="#collapseRemoteDeployment5">
              Unable to start debugging. The debugger cannot connect to the remote computer. The debugger was unable to resolve the specified computer name.
            </a>
          </h4>
        </div>
        <div id="collapseRemoteDeployment5" class="panel-collapse collapse">
          <div class="panel-body">
            Make sure your project's remote debugger settings have the correct Remote Server Name. It should match the name of your Galileo board.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>