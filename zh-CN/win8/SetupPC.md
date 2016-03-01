---
layout: default
title: 设置电脑
permalink: /zh-cn/win8/SetupPC.htm
lang: zh-cn
deviceName: Galileo
---

<div class="section remove-header-rule">
  <header class="section-header">
    <h1>使用入门</h1>
    <span class="section-subtitle">了解如何针对适用于 IoT 的 Windows 开发人员计划准备好你的计算机。</span>
  </header>
  <div class="row">
    <div class="col-xs-24">
      <section class="section item-section">
        <div class="section-body">
          {% include steps.html device=page.deviceName %}
          <div style="background-color:Silver; color:black; padding:20px;">
          	<h4><u>对 Intel Galileo 第 1 代和第 2 代上的 Windows 的支持已于 2015 年 11 月 30 日结束</u></h4>
          		<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台提供 Windows 支持。我们看到了平台上一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>
          </div>
        </div>
      </section>
    </div>
    <div class="col-xs-24">
      <section class="section item-section">
          <header class="section-header">
              <h2>适用于面向 IoT 的 Windows 开发人员计划的开发人员工具</h2>
          </header>
          <div class="section-body">
          <span class="label label-default">Visual Studio 扩展 — 更新时间为： 12/2/2014</span>
          <p>面向 IoT 的 Windows 开发人员计划包括可用于生成适用于 Intel Galileo 的应用程序的相关工具和模板。</p>
          <div class="panel panel-danger">
            <div class="panel-heading">
              <b>注意：</b>
            </div>
            <div class="panel-body">
              请确保 Visual Studio 未在此时运行。
            </div>
          </div>
          <div class="panel-group" id="accordion">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                    我已安装 Visual Studio 2013 Professional、Premium 或 Ultimate
                  </a>
                </h4>
              </div>
              <div id="collapseOne" class="panel-collapse collapse">
                <div class="panel-body">
                  请安装 <a href="http://go.microsoft.com/fwlink/?LinkID=513082" target="_blank">WindowsDeveloperProgramforIOT.msi</a>
                  <br/>
                  （在安装过程中，用户帐户控制可能会提示你两次。一次针对 MSI，另一次针对 VSIXInstaller。若要正确安装所需组件，你需要单击“是”。）
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseExpress">
                    我已安装适用于 Windows 桌面的 Visual Studio 2013 Express
                  </a>
                </h4>
              </div>
              <div id="collapseExpress" class="panel-collapse collapse">
                <div class="panel-body">
                  <ol>
                    <li>
                      按照以下步骤安装适用于 Visual Studio 2013 的 Nuget 包管理器：
                      <ol>
                        <li>
                            打开 Visual Studio 2013
                        </li>
                        <li>
                            单击导航栏中的“工具”并转到“扩展和更新”
                            <br/>
                            <img src="{{site.baseurl}}/Resources/images/InstallNugetPackageManagerStepOne.png">
                        </li>
                        <br/>
                        <li>
                            然后单击“联机”选项卡并搜索“NuGet 包管理器”。
                            <br/>
                            <img src="{{site.baseurl}}/Resources/images/InstallNugetPackageManagerStepTwo.png">
                        </li>
                        <li>
                            下载并安装它。
                        </li>
                      </ol>
                    </li>
                    <li>
                      安装 <a href="http://go.microsoft.com/fwlink/?LinkID=513082" target="_blank">WindowsDeveloperProgramforIOT.msi</a>
                      <br/>
                      （在安装过程中，用户帐户控制可能会提示你两次。一次针对 MSI，另一次针对 VSIXInstaller。若要正确安装所需组件，你需要单击“是”。）
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                    我未安装 Visual Studio 2013
                  </a>
                </h4>
              </div>
              <div id="collapseTwo" class="panel-collapse collapse">
                <div class="panel-body">
                  <ol>
                    <li>
                      安装<a href="http://www.visualstudio.com/downloads/download-visual-studio-vs" target="_blank">适用于 Windows 桌面的 Visual Studio 2013 Express</a>。
                    </li>
                    <li>
                      按照以下步骤安装适用于 Visual Studio 2013 的 Nuget 包管理器：
                      <ol>
                        <li>
                            打开 Visual Studio 2013
                        </li>
                        <li>
                            单击导航栏中的“工具”并转到“扩展和更新”
                            <br/>
                            <img src="{{site.baseurl}}/Resources/images/InstallNugetPackageManagerStepOne.png">
                        </li>
                        <br/>
                        <li>
                            然后单击“联机”选项卡并搜索“NuGet 包管理器”。
                            <br/>
                            <img src="{{site.baseurl}}/Resources/images/InstallNugetPackageManagerStepTwo.png">
                        </li>
                        <li>
                            下载并安装它。
                        </li>
                      </ol>
                    </li>
                    <li>
                      安装 <a href="http://go.microsoft.com/fwlink/?LinkID=513082" target="_blank">WindowsDeveloperProgramforIOT.msi</a>
                      <br/>
                      （在安装过程中，用户帐户控制可能会提示你两次。一次针对 MSI，另一次针对 VSIXInstaller。若要正确安装所需组件，你需要单击“是”。）
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                    我已安装 Visual Studio 2014 或 Visual Studio 2015
                  </a>
                </h4>
              </div>
              <div id="collapseThree" class="panel-collapse collapse">
                <div class="panel-body">
                  Visual Studio 2014 和 Visual Studio 2015 当前不受支持。<br/>
                  如果你有适用于 Windows 桌面的 Visual Studio 2013 Professional、Premium、Ultimate、Community 或 Express，请按照上述相关说明操作。
                  否则，请按照上面的“我未安装 Visual Studio 2013”中的说明操作。
                </div>
              </div>
            </div>
          </div>
          <hr/>
          </div>
      </section>
    </div>
    <div class="col-xs-24">
      <section class="section item-section">
          <header class="section-header">
              <h2>Telnet</h2>
          </header>
          <div class="section-body">
            <p>对于入门指南中之后的某些步骤而言，Telnet 是必需的。如果你没有安装它，不如趁此机会安装它。</p>
            <ol>
              <li>在台式机上，转到“控制面板”并打开以下项：<br/>（如果在图标视图中）程序和功能<br/> 或<br/> （如果在类别视图中）“程序”->“程序和功能”。</li>
              <li>在左侧列中，选择“打开或关闭 Windows 功能”。</li>
              <li>在列表中，需要选中“Telnet 客户端”。<br/><img src="{{site.baseurl}}/Resources/images/Telnet.png"/></li>
              <li>单击“确定”</li>
              <li>重新启动你的电脑</li>
            </ol>
            {% include nextsteps.html device=page.deviceName %}
          </div>
      </section>
    </div>
  </div>
</div>
