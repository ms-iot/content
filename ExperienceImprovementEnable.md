---
layout: code
title: Help improve program
permalink: /ExperienceImprovementEnable.htm
---

### Helping us, helps you
We constantly endeavor to refine the developer program, and encourage you to opt-in to our Customer Experience Improvement Program by following the steps below so that we can understand how the program can be improved. Turning this on enables us to make a better product that you clearly use - Helping us, helps you.

### At a high level
In order for us to get product insights, you'll need to associate your developer session with the Windows-On-Devices Development Program.  This requires using the GalileoWatcher tool to help with this association, along with enabling Visual Studio telemetry.
* GalileoWatcher:  Run this tool to find your connected development board.
* Visual Studio:  Opt-in to Experience Improvement.

## How to enable Customer Experience Improvement ...

### 1) Select your connected board from GalileoWatcher.
  * Make sure your Galileo board is connected to the same subnet as your developer PC, or to the PC directly.
  * Start GalileoWatcher.  It is the locator tool which was installed on your PC from the WindowsDeveloperProgramforIOT.MSI, and used to enumerate board addresses.
  * Select your board name that shows up in GalileoWatcher.  You can optionally right-click to perform one of the listed actions.  By seeing and selecting your board, this associates your device with the Visual Studio telemetry pipeline, as part of the program.
  * If your firewall settings were missed, or you do not see your board listed, review the GalileoWatcher troubleshooting section at [TroubleShooting](http://ms-iot.github.io/content/TroubleShooting.htm)

### 2) Opt into Visual Studio Experience Improvement.  As with any pre-release evaluation, many improvements result from this feedback process.
  * Launch Visual Studio as an administrator
  * Select HELP from the menu bar, and click "Customer Feedback Options".
  * In the "Visual Studio Experience Improvement Program" dialog, make sure the radio button for "Yes, I am willing to participate" is selected, and click OK.
  * Whenever Visual Studio and your machines are re-started, session telemetry may be forwarded.



