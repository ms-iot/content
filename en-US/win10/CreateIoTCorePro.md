---
layout: default
title: Create a Windows 10 IoT Core Pro Image
permalink: /en-US/win10/CreateIoTCorePro.htm
lang: en-US
---

# Creating a Windows 10 IoT Core Pro Image

Here are the steps involved in creating an Enterprise Image

* Download Windows 10 IoT Core Pro License File and ICD.
* Create a Provisioning Package with License File.
* Wrap the Provisioning Package in a OEM Package.
* Create an Image with ICD/Imggen.


Step 1: Download Windows 10 IoT Core Pro License File and ICD.
-------

Please go to [Windows 10 IoT Core Commericialization](http://go.microsoft.com/fwlink/?LinkID=614849) and select Windows 10 IoT Core Pro to find a distributor near you and download the Windows 10 IoT Core Pro License File.

Please install the Windows ADK and ICD.

Step 2: Create a Provisioning Package with License File using ICD
-------

**Step 2.1: New Provisioning Pacakge**

![New Provisioning Package]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg1.png)

**Step 2.2: Enter Name & Project Folder for Provisioning Pacakge**

![Enter Name & Project Folder for Provisioning Pacakge]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg2.png)

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

Step 3: Wrap the Provisioning Package in an OEM Package
-------

Create a OEM Package to wrap the Provisioning Package using PKGGEN tool.
 
Please visit [Windows 10 IoT Core Image Creation](https://blogs.msdn.microsoft.com/iot/2015/12/14/windows-10-iot-core-image-creation) for instructions regarding creating an OEM Package that contains your Provisioning Package using PKGGEN tool.
 
Step 4: Create the Image with ICD/Imggen
-------
 
Use ICD to create a Windows IoT Core Image with your OEM Package.

Please visit [Windows 10 IoT Core Image Creation](https://blogs.msdn.microsoft.com/iot/2015/12/14/windows-10-iot-core-image-creation) for instructions regarding using ICD to create a Windows IoT Core Image with your OEM Package.