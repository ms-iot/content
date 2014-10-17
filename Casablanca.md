---
layout: code
title: Casablanca
permalink: /Casablanca.htm
---

# C++ REST SDK (codename "Casablanca")
Learn how to build a project using the C++ REST SDK NuGet package

# Required NuGet Package(s)
* [C++ REST SDK](https://www.nuget.org/packages/cpprestsdk/){:target="_blank"}

# Build Casablanca
1. Download the [Casablanca CodePlex Git repository](http://casablanca.codeplex.com/SourceControl/latest){:target="_blank"}
2. Open *git_root_folder*\casablanca\casablanca120.desktop.sln
3. Set the casablanca120 project build settings to target IA32 architecture
* Project >> Properties >> Configuration Properties >> C/C++ >> Code Generation
* Set `Enable Enhanced Instruction Set` = `No Enhanced Instructions (/arch:IA32)` for both Debug and Release
4. Build the solution

# Place the lib on the Galileo
1. Navigate to `\\mygalileo\c$\test` in file explorer (create the "test" folder if necessary).
2. Copy the `cpprest120d_2_2.dll` file (generated during the build step and placed at *git_root_folder*\casablanca\Binaries\Win32\Debug), into the "test" folder from the previous step.

# Create a new project
1. Create a new project from the template.
2. Tools >> NuGet Package Manager >> Package Manager Console
* Type `Install-Package cpprestsdk` into the command line.
3. Replace the existing code in main.cpp with the following code:

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
        printf("Received response status code:%u\n", response.status_code());

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
        printf("Error exception:%s\n", e.what());
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
