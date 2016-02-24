### Libraries {#Libraries}

{:.table.table-bordered .devices}
Library Name                             | Compatible Boards | Description                                                                                     | Notes                                                                                                                    | Projects, Samples, Libraries |Microsoft Verified                  |
-----------------------------------------|-------------------|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|------------------------------|------------------------------------|
ZWaveAdapter                             | RPi2 or RPi3, MBM         | Zwave solution to enable developer to add a Zwave Adapter and connect it to the AllJoyn network | Demonstrates the function of Z-Wave device on Device System Bridge (DSB). Used as part of the ZWave demo in //Build/2015 | [ZWave Sample]               |![Verified][MSVerified]{:.MsVerified}
AllJoyn Device System Bridge App Project | RPi2 or RPi3, MBM         | Use to expose a GPIO Device to the AllJoyn Bus using the AllJoyn Device System Bridge           |                                                                                                                          | [Alljoyn DSB Gpio C# Sample] |![Verified][MSVerified]{:.MsVerified}

### Bus Providers {#BusProviders}

{:.table.table-bordered .devices}
Bus Provider    | Compatible Boards | Description                                                                 | Notes                                             | Projects, Samples, Libraries |Microsoft Verified                  |
----------------|-------------------|-----------------------------------------------------------------------------|---------------------------------------------------|------------------------------|------------------------------------|
ADC             | RPi2 or RPi3, MBM         | provides support for ADC IC such as ADS1115                                 | bus provider library provided in MSIOT GitHub     | [ADC Bus Providers]          |![Verified][MSVerified]{:.MsVerified}
PWM             | RPi2 or RPi3, MBM         | provides support for PWM capable devices such as PCA9685 (in Devices above) | PWM bus provider library provided in MSIOT GitHub | [PWM Bus Providers]          |![Verified][MSVerified]{:.MsVerified}
