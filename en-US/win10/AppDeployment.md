---
layout: default
title: Deploying an App with Visual Studio
permalink: /en-US/win10/AppDeployment.htm
lang: en-US
---

## Deploying an App with Visual Studio

Deploying and debugging your application is straightforward with Visual Studio. We'll use the **Remote Debugging** feature to deploy the app to your locally connected IoT Core device. 

* [C# App Deployment](#csharp)
* [C++ App Deployment](#cpp)
* [Python App Deployment](#python)

**NOTE:** In order to use remote debugging, your IoT Core device must first be connected to same local network as your development PC. See the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/ConnectToDevice.htm).

<a name="csharp"/>

### Deploy a C# app to your Windows IoT Core device 

{% include_relative samples/AppDeploymentCS.md %}

5. Now we're ready to deploy. Simply press F5 (or select Debug \| Start Debugging) to start debugging our app. You should see the app come up in Windows IoT Core device screen.

6. Once deployed, you can set breakpoints, see variable values, etc. To stop the app, press on the 'Stop Debugging' button (or select Debug \| Stop Debugging).

7. Having successfully deployed and debugged your UWP application, create a Release version by simply changing the Visual Studio toolbar configuration dropdown from `Debug` to `Release`.  You can now build and deploy your app to your device by selecting Build \| Rebuild Solution and Build \| Deploy Solution.

<a name="cpp"/>

### Deploy a C++ app to your Windows IoT Core device

{% include_relative samples/AppDeploymentCPP.md %}

5. Now we're ready to deploy. Simply press F5 (or select Debug \| Start Debugging) to start debugging our app. You should see the app come up in Windows IoT Core device screen.

6. Once deployed, you can set breakpoints, see variable values, etc. To stop the app, press on the 'Stop Debugging' button (or select Debug \| Stop Debugging).

7. Having successfully deployed and debugged your UWP application, create a Release version by simply changing the Visual Studio toolbar configuration dropdown from `Debug` to `Release`.  You can now build and deploy your app to your device by selecting Build \| Rebuild Solution and Build \| Deploy Solution.

<a name="python"/>

### Deploy a Python app to your Windows IoT Core device

{% include_relative samples/AppDeploymentPY.md %}

5. Now we're ready to deploy. Simply press F5 (or select Debug \| Start Debugging) to start debugging our app.You should see the app come up in Windows IoT Core device screen.

6. Once deployed, you can set breakpoints, see variable values, etc. To stop the app, press on the 'Stop Debugging' button (or select Debug \| Stop Debugging).

7. Having successfully deployed and debugged your UWP application, create a Release version by simply changing the Visual Studio toolbar configuration dropdown from `Debug` to `Release`.  You can now build and deploy your app to your device by selecting Build \| Rebuild Solution and Build \| Deploy Solution.
