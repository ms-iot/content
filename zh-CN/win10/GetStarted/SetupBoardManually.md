<p>最新 Insider Preview 映像的设置体验与我们其他产品略有不同。
以下流程将有助于你开始使用我们的最新版本（新鲜出炉！）。<br>
如果你有一个 Raspberry Pi 3，需要下载最新的 Insider Preview 映像。
</p>

<ol class="inline-list">
  <li value="1"><p><b>下载最新的 Insider Preview 映像</b>。</p>
    <p><a href="http://go.microsoft.com/fwlink/?LinkId=733603" class="button-blue button-flat">获取 Windows 10 IoT Core Insider Preview</a></p>
    你需要拥有有效的 Microsoft 帐户，并且需要注册 Windows 预览体验计划才能下载该 Insider Preview。
    有关更多详细信息，请访问<a href="http://go.microsoft.com/fwlink/p/?linkID=532967" target="_blank">此处</a>的下载页面。
  </li>
  <li value="2"><b>单击“Windows 10 IoT Core Insider Preview”下的所需映像。</b> 需要拥有 Microsoft 帐户，且必须参与 Windows 预览体验计划才能获得此映像的访问权限。加入 Windows 预览体验计划是免费的，任何人都可以加入。
  
  注册完成后，选择内部版本（编号越大，版本就越新）和你的设备，然后单击“立即下载”。</li>
  <li value="3">
    <p><b>找到已下载的 .ISO 并双击它。</b></p>
    <p><img src="{{site.baseurl}}/Resources/images/manual-setup/manual-step-1.png"></p>
  </li>
  <li value="4">
    <p><b>双击 Windows Installer 程序包 (.MSI)，然后按照安装步骤操作</b>
    <p><img src="{{site.baseurl}}/Resources/images/manual-setup/manual-step-2.png"></p>
    <p><img src="{{site.baseurl}}/Resources/images/manual-setup/manual-step-3.png"></p>
  </li>
  <li value="5"><b>启动 IoT 仪表板。</b> Windows 10 IoT 核心版仪表板允许你将下载的映像刷入你的 SD 卡。可以从<a href="http://go.microsoft.com/fwlink/?LinkID=708576" target="_blank">此处</a>下载 IoT 仪表板。 </li>     
  <li value="6">
    <p><b>单击“设置新设备”。</b> 在该处，从“设备类型”下拉列表中选择“自定义”。单击“浏览”按钮以找到你的映像 (.ffu) </p>
    <p><img src="{{site.baseurl}}/Resources/images/manual-setup/manual-step-5.png"></p>
    <p><img src="{{site.baseurl}}/Resources/images/manual-setup/manual-step-6.png"></p>
  </li>
  <li value="7">
    <p><b>导航到“C:\Program Files (x86)\Microsoft IoT\FFU\<i>DeviceType</i>”，然后选择 Flash.ffu。</b></p>
    <p><img src="{{site.baseurl}}/Resources/images/manual-setup/manual-step-7.png"></p>
  </li>  
  <li value="8">
    <p><b>单击“安装”。</b> 请注意，必须具有兼容的 SD 卡才能成功刷入。我们建议使用大小至少为 8 GB 的 Class 10 SD 卡。刷写完成后，可以取出 SD 卡并将其插入你的设备。</p>
    <p><img src="{{site.baseurl}}/Resources/images/manual-setup/manual-step-8.png"></p>
  </li>  
</ol>
