---
layout: default
title: Headed/Headless Mode
permalink: /win10/HeadlessMode.htm
---

<div class="container" markdown="1">

##Headed and Headless mode

Windows IoT Core can either be in headed or headless mode.  The difference between these two modes is the presence or absence of any form of UI.  By default, Windows 10 IoT Core is in headed mode and displays system information like the computer name and IP address.  In the headed mode, the standard UAP UI stack is available for fully interactive apps.  In headless mode, there is no UI stack available and apps are not interactive.  Headless mode apps can be thought of as services.

    NOTE: if you put your device into headless mode, the default app will not be available to display the IP address, so be sure to make a note of your device's name and IP address.

You can modify the headed/headless state of your device from a PowerShell session.  To review the PowerShell details, look [here]({{site.baseurl}}/win10/Samples/PowerShell.htm).

* To display the current state of your device, use the `setbootoption` utility like this:

        setbootoption.exe

* To modify the state of your device to enable headless mode, use the `setbootoption` utility with the `headless` arg:

        setbootoption.exe headless
        shutdown /r /t 0

* To modify the state of your device to enable headed mode, use the `setbootoption` utility with the `headed` arg:

        setbootoption.exe headed
        shutdown /r /t 0


</div>