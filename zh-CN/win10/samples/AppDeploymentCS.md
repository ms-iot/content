1. 应用程序在 Visual Studio 中打开后，在工具栏下拉列表中设置体系结构。如果针对 MinnowBoard Max 进行生成，请选择 `x86`。如果针对 Raspberry Pi 2 进行生成，请选择 `ARM`。

2. 接下来，在 Visual Studio 工具栏中，单击 `Local Machine` 下拉列表并选择 `Remote Machine`<br/>

    ![RemoteMachine 目标]({{site.baseurl}}/Resources/images/AppDeployment/cs-remote-machine-debugging.png)

3. 此时，Visual Studio 将显示“远程连接”对话框。如果以前使用过 [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) 设置设备的唯一名称，可在此处输入该名称（在此示例中，我们使用的是 **my-device**）。否则，使用 Windows IoT 核心版设备的 IP 地址。输入设备名称/IP 后，选择 `None` 进行 Windows 身份验证，然后单击“选择”。

    ![远程计算机调试]({{site.baseurl}}/Resources/images/AppDeployment/cs-remote-connections.PNG)

4. 可通过导航到项目属性（在解决方案资源管理器中选择“属性”）并在左侧选择 `Debug` 选项卡来验证或修改这些值：

    ![项目属性调试选项卡]({{site.baseurl}}/Resources/images/AppDeployment/cs-debug-project-properties.PNG)