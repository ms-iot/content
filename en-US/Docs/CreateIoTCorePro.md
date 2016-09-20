---
layout: docs
title: Windows 10 IoT Core Pro
description: We describe how to create a Windows 10 IoT Core Pro image
keyword: windows iot, image creation, iot core pro, windows iot
permalink: /en-US/Docs/CreateIoTCorePro.htm
lang: en-US
---

# Windows 10 IoT Core Pro

Windows 10 IoT Core Pro SKU provides the capability to control and schedule the windows update. This enables the policies related to Update such as [Update/AllowAutoUpdate](https://msdn.microsoft.com/library/windows/hardware/dn904962(v=vs.85).aspx#Update_AllowAutoUpdate), [Update/ScheduledInstallDay](https://msdn.microsoft.com/library/windows/hardware/dn904962(v=vs.85).aspx#Update_ScheduledInstallDay), [Update/ScheduledInstallTime](https://msdn.microsoft.com/library/windows/hardware/dn904962(v=vs.85).aspx#Update_ScheduledInstallTime), [Update/UpdateServiceUrl](https://msdn.microsoft.com/library/windows/hardware/dn904962(v=vs.85).aspx#Update_UpdateServiceUrl).


Here are the steps involved in creating Windows 10 IoT Core Pro device

* Download Windows 10 IoT Core Pro License File and ICD.
* Create a Provisioning Package with License File.
* Apply the provisioning package to the device

To begin, setup your develop PC by following the steps in [Step 1: Get set up]({{site.baseurl}}/{{page.lang}}/Docs/InstallPackage.htm).


## Step 1: Get the Windows 10 IoT Core Pro license file 
___

Go to [Windows 10 IoT Core Commericialization](http://go.microsoft.com/fwlink/?LinkID=614849) and select **Windows 10 IoT Core Pro** to find a distributor near you to get the Windows 10 IoT Core Pro license file.


## Step 2: Create a provisioning package with license file 
___
A Provisioning package can be created by two ways detailed below.

### Create using a sample template

* See [Provisioning.ProSKU](https://github.com/ms-iot/iot-adk-addonkit/tree/develop/Common/Packages/Provisioning.ProSKU) sample. 
* You will need to uncomment the **EditionUpgrade** tag in [customizations.xml](https://github.com/ms-iot/iot-adk-addonkit/blob/develop/Common/Packages/Provisioning.ProSKU/customizations.xml) file to point to the downloaded license file.
* You can create the provisioning package using `buildprovpkg Provisioning.ProSKU` in the IoTADKAddon shell.

### Create using Windows Imaging and Configuration Designer(ICD)

The below steps show you the means to create the provisioning package using [Windows Imaging and Configuration Designer(ICD)](https://msdn.microsoft.com/library/windows/hardware/dn916113(v=vs.85).aspx).

**Step 2.1: New Provisioning Package**

![New Provisioning Package]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg1.png)

**Step 2.2: Enter Name & Project Folder for Provisioning Package**

![Enter Name & Project Folder for Provisioning Package]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg2.png)

**Step 2.3: Select "Windows 10 IoT Core"**

![Select Windows 10 IoT Core]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg3.png)

**Step 2.4: Select Finish**

![Select Finish]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg4.png)

**Step 2.5: Add the Setting EditionUpgrade->UpgradeEditionWithLicense and provide the License File as Input**

![Provide the License File as Input]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg5.png)

**Step 2.6: Select Export->Provisioning Package**

![Export Provisioning Package]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg6.png)

**Step 2.7: Fill in the Name and Version of the Provisioning Package**

![Export Name of Prov Package]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg7.png)

**Step 2.8: Click Next**

![Click Next]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg8.png)

**Step 2.9: Select the path to save Provisioning Package and Click Next**

![Select Path]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg9.png)

**Step 2.10: Select Build**

![Select Build]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg10.png)

**Step 2.11: The Provisioning Package is successfully created**

![Provisioning Package is successfully created]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg11.png)

## Step 3: Apply the provisioning package to the device
___
There are two ways to deploy the provisioning package to the device.

### Deploying at runtime

* Connect to the device ( [using SSH]({{site.baseurl}}/{{page.lang}}/Docs/SSH.htm) or [using Powershell]({{site.baseurl}}/{{page.lang}}/Docs/powershell.htm) )
* Copy the provisioning package (say `ProSKU.ppkg`) to `C:\OemInstall\` folder
* Call `provtool ProSKU.ppkg` to provision the device with this provisioning package.

### Deploying at image time

Follow the steps detailed in [Lab1d: Add a provisioning package to an image](https://msdn.microsoft.com/windows/hardware/commercialize/manufacture/iot/add-a-provisioning-package-to-an-image) to include this provisioning package into the image.
