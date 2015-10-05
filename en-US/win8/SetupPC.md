---
layout: default
title: SetupPC
permalink: /en-US/win8/SetupPC.htm
lang: en-US
deviceName: Galileo
---

<div class="row">
  <!-- <h1>Get Started - Setup Your PC for Windows 8.1</h1> -->
  <h1>Get Started</h1>
  <div class="col-md-8">
    <p>Learn how to get your computer ready for Windows Developer Program for IoT.</p>
  </div>
  {% include steps.html device=page.deviceName %}
</div>
<div class="row">
  <h2>Windows Developer Program for IoT Developer Tools</h2>
  <span class="label label-default">Visual Studio extension updated: 12/2/2014</span>
  <p>The Windows Developer Program for IoT contains tools and templates which allow you to build applications for the Intel Galileo.</p>
  <div class="panel panel-danger">
    <div class="panel-heading">
      Note:
    </div>
    <div class="panel-body">
      Please ensure that Visual Studio is not running at this time.
    </div>
  </div>
  <div class="panel-group" id="accordion">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
            I have Visual Studio 2013 Professional, Premium or Ultimate installed
          </a>
        </h4>
      </div>
      <div id="collapseOne" class="panel-collapse collapse">
        <div class="panel-body">
          Please install the <a href="http://go.microsoft.com/fwlink/?LinkID=513082" target="_blank">WindowsDeveloperProgramforIOT.msi</a>
          <br/>
          (During the install process, you may be prompted twice by the User Account Control. Once for the MSI and once for VSIXInstaller. To properly install the needed components, you will need to click yes.)
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseExpress">
            I have Visual Studio 2013 Express for Windows Desktops installed
          </a>
        </h4>
      </div>
      <div id="collapseExpress" class="panel-collapse collapse">
        <div class="panel-body">
          <ol>
            <li>
              Install the Nuget package manager for Visual Studio 2013 by following these steps:
              <ol>
                <li>
                    Open Visual Studio 2013
                </li>
                <li>
                    Click to Tools in the navigation bar and go to "Extensions and Updates"
                    <br/>
                    <img src="{{site.baseurl}}/images/InstallNugetPackageManagerStepOne.png">
                </li>
                <br/>
                <li>
                    Then click on the Online tab and Search for "NuGet Package Manager".
                    <br/>
                    <img src="{{site.baseurl}}/images/InstallNugetPackageManagerStepTwo.png">
                </li>
                <li>
                    Download and install it.
                </li>
              </ol>
            </li>
            <li>
              Install the <a href="http://go.microsoft.com/fwlink/?LinkID=513082" target="_blank">WindowsDeveloperProgramforIOT.msi</a>
              <br/>
              (During the install process, you may be prompted twice by the User Account Control. Once for the MSI and once for VSIXInstaller. To properly install the needed components, you will need to click yes.)
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
            I do not have Visual Studio 2013 installed
          </a>
        </h4>
      </div>
      <div id="collapseTwo" class="panel-collapse collapse">
        <div class="panel-body">
          <ol>
            <li>
              Install <a href="http://www.visualstudio.com/downloads/download-visual-studio-vs" target="_blank">Visual Studio 2013 Express for Windows Desktops</a>.
            </li>
            <li>
              Install the Nuget package manager for Visual Studio 2013 by following these steps:
              <ol>
                <li>
                    Open Visual Studio 2013
                </li>
                <li>
                    Click to Tools in the navigation bar and go to "Extensions and Updates"
                    <br/>
                    <img src="{{site.baseurl}}/images/InstallNugetPackageManagerStepOne.png">
                </li>
                <br/>
                <li>
                    Then click on the Online tab and Search for "NuGet Package Manager".
                    <br/>
                    <img src="{{site.baseurl}}/images/InstallNugetPackageManagerStepTwo.png">
                </li>
                <li>
                    Download and install it.
                </li>
              </ol>
            </li>
            <li>
              Install the <a href="http://go.microsoft.com/fwlink/?LinkID=513082" target="_blank">WindowsDeveloperProgramforIOT.msi</a>
              <br/>
              (During the install process, you may be prompted twice by the User Account Control. Once for the MSI and once for VSIXInstaller. To properly install the needed components, you will need to click yes.)
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
            I have Visual Studio 2014 or Visual Studio 2015 installed
          </a>
        </h4>
      </div>
      <div id="collapseThree" class="panel-collapse collapse">
        <div class="panel-body">
          Visual Studio 2014 and Visual Studio 2015 are not currently supported.<br/>
          If you have Visual Studio 2013 Professional, Premium, Ultimate, Community or Express for Windows Desktops, follow the instructions for that above.
          Otherwise, follow the instructions for "I do not have Visual Studio 2013 installed" above.
        </div>
      </div>
    </div>
  </div>
  <hr/>
  <h2>Telnet</h2>
  <p>
  Telnet is required for certain steps later in the Getting Started guide. Now is a good time to install it if you do not have it installed.
  </p>
  <ol>
    <li>On your desktop machine, go to the Control Panel and open:<br/>(if in icon view) Programs and Features<br/> or<br/> (if in category view) Programs -> Programs and Features.</li>
    <li>In the left hand column, select "Turn Windows Features on or off"</li>
    <li>In the list, "Telnet Client" needs to be checked.<br/><img src="{{site.baseurl}}/images/Telnet.png"/></li>
    <li>Click "Ok"</li>
    <li>Restart your PC</li>
  </ol>

{% include nextsteps.html device=page.deviceName %}
</div>
