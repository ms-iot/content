---
layout: default
title: Project Setup
permalink: /en-US/win10/LightningSetup.htm
lang: en-US
---

## Lightning Setup Guide

This guide will walk you through the steps of changing the default controller driver to the Lightning driver on a Windows IoT Core device. This will allow the use of Lightning-enabled applications on that device.

### Change the Default Controller Driver

We will want to open the Windows Device Portal

1. Locate the IP address of your device, either by using the Windows 10 IoT Core Dashboard application or hooking up your board to a monitor.

1. From your local machine, open the Windows Devices Portal web page by entering this address http://{BoardIPAddress}:8080/ in your web browser.
 ![Windows Devices Portal]({{site.baseurl}}/Resources/images/Lightning/dmap1.png)

1. The Windows Devices Portal Page should ask you for your credentials. The default username is `Administrator` and password is `p@ssw0rd`
  Note, after entering the username and password, the Portal will ask you if you need to change the password. It's always a good practice to change it.
 ![Windows Devices Portal Credentials]({{site.baseurl}}/Resources/images/Lightning/dmap2.png)

1. Click on Devices in the navigation menu to open the Devices page
  ![Devices Page]({{site.baseurl}}/Resources/images/Lightning/dmap3.png)

1. The Devices page lists the available Controller drivers. By default, the Inbox Driver is set to current.

1. Switch to the Lightning driver by choosing the Direct Memory Mapped Driver from the drop down menu and click the Update Driver Button<br/>
  ![Select Direct Memory Mapped Driver]({{site.baseurl}}/Resources/images/Lightning/dmap4.png)

1. Please wait until the page lets you know when the driver installation is complete.
   ![Driver Installation Complete]({{site.baseurl}}/Resources/images/Lightning/dmap5.png)

1. If a reboot is required, the page will let you know as well. You can reboot by using the Reboot button at the top of the page.

1. Now you're ready to create and use applications that make use of the Lightning Direct Memory Mapped driver.
