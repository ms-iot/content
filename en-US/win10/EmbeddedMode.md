---
layout: default
title: Embedded Mode
permalink: /en-US/win10/EmbeddedMode.htm
lang: en-US
---

## Embedded mode

Windows and Windows Mobile can be configured allow embedded mode. This enables packages to implement background applications.  It also enables applications to declare and use lowLevelDevice and systemManagement capabilities.

Embedded mode is only enabled by default on Window IoT Core and must be enabled on standard Windows and Windows Mobile.

If you are debugging on a device that is not running Windows IoT Core and you see either of the following error messages you need to ensure AllowEmbeddedMode is enabled on the device and that the Embedded Mode service is running:
* There are no more endpoints available from the endpoint mapper.
* This program is blocked by group policy. For more information, contact your system administrator.

## Changing the mode
To enable embedded mode you will need to create a provisioning package in Imaging and Configuration Designer (ICD) that sets AllowEmbeddedMode=1.  To install ICD you need to download and install the Windows ADK for Windows 10.

* <a href="http://go.microsoft.com/fwlink/p/?LinkId=526740">Download the Windows ADK for Windows 10</a>
* <a href="https://msdn.microsoft.com/library/windows/hardware/dn927348(v=vs.85).aspx">Learn about what's new in the Windows ADK for Windows 10</a>

1. When installing the ADK select the four checkboxes shown below.

    ![ADK Install]({{site.baseurl}}/Resources/images/EmbeddedMode/ICD.png)

2. After installation is complete run Windows Imaging and Configuration Designer (WICD).
    ![WICD Icon]({{site.baseurl}}/Resources/images/EmbeddedMode/WICD_Icon.png)

3. Create new provisioning package
    ![Step3]({{site.baseurl}}/Resources/images/EmbeddedMode/Step3.png)

4. Choose "Common to all Windows editions" then "Next"
    ![Step4]({{site.baseurl}}/Resources/images/EmbeddedMode/Step4.png)

5. Click "Finish"
    ![Step5]({{site.baseurl}}/Resources/images/EmbeddedMode/Step5.png)

6. In the search box type "EmbeddedMode" and then click on AllowEmbeddedMode
    ![Step6]({{site.baseurl}}/Resources/images/EmbeddedMode/Step6.png)

7. In the center pane set the value of AllowEmbeddedMode to 1
    ![Step7]({{site.baseurl}}/Resources/images/EmbeddedMode/Step7.png)

8. Click Export>Provisioning Package
    ![Step8]({{site.baseurl}}/Resources/images/EmbeddedMode/Step8.png)

9. Click Next
    ![Step9]({{site.baseurl}}/Resources/images/EmbeddedMode/Step9.png)

10. Click Next
    ![Step10]({{site.baseurl}}/Resources/images/EmbeddedMode/Step10.png)

11. Click Next
    ![Step11]({{site.baseurl}}/Resources/images/EmbeddedMode/Step11.png)

12. Click Build
    ![Step12]({{site.baseurl}}/Resources/images/EmbeddedMode/Step12.png)

13. Install the provisioning package (PPKG).
    * If enabling embedded mode on standard windows double-click on the PPKG. 
    * If enabling embedded mode on mobile drag the PPKG and drop it on the windows phone icon in explorer.
    ![Step13]({{site.baseurl}}/Resources/images/EmbeddedMode/Step13.png)

14. Click "Yes, add it"
    * On standard windows click yes on the LUA dialog if it appears, and the click "Yes, add it" on the dialog.
    ![Step14Standard]({{site.baseurl}}/Resources/images/EmbeddedMode/Step14Standard.png)
    * On mobile look at your phone and on the phone press the "Yes, add it" button.
    ![Step14Mobile]({{site.baseurl}}/Resources/images/EmbeddedMode/Step14Mobile.png)
