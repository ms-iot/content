---
layout: default
title: NodejsWU
permalink: /en-US/win10/samples/NodejsWU.htm
lang: en-US
---

##'Hello, World' Node.js (Windows Universal) Sample


###Set up your PC
* Follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/SetupPC.htm) to install Visual Studio 2015 Preview.
* Install NTVS (Node.js Tools for Visual Studio) Bundle VS 2015 from [here](https://github.com/ms-iot/ntvsiot/releases).
* To use the npm feature in NTVS, install Node.js on your machine from [here](https://nodejs.org/download/). Ensure that you select 'npm package manager' as one of the features to be installed.


###Create a new Node.js (Windows Universal) project
Start Visual Studio 2015 RC and create a new project (File \| New Project...). In the `New Project` dialog, navigate to `Node.js` as shown below (in the left pane in the dialog: Templates \| JavaScript \| Node.js).

Select the template `Basic Node.js Web Server (Windows Universal)`

![Node.js Windows Universal New Project Dialog]({{site.baseurl}}/images/Nodejs/nodejswu-newprojectdialog.png)


### 'Hello World' code
When the project is created, there will be a server.js file with the code below. It creates simple server that will respond with 'Hello World' when a request is made. Documentation on how to use the http module can be found [here](https://nodejs.org/api/http.html){:target="_blank"}.
<UL>
{% highlight JavaScript %}
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(1337);
{% endhighlight %}
</UL>


###Deploy the server to your Windows IoT Core device
* Go to the Project menu and select '<Your project name> Properties.' You could also right-click on the project node in solution explorer to access Properties.
* Enter the IP Address in the Remote Machine text box as shown below (the `--debug` argument is required for debugging and is added automatically).
* You can also add `--use-logger` as an argument to redirect console output to a file in the local storage folder of the UWP application
  (C:\Users\DefaultAccount\AppData\Local\Packages\&lt;Your Project Name&gt;_&lt;Publisher Hash String&gt;\LocalState\nodeuwp.log).
* If you're building for Minnowboard Max, select `x86` in the dropdown.  If you're building for Raspberry Pi 2, select `ARM`.

    ![Node.js Windows Universal Project Properties]({{site.baseurl}}/images/Nodejs/nodejswu-properties.png)

* Now we're ready to deploy to the remote Windows IoT Core device. Simply press F5 (or select Debug \| Start Debugging) to start debugging the server.

* When the server is running, open up a browser and enter the address http://&lt;IP address of your device&gt;:1337. The result should look like the picture below.

    ![Hello World Result]({{site.baseurl}}/images/Nodejs/helloworld-ie.PNG)

* You can set breakpoints, see variable values, etc. To stop the server, press on the 'Stop Debugging' button (or select Debug \| Stop Debugging).

    ![Debugging Screenshot]({{site.baseurl}}/images/Nodejs/debugging-vs.PNG)


### Universal Windows Platform (UWP) namespaces
UWP namespaces are available for you to use in Node.js. The code below returns the date and time instead of 'Hello World' in the previous example.
<UL>
{% highlight JavaScript %}
var http = require('http');
var uwp = require("uwp");
uwp.projectNamespace("Windows");
var calendar = new Windows.Globalization.Calendar();

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    var date = calendar.getDateTime();
    res.end(String(date));
}).listen(1337);

uwp.close();
{% endhighlight %}
</UL>

The result from the code above should look like this:

![DateTime Result]({{site.baseurl}}/images/Nodejs/datetime-ie.PNG)

### GitHub
* NTVS IoT Extension source code: [https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
* Node.js UWP wrapper source code: [https://github.com/ms-iot/node-uwp-wrapper](https://github.com/ms-iot/node-uwp-wrapper)
