---
layout: default
title: SB_BL
permalink: /zh-cn/win10/SB_BL.htm
lang: zh-cn
---

#在 Windows 10 IoT 核心版上启用安全启动和 BitLocker 设备加密
部署指南 _修订： 1.0_

##简介  
UEFI 安全启动和 BitLocker 是能够抵抗离线和启动攻击的已锁定的 Windows 操作系统的重要功能。UEFI 安全启动是位于 UEFI 中的第一个策略强制点。它将系统限制为仅允许执行指定颁发机构签名的二进制文件。此功能可以阻止在平台上执行未知代码，也可以阻止未知代码削弱它的安全状况。请注意，虽然限制已定义的发布颁发机构组可以排除所有未知代码，但这不一定会阻止执行已知的错误代码（例如回滚攻击）。Windows 10 IoT 核心版还可以实现轻量版的 BitLocker 设备加密，此加密对在平台上提供 TPM 具有很强的依赖关系，包括在 UEFI 中为执行必要测量而不可缺少的 preOS 协议。这些 preOS 测量可以确保操作系统以后可以明确记录它本身的启动方式；但是，这不会强制执行任何执行限制。在使用设备加密锁定未知二进制文件和保护用户数据时，安全启动和测量的启动可以一起提供确保平台以确定的方式启动的最佳保护。

##受支持的 IoT 平台  
以下 [Windows 10 IoT 核心版受支持的平台][1]提供全新的固件 TPM 功能以及安全启动、测量的启动和 BitLocker 功能：

* Intel MinnowBoard Max
* Qualcomm DragonBoard 410c

注意：

* 对于 Intel MinnowBoard Max，固件版本必须是 0.82 或更高版本。对于当前版本，仅 32 位的 Windows 10 IoT 核心版受支持，因此请确保从 Intel 下载[最新的 32 位固件][2]并将其刷入开发板。
* 对于 Qualcomm 的 DragonBoard 410c，为了启用安全启动，可能需要预配 RPMB。在 eMMC 和 Windows 10 IoT 核心版一起刷入后（按照[此处][3]的说明），在启动时同时按下 \[电源\] + \[音量+\] + \[音量-\]，并在 BDS 菜单中选择“预配 RPMB”。*请注意此步骤不可恢复。*

[1]: {{site.baseurl}}/{{page.lang}}/GetStarted.htm "Windows 10 IoT 核心版受支持的平台"
[2]: https://firmware.intel.com/projects/minnowboard-max "MinnowBoard MAX 固件"
[3]: {{site.baseurl}}/{{page.lang}}/win10/SetupPCDB410c.htm "设置 DragonBoard 410c"

##证书生成  
如果你是硬件设备制造商或是为锁定平台而想要创建自己的 UEFI 安全启动和 BitLocker 数据恢复证书的开发人员，本部分包含相关内容。注意： 出于测试目的，你可能会跳过本部分并使用在[后续部分][4]中提供的预生成的证书。[此处][5]提供有关安全启动的详细信息和密钥创建和管理指南。下面提供的内容仅用于演示目的，并且应该根据特定产品安全要求进行调整。为了生成所需证书，我们将使用以下工具：

* MakeCert.exe
* Pvk2Pfx.exe
* SignTool.exe

这些工具在 [Windows 开发人员工具包][6]中提供，它们通常与 Visual Studio 一起安装。在默认设置中，这些二进制文件通常位于 C:\\Program Files \(x86\)\\Windows Kits\\10\\bin 下。此外还需要一组 Windows 代码签名证书。在[此处][7]下载 zip、解压缩并继续执行以下步骤：

1. 在管理 PowerShell 控制台中运行附加的 MakeSB.ps1 脚本，以生成一组自定义的 SecureBoot 证书（本示例使用“db”位置下的证书）
  * 你可以在显示的所有 UI 框中单击“无”按钮，以将没有密码的私钥写入磁盘。 
