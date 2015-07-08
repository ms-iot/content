#Digital Signage App

This sample showcases a Digital Sign UWP running on Athens. Here we will demonstrate how the app receives content in different multimedia forms - e.g. video, audio, image, slideshow - from a service and to display this content to the user. The digital sign in this sample is interactive and allows web browsing as well as allowing for touch input. 

This is a headed sample.  To better understand what headed mode is and how to configure your device to be headed, follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm).

###Prerequisites

* Athens device running build 10152 or greater. 
* Mouse
* Keyboard
* Display monitor
  -  Optional: monitor with touch capabilities.

##Load the project in Visual Studio

You can find this sample [here](https://github.com/ms-iot/samples-private/tree/rtm){:target="_blank"}. Make a copy of the DigitalSignageUAP folder on your disk and open the project from Visual Studio.

Make sure you set the 'Remote Debugging' setting to point to your Windows IoT device. Go back to the basic 'Hello World' [sample]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm) if you need guidance.

##Deploy your app

If you're building for Minnowboard Max, select `x86` in the architecture dropdown.  If you're building for Raspberry Pi 2, select `ARM`.

When everything is set up, you should be able to press F5 from Visual Studio.  The Digital Signage app will deploy and start on the Windows IoT device, and you should see the main view page as displayed below:

<img src="{{site.baseurl}}/images/DigitalSignage/DigitalSignage1.png" height="400">

###Slideshow

The app's slideshow can be likened to a screensaver which displays while the app is idle and ends upon user input.

1. From the Main page, click (or tap, if your monitor is touch-enabled) "Play Slideshow". 

<img src="{{site.baseurl}}/images/DigitalSignage/DigitalSign_slideshow.png" height="400">

2. Slideshow begins - various content is displayed, including ads and screensaver visuals with audio.

<img src="{{site.baseurl}}/images/DigitalSignage/DigitalSign_blackberry.png" height="400">
<img src="{{site.baseurl}}/images/DigitalSignage/DigitalSign_horses.png" height="400">

3. End the slideshow by either a) moving your mouse, b) pressing any key or c) tap anywhere on the screen. The main page will return to the screen.

###Web Browser

1. From the Main page, click (or tap, if your monitor is touch-enabled) "Internet Explorer". 

<img src="{{site.baseurl}}/images/DigitalSignage/DigitalSign_web.png" height="400">

2. Tap or click the Address Bar at the top of the page.

3. Type "www.microsoft.com" into the address bar using either the physical or on-screen keyboard.

 When using the on-screen keyboard, you may click characters with your mouse or tap to type if your monitor is touch-enabled.
 
 <img src="{{site.baseurl}}/images/DigitalSignage/DigitalSign_keyboard1.png" height="400">
 
 <img src="{{site.baseurl}}/images/DigitalSignage/DigitalSign_keyboard2.png" height="400">
 
 4. Click or tap the "Go" button. This navigates the browser to the Microsoft home page
 
 <img src="{{site.baseurl}}/images/DigitalSignage/DigitalSign_microsoft.png" height="400">

 5. Navigate to other pages in the browser or return to the main screen by tapping or clicking the "Home" icon on the screen
 
 <img src="{{site.baseurl}}/images/DigitalSignage/DigitalSign_home.png" height="400">

###Feedback

1. From the Main page, click (or tap, if your monitor is touch-enabled) "Give feedback". 

<img src="{{site.baseurl}}/images/DigitalSignage/DigitalSign_feedback.png" height="400">

2. You may use this page to rate Windows, as well as leave any feedback comments

<img src="{{site.baseurl}}/images/DigitalSignage/DigitalSign_feedbackpage.png" height="400">

3. Clicking or tapping "Send" will take you back to the main page.

###Let's look at the code

Here we will walk though the code used to exercise the scenarios performed above.

###Slideshow

