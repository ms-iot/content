---
layout: default
title: Setup your Galileo
permalink: /SetupGalileo.htm
---

<div class="container">
  <h1>Setting up your Galileo</h1>
  <hr/>

  <h2>What is in the box?</h2>
  Included with your Windows for Galileo development kit are the following:
  <ul>
    <li>Galileo SoC</li>
    <li>Power Adapter</li>
    <li>SD Card (<i>containing the Windows image</i>)</li>
    <li>Ethernet cable</li>
  </ul>
  If you do NOT have an SD card containing the Windows image, follow the steps below to build your own image.
  <hr/>

  <h2>Building your own image</h2>
  <div class="panel panel-info">
    <div class="panel-heading">NOTE:</div>
    <div class="panel-body">This step is only required if your kit does not have an SD card with a Windows image.</div>
  </div>
  You will need to attain a microSD card (We suggest at least 8 GB) and reformat it.<br/>
  <a href="<placeholder>">Download apply-bootmedia.cmd</a>
  <br/>
  <a href="<placeholder>">Download the .wim</a>
  <br/>
  Then run the following from an elevated Command Prompt:<br/>
  <kbd>apply-bootmedia.cmd -destination {YourSDCardDrive} -image {.wimFile} -hostname {WhateverYouFeelLike} -password {WhateverYouFeelLike}</kbd>
  <hr/>

  <h2>Put your micro-SD card into your galileo in the micro-SD card slot</h2>
  <hr/>

  <h2>Connect Ethernet on Galileo to Ethernet Directly to PC or Laptop</h2>
  Connecting the Galileo directly to your computer will allow you to communicate with just your Galileo. You will still have internet connectivity, and your computer will be able to communicate with your Galileo.
  <ol>
    <li>Connect one end to the Ethernet port on your Galileo</li>
    <li>Connect the other end to the USB Ethernet adapter.</li>
    <li>Connect the other end to the USB Ethernet adapter.</li>
    <li>Plug the USB Ethernet adapter into your PC</li>
  </ol>
  <hr/>

  <h2>Plug the power cord into the Galileo.</h2>
  <div class="panel panel-info">
    <div class="panel-heading">NOTE:</div>
    <div class="panel-body">Windows on Galileo can take about 2 minutes to fully boot.</div>
  </div>

  <ol>
    <li>You should see activity on the SD light as it boots (bottom left of this picture, circled in yellow).</li>
    <br/>
    <p>
      <img src="images\SDLed.png"/>
    </p>
    <li>
      <b>
        As soon as you see data coming through the connection (light flashing on your Ethernet port or usb converter), open GalileoWatcher.exe
      </b>
      <br/>
      Make sure to allow it through the firewall when the security dialog comes up.
      <br/>
      <img src="images\GalileoWatcherFirewallDialog.PNG">
      <br/>
      Once your Galileo board finishes booting up (SD LED should stop flashing with activity) it should begin broadcasting its IP Address and Host Name. This data should show up on GalileoWatcher like below.
    </li>
    <p>
      <img src="images\GalileoWatcherExample.png"/>
    </p>
    <br/>
    <li>
      For extra verification, you can open a command window on your desktop and type <kbd>ping -4 mygalileo</kbd> to see if it's on the network
    </li>
    <br/>
    <p>
      <img src="images\ping.png"/>
    </p>
  </ol>
  <hr/>

  <a class="btn btn-default" href="index.htm" role="button">Return to homepage</a>
  <a class="btn btn-default" href="SampleApps.htm" role="button">Continue to Samples &raquo;</a>