2. 作为最后一步，你可以使用 _certmgr.msc_ 将 DRA 作为 PFX 导出，以供备份使用。启动 _certmgr.msc_、在“证书”-\>“当前用户”-\>“个人”-\>“证书”下查找颁发给“PFXBitLockerDRA”的证书、右键单击该证书、依次选择“所有任务”-\>“导出...”。对话框将引向生成 BitLockerDRA.pfx 文件的导出过程：
  * 使用私钥导出
  * 个人信息交换 – PKCS \#12 \(.pfx\)
  * 包括所有证书
  * 导出所有扩展属性
  * 设置导出密码（假设为“dra”）
  * 在创建所有其他文件的相同文件夹中设置导出文件名 BitLockerDRA.pfx

请注意，所包括的脚本也提供保护 DRA 密钥所需的信息，方法是将该密钥绑定到平台的 TPM 或在 SmartCard 上安全创建该密钥。

[4]: {{site.baseurl}}/{{page.lang}}/win10/SB_BL.htm#Certificates "预生成的证书"
[5]: https://technet.microsoft.com/zh-cn/library/dn747883.aspx "安全启动密钥创建和管理指南"
[6]: https://msdn.microsoft.com/zh-cn/windows/hardware/gg454513.aspx "下载适用于 Windows 的工具包和工具"
[7]: https://github.com/ms-iot/security/tree/master/CertGen "CertGen.zip"

##<a name="Certificates"></a>预生成的证书（仅用于测试目的）  
为了在安全性**并非**优先事项时快速测试和部署 UEFI 安全启动和设备加密功能，你可以在以下后续部分中使用一组预生成的证书和密钥（用于说明）。请注意，因为私钥包括在此发布的程序包中，所以生成的平台**不能视为受信任平台或安全平台**。你应该在[此处][8]下载 zip、进行解压缩，然后指向以下后续部分中的这些文件。

[8]: https://github.com/ms-iot/security/tree/master/PreGenPackage "PreGenPackage.zip"

##准备操作系统映像  
对于以下步骤，我们假设你已为开发板刷入了最新的 Windows 10 IoT 核心版映像（[此处][1]提供基于你的特定开发板的说明），并且在你的 Windows 10 电脑上，“MainOS”卷已装载为卷“v:”。

1.	将以下 3 个文件复制到 v:\\EFI（用于设置安全启动的 UEFI 安全变量）：
  * SetVariable\_db.bin
  * SetVariable\_kek.bin
  * SetVariable\_pk.bin
2.	将提供的设备加密任务定义复制到 v:\\EFI：
  * DETask.xml
3.	此外，为了在设备加密后促进数据恢复，请在电脑上打开管理 CMD 提示符，并运行以下命令：
  * `reg load HKLM\IoT v:\Windows\System32\config\SOFTWARE`
  * `reg import DRAStore.reg`（指向你的“DRAStore.reg”文件位置）
  * `reg unload HKLM\IoT`
4. （可选）将测试工具 [t2t.exe][9] 复制到 v:\\windows\\system32。

**注意：** Windows 10 IoT 核心版上的 BitLocker 功能允许在将所有可用的 **NTFS 数据卷**绑定到**基于 NTFS 的操作系统卷**的同时，自动加密该卷。为此，请务必确保 EFIESP 卷 GUID 设置正确。如果要使用 **DragonBoard 410c**，将需要在管理 CMD 窗口中提供以下额外的说明：

* `diskpart`
* `sel disk n`（n 表示在 USB 大容量存储模式下映射到 DragonBoard 的磁盘号）
* `sel parition m`（分区 \# 表示 EFIESP 分区 -“28”表示 Windows 10 IoT 核心版下的 DragonBoard410c）
* `set id=C12A7328-F81F-11D2-BA4B-00A0C93EC93B`

**注意：** OEM 和设备组装商可能需要在他们的 IoT 设备上大规模设置安全启动和启用 BitLocker。若要了解有关如何使用自定义文件和设置生成操作系统映像的详细信息，请参阅 [OEM 准备和部署指南文档][10]。

[9]: https://github.com/ms-iot/security/tree/master/Urchin/T2T "T2T"
[10]: https://github.com/ms-iot/security/tree/master/Urchin "OEM 准备和部署指南文档"

