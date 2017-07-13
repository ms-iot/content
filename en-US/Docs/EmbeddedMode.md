---
layout: docs
title: Embedded mode
description: How to turn on Embedded Mode for Windows desktop and Windows Mobile editions
keyword: windows runtime, windows iot, embedded mode, capabilities
permalink: /en-US/Docs/EmbeddedMode.htm
lang: en-US
---

# Embedded mode

Windows and Windows Mobile can be configured to allow embedded mode. Embedded Mode enables

* Background Applications
* Use of the lowLevelDevice capability
* Use of systemManagement capability
* Soft-AP support

Embedded mode is enabled by default only on Window IoT Core and needs to be enabled on standard Windows and Windows Mobile.

## Background Applications

Background Applications are created using the Background Application (IoT) template in Visual Studio.  For more information about the Background Application (IoT) template see [Windows IoT Core Project Templates](https://go.microsoft.com/fwlink/?linkid=847472).  

Background applications run without stopping and have no resource limits enforced by resource manager. Also, if the background application stops for some reason and embedded mode is enabled the background application will be restarted by the system.  

While the system will automatically restart background applications, system lockdown features must be enabled to prevent users from stopping or interfering with the operation of Background Applications.

## lowLevelDevice Capability

The lowLevelDevice Capability (only on IoT Core) gives access to low-level hardware interfaces like GPIO, SPI, and I2C. 

* [Blinky Sample(GPIO)]({{site.baseurl}}/{{page.lang}}/Samples/helloblinky)
* [SPI Accelerometer Sample]({{site.baseurl}}/{{page.lang}}/Samples/SPIAccelerometer)
* [I2C Accelerometer Sample]({{site.baseurl}}/{{page.lang}}/Samples/I2CAccelerometer) 

## systemManagment Capability

When you enable the systemManagment capabilities for your appliction this is the set of APIs that gets unlocked:   

* [Windows.System.ProcessLauncher](https://msdn.microsoft.com/library/windows/apps/windows.system.processlauncher.aspx)
* [Windows.System.TimeZoneSettings](https://msdn.microsoft.com/library/windows/apps/windows.system.timezonesettings.aspx)
* [Windows.System.ShutdownManager](https://msdn.microsoft.com/library/windows/apps/windows.system.shutdownmanager.aspx)
* [Windows.Globalization.Language.TrySetInputMethodLanguageTag](https://msdn.microsoft.com/library/windows/apps/windows.globalization.language.trysetinputmethodlanguagetag.aspx)
* [AllJoyn loopback]({{site.baseurl}}/en-US/Docs/AllJoynTroubleshooting)

## Soft-AP Support

The below interface can be used in the embedded mode to support Soft-AP creation in Open/None Authentication mode. Note that not all hardware may support this functionality.

* [Windows.Devices.WiFiDirect.WiFiDirectLegacySettings](https://docs.microsoft.com/uwp/api/windows.devices.wifidirect.wifidirectlegacysettings)

See [IoTOnBoarding](https://developer.microsoft.com/windows/iot/samples/iotonboarding) sample.

## Debugging Background Applications 

If you are debugging on a device that is not running Windows IoT Core and you see either of the following error messages you need to ensure AllowEmbeddedMode is enabled on the device and that the Embedded Mode service is running:

* There are no more endpoints available from the endpoint mapper.
* This program is blocked by group policy. For more information, contact your system administrator.

## Changing the mode
To enable embedded mode you will need to create a provisioning package in Imaging and Configuration Designer (ICD) that sets AllowEmbeddedMode=1.  To install ICD you need to download and install the Windows ADK for Windows 10.

* <a href="http://go.microsoft.com/fwlink/p/?LinkId=526740">Download the Windows ADK for Windows 10</a>
* <a href="https://msdn.microsoft.com/library/windows/hardware/dn927348(v=vs.85).aspx">Learn about what's new in the Windows ADK for Windows 10</a>

1. When installing the ADK select **Imaging and Configuration Designer (ICD)**
2. After installation is complete run Windows Imaging and Configuration Designer (WICD).
    ![WICD Icon]({{site.baseurl}}/Resources/images/EmbeddedMode/WICD_Icon.png)

3. Click **Advanced provisioning**.  Name the project **AllowEmbeddedMode** and click **Next**.
    ![Step3]({{site.baseurl}}/Resources/images/EmbeddedMode/Step3.png)

4. Choose **Common to all Windows editions** then **Next**
    ![Step4]({{site.baseurl}}/Resources/images/EmbeddedMode/Step4.png)

5. Click **Finish**
    ![Step5]({{site.baseurl}}/Resources/images/EmbeddedMode/Step5.png)

6. In the search box type **EmbeddedMode** and then click on **AllowEmbeddedMode**
    ![Step6]({{site.baseurl}}/Resources/images/EmbeddedMode/Step6.png)

7. In the center pane set the value of **AllowEmbeddedMode** to **Yes**
    ![Step7]({{site.baseurl}}/Resources/images/EmbeddedMode/Step7.png)

8. Click Export>Provisioning Package
    ![Step8]({{site.baseurl}}/Resources/images/EmbeddedMode/Step8.png)

9. Click Next
    ![Step9]({{site.baseurl}}/Resources/images/EmbeddedMode/Step9.png)

10. Click Next
    ![Step10]({{site.baseurl}}/Resources/images/EmbeddedMode/Step10.png)

11. Click Next
    ![Step11]({{site.baseurl}}/Resources/images/EmbeddedMode/Step11.png)

12. Click Build.
    ![Step12]({{site.baseurl}}/Resources/images/EmbeddedMode/Step12.png)

13. Install the provisioning package (PPKG).
    * If enabling embedded mode on standard windows double-click on the PPKG. 
    * If enabling embedded mode on mobile drag the PPKG and drop it on the windows phone icon in explorer.
    ![Step13]({{site.baseurl}}/Resources/images/EmbeddedMode/Step13.png)

14. Click **Yes, add it**
    * On standard windows click yes on the LUA dialog if it appears, and the click **Yes, add it** on the dialog.
    ![Step14Standard]({{site.baseurl}}/Resources/images/EmbeddedMode/Step14Standard.png)
    * On mobile look at your phone and on the phone press the **Yes, add it** button.
    ![Step14Mobile]({{site.baseurl}}/Resources/images/EmbeddedMode/Step14Mobile.png)


## Configuring a Background Application to Run automatically
1. To configure a Background Application to automatically run you will need to follow the directions to [create an MinnowBoardMax SD Card]({{site.baseurl}}/{{page.lang}}/GetStarted) and copy D:\windows\system32\iotstartup.exe (where D: is your SD Card).

2. To get a list of installed Background Applications type:

        C:\> iotstartup list BackgroundApplication1

3. The output should include the full name of each installed Background Application, which will look like this:

        Headless : BackgroundApplication1-uwp_1.0.0.0_x86__cqewk5knvpvee

5. To configure this app to run at boot type:

        C:\> iotstartup add headless BackgroundApplication1

6. If the Background Application has been successfully added to the startup list you should see this:

        Added Headless: BackgroundApplication1-uwp_1.0.0.0_x86__cqewk5knvpveeplication1

7. Restart the embedded mode device:

8. Once the device has restarted, your Background Application will start automatically.  The Embedded Mode service which manages Background Applications can take a few minutes to start.  The embedded mode service will monitor Background Applications on the startup list and make sure they get restarted if they stops.  If a Background Application stops several times in a short period of time it will no longer be restarted.

9. To remove your Background Application from the startup list type:

        C:\> iotstartup remove headless BackgroundApplication1

10. If the Background Application is removed from the startup list the output will look like this:

        Removed headless: BackgroundApplication1-uwp_1.0.0.0_x86__cqewk5knvpvee

