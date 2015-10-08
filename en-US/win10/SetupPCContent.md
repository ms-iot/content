{: .thin-header}
###Download Windows 10 and Install Visual Studio 2015

To setup your Windows 10 IoT Core development PC, you first need to install the following:

1. **Make sure you are running the public release of Windows 10 (version 10.0.10240) or better**. You can upgrade from [here](http://www.microsoft.com/en-us/software-download/windows10){:target="_blank"}. If you are already running Windows 10, you can find your current build number by clicking the start button, typing "winver", and hitting enter.

2. **Install Visual Studio 2015**
  - We recommend [Visual Studio Community Edition](http://go.microsoft.com/fwlink/?LinkID=534599){:target="_blank"}, but Visual Studio Professional 2015 and Visual Studio Enterprise 2015 will work as well (available [here](https://www.visualstudio.com/vs-2015-product-editions){:target="_blank"}).
  - If you have to install Visual Studio, make sure to do a **Custom** install and select the checkbox **Universal Windows App Development Tools** -> **Tools and Windows SDK**.
  - If you already have Visual Studio, you will be prompted to download the needed tools when attempting to run our solution in the next part of the tutorial.

3. **Install Windows IoT Core Project Templates** from [here](https://visualstudiogallery.msdn.microsoft.com/06507e74-41cf-47b2-b7fe-8a2624202d36).  Alternatively, the templates can be found by searching for *Windows IoT Core Project Templates* in the [Visual Studio Gallery](https://visualstudiogallery.msdn.microsoft.com/) or directly from Visual Studio in the Extension and Updates dialog (Tools > Extensions and Updates > Online).

4. **Enable developer mode** on your Windows 10 device by following [these instructions](https://msdn.microsoft.com/library/windows/apps/xaml/dn706236.aspx){:target="_blank"}.  The relevant portion of the linked instructions is the "Windows 10 Desktops/tablets" section, as you should be attempting setup with one of these devices.

5. Open Visual Studio 2015 and **create a Universal Windows Platform (UWP) App** by selecting 'File > New > Project > Visual C# > Windows > Universal > Blank App (Universal Windows)'.  This is required to ensure that the framework dependencies are available for our samples to build.
