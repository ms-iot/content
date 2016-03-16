---
layout: default
title: 转发器和存根
permalink: /zh-cn/win8/samples/Forwarders.htm
lang: zh-cn
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>对 Intel Galileo 第 1 代和第 2 代上的 Windows 的支持将于 2015 年 11 月 30 日结束</u></h4>
	<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台的 Windows 支持。我们看到了平台的一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>
</div>

##Win32 API
适用于 Intel Galileo 的 Windows 版本基于 Windows 的 *MinCore* 而定。它设计为能在更小内存和存储占用的情况下运行。由此，针对面向 Windows 桌面版的应用程序，许多 Win32 API 不可用。

Win32 是一个大 API，由成百上千个应用程序编程界面组成，横跨多个技术堆栈和语言绑定。由于 API 集的大小在几代之后增大，其复杂性和相互关联性也得到增加。

最近几个 Windows 版本的 Win32 API 已进行重构，使更小版本的 Windows 能在新窗体因子上运行。由于 API 集经历了重构，许多 API 包含在更小版本的 Windows 中，但更多 API 添加到更大版本的 Windows 中。桌面版 Windows 包含全部 API 集。

如果你想在更小的设备（如 Galileo）上运行面向桌面的应用程序，其所需操作系统的 API 必须为可用，否则应用无法运行。

若要使其运行，有几个选项：

1. 如果能够访问希望运行的应用的源，请链接到 MinCore.lib 而非桌面应用程序的默认库集。
1. 如果 API 在 Windows 中但已经移动，请将转发器从传统 API 暴露实现到新 API 暴露。
1. 如果缺少 API，请尽可能实现模拟 API 的存根。

## API 集
Galileo 上的 Windows 派生自 Windows Phone 8.1。此移动版 Windows 使用 \[Windows 8.1 API 集\]\(http://msdn.microsoft.com/zh-cn/library/windows/desktop/hh802935(v=vs.85).aspx){:target="_blank"}。

##诊断出现故障的应用程序
当应用程序由于缺少 API 而无法载入时，你可以打开 Windows 加载程序捕捉（显示缺少哪些 API 的加载程序工具）进行诊断。

####启用 Windows 加载程序捕捉：

1. 远程连接到开发板
1. 确定希望诊断的二进制文件的可执行名称。
1. 输入以下命令，替换可执行名称，`node.exe`：

{% highlight bash %}
reg add "HKLM\software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\node.exe" /v GlobalFlag /t REG_DWORD /d 0x2
{% endhighlight %}

如此，我们已启用 node.exe 的加载程序捕捉。在 Visual Studio 下运行此程序，你将告知哪些 API 出现故障。

{% highlight bash %}
0744:00c8 @ 14911546 - LdrpNameToOrdinal - WARNING: Procedure "GetProcessWindowStation" could not be located in DLL at base 0x75A20000.
0744:00c8 @ 14911562 - LdrpReportError - ERROR: Locating export "GetProcessWindowStation" for DLL "c:\node\node.exe" failed with status: 0xc0000139.
First-chance exception at 0x7758342A (ntdll.dll) in node.exe: 0xC0000139: Entry Point Not Found.
{% endhighlight %}

完成诊断加载程序错误后，可删除加载程序捕捉记录：

{% highlight bash %}
reg delete "HKLM\software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\node.exe"
{% endhighlight %}

##转发器
在生成 DLL 时，可通过修改 Sources.def 文件指定导出 API 存在于另一个 DLL 中。请参阅 \[Windows 8.1 API 集\]\(http://msdn.microsoft.com/zh-cn/library/windows/desktop/hh802935(v=vs.85).aspx){:target="_blank"} 以检查和查看哪些 DLL 包含了哪些 API。

例如，将转发 `CharLowerA()`，如下所示：

{% highlight bash %}
LIBRARY User32
EXPORTS
   ...
   CharLowerA = ms-win-downlevel-user32-l1-1-0.CharLowerA
   ...
{% endhighlight %}

## 存根
因为在上下文中毫无意义，一些 API 不会包含在 Windows 图像内。在这种情况下，其名称将包含在 Sources.def 文件中并添加存根，此操作允许链接，但会为 API 进行相应的操作：

{% highlight c++ %}
HWINSTA
WINAPI
GetProcessWindowStation(
VOID)
{
    return NULL;
}
{% endhighlight %}

## 转发器和存根存储库
为帮助移植，创建[转发器和存根存储库](http://github.com/ms-iot/forwarders){:target="_blank"}。请仅提交运行特定任务所需的 API。请遵循 [README](https://github.com/ms-iot/forwarders/blob/master/README.md){:target="_blank"} 中的说明。

## 生成并部署转发器和存根

####若要使用现有转发器和存根库：
1. 只需下载[转发器项目压缩文件](https://github.com/ms-iot/forwarders/archive/master.zip){:target="_blank"}。
1. 从已下载压缩文件中提取所有文件。
1. 打开所需转发器的解决方案。

####下载现有库或克隆和更新转发器和存根的解决方案后，将需要执行以下步骤以在项目中使用库和解决方案：
1. 生成解决方案
1. 右键单击项目，选择“在文件资源管理器中打开”
1. 导航至 Release 目录
1. 将二进制文件复制到部署目录 - 例如将 `User32.dll` 复制到 `\\mygalileo\c$\test`

---
[&laquo; 返回到示例](SampleApps.htm){: .btn .btn-default}
