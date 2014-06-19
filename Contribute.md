---
layout: default
title: Contribute
permalink: /Contribute.htm
---

<div class="jumbotron">
  <div class="container">
    <h1>Contribute</h1>
    <p>Thank you for your interest in contributing to Windows Developer Program for IoT for Intel Galileo.</p>
  </div>
</div>

<div class="container">
  <h1>Checkout the repository</h1>
  <p>If you want to contribute to the development kit, read on!</p>
  <p>The first time you'd like to commit a change to a repository, perform the following:</p>


  <ol>
  <li>Familiarize yourself with git by reading through <a href="https://help.github.com/">the GitHub documentation</a>.</li>
  <li>Create a GitHub account by starting at <a href="https://github.com/">GitHub home</a></li>
  <li>Now that you have an account, you need to install Git on your computer. Please follow the instructions on <a href="https://help.github.com/articles/set-up-git">Setting up Git tutorial</a>.</li>
  <li>Once you have Git installed, fork this repository. Goto the top of the page and click the <b>Fork</b> button. <br/>You now have a fork of this repository on GitHub which you can use to edit content.</li>
  <li>Clone your repository to your machine. For this open GitBash or Windows command prompt and clone the repository:<br>
    <p><kbd>git clone https://github.com/&lt;your user name&gt;/content.git</kbd></p>
    <p>Now create a reference to the root repository by issuing the following:</p>
    <p>
      <kbd>
        cd content<br/>
        git remote add upstream https://github.com/ms-iot/content.git<br/>
        git fetch upsteam
      </kbd>
    </p>
  </ol>
  <hr/>
  <h1>Making changes</h1>
  <p>
    We will be following the GitFlow branching methodology as described at <a href="https://www.atlassian.com/git/workflows#!workflow-gitflow">Altassian</a>. Do not check directly into master.
  </p>
  <h3>What to Contribute</h3>
  We're actively accepting work for the following areas:
  <ul>
    <li>Getting Started Guide</li>
    <li>Samples</li>
    <li>Tutorials</li>
    <li>Projects</li>
    <li>Library Ports</li>
    <li>Arduino Shield Ports</li>
  </ul>

  <h3>Making a change</h3>
  <ol>
    <li>
      Create a branch for your feature<br/>
      <kbd>
        git checkout -b <i>yourAlias_featureName</i>
      </kbd>
      <p>
        For Example: <br/>
        <kbd>git checkout -b lamadio_arduino_firmata_port</kbd><br/>
      </p>
    </li>
    <li>Make your edits, build and test. </li>
    <li>
      Push your branch to the repository using the following command:<br/>
      <kbd>git push --all origin</kbd>
    </li>
    <li>
      When you are ready to ship your feature, send mail to <a href="mailto:wodcontrib@microsoft.com">WodContrib</a> requesting a code review and integration.<br/>
      Include the following:
      <ul>
        <li>The purpose of the change</li>
        <li>The branch name</li>
        <li>Indicate if the feature branch should be deleted.</li>
      </ul>
    </li>
  </ol>
  <hr/>

  <h1>Iterating on the Dev Kit</h1>
  <h3>Configure Visual Studio</h3>
  <p>
    You’ll want to redirect visual studio’s <i>user templates</i> to the repository you are working in.<br/>
    <i>Tools -> Options</i>
    <br/>
    <img src="images/Nuget_TemplateConfig.png"/>
    <br/>
    Under <i>Projects and Solutions</i>, select <i>General</i>
  </p>

  <h4>For Visual Studio Pro and Ultimate:</h4>
  <p>
    <i>Tools -> Library Package Manager -> Package Manager Settings</i>
    <br/>
    <img src="images/Nuget_PackageSourceConfig_VSU2013.png"/>
  </p>

  <h4>For Visual Studio Express:</h4>
  <p>
    <i>Tools -> Nuget Package Manager -> Package Manager Settings</i>
    <br/>
    <img src="images/Nuget_PackageSourceConfig_VSE2013.png"/>
  </p>
  <div class="panel panel-info">
    <div class="panel-heading">NuGet note:</div>
    <div class="panel-body">
      To configure Nuget to pull from your local nuget build directory, reorder it so that your local source is listed above Nuget.org.
    </div>
  </div>

  <h3>Build the Nuget package</h3>
  <p>
    Please download the Nuget command line utility <a href="http://nuget.org/nuget.exe">nuget.exe</a> into <kbd>c:\wod\Source\cppgalileosdk</kbd>
  </p>

  <kbd>cd /d c:\wod\Source\cppgalileosdk</kbd>
  <br/>
  <kbd>build-nupkg.cmd</kbd>

  <h3>Building the Project</h3>
  <p>
    You can now goto <i>File -> New Project</i> then Select <i>Templates -> Visual C++ -> Galileo -> Galileo Wiring app</i>:<br/>
    <img src="images/Nuget_AppCreate.png"/>
  </p>

  <h3>Build the app</h3>
  <p>
    You can now build the application. Please refer to the <a href="HelloBlinky.htm">Hello Blinky Sample </a> for details on how to build and deploy an application.
  </p>

  <h3>Iterate in the Nuget</h3>
  <p>
    Now you need to make changes to the Nuget, you’ll need to uninstall it first. Right click on the Project in the solution and select <i>Manage Nuget Packages</i>.<br/> Now Uninstall the Galileo SDK by clicking the uninstall button:<br/>
    <img src="images/Nuget_Install.png"/>
  </p>
  <p>
    Then select <i>Online</i> and <i>Local Source</i><br/>
    <img src="images/Nuget_ReInstall.png"/>
  </p>

  <h3>Install it!</h3>
  <p>Your updates will be there.</p>

  <div class="panel panel-info">
    <div class="panel-heading">Build notes:</div>
    <div class="panel-body">
      <ul>
        <li>While you can change your local headers, they will get nuked when reinstalling the nuget package.</li>
        <li>Don’t check in your packages...</li>
        <li>Don’t check in Binaries</li>
        <li>You do not need to bump the version when you commit – we’ll bump at release. This requires a change to EVERY project. Nuget doesn’t have wildcards as far as I can tell.</li>
      </ul>
    </div>
  </div>

  <hr/>

  <h1>Best Practices</h1>
  <h3>Do not check directly into develop or master!</h3>
  <p>
    Please create feature branches for any changes. This allows us to code review before pulling into develop.
  </p>

  <h3>Do not check in binaries</h3>
  <p>
    Git is not a good binary store. Once a binary is added to the repository, it will be there forever unless extraordinary actions are taken.
    Please do not add binaries to Git including:
    <ul>
      <li>The output from a build (debug/release)</li>
      <li>SDF file (code database)</li>
      <li>Nuget package directories</li>
    </ul>

    Acceptable binaries:
    <ul>
      <li>PNG, JPG, or other image formats</li>
    </ul>
  </p>
</div>