<h3> Deploy Your App </h3>

<ol class="setup-content-list">
  <li>With the application open in Visual Studio, set the architecture in the toolbar dropdown. If you're building for MinnowBoard Max, select <code>x86</code>.  If you're building for Raspberry Pi 2, Raspberry Pi 3 or the DragonBoard, select <code>ARM</code>.</li>
  <li>
  <p>Next, in the Visual Studio toolbar, click on the <code>Local Machine</code> dropdown and select <code>Remote Machine</code></li></p>
  <p><img src="{{site.baseurl}}/Resources/images/AppDeployment/cs-remote-machine-debugging.png" /></p>
  </li>
  <li>
    <p>At this point, Visual Studio will present the <b>Remote Connections</b> dialog. If you previously used <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm" target="_blank">Powershell</a> to set a unique name for your device, you can enter it here (in this example, we're using <b>my-device</b>).</p>
    <p>Otherwise, use the IP address of your Windows IoT Core device. After entering the device name/IP select <code>Universal (Unencrypted Protocol)</code> Authentication Mode, then click <b>Select</b>.</p>
    <p><img src="{{site.baseurl}}/Resources/images/AppDeployment/cs-remote-connections.PNG" /></p>
  </li>
  <li>
    <p>You can verify or modify these values by navigating to the project properties (select <b>Properties</b> in the Solution Explorer) and choosing the <code>Debug</code> tab on the left:</p>
    <p><img src="{{site.baseurl}}/Resources/images/AppDeployment/cs-debug-project-properties.PNG" /></p>
  </li>
</ol>

