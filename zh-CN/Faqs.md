---
layout: default
title: 主页
permalink: /zh-CN/Faqs.htm
lang: zh-CN
---
<div class="row col-md-12">
    <div class="col-md-2 col-xs-12 faq-nav section-heading">
        <h1>常见问题</h1>
        <a href="#rpi2"><h4>设置 Raspberry Pi 2</h4></a> <a href="#uwp"><h4>UWP 应用</h4></a> <a href="#features"><h4>功能</h4></a> <a href="#galileo"><h4>Intel Galileo</h4></a> <a href="#errors"><h4>错误</h4></a>
    </div>

    <div class="col-md-8 col-md-offset-4 col-xs-8 col-xs-offset-4 section-heading">
        <a name="rpi2"></a>
        <h2 class="faq-h2">设置 Raspberry Pi</h2>
        <p class="bold"><em>我无法下载适用于 Raspberry Pi 的 Windows 10 IoT Core 映像。我看到一个空白屏幕。</em></p>
        <p>我们通过 Microsoft Connect 上的计划发布适用于 Raspberry Pi 2 的 Windows 10 IoT 核心版，同时提供一个用于 bug 报告和提供反馈的平台。若要能够下载该映像，你需要注册 Microsoft Connect 上的计划<u>并</u>已登录。如果你有没有注册 Microsoft Connect 上的计划，请<a href="https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558" target="_blank">单击此处注册</a>。你可以在<a href="http://ms-iot.github.io/content/SigninMSConnect.htm" target="_blank">此处</a>找到注册或使用 Microsoft Connect 的分步说明。如果已注册 Microsoft Connect 上的此计划并尝试再次注册，请不必担心。你只会看到一个空白页面。</p>
        <p>在尝试下载映像之前，请确保已登录 Microsoft Connect。</p>
        <p class="bold"><em>为什么我的屏幕看上去遭到裁剪或拉伸？</em></p>
        <p>某些监视器上可能会发生这种情况。若要解决此问题，请强制使开发板进入 DVI 模式（相对于HDMI 模式）。你可以在<a href='https://www.raspberrypi.org/forums/viewtopic.php?t=5851'>此处</a>阅读有关此问题的详细信息。将 SD 卡装载到本地电脑，然后继续编辑 EFIESP 分区中的文件。例如，如果分区标记为 H 驱动器，请通过添加以下行编辑 H:\config.txt。<br/><br/>
        <pre>hdmi_group=2                # 强制使用 DVI 定时</pre>
        <p class="bold"><em>是否可以使用 Windows 8.1 设置 Raspberry Pi 2？</em></p>
        <p>你将需要在电脑上安装 Windows 10，然后才能设置运行 Windows 10 IoT 核心版的 Raspberry Pi 2。</p>
		<p class="bold"><em>为什么我的 SD 卡必须是 8 GB，是否确实需要全部这些空间？</em></p>
        <p>IoT 核心版映像小于 1 GB，使用 8 GB 是为了提供在设备上安装其他内容的空间。</p>
		<p class="bold"><em>如何从我的 SD 卡中删除 Windows 10 IoT 核心版？</em></p>
        <p>将 Windows 10 IoT 核心版映像刷入 SD 卡后，报告的卡大小将下降至 67.3 MB。为了将卡还原回来以供常规使用，你将需要使用提升的命令提示符运行一系列命令（仅重新格式化卡将不起作用）：
		<ul>
		<li><kbd>diskpart</kbd></li>
		<li><kbd>list disk</kbd>（此命令可列出已连接到你的计算机的驱动器。请记下 SD 卡的磁盘编号）</li>
		<li><kbd>select disk &lt;number></kbd>（将 <kbd>&lt;number></kbd> 替换为上一步中 SD 卡的磁盘编号</li>
		<li><kbd>clean</kbd></li>
		<li><kbd>create partition primary</kbd></li>
		<li><kbd>format fs=ntfs quick</kbd></li>
		<li><kbd>exit</kbd></li>
		</ul>
		SD 卡现在已准备好再次用于常规用途。
       </p>
        <a name="uwp"></a>
        <h2 class="faq-h2">通用 Windows 平台 (UWP) 应用</h2>
        <p class="bold"><em>我在我的 Vistual Studio 计算机上收到“你需要启用开发人员模式”。我该怎么办？</em></p>
        <p>在后续 Windows 版本中，将提供一个“面向开发人员”的设置页面，可以通过此页面进行控制。在此之前，可以使用组策略编辑器解决此问题。<a href='https://msdn.microsoft.com/zh-CN/library/windows/apps/dn706236.aspx'>此处</a>提供更多详细信息</br>
        <ol>
        <li>运行 Gpedit.msc </li>
	<li>在 [“本地计算机策略”>“计算机配置”>“管理模板”>“Windows 组件”>“应用程序包部署”] 下，启用以下策略：</li>
	<ul><li>允许安装所有受信任应用（将启用企业应用等获得信任签名应用的旁加载）</li>
	<li>允许在不安装开发人员许可证的情况下开发 Windows 应用商店应用（将启用开发人员 F5 模式安装，其作用类似于 win8.1 上的开发人员许可证）</li>
	</ul></ol></p>
        <p class="bold"><em>Windows 10 IoT 核心版是否支持真正的控制台应用？</em></p>
        <p>无论有无外设，IoT 核心版操作系统都确实不会支持真正的“控制台”应用。你仍可以在此处部署和运行标准 win32 控制台应用，只不过它不会连接到任何设备上的控制台。在无外设运行时，应只看到该空白屏幕。在有外设运行时，唯一受支持的 UI 通过 UWP UI 堆栈（XAML、HTML、DirectX）支持。</p>
        <br />
        <a name="features"></a>
        <h2 class="faq-h2">功能</h2>
        <p class="bold"><em>Windows 10 IoT 核心版是否支持 Wi-Fi？</em></p>
        <p>我们仍在努力实现 W-iFi 支持，但目前公开提供的版本中不包含此功能。</p>
        <br />
        <p class="bold"><em>Windows 10 IoT 核心版当前是否支持蓝牙？</em></p>
        <p>我们仍在努力实现蓝牙支持，但目前公开提供的版本中不包含此功能。</p>
        <br />
        <a name="galileo"></a>
        <h2 class="faq-h2">Intel Galileo</h2>
        <p class="bold"><em>是否可以在 Intel Galileo 第 1 代或第 2 代板上运行 Windows 10 IoT 核心版？</em></p>
        <p>我们这次不打算将 Windows 10 引入 Intel Galileo 板。</p>
        <br />
        <p class="bold"><em>你是否将继续支持适用于 Galileo 的 IoT 的 Windows 开发人员计划？</em></p>
        <p>我们被大家对 Windows 8.1 计划的兴趣所打动，我们感激社区提供的所有不可思议的反馈。虽然我们不会再为 Galileo 版本开发任何新功能，但是只要存在重要的社区活动，我们都将继续支持此版本。</p>
        <br />
        <a name="errors"></a>
        <h2 class="faq-h2">错误</h2>
        <p class="bold"><em>我已下载 RPi2.ffu 映像并尝试使用以下命令通过管理员提示符应用映像：<br />dism.exe /Apply-Image /ImageFile:Rpi2.ffu /ApplyDrive:\\.\PhysicalDrive1 /SkipPlatformCheck<br />我收到以下错误：<br />c:\Temp>dism.exe /Apply-Image /ImageFile:Rpi2.ffu /ApplyDrive:\\.\PhysicalDrive1 /SkipPlatformCheck<br /><br />
        部署映像服务和管理工具<br />
        版本： 6.3.9600.17031<br /><br />
        错误： 87<br /><br />
        /applydrive 选项在此上下文中无法识别。<br />
        有关详细信息，请参考帮助。<br />
        </em></p>
        <p>你需要在 Windows 10 而不是 Windows 8.1 上使用 DISM。</p>
        <br />
        <p class="bold"><em>我想要通过远程电源 Shell 会话将文件从主计算机移动到 RP2 上。我已尝试在主计算机上创建一个共享文件夹（允许“所有人”访问），但当我尝试通过主机共享文件夹进行复制时，RP2 远程会话失败了，同时出现类似拒绝访问的错误。是否有人成功执行过此操作，或可以提供如何执行此操作的好建议吗？</em></p>
        <p>如果你只要尝试复制文件，并且不会在创作 PowerShell 脚本的过程中执行此操作，你可以在不使用 PowerShel 的情况下执行此操作。你可以尝试使用“\\<IP>\c$”从本地电脑访问 RPi2，并查看这是否适用于你的方案。如果无法执行该操作，则确实存在访问权限问题。</p>
        <br />
        <br />
        <p class="bold"><em>我的 C++ 或 Python 后台应用程序已成功生成并部署，但在启动后无限期地挂起。如何解决此问题？</em></p>
        <p>经主动调查，在某些 SD 卡上偶尔会发生某个已知问题。可以使用以下命令通过与设备的 PowerShell 会话来解决此问题：
        <div>reg add "hklm\software\microsoft\visualstudio\debugger" /v EmulateExclusiveBreakpoints /t REG_DWORD /d 0</div>        </p>
        <br />
        <p class="bold"><em>我 C# /VB UWP 应用已通过使用 Visual Studio 成功生成、部署和启动，但当我使用 iotstartup.exe 使我的应用成为“启动应用”时，我只能看到初始屏幕。如何解决此问题？</em></p>
        <p>经主动调查，在 C#/VB 应用成为“启动应用”时会发生某个已知问题。可以通过将应用配置更改为“发布”（而不是“调试”）并重新部署到你的设备来解决此问题。请注意，另一个解决方法是使用 C++ 而不是 C#/VB。</p>
        <br />
        <br />
        <p class="bold"><em>我的 C#/VB UWP 应用已成功生成、部署但未能成功启动，同时出现错误“无法激活 Windows 应用商店应用 [appX]”。激活请求失败，同时出现错误“等待操作超时”。如何解决此问题？</em></p>
        <p>如果你已将 Pi2 置于无外设模式而不是有外设模式，将发生这种情况。若要将其重新置于有外设模式，请通过 powershell 发布以下命令 </p>
        <p>setbootoption.exe headed</p>
        <br />
    </div>
</div>
