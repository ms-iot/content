---
layout: default
title: 应用安装示例
permalink: /zh-cn/win10/samples/AppInstall.htm
lang: zh-cn
---

###应用安装示例

你可以在[此处](https://github.com/ms-iot/samples/tree/develop/AppInstall)在我们的 GitHub 上找到该示例的源代码。

若要在 IoT 设备上安装你的 appx，请执行以下操作：

1. 为 AppInstall.bat 编辑变量设置。
	- 设置 defaultappx = 你的 appx 的文件名
	- 设置 certslist = 你的 appx 的证书名称。你可以添加多个证书，由空格分隔。

2. 为 DeployApp.bat 编辑变量设置
	- 设置 defaultappx = 你的 appx 的文件名
	- 设置 defaultappxid = 你的 appx 的 ID
	- 设置 dependencylist = 你的 appx 的依赖项名称。你可以添加多个依赖项名称，由空格分隔。

3. 将你的文件放置在以下目录中：
	- c:\\windows\\appinstall： 你的 Appx、依赖项 Appx、临时 appx（可选）、证书、AppInstall.bat、DeployApp.bat 
	- c:\\windows\\system32： OemCustomization.cmd
		
    你可以通过以下方法来执行此操作：
    
    - 将二进制文件封装在 OEM 程序包中，并在你使用 ICD/Imggen 创建映像时包含它。
    - 将文件手动复制到磁盘。
    
4. 重新启动设备，你的 appx 将在启动时自动安装。