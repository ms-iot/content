---
layout: default
title: Urchin 库
permalink: /zh-cn/win10/samples/UrchinLibrary.htm
lang: zh-cn
---

#Urchin 库示例

[在 GitHub 上获取代码][1] 本教程演示如何创建包含和使用 Urchin 库的 Visual Studio 项目。

[1]: https://github.com/ms-iot/security "Urchin 库"

##关于 Urchin 库  
这是一个派生自 TPM 2.0 参考实现、符合规范的库。它向客户端提供封送/取消封送所有数据结构、正确计算授权、执行参数加密和执行审核功能。

##<a name="NewProjectUrchin"></a>创建使用 Urchin 库的项目  
**先决条件：**

* Microsoft Visual Studio 2015，版本 14.0.23107.10 或更高版本  
* SDK，版本 10.0.10240 或更高版本

**创建新的 C++ 项目。** “文件”-\>“新建”-\>“项目”-\>“Visual C++”-\>“空项目”

![创建新项目图像]({{site.baseurl}}/Resources/images/TPM/CreateNewProject.png)

**将一个新的头文件 \(TPMSample.h\) 添加到项目。** 包含 Urchin 库的标头。

{% highlight C++ %}
#pragma once

#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <Windows.h>
#include <BCrypt.h>
#include "UrchinLib.h"
#include "UrchinPlatform.h"
{% endhighlight %}

**将一个新的源文件 \(TPMSample.cpp\) 添加到项目。** 包含你刚创建的头文件。

{% highlight C++ %}
#include "TPMSample.h"
{% endhighlight %}

**在“配置管理器”中，创建一个新的项目配置 \(ARM\)。** “生成”-\>“配置管理器”

![项目配置图像]({{site.baseurl}}/Resources/images/TPM/CreateNewConfiguration.png)

![项目配置图像]({{site.baseurl}}/Resources/images/TPM/NewProjectPlatform.png)


**在项目属性中...** 将“目标平台版本”更改为 10.0.10240.0。

![项目属性图像]({{site.baseurl}}/Resources/images/TPM/TargetPlatformVesion.png)

更新“附加 Include 目录”的路径，以便 Urchin 库的头文件位于该路径。*$\(SolutionDir\)\\Urchin;%\(AdditionalIncludeDirectories\)*

![项目属性图像]({{site.baseurl}}/Resources/images/TPM/AdditionalIncludeDirectories.png)

更新“其他依赖项”，以便链接器找到 Urchin 库。*AdvAPI32.lib;BCrypt.lib;NCrypt.lib;Crypt32.lib;Tbs.lib;$\(SolutionDir\)\\Urchin\\arm\\Urchin.lib;$\(SolutionDir\)\\Urchin\\arm\\Platform.lib;%\(AdditionalDependencies\)*

![项目属性图像]({{site.baseurl}}/Resources/images/TPM/AdditionalDependencies.png)

**编写代码，它利用 Urchin 库中通过 UrchinLib.lib 和 UrchinPlatform.h 公开的定义。** 可以参考随附于库的 [TPM 2.0 工具][2]和[单元测试][3]。

**重新生成和部署解决方案。** 有关如何执行操作的说明的链接，请转到此处。

[2]: https://github.com/ms-iot/security/tree/master/Urchin/T2T "T2T"
[3]: https://github.com/ms-iot/security/tree/master/Urchin/UrchinTest "UrchinTest"

##其他资源  
* Urchin 库下载链接 - [https://github.com/ms-iot/security](https://github.com/ms-iot/security){:target="_blank"}

