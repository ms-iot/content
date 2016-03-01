---
layout: default
title: 疑难解答
permalink: /zh-cn/win8/TroubleShooting.htm
lang: zh-cn
---

<div class="row">
  <div class="col-xs-24">
    <header class="page-title-header">
      <h1 class="page-title">疑难解答</h1>
    </header>
  </div>
</div>

<div class="row">
  <div class="col-xs-24">
    <h3>硬件</h3>
    <div class="panel-group" id="accordion1">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion1" href="#collapsePower">
              开发板未通电。
            </a>
          </h4>
        </div>
        <div id="collapsePower" class="panel-collapse collapse">
          <div class="panel-body">
            检查 Galileo 电源。
            <ul>
              <li>是否将通孔插入开发板？</li>
              <li>是否已插入插座并已接通电源？</li>
              <li>开发板指示灯是否已打开？</li>
            </ul>
            如果已连接电源，并且开发板已通电，则适配器或开发板可能已损坏。尝试使用其他电源或开发板。
          </div>
        </div>
      </div>
    </div>
    <hr />

    <h3>Visual Studio</h3>
    <div class="panel-group" id="accordion3">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion3" href="#collapseWontConnect">
              Visual Studio 无法连接到 Galileo
            </a>
          </h4>
        </div>
        <div id="collapseWontConnect" class="panel-collapse collapse">
          <div class="panel-body">
            Visual Studio 无法连接到 Galileo 有许多原因：
            <ul>
              <li>Galileo 未通电。</li>
              <li>
                <p>Galileo 未连接到与台式计算机相同的子网。</p>
                <p>这通常是因为使用无线的笔记本电脑尝试与有线 Galileo 通信。最佳解决方案是将 Galileo 的以太网通过专用以太网端口或 USB 以太网适配器连接到台式机。</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion3_1" href="#collapseNoNuGet">
              严重错误 C1083： 无法打开 include 文件：“arduino.h”： 不存在此类文件或目录
            </a>
          </h4>
        </div>
        <div id="collapseNoNuGet" class="panel-collapse collapse">
          <div class="panel-body">
            <p>如果是在创建新项目并尝试生成和编译后接收到此消息，则可能丢失了 Galileo C++ SDK NuGet 程序包。此外，Intellisense 将为所有与 Arduino SDK 相关的代码添加下划线（如下图所示）。</p>
            <img src="{{site.baseurl}}/Resources/images/vs_missing_nuget_build_errors.png"><br /><br />
            <p>
              若要恢复，请依次转到“工具”->“NuGet 程序包管理器”->“管理解决方案的 NuGet 程序包...”<b><i></i></b>菜单。<br />
              <ul>
                <li>
                  确认尚未安装 NuGet 程序包...
                  <img src="{{site.baseurl}}/Resources/images/nuget_not_installed.png">
                </li>
                <br />
                <li>
                  搜索 <b><i>Galileo C++ SDK</i></b> NuGet 程序包
            </p>
            <img src="{{site.baseurl}}/Resources/images/nuget_search.png">
            </li>
            <br />
            <li>
              安装 NuGet 程序包
              <img src="{{site.baseurl}}/Resources/images/nuget_search_galileo.png">
            </li>
            </ul>
            当你返回项目时，Intellisense 错误应已清除，项目也应完成编译。
            </p>
          </div>
        </div>
      </div>
    </div>
    <hr />

    <h3>Intel Galileo 上的 Windows</h3>
    <div class="panel-group" id="accordion4">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion4" href="#collapseWindowsBoot">
              Windows 似乎未启动
            </a>
          </h4>
        </div>
        <div id="collapseWindowsBoot" class="panel-collapse collapse">
          <div class="panel-body">
            若要诊断 Windows 未启动的问题，在启动时安装 Windows 内核调试器会很有用，这样体验团队可帮助诊断问题。

            <ol>
              <li>
                安装<a href="http://msdn.microsoft.com/zh-cn/windows/desktop/bg162891">适用于 Windows 的调试工具</a>
              </li>
              <li>
                通过串行连接到 GalileoGen1 需要 3.5 毫米插孔的 RS232 串行电缆。Gen2 需要装有 6 通道内联连接器的 RS232。
              </li>
              <li>
                打开 <kbd>WinDBG</kbd>，并将内核调试器（“文件”->“内核调试程序...”）连接到上述 COM 端口。
              </li>
              <li>启动 Windows 并查找故障。</li>
            </ol>

            Windows 启动失败最有可能的原因是 Galileo固件不兼容。确保你在<a href="IBoughtAGalileo.htm">运行最新的固件</a>。
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion4" href="#collapseApplyBootMedia">
              ApplyBootMedia.cmd 不起作用
            </a>
          </h4>
        </div>
        <div id="collapseApplyBootMedia" class="panel-collapse collapse">
          <div class="panel-body">
            如果 ApplyBootMedia 失败，请按照以下步骤来检查已知问题：<br />
            <ul>
              <li>确保 SD 卡已重新格式化为 FAT32 系统，并且现在为空。</li>
              <li>确保 .wim 和 ApplyBootMedia.cmd 的路径不包含空格。</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <hr />

    <h3>GalileoWatcher</h3>
    <div class="panel-group" id="accordian5">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordian5" href="#collapseEmon">
              Galileo 未显示在 GalileoWatcher 上
            </a>
          </h4>
        </div>
        <div id="collapseEmon" class="panel-collapse collapse">
          <div class="panel-body">
            确保你已让防火墙允许此操作。

            若要检查防火墙配置，请依次转到“控制面板”>“系统和安全”>“Windows 防火墙”>“允许的应用”</li>
            <img src="{{site.baseurl}}/Resources/images/GalileoWatcherFirewall.png" />
          </div>
        </div>
      </div>
    </div>
    <hr />

    <h3>远程部署</h3>
    <div class="panel-group" id="accordian6">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordian6" href="#collapseRemoteDeployment1">
              操作比预期时间长
            </a>
          </h4>
        </div>
        <div id="collapseRemoteDeployment1" class="panel-collapse collapse">
          <div class="panel-body">
            不要紧。 这是由于使用以太网进行调试。
          </div>
        </div>
      </div>

      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordian7" href="#collapseRemoteDeployment2">
              无法启动调试。远程终结点连接已终止。
            </a>
          </h4>
        </div>
        <div id="collapseRemoteDeployment2" class="panel-collapse collapse">
          <div class="panel-body">
            有时会在名称解析不起作用时发生此情况。请尝试使用在 GalileoWatcher 中为 Galileo 显示的 IP 地址。
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordian9" href="#collapseRemoteDeployment4">
              无法启动程序“c:\{File}”。系统无法找到指定的文件。
            </a>
          </h4>
        </div>
        <div id="collapseRemoteDeployment4" class="panel-collapse collapse">
          <div class="panel-body">
            <h3>为项目配置远程部署</h3>
            右键单击你的项目，然后选择“属性”。<br />
            选择右上角的“配置管理器...”<kbd></kbd>按钮。<br />
            确保已为你的项目选中“部署”<br />
            另请确保你已正确设置远程调试程序设置。请参阅“高级用法”页面上的<a href="AdvancedUsage.htm#collapseRemoteDebugging">配置远程调试</a>。
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordian10" href="#collapseRemoteDeployment5">
              无法启动调试。调试程序无法连接到远程计算机。调试程序无法解析指定的计算机名。
            </a>
          </h4>
        </div>
        <div id="collapseRemoteDeployment5" class="panel-collapse collapse">
          <div class="panel-body">
            请确保项目的远程调试程序设置拥有正确的远程服务器名称。它应匹配你的 Galileo 开发板名称。
          </div>
        </div>
      </div>
    </div>
  </div>
</div>