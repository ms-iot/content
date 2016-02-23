---
layout: default
title: Urchin Library
permalink: /en-US/win10/samples/UrchinLibrary.htm
lang: en-US
---

# Urchin Library Sample

[Get the code on GitHub][1]  
This tutorial demonstrates how to create a Visual Studio project that includes and uses the Urchin library.

[1]: https://github.com/ms-iot/security "Urchin library"

## About the Urchin library  
This is a spec-compliant library derived from the TPM 2.0 reference implementation. It provides to the client the functionality to marshal/unmarshal all data structures, properly calculate authorizations, perform parameter encryption and do auditing.

## <a name="NewProjectUrchin"></a>Create a project using the Urchin library  
**Prerequisites:**

* Microsoft Visual Studio 2015, version 14.0.23107.10 or above  
* SDK, version 10.0.10240 or above

**Create a new C++ project.**  
File -> New -> Project -> Visual C++ -> Empty Project

![Create New Project Image]({{site.baseurl}}/Resources/images/TPM/CreateNewProject.png)

**Add a new header file (TPMSample.h) to the project.**  
Include the headers of the Urchin Library.
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

**Add a new source file (TPMSample.cpp) to the project.**  
Include the header file you just created.
{% highlight C++ %}
#include "TPMSample.h"
{% endhighlight %}

**In the "Configuration Manager" create a new project configuration (ARM).**  
Build -> Configuration Manager

![Project Configuration Image]({{site.baseurl}}/Resources/images/TPM/CreateNewConfiguration.png)

![Project Configuration Image]({{site.baseurl}}/Resources/images/TPM/NewProjectPlatform.png)


**In the project properties...**  
Change the "Target Platform Version" to 10.0.10240.0.

![Project Properties Image]({{site.baseurl}}/Resources/images/TPM/TargetPlatformVesion.png)

Update the path of the "Additional Include Directories" so that the header files of the Urchin library are on the path.  
*$(SolutionDir)\Urchin;%(AdditionalIncludeDirectories)*

![Project Properties Image]({{site.baseurl}}/Resources/images/TPM/AdditionalIncludeDirectories.png)

Update the "Additional Dependencies" so that the linker finds the Urchin library.  
*AdvAPI32.lib;BCrypt.lib;NCrypt.lib;Crypt32.lib;Tbs.lib;$(SolutionDir)\Urchin\arm\Urchin.lib;$(SolutionDir)\Urchin\arm\Platform.lib;%(AdditionalDependencies)*

![Project Properties Image]({{site.baseurl}}/Resources/images/TPM/AdditionalDependencies.png)

**Write your code that utilizes the definitions in the Urchin library exposed through UrchinLib.lib and UrchinPlatform.h.**  
You can refer to the [TPM 2.0 Tool][2] and the [Unit Tests][3] which accompany the library.

**Rebuild and deploy your solution.**  
Links to instructions on how to do so go here.

[2]: https://github.com/ms-iot/security/tree/master/Urchin/T2T "T2T"
[3]: https://github.com/ms-iot/security/tree/master/Urchin/UrchinTest "UrchinTest"

## Additional Resources  
* Urchin Library Download Link - [https://github.com/ms-iot/security](https://github.com/ms-iot/security){:target="_blank"}

