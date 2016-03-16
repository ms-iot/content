---
layout: default
title: Casablanca
permalink: /zh-cn/win8/samples/Casablanca.htm
lang: zh-cn
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>对 Intel Galileo 第 1 代和第 2 代上的 Windows 的支持将于 2015 年 11 月 30 日结束</u></h4>
		<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台的 Windows 支持。我们看到了平台的一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>
</div>

# C++ REST SDK（代码名“Casablanca”）
了解如何使用 C++ REST SDK NuGet 包生成项目

# 必需的 NuGet 包
* [C++ REST SDK](https://www.nuget.org/packages/cpprestsdk/){:target="_blank"}

# 构建 Casablanca
1. 下载 [Casablanca CodePlex Git 存储库](http://casablanca.codeplex.com/SourceControl/latest){:target="_blank"}
2. 核对主分支上的标记 v2.2.0 \(9cc7758d714bebbc00d66bf9a49bb648e9a57c17\)
* `git checkout v2.2.0`
3. 打开 *git\_root\_folder*\\casablanca\\casablanca120.desktop.sln
4. 将 casablanca120 项目生成设置设置为面向 IA32 体系结构
* “项目”\>\>“属性”\>\>“配置属性”\>\>“C/C++”\>\>“代码生成”
* 针对调试和发布设置 `Enable Enhanced Instruction Set` = `No Enhanced Instructions (/arch:IA32)`
5. 生成解决方案

# 将 lib 放置在 Galileo 上
1. 使用文件资源管理器导航到 `\\mygalileo\c$\test`（如有必要，则创建“test”文件夹）。
2. 将 `cpprest120d_2_2.dll` 文件（它是在执行生成步骤期间生成的且被放置在 *git\_root\_folder*\\casablanca\\Binaries\\Win32\\Debug 下）复制到上一步中所创建的“test”文件夹中。

# 创建一个新项目
1. 从模板创建新项目。
2. “工具”\>\>“NuGet 包管理器”\>\>“程序包管理器控制台”
* 将 `Install-Package cpprestsdk -Version 2.2.0` 键入到命令行中。
3. 使用以下代码替换 main.cpp 中的现有代码：


### 注意：
* Galileo 不支持 C++ REST SDK 库的 websocket 功能；有关 websocket 功能的信息，请参阅 [WinHTTP WebSocket 示例](https://code.msdn.microsoft.com/windowsdesktop/WinHTTP-WebSocket-sample-50a140b5){:target="_blank"}。

# 代码

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

[&laquo; 返回到示例](SampleApps.htm){:role="button"}{:class="btn btn-default"}
