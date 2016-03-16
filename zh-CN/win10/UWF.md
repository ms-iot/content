---
layout: default
title: 使用适用于 Windows 10 IoT 核心版的统一写入筛选器
permalink: /zh-cn/win10/UWF.htm
lang: zh-cn
---
#在 Windows 10 IoT 核心版上使用统一写入筛选器

统一写入筛选器 \(UWF\) 可用于保护物理存储媒体以免数据写入。UWF 将拦截所有针对受保护卷的写入尝试，并将这些写入尝试重定向到虚拟覆盖。这可改进设备的可靠性和稳定性，同时减少写入敏感媒体（例如，诸如固态硬盘等闪存媒体）的损耗。

有关 UWF 的详细信息可从[此处](https://msdn.microsoft.com/zh-cn/windows/hardware/mt572001)获取。

##如何在运行 Windows 10 IoT 核心版的系统上安装 UWF
*             在开发系统上，下载 [UWF 安装程序包](http://go.microsoft.com/fwlink/?LinkId=708427)。
*             双击 `UWF.MSI`。安装完成后，x86 和 ARM 程序包将提取到 `C:\Program Files (x86)\Microsoft IoT\UWF`。启动 [Powershell](http://ms-iot.github.io/content/zh-cn/win10/samples/PowerShell.htm) 或 [ssh](http://ms-iot.github.io/content/zh-cn/win10/samples/SSH.htm)并访问运行 Windows 10 IoT 核心版的设备。
* 在 Powershell 或 ssh 中，执行以下操作：
  *           在目标计算机上创建临时文件夹（例如 ```C:\UWFTemp```）。
  *           根据目标计算机体系结构，将 x86 或 ARM UWF 程序包（包括语言包）从开发人员计算机复制到 `C:\UWFTemp`。
  *           运行以下命令，以将程序包安装到 IoT 设备系统映像：
    * `ApplyUpdate –stage C:\UWFTemp\Microsoft-IoTUAP-UnifiedWriteFilter-Package.cab`
    * `ApplyUpdate –stage C:\UWFTemp\Microsoft-IoTUAP-UnifiedWriteFilter-Package_Lang_zh-cn.cab`
    * `ApplyUpdate –commit`
*             设备将启动到更新操作系统、安装 UWF 功能，然后重新启动到 MainOS。
*             设备回到 MainOS 后，UWF 功能即准备就绪并可供使用。这可通过在 Powershell 或 SSH 窗口中键入 ```uwfmgr.exe``` 来进行验证。

  ![Windows 10 IoT 核心版上的 uwfmgr.exe]({{site.baseurl}}/Resources/images/uwfmgr.png)


##如何在自定义 FFU 中包含 UWF 
**注意：** 此过程适用于 OEM 和能够针对其 Windows 10 IoT 核心版设备创建自定义 FFU 的开发人员。这假定你已在开发计算机上安装了操作系统程序包，并且在 `C:\Program Files(x86)\Windows Kits\10` 下提供了 `FMFiles` 和 `OEMInputSamples` 文件夹。

*             在开发系统上，下载 [UWF 安装程序包](http://go.microsoft.com/fwlink/?LinkId=708427)。
*             双击 `UWF.MSI`。安装完成后，x86 和 ARM 程序包将提取到 `C:\Program Files (x86)\Microsoft IoT\UWF`。
*             将 `UWF Microsoft-IoTUAP-UnifiedWriteFilter-Package.cab` 和 `Microsoft-IoTUAP-UnifiedWriteFilter-Package_Lang_zh-cn.cab` 从 `C:\Program Files (x86)\Microsoft IoT\UWF\<arch>` 复制到 `C:\Program Files (x86)\Windows Kits\10\MSPackages\Retail\<arch>\fre\`。
*             创建 UWF 功能清单，并将其放入 `C:\Program Files (x86)\Windows Kits\10\FMFiles\<arch>\UWFFM.xml`。

{% highlight XML %}
<?xml version="1.0" encoding="utf-8"?>
<FeatureManifest xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://schemas.microsoft.com/embedded/2004/10/ImageUpdate">
  <BasePackages>
     <PackageFile Path="$(mspackageroot)\Retail\$(cputype)\$(buildtype)" Name="Microsoft-IoTUAP-UnifiedWriteFilter-Package.cab" Language="*" />
  </BasePackages>
  
  <Features>
    <Microsoft />
    <MSFeatureGroups />
    <OEM />     
    <OEMFeatureGroups />
  </Features>
</FeatureManifest>

{% endhighlight %}

*             打开 `C:\Program Files (x86)\Windows Kits\10\OEMInputSamples\MBM(or)RPi2(or)DragonBoard\RetailOEMInput\ProductionOEMInput.xml`，然后在 `AdditionalFMs` 下添加 `%AKROOT%\FMFiles\x86\UWFFM.xml`。
*             使用 [ICD imagegen](http://ms-iot.github.io/content/zh-cn/win10/CreateIoTCorePro.htm) 创建 image\\FFU。


##如何使用 UWF
可以通过 Powershell 或 SSH 会话使用 uwfmgr.exe 工具配置 UWF。

* 例如，以下命令组合可启用 uwfmgr 并配置为保护 C 驱动器

  `uwfmgr.exe filter enable` <br> `uwfmgr.exe volume protect c:`

**注意：** 设备需要重启才能将任何更改应用到 UWF 配置。

* 除以下列出的一些命令外，[此处](https://msdn.microsoft.com/zh-cn/windows/hardware/mt572002)还提供 uwfmgr.exe 选项的完整列表。查看覆盖配置的默认设置，并根据你的要求对其进行调整。

##保护数据卷

可以使用卷的 GUID 来保护 IoT 核心版中的数据卷。可以通过以下命令查找可用卷的 GUID

  `C:\dir /AL` <br> `uwfmgr.exe volume protect \\?\Volume {GUID}`


  ![在 Windows 10 IoT 核心版上保护卷]({{site.baseurl}}/Resources/images/uwfmgr_protect.png)

##不受支持的 uwfmgr.exe 命令
请注意，Windows 10 IoT 核心版上的 uwfmgr.exe 不支持以下列出的命令。

{% highlight XML %}
    Filter 
        Shutdown 
        Restart 

    Servicing 
        Enable 
        Disable 
        Update-Windows
{% endhighlight %}
