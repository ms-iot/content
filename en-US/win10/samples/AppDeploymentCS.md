1. With the application open in Visual Studio, set the architecture in the toolbar dropdown. If you're building for MinnowBoard Max, select `x86`.  If you're building for Raspberry Pi 2, select `ARM`.

2. Next, in the Visual Studio toolbar, click on the `Local Machine` dropdown and select `Remote Machine`<br/>

    ![RemoteMachine Target]({{site.baseurl}}/images/AppDeployment/cs-remote-machine-debugging.png)

3. At this point, Visual Studio will present the **Remote Connections** dialog. If you previously used [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) to set a unique name for your device, you can enter it here (in this example, we're using **my-device**). 
Otherwise, use the IP address of your Windows IoT Core device. After entering the device name/IP select `None` for Windows Authentication, then click **Select**.

    ![Remote Machine Debugging]({{site.baseurl}}/images/AppDeployment/cs-remote-connections.PNG)

4. You can verify or modify these values by navigating to the project properties (select **Properties** in the Solution Explorer) and choosing the `Debug` tab on the left:

    ![Project Properties Debug Tab]({{site.baseurl}}/images/AppDeployment/cs-debug-project-properties.PNG)