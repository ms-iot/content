---
layout: default
title: OneNote cloud services
permalink: /en-US/win8/samples/TODO_Sample.htm
lang: en-US
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>Support for Windows on Intel Galileo Gen 1 and Gen 2 will end on November 30, 2015</u></h4>
	<p><h5>As we continue to focus on providing a great experience for Makers with Windows 10 IoT Core, we've made the difficult decision to discontinue Windows support on the Galileo platform. We've seen some fantastic innovation with the platform, but unfortunately, it does not meet the minimum hardware requirements for Windows 10 IoT Core. Please click <a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">here</a> to learn more.</h5></p>
</div>

# OneNote cloud services
Learn how to use http messages to Get and Post OneNote pages

# Create a new project

1. Create a new project from the template.
2. Replace the existing code in main.cpp with the following code. Make modifications for multiple action buttons as needed.
3. Add the following files to the project, MinHttpGP.cpp/.h, MinXHttpRqst.cpp/.h, MinSer.cpp/.h and OneNoteHelper.cpp/.h,
   found in [Sample-ToDo](https://github.com/ms-iot/sample-todo)

# Code

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

[&laquo; Return to Samples](SampleApps.htm){:role="button"}{:class="btn btn-default"}
