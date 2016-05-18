<h3> 部署你的应用 </h3>

<ol class="setup-content-list">
  <li>应用程序在 Visual Studio 中打开后，在工具栏下拉列表中设置体系结构。如果你要针对 MinnowBoard Max 进行生成，请选择<code>“x86”</code>。 如果你要针对 Raspberry Pi 2、Raspberry Pi 3 或 DragonBoard 进行生成，请选择<code>“ARM”</code>。</li>
  <li>
  <p>接下来，在 Visual Studio 工具栏中，单击<code>“本地计算机”</code>下拉列表并选择<code>“远程计算机”</code></li></p>
  <p><img src="{{site.baseurl}}/Resources/images/AppDeployment/cs-remote-machine-debugging.png" /></p>
  </li>
  <li>
    <p>此时，Visual Studio 将显示“远程连接”<b></b>对话框。如果以前使用过 <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm" target="_blank">PowerShell</a> 设置设备的唯一名称，可在此处输入该名称（在此示例中，我们使用的是 <b>my-device</b>）。</p>
    <p>否则，使用 Windows IoT 核心版设备的 IP 地址。在输入设备名称/IP 后，选择“通用(未加密协议)”<code></code>身份验证模式，然后单击“选择”<b></b>。</p>
    <p><img src="{{site.baseurl}}/Resources/images/AppDeployment/cs-remote-connections.PNG" /></p>
  </li>
  <li>
    <p>可通过导航到项目属性（在解决方案资源管理器中选择“属性”<b></b>）并在左侧选择“调试”<code></code>选项卡来验证或修改这些值：</p>
    <p><img src="{{site.baseurl}}/Resources/images/AppDeployment/cs-debug-project-properties.PNG" /></p>
  </li>
</ol>

