###Setting up Visual Studio 2015 on your PC

To setup your Windows 10 IoT Core development PC, you first need to install the following:

1. **Install Windows 10**

2. **Install Visual Studio Community 2015** [here](http://go.microsoft.com/fwlink/?LinkID=534599){:target="_blank"}.  Visual Studio `Professional` 2015 and Visual Studio `Enterprise` 2015 can be downloaded from [here](https://www.visualstudio.com/vs-2015-product-editions){:target="_blank"}.

  **NOTE:** If you choose to install a different edition of VS 2015, make sure to do a **Custom** install and select the checkbox **Universal Windows App Development Tools** -> **Tools and Windows SDK**.

3. **Install Windows IoT Core Project Templates** from [here](https://visualstudiogallery.msdn.microsoft.com/06507e74-41cf-47b2-b7fe-8a2624202d36).  Alternatively, the templates can be found by searching for `Windows IoT Core Project Templates` in the [Visual Studio Gallery](https://visualstudiogallery.msdn.microsoft.com/) or directly from Visual Studio in the Extension and Updates dialog (Tools > Extensions and Updates > Online).

4. Make sure you've **enabled developer mode** by following [these instructions](https://msdn.microsoft.com/library/windows/apps/xaml/dn706236.aspx){:target="_blank"}.

5. Open Visual Studio 2015 and **create a Universal Windows Platform (UWP) App** by selecting `File > New > Project > Visual C# > Windows > Universal > Blank App (Universal Windows)`.  This is required to ensure that the framework dependencies are available for our samples to build.
