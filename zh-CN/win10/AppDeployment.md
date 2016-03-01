---
layout: default
title: 使用 Visual Studio 部署应用
permalink: /zh-cn/win10/AppDeployment.htm
lang: zh-cn
---

##使用 Visual Studio 部署应用

使用 Visual Studio 部署和调试应用程序很简单。我们将使用**远程调试**功能将应用部署到本地连接的 IoT 核心版设备。

* [C\# 应用部署](#csharp)
* [C++ 应用部署](#cpp)
* [Python 应用部署](#python)

**注意：** 为了使用远程调试，IoT 核心版设备必须首先连接到与开发电脑相同的本地网络。请参阅[此处]({{site.baseurl}}/{{page.lang}}/win10/ConnectToDevice.htm)的说明。

<a name="csharp"/>

###将 C\# 应用部署到 Windows IoT 核心版设备 

{% include_relative samples/AppDeploymentCS.md %}

5. 现在我们已准备好部署。只需按 F5（或依次选择“调试”\|“开始调试”），即可开始调试应用。应该可以看到应用出现在 Windows IoT 核心版设备屏幕上。

6. 部署完成后，可设置断点、查看变量值等。若要停止应用，请按“停止调试”按钮（或依次选择“调试”\|“停止调试”）。

7. 成功部署和调试 UWP 应用程序后，只需将 Visual Studio 工具栏配置下拉列表从 `Debug` 更改为 `Release`，即可创建发布版本。现在，可通过依次选择“生成”\|“重新生成解决方案”和“生成”\|“部署解决方案”，生成应用并将其部署到设备。

<a name="cpp"/>

###将 C++ 应用部署到 Windows IoT 核心版设备

{% include_relative samples/AppDeploymentCPP.md %}

5. 现在我们已准备好部署。只需按 F5（或依次选择“调试”\|“开始调试”），即可开始调试应用。应该可以看到应用出现在 Windows IoT 核心版设备屏幕上。

6. 部署完成后，可设置断点、查看变量值等。若要停止应用，请按“停止调试”按钮（或依次选择“调试”\|“停止调试”）。

7. 成功部署和调试 UWP 应用程序后，只需将 Visual Studio 工具栏配置下拉列表从 `Debug` 更改为 `Release`，即可创建发布版本。现在，可通过依次选择“生成”\|“重新生成解决方案”和“生成”\|“部署解决方案”，生成应用并将其部署到设备。

<a name="python"/>

###将 Python 应用部署到 Windows IoT 核心版设备

{% include_relative samples/AppDeploymentPY.md %}

5. 现在我们已准备好部署。只需按 F5（或依次选择“调试”\|“启动调试”）即可开始调试应用。应该可以看到应用出现在 Windows IoT 核心版设备屏幕上。

6. 部署完成后，可设置断点、查看变量值等。若要停止应用，请按“停止调试”按钮（或依次选择“调试”\|“停止调试”）。

7. 成功部署和调试 UWP 应用程序后，只需将 Visual Studio 工具栏配置下拉列表从 `Debug` 更改为 `Release`，即可创建发布版本。现在，可通过依次选择“生成”\|“重新生成解决方案”和“生成”\|“部署解决方案”，生成应用并将其部署到设备。
