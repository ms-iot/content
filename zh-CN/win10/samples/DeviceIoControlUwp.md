---
layout: default
title: DeviceIoControlUwp
permalink: /zh-cn/win10/samples/DeviceIoControlUwp.htm
lang: zh-cn
---

## DeviceIoControlUwp 示例

{% include VerifiedVersion.md %}

[在 Github 上查看代码](https://github.com/ms-iot/samples/blob/develop/DeviceIoControlUwp)

此示例演示如何使用熟悉的 win32 API（如 CreateFile\(\)、ReadFile\(\)、WriteFile\(\) 和 DeviceIoControl\(\)）从 UWP 应用程序访问设备。可能想要执行此操作的一些原因包括：

 - 具有的现有代码使用 CreateFile\(\)/DeviceIoControl\(\)
 - 喜欢 win32 API 的编程模型多过 Windows.Devices.Custom
 - 应用程序需要 win32 API 的性能
 - 需要同步打开设备，因为该设备驱动程序需要它，或者需要利用 FastIO

尽管在你拥有的设备上通过旁加载应用程序可以调试和部署此应用，但无法将使用不受支持的 API 的应用上载到 Windows 应用商店。

所涉及的高级别步骤如下：

 1. 创建 C++/CX UWP 应用程序
 2. 在 vcxproj 文件中，将名为 `_NoWinAPIFamilyApp` 的 msbuild 属性设置为 `true`
 3. 在代码中使用 CreateFile/ReadFile/WriteFile/DeviceIoControl
 4. 使设备可以访问 appcontainer 进程

此演练使用作为示例设备的 MinnowBoardMax 上的 COM 端口。MinnowBoardMax 具有 3 个 COM 端口 - 26 排针上两个高速 UART 以及单独的 6 排针上受 serial.sys 控制的一个传统 COM 端口。两个高速 UART 已面向 UWP 应用程序公开，但并未公开 COM 端口。本演练演示如何从 UWP 应用程序访问 COM 端口。

## 向用户模式公开 COM 端口

在我们可以访问 COM 端口之前，需要在设备的硬件键下添加 `PortName` 注册表值，以便 serial.sys 可以创建一个设备接口和符号链接。在桌面版风格的 Windows 上，由端口类共同安装程序 \(msports.dll\) 执行上述操作，但因共同安装程序在基于 OneCore 的版本上不受支持，因此需要手动添加此注册表项。

    Reg add "HKLM\SYSTEM\ControlSet001\Enum\ACPI\PNP0501\1\Device Parameters" /v PortName /t REG_SZ /d COM1
    Devcon restart acpi\pnp0501

如果现在运行 `mincomm -list`，应可以在 COM 端口的列表中看到 ACPI\\PNP0501\\1。可在 [https://github.com/ms-iot/samples/tree/develop/MinComm](https://github.com/ms-iot/samples/tree/develop/MinComm) 处找到 Mincomm。

## 支持在 C++/CX UWP 应用程序中访问桌面版 API

创建一个新项目，方法是转到“文件”-\>“新建”-\>“项目”-\>“Visual C++”-\>“Windows”-\>“通用”-\>“空白应用\(通用 Windows\)”，然后单击“确定”。

在文本编辑器中打开 .vcxproj 文件，然后将 `<_NoWinAPIFamilyAPP>` 元素添加到第一个 PropertyGroup 元素：

<pre>
&lt;PropertyGroup Label="Globals">
    &lt;ProjectGuid>...&lt;/ProjectGuid>
    ...
    &lt;!-- 添加以下属性以使桌面版 API 在编译时可见。 -->
    <b>&lt;_NoWinAPIFamilyApp>true&lt;/_NoWinAPIFamilyApp></b>
&lt;/PropertyGroup>
</pre>

当定义 `_NoWinAPIFamilyApp` 时，它会使 `WINAPI_FAMILY` 保留为未定义，而不是定义为 `WINAPI_FAMILY_APP`。如果未定义 `WINAPI_FAMILY`，它将默认为 `WINAPI_FAMILY_DESKTOP_APP`，这使桌面版 API 在编译时可见。C:\\Program Files \(x86\)\\MSBuild\\Microsoft.Cpp\\v4.0\\V140\\Microsoft.Cpp.AppContainerApplication.props 引用 `_NoWinAPIFamilyApp` 属性，如下所示：

    <PreprocessorDefinitions Condition="'$(_NoWinAPIFamilyApp)' != 'true'">%(PreprocessorDefinitions);WINAPI_FAMILY=WINAPI_FAMILY_APP</PreprocessorDefinitions>

有关 API 系列的详细信息，请参阅 SDK 中的 winapifamily.h。

我们还需要链接到 onecoreuap.lib，这将导出基于 OnecoreUAP 的版本上的所有可用符号。紧跟在包含 `PackageCertificateKeyFile` 元素的 PropertyGroup 后面添加包含 onecoreuap.lib 的 `AdditionalDependencies` 元素。

<pre>
&lt;PropertyGroup>
    &lt;PackageCertificateKeyFile>DeviceIoControlUwp_TemporaryKey.pfx&lt;/PackageCertificateKeyFile>
&lt;/PropertyGroup>
<b>&lt;!-- 链接到 onecoreuap.lib，以便我们可以使用 CreateFile() 和好友。 -->
&lt;ItemDefinitionGroup>
    &lt;Link>
        &lt;AdditionalDependencies>onecoreuap.lib;%(AdditionalDependencies)&lt;/AdditionalDependencies>
    &lt;/Link>
&lt;/ItemDefinitionGroup></b>
</pre>

## 在应用程序中使用 CreateFile/DeviceIoControl

将以下代码添加到 pch.h：

{% highlight C++ %}

    #include <strsafe.h>
    #include <winioctl.h>

    // Undefine symbols to avoid collision with ntddser.h
    #undef SERIAL_LSRMST_ESCAPE
    #undef SERIAL_LSRMST_LSR_DATA
    #undef SERIAL_LSRMST_LSR_NODATA
    #undef SERIAL_LSRMST_MST
    #undef SERIAL_IOC_FCR_FIFO_ENABLE
    #undef SERIAL_IOC_FCR_RCVR_RESET
    #undef SERIAL_IOC_FCR_XMIT_RESET
    #undef SERIAL_IOC_FCR_DMA_MODE
    #undef SERIAL_IOC_FCR_RES1
    #undef SERIAL_IOC_FCR_RES2
    #undef SERIAL_IOC_FCR_RCVR_TRIGGER_LSB
    #undef SERIAL_IOC_FCR_RCVR_TRIGGER_MSB
    #undef SERIAL_IOC_MCR_DTR
    #undef SERIAL_IOC_MCR_RTS
    #undef SERIAL_IOC_MCR_OUT1
    #undef SERIAL_IOC_MCR_OUT2
    #undef SERIAL_IOC_MCR_LOOP

    #include <ntddser.h>
    #include <wrl.h>

{% endhighlight %}

将以下代码添加到 Mainpage.xaml.cpp：

{% highlight C++ %}

    void AccessComPort ()
    {
        using namespace Microsoft::WRL::Wrappers;

        // Open the COM port synchronously for simplicity.
        // You'll almost always want to use FILE_FLAG_OVERLAPPED
        // for COM ports.
        FileHandle fileHandle(CreateFile(
            L"\\\\.\\COM1",
            GENERIC_READ | GENERIC_WRITE,
            0,
            nullptr,
            OPEN_EXISTING,
            FILE_ATTRIBUTE_NORMAL /*FILE_FLAG_OVERLAPPED*/,
            nullptr));

        if (!fileHandle.IsValid()) {
            DWORD lastError = GetLastError();
            throw ref new Exception(                // set a breakpoint here
                HRESULT_FROM_WIN32(lastError),
                L"Failed to open COM port.");
        }

        DWORD information;
        SERIAL_BAUD_RATE inputBuffer = { 115200 };
        if (!DeviceIoControl(
                fileHandle.Get(),
                IOCTL_SERIAL_SET_BAUD_RATE,
                &inputBuffer,
                sizeof(inputBuffer),
                nullptr,
                0,
                &information,
                nullptr)) {

            throw ref new Exception(
                HRESULT_FROM_WIN32(GetLastError()),
                L"Failed to set baud rate.");
        }

        const char message[] = "Hello serial!\n";
        if (!WriteFile(
                fileHandle.Get(),
                message,
                sizeof(message),
                &information,
                nullptr)) {

            throw ref new Exception(
                HRESULT_FROM_WIN32(GetLastError()),
                L"Failed to write data to COM port.");
        }
    }

{% endhighlight %}

在 MainPage 构造函数中添加对 `AccessComPort()` 的调用：

{% highlight C++ %}

    MainPage::MainPage()
    {
        InitializeComponent();
        AccessComPort();
    }

{% endhighlight %}

生成项目，此操作应该会成功，因为我们已使桌面版 API 在编译时可见。

在文件句柄有效性检查之后的 `throw` 语句上设置断点，如上述源代码中所示。

在 MinnowBoardMax 上调试应用程序。该断点会被命中。在调试器中检查 `lastError` 变量，它应等于 5（拒绝访问）。我们需要在设备对象上设置正确的安全描述符，以便 UWP 应用程序可以访问它。

## 授予 AppContainer 进程访问权限

系统中的每个设备对象具有关联的安全描述符。安全描述符确定访问设备对象的访问者和访问权限。安全描述符具有二进制表示形式（可用于系统计算对象的访问）和称为“SDDL 字符串”的人工可读形式。下面是 SDDL 字符串的一些示例：

<table>
<thead>
<tr>
    <td>SDDL 字符串</td>
    <td>描述</td>
    <td>Wdmsec.h 常量</td>
</tr>
</thead>
<tbody>
<tr>
    <td>“D:P”</td>
    <td>拒绝访问内核模式客户端之外的一切内容。</td>    <td>SDDL_DEVOBJ_KERNEL_ONLY</td>
</tr>
<tr>
    <td>“D:P(A;;GA;;;SY)”</td>
    <td>拒绝访问内核模式代码和 SYSTEM 帐户下运行的用户模式客户端之外的一切内容。</td>
    <td>SDDL_DEVOBJ_SYS_ALL</td>
</tr>
<tr>
    <td>“D:P(A;;GA;;;SY)(A;;GRGWGX;;;BA)(A;;GR;;;WD)”</td>
    <td>授予对内核模式客户端和 SYSTEM 帐户的完全访问权限，授予内置管理员读取、写入和执行访问权限，以及授予其他所有人只读访问权限。</td>
    <td>SDDL_DEVOBJ_SYS_ALL_ADM_RWX_WORLD_R</td>
</tr>
</tbody>
</table>

wdmsec.h 中定义了大量的常见安全描述符字符串。可在 [MSDN](https://msdn.microsoft.com/zh-cn/library/windows/desktop/aa379602%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396) 上找到更多 SID 字符串常量。

若要使设备可以访问 UWP 应用程序，需要授予对所有应用程序包安全原则的访问权限，这会使用 SID 字符串“AC”进行表示。以下 SDDL 会将 GENERIC\_ALL 访问权限授予给 SYSTEM、内置管理员、经身份验证的用户和 appcontainer 应用程序：

    "D:P(A;;GA;;;SY)(A;;GA;;;BA)(A;;GA;;;AU)(A;;GA;;;AC)"

如果你控制想要访问的驱动程序代码，则可以以编程方式使用 WDM 驱动程序中的 \[IoCreateDeviceObjectSecure\(\)\]\(https://msdn.microsoft.com/zh-cn/library/windows/hardware/ff548407(v=vs.85).aspx\) 例程或 WDF 驱动程序中的 \[WdfDeviceInitAssignSDDLString\(\)\]\(https://msdn.microsoft.com/zh-cn/library/windows/hardware/ff546035(v=vs.85).aspx\) 例程将 SDDL 字符串分配给设备对象。

如果未控制设备的驱动程序代码，可以使用注册表覆盖任何设备的 SDDL。如果设备的硬件注册表项中存在一个名为“Security”的注册表值，系统将使用指定的安全描述符，而不是驱动程序提供的安全描述符。我们会将 COM 端口的安全描述符替换为授予对所有 appcontainer 应用程序的访问权限的安全描述符。

首先，我们需要将 SDDL 字符串转换为其二进制表示形式。我们可以使用 [powershell](http://blogs.technet.com/b/heyscriptingguy/archive/2011/08/09/use-powershell-to-convert-sddl-to-binary-format.aspx) 执行此操作。打开 powershell 提示符，然后运行以下命令：

    $a = ([wmiclass]"Win32_SecurityDescriptorHelper").SDDLToBinarySD("D:P(A;;GA;;;SY)(A;;GA;;;BA)(A;;GA;;;AU)(A;;GA;;;AC)").BinarySD | % { '{0:X}' -f $_ }
    $a -join ','

输出将是一长串以逗号分隔的数字字符串，我们会将该字符串粘贴到注册表文件中。创建名为 deviceac.reg 命名的文件，其中包含以下内容：

    Windows Registry Editor Version 5.00

    [HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Enum\ACPI\PNP0501\1]
    "Security"=hex:1,0,4,90,0,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,2,0,60,0,4,0,0,0,0,0,14,0,0,0,0,10,1,1,0,0,0,0,0,5,12,0,0,0,0,0,18,0,0,0,0,10,1,2,0,0,0,0,0,5,20,0,0,0,20,2,0,0,0,0,14,0,0,0,0,10,1,1,0,0,0,0,0,5,B,0,0,0,0,0,18,0,0,0,0,10,1,2,0,0,0,0,0,F,2,0,0,0,1,0,0,0

将此文件复制到 MBM 上的 c:\\data，然后运行：

    schtasks /create /RU SYSTEM /SC ONCE /TN DeviceAC /TR "reg import c:\data\deviceac.reg" /ST 00:00
    schtasks /run /tn DeviceAC
    schtasks /delete /tn DeviceAC /f

我们以 SYSTEM 身份使用 schtasks 来运行注册表导入操作，因为只有 SYSTEM 帐户有权更改 enum 项下的注册表项。

验证已通过运行以下内容创建“Security”注册表值：

    reg query HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Enum\ACPI\PNP0501\1 /v Security

如果没有看到“Security”值，则上述步骤中出现了一些问题。如果已成功创建“Security”值，请重新启动该设备，以使新的安全设置生效：

    Devcon restart acpi\pnp0501

现在，再次调试通用应用程序。应可成功打开该 COM 端口，而上述断点应该不会被命中。

恭喜，你已成功打开了一台设备并向它发送了 IOCTL！

## 授予对特定应用程序的访问权限

安全标识符“AC”标识所有应用程序包，并授予所有应用程序对该设备的访问权限。如果你只想授予对特定应用程序的访问权限，可以将上述 SDDL 中的“AC”替换为你想面向的应用程序的特定于应用的 SID。可以使用[进程资源管理器](https://technet.microsoft.com/zh-cn/sysinternals/bb896653)检查特定于应用的 SID。

启动该应用并启动进程资源管理器。在进程资源管理器中打开该进程的属性对话框，然后转到“安全”选项卡。你将在此处看到所有与该进程的令牌相关联的安全标识符。具有 AppContainer 标记设置的 SID 是特定于应用的 SID。

![进程资源管理器]({{site.baseurl}}/Resources/images/DeviceIoControlUwp-AppContainerSid.png)

可以在上述 SDDL 中将“AC”替换为此 SID 以生成只授予对该特定应用程序的访问权限的 SDDL。例如，以下 SDDL 将只授予对如上所示的应用程序的访问权限：

    "D:P(A;;GA;;;SY)(A;;GA;;;BA)(A;;GA;;;AU)(A;;GA;;;S-1-15-3-2628158189-2540711686-3785793668-522787976-4226511596-526649915-1865015409)"

由于应用程序安装时会生成 SID，因此仅在应用程序安装到目标计算机上后，才会确定该 SID。

有关应用容器的详细信息，请参阅 [Windows 8 应用容器安全说明 - 第 1 部分](http://recxltd.blogspot.com/2012/03/windows-8-app-container-security-notes.html)。