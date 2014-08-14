---
layout: default
title: Setup your PC
permalink: /SetupPC.htm
---

<div class="container">
  <h1>Setting up your PC</h1>
  <hr/>
  <h2> Microsoft Connect </h2>
  Before you configure Visual Studio or download any software, please sign up for the Windows Developer Program for IoT on <a href="https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558" target="_blank">Microsoft Connect</a>.<br/>
  <br/>
  You can find step by step instructions for signing up for Microsoft Connect <a href="SigninMSConnect.htm" target="_blank">here</a><br/>
  <hr/>
  <h2> Visual Studio </h2>
  <p>Install and configure Visual Studio 2013.</p>
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
          Please install the <a href="http://go.microsoft.com/fwlink/?LinkID=403151" target="_blank">WindowsDeveloperProgramforIOT.msi</a>
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
                    <img src="images/InstallNugetPackageManagerStepOne.png">
                </li>
                <br/>
                <li>
                    Then click on the Online tab and Search for "NuGet Package Manager".
                    <br/>
                    <img src="images/InstallNugetPackageManagerStepTwo.png">
                </li>
                <li>
                    Download and install it.
                </li>
              </ol>
            </li>
            <li>
              Install the <a href="http://go.microsoft.com/fwlink/?LinkID=403151" target="_blank">WindowsDeveloperProgramforIOT.msi</a>
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
                    <img src="images/InstallNugetPackageManagerStepOne.png">
                </li>
                <br/>
                <li>
                    Then click on the Online tab and Search for "NuGet Package Manager".
                    <br/>
                    <img src="images/InstallNugetPackageManagerStepTwo.png">
                </li>
                <li>
                    Download and install it.
                </li>
              </ol>
            </li>
            <li>
              Install the <a href="http://go.microsoft.com/fwlink/?LinkID=403151" target="_blank">WindowsDeveloperProgramforIOT.msi</a>
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
            I have Visual Studio 2014 installed
          </a>
        </h4>
      </div>
      <div id="collapseThree" class="panel-collapse collapse">
        <div class="panel-body">
          Visual Studio 2014 is not currently supported.<br/>
          If you have Visual Studio 2013 Professional, Premium, Ultimate, or Express for Windows Desktops, follow the instructions for that above.
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
    <li>In the left hand column, select “Turn Windows Features on or off”</li>
    <li>In the list, “Telnet Client” needs to be checked.<br/><img src="images/Telnet.png"/></li>
    <li>Click "Ok"</li>
    <li>Restart your PC</li>
  </ol>

  <a class="btn btn-default" href="index.htm" role="button">Return to homepage</a>
  <a class="btn btn-default" href="SetupGalileo.htm" role="button">Continue to Setting up your Galileo &raquo;</a>

