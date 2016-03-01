---
layout: default
title: 嵌入模式
permalink: /zh-cn/win10/EmbeddedMode.htm
lang: zh-cn
---

##嵌入模式

Windows 和 Windows 移动版可以配置为允许嵌入模式。这使程序包能够实现后台应用程序。它还可以使应用程序声明和使用 lowLevelDevice 和 systemManagement 功能。

嵌入模式仅在 Window IoT 核心版中默认启用，并且必须在标准 Windows 和 Windows 移动版中启用。

如果正在调试的设备运行的不是 Windows IoT 核心版，并且看到以下任一错误消息，你需要确保该设备上已启用 AllowEmbeddedMode 且“嵌入模式”服务处于运行状态：

* 端点映射程序中未提供更多端点。
* 此程序由组策略阻止。有关详细信息，请与系统管理员联系。

##更改模式
若要启用嵌入模式，你将需要在映像和配置设计器 \(ICD\)（将 AllowEmbeddedMode 设置为 1）中创建设置包。若要安装 ICD，你需要下载并安装适用于 Windows 10 的 Windows ADK。

* <a href="http://go.microsoft.com/fwlink/p/?LinkId=526740">下载适用于 Windodws 10 的 Windows ADK</a>
* <a href="https://msdn.microsoft.com/library/windows/hardware/dn927348(v=vs.85).aspx">了解适用于 Windows 10 的 Windows ADK 中的新增功能</a>

1. 安装 ADK 时，选中如下所示的四个复选框。

    ![ADK 安装]({{site.baseurl}}/Resources/images/EmbeddedMode/ICD.png)

2. 安装完成后，运行 Windows 映像和配置设计器 \(WICD\)。![WICD 图标]({{site.baseurl}}/Resources/images/EmbeddedMode/WICD_Icon.png)

3. 创建新的设置包 ![步骤 3]({{site.baseurl}}/Resources/images/EmbeddedMode/Step3.png)

4. 选择“通用于所有 Windows 版本”，然后选择“下一步”![步骤 4]({{site.baseurl}}/Resources/images/EmbeddedMode/Step4.png)

5. 单击“完成”![步骤 5]({{site.baseurl}}/Resources/images/EmbeddedMode/Step5.png)

6. 在搜索框中键入“EmbeddedMode”，然后单击 AllowEmbeddedMode ![步骤 6]({{site.baseurl}}/Resources/images/EmbeddedMode/Step6.png)

7. 在中心窗格中，将 AllowEmbeddedMode 的值设置为 1 ![步骤 7]({{site.baseurl}}/Resources/images/EmbeddedMode/Step7.png)

8. 依次单击“导出”\>“设置包”![步骤 8]({{site.baseurl}}/Resources/images/EmbeddedMode/Step8.png)

9. 单击“下一步”![步骤 9]({{site.baseurl}}/Resources/images/EmbeddedMode/Step9.png)

10. 单击“下一步”![步骤 10]({{site.baseurl}}/Resources/images/EmbeddedMode/Step10.png)

11. 单击“下一步”![步骤 11]({{site.baseurl}}/Resources/images/EmbeddedMode/Step11.png)

12. 单击“生成”![步骤 12]({{site.baseurl}}/Resources/images/EmbeddedMode/Step12.png)

13. 安装设置包 \(PPKG\)。
    * 如果在标准 Windows 中启用嵌入模式，请双击 PPKG。 
    * 如果在移动版中启用嵌入模式，请将 PPKG 拖放在资源管理器中的 Windows Phone 图标上。![步骤 13]({{site.baseurl}}/Resources/images/EmbeddedMode/Step13.png)

14. 单击“是的，添加它”
    * 在标准 Windows 中，单击 LUA 对话框（如果出现）上的“是”，然后单击对话框上的“是的，添加它”。![步骤 14 标准]({{site.baseurl}}/Resources/images/EmbeddedMode/Step14Standard.png)
    * 在移动版中，查看你的手机并在手机上按“是的，添加它”按钮。![步骤 14 移动版]({{site.baseurl}}/Resources/images/EmbeddedMode/Step14Mobile.png)
