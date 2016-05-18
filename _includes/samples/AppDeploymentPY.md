1. With the application open in Visual Studio, set the architecture in the toolbar dropdown. If you're building for MinnowBoard Max, select `x86`.  If you're building for Raspberry Pi 2 or 3, select `ARM`.

2. In the Visual Studio toolbar, make sure the target dropdown is set to `Remote Machine`<br/>

    ![RemoteMachine Target]({{site.baseurl}}/Resources/images/AppDeployment/py-remote-machine-debugging.png)

3. Next, right click on your project in the **Solution Explorer** pane. Select **Properties**.

    ![Remote Machine Debugging]({{site.baseurl}}/Resources/images/AppDeployment/py-project-properties.PNG)

4. Under **UWP Project Settings**, modify the following fields:

	* **Machine Name**: If you previously used [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) to set a unique name for your device, you can enter it here (in this example, we're using **my-device**).
	Otherwise, use the IP address of your Windows IoT Core device.
	* **Remote Port**: Set to **5678**

    ![Project Properties Debug Tab]({{site.baseurl}}/Resources/images/AppDeployment/py-debug-project-properties.PNG)