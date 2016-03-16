---
layout: default
title: OneNote 云服务
permalink: /zh-cn/win8/samples/TODO_Sample.htm
lang: zh-cn
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>对 Intel Galileo 第 1 代和第 2 代的 Windows 的支持将于 2015 年 11 月 30 日结束</u></h4>
	<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台提供 Windows 支持。我们看到了平台上一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>
</div>

# OneNote 云服务
了解如何使用 GET 和 POST OneNote 页面的 http 消息。

# 创建一个新项目

1. 使用模板创建新项目。
2. 使用以下代码替换 main.cpp 中的现有代码。根据需要修改多个操作按钮。
3. 将在 [Sample-ToDo](https://github.com/ms-iot/sample-todo) 上找到的以下文件（MinHttpGP.cpp/.h、MinXHttpRqst.cpp/.h、MinSer.cpp/.h 和 OneNoteHelper.cpp/.h）添加到该项目。

# 代码

### Main.cpp

{% highlight C++ %}
    // Main.cpp : Defines the entry point for the console application.

    #include "stdafx.h"
    #include "arduino.h"
    #include "OneNoteHelper.h"
    #include "MinSerLib.h"
    #include <time.h>

    int _tmain(int argc, _TCHAR* argv[])
    {
        return RunArduinoSketch();
    }

    const int buttonPin = 2;
    int buttonState = 0;
    OneNoteHelper *One;
    std::list<std::wstring> skipIDs;
    MinSerClass * msc = nullptr;

    const char trailer[] = "\r\n\r\n\r\n----------\r\n\r\n\r\n";
    BYTE byteBuf[2048];

    void PostToDo(void)
    {
        // get current time
        char buf[80];
        time_t     now = time(0);
        struct tm  tstruct;
        localtime_s(&tstruct, &now);
        strftime(buf, sizeof(buf), "%Y-%m-%d.%X", &tstruct);

        // Write a page
        std::string message = "";
        message += "<!DOCTYPE html><html><head><title>TODO</title><meta name = \"created\" content = \"2014-10-13T07:00:00.000-7:00\" /></head>";
        message += "<body>";
        message += "<p>";
        message += buf;
        message += "</p>";
        message += "<p>Buy: milk, bread<br/>Pick up: laundry, dog<br/>Clean: floors, car<br />Fix: sink, door<br/>Appt: 6pm football</p>";
        message += "</body>";
        message += "</html>";
        One->PageWrite(message.c_str());
    }

    bool PrintToDo(bool force)
    {
        std::string respStr;

        // Read a page
        One->PageRead(respStr, skipIDs);

        if (force || respStr.length())
        {
            // Print it
            One->StripMarkup(respStr);
            if (msc->Open(L"\\\\.\\COM2") == S_OK) {
                respStr += trailer;
                strcpy_s((char*)byteBuf, _countof(byteBuf), respStr.c_str());
                msc->SchedWrite(byteBuf, respStr.length());
                int ok = msc->WaitToComplete(10000);
            }
        }

        return (respStr.length() != 0);
    }

    void setup()
    {
        pinMode(buttonPin, INPUT);

        One = new OneNoteHelper();
        One->_showLog = true;
        One->OpenNotebook(NULL, NULL, L"TODO", NULL);
        One->GetPageIDs(skipIDs);
        msc = new MinSerClass();
    }

    // the loop routine runs over and over again forever:
    void loop()
    {
        delay(100);

        // read the state of the pushbutton value:
        buttonState = digitalRead(buttonPin);
        if (buttonState == LOW) {
            Log(L"Pushbutton pressed .. \n");
            PostToDo();
            PrintToDo(true);
        }
    }

{% endhighlight %}

---

[&laquo; 返回示例](SampleApps.htm){:role="button"}{:class="btn btn-default"}
