<div class="row">
  <div class="col-md-12 col-xs-24 col-no-padding">
    <p>To setup your Windows 10 IoT Core development PC, you first need to set up Visual Studio 2015 Update 1 on your PC. Install the following:</p>
    <ol class="inline-list">
      <li><b>Make sure you are running the public release of Windows 10 (version 10.0.10240) or better</b>. You can upgrade from <a href="http://www.microsoft.com/en-us/software-download/windows10" target="_blank">here</a>. If you are already running Windows 10, you can find your current build number by clicking the start button, typing "winver", and hitting enter.</li>
      <li><b>Install Visual Studio Community 2015 <a href="http://go.microsoft.com/fwlink/?LinkID=534599" target="_blank">here</a>.</b> Visual Studio Professional 2015 and Visual Studio Enterprise 2015 can be downloaded from <a href="https://www.visualstudio.com/vs-2015-product-editions" target="_blank">here</a>.
      <p> NOTE: If you choose to install a different edition of Visual Studio 2015, make sure to do a Custom install and select the checkbox Universal Windows App Development Tools -> Tools and Windows SDK.</p>
      </li>
      <li><b>Update Visual Studio 2015</b>.If you already have Visual Studio 2015 installed, install Update 1 from the Extensions and Updates dialog in Visual Studio or from <a href="http://go.microsoft.com/fwlink/?LinkID=691134" target="_blank">here</a>
      <p> NOTE: If you already have the Univeral Windows App Development tools (UWP Tools), they will be updated. If you don't have the UWP Tools, you can add them to Visual Studio.</p>
      </li>
      <li><b>Validate your Visual Studio installation.</b> Selecting Help > About Microsoft Visual Studio will display version information.  The required version of Visual Studio is 14.0.24720.00 Update 1. The required version of Visual Studio Tools for Universal Windows Apps is 14.0.24720.00.</li>      <li><b>Install Windows IoT Core Project Templates</b> from <a href="https://visualstudiogallery.msdn.microsoft.com/55b357e1-a533-43ad-82a5-a88ac4b01dec" target="_blank">here</a>.  Alternatively, the templates can be found by searching for Windows IoT Core Project Templates in the <a href="https://visualstudiogallery.msdn.microsoft.com/" target="_blank">Visual Studio Gallery</a> or directly from Visual Studio in the Extension and Updates dialog (Tools > Extensions and Updates > Online).</li>
      <li> <b>Enable developer mode</b> on your Windows 10 device by following <a href="https://msdn.microsoft.com/library/windows/apps/xaml/dn706236.aspx" target="_blank">these instructions</a>.  The relevant portion of the linked instructions is the "Windows 10 Desktops/tablets" section, as you should be attempting setup with one of these devices.</li>
    </ol>
  </div>
  <div class="col-md-12 col-sm-24">
    <img src="{{site.baseurl}}/Resources/images/setup-pc.png" />
  </div>
</div>