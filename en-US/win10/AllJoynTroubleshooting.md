---
layout: default
title: AllJoyn Troubleshooting
permalink: /en-US/win10/AllJoynTroubleshooting.htm
lang: en-US
---

# AllJoyn Troubleshooting

[AllJoyn](https://allseenalliance.org/developers/learn) is a technology that enables IoT devices and applications to discover and interact with each other. Since AllJoyn is built into Windows 10 and the Windows 10 SDK, it's easy to take advantage of AllJoyn using the Universal Windows Platform (UWP).

![AJ_Troubleshooting_intro]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Troubleshooting_intro.jpg){:target="_blank"}

This blog post will help you configure your AllJoyn network and devices, and also provide troubleshooting steps to follow when things don't work as expected. The primary focus of this article will be enabling communication between UWP AllJoyn client apps (AllJoyn consumers) and AllJoyn devices (AllJoyn producers). Many of the same configuration steps are required to enable communication with UWP AllJoyn Producer apps, but further details will be left to future blog posts and articles.

### App Development Checklist

If you are writing UWP apps for Windows 10, you should make sure that:

1. You've declared the 'allJoyn' capability in your app's manifest (note casing).
2. You've selected the specific architecture that you'll be targeting. (Required in some cases because Windows Runtime Components cannot be built using 'Any CPU', a known issue with some Visual Studio 2015 builds).

If you are writing an app or device software that is not a UWP-based application for Windows 10, you should review the following checklist to ensure compatibility with AllJoyn in Windows 10:

1. If implementing a Producer, ensure that the About interface and About-based advertisement/discovery are being used. The About interface is [documented at the AllSeen Alliance website](https://allseenalliance.org/developers/learn/core/about-announcement/interface).
2. For best results, use the 15.04 AllJoyn code base, available in the [downloads section](https://allseenalliance.org/developers/download) of the AllSeen Alliance website.

### Network Setup and Troubleshooting

For AllJoyn devices to be able to discover and interact with each other, the network configuration and settings for each device must satisfy the following:

1. All AllJoyn devices are connected to the same network, and are on the same subnet.
2. Windows 10 PC: "Find devices and content" is enabled for the network in use with AllJoyn (does not apply for Phone).

On a PC you can use the trace route command from a CMD or PowerShell window to check if another machine/device is on the same subnet as follows:

	PS C:\Users\user> tracert WIN10PC1
	 
	Tracing route to WIN10PC1 [fe80::657d:d8bf:176f:d0b2%24]
	 
	over a maximum of 30 hops:
	 
	1       1 ms     1 ms     1 ms   WIN10PC1 [fe80::657d:d8bf:176f:d0b2]
	 
	Trace complete.

The first number output here is the number of hops, and since that value is "1" it means that both machines are on the same subnet.

Below is an example of a typical AllJoyn network setup. In this example, all of the devices shown would be able to discover and interact with each other using AllJoyn assuming they were on the same subnet.

![AJ_Troubleshooting_Devices]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Troubleshooting_Devices.jpg){:target="_blank"}

When you connect your Windows 10 PC to the network with AllJoyn devices, you'll need to click "Yes" if a dialog is displayed regarding finding devices and PCs on the network. (Note: This does not apply when joining networks from Windows 10 Phone as there is no such dialog).

You can also manage this setting in the "Advanced Settings" page in Wi-Fi settings as shown here: (this page may look slightly different depending on which Windows 10 Insider build you are using)

![AJ_Troubleshooting_Settings]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Troubleshooting_Settings.jpg){:target="_blank"}

The toggle for "Find devices and content" should be in the "On" position in order to enable AllJoyn functionality.

For existing network connections, you can easily validate whether this option is configured properly by running the "Get-NetConnectionProfile" Powershell cmdlet . (Note that this does not apply for Windows 10 Phone).

Example Get-NetConnectionProfile output:

	PS C:\Users\user> Get-NetConnectionProfile
	 
	Name             : myWirelessNetwork
	InterfaceAlias   : vEthernet (Intel(R) Dual Band Wireless-AC 7260 Virtual Switch)
	InterfaceIndex   : 24
	NetworkCategory : Private
	IPv4Connectivity : Internet
	IPv6Connectivity : LocalNetwork


If the "NetworkCategory" value is "Private" (as shown above), this indicates that you have a properly configured your network connection for AllJoyn.

### About Advertisement and Troubleshooting Discovery with Getajxml.exe

