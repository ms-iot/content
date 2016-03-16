---
layout: default
title: Casablanca
permalink: /en-US/win8/samples/Casablanca.htm
lang: en-US
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>Support for Windows on Intel Galileo Gen 1 and Gen 2 will end on November 30, 2015</u></h4>
		<p><h5>As we continue to focus on providing a great experience for Makers with Windows 10 IoT Core, we've made the difficult decision to discontinue Windows support on the Galileo platform. We've seen some fantastic innovation with the platform, but unfortunately, it does not meet the minimum hardware requirements for Windows 10 IoT Core. Please click <a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">here</a> to learn more.</h5></p>
</div>

# C++ REST SDK (codename "Casablanca")
Learn how to build a project using the C++ REST SDK NuGet package

# Required NuGet Package(s)
* [C++ REST SDK](https://www.nuget.org/packages/cpprestsdk/){:target="_blank"}

# Build Casablanca
1. Download the [Casablanca CodePlex Git repository](http://casablanca.codeplex.com/SourceControl/latest){:target="_blank"}
2. Checkout Tag v2.2.0 on the master branch (9cc7758d714bebbc00d66bf9a49bb648e9a57c17)
* `git checkout v2.2.0`
3. Open *git_root_folder*\casablanca\casablanca120.desktop.sln
4. Set the casablanca120 project build settings to target IA32 architecture
* Project >> Properties >> Configuration Properties >> C/C++ >> Code Generation
* Set `Enable Enhanced Instruction Set` = `No Enhanced Instructions (/arch:IA32)` for both Debug and Release
5. Build the solution

# Place the lib on the Galileo
1. Navigate to `\\mygalileo\c$\test` in file explorer (create the "test" folder if necessary).
2. Copy the `cpprest120d_2_2.dll` file (generated during the build step and placed at *git_root_folder*\casablanca\Binaries\Win32\Debug), into the "test" folder from the previous step.

# Create a new project
1. Create a new project from the template.
2. Tools >> NuGet Package Manager >> Package Manager Console
* Type `Install-Package cpprestsdk -Version 2.2.0` into the command line.
3. Replace the existing code in main.cpp with the following code:


### NOTE:
* The Galileo does not support the websocket functionality of the C++ REST SDK library, please see the [WinHTTP WebSocket sample](https://code.msdn.microsoft.com/windowsdesktop/WinHTTP-WebSocket-sample-50a140b5){:target="_blank"} for websocket functionality.

# Code

### Main.cpp
{% highlight C++ %}
// Main.cpp : Defines the entry point for the console application.
//

#include <cpprest/http_client.h>
#include <cpprest/filestream.h>

#include "stdafx.h"
#include "arduino.h"

int _tmain(int argc, _TCHAR* argv[])
{
    return RunArduinoSketch();
}

void setup()
{
    std::shared_ptr<concurrency::streams::ostream> fileStream = std::make_shared<concurrency::streams::ostream>();

    // Open stream to output file.
    concurrency::task<void> requestTask = concurrency::streams::fstream::open_ostream(U("results.html")).then([=](concurrency::streams::ostream outFile)
    {
        *fileStream = outFile;

        // Create http_client to send the request.
        web::http::client::http_client client(U("http://www.bing.com/"));

        // Build request URI and start the request.
        web::http::uri_builder builder(U("/search"));
        builder.append_query(U("q"), U("Casablanca CodePlex"));
        return client.request(web::http::methods::GET, builder.to_string());

    })

    // Handle response headers arriving.
    .then([=](web::http::http_response response)
    {
        Log("Received response status code:%u\n", response.status_code());

        // Write response body into the file.
        return response.body().read_to_end(fileStream->streambuf());
    })

    // Close the file stream.
    .then([=](size_t)
    {
        return fileStream->close();
    });

    // Wait for all the outstanding I/O to complete and handle any exceptions
    try
    {
        requestTask.wait();
    }
    catch (const std::exception &e)
    {
        Log("Error exception:%s\n", e.what());
    }
}

// the loop routine runs over and over again forever:
void loop()
{
    _exit_arduino_loop();
}
{% endhighlight %}

---

[&laquo; Return to Samples](SampleApps.htm){:role="button"}{:class="btn btn-default"}
