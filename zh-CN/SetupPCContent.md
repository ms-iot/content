###在电脑上设置 Visual Studio 2015

若要设置 Windows 10 IoT 核心版开发电脑，首先需要安装以下内容：

1. **安装 Windows 10**

2. 在[此处](http://go.microsoft.com/fwlink/?LinkID=534599){:target="_blank"}**安装 Visual Studio Community 2015**。可从[此处](https://www.visualstudio.com/vs-2015-product-editions){:target="_blank"}下载 Visual Studio `Professional` 2015 和 Visual Studio `Enterprise` 2015。

  **注意：** 如果选择安装不同版本的 VS 2015，请确保执行“自定义”安装，并依次选中“通用 Windows 应用开发工具”-\>“工具和 Windows SDK”复选框。

3. 可[在此处](https://visualstudiogallery.msdn.microsoft.com/55b357e1-a533-43ad-82a5-a88ac4b01dec)**安装 Windows IoT 核心版项目模板**。或者，可通过在 [Visual Studio 库](https://visualstudiogallery.msdn.microsoft.com/)中或直接从“扩展和更新”对话框（“工具”\>“扩展和更新”\>“联机”）中的 Visual Studio 搜索 `Windows IoT Core Project Templates` 来找到模板。

4. 确保已按照[这些说明](https://msdn.microsoft.com/library/windows/apps/xaml/dn706236.aspx){:target="_blank"}**启用了开发人员模式**。

5. 打开 Visual Studio 2015，并通过选择 `File > New > Project > Visual C# > Windows > Universal > Blank App (Universal Windows)` **创建通用 Windows 平台 \(UWP\) 应用**。若要确保我们的示例可生成框架依存关系，需要执行此操作。
