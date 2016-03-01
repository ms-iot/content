---
layout: default  
title: 摄像头示例  
permalink: /zh-cn/win10/samples/WebCamSample.htm  
lang: zh-cn  
---  
  
#摄像头示例  

{% include VerifiedVersion.md %}

我们将创建一个简单的应用，用于初始化摄像头、拍摄图片以及录制视频和音频。
  
这是一个有外设示例。若要更好地了解什么是有外设模式以及如何将你的设备配置为有外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。
  
###在 Visual Studio 中加载项目  
  
你可以通过在[此处](https://github.com/ms-iot/samples/tree/develop/WebCamSample/CS){:target="_blank"}下载所有示例的 zip 来查找此示例的源代码。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。
  
这是通用 Windows 应用程序
  
###连接你的摄像头  
  
你需将需要：
  
* <a name="USB_WebCam"></a>USB 网络摄像头（示例： [Microsoft Life Cam](http://www.microsoft.com/hardware/zh-cn/p/lifecam-hd-3000){:target="_blank"}）
  
将网络摄像头连接到 IoT 设备上的其中一个 USB 端口
  
###部署你的应用  
  
如果你要针对 Minnowboard Max 进行生成，请选择 `x86` 作为体系结构。如果你要针对 Raspberry Pi 2 或 DragonBoard 进行生成，请选择 `ARM`。

**仅适用于 DragonBoard：** 部署此应用之前，请禁用板载麦克风和声卡驱动程序。运行此应用就要在每次重启时执行此操作

{% highlight xml %} 
DragonBoard - Commands to disable audio and mic drivers:

devcon remove AUDD\QCOM2451
devcon remove ADCM\QCOM242E 
{% endhighlight %}  
  
选择“远程计算机”以指向 IoT 设备并点击 F5 以部署到你的设备。如需指导，请返回基本“Hello World”[示例]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm){:target="_blank"}。
  
###测试你的应用   
  
示例应用在部署时显示 2 个按钮：`Initialize Audio and Video` 和 `Initialize Audio Only`。以下是单击按钮时可用的操作的说明。
  
###初始化音频和视频：  
  
* 预览将显示在最左边的画布中。  
* `Take Photo` 在单击时会将照片存储在默认位置，并在中间的画布中显示最后捕获的照片。  
* `Start Video Record` 在单击时将开始录制。完成后，按 `Stop Video Record` 保存视频。视频在最右边的画布中自动播放  
  
###仅初始化音频：  
  
* `Start Audio Record` 在单击时将开始录制。完成后，按 `Stop Audio Record` 保存视频。音频将自动播放。  
  
**注意：** 为了听到音频，音频设备（例如：耳机）必须连接到 Raspberry Pi2 上的模拟音频输出。在 MinnowBoard Max 上，音频输出通过 HDMI 提供
  
恭喜你！ 你已创建你的第一个摄像头应用。
 
###我们来看看代码  
 
此示例代码使用 [Windows.Media.Capture](https://msdn.microsoft.com/zh-cn/library/windows/apps/windows.media.capture.aspx){:target="_blank"} 命名空间。
 
**MediaCapture** 类将用于使用连接到设备的网络摄像头枚举、连接到和执行操作。
 
若要访问网络摄像头、麦克风和默认存储文件夹，你必须将以下功能添加到项目中的 **Package.appxmanifest** 文件：

<img src="{{site.baseurl}}/Resources/images/PMWebCamOptions.png">

**注意：** 你还可以通过在 XML 编辑器中打开 **Package.appxmanifest** 文件（右键单击该文件 -\>“打开方式”-\>“XML\(文本\)编辑器”）并添加以下功能来直接添加功能：
 
{% highlight xml %}  
 <Capabilities>      
   <uap:Capability Name="videosLibrary" />  
   <uap:Capability Name="picturesLibrary" />  
   <DeviceCapability Name="microphone" />  
   <DeviceCapability Name="webcam" />  
 </Capabilities>  
{% endhighlight %}  
 
##初始化 MediaCapture 对象  
 
仅可初始化 **MediaCapture** 对象以捕获视频或音频。在示例中，
 
* 在单击 `Initialize Audio and Video` 时，**initVideo\_Click** 将为音频和视频初始化设备。   
* 在单击 `Initialize Audio Only` 时，**initAudioOnly\_Click** 仅为音频初始化设备。  
 
{% highlight C# %}  
private async void initVideo_Click(object sender, RoutedEventArgs e)  
{ 
   // ...  
 
   //Video and Audio is initialized by default  
   mediaCapture = new MediaCapture();  
   await mediaCapture.InitializeAsync();  
 
   // ...  
}  
 
private async void initAudioOnly_Click(object sender, RoutedEventArgs e)  
{  
   // ...  
     
   mediaCapture = new MediaCapture();  
   var settings = new Windows.Media.Capture.MediaCaptureInitializationSettings();  
   settings.StreamingCaptureMode = Windows.Media.Capture.StreamingCaptureMode.Audio;  
   settings.MediaCategory = Windows.Media.Capture.MediaCategory.Other;  
   settings.AudioProcessing = Windows.Media.AudioProcessing.Default;  
   await mediaCapture.InitializeAsync(settings);  
     
   // ...  
}  
{% endhighlight %}  
  
###音频和视频模式： 开始预览、捕获照片  
  
本部分介绍一些我们创建用于从摄像头显示预览和照片输出的 XAML 组件。首先我们创建一个 **CaptureElement** 用于预览，并创建一个 **Image** 用于所捕获的照片。
  
{% highlight xml %}  
<Canvas Name="PreviewCanvas" Grid.Row="1" Grid.Column="0" Width="320" Height="320" Background="Gray"  Margin="0,0,0,0" Visibility="Visible">  
    <CaptureElement x:Name="previewElement" Width="320" Height="320" HorizontalAlignment="Left" Visibility="Visible"/>  
</Canvas>  
  
<Canvas Name="PhotoCanvas" Grid.Row="1" Grid.Column="1" Width="320" Height="320" Background="Gray"  Margin="40,0,0,0" Visibility="Visible">  
    <Image x:Name="captureImage" Width="320" Height="320" Visibility="Visible"/>  
</Canvas>  
{% endhighlight %}  
  
当成功初始化相机时，我们在 **initVideo\_Click** 中开始预览。
  
当单击 `Take Photo` 按钮时，我们捕获图像、将其存储在默认存储中并在 **takePhoto\_Click** 中的 XAML 画布元素中显示它
  
{% highlight C# %}  
private async void initVideo_Click(object sender, RoutedEventArgs e)  
{  
    // ...  
  
    // Start Preview                  
    previewElement.Source = mediaCapture;  
    await mediaCapture.StartPreviewAsync();  
      
    // ...  
}  
  
private async void takePhoto_Click(object sender, TextChangedEventArgs e)  
{  
    // ...  
  
    photoFile = await KnownFolders.PicturesLibrary.CreateFileAsync(  
                    PHOTO_FILE_NAME, CreationCollisionOption.GenerateUniqueName);  
    ImageEncodingProperties imageProperties = ImageEncodingProperties.CreateJpeg();  
      
    await mediaCapture.CapturePhotoToStorageFileAsync(imageProperties, photoFile);  
      
    IRandomAccessStream photoStream = await photoFile.OpenReadAsync();  
    BitmapImage bitmap = new BitmapImage();  
    bitmap.SetSource(photoStream);  
    captureImage.Source = bitmap;  
  
    // ...  
}  
{% endhighlight %}  
  
###音频和视频模式： 录制视频并播放  
  
本部分介绍如何录制视频并进行播放。首先我们在 XAML 中创建 **MediaElement** 以播放视频
  
{% highlight xml %}  
<Canvas Name="VideoCanvas" Grid.Row="1" Grid.Column="2" Width="320" Height="320" Background="Gray" Margin="40,0,0,0" Visibility="Visible">  
    <MediaElement x:Name="playbackElement" Width="320" Height="320" Visibility="Visible"/>  
</Canvas>  
{% endhighlight %}  
  
当单击 `Start Video Record` 按钮时，我们将按钮上的内容更改为 `Stop Video Record`。
  
当单击此按钮时，将调用 **recordVideo\_Click**，并且我们将读取按钮的内容以确定是要开始还是停止视频录制。
  
下面的代码显示了我们实现此操作的方式。停止录制后，我们将视频存储在默认存储位置中，并在 XAML 画布元素中播放它。
  
**注意：** 为了听到音频，音频设备（例如：耳机）必须连接到 Raspberry Pi2 上的模拟音频输出。在 MinnowBoard Max 上，音频输出通过 HDMI 提供
  
{% highlight C# %}  
private async void recordVideo_Click(object sender, RoutedEventArgs e)  
{  
    // ...  
  
    if (recordVideo.Content.ToString() == "Start Video Record")  
    {          
        String fileName;  
        fileName = VIDEO_FILE_NAME;  
  
        recordStorageFile = await Windows.Storage.KnownFolders.VideosLibrary.CreateFileAsync(fileName,   
                                                            Windows.Storage.CreationCollisionOption.GenerateUniqueName);       
  
        MediaEncodingProfile recordProfile = null;  
        recordProfile = MediaEncodingProfile.CreateMp4(Windows.Media.MediaProperties.VideoEncodingQuality.Auto);  
  
        await mediaCapture.StartRecordToStorageFileAsync(recordProfile, recordStorageFile);  
        recordVideo.IsEnabled = true;  
        recordVideo.Content = "Stop Video Record";         
    }  
    else  
    {  
        status.Text = "Stopping video recording...";  
        await mediaCapture.StopRecordAsync();  
          
        var stream = await recordStorageFile.OpenReadAsync();  
        playbackElement.AutoPlay = true;  
        playbackElement.SetSource(stream, recordStorageFile.FileType);  
        playbackElement.Play();  
        recordVideo.Content = "Start Video Record";  
    }  
	  
    // ...  
}  
{% endhighlight %}  
  
###仅音频模式： 录制音频并播放  
  
本部分介绍如何录制音频并播放。首先我们在 XAML 中创建 **MediaElement** 以播放音频
  
{% highlight xml %}  
<Canvas Grid.Row="1" Grid.Column="3" x:Name='playbackCanvas3' Width='0' Height ='0' Margin="0,0,0,0">  
    <MediaElement  x:Name='playbackElement3' Width="0"  Height="0"/>  
</Canvas>  
{% endhighlight %}  
  
当单击 `Start Audio Record` 按钮时，我们将按钮上的内容更改为 `Stop Audio Record`。
  
当单击此按钮时，将调用 **recordAudio\_Click**，并且我们将读取按钮的内容以确定是要开始还是停止音频录制。
  
下面的代码显示了我们实现此操作的方式。停止录制后，我们将音频存储在默认存储位置中，并在 XAML 画布元素中播放它。
  
**注意：** 为了听到音频，音频设备（例如：耳机）必须连接到 Raspberry Pi2 上的模拟音频输出。在 MinnowBoard Max 上，音频输出通过 HDMI 提供
  
{% highlight C# %}  
private async void recordAudio_Click(object sender, RoutedEventArgs e)  
{  
    // ...  
  
    if (recordAudio.Content.ToString() == "Start Audio Record")  
    {     
        recordStorageFile = await Windows.Storage.KnownFolders.VideosLibrary.CreateFileAsync(AUDIO_FILE_NAME,   
                                                    Windows.Storage.CreationCollisionOption.GenerateUniqueName);       
  
        MediaEncodingProfile recordProfile = null;  
        recordProfile = MediaEncodingProfile.CreateMp4(Windows.Media.MediaProperties.VideoEncodingQuality.Auto);  
  
        await mediaCapture.StartRecordToStorageFileAsync(recordProfile, recordStorageFile);  
        recordAudio.IsEnabled = true;  
        recordAudio.Content = "Stop Audio Record";     
    }  
    else  
    {  
        status.Text = "Stopping audio recording...";  
  
        await mediaCapture.StopRecordAsync();  
  
        recordAudio.IsEnabled = true;  
        recordAudio.Content = "Start Audio Record";  
  
        var stream = await audioFile.OpenAsync(Windows.Storage.FileAccessMode.Read);  
        status.Text = "Playback recorded audio: " + audioFile.Path;  
        playbackElement3.AutoPlay = true;  
        playbackElement3.SetSource(stream, audioFile.FileType);  
        playbackElement3.Play();  
    }  
	  
    // ...  
}  
{% endhighlight %}  
  
###MediaCapture 回调  
  
示例中阐述了两个回调： **MediaCapture.Failed** 和 **MediaCapture.RecordLimitationExceeded**。
  
我们将在 **initVideo\_Click** 和 **initAudio\_Click** 函数中分配这些回调
  
{% highlight C# %}  
private async void initVideo_Click(object sender, RoutedEventArgs e)  
{  
    // ...  
  
    // Set callbacks for failure and recording limit exceeded      
    mediaCapture.Failed += new MediaCaptureFailedEventHandler(mediaCapture_Failed);  
    mediaCapture.RecordLimitationExceeded += new Windows.Media.Capture.RecordLimitationExceededEventHandler(mediaCapture_RecordLimitExceeded);  
	  
    // ...	  
}  
  
private async void initAudio_Click(object sender, RoutedEventArgs e)  
{  
    // ...  
  
    // Set callbacks for failure and recording limit exceeded      
    mediaCapture.Failed += new MediaCaptureFailedEventHandler(mediaCapture_Failed);  
    mediaCapture.RecordLimitationExceeded += new Windows.Media.Capture.RecordLimitationExceededEventHandler(mediaCapture_RecordLimitExceeded);  
	  
    // ...	  
}  
  
private void mediaCapture_Failed(MediaCapture currentCaptureObject, MediaCaptureFailedEventArgs currentFailure)  
{  
    // Display error message  
}  
  
public async void mediaCapture_RecordLimitExceeded(Windows.Media.Capture.MediaCapture currentCaptureObject)  
{  
    // ...  
      
    await Dispatcher.RunAsync(Windows.UI.Core.CoreDispatcherPriority.Normal, async () =>  
    {            
        await mediaCapture.StopRecordAsync();  
        isRecording = false;  
        recordAudio.Content = "Start Audio Record";  
        recordVideo.Content = "Start Video Record";  
      
        // Display error message and storage path for recorded files          
    });  
      
    // ...  
}  
{% endhighlight %}  
  
总结：
  
* 首先，我们创建 **MediaCapture** 对象以使用音频和视频设置或仅使用音频设置初始化网络摄像头  
  
* 基于用户输入，我们初始化相机预览、拍摄照片、录制视频或音频
  
* 媒体文件以适当方式存储，并且可以播放。
  
* 按需使用 **MediaCapture** 回调委派
