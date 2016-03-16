---
layout: default
title: SetupPC
permalink: /en-US/win8/SetupPC.htm
lang: en-US
deviceName: Galileo
---

<div class="section remove-header-rule">
  <header class="section-header">
    <h1>Get Started</h1>
    <span class="section-subtitle">Learn how to get your computer ready for Windows Developer Program for IoT.</span>
  </header>
  <div class="row">
    <div class="col-xs-24">
      <section class="section item-section">
        <div class="section-body">
          {% include steps.html device=page.deviceName %}
          <div style="background-color:Silver; color:black; padding:20px;">
          	<h4><u>Support for Windows on Intel Galileo Gen 1 and Gen 2 has ended on November 30, 2015</u></h4>
          		<p><h5>As we continue to focus on providing a great experience for Makers with Windows 10 IoT Core, we've made the difficult decision to discontinue Windows support on the Galileo platform. We've seen some fantastic innovation with the platform, but unfortunately, it does not meet the minimum hardware requirements for Windows 10 IoT Core. Please click <a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">here</a> to learn more.</h5></p>
          </div>
        </div>
      </section>
    </div>
    <div class="col-xs-24">
      <section class="section item-section">
          <header class="section-header">
              <h2>Windows Developer Program for IoT Developer Tools</h2>
          </header>
          <div class="section-body">
          <span class="label label-default">Visual Studio extension updated: 12/2/2014</span>
          <p>The Windows Developer Program for IoT contains tools and templates which allow you to build applications for the Intel Galileo.</p>
          <div class="panel panel-danger">
            <div class="panel-heading">
              <b>Note:</b>
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
                            <img src="{{site.baseurl}}/Resources/images/InstallNugetPackageManagerStepOne.png">
                        </li>
                        <br/>
                        <li>
                            Then click on the Online tab and Search for "NuGet Package Manager".
                            <br/>
                            <img src="{{site.baseurl}}/Resources/images/InstallNugetPackageManagerStepTwo.png">
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
                            <img src="{{site.baseurl}}/Resources/images/InstallNugetPackageManagerStepOne.png">
                        </li>
                        <br/>
                        <li>
                            Then click on the Online tab and Search for "NuGet Package Manager".
                            <br/>
                            <img src="{{site.baseurl}}/Resources/images/InstallNugetPackageManagerStepTwo.png">
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
          </div>
      </section>
    </div>
    <div class="col-xs-24">
      <section class="section item-section">
          <header class="section-header">
              <h2>Telnet</h2>
          </header>
          <div class="section-body">
            <p>Telnet is required for certain steps later in the Getting Started guide. Now is a good time to install it if you do not have it installed.</p>
            <ol>
              <li>On your desktop machine, go to the Control Panel and open:<br/>(if in icon view) Programs and Features<br/> or<br/> (if in category view) Programs -> Programs and Features.</li>
              <li>In the left hand column, select "Turn Windows Features on or off"</li>
              <li>In the list, "Telnet Client" needs to be checked.<br/><img src="{{site.baseurl}}/Resources/images/Telnet.png"/></li>
              <li>Click "Ok"</li>
              <li>Restart your PC</li>
            </ol>
            {% include nextsteps.html device=page.deviceName %}
          </div>
      </section>
    </div>
  </div>
</div>
