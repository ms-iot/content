---
layout: default
title: OneNote 云服务
permalink: /zh-cn/win10/samples/arduino-wiring/OneNote.htm
lang: zh-cn
---

# OneNote 云服务

{% include VerifiedVersion.md %}

了解如何在 Raspberry Pi 2 或 Minnowboard Max 上部署 Arduino 接线草图和如何使用 http 消息获取和发布 OneNote 页面。

# 创建新项目

1. 从模板创建新项目。可在 [Arduino 接线项目指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)中查找详细信息。
2. 使用以下代码替换 main.cpp 中的现有代码。根据需要修改多个操作按钮。
3. 将以下在 [GitHub](https://github.com/ms-iot/sample-todo) 上找到的文件（MinHttpGP.cpp/.h 和 OneNoteHelper.cpp/.h）添加到该项目。

# 代码

使用以下代码替换主 .ino 文件中的现有代码：

{% highlight C++ %}

#include "OneNoteHelper.h"
#include <time.h>

const std::wstring oauth_token = L"<PASTE YOUR TOKEN HERE>";

//change this pin number if using a different pin than GPIO 5 (pin 29)
const int buttonPin = GPIO_5;

int buttonState = 0;
OneNoteHelper *One;
std::list<std::wstring> skipIDs;

const std::wstring trailer = L"\r\n\r\n\r\n----------\r\n\r\n\r\n";
BYTE byteBuf[2048];

void PostToDo( void )
{
    // get current time
    char buf[80];
    time_t     now = time( 0 );
    struct tm  tstruct;
    localtime_s( &tstruct, &now );
    strftime( buf, sizeof( buf ), "%Y-%m-%d.%X", &tstruct );

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
    std::wstring wmessage = std::wstring( message.begin(), message.end() );
    One->PageWrite( wmessage );
}


bool PrintToDo( bool force )
{
    std::wstring respStr;

    // Read a page
    One->PageRead( respStr, skipIDs );

    if( force || respStr.length() )
    {
        // Print it
        One->StripMarkup( respStr );
        Log( L"OneNote page GET response:\n" );
        Log( respStr.c_str() );
    }

    return ( respStr.length() != 0 );
}

void setup()
{
    pinMode( buttonPin, INPUT );

    One = new OneNoteHelper();
    One->_showLog = true;
    One->OpenNotebook( NULL, NULL, L"TODO", oauth_token.c_str() );
    One->GetPageIDs( skipIDs );

    //we'll post the TODO list once when the program runs
    PostToDo();
}

// the loop routine runs over and over again forever:
void loop()
{
    delay( 100 );

    // read the state of the pushbutton value:
    buttonState = digitalRead( buttonPin );
    if( buttonState == LOW )
    {
        Log( L"Pushbutton pressed .. \n" );

        //since the button is being pressed, we'll retrieve the page info and output it
        PrintToDo( true );
		delay( 1000 );
    }
}

{% endhighlight %}

   
# 生成令牌

你的 Windows Live 帐户处于安全状态，且受到保护。为了访问 Windows Live API 的 OneNote 功能，我们需要生成能提供应用权限的访问令牌。

可使用多种方法执行此操作，并且 Windows Live API 可以向你提供有关在应用中生成令牌的详细信息。但现在，我们将生成一个令牌，并将其手动插入到程序中。

1. 将此 Web 地址粘贴到你最喜爱的 Web 浏览器中：[https://login.live.com/oauth20\_authorize.srf?client\_id=000000004812E454&scope=office.onenote%20wl.signin%20wl.basic%20office.onenote\_create&response\_type=token&redirect\_uri=https:%2F%2Flogin.live.com%2Foauth20\_desktop.srf](https://login.live.com/oauth20_authorize.srf?client_id=000000004812E454&scope=office.onenote%20wl.signin%20wl.basic%20office.onenote_create&response_type=token&redirect_uri=https:%2F%2Flogin.live.com%2Foauth20_desktop.srf)
2. 如果你尚未登录，系统可能会提示你登录 Microsoft 帐户。
3. 选择“是”来生成所需令牌。
4. 浏览器会导航到一个看似空白的页面。这很正常。
5. 在浏览器的地址栏中检查 Web 地址，在完成步骤 6 之前，它可能会更轻松地将整个地址复制到文本文件或其他文档中。
6. 令牌包括在 Web 地址中。你将会看到地址开头附近有 `#access_token=`。复制在 `=` 后开始的所有内容，但不包括 `&token_type=`。此令牌会很长，大约会到 900 个字符。
7. 将令牌值粘贴到位于 .ino 草图顶部（已从上面复制）的 `const std::wstring oauth_token` 字符串中。（替换当前所有内容：`<PASTE YOUR TOKEN HERE>`）


##生成和部署
按 F5 来生成并部署项目。

有关如何部署应用的详细说明，请参阅 [Arduino 接线项目指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)！


#结果

部署后，你将能够在 [http://onenote.com/hrd](http://onenote.com/hrd) 上实时登录 OneNote，或在 Windows 桌面上打开 OneNote 并在工作簿中查看新添加的“任务”页！

如果你还将某个按钮连接到引脚 29（GPIO 引脚 5）和一个简单的 POS 打印机，你可以按下该按钮来从你的打印机中打印任务！

##是否遇到难题?

有关在处理 Arduino 接线草图时会遇到的常见问题和关注内容，请参阅 [Arduino 接线移植指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm)。

---

[&laquo; 返回到示例]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm){:role="button"}{:class="btn btn-default"}
