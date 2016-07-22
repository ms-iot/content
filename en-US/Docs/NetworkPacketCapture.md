---
layout: docs
title: Use Microsoft Message Analyzer to perform network packet capture
description: Use Microsoft Message Analyzer to perform network packet capture
keyword: network, windows iot, Microsoft Message Analyzer
permalink: /en-US/Docs/NetworkPacketCapture.htm
lang: en-US
---

# Network packet capture

You can use [Microsoft Message Analyzer](http://www.microsoft.com/en-us/download/details.aspx?id=44226){:target="_blank"} to capture, display, and analyze protocol messaging traffic on your Windows 10 IoT Core device.

![Message Analyzer]({{site.baseurl}}/Resources/images/packetcapture/message-analyzer.png)

## Set up your device

In order to connect to your device using Message Analyzer, you need to first rename your device.  This can be done through [SSH]({{site.baseurl}}/{{page.lang}}/Docs/SSH.htm){:target="_blank"} or 
[PowerShell]({{site.baseurl}}/{{page.lang}}/Docs/PowerShell.htm){:target="_blank"} using the `setcomputername` command.

![PowerShell Rename Device]({{site.baseurl}}/Resources/images/packetcapture/powershell-rename-device.png)

After you rename your device, reboot the device to apply the name change.

## Turn off the firewall

Connect to your device using PowerShell or SSH and run the following command to disable the firewall.
    
    netsh advfirewall set allprofiles state off
    
## Connect to your device using Message Analyzer

Now that your device is set up, let's connect to it using Microsoft Message Analyzer.

1. Download Microsoft Message Analyzer from [here](http://www.microsoft.com/en-us/download/details.aspx?id=44226){:target="_blank"}.

2. Open Message Analyzer.

3. Click on `New Session`.

    ![Message Analyzer]({{site.baseurl}}/Resources/images/packetcapture/message-analyzer-new-session.png)
    
4. In the window that opens, click on the `Live Trace` button.

    ![Message Analyzer]({{site.baseurl}}/Resources/images/packetcapture/message-analyzer-live-trace.png)
    
5. Click on the `Edit...` button.

    ![Message Analyzer]({{site.baseurl}}/Resources/images/packetcapture/message-analyzer-edit-button.png)
    
6. Replace Localhost with the name of your IoT device, and enter the administrator user name and password.  Then click `OK`.

    ![Message Analyzer]({{site.baseurl}}/Resources/images/packetcapture/message-analyzer-edit-target-computers.png)

7. Click on the `Select a trace scenario` dropdown and select `Local Network Interfaces`.

    ![Message Analyzer]({{site.baseurl}}/Resources/images/packetcapture/message-analyzer-trace-scenario.png)

8. Click the `Start` button.

9. You should start to see the messages going through the network interfaces on your device.

    ![Message Analyzer]({{site.baseurl}}/Resources/images/packetcapture/message-analyzer.png)
    
10. After you start the trace through Message Analyzer, you can also view the ETW messages from the packet capture driver in your device's [web interface]({{site.baseurl}}/{{page.lang}}/Docs/tools/Webb.htm){:target="_blank"}.  To do this, go to the ETW tab of the web interface, select `Microsoft-Windows-NDIS-PacketCapture` from the `Registered providers` dropdown menu and click the `Enable` button.

    ![Message Analyzer]({{site.baseurl}}/Resources/images/packetcapture/web-etw.png)    
