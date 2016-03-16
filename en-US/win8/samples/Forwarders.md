---
layout: default
title: Forwarders and Stubs
permalink: /en-US/win8/samples/Forwarders.htm
lang: en-US
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>Support for Windows on Intel Galileo Gen 1 and Gen 2 will end on November 30, 2015</u></h4>
	<p><h5>As we continue to focus on providing a great experience for Makers with Windows 10 IoT Core, we've made the difficult decision to discontinue Windows support on the Galileo platform. We've seen some fantastic innovation with the platform, but unfortunately, it does not meet the minimum hardware requirements for Windows 10 IoT Core. Please click <a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">here</a> to learn more.</h5></p>
</div>

##Win32 API
The version of Windows for the Intel Galileo is based on a *MinCore* of Windows. It is designed to run in a smaller memory and storage footprint. Because of this, much of the Win32 API is not available for applications which target the Desktop version of Windows.

Win32 is a vast API, consisting of hundreds of thousands of application programming interfaces, spanning many technology stacks and language bindings. As the API set grew in size over the generations, it also grew in complexity and interconnectedness.

Over the last few releases of Windows, the Win32 API has been refactored to enable smaller versions of Windows to run on new form factors. As the API set was refactored, many APIs were included in the smaller versions of Windows, while many more APIs added to the larger versions of Windows. The desktop version Windows contains the whole API set.

If you want to run an application targeted for Desktop on a smaller device - like the Galileo, the APIs it needs from the operating system have to be made available - or the app won't run.

To make them available, there are a few options:

1. If you have access to the sources for the app you'd like to run, link against MinCore.lib instead of the default set of libraries for Desktop applications.
1. If the API is in Windows, but has moved, implement a Forwarder from the traditional API exposure to the new one.
1. If the API is missing, implement a stub which emulates the API as best as possible.

## API Sets
Windows on Galileo is derived from Windows Phone 8.1. This mobile edition of Windows uses the [Windows 8.1 API Set](http://msdn.microsoft.com/en-us/library/windows/desktop/hh802935(v=vs.85).aspx){:target="_blank"}.

##Diagnosing a failing application
When an application fails to load due to a missing API, you can diagnose it by turning on Windows Loader Snaps - a loader tool which shows which APIs are missing.

####Enable Windows Loader Snaps:

1. Telnet to your board
1. Determine the executable name for the binary you'd like to diagnose.
1. Enter the following command, replacing the executable name, `node.exe`:

{% highlight bash %}
reg add "HKLM\software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\node.exe" /v GlobalFlag /t REG_DWORD /d 0x2
{% endhighlight %}

In this case, we've enabled loader snaps for node.exe. Running this under visual studio, you will be told which APIs fail.

{% highlight bash %}
0744:00c8 @ 14911546 - LdrpNameToOrdinal - WARNING: Procedure "GetProcessWindowStation" could not be located in DLL at base 0x75A20000.
0744:00c8 @ 14911562 - LdrpReportError - ERROR: Locating export "GetProcessWindowStation" for DLL "c:\node\node.exe" failed with status: 0xc0000139.
First-chance exception at 0x7758342A (ntdll.dll) in node.exe: 0xC0000139: Entry Point Not Found.
{% endhighlight %}

Once you are done diagnosing a loader error, you can remove the loader snaps logging:

{% highlight bash %}
reg delete "HKLM\software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\node.exe"
{% endhighlight %}

##Forwarders
When building a DLL, you can specify that an export API exists in another DLL by modifying its Sources.def file. Refer to the [Windows 8.1 API Set](http://msdn.microsoft.com/en-us/library/windows/desktop/hh802935(v=vs.85).aspx){:target="_blank"} to check and see which DLLs contain which APIs.

For example, `CharLowerA()` would be forwarded as follows:
{% highlight bash %}
LIBRARY User32
EXPORTS
   ...
   CharLowerA = ms-win-downlevel-user32-l1-1-0.CharLowerA
   ...
{% endhighlight %}

## Stubs
Some APIs are missing from the Windows image as they make no sense in that context. In this case, you would include its name in the Sources.def file and add a stub, which allows linkage, but does something appropriate for the API:

{% highlight c++ %}
HWINSTA
WINAPI
GetProcessWindowStation(
VOID)
{
    return NULL;
}
{% endhighlight %}

## Forwarder and Stub Repository
To help with porting, a [Forwarder and Stub repository](http://github.com/ms-iot/forwarders){:target="_blank"} has been created. Please commit only those APIs needed to run specific tasks. Please follow the instructions in the [README](https://github.com/ms-iot/forwarders/blob/master/README.md){:target="_blank"}.

## Building and Deploying the Forwarder and Stubs

####To use the existing forwarder and stubs library:
1. Simply download the [forwarders project zip file](https://github.com/ms-iot/forwarders/archive/master.zip){:target="_blank"}.
1. Extract all of the files from the downloaded zip file.
1. Open the solution of the forwarder you require.

####Once you have downloaded the existing library or cloned and updated the forwarders and stubs solution, you will need to do the following steps to utilize them in your project:
1. Build the solution
1. Right click on the project, select 'Open in File Explorer'
1. Navigate up to the Release directory
1. Copy the binary to your deployment diretory - such as `User32.dll` to `\\mygalileo\c$\test`

---
[&laquo; Return to Samples](SampleApps.htm){: .btn .btn-default}
