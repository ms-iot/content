1. With the application open in Visual Studio, set the architecture in the toolbar dropdown. If you're building for MinnowBoard Max, select `x86`.  If you're building for Raspberry Pi 2 or 3, select `ARM`.

2. Next, in the Visual Studio toolbar, click on the `Local Machine` dropdown and select `Remote Machine`<br/>

    ![RemoteMachine Target]({{site.baseurl}}/Resources/images/AppDeployment/cpp-remote-machine-debugging.png)

3. Next, right click on your project in the **Solution Explorer** pane. Select **Properties**. 

    ![Remote Machine Debugging]({{site.baseurl}}/Resources/images/AppDeployment/cpp-project-properties.PNG)

4. Under **Configuration Properties -> Debugging**, modify the following fields:

	* **Machine Name**: If you previously used [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) to set a unique name for your device, you can enter it here (in this example, we're using **my-device**). 
Otherwise, use the IP address of your Windows IoT Core device.
	* **Authentication Mode**: Set to **Universal (Unencrypted Protocol)**

    ![Project Properties Debug Tab]({{site.baseurl}}/Resources/images/AppDeployment/cpp-debug-project-properties.PNG)