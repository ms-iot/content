---
layout: default
title: Setup your PC
permalink: /SetupPC.htm
---

<div class="container">
  <h1>Setting up your PC</h1>
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
          Please install the <a href="">Windows Development Kit for IoT</a>
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
              Install the <a href="http://visualstudiogallery.msdn.microsoft.com/4ec1526c-4a8c-4a84-b702-b21a8f5293ca">Nuget package manager</a> for Visual Studio 2013
            </li>
            <li>
              Install the <a href="">Windows Development Kit for IoT</a>
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
              Install <a href="http://www.visualstudio.com/downloads/download-visual-studio-vs">Visual Studio 2013 Express for Windows Desktops</a>.
            </li>
            <li>
              Install the <a href="http://visualstudiogallery.msdn.microsoft.com/4ec1526c-4a8c-4a84-b702-b21a8f5293ca">Nuget package manager</a> for Visual Studio 2013
            </li>
            <li>
              Install the <a href="">Windows Development Kit for IoT</a>
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
          Visual Studio 2014 is not currently supported. Our Windows image contains msvsmon.exe for 2013 which is incompatible with 2014. We are working on upgrading this, however we need to ensure that 2013 is still supported.

          Please install Visual Studio 2013 express until we can correct this.
        </div>
      </div>
    </div>
  </div>
  <hr/>

  <h2>Telnet</h2>
  <h4>(<i>Installation requires restarting your PC</i>)</h4>
  <p>
    While using Visual Studio will be your primary interface with the Galileo. However, since Galileo is a headless device you'll likely need to use a command line interface on the galileo when things go south. It is helpful to have the command line interface set up before needing it. You'll need telnet in order to <a href="Troubleshooting.htm">troubleshoot your galileo.</a>
  </p>
  <p>
    You may need to install the Windows Telnet client.
    <ol>
      <li>On your desktop machine, go into Control Panel->Programs and Features.</li>
      <li>In the left hand column, select “Turn Windows Features on of off”</li>
      <li>Select “Telnet Client” in the list.<br/><img src="images\Telnet.png"/></li>
      <li>Restart your PC</li>
    </ol>
  </p>
  <p>
    On your desktop select Start->Run and type <kbd>telnet mygalileo</kbd>.<br/><img src="images\TelnetLogin.png"/>
  </p>
  <div class="panel panel-info">
    <div class="panel-heading">NOTE:</div>
    <!-- Telnet doesn't use backslash to remove domain -->
    <div class="panel-body">
      Your Galileo has been assigned a username and password:<br/>
      <kbd>Username: Administrator</kbd><br/>
      <kbd>Password: admin</kbd><br/>
    </div>
  </div>

  <a class="btn btn-default" href="index.htm" role="button">Return to homepage</a>
  <a class="btn btn-default" href="SetupGalileo.htm" role="button">Continue to Setting up your Galileo &raquo;</a>

