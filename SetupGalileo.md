---
layout: default
title: Setup your Galileo
permalink: /SetupGalileo.htm
---

<div class="container">
  <h1>Setting up your Galileo</h1>
  <hr/>

  <h2>What is in the box?</h2>
  Included with your Windows Developer Program for IoT kit are the following:
  <ul>
    <li>Intel Galileo</li>
    <li>Power Adapter</li>
    <li>SD card case containing a microSD card in an SD card adapter</li>
    <li>Ethernet cable</li>
    <li>an LED</li>
    <li>USB to Ethernet adapter</li>
  </ul>
  
  <!--
  If you do NOT have an SD card containing the Windows image or if a new Windows build has been released, you can follow the steps below to build your own image.
  <hr/>

  <h2>Building your own Windows image</h2>
  <div class="panel panel-info">
    <div class="panel-heading">NOTE:</div>
    <div class="panel-body">This step is only required if your kit does not have an microSD card with a Windows image.</div>
  </div>
  You will need to attain a microSD card (We suggest at least 8 GB) and format it Fat32.<br/>
  Please download the following files from the Windows Developer Program for IoT download site:
  <ul>
  <li><a href="http://go.microsoft.com/fwlink/?LinkID=403150" target="_blank">Windows Developer Program for IOT CTP1 - WIM</a></li>
  <li><a href="http://go.microsoft.com/fwlink/?LinkID=403796" target="_blank">apply-BootMedia.cmd</a></li>
  </ul>
  <br/>
  <p>Run the included script from an <b>elevated</b> Command Prompt:<br/>
  <kbd>apply-bootmedia.cmd -destination {YourSDCardDrive} -image {.wimFile} -hostname mygalileo -password admin</kbd></p>

  <p>For example:</p>
  <kbd>apply-bootmedia.cmd -destination e:\ -image BootMe-Galileo-8967-Mon.06.16.2014.17.47.29.42.wim -hostname mygalileo -password admin</kbd>
  <br/><br/><p>This process will take some time.</p>
  -->
  <hr/>

  <h2>Insert the microSD card</h2>
  <ol>
    <li>Remove the microSD card with the Windows Image from the SD card adapter.</li>
    <li>Insert the microSD card into the Galileo's microSD card slot near the power port. (Note: This step must be done prior to plugging in the power.)</li>
  </ol>
  <hr/>

  <h2>Connect Ethernet on Galileo to Ethernet Directly to PC or Laptop</h2>
  Connecting the Galileo directly to your computer will allow you to communicate with just your Galileo. You will still have internet connectivity, and your computer will be able to communicate with your Galileo.
  <ol>
    <li>Connect one end of the network cable to the ethernet port on your Galileo</li>
    <li>Connect the other end of the network cable to the USB ethernet adapter</li>
    <li>Plug the USB Ethernet adapter into your PC's USB adapter</li>
  </ol>
  <hr/>

  <h2>Plug the power cord into the Galileo.</h2>
  <div class="panel panel-info">
    <div class="panel-heading">NOTE:</div>
    <div class="panel-body">Windows on Galileo can take about 2 minutes to boot. During this time you will see the microSD activity LED flashing rapidly. Once it stops flashing for a few seconds, the Galileo is fully booted.</div>
  </div>

  <ol>
    <li>You should see activity on the microSD light as it boots. The LED is at the bottom left of this picture.</li>
    <br/>
    <p>
      <img src="images/SDLed.png"/>
    </p>
    <li>
      <b>
        As soon as you see data coming through the connection by light flashing on your Galileo's Ethernet port, open GalileoWatcher.exe from C:\Program Files (x86)\Microsoft IoT\
      </b>
      <br/>
      Make sure to allow it through the firewall when the security dialog comes up.
      <br/>
      <img src="images/GalileoWatcherFirewallDialog.PNG">
      <br/>
      Once your Galileo board finishes booting up (microSD LED should stop flashing with activity) it should begin broadcasting its IP Address and Host Name. This data should show up on GalileoWatcher like below.
    </li>
    <p>
      <img src="images/GalileoWatcherExample.png"/>
    </p>
    <br/>
    <li>
      For extra verification, you can open a command window on your desktop and type <kbd>ping -4 mygalileo</kbd> to see if it's on the network
    </li>
    <br/>
    <p>
      <img src="images/ping.png"/>
    </p>
  </ol>
  <hr/>
  <h2>Telnet into your Galileo</h2>
  The main reason you'll want to telnet into your Galileo is so that you can interact with your Galileo and gracefully shut it down.
  <p>On your desktop select Start->Run and type <kbd>telnet mygalileo</kbd>.</p>
  When prompted by telnet, use the following username and password:<br/>
  <p><kbd>Username: Administrator</kbd><br/>
  <kbd>Password: admin</kbd></p>
  <p><img src="images/TelnetLogin.png"/></p>

  <h3>Shutting down the Galileo</h3>
  Before you unplug the power from the Galileo, it is advisable to gracefully shut it down. To do this:<br />
  <ol>
    <li>Telnet to the Galileo as described above</li>
    <li>Enter the following command to shutdown:<br/>
    <kbd>shutdown /s /t 0</kbd>
    </li>
  </ol>
  <p>After the microSD activity LED stops blinking, you may unplug the Galileo.</p>
  <div class="panel panel-info">
    <div class="panel-heading">NOTE:</div>
    <div class="panel-body">If you do not shut the Galileo down, the next boot will take much longer. During this time, Windows will run a check disk on the SD card to verify the integrity of the file system. Please allow this to finish.</div>
  </div>
  <hr/>

  <a class="btn btn-default" href="index.htm" role="button">Return to homepage</a>
  <a class="btn btn-default" href="SampleApps.htm" role="button">Continue to Samples &raquo;</a>
