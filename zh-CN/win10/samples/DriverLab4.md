---
layout: default
title: 驱动程序实验 - 使用 Visual Studio 部署驱动程序
permalink: /zh-cn/win10/samples/DriverLab4.htm
lang: zh-cn
---

##使用 Visual Studio 部署驱动程序 

在本练习中，你将配置 Visual Studio 驱动程序项目，以便可以在驱动程序开发阶段为特定平台编译和部署驱动程序。请注意，当前此过程要求你的目标设备在驱动程序部署后重新启动，因此可能需要花费几分钟的时间才能完成整个部署过程。在本练习中，你可以使用在[此处](https://github.com/ms-iot/samples/tree/develop/DriverSamples)找到的 gpiokmdfdemo 示例驱动程序。

###在目标设备上
本部分介绍了配置目标设备以进行驱动程序开发所需的步骤。

* 请确保你的设备已按照[此处]({{site.baseurl}}/{{page.lang}}/GetStarted.htm)的说明安装了 IoTCore 映像。
* 通过 PowerShell 连接到目标设备，如[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)的说明所述。
* 对于当前版本，你需要执行一些预配步骤。以下步骤将在未来自动执行。
* 现在，配置你的目标设备，以便它可以与 Visual Studio 交互。通过 PowerShell 窗口输入下面列出的命令。
		
		cd c:\windows\system32
		.\sc.exe config sshsvc start=disabled
		.\sc.exe stop sshsvc
		.\sc.exe config TestSirepSvc start=auto
		.\sc.exe start TestSirepSvc
		.\reg.exe add HKLM\SOFTWARE\Microsoft\SystemCertificates\Root\Certificates\8a334aa8052dd244a647306a76b8178fa215f344
		
现在，使用 Visual Studio 配置你的目标设备，以便进行驱动程序开发。

###在开发计算机上

* 按照 \[此处\]\(https://msdn.microsoft.com/zh-cn/windows/hardware/dn913721(v=vs.8.5).aspx) 的说明，在你的开发计算机上安装 Windows 驱动程序工具包。你将需要安装 SDK 和 WDK。

* 安装相关证书，以便对驱动程序进行正确签名，并使其可以在你的目标设备上运行。在后续步骤中，当你对驱动程序进行签名时，请确保使用“WDKTestCert”。从命令提示符中，执行下面列出的命令：

		cd c:\Program Files (x86)\Windows Kits\10\Tools\bin\i386
		Set WPDKContentRoot=c:\Program Files (x86)\Windows Kits\10		
		InstallOEMCerts.cmd

 将目标设备添加到 Visual Studio

* 打开 Visual Studio，然后依次选择“驱动程序”\>“测试”\>“配置设备”\>“添加新设备”
* 为目标设备输入用户友好显示名称
* 选择设备类型 = 移动版
* 在“选择设备”中，查找并突出显示你的设备。可以通过匹配“选择设备”窗口中所列设备的 IP 地址来找到你的设备。
* 单击“下一步”以转到下一步。
* 确保主机 IP 匹配你的开发计算机的 IP 地址。
* 单击“下一步”以转到下一步。
* 单击“完成”以完成配置。
	
 配置 Visual Studio 项目

* 确保目标平台版本与安装在你的开发计算机上的 SDK 匹配。从“解决方案资源管理器”窗口中选择“项目属性”。在“常规配置属性”下，确保目标平台版本与安装在你的开发计算机上的 SDK 匹配。可以通过“控制面板”\>“程序”\>“程序和功能”来查看 SDK 版本。 
* 在“项目属性”\>“驱动程序签名”\>“测试证书”下，选择“测试证书”
* 应确保只要向目标设备部署新的已编译驱动程序，就更新程序包版本。任何数字都可以，只需保持数字递增即可。在“项目属性”\>“PackageGe”\>“版本”下找到程序包版本
* 你的 Visual Studio 项目现已准备就绪，可生成驱动程序并将其部署到目标设备。
	

* 接下来，如果你要使用示例 gpiokmdfdemo 驱动程序，你需要生成 ACPI 表并将其复制到目标设备。按照[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab2.htm)的步骤操作。


使用 Visual Studio 生成和安装演示驱动程序

* 从“生成”菜单中，单击 `Build Solution(Ctrl+Shift+B)`。如果你使用的是 MinnowBoard Max，请确保针对 `x86` 进行生成；如果你使用的是 Raspberry Pi 2，请确保针对 `ARM` 进行生成。Visual Studio 将生成驱动程序并将该驱动程序部署到你的目标设备。

    ![驱动程序设置属性]({{site.baseurl}}/Resources/images/DriverLab/driver-build-option.png)

* 目标设备将重新启动。重新启动后，请确保 PowerShell 仍连接到它，否则，如[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)所述，使用 PowerShell `enter-pssession` 命令重新连接到目标设备。

* 现在，你的驱动程序将安装在目标设备上。
* 你可以按照[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab3.htm)的步骤检查驱动程序的状态。
* 有关创建新的驱动程序和使用 Visual Studio 部署驱动程序（正如本页所述）的信息，请参考 \[此处\]\(https://msdn.microsoft.com/zh-cn/windows/hardware/dn913721(v=vs.8.5).aspx\) 的网站。
