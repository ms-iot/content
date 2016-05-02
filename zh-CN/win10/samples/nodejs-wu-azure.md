---
layout: default
title: NodejsWU
permalink: /zh-cn/win10/samples/nodejs-wu-azure.htm
lang: zh-cn
---

# Azure Node.js 示例 \(UWP\)
{% include VerifiedVersion.md %}

此示例介绍了如何使用 Node.js UWP 应用将数据从光传感器（光敏电阻器）发送到 Azure IoT 中心（和 Azure 存储）。

### 所需硬件
* Raspberry Pi 2 或 3。
* [Arduino 开发板](https://www.arduino.cc/en/main/products)（本示例中使用的是 Uno）。
* 双 USB B 型接头电缆。
* 试验板。
* 10K 欧姆光敏电阻器和 10K 欧姆电阻。


### 设置电脑
* 安装[含有 11 月更新](http://windows.microsoft.com/zh-cn/windows-10/windows-update-faq)的 Windows 10。
* 安装 Visual Studio 2015 Update 1。
* 从[此处](http://aka.ms/ntvsiotlatest)安装适用于 Windows IoT 的最新 Node.js 工具。
* 安装 [Python 2.7](https://www.python.org/downloads/){:target="_blank"}。
* 从[此处](https://www.arduino.cc/en/Main/Software)安装 Arduino 软件。
* 安装[适用于 Windows 的 Git](http://git-scm.com/download/win)。确保 Git 包含在“路径”环境变量中。


#### 创建 Azure IoT 中心
如果你没有 Azure IoT 中心，请转到[此](https://azure.microsoft.com/zh-cn/documentation/articles/iot-hub-node-node-getstarted/#create-an-iot-hub/)链接中的“创建和 IoT 中心”部分来按照相关说明设置一个中心。免费试用！

对于此示例，只需要为 IoT 中心获取连接字符串即可（如下所示）。你将从 [Azure 门户](https://ms.portal.azure.com/)获取连接字符串

![Azure 连接字符串]({{site.baseurl}}/Resources/images/Nodejs/azure-connstr.png)


### 将 Firmata 上载到你的 Arduino
* 使用 USB 电缆将 Arduino 开发板连接到你的电脑。
* 打开 Arduino 软件。
* 转到“工具”-\>“端口”，然后选择你的设备。
* 转到“工具”-\>“开发板”，然后单击你拥有的 Arduino 类型。
* 转到“文件”-\>“示例”-\>“Firmata”，然后选择“StandardFirmata”。这将打开包含 Firmata 示意图的一个新窗口。
* 单击“上载”按钮将该示意图上载到 Arduino 开发板。上载完成后，你应该会看到一条“上载完成”消息。


### 创建新的 Johnny-Five（通用 Windows）项目
* 启动 Visual Studio 2015 并创建新项目（“文件”\|“新建项目...”）。在“`New Project`”对话框中，导航到“`Node.js`”，如下所示（在该对话框的左侧窗格中： “模板”\|“JavaScript”\|“Node.js”）。选择 `Basic Node.js Johnny-Five Application (Universal Windows)` 模板（如下所示）、输入项目名称，然后按“确定”。

  ![Node.js Johnny-Five 项目对话框]({{site.baseurl}}/Resources/images/Nodejs/nodejswuj5-newprojectdialog.png)

* 等待 Johnny-Five 程序包及其依赖项出现以完成下载。这会由 npm 输出窗口中的以下消息指示。

  ![Node.js 输出窗口]({{site.baseurl}}/Resources/images/Nodejs/npm-output-window.png)

* 在解决方案资源管理器中右键单击 npm 节点（如下所示），然后选择“更新 npm 程序包”。此步骤将运行 npm 重复数据消除，并使用与 Node.js UWP 兼容的[版本](https://github.com/ms-iot/node-serialport/tree/uwp)更新[串行口](https://www.npmjs.com/package/serialport)（Johnny-Five 依赖项）。

  ![Node.js Npm 菜单]({{site.baseurl}}/Resources/images/Nodejs/npm-update-menu.png)

* 再次右键单击 npm 节点，然后选择“安装新的 npm 程序包”。当显示对话框时（如下所示），搜索 `azure-iothub`、选择找到的最新版本，然后单击“安装程序包”按钮。

  ![Azure Npm 对话框]({{site.baseurl}}/Resources/images/Nodejs/azure-npmdialog.png)

  **为 `azure-iot-device` 和 `azure-iot-device-mqtt` 重复此步骤。**

* 将 app.js 中的代码替换为以下所示代码。每隔 10 秒钟，代码就会将光敏电阻器的值发送到你的中心。请务必为 connectionString 和 deviceConnectionString 分配有效的字符串。
  
<UL>

{% highlight JavaScript %}
var Five = require('johnny-five');
var Iothub = require('azure-iothub');
var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;

// Use you connection string that can be found on the Azure Portal.
// The format is HostName=<>;SharedAccessKeyName=<>;SharedAccessKey=<>
var connectionString = '';

var myDeviceId = 'myRPi2';

var client; // Azure IoT Hub client to handle connection

// First we will create a device identity on Azure IoT Hub.
// if a device (myDeviceId) already exists with then it will be used

var registry = Iothub.Registry.fromConnectionString(connectionString);
    
var device = new Iothub.Device(null);
device.deviceId = myDeviceId;
registry.create(device, function (err, deviceInfo, res) {
  if (err) {
    registry.get(device.deviceId, printDeviceInfo);
  }
  if (deviceInfo) {
    printDeviceInfo(err, deviceInfo, res);
  }
      
  function printDeviceInfo(err, deviceInfo, res) {
    if (deviceInfo) {
      console.log('Device id: ' + deviceInfo.deviceId);
      console.log('Device key: ' + deviceInfo.authentication.SymmetricKey.primaryKey);
      
      // Replace the value of HostName with the value in connectionString
      var deviceConnectionString = 'HostName=XYZ;DeviceId=' + myDeviceId + ';SharedAccessKey=' + deviceInfo.authentication.SymmetricKey.primaryKey;
      client = Client.fromConnectionString(deviceConnectionString, Mqtt);
      client.open(connectCallback);
    }
  }
});

// Gets calls after an attempt to connect to IoT Hub
var connectCallback = function (err) {
  if (err) {
    console.log('Could not connect: ' + err.message);
  } else {
    console.log('Client connected');

    // Now that we are connected to IoT hub,
    // use Johnny-Five to get data from the
    // light sensor and send it.
    InitializeBoard();
    
    client.on('error', function (err) {
      console.error(err.message);
    });
  }
};

// Helper function to print results
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

// Sends the value of the light sensor to IoT Hub
function SendMessage(value) {
  var data = JSON.stringify({ deviceId: myDeviceId, lightValue: value });
  var message = new Message(data);
  console.log('Sending message: ' + message.getData());
  client.sendEvent(message, printResultFor('send'));
}

// Initializes the Arduino board with Johnny-Five
function InitializeBoard() {
  var board = new Five.Board();

  board.on('ready', function () {
    lightSensor = new Five.Sensor({
      pin: "A0",
      freq: 10000 // 10 seconds
    });

    lightSensor.on('change', function () {
      SendMessage(this.value);
    });
  });
}
{% endhighlight %}
</UL>


### 设置硬件
* 使用 USB 电缆将你的 Arduino 与 Raspberry Pi 2 或 3 相连接。如果你的 Raspberry Pi 2 或 3 已连接到监视器，你应该能看到该设备已被识别，如下图所示（设备的名称可能是“Arduino Uno”，而不是“USB 串行设备”）：

  ![Arduino Uno 启动屏幕]({{site.baseurl}}/Resources/images/Nodejs/arduino-uno-startscreen.png)


* 使用[此处](https://www.arduino.cc/en/Tutorial/AnalogInput)的说明设置光敏电阻器和 Arduino 之间的连接。最终的设置应如下所示：

  ![Arduino 光传感器 RPi2]({{site.baseurl}}/Resources/images/Nodejs/arduino-lightsensor-rpi2.png)


### 将应用部署到 Raspberry Pi 2 或 3
* 转到“项目”菜单，然后选择“\<项目名称\> 属性”（也可以在解决方案资源管理器中右键单击项目节点来访问“属性”）。在“远程计算机”文本框中输入 IP 地址。由于你要针对 Raspberry Pi 2 或 3 进行生成，请选择下拉菜单中的 `ARM`。

* 我们现在随时可以将应用部署到 Raspberry Pi 2 或 3。只需按 F5（或依次选择“调试”\|“开始调试”）即可启动应用。

* 然后，你可以查看通过 [iothub-explorer](https://www.npmjs.com/package/iothub-explorer) 实时发送的数据。
  * 在电脑的 cmd 窗口中运行 `npm install -g iothub-explorer@latest`
  * 然后运行 `iothub-explorer <Your IoT Hub connection string> monitor-events myRPi2`。运行此命令后，你应该可以看到你正在接收的数据：

    ![Azure 数据]({{site.baseurl}}/Resources/images/Nodejs/azure-hubdata.png)


### 将数据发送到 Azure 存储表
你也可以将光传感器数据发送到 Azure 存储。如果你没有帐户，请转到[此](https://azure.microsoft.com/zh-cn/documentation/articles/storage-create-storage-account/#create-a-storage-account)链接来按照相关说明设置一个帐户。免费试用！ 如果你已设置了存储帐户，请按照以下说明操作：

* 右键单击解决方案资源管理器中的 npm 节点，然后选择“安装新的 npm 程序包”。当显示对话框时（如下所示），搜索 `azure`、选择找到的最新版本，然后单击“安装程序包”按钮。

* 将 app.js 中的代码替换为以下所示代码。每隔 10 秒钟，代码就会将光敏电阻器的值发送到指定表。请务必为 accountName 和 accountKey 输入有效值。你也可以更改 tableName。
  
<UL>

{% highlight JavaScript %}
var azure = require('azure-storage');
var five = require('johnny-five');

var accountName = ''; // Enter your Azure storage account name
var accountKey = ''; // Enter your Azure storage account key
var tableName = 'MyRPi2Data'; // Name of your table to store the light sensor data

var tableService = azure.createTableService(accountName, accountKey);

if (CreateTable()) {
  InitializeBoard();
}

// Create a table in Azure storage
function CreateTable() {
  tableService.createTableIfNotExists(tableName, function (error, result, response) {
    if (error) {
      console.log(error);
      return false;
    }
  });
  return true;
}

// Initialize the Arduino board with Johnny-Five
function InitializeBoard() {
  var board = new five.Board();
  
  board.on('ready', function () {
    lightSensor = new five.Sensor({
      pin: "A0",
      freq: 10000 // 10 seconds
    });

    lightSensor.on('change', function () {
      InsertValue(this.value);
    });
  });
}

function InsertValue(value) {
  console.log('Value to insert: ' + value);
    
  // Create entity to store in the table with the value 
  // of the light sensor and the date.
  var entGen = azure.TableUtilities.entityGenerator;
  var entity = {
    PartitionKey: entGen.String('Light'),
    RowKey: entGen.String(String(Date.now())),
    intValue: entGen.Int32(value),
    dateValue: entGen.DateTime(new Date().toISOString()),
  };
    
  // Insert the entity in the Azure storage table
  tableService.insertEntity(tableName, entity, function (error, result, response) {
    if (error) {
      console.log(error);
    }
  });
}
{% endhighlight %}
</UL>

* 按 F5 部署并启动应用。 

* 然后，你可以查看正在通过 Power BI（[在此处下载](https://powerbi.microsoft.com/zh-cn/)）发送到 Azure 存储的数据。在 Power BI 中，单击“获取数据”按钮、选择“Microsoft Azure 表存储”作为源，然后按照以下步骤进行连接。连接后，你可以选择表，并查看已从 Raspberry Pi 2 或 3 发送的光传感器数据。

  ![Azure 数据]({{site.baseurl}}/Resources/images/Nodejs/azure-storagedata.png)

### GitHub
* NTVS IoT 扩展源代码：[https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
