---
layout: default
title: 高级用法
permalink: /zh-cn/win8/AdvancedUsage.htm
lang: zh-cn
---

# 高级用法
此页介绍了你可以使用在 Intel Galileo 上运行的 Windows 所执行的操作。

##通信

### 打开到你的 Galileo 的网络共享
打开一个文件资源管理器窗口并在地址栏中键入以下内容：

~~~
\\<name of your Galileo>\c$
~~~

### 允许 HardwareSerial 使用 UART 端口
这将从内核调试程序使用更改它。

1. 关闭 Galileo 并删除电源
1. 删除 microSD 卡并将其插入电脑 - 在此示例中，它被装载为驱动器 `K:`
1. 以管理员身份运行命令提示符

```
   bcdedit /store k:\efi\microsoft\boot\bcd /enum
   bcdedit /store k:\efi\microsoft\boot\bcd /set {default} debug No
   bcdedit /store k:\efi\microsoft\boot\bcd /set {default} testsigning OFF
   bcdedit /store k:\efi\microsoft\boot\bcd /enum

```

1. 现在“不可以”验证调试和 testsigning
1. 从电脑安全卸除 MicroSD（从 Windows 资源管理器弹出）
1. 将 micro-SD 放置在 Galileo 中并接通电源

## 将 WLAN 设置到以太网适配器
可以通过使用 [Wi-Fi 到以太网桥](http://www.newegg.com/Product/ProductList.aspx?Submit=ENE&DEPA=0&Order=BESTMATCH&Description=wireless+to+ethernet+adapter&N=-1&isNodeId=1"){:target="_blank"}将 Intel Galileo 无线连接到 Internet。

![]({{site.baseurl}}/Resources/images/galileo-wifi-bridge.png)

Netgear WNCE2001 如图所示

## 将电脑的网络连接桥接到 Galileo
通过共享或"桥接"你电脑的网络连接，你可以提供 Internet 连接（以无线或其他方式）。当你直接将你的 Galileo 连接到你的电脑（如[此处](SetupGalileo.htm){:target="_blank"}所述）时，则可以通过以下步骤共享该电脑使用的网络连接，以使用 Galileo 连接到 Internet：

1. 从“开始”屏幕打开"<b>网络和共享中心</b>"。

   ![]({{site.baseurl}}/Resources/images/Start_NetworkandSharingCenter.png)

1. 从左侧的列选择 ```Change adapter settings```。

   ![]({{site.baseurl}}/Resources/images/NetworkandSharingCenter.png)

1. 在网络连接设置中，从 ```Organize``` 下拉菜单选择 ```Layout->Menu bar```。

   ![]({{site.baseurl}}/Resources/images/NetworkConnections.png)

1. 选择“以太网”连接（到 Galileo）和其他连接（到 Internet）\[“WLAN”如图所示\]。

   ![]({{site.baseurl}}/Resources/images/NetworkBridgeConnections.png)

1. 等待要创建的连接

   ![]({{site.baseurl}}/Resources/images/Status_BridgeWait.png)

1. 创建桥而且新的连接显示后，将该桥标记为"网桥"。

   ![]({{site.baseurl}}/Resources/images/NetworkBridge.png)

现在，已设置你的网桥，你的 Galileo 应该能够通过你电脑的 Internet 连接访问 Internet。从 Telnet 会话到 Galileo 使用 ```ping bing.com``` 来确认。

---

##自定义 Windows

### 使你的 Galileo 在启动时运行 exe
1. 从文件资源管理器窗口，导航到 ```\\mygalileo\c$\Windows\System32\Boot```
1. 如果系统提示你作为 \\Administrator 输入用户名并以管理员身份输入密码
1. 右键单击 ```autorun.cmd```，然后选择“编辑”
1. 在文件末尾添加：```start YourAppLocation\YourAppName.exe```

### 更改你的 Galileo 的名称
通过 Telnet，使用以下行运行 SetComputerName

~~~
SetComputerName YourNewName
~~~


如果更改 Galileo 的名称，则它将中断远程部署，而且你将需要更改所有项目上的远程调试/部署设置来匹配。

### 查看/终止活动的任务

通过 Telnet，运行“tlist”查看当前运行的任务

~~~
C:\>tlist
    0 System Process
    4 System176 smss.exe
  256 csrss.exe
  284 wininit.exe
  292 csrss.exe
  308 winlogon.exe
  328 services.exe
  340 lsass.exe
  420 svchost.exe
  752 cmd.exe
  764 msvsmon.exe
  772 Galileo_eboot.exe
  780 httpsrv.exe
  788 ftpd.exe
  796 telnetd.exe
  804 mwstartnet.exe
  860 msvsmon.exe
 1284 TemperatureSensor.exe
 1472 cmd.exe
  112 tlist.exe
~~~

通过 Telnet，运行“终止 PID”或“终止名称”终止当前运行的任务

~~~
C:\>kill 1284
process TemperatureSensor.exe (1284) - '' killed

C:\>kill TemperatureSensor.exe
process TemperatureSensor.exe (1284) - '' killed
~~~

使用“终止名称”将关闭具有该名称的所有任务。


##将驱动程序添加到 Windows
如果你构建你自己的驱动程序，则可以使用以下步骤在 Windows 上安装它。如果尝试在 Intel Galileo 上安装专为桌面 Windows 设计的驱动程序，则它将可能由于缺少依赖关系或者由于 Quark 指令集而失败。

1. 将你的 Windows 映像（.wim 文件）复制到"C:\\Temporary\\images"
1. 复制你想要添加到"C:\\Temporary\\drivers"的驱动程序
1. 在"C:\\Temporary"中创建名为"offline"的空文件夹，以致最终路径将为"C:\\Temporary\\offline"
1. 以管理员身份运行命令行 \(cmd.exe\)。


~~~
Dism /Get-WimInfo /WimFile:C:\Temporary\images\9600.16384.x86fre.winblue_rtm_iotbuild.140731-1000_galileo_v1.wim
Deployment Image Servicing and Management tool
      Version: 6.3.9600.17031
      Details for image : C:\Temporary\images\9600.16384.x86fre.winblue_rtm_iotbuild.140731-1000_galileo_v1.wim
      Index : 1
      Name : MODERNCORE_INSTALL
      Description : <undefined>
      Size : 800,100,664 bytes
      Index : 2
      Name : MODERNCORE_BOOT
      Description : <undefined>
      Size : 763,402,132 bytes
      The operation completed successfully.
~~~

装载脱机 Windows 映像文件。

~~~
Dism /Mount-Wim /WimFile:C:\Temporary\images\9600.16384.x86fre.winblue_rtm_iotbuild.140731-1000_galileo_v1.wim /Name:"MODERNCORE_INSTALL" /MountDir:C:\Temporary\offline

Deployment Image Servicing and Management tool
          Version: 6.3.9600.17031
          Mounting image
          [==========================100.0%==========================]
          The operation completed successfully.
~~~

将特定驱动程序添加到脱机映像。

~~~
Dism /Image:C:\Temporary\offline /Add-Driver /Driver:C:\Temporary\drivers\'your_driver_name.inf'

Deployment Image Servicing and Management tool
          Version: 6.3.9600.17031
          Image Version: 6.3.9600.16384
          Found 1 driver package(s) to install.
          Installing 1 of 1 - C:\Temporary\drivers\'your_driver_name.inf': The driver package was successfully installed.
          The operation completed successfully.
~~~


  注意： 使用 /Recurse 选项添加多个驱动程序。

~~~
Dism /Image:C:\Temporary\offline /Add-Driver /Driver:C:\Temporary\drivers\ /Recurse
~~~


确认对映像的更改。

~~~
Dism /Unmount-Wim /MountDir:C:\Temporary\offline /Commit

Image Index : 1
            Saving image
            [==========================100.0%==========================]
            Unmounting image
            [==========================100.0%==========================]
            The operation completed successfully.
~~~

现在，可以将 Microsoft Windows 应用于 microSD 卡，如在[购买或更新你的 Intel Galileo？]({{site.baseurl}}/{{page.lang}}/win8/SetupGalileo.htm){:target="_blank"}中所述。


若要查看驱动程序是否通过 Telnet 正常工作，请使用“devcon”命令。有关 devcon 命令帮助，请查看 \[此处\]\(http://msdn.microsoft.com/zh-cn/library/windows/hardware/ff544746(v=vs.85).aspx){:target="_blank"}。
