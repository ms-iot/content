1. 应用程序在 Visual Studio 中打开后，在工具栏下拉列表中设置体系结构。如果针对 MinnowBoard Max 进行生成，请选择 `x86`。如果针对 Raspberry Pi 2 进行生成，请选择 `ARM`。

2. 在 Visual Studio 工具栏中，请确保目标下拉列表设置为 `Remote Machine`<br/>

    ![RemoteMachine 目标]({{site.baseurl}}/Resources/images/AppDeployment/py-remote-machine-debugging.png)

3. 接下来，在“解决方案资源管理器”窗格中，右键单击该项目。选择“属性”。

    ![远程计算机调试]({{site.baseurl}}/Resources/images/AppDeployment/py-project-properties.PNG)

4. 在“UWP 项目设置”下，修改以下字段：

	* **计算机名**： 如果以前使用过 [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) 设置设备的唯一名称，可在此处输入该名称（在此示例中，我们使用的是 **my-device**）。否则，使用 Windows IoT 核心版设备的 IP 地址。
	* **远程端口**： 设置为 **5678**

    ![项目属性调试选项卡]({{site.baseurl}}/Resources/images/AppDeployment/py-debug-project-properties.PNG)