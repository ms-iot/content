---
layout: default
title: 创建 Windows 10 IoT 核心专业版映像
permalink: /zh-cn/win10/CreateIoTCorePro.htm
lang: zh-cn
---

#创建 Windows 10 IoT 核心专业版映像

下面是创建企业版映像的相关步骤

* 下载 Windows 10 IoT 核心专业版许可证文件和 ICD。
* 创建含有许可证文件的设置包。
* 将设置包打包在 OEM 程序包中。
* 使用 ICD/Imggen 创建映像。


步骤 1： 下载 Windows 10 IoT 核心专业版许可证文件和 ICD。
-------

请转到 [Windows 10 IoT 核心版商品化](http://go.microsoft.com/fwlink/?LinkID=614849)、选择 Windows 10 IoT 核心专业版查找你附近的经销商并下载 Windows 10 IoT 核心专业版许可证文件。

请安装 Windows ADK 和 ICD。

步骤 2： 使用 ICD 创建含有许可证文件的设置包
-------

**步骤 2.1： 新建设置包**

![新建设置包]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg1.png)

**步骤 2.2： 输入设置包的名称和项目文件夹**

![输入设置包的名称和项目文件夹]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg2.png)

**步骤 2.3： 启动“Windows 10 IoT 核心版”**

![选择 Windows 10 IoT 核心版]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg3.png)

**步骤 2.4： 选择“完成”**

![选择“完成”]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg4.png)

**步骤 2.5： 添加设置 EditionUpgrade-\>UpgradeEditionWithLicense 并提供许可证文件作为输入**

![提供许可证文件作为输入]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg5.png)

**步骤 2.6： 选择“导出”-\>“设置包”**

![导出设置包]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg6.png)

**步骤 2.7： 填写设置包的名称和版本**

![导出设置包的名称]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg7.png)

**步骤 2.8： 单击“下一步”**

![单击“下一步”]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg8.png)

**步骤 2.9： 选择要保存该设置包的路径并单击“下一步”**

![选择“路径”]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg9.png)

**步骤 2.10： 选择“生成”**

![选择“生成”]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg10.png)

**步骤 2.11： 设置包已成功创建**

![设置包已成功创建]({{site.baseurl}}/Resources/images/CreateIoTCorePro/CreatePpkg11.png)

步骤 3： 将设置包打包在 OEM 程序包中
-------

使用 PKGGEN 工具创建 OEM 程序包以便将设置包打包。
 
有关使用 PKGGEN 工具创建包含设置包的 OEM 程序包的说明，请访问 [Windows 10 IoT 核心版映像创建](https://blogs.msdn.microsoft.com/iot/2015/12/14/windows-10-iot-core-image-creation)。
 
步骤 4： 使用 ICD/Imggen 创建映像
-------
 
使用 ICD 创建含有 OEM 程序包的 Windows IoT 核心版映像。

有关使用 ICD 创建含有 OEM 程序包的 Windows IoT 核心版映像的说明，请访问 [Windows 10 IoT 核心版映像创建](https://blogs.msdn.microsoft.com/iot/2015/12/14/windows-10-iot-core-image-creation)。