For AllJoyn producer devices or apps to be discoverable by Windows 10 UWP AllJoyn apps, About-based discovery must be properly implemented. This can be easily verified with the GetAjXml.exe tool. To find download and usage information related to GetAjXml.exe, check out [AllJoyn Studio](https://visualstudiogallery.msdn.microsoft.com/064e58a7-fb56-464b-bed5-f85914c89286).

The following shows GetAjXml.exe output for an example device that supports About-based discovery:

	----------------------------------------------------------------------
	Discovery   : About Announcement
	Manufacturer: Microsoft
	Model #     : 070773
	Device Name : Raspberry Pi Toaster
	Device ID   : 41d9a124-6913-40c5-a20a-9d1b20f8121b
	App Name   : Toaster Producer
	      Bus Name                       Port Object Path
	      ============================== ===== ===============================
	      :3yZG_wu1.2                       25 /emergency
	      :3yZG_wu1.2                       25 /info
	      :3yZG_wu1.2                       25 /notificationDismisser
	      :3yZG_wu1.2                       25 /notificationProducer
	      :3yZG_wu1.2                       25 /toaster
	      :3yZG_wu1.2                       25 /warning


In the above example, since `Discovery   : About Announcement` was included in this output, this AllJoyn producer will be discoverable by Windows 10 AllJoyn UWP apps. If you don't see this output for a particular AllJoyn producer, you will need to investigate the discovery implementation on the device (Producer) side.

### Advanced Troubleshooting with ETW Log Output

Event Tracing for Windows (ETW) can help you get advanced debugging information for many different features in Windows. Fortunately AllJoyn is one of the features with ETW logging support, so in this section I'll show you how to enable ETW logging for AllJoyn, and how to access logs.

1. Launch the Event Viewer by typing "Event Logs" into the Start Menu search textbox, select "View Event Logs".
2. In the "View" menu, ensure that "Show Analytic and Debug Logs" is checked.
3. Navigate the tree view in the left navigation to "Applications and Services Logs > Microsoft > Windows > AllJoyn" in the folder view, and enable both the Debug channel and the Operational channel. (see red box in screenshot below).
4. Reproduce the problem that you are experiencing with AllJoyn.
5. Click on "Refresh" in the right "Actions" bar, then check the Operational and Debug channels from the left navigation bar under the "AllJoyn" folder.

![AJ_Troubleshooting_ETW]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Troubleshooting_ETW.jpg){:target="_blank"}

AllJoyn ETW traces are partitioned as follows:

- Debug channel: Verbose, non-error/informational traces
- Operational channel: Error traces, errors are only output on the operational channel

In order to extract information from ETW entries, you can right-click on an entry in the list view for a given channel, and then select "Copy" and then "Copy Details as Text". If you then paste the corresponding text into a text editor, you'll have detail like the example below:


	Log Name:       Microsoft-Windows-AllJoyn/Operational
	Source:         Microsoft-Windows-AllJoyn
	Date:           6/1/2015 3:57:45 PM
	Event ID:     2
	Task Category: AJ
	Level:         Error
	Keywords:      (70368744177664),AJ
	User:         LOCAL SERVICE
	Computer:       <computer name>
	 
	Description:
	AllJoyn encountered an error 0x902D in module UDP, file ..\udptransport.cc, at line number 10809. See the event user data for more information.
	Event Xml:
	<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event">
	<System>
	   <Provider Name="Microsoft-Windows-AllJoyn" Guid="{2ED299D2-2F6B-411D-8D15-F4CC6FDE0C70}" />
	    <EventID>2</EventID>
	    <Version>0</Version>
	    <Level>2</Level>
	    <Task>1</Task>
	    <Opcode>10</Opcode>
	    <Keywords>0x8000400000000001</Keywords>
	   <TimeCreated SystemTime="2015-06-01T22:57:45.626729500Z" />
	    <EventRecordID>16</EventRecordID>
	   <Correlation />
	   <Execution ProcessID="1392" ThreadID="5768" />
	   <Channel>Microsoft-Windows-AllJoyn/Operational</Channel>
	    <Computer>computer name</Computer>
	   <Security UserID="SID" />
	</System>
	<UserData>
	   <AJErrorData xmlns="http://manifests.microsoft.com/win/2005/08/windows/alljoyn/events">
	       <QStatus>0x902d</QStatus>
	       <Message>UDPTransport::DisbleDiscovery(): Not running or stopping; exiting</Message>
	       <Module>UDP</Module>
	       <File>..\udptransport.cc</File>
	       <Line>10809</Line>
	    </AJErrorData>
	</UserData>
	</Event>


This information can help track down AllJoyn issues, or assist in providing detail when reporting issues to Microsoft or other partners. You can learn more about [ETW traces and the Event Viewer on MSDN](https://msdn.microsoft.com/en-us/library/windows/desktop/bb968803.aspx).

### Known Issues and Limitations

By-Design limitations for AllJoyn in Windows 10:

- The AllJoyn Router Node is not auto-started by AllJoyn devices or apps on the network when no apps are running on the Windows 10 PC. The Windows 10 Router Node can be started from an elevated command prompt or Powershell session by running the command "net start ajrouter".
- AllJoyn UWP apps can't discover or interact with other AllJoyn UWP apps or AllJoyn desktop apps running on the same machine. This is a part of the app isolation promise that is implemented in Windows 10 for UWP apps. 
  - If you deploy an AllJoyn UWP app from Visual Studio, app isolation app isolation is bypassed for that app (this is called a "loopback exemption "). Each UWP app that is deployed from Visual Studio will be able to discover and interact with other loopback-exempt UWP apps and desktop apps as long as those apps use About-based advertisement/discovery. If you are running Windows 10 IoT Core in "Embedded Mode", this loopback exception is automatically applied, it's not something that you need to configure. You can read more about loopback exceptions [on MSDN](https://msdn.microsoft.com/en-us/library/windows/apps/Hh780593.aspx).

