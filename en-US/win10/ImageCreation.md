---
layout: default
title: Image creation process and tools
permalink: /en-US/win10/ImageCreation.htm
lang: en-US
---

##Image creation process and tools

###System Setup

We will use the command line tool `imggen` to create a custom Windows IoT Core image. This tool is shipped as part of the Windows Assessment & Deployment (ADK) Kit.

###Install Windows 10 IoT Core packages

Mount the WIndows 10 IoT Core packages [ISO](TODO: add installation location for ISO) and install `Windows_10_IoT_Core_Packages.msi`.

###Creating an MBM image using imggen

You can use `imggen` to customize your image. The tool supports the ability to customize it by adding drivers, executables, and binaries to your image through Spkgs. This is very similar to how package creation is done today for Windows Phone operating System. To get a quick taste of how this work, let's use the MBM sample we copied over earlier and try this out.

NOTE: Remove any USB removable storage devices from your machine.  The imaging tools will pause trying to dismount the file systems from any USB thumb-drives or SD card readers that you might have attached to your system. To avoid this, unplug these devices now. You can plug them back in later.

* Open an elevated Deployment and Imaging Tools Environment command prompt and add the phone tools directory to your path.

        set path=%PATH%;%KITSROOT%\tools\bin\i386

* Set the AKROOT variable used by the BSP file

        set AKROOT=%KITSROOT%

* Create an output directory for your FFU (and log files)

        md C:\FFU

* Navigate to your output directory

        cd /d C:\FFU

* Run imggen to create your FFU

        imggen.cmd flash.FFU "%KITSROOT%\OEMInputSamples\MBM\ProductionOEMInput.xml" "%KITSROOT%\MSPackages" x86

* Wait for image creation to complete. Typically it takes around 10-15 minutes to complete. Note that it might take a bit more time to complete and display a few warnings.

This will build a Flash.ffu file in your FFU folder.  You will find instructions [here]({{site.baseurl}}/{{page.lang}}/GetStarted.htm) on how to deploy an FFU with the Windows IoT Core image to an SD card (look into the 'Put the Windows IoT Core image on your Micro SD Card' section).
