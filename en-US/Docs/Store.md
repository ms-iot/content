---
layout: docs
title: Installing and Servicing apps on Windows 10 IoT Core
description: Windows 10 makes it easy to publish, install and service apps on IoT Core using Universal Windows Store.
keyword: UWP,Windows Dev Center,OEM,Preinstall,App Store,Servicing
permalink: /en-US/Docs/Store.htm
lang: en-US
---

# Installing and Servicing apps on Windows 10 IoT Core

Microsoft makes it easy for OEMs to install and service UWP apps on Windows 10 IoT Core through the Universal Store. All store signed apps on Windows 10 devices are capable of receiving updates directly from the store. 

{% include note.html text="Preinstall and servicing of store signed apps is only available to Windows 10 IoT Core Pro customers. If you are an OEM wishing to preinstall apps on your IoT devices please visit our [Commercialization](https://www.windowsforiotdevices.com) page to get started. If you are developer wishing to preinstall apps for IoT you must seek sponsorship from an OEM enrolled in the program." %}

## Publishing UWP to Universal Store
___
Members of the Windows Store OEM Preinstall program have special permissions in their Windows Dev Center account that allows a store signed version of an app to be downloaded. It is important to first be enrolled in the program before creating any app submissions. The publishing process following the additional permission is the same as other Windows 10 devices. The first step is to [create an app submission](https://msdn.microsoft.com/en-us/windows/uwp/publish/app-submissions). 

### Special Instructions for Headless Apps 
___
In order for headless apps to meet store compliance there needs to be a "head" associated with the app. In order to add this "head" to our headless app we need to 

1. Create a new Blank XAML project in Visual Studio.
2. Build the new project under release configuration
3. Navigate to \<New Project Folder>/bin/Release/<Architecture>/
Locate file titled <Name of your project>.exe
Copy the file to the directory of your headless app project
4. Include the newly added file to the Visual Studio project and set to "Copy Always"
5. Open the Package.appxmanifest in Code mode (right-click and choose View Code) for the headless app and modify the following:  
  * Add the attribute _Executable="\<Filename of .exe copied to project>.exe"_ to the element _Application_
  * Add the attribute _EntryPoint="\<Namespace of Blank XAML project>.App"_ to the element _Application_
  * Remove the AppListEntry attribute from the element _uap:VisualElements_

___
3. With the app submission created the next step is to [package the UWP app](https://msdn.microsoft.com/en-us/windows/uwp/packaging/packaging-uwp-apps) and upload to the app submission in Windows Dev Center. For IoT Core it is important to set  **Generate app bundle** to **Never**. This will allow the Windows Dev Center to generate the correct package for preinstall on IoT Core.

4. Submit the submission to being the certification process. The certification process usually will take 24-48hrs after which the app will either be immediately published or available to publish based on the publishing option chosen when creating your submission. 

## Preinstalling an App
___
Now that an app has been published to the Universal Store the app has a store signed version that can be used to preinstall the app on devices.

1. In the Windows Dev Center account click App Management > Current Packages on the left hand navigation bar
2. Under the most recent App submission click "Dowland Windows 10 package". This will download a zip file containing the app package, the dependency packages, and the license files
3. There are two methods available to install an app to a device

### Method 1
The first method is adding the app to the image during the imaging process. Check out the [Adding an App to your image](https://msdn.microsoft.com/en-us/windows/hardware/commercialize/manufacture/iot/deploy-your-app-with-a-standard-board) guide on MSDN. 

### Method 2
The second method is using Windows Imaging and Configuration Designer (WICD) to create a provisioning package. The provisioning package will install the app upon boot. This method is more common to devices that have already been deployed.

1. Launch Windows Imaging and Configuration Designer (WICD)
2. Select Advanced Provisioning
3. Enter the project name and a description
4. Choose Windows 10 IoT Core for the project settings
5. Skip the provisioning package import
6. On the left hand side expand Runtime Settings and click on Universal App Install > User Context App
7. Enter the Package Family Name of your app and click Add  
{% include note.html text="The PFN can be found in the Windows Dev Center under App Management > App Identity" %}
8. Under the newly added PFN add the Appx and its dependencies
9. Set the DeploymentOptions to "Force target application shutdown"
10. Export the package
11. Copy the exported .ppkg file to _C:\Windows\Provisioning\Packages_ on the IoT device you wish to install the app on and reboot.
12. Alternatively you can include the .ppkg file in your image when building. Check out the [Add a provisioning package to an image](https://msdn.microsoft.com/en-us/windows/hardware/commercialize/manufacture/iot/add-a-provisioning-package-to-an-image) guide on MSDN.

## Updating an App
___
Updating apps on IoT Core are very simple.

1. In the Windows Dev Center create a new App Submission for the app to be updated
2. In Visual Studio package the app as done earlier in Step 3 in the _Publishing UWP to Universal Store_ section.   
_Note: Be sure to increment the version number for each new package_
3. Upload the package to Windows Dev Center under the new submission and submit
4. Following the app certification process devices will update the app to the latest version.  
{% include note.html text="App updates on devices can take up to 24 hours to receive latest version" %}