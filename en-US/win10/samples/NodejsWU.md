---
layout: default
title: NodejsWU
permalink: /en-US/win10/samples/NodejsWU.htm
lang: en-US
---

##'Hello, World' Node.js (Windows Universal) Sample


###Set up your PC
* Follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/SetupPC.htm) to install Visual Studio 2015 Preview.
* Install [Node.js Tools 1.1 Beta for Visual Studio 2015](http://aka.ms/ntvslatest){:target="_blank"}.
* Install [NTVS IoT Extension]({{site.downloadurl}}) (This step requires that you have signed up with our program on Microsoft Connect. Instructions on how to do that can be found [here]({{site.baseurl}}/{{page.lang}}/Downloads.htm)).


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
* Enter the IP Address in the Remote Machine text box as shown below (--no-console and --debug arguments are required and added automatically).
* If you're building for Minnowboard Max, select `x86` in the dropdown.  If you're building for Raspberry Pi 2, select `ARM`.

    ![Node.js Windows Universal Project Properties]({{site.baseurl}}/images/Nodejs/nodejswu-properties.png)

* Now we're ready to deploy to the remote Windows IoT Core device. Simply press F5 (or select Debug \| Start Debugging) to start debugging the server.

  **Note:** In the Output window, you may see the message "Error - Cannot load packages." This doesn't affect the build process and can be ignored. Using the npm feature in your project is not yet supported.

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
