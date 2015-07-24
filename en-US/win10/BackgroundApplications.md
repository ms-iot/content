---
layout: default
title: Background Applications
permalink: /en-US/win10/BackgroundApplications.htm
lang: en-US
---

##Background Applications

Background Applications are applications that have no direct UI. These applications launch at machine startup and run continuously without any process lifetime management resource use limitations. If they crash or exit the system will automatically restart them.
These Background Applications have a very simple execution model. The templates create a class that implements the "IBackgroundTask" interface and generates the empty "Run" method. This "Run" method is the entry point to your application.


![IBackground Task]({{site.baseurl}}/images/BackgroundApplications/backgroundTaskScreenshot.png)

There is one critical point to note: by default, the application will shut down when the run method completes. This means that apps that follow the common IoT pattern of running a server waiting for input or on a timer will find the app exit prematurely. To prevent this from happening you must call the "GetDeferral" method to prevent the application from exiting. You can find more information on the deferral pattern [here](https://msdn.microsoft.com/en-us/library/windows/apps/windows.applicationmodel.background.backgroundtaskdeferral.aspx).

