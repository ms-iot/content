---
layout: default
title: 数字签名 UWP 示例
permalink: /zh-cn/win10/samples/DigitalSignage.htm
lang: zh-cn
---

#数字签名应用

{% include VerifiedVersion.md %}

此示例展示了一个可在 Windows IoT 核心版上运行的数字签名 UWP。下面我们将演示该应用如何从联机存储的 XML 文件中以各种多媒体形式（如视频、音频、图像、幻灯片放映）接收内容，以及将此内容显示给用户。该示例中的数字签名是交互式的，并且允许 Web 浏览和支持触摸输入。

这是一个有外设示例。若要更好地了解什么是有外设模式以及如何将你的设备配置为有外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。

###先决条件

* 运行 Windows IoT 核心版 10240 或更高版本的设备。 
* 鼠标
* 键盘
* 显示监视器
  -  可选：具有触摸功能的监视器。

##在 Visual Studio 中加载项目

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\DigitalSignageUAP` 来查找此示例的源代码。在磁盘上创建 DigitalSignageUAP 文件夹的副本，然后从 Visual Studio 中打开项目。

确保将“远程调试”设置设为指向 Windows IoT 设备。如需指导，请返回基本“Hello World”[示例]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm)。

##部署你的应用

如果你正在构建 Minnowboard Max，请选择体系结构下拉列表中的 `x86`。如果你正在构建 Raspberry Pi 2，请选择 `ARM`。

完成所有设置后，你应可以在 Visual Studio 中按 F5。数字签名应用将部署并在 Windows IoT 设备上启动，你应该能看到主视图页，如下所示：

<img src="{{site.baseurl}}/Resources/images/DigitalSignage/DigitalSignage1.png" height="400">

###幻灯片放映

应用的幻灯片放映好比屏幕保护程序，前者会在应用空闲时显示，而在用户输入时终止。

1. 在主页面中，单击（或点击，前提是你的显示器支持触摸）“播放幻灯片放映”。 

<img src="{{site.baseurl}}/Resources/images/DigitalSignage/DigitalSign_slideshow.png" height="400">

2. 幻灯片放映开始时 - 将显示各式各样的内容，包括带有音频的广告和屏幕保护程序视觉画面。

<img src="{{site.baseurl}}/Resources/images/DigitalSignage/DigitalSign_horses.png" height="400">

3. 可通过以下方式结束幻灯片放映：a\) 移动鼠标；b\) 按任意键；或者 c\) 点击屏幕上的任意位置。主页面将返回至屏幕。

###Web 浏览器

1. 在主页面中，单击（或点击，前提是你的监视器支持触摸）“Internet Explorer”。 

<img src="{{site.baseurl}}/Resources/images/DigitalSignage/DigitalSign_web.png" height="400">

2. 点击或单击该页面顶部的地址栏。

3. 使用物理键盘或屏幕键盘，在地址栏中键入“www.microsoft.com”。

 当使用屏幕键盘时，你可以用鼠标来单击字符，或点击以键入（如果你的监视器支持触摸）。
 
 <img src="{{site.baseurl}}/Resources/images/DigitalSignage/DigitalSign_keyboard2.png" height="400">
 
 4. 单击或点击“转到”按钮。这会将浏览器导航到 Microsoft 主页
 
 <img src="{{site.baseurl}}/Resources/images/DigitalSignage/DigitalSign_microsoft.png" height="400">

 5. 在浏览器中导航到其他页面，或通过功点击或单击屏幕上的“主页”图标返回到主屏幕
 
 <img src="{{site.baseurl}}/Resources/images/DigitalSignage/DigitalSign_home.png" height="400">

##查看代码

下面我们将演示用于执行幻灯片放映方案的代码。

###幻灯片放映

导航到 Slideshow.xaml.cs。观察 imageExtensions 变量维护预期图像类型的列表

    public sealed partial class SlideshowPage : Page
    {
        // ...
          List<string> imageExtensions = new List<string>(new string[] { ".bmp", ".gif", ".ico", ".jpg", ".png", ".wdp",".tiff" }); // MSDN
        // ...
     }

XML 文件用于指定要在幻灯片放映期间查看的网页、图像和视频。在此文件中找到的媒体元素将存储在“幻灯片放映”列表中，该列表会随着幻灯片的播放循环下去。

    readonly string defaultConfigFilePath = @"Assets\config.xml";
          
可以在项目的“资源”目录下找到本示例所使用的配置文件 config.xml。你可以将此文件用作模板，以创建你自己的个性化配置文件。

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
        
启动幻灯片放映将读取示例配置文件并开始显示幻灯片放映。

        public async void StartSlideShow()
        {
            await GetConfigAndParse();
            DisplayNext();
        }

在 GetConfigAndParse\(\) 方法中，将会分析配置文件。然后，每个媒体元素都表示为一个复制到你的 Windows 10 IoT 核心版设备的文件。这些元素用于创建幻灯片放映播放列表。

    public async Task GetConfigAndParse()
    {
      // ....
      
      DisplayObject DO = new DisplayObject();
      string filename = fileElement.Attribute("path").Value.Substring(fileElement.Attribute("path").Value.LastIndexOf('/') + 1);
      StorageFile file = await tmp.CreateFileAsync(filename, CreationCollisionOption.ReplaceExisting);
      byte[] bytes = File.ReadAllBytes(filename);
      await FileIO.WriteBufferAsync(file, WindowsRuntimeBufferExtensions.AsBuffer(bytes));
      
      if (fileElement.Attribute("duration") != null) // this is an image
        DO.duration = Convert.ToInt32(fileElement.Attribute("duration").Value);
        
      DO.file = file;
      
      tmpList.Add(DO);
      
      // ...
                      
      }
在 DisplayNext\(\) 方法中，我们将遍历从配置文件获取的媒体文件列表，从而对各种文件类型（音频文件、视频、网页）进行相应处理。

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
        
  注意： 你可能会导航到应用中的“设置”菜单，以将配置文件更改为所选的其他文件。
  
  1. 在主页面中，单击（或点击，前提是你的监视器支持触摸）“设置”。 

<img src="{{site.baseurl}}/Resources/images/DigitalSignage/DigitalSign_settings.png" height="400">

 2. 通过使用物理键盘或触摸屏，你可以指定新的配置文件以从指定位置读取。

<img src="{{site.baseurl}}/Resources/images/DigitalSignage/DigitalSign_settings1.png" height="400">