Navigate to Slideshow.xaml.cs.

    public sealed partial class SlideshowPage : Page
    {
        // ...
          List<string> imageExtensions = new List<string>(new string[] { ".bmp", ".gif", ".ico", ".jpg", ".png", ".wdp",".tiff" }); // MSDN
        // ...

A configuration file is used to specify which webpages, images and videos to show during the slideshow:

          readonly string defaultConfigFilePath = @"http://iot-digisign01/ds/config.xml";
          
The config file used by this app is shown below

        <?xml version="1.0" encoding="UTF-8"?>
          -<DigitalSignageConfig>
            <!--audio does not require duration attribute. It will be played back in a loop end to end-->
            -<Audio>
              <file path="http://iot-digisign01/ds/Fhol.wav"/>
              <file path="http://iot-digisign01/ds/midnightvoyage_48k_320.mp3"/>
            </Audio>
            -<Display>
              <!--Video does not require duration attribute. It will be played back in a loop end to end-->
              <!--<file path="http://iot-digisign01/ds/grb.mpg"/>-->
              <file path="http://iot-digisign01/ds/BlackBerry.mp4"/>
              <file path="http://iot-digisign01/ds/IoTVision.wmv"/>
              <!--image and webpage do require duration attribute so we know how long to show them-->
              <file path="http://iot-digisign01/ds/mad_men_poster.jpg" duration="30"/>
              <file path="http://iot-digisign01/ds/mandelbrot.png" duration="30"/>
              <file path="http://iot-digisign01/ds/MARBLES.BMP" duration="30"/>
              <!--Webpage requires a special attribute type and its value to be webpage-->
              <!--webpage URLs have to be XML escaped, e.g. below URL, & is replaced to &amp;. Not including the dot.Otherwise it will be considered as malformatted XML-->
              <!-- <file type="webpage" path="http://insights/Report?id=2b66e943-ed71-4a4d-a006-56da5008429b&amp;isPublished=true#_tab=0" duration="30"/> <file path="http://10.125.148.230/test/display/3.wmv"/> <file path="http://10.125.148.230/test/display/4.png"/> <file path="http://10.125.148.230/test/display/5.mp4"/> <file path="http://10.125.148.230/test/display/6.BMP"/> -->
            </Display>
        </DigitalSignageConfig>


          const string configValueName = "ConfigFilePath";        
          static List<object> audioList;
          static List<object> displayList;
          int currentIndexOfAudio = 0;
          int currentIndexOfDisplay = 0;
          static DispatcherTimer AcceptUserInputTimer;
      // ...
    }

 public async void StartSlideShow()
        {
            await GetConfigAndParse();
            DisplayNext();
        }
        
        async void DisplayNext()
        {
           // ...

            DisplayObject currentDO = (DisplayObject) displayList[currentIndexOfDisplay];
            
            if (currentDO.uri != null) // we're dealing with a WEB Page, show the WebView instance
            {
                videoInstance.Stop();
                
                // ...
                
                DisplayImageWEBTimer.Interval = new TimeSpan(0, 0, currentDO.duration);
                DisplayImageWEBTimer.Start();
                PlayAudio();
            }
            else // it must be StorageFile, i.e. image or video
            {
                if (imageExtensions.Contains(currentDO.file.FileType.ToLower()))
                {
                   // ...
                   
                    imageInstance.Visibility = Windows.UI.Xaml.Visibility.Visible;
                    imageSource = new BitmapImage(new Uri(currentDO.file.Path));
                    imageInstance.Width = imageSource.DecodePixelHeight = (int)this.ActualWidth;
                    imageInstance.Source = imageSource;
                    DisplayImageWEBTimer.Interval = new TimeSpan(0, 0, currentDO.duration);
                    DisplayImageWEBTimer.Start();
                    PlayAudio();
                }
                else // video
                {
                    // ...
                    
                    videoInstance.Source = new Uri(currentDO.file.Path);
                    videoInstance.Visibility = Windows.UI.Xaml.Visibility.Visible;
                    
                    // ... 
                    
                    videoInstance.Play();
                }
            }
            currentIndexOfDisplay = (++currentIndexOfDisplay) % displayList.Count; // make the index in a loop
        }

###Initialize the GPIO pin
