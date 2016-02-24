---
layout: default
title: OneNote cloud services
permalink: /en-US/win10/samples/arduino-wiring/OneNote.htm
lang: en-US
---

# OneNote cloud services

{% include VerifiedVersion.md %}

Learn how to deploy an Arduino Wiring sketch on Raspberry Pi 2 and 3 or Minnowboard Max and use http messages to Get and Post OneNote pages.

# Create a new project

1. Create a new project from the template. More information can be found in the [Arduino Wiring Project Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm).
2. Replace the existing code in main.cpp with the following code. Make modifications for multiple action buttons as needed.
3. Add the following files to the project, MinHttpGP.cpp/.h, and OneNoteHelper.cpp/.h,
   found [on GitHub](https://github.com/ms-iot/sample-todo).

# Code

Replace the existing code in your main .ino file with the following code:

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

   
# Generate tokens

Your Windows Live account is secure and protected. In order to access the OneNote capabilities of the Windows Live API, we need to generate an access token that will give your app permissions.

There are a few ways to do this, and the Windows Live APIs can give you more information on generating tokens within the app. For now though, we're going to generate and insert a token into our program manually.

1. Paste this web address into your favorite web browser: [https://login.live.com/oauth20_authorize.srf?client_id=000000004812E454&scope=office.onenote%20wl.signin%20wl.basic%20office.onenote_create&response_type=token&redirect_uri=https:%2F%2Flogin.live.com%2Foauth20_desktop.srf](https://login.live.com/oauth20_authorize.srf?client_id=000000004812E454&scope=office.onenote%20wl.signin%20wl.basic%20office.onenote_create&response_type=token&redirect_uri=https:%2F%2Flogin.live.com%2Foauth20_desktop.srf)
2. You may be prompted to log in to your Microsoft account if you are not already logged in.
3. Select **Yes** to generate the needed token.
4. The browser will navigate to a seemingly blank page. This is OK.
5. Examine the web address in the address bar of your browser, it may be easier to copy the entire address to a text file or other document before completing step 6.
6. The token is included in the web address. You will see `#access_token=` near the beginning of the address. Copy everything beginning after the `=` up to but not including `&token_type=`. This token will be very long, on the order of 900 characters.
7. Paste the token value into the `const std::wstring oauth_token` string at the top of the .ino sketch (copied from above). (Replace the entire current contents: `<PASTE YOUR TOKEN HERE>`)


## Build and deploy
Press F5 to build and deploy your project.

Refer to the [Arduino Wiring Project Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm) for more instructions on how to deploy your app!


# Result

After deploying, you will be able to log in to OneNote live at [http://onenote.com/hrd](http://onenote.com/hrd) or open OneNote from your Windows Desktop and view a newly added "ToDo" page in your workbook!

If you also hook up a button to pin 29 (GPIO pin 5) and a simple POS printer, you can press the button to print your TODOs from your printer!

## Having trouble?

Refer to the [Arduino Wiring Porting Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm) for common issues and concerns when working with Arduino Wiring sketches.

---

[&laquo; Return to Samples]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm){:role="button"}{:class="btn btn-default"}
