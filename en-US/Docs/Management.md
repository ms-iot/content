---
layout: default
title: Managing Windows 10 IoT Core Devices
description: Device Management for Windows 10 IoT Core is easy with Microsoft. Learn how the Universal Windows Platform makes it easy to use your favorite tools to also manage your IoT devices.
keyword: Device Management, OMA DM, Azure IoT DM, SCCM, Intune, CSP
permalink: /en-US/Docs/Management.htm
lang: en-US
---

# Managing Windows 10 IoT Core Devices

Windows 10 IoT Core devices can be managed using a traditional OMA DM MDM server that supports certificate based enrollment or using Azure IoT Hub's Device Management (currently in preview).  
 _Learn more about MDM and Windows 10 <a href="https://msdn.microsoft.com/library/windows/hardware/dn914769(v=vs.85).aspx" target="_blank">here</a>._  
 _Learn more about Azure IoT Hub Device Management <a href="https://azure.microsoft.com/en-us/documentation/articles/iot-hub-device-management-overview/" target="_blank">here</a>._  

For devices that are managed using a OMA DM server the MDM policies for Windows 10 IoT Core align with the policies supported in other editions of Windows 10. To learn more about policies, see Configuration service provider reference for Windows 10 at <a href="https://aka.ms/csplist" target="_blank">aka.ms/CSPList</a>. The MDM support in Windows 10 is based on Open Mobile Alliance (OMA) Device Management (DM) protocol 1.2.1 specification.

## How do I enroll an IoT Core device into a MDM?
___
MDM enrollment of an IoT Core device is accomplished using a Provisioning Package. Provisioning Packages can be created using Windows Image Configuration and Designer (WICD). Let's try enrolling a device into a MDM.

### Microsoft System Center Configuration Manager (Standalone or SCCM+Intune Hybrid)
1. Open the Configuration Manager Management Console (ConfigMgr Console)
2. Navigate to _Assets and Compliance > Compliance Settings > Company Resource Access > Certificate Profiles_
![ConfigMgr-Certificate-Profiles]
3. Click **Create Certificate Profile**
4. Provide a name and description for the profile
- Name: ConfigMgr Example Trusted Root Certificate
- Type of certificate profile: Trusted CA certificate  
![ConfigMgr-Certificate-Profiles-Wizard]
5. Click Next
6. Import the certificate file
7. Select **Computer certificate store - Root** for the **Destination Store**
8. Click Next
9. Choose **Select all** for Supported Platforms
![ConfigMgr-Certificate-Profiles-Wizard-Supported-Platforms]
10. Click Summary, Next, and Close

### Other MDM Servers
1. Download and install the Windows Assessment and Deployment Kit (Windows ADK) - <a href="https://developer.microsoft.com/en-us/windows/hardware/windows-assessment-deployment-kit" target="_blank">Get it here</a>
2. Open Windows Imaging and Configuration Designer (WICD)
![WICD-Start-Page]
3. Choose **Advanced Provisioning**
4. Set a name for your package
5. Choose settings common to Windows 10 IoT Core
6. Skip the Import Package step
![WICD-New-Project-Details] ![WICD-New-Project-Editions] ![WICD-New-Project-Import]
7. Navigate to Workplace -> Enrollments
8. In the UPN field enter the account you wish to enroll your device under (i.e. trmck@contoso.co) and click **Add**
![WICD-Workplace-Enrollments-UPN-Filled]
9. For AuthPolicy choose between Username Password based authentication (OnPremises) or Certificate based authentication
10. Enter the Discovery Service URL for your MDM server _Note: Enrollment Service URL and Policy Service URL are optional_
11. For the Secret enter  
- OnPremises: The password for the account you're enrolling with  
- Certificate: The thumbprint of the certificate
![WICD-Workplace-Enrollments-UPN-Details-Filled-OnPremise]  

## What can be managed on an IoT Core device?
___
There are over a hundred of items that can be managed on a Windows 10 IoT Core device. For a full list of items please visit the Windows 10 Configuration Service Provider reference located at <a href="https://aka.ms/CSPList" target="_blank">aka.ms/CSPList</a>

[ConfigMgr-Certificate-Profiles]: /content/Resources/images/Management/ConfigMgr-Certificate-Profiles.PNG "SCCM Certificate Profiles"
[ConfigMgr-Certificate-Profiles-Wizard]: /content/Resources/images/Management/ConfigMgr-Certificate-Profiles-Wizard.PNG "Create Certificate Profile Wizard"
[ConfigMgr-Certificate-Profiles-Wizard-Supported-Platforms]: /content/Resources/images/Management/ConfigMgr-Certificate-Profiles-Wizard-Supported-Platforms.PNG "Create Certificate Profile Wizard - Supported Platforms"
[WICD-Start-Page]: /content/Resources/images/Management/WICD-Start-Page.PNG "Windows Imaging and Configuration Designer (WICD)"
[WICD-New-Project-Details]: /content/Resources/images/Management/WICD-Advanced-Provisioning-New-Project-Details.PNG "WICD New Project Details"
[WICD-New-Project-Editions]: /content/Resources/images/Management/WICD-Advanced-Provisioning-New-Project-Editions.PNG "WICD New Project Edition Settings"
[WICD-New-Project-Import]: /content/Resources/images/Management/WICD-Advanced-Provisioning-New-Project-Import.PNG "Figure 2"
[WICD-Workplace-Enrollments-UPN]: /content/Resources/images/Management/WICD-Workplace-Enrollments-UPN.PNG "Workplace Enrollments"
[WICD-Workplace-Enrollments-UPN-Filled]: /content/Resources/images/Management/WICD-Workplace-Enrollments-UPN-Filled.PNG "Figure 2"
[WICD-Workplace-Enrollments-UPN-Details-Filled-OnPremise]: /content/Resources/images/Management/WICD-Workplace-Enrollments-UPN-Details-Filled-Premise.PNG "Figure 2"

<!--/content/Resources/images/Management/.PNG "Caption"-->