##准备 UEFI 固件  
你可能需要确保更新固件设置以便启用固件 TPM 和安全启动，具体取决于你的设备：

###Intel MinnowBoardMax  
* 固件必须是 32 位和版本 0.82 或更高版本（获取[最新的 32 位固件][2]）
* 若要启用 TPM 功能，请打开附加了键盘和屏幕的开发板的电源，然后按 F2 进入 UEFI 设置。依次转到“设备管理器”-\>“系统设置”-\>“安全配置”-\>“PTT”，然后将其设置为 _<Enable>_。按 F10 保存更改，并继续重新启动平台。

###Qualcomm DragonBoard 410c  
* 为了启用安全启动，可能需要预配 RPMB。在映像按照上述部分中所提到的那样准备好后（设备还附加了屏幕），请在设备上同时按 \[电源\] + \[音量+\] + \[音量-\]，再给设备充电，然后在 BDS 菜单中选择“预配 RPMB”。**请注意此步骤不可恢复。**
 
##启用 UEFI 安全启动和 BitLocker  
###UEFI 安全启动  
在设置好设备和准备好映像后，将设备启动到 Windows 并通过远程 PowerShell 会话连接到 Windows 10 电脑上的设备（[此处][11]提供有关如何通过 PowerShell 连接的说明）。在远程 PowerShell 会话中运行以下 3 个命令，以设置 UEFI 安全变量：

* `FWVar.exe put imagesecurity:db c:\efi\SetVariable_db.bin NV BS RT TA`
* `FWVar.exe put efiglobal:KEK c:\efi\SetVariable_kek.bin NV BS RT TA`
* `FWVar.exe put efiglobal:PK c:\efi\SetVariable_pk.bin NV BS RT TA`

接下来，为了完成平台锁定，请使用命令 `shutdown /r` 重新启动设备。**注意：** 在 Intel MinnowBoardMax 上，你可能需要在 UEFI 中手动启用 SecureBoot。给已连接键盘的开发板通电，并按 F2 进入 UEFI 设置。依次转到“设备管理器”-\>“安全启动配置”-\>“尝试安全启动”，并启用此选项 _<X>_。按 F10 保存更改，并继续重新启动平台。

[11]: {{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm "PowerShell"

###计划 BitLocker  
为了启用 BitLocker，必须计划设备加密任务。此设备加密任务已设置为在 TPM 已预配并准备就绪时触发，这也确保了设备加密在所有后续启动上保持启用状态（该卷可随时离线解密）。设置安全启动和启动设备后，重新初始化远程 PowerShell 会话，并使用以下命令在 c:\\windows\\system32 下创建新的标签为“OEMCustomization.cmd”的文件（或附加到现有文件）：

* `new-item c:\windows\system32\OEMCustomization.cmd -type file -value 'schtasks /Create /TN "\Microsoft\Windows\IoT\DeviceEncryption" /XML c:\efi\DETask.xml /f'`

##解锁加密的驱动器  
在尝试离线读取加密设备（例如用于 MinnowBoardMax 的 SD 卡或 DragonBoard 的使用 USB 大容量存储模式的 eMMC）的内容时，可能要使用“diskpart”将驱动器号分配到 MainOS 和数据卷（假设 v: 代表 MainOS，w: 代表数据）。卷会显示为已锁定，并且需要手动解锁。可在任何安装了 BitLockerDRA.pfx 证书包的计算机（包括在上述附件中）上执行此操作。安装 PFX，然后在管理 CMD 提示符中运行以下命令：

* `manage-bde -unlock v: -cert -cf BitLockerDRA.cer`
* `manage-bde -unlock w: -cert -cf BitLockerDRA.cer`

如果要经常离线访问内容，可以使用以下命令在初始解锁后设置卷的 BitLocker 自动解锁：

* `manage-bde -autounlock v: -enable`
* `manage-bde -autounlock w: -enable`

##禁用 BitLocker  
一旦要临时禁用 BitLocker，请通过 IoT 设备初始化远程 PowerShell 会话，并运行以下命令：`sectask.exe -disable`。**注意：** 除非已禁用了计划的加密任务，否则将在后续设备启动上重新启用设备加密。

