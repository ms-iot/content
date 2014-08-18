---
layout: code
title: Imaging on Windows 7
permalink: /ImageOnWin7.htm
---

# Imaging on Windows 7
The apply-bootmedia.cmd only works on Windows 8 and 8.1 development machines. To image on Windows 7 you need to update your apply-bootmedia.cmd by:

* Download and install the [Windows Assessment and Deployment Kit (Windows ADK) for Windows 8.1 Update](http://www.microsoft.com/en-us/download/details.aspx?id=39982){:target="_blank"}
  * Select the “Deployment Tools” feature in the installer
* Locate the full path to the Dism.exe tool installed with the Windows ADK
* Using a text editor update each path reference of Dism.exe in apply-bootmedia.cmd to the full path reference of Dism.exe from the Windows ADK 
* Save apply-bootmedia.cmd
* Continue with the "Updating your Intel Galileo" instructions

Example:

~~~
"%SystemRoot%\System32\Dism.exe" --> "C:\Program Files (x86)\Windows Kits\8.1\Assessment and Deployment Kit\Deployment Tools\amd64\DISM\Dism.exe"
~~~

<br/>
<a class="btn btn-default" href="index.htm" role="button">Return to homepage</a>
