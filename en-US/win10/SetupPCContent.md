###Setting up Visual Studio 2015 on your PC

To setup your Windows 10 IoT Core development PC, you first need to install the following:

1. **Make sure you are running the public release of Windows 10 (version 10240) or better**. You can upgrade from [here](http://www.microsoft.com/en-us/software-download/windows10){:target="_blank"}. If you are already running Windows 10, you can find your current build number by clicking the start button and typing "winver" and hitting enter.

2. **Install Visual Studio Community 2015** [here](http://go.microsoft.com/fwlink/?LinkID=534599){:target="_blank"}.  Visual Studio `Professional` 2015 and Visual Studio `Enterprise` 2015 can be downloaded from [here](https://www.visualstudio.com/vs-2015-product-editions){:target="_blank"}.

   **NOTE:** If you choose to install a different edition of VS 2015, make sure to do a **Custom** install and select the checkbox **Universal Windows App Development Tools** -> **Tools and Windows SDK**.

3. **Validate your Visual Studio installation** by selecting *Help > About Microsoft Visual Studio*.  The required version of **Visual Studio** is `14.0.23107.0 D14Rel`.  The required version of **Visual Studio Tools for Universal Windows Apps** is `14.0.23121.00 D14OOB`.

4. **Install Windows IoT Core Project Templates** from [here](https://visualstudiogallery.msdn.microsoft.com/06507e74-41cf-47b2-b7fe-8a2624202d36).  Alternatively, the templates can be found by searching for `Windows IoT Core Project Templates` in the [Visual Studio Gallery](https://visualstudiogallery.msdn.microsoft.com/) or directly from Visual Studio in the Extension and Updates dialog (Tools > Extensions and Updates > Online). 

5. Make sure you've **enabled developer mode** by following [these instructions](https://msdn.microsoft.com/library/windows/apps/xaml/dn706236.aspx){:target="_blank"}.



