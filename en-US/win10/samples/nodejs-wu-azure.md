---
layout: default
title: NodejsWU
permalink: /en-US/win10/samples/nodejs-wu-azure.htm
lang: en-US
---

## Azure Node.js Sample (UWP)
{% include VerifiedVersion.md %}

This sample shows how to send data from a light sensor (photoresistor) to an Azure IoT Hub (and to Azure storage) using a Node.js UWP app.

### Hardware required
* Raspberry Pi 2 or 3.
* [Arduino Board](https://www.arduino.cc/en/main/products) (Uno is used in this sample).
* USB to USB B cable.
* Breadboard.
* 10K ohm photoresistor and 10K ohm resistor.


### Set up your PC
* Install Windows 10 [with November update](http://windows.microsoft.com/en-us/windows-10/windows-update-faq).
* Install Visual Studio 2015 Update 1.
* Install the latest Node.js Tools for Windows IoT from [here](http://aka.ms/ntvsiotlatest).
* Install [Python 2.7](https://www.python.org/downloads/){:target="_blank"}.
* Install Arduino software from [here](https://www.arduino.cc/en/Main/Software).
* Install [Git for Windows](http://git-scm.com/download/win). Ensure that Git is included in your ‘PATH’ environment variable.


#### Create an Azure IoT hub
If you don't have an Azure IoT hub, go to the 'Create and IoT hub' section in [this](https://azure.microsoft.com/en-us/documentation/articles/iot-hub-node-node-getstarted/#create-an-iot-hub/)
link for instructions to set one up. It's free to try out!

For this sample you will only need to get the connection string (see below) for your IoT Hub. You'll get that from your [Azure Portal](https://ms.portal.azure.com/)

![Azure Connection String]({{site.baseurl}}/Resources/images/Nodejs/azure-connstr.png)


### Upload Firmata to your Arduino
* Connect the Arduino board with your PC using the USB cable.
* Open Arduino software.
* Go to Tools->Port and select your device.
* Go to Tools->Board and click on the type of Arduino you have.
* Go to File->Examples->Firmata and select StandardFirmata. This will open up a new window with the Firmata sketch.
* Click the upload button to upload the sketch to the Arduino board. You should see a "Done uploading" message when the upload is complete.


### Create a new Johnny-Five (Universal Windows) project
* Start Visual Studio 2015 and create a new project (File \| New Project...). In the `New Project` dialog, navigate to `Node.js` as shown below (in the left pane in the dialog: Templates \| JavaScript \| Node.js).
  Select the `Basic Node.js Johnny-Five Application (Universal Windows)` template (shown below), enter a name for your project, then press OK.

  ![Node.js Johnny-Five Project Dialog]({{site.baseurl}}/Resources/images/Nodejs/nodejswuj5-newprojectdialog.png)

* Wait for the Johnny-Five package and its dependencies to complete downloading. This will be indicated by the message below in the npm output window.

  ![Node.js Output Window]({{site.baseurl}}/Resources/images/Nodejs/npm-output-window.png)

* Right-click on the npm node in the Solution Explorer (shown below) and select Update npm Packages.
  This step will run npm dedupe and update [serialport](https://www.npmjs.com/package/serialport) (a Johnny-Five dependency) with a [version](https://github.com/ms-iot/node-serialport/tree/uwp) that works with Node.js UWP.

  ![Node.js Npm Menu]({{site.baseurl}}/Resources/images/Nodejs/npm-update-menu.png)

* Right-click on the npm node again and select Install New npm Packages(s). When the dialog (shown below) is displayed, search for `azure-iothub`, select the latest version found, then click on the Install Package button.

  ![Azure Npm Dialog]({{site.baseurl}}/Resources/images/Nodejs/azure-npmdialog.png)

  **Repeat this step for `azure-iot-device` and `azure-iot-device-mqtt`.**

* Replace the code in app.js with the code shown below. Every 10 seconds, the code will send the value of the photoresistor to your hub. 
  Be sure to assign connectionString and deviceConnectionString with a valid strings.
  
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


### Set up the hardware
* Connect your Arduino and Raspberry Pi 2 or 3 with the USB cable. If your Raspberry Pi 2 or 3 is connected to a monitor, 
  you should see the device getting recognized as shown in the image below (the name of the device may be "Arduino Uno" instead of "USB Serial Device"):

  ![Arduino Uno Start Screen]({{site.baseurl}}/Resources/images/Nodejs/arduino-uno-startscreen.png)


* Use the instructions [here](https://www.arduino.cc/en/Tutorial/AnalogInput) to set up the connection between your photoresistor and the Arduino. The final setup should look something like this:

  ![Arduino Light Sensor RPi2]({{site.baseurl}}/Resources/images/Nodejs/arduino-lightsensor-rpi2.png)


### Deploy the app to your Raspberry Pi 2 or 3
* Go to the Project menu and select '&lt;Your project name&gt; Properties' (You could also right-click on the project node in solution explorer to access Properties).
  Enter the IP Address in the Remote Machine text box. Since you're building for Raspberry Pi 2 or 3, select `ARM` in the dropdown menu.

* Now we're ready to deploy the app to the Raspberry Pi 2 or 3. Simply press F5 (or select Debug \| Start Debugging) to start the app. 

* You can then view the data sent in real-time with [iothub-explorer](https://www.npmjs.com/package/iothub-explorer).
  * In a cmd window on your PC run `npm install -g iothub-explorer@latest`
  * Then run `iothub-explorer <Your IoT Hub connection string> monitor-events myRPi2`. After running the command you should then see your data being received:

    ![Azure Data]({{site.baseurl}}/Resources/images/Nodejs/azure-hubdata.png)


### Sending data to an Azure storage table
You can also send the light sensor data to Azure storage. If you don't have an account, go to [this](https://azure.microsoft.com/en-us/documentation/articles/storage-create-storage-account/#create-a-storage-account) 
link for instructions to set one up. It's free to try out!
When you have a storage account set up, follow the instructions below:

* Right-click on the npm node in Solution Explorer and select Install New npm Packages(s). When the dialog (shown below) is displayed, search for `azure`, select the latest version found, then click on the Install Package button.

* Replace the code in app.js with the code shown below. Every 10 seconds, the code will send the value of the photoresistor to the table specified. Be sure to enter valid values for accountName and accountKey.
  You may also change tableName.
  
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

* Press F5 to deploy and start the app. 

* You can then view the data being sent to Azure storage with Power BI ([download here](https://powerbi.microsoft.com/en-us/)).
  In Power BI, click on the Get Data button, select 'Microsoft Azure Table Storage' as your source, then follow the steps to connect.
  Once connected you can select your table and view the light sensor data that has been sent from your Raspberry Pi 2 or 3.

  ![Azure Data]({{site.baseurl}}/Resources/images/Nodejs/azure-storagedata.png)

### GitHub
* NTVS IoT Extension source code: [https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
