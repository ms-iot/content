---
layout: default
title: NodejsWU
permalink: /en-US/win10/samples/NodejsWUAzure.htm
lang: en-US
---

## Azure Node.js Sample (UWP)
{% include VerifiedVersion.md %}

This sample shows how to use the [Azure npm package](https://www.npmjs.com/package/azure) to upload light sensor (photoresistor) data to an Azure Storage table.

### Hardware required
* Raspberry Pi 2.
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


### Set up an Azure storage account
If you don't have an account, go to [this](https://azure.microsoft.com/en-us/documentation/articles/storage-create-storage-account/#create-a-storage-account) link for instructions to set one up. It's free to try out!


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

  ![Node.js Johnny-Five Project Dialog]({{site.baseurl}}/images/Nodejs/nodejswuj5-newprojectdialog.png)

* Wait for the Johnny-Five package and its dependencies to complete downloading. This will be indicated by the message below in the npm output window.

  ![Node.js Output Window]({{site.baseurl}}/images/Nodejs/npm-output-window.png)

* Right-click on the npm node in the Solution Explorer (shown below) and select Update npm Packages.
  This step will run npm dedupe and update [serialport](https://www.npmjs.com/package/serialport) (a Johnny-Five dependency) with a [version](https://github.com/ms-iot/node-serialport/tree/uwp) that works with Node.js UWP.

  ![Node.js Npm Menu]({{site.baseurl}}/images/Nodejs/npm-update-menu.png)

* Right-click on the npm node again and select Install New npm Packages(s). When the dialog (shown below) is displayed, search for 'azure', select the latest version found, then click on the Install Package button.

  ![Azure Npm Dialog]({{site.baseurl}}/images/Nodejs/azure-npmdialog.png)

* Replace the code in app.js with the code shown below. Every 10 seconds, the code will send the value of the photoresistor to the table specified. Be sure to enter valid values for accountName and accountKey.
  You may also change tableName.
  
<UL>
{% highlight JavaScript %}
var azure = require("azure-storage");
var five = require("johnny-five");

var accountName = ""; // Enter your Azure storage account name
var accountKey = ""; // Enter your Azure storage account key
var tableName = "MyRPi2Data"; // Name of your table to store the light sensor data

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
  
  board.on("ready", function () {
    lightSensor = new five.Sensor({
      pin: "A0",
      freq: 10000 // 10 seconds
    });

    lightSensor.on("change", function () {
      InsertValue(this.value);
    });
  });
}

function InsertValue(value) {
  console.log("Value to insert: " + value);
    
  // Create entity to store in the table with the value 
  // of the light sensor and the date.
  var entGen = azure.TableUtilities.entityGenerator;
  var entity = {
    PartitionKey: entGen.String("Light"),
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


### Set up the hardware
* Connect your Arduino and Raspberry Pi 2 with the USB cable. If your Raspberry Pi 2 is connected to a monitor, 
  you should see the device getting recognized as shown in the image below (the name of the device may be "Arduino Uno" instead of "USB Serial Device"):

  ![Arduino Uno Start Screen]({{site.baseurl}}/images/Nodejs/arduino-uno-startscreen.png)


* Use the instructions [here](https://www.arduino.cc/en/Tutorial/AnalogInput) to set up the connection between your photoresistor and the Arduino. The final setup should look something like this:

  ![Arduino Light Sensor RPi2]({{site.baseurl}}/images/Nodejs/arduino-lightsensor-rpi2.png)


### Deploy the app to your Raspberry Pi 2
* Go to the Project menu and select '&lt;Your project name&gt; Properties' (You could also right-click on the project node in solution explorer to access Properties).
  Enter the IP Address in the Remote Machine text box. Since you're building for Raspberry Pi 2, select `ARM` in the dropdown menu.

* Now we're ready to deploy the app to the Raspberry Pi 2. Simply press F5 (or select Debug \| Start Debugging) to start the app. 

* You can then view the data in an Azure storage client like [Azure Storage Explorer](https://azurestorageexplorer.codeplex.com/):

  ![Azure Data]({{site.baseurl}}/images/Nodejs/azure-sampledata.png)

### GitHub
* NTVS IoT Extension source code: [https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
