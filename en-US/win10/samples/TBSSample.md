---
layout: default
title: TBS Sample Application
permalink: /en-US/win10/samples/TBSSample.htm
lang: en-US
---

# TBS Sample Application

This tutorial demonstrates how to create a basic C++ application that uses TBS to poll the TPM.

*[TBS]: TPM Base Services

## About TBS  
The Trusted Platform Module (TPM) Base Services (TBS) feature centralizes TPM access across applications. The TBS feature uses priorities specified by calling applications to cooperatively schedule TPM access.  
The TBS feature runs as a system service in Windows and provides services as an API exposed through remote procedure calls (RPC).

## Prerequisites  
* Microsoft Visual Studio 2015, version 14.0.23107.10 or above  
* SDK, version 10.0.10240 or above

## Device Setup  
Links to instructions on setting up MBM and RPi2 or RPi3.

## Create a project using TBS  

**Create a new C++ project.**  
File -> New -> Project -> Visual C++ -> Windows -> Windows IoT Core -> Blank Windows IoT Core Cosnsole Application

![Create New Project Image]({{site.baseurl}}/Resources/images/TPM/TBS_NewProject.png)

**Edit the project properties...**  
Update the "Additional Dependencies" so that the linker finds the TBS library.  
*onecoreuap.lib;tbs.lib*

![Project Properties Image]({{site.baseurl}}/Resources/images/TPM/TBS_LinkerDependencies.png)

**Write your code that utilizes the definitions in the TBS library exposed through tbs.lib.**  
Edit the contents of the source file (TBSSample.cpp).
{% highlight C++ %}
//
// Application to Detect TPM Interface Type and TPM Version.
//

#include "pch.h"
#include <Windows.h>
#include <tbs.h>
#include <iomanip>

using namespace std;

void main()
{
	TPM_DEVICE_INFO deviceInfo = { 0 };
	TBS_RESULT result = TBS_SUCCESS;
	double TPMVer(0);

	if ((result = Tbsi_GetDeviceInfo(sizeof(deviceInfo), &deviceInfo)) != TBS_SUCCESS)
	{
		if (result == TBS_E_TPM_NOT_FOUND)
		{
			wprintf(L"\nNo TPM Detected - Return Code: (0x%08x) \n", result);
		}
		else if (result == TBS_E_BAD_PARAMETER)
		{
			wprintf(L"\nGetDeviceInfo Failed with Incorrect Parameter - Return Code: (0x%08x) \n", result);
		}
		else
		{
			wprintf(L"\nUh oh, something went wrong but I don't know what... (0x%08x)\n", result);
		}
	}
	else
	{
		// Identify TPM version
		if (deviceInfo.tpmVersion == TPM_VERSION_12)
		{
			TPMVer = 1.2;
		}
		else if (deviceInfo.tpmVersion == TPM_VERSION_20)

		{
			TPMVer = 2.0;
		}
		else
		{
			TPMVer = 0;
		}

		// Identify TPM type
		if (deviceInfo.tpmInterfaceType == TPM_IFTYPE_1)
		{
			wprintf(L"\nTrusted Platform Module Detected on Device - Discrete TPM\n");
		}
		else if (deviceInfo.tpmInterfaceType == TPM_IFTYPE_TRUSTZONE)
		{
			wprintf(L"\nTrusted Platform Module Detected on Device - Frimware TPM with TrustZone\n");
		}
		else if (deviceInfo.tpmInterfaceType == TPM_IFTYPE_HW)
		{
			wprintf(L"\nTrusted Platform Module Detected on Device - Firmware TPM with Intel TEE\n");
		}
		else if (deviceInfo.tpmInterfaceType == TPM_IFTYPE_EMULATOR)
		{
			wprintf(L"\nTrusted Platform Module Detected on Device - Software Simulator ONLY (NOTE: This device is insecure and has no real TPM)\n");
		}
		else if (deviceInfo.tpmInterfaceType == TPM_IFTYPE_SPB)
		{
			wprintf(L"\nTrusted Platform Module Detected on Device - Discrete TPM with TIS on SPB\n");
		}
		else
		{
			wprintf(L"Trusted Platform Module Detected on Device - Unknown Interface\n");
		}

		// Print TPM specifics on screen
		cout << fixed << setprecision(1) << "\n TPM Version Number: " << TPMVer;  //deviceInfo.tpmVersion in standard form
		cout << "\n TPM Struct Version: " << deviceInfo.structVersion;
		cout << "\n TPM Impl. Revision: " << deviceInfo.tpmImpRevision;
		cout << "\n TPM Interface Type: " << deviceInfo.tpmInterfaceType << std::endl;
		cout << endl;
	}
}
{% endhighlight %}

**Rebuild, deploy and run the TBSSample application.**

* Build -> Rebuild Solution  
* Copy executable TBSSample.exe to your Windows IoT Core device.  
* Run the application on the target. You should expect printout similar to the one below.  
{% highlight console %}
C:\>TBSSample.exe

Trusted Platform Module Detected on Device - Discrete TPM

 TPM Version Number: 2.0
 TPM Struct Version: 1
 TPM Impl. Revision: 0
 TPM Interface Type: 1
{% endhighlight %}

## Additional Resources  
* TPM Base Services - [https://msdn.microsoft.com/en-us/library/windows/desktop/aa446796(v=vs.85).aspx](https://msdn.microsoft.com/en-us/library/windows/desktop/aa446796(v=vs.85).aspx){:target="_blank"}
* TSS.Net: Enabling Access to the TPM from Managed Code - [http://research.microsoft.com/en-us/downloads/35116857-e544-4003-8e7b-584182dc6833/default.aspx](http://research.microsoft.com/en-us/downloads/35116857-e544-4003-8e7b-584182dc6833/default.aspx){:target="_blank"}
* TSS.MSR: The TPM Software Stack from Microsoft Research - [https://github.com/DMattoon/TSS.MSR](https://github.com/DMattoon/TSS.MSR){:target="_blank"}
* TPM Platform Crypto-Provider Toolkit - [http://research.microsoft.com/en-us/downloads/74c45746-24ad-4cb7-ba4b-0c6df2f92d5d/default.aspx](http://research.microsoft.com/en-us/downloads/74c45746-24ad-4cb7-ba4b-0c6df2f92d5d/default.aspx){:target="_blank"}

