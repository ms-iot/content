---
layout: default
title: Windows 7 上的映像
permalink: /zh-cn/win8/ImageOnWin7.htm
lang: zh-cn
---

# Windows 7 上的映像处理
apply-bootmedia.cmd 仅在 Windows 8 和 8.1 开发计算机上工作。若要在 Windows 7 上进行映像处理，你需要通过以下方式更新 apply-bootmedia.cmd：

* 下载并安装 [Windows 8.1 更新的 Windows 评估和部署工具包 \(Windows ADK\)](http://www.microsoft.com/zh-cn/download/details.aspx?id=39982){:target="_blank"}
  * 选择安装程序中的“部署工具”功能
* 找到使用 Windows ADK 安装的 Dism.exe 工具的完整路径
* 使用文本编辑器将 apply-bootmedia.cmd 中的 Dism.exe 的每个路径引用更新为 Windows ADK 中的 Dism.exe 的完整路径引用。
* 保存 apply-bootmedia.cmd
* 继续遵循“更新你的 Intel Galileo”说明

示例:

~~~
"%SystemRoot%\System32\Dism.exe" --> "C:\Program Files (x86)\Windows Kits\8.1\Assessment and Deployment Kit\Deployment Tools\amd64\DISM\Dism.exe"
~~~
