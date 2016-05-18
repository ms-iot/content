---
layout: default
title: 开始编写代码
description: 使用代码示例以及经文档演示验证的概念、工具和资源帮助你开始编写代码。
keyword: windows iot, samples, docs, download
permalink: /zh-cn/win10/StartCoding.htm
lang: zh-CN
---
<div class="row">
  <div class="col-xs-24">
    <ol class="breadcrumb">
      <li><a href="https://developer.microsoft.com/zh-cn/windows/iot">IoT 主页</a></li>
      <li class="active">文档和示例</li>
    </ol>
    <header class="page-title-header">
      <h1 class="page-title">文档和示例</h1>
    </header>
  </div>
</div>

<div class="row section-heading">
  <div class="col-md-12">    
    <p>下载代码示例以在设备上开始使用 Windows。此外，阅读文档可帮助你使用有助于开发的工具和资源。</p>
    <br/>
    <h4>是否已设置环境？</h4>
    <p>假设你已经<a href="{{site.baseurl}}/{{page.lang}}/GetStarted.htm">设置环境</a>、拥有正常运行的 Visual Studio，并且拥有运行 Windows IoT 核心版的设备（MinnowBoard Max 或者 Raspberry Pi 2 或 3）。</p>
    <br/>
    <h4>问题/建议</h4>
    <p>请记住，如需帮助和建议，请尽管<a href="{{site.baseurl}}/{{page.lang}}/Community.htm#contact">与我们联系</a>！</p>
    <br/>
    <h4>如何下载这些示例</h4>
    <p>下载这些示例的最简单方法是，通过单击<a href="https://github.com/ms-iot/samples">此处</a>导航到 GitHub repo ms-iot/samples，然后在右侧菜单上单击“下载 ZIP”按钮。 下载文件并在本地解压缩该文件后，将能够看到所有示例。</p>
  </div>
  <div class="col-md-12">
    <img src="{{site.baseurl}}/Resources/images/DevelopmentBoards.PNG" alt="Raspberry Pi 3" class="img-responsive">
  </div>
</div>

<div class="section-heading">
    <div role="tabpanel">
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#first" aria-controls="first" role="tab" data-toggle="tab"><h3>文档和教程</h3></a></li>
            <li role="presentation"><a href="#second" aria-controls="second" role="tab" data-toggle="tab"><h3>示例</h3></a></li>
        </ul>
        <hr>
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="first">
              {% include _docsandtutorials.html %}
            </div>

            <div role="tabpanel" class="tab-pane" id="second">
              {% include _samples.html %}
            </div>


        </div>
    </div>
</div>
