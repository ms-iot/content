###在电脑上安装 Visual Studio 2015 Preview

我们已创建了一个版本文件，用于描述所需工具的受支持版本。将其用作在电脑上安装所需工具的范本：

* 从[此处](https://dev.windows.com/zh-CN/downloads/windows-10-developer-tools)**安装 Windows 10**

* 从[此处](https://dev.windows.com/zh-CN/downloads/install-dev-tools-visual-studio-2015)**安装 Visual Studio 2015 Preview**。在启动安装程序时选择自定义选项，然后选择“通用 Windows 应用开发工具”。在下一个页面上，确认将安装“工具和 Windows SDK”和“Windows Mobile 的仿真器”选项。

* 确保你已按照[这些说明](https://msdn.microsoft.com/library/windows/apps/xaml/dn706236.aspx)**启用开发人员模式**。

	* 一些客户报告上一步的安装问题。作为解决方法，请转到[此处](https://dev.windows.com/zh-CN/downloads/windows-10-developer-tools)的 **Windows 开发人员工具预览页**。

	<img class="screen-snippet" src="{{site.baseurl}}/images/SetupPC/download.PNG"> 向下滚动到页面底部的“其他下载选项”部分，并安装“适用于 Windows 10 的独立 Windows 10 SDK”和“移动版 Microsoft Windows 10 仿真器”。

* **安装 WindowsDeveloperProgramForIoT.msi**。[在此处]({{site.downloadurl}})的**任何**Windows 10 IoT Core **映像文件**（例如 `Windows 10 IoT Core image for Raspberry Pi 2.zip`）内都可以找到它。

	* 如果你遵循了配置 Raspberry Pi 2 或 MinnowBoard Max 的步骤，便可以在已下载的 zip 文件内找到 WindowsDeveloperProgramForIoT.msi。

* 此时，你便可以开始开发应用。请注意，当你登录时，Windows IoT Core Watcher 应用程序会自动启动。它可用于查找应用所部署到的可用 Windows 10 IoT 核心版设备。

    <img class="device-images" src="{{site.baseurl}}/images/IoTCoreWatcher.PNG">

### 从开发电脑连接到 Windows 10 IoT 核心版设备：
可使用以下两个选项从开发电脑连接到 Windows 10 IoT 核心版设备：

#### 选项 1： 将你的设备插入本地网络
连接到你的设备的最简单方法是，将其插入开发电脑已准备连接到的本地网络。将**以太网电缆**从设备插入**网络**上的集线器或交换机。为简单起见，网络上最好有一个 DHCP 服务器（路由器），以便设备在启动时获取 IP 地址。

#### 选项 2： 将 Windows 10 IoT 核心版设备直接连接到电脑并设置 Internet 连接共享 \(ICS\)
如果你没有要将设备插入的本地网络，你可以**创建到电脑的直接连接。** 为了与 IoT 核心版设备连接并与其共享电脑中的 Internet 连接，你必须具有以下各项：

* 一个开发计算机上的备用以太网端口。这可以是额外的 PCI 以太网卡，也可以是 USB 到以太网硬件保护装置。
* 一个可将你的开发计算机链接到你的 IoT 核心版设备的以太网电缆。

按照以下说明在电脑上启用 Internet 连接共享 \(ICS\)

1. 打开控制面板，方法是右键单击 Windows 按钮并选择“控制面板”，或打开一个命令提示符窗口并键入 ***control.exe***
2. 在控制面板的搜索框中，键入 ***adapter***
3. 在“网络和共享中心”下，单击“查看网络连接”
4. 右键单击要共享的连接，然后单击“属性”
5. 单击“共享”选项卡，然后选中“允许其他网络用户通过此计算机的 Internet 连接进行连接”框。

在你的电脑上启用 ICS 之后，你现在可以将 Windows 10 IoT 核心版设备直接连接到你的电脑。你可以通过将备用以太网电缆的一端插入电脑的额外以太网端口并将电缆的另一端插入 IoT 核心版设备上的以太网端口来执行此操作。

注意：

* 如果只有一个网络连接，则“共享”选项卡将不可用。
