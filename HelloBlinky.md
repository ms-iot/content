---
layout: default
title: Hello Blinky
permalink: /HelloBlinky.htm
---

<div class="container">
  <h1>Hello Blinky</h1>
  <p>Learn to Create, Deploy and Debug a Windows for IoT for Intel Galileo project.</p>
  <h3>Wire your Galileo with an LED</h3>
  <img src="images\HelloBlinky.png"/>

  <h3>Create a new Project</h3>
  <p>Open Visual Studio. Select File -> New Project and Select Templates -> Visual C++ -> Windows for IoT -> Galileo Wiring app:<br>
  <img src="images/Nuget_AppCreate.png"/></p>

  <p>Open <kbd>main.cpp</kbd> and replace the code with the following:<br>
  <pre>
    <code>
      #include "stdafx.h"
      #include "arduino.h"

      int _tmain(int argc, _TCHAR* argv[])
      {
        return RunArduinoSketch();
      }

      int led = 13;  // This is the pin the LED is attached to.

      void setup()
      {
        pinMode(led, OUTPUT); // Configure the pin for OUTPUT so you can turn on the LED.
      }

      // the loop routine runs over and over again forever:
      void loop()
      {
        digitalWrite(led, LOW);    // turn the LED off by making the voltage LOW
        delay(1000);               // wait for a second
        digitalWrite(led, HIGH);    // turn the LED on by making the voltage HIGH
        delay(1000);               // wait for a second
      }
    </code>
  </pre>

  <h3>Configure remote debugging</h3>

  <p>Inside Visual Studio:
  <ul>
  <li>select the <kbd>Project</kbd> menu</li>
  <li>select <kbd><i>Your App's Name</i> Properties</kbd></li>
  <li>select the <kbd>Debugging</kbd> tree item</li>
  <li>Change the <kbd>Debugger to launch</kbd> to <kbd>Remote Windows Debugger</kbd></li>
  <li>Configure the debug page like the following picture, paying close attention to the debug settings:<br>
  <img src="images\ConfigureRemoteDebugger.png"/></p>
  </li>
  </ul>
  <div class="panel panel-info">
    <div class="panel-heading">Visual Studio Debug Settings</div>
    <div class="panel-body">
      You need to verify the following settings to configure remote debugging:<br/>
      Remote Command: <kbd>c:\test\$(TargetFileName)</kbd><br/>
      Working Directory: <kbd>c:\test</kbd><br/>
      Remote Server Nane: <kbd>mygalileo</kbd><br/>
      Deployment Directory: <kbd>c:\test</kbd><br/>
    </div>
  </div>

  <div class="panel panel-danger">
    <div class="panel-heading">Laptop Users please note:</div>
    <div class="panel-body">If you are connecting galileo to your laptop either directly or via a USB Ethernet adapter, please disable Wireless. Visual Studio will not find your computer by name if you leave wireless on. </div>
  </div>

  <h3>Configure remote debugging</h3>
  Before you close the Property Pages, select the <kbd>Configuration Manager...</kbd> button from the upper right corner.<br/>
  Make sure "Deploy" is checked for the Hello Blinky project<br/>
  <img src="images\EnableDeployment.png"/>

  <h3>Build and deploy</h3>
  Press F5 to build and deploy your project.  You should see the light blinking.<br/>
  <hr/>

  <a class="btn btn-default" href="SampleApps.htm" role="button">&laquo; Return to Samples</a>
