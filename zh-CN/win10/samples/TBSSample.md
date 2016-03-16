---
layout: default
title: TBS 示例应用程序
permalink: /zh-cn/win10/samples/TBSSample.htm
lang: zh-cn
---

#TBS 示例应用程序

本教程演示如何创建使用 TBS 轮询 TPM 的基本 C++ 应用程序。

*[TBS]: TPM 基本服务

##关于 TBS  
受信任的平台模块 \(TPM\) 基本服务 \(TBS\) 功能集中跨应用程序的 TPM 访问。TBS 功能使用调用应用程序指定的优先级来协调安排 TPM 访问。TBS 功能在 Windows 中运行为系统服务，并以远程过程调用 \(RPC\) 公开的 API 形式提供服务。

##先决条件  
* Microsoft Visual Studio 2015，版本 14.0.23107.10 或更高版本  
* SDK，版本 10.0.10240 或更高版本

##设备设置  
有关设置 MBM 和 RPi2 的说明的链接。

##使用 TBS 创建项目  

**创建新的 C++ 项目。** “文件”-\>“新建”-\>“项目”-\>“Visual C++”-\>“Windows”-\>“Windows IoT 核心版”-\>“空白 Windows IoT 核心版控制台应用程序”

![创建新项目图像]({{site.baseurl}}/Resources/images/TPM/TBS_NewProject.png)

**编辑项目属性...** 更新“其他依赖项”，以便链接器查找 TBS 库。*onecoreuap.lib;tbs.lib*

![项目属性图像]({{site.baseurl}}/Resources/images/TPM/TBS_LinkerDependencies.png)

**编写代码，它利用 TBS 库中通过 tbs.lib 公开的定义。** 编辑源文件 \(TBSSample.cpp\) 的内容。

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

**重新生成、部署和运行 TBSSample 应用程序。**

* “生成”-\>“重新生成解决方案”  
* 将可执行文件 TBSSample.exe 复制到 Windows IoT 核心版设备。  
* 在目标设备上运行该应用程序。你应该得到与如下所示相类似的打印输出。  

{% highlight console %}
C:\>TBSSample.exe

Trusted Platform Module Detected on Device - Discrete TPM

 TPM Version Number: 2.0
 TPM Struct Version: 1
 TPM Impl. Revision: 0
 TPM Interface Type: 1
{% endhighlight %}

##其他资源  
* TPM 基本服务 - \[https://msdn.microsoft.com/zh-cn/library/windows/desktop/aa446796\(v=vs.85\).aspx\]\(https://msdn.microsoft.com/zh-cn/library/windows/desktop/aa446796(v=vs.85).aspx){:target="_blank"}
* TSS.Net： 支持从托管代码访问 TPM - [http://research.microsoft.com/zh-cn/downloads/35116857-e544-4003-8e7b-584182dc6833/default.aspx](http://research.microsoft.com/zh-cn/downloads/35116857-e544-4003-8e7b-584182dc6833/default.aspx){:target="_blank"}
* TSS.MSR： Microsoft Research 的 TPM 软件堆栈 - [https://github.com/DMattoon/TSS.MSR](https://github.com/DMattoon/TSS.MSR){:target="_blank"}
* TPM 平台加密提供程序工具包 - [http://research.microsoft.com/zh-cn/downloads/74c45746-24ad-4cb7-ba4b-0c6df2f92d5d/default.aspx](http://research.microsoft.com/zh-cn/downloads/74c45746-24ad-4cb7-ba4b-0c6df2f92d5d/default.aspx){:target="_blank"}

