---
layout: default
title: NodejsWU
permalink: /zh-cn/win10/samples/NodejsWUExpress.htm
lang: zh-cn
---

##Express Node.js（Windows 通用）示例

{% include VerifiedVersion.md %}

###设置电脑
* 安装[含有 11 月更新](http://windows.microsoft.com/zh-cn/windows-10/windows-update-faq)的 Windows 10。
* 安装 Visual Studio 2015 Update 1。
* 从[此处](http://aka.ms/ntvsiotlatest)安装适用于 Windows IoT 的最新 Node.js 工具。


###创建新的 Express（Windows 通用）项目
启动 Visual Studio 2015 并创建新项目（“文件”\|“新建项目...”）。在“`New Project`”对话框中，导航到“`Node.js`”，如下所示（在该对话框的左侧窗格中： “模板”\|“JavaScript”\|“Node.js”）。

选择模板 `Basic Node.js Express 4 Application (Windows Universal)`

![Node.js Windows 通用“新建 Express 项目”对话框]({{site.baseurl}}/Resources/images/Nodejs/nodejswuexpress-newprojectdialog.PNG)

创建新项目后，你将看到如下所示的对话框，询问你是否希望使用 npm 将 Express 及其依赖项安装到该项目所在的位置。单击“是”。

![npm 提示]({{site.baseurl}}/Resources/images/Nodejs/npm-prompt.PNG)

单击“是”后，npm 将在后台运行并安装依赖项。完成后，你的项目应该如下图所示。

![npm Express 列表]({{site.baseurl}}/Resources/images/Nodejs/npm-express.PNG)


###将服务器部署到 Windows IoT 核心版设备
* 转到“项目”菜单，然后选择“<Your project name> 属性”。 你也可以右键单击解决方案资源管理器中的项目节点来访问属性。
* 在“远程计算机”文本框中输入 IP 地址，如下所示（`--debug` 参数需要用于调试，并且会自动添加）。
* 你还可以将 `--use-logger` 添加为参数以将控制台输出重定向到 UWP 应用程序的本地存储文件夹中的文件 \(C:\\Data\\Users\\DefaultAccount\\AppData\\Local\\Packages\<项目名称\>\_\<发布者哈希字符串\>\\LocalState\\nodeuwp.log\)。
* 如果你要针对 Minnowboard Max 进行生成，请选择下拉列表中的 `x86`。如果你要针对 Raspberry Pi 2 进行生成，请选择 `ARM`。

    ![Node.js Windows 通用项目属性]({{site.baseurl}}/Resources/images/Nodejs/nodejswu-properties.png)

* 现在，我们可以随时部署到远程 Windows IoT 核心版设备。只需按 F5（或依次选择“调试”\|“开始调试”）即可开始调试服务器。

* 当服务器正在运行时，打开浏览器，然后输入地址 http://&lt;IP \<你的设备的地址\>：3000。结果应如下图所示。

    ![Hello World 结果]({{site.baseurl}}/Resources/images/Nodejs/express-ie.PNG)


### GitHub
* NTVS IoT 扩展源代码：[https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
* Node.js UWP 包装器源代码：[https://github.com/ms-iot/node-uwp-wrapper](https://github.com/ms-iot/node-uwp-wrapper)
