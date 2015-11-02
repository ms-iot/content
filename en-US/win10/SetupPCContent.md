<h2>  Download Windows 10 and Install Visual Studio 2015 </h2>
<hr>
<div class="row">
  <div class="col-md-8 col-sm-12">
    <p>To setup your Windows 10 IoT Core development PC, you first need to install the following:</p>
    <ol>
      <li><b>Make sure you are running the public release of Windows 10 (version 10.0.10240) or better</b>. You can upgrade from <a href="http://www.microsoft.com/en-us/software-download/windows10" target="_blank">here</a>. If you are already running Windows 10, you can find your current build number by clicking the start button, typing "winver", and hitting enter.</li>
      <li><b>Install Visual Studio 2015</b>
        <ul>
          <li>We recommend <a href="http://go.microsoft.com/fwlink/?LinkID=534599" target="_blank">Visual Studio Community Edition</a>, but Visual Studio Professional 2015 and Visual Studio Enterprise 2015 will work as well (available <a href="https://www.visualstudio.com/vs-2015-product-editions" target="_blank">here</a>).
          </li>
          <li>If you have to install Visual Studio, make sure to do a <b>Custom</b> install and select the checkbox <b>Universal Windows App Development Tools</b> -> <b>Tools and Windows SDK</b>.
          </li>
          <li>
           If you already have Visual Studio, you will be prompted to download the needed tools when attempting to run our solution in the next part of the tutorial.
          </li>
        </ul>
      </li>
      <li><b>Install Windows IoT Core Project Templates</b> from <a href="https://visualstudiogallery.msdn.microsoft.com/55b357e1-a533-43ad-82a5-a88ac4b01dec" target="_blank">here</a>.  Alternatively, the templates can be found by searching for *Windows IoT Core Project Templates* in the <a href="https://visualstudiogallery.msdn.microsoft.com/" target="_blank">Visual Studio Gallery</a> or directly from Visual Studio in the Extension and Updates dialog (Tools > Extensions and Updates > Online).</li>
      <li> <b>Enable developer mode</b> on your Windows 10 device by following <a href="https://msdn.microsoft.com/library/windows/apps/xaml/dn706236.aspx" target="_blank">these instructions</a>.  The relevant portion of the linked instructions is the "Windows 10 Desktops/tablets" section, as you should be attempting setup with one of these devices.</li>
      <li>Open Visual Studio 2015 and <b>create a Universal Windows Platform (UWP) App</b> by selecting 'File > New > Project > Visual C# > Windows > Universal > Blank App (Universal Windows)'.  This is required to ensure that the framework dependencies are available for our samples to build.</li>
    </ol>
  </div>
</div>

