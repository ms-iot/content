---
layout: docs
title: Enabling internet connection sharing
description: Learn how to enable internet connection sharing on your IoT Core device by bridging a software Wi-Fi access point and ethernet adapter
keyword: ics, windows iot, remote, networking
permalink: /en-US/Docs/InternetConnectionSharing.htm
lang: en-US
---
# Internet connection sharing

This document describes how internet connection sharing (ICS) can be enabled on Windows 10 IoT Core. Developers can use the NetworkTetheringManager API to configure ICS programmatically. The API is described in the [NetworkOperatorTetheringManager](https://msdn.microsoft.com/en-us/library/windows/apps/windows.networking.networkoperators.networkoperatortetheringmanager.aspx){:target="_blank"} class.
When using one of the [Windows 10 IoT Core Release Image](https://developer.microsoft.com/en-us/windows/iot/downloads){:target="_blank"} ICS can also be configured using the device portal.

## Configuring ICS using the device portal
Windows Device Portal (WDP) provides all settings needed to enable ICS. In WDP navigate to the **IoT Onboarding** tab to find these settings. The device needs at least one Wi-Fi adpater that supports a software access point (SoftAP) configuration and one adapter that provides that Internet connection that will be shared.

1. **Start** and **Stop** shared access
2. **Adapter configuration** to select the network adapters used in the ICS setup.
3. **SoftAP settings** to set the SSID and password that devcies will use to conenct to the SoftAP that is exposed by the Windows IoT Core device.
4. **AllJoyn onboarding settings** can be enabled to use an AllJoyn application to connect the device to a Wi-Fi network. Through this capability the device can be onboarded later to a Wi-Fi network if no other form of configuration is availabe.

	
![ICS Configuration]({{site.baseurl}}/Resources/images/InternetConnectionSharing/Portal_ICS_1.png)


## ICS code sample
The code sample below demonstrates how the [NetworkOperatorTetheringManager](https://msdn.microsoft.com/en-us/library/windows/apps/windows.networking.networkoperators.networkoperatortetheringmanager.aspx){:target="_blank"} API is used to start sharing an Ethernet connection over Wi-Fi. The CreateFromConnectionProfile method accepts arguments that specifies the public and private interface. In any cases of misconfiguration, such as the Wi-Fi radio is turned off, or Ethernet has limited connectivity, then the attempt to start internet sharing conveys an appropriate error code pertaining to this scenario.


{% highlight console %}
using Windows.Networking.NetworkOperators;
using Windows.Networking.Connectivity; 

// Find the Ethernet profile
var connectionProfiles = NetworkInformation.GetConnectionProfiles(); 
var ethernetConnectionProfile = connectionProfiles.FirstOrDefault(x => x.IsEthernetConnectionProfile); 

// Find an 802.11 wireless network interface (IANA Type 71)
var networkAdapters = NetworkInformation.GetNetworkAdapters();
var targetNetworkAdapter = networkAdapters.FirstOrDefault(x => x.IanaInterfaceType == 71);

if (ethernetConnectionProfile != null && targetNetworkAdapter != null)
{
    var tetheringManager = NetworkOperatorTetheringManager.CreateFromConnectionProfile(ethernetConnectionProfile, targetNetworkAdapter); 

    var result = await tetheringManager.StartTetheringAsync(); 
    if (result.Status == TetheringOperationStatus.Success)
    {
        UpdateUI();
    }
    else
    {
        ProcessTetheringError(result);
    }
}
{% endhighlight %}

If you using the Windows IoT Core November 2015 Release you need to follow the instructions decribed in the Internet [Connection Sharing Tutorial (Windows IoT Core November 2015 Release)]({{site.baseurl}}/{{page.lang}}/Docs/InternetConnectionSharingIoTCoreNov2015.htm) document.
