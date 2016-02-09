---
layout: default
title: BLE GATT Sample - SensorTag Example Dump
permalink: /en-US/win10/samples/BLEGattDump.htm
lang: en-US
---

## Example GATT Attribute dump file
Here is the output from running the Bluetooth GATT Database Viewer (BthGATTDump.exe) with the SensorTag connected to the system.

    Microsoft Bluetooth GATT database viewer v1.00 Copyright (c) Microsoft Corp.
    Selected device - SensorTag
    Device Address - b4994c6430ff  (PUBLIC)
    [Service] Handle=0x0001 Type=0x1800(GAP)

        [Characteristic] Handle=0x0002 ValueHandle=0x0003 Type=0x2a00(Device Name) Properties=(Read)

            [Value] TI BLE Sensor Tag

        [Characteristic] Handle=0x0004 ValueHandle=0x0005 Type=0x2a01(Appearance) Properties=(Read)

            [Value] [0000]

        [Characteristic] Handle=0x0006 ValueHandle=0x0007 Type=0x2a02(Peripheral Privacy Flag) Properties=(Read/Write)

            [Value] Privacy Disabled


        [Characteristic] Handle=0x0008 ValueHandle=0x0009 Type=0x2a03(Reconnection Address) Properties=(Write)

        [Characteristic] Handle=0x000a ValueHandle=0x000b Type=0x2a04(Peripheral Preferred Connection Parameters) Properties=(Read)

            [Value] [5000A0000000E803]

    [Service] Handle=0x000c Type=0x1801(GATT)

        [Characteristic] Handle=0x000d ValueHandle=0x000e Type=0x2a05(Service Changed) Properties=(Indicate)

            [Descriptor]  Handle=0x000f Type=0x2902(Client Configuration)

                [Value]  IsSubscribeToIndication

    [Service] Handle=0x0010 Type=0x180a(Device Information)

        [Characteristic] Handle=0x0011 ValueHandle=0x0012 Type=0x2a23(System ID) Properties=(Read)

            [Value] [FF306400004C99B4]

        [Characteristic] Handle=0x0013 ValueHandle=0x0014 Type=0x2a24(Model Number) Properties=(Read)

            [Value] N.A.

        [Characteristic] Handle=0x0015 ValueHandle=0x0016 Type=0x2a25(Serial Number) Properties=(Read)

            [Value] N.A.

        [Characteristic] Handle=0x0017 ValueHandle=0x0018 Type=0x2a26(Firmware Revision) Properties=(Read)

            [Value] 1.4 (Jul 12 2013)

        [Characteristic] Handle=0x0019 ValueHandle=0x001a Type=0x2a27(Hardware Revision) Properties=(Read)

            [Value] N.A.

        [Characteristic] Handle=0x001b ValueHandle=0x001c Type=0x2a28(Software Revision) Properties=(Read)

            [Value] N.A.

        [Characteristic] Handle=0x001d ValueHandle=0x001e Type=0x2a29(Manufacturer Name) Properties=(Read)

            [Value] Texas Instruments

        [Characteristic] Handle=0x001f ValueHandle=0x0020 Type=0x2a2a(IEEE 11073-20601 Regulatory Certification Data List) Properties=(Read)

            [Value] [FE006578706572696D656E74616C]

        [Characteristic] Handle=0x0021 ValueHandle=0x0022 Type=0x2a50(PnP ID) Properties=(Read)

            [Value] [010D0000001001]

    [Service] Handle=0x0023 Type=f000aa00-0451-4000-b000-000000000000

        [Characteristic] Handle=0x0024 ValueHandle=0x0025 Type=f000aa01-0451-4000-b000-000000000000 Properties=(Read/Notify)

            [Value] [FBFCB40D]

            [Descriptor]  Handle=0x0026 Type=0x2902(Client Configuration)

                [Value]  IsSubscribeToNotification

            [Descriptor]  Handle=0x0027 Type=0x2901(User Description)

                [Value] IR Temp. Data

        [Characteristic] Handle=0x0028 ValueHandle=0x0029 Type=f000aa02-0451-4000-b000-000000000000 Properties=(Read/Write)

            [Value] [01]

            [Descriptor]  Handle=0x002a Type=0x2901(User Description)

                [Value] IR Temp. Conf.

    [Service] Handle=0x002b Type=f000aa10-0451-4000-b000-000000000000

        [Characteristic] Handle=0x002c ValueHandle=0x002d Type=f000aa11-0451-4000-b000-000000000000 Properties=(Read/Notify)

            [Value] [FF0342]

            [Descriptor]  Handle=0x002e Type=0x2902(Client Configuration)

                [Value]  IsSubscribeToNotification

            [Descriptor]  Handle=0x002f Type=0x2901(User Description)

                [Value] Accel. Data

        [Characteristic] Handle=0x0030 ValueHandle=0x0031 Type=f000aa12-0451-4000-b000-000000000000 Properties=(Read/Write)

            [Value] [01]

            [Descriptor]  Handle=0x0032 Type=0x2901(User Description)

                [Value] Accel. Conf.

        [Characteristic] Handle=0x0033 ValueHandle=0x0034 Type=f000aa13-0451-4000-b000-000000000000 Properties=(Read/Write)

            [Value] [19]

            [Descriptor]  Handle=0x0035 Type=0x2901(User Description)

                [Value] Acc. Period

    [Service] Handle=0x0036 Type=f000aa20-0451-4000-b000-000000000000

        [Characteristic] Handle=0x0037 ValueHandle=0x0038 Type=f000aa21-0451-4000-b000-000000000000 Properties=(Read/Notify)

            [Value] [E06C5293]

            [Descriptor]  Handle=0x0039 Type=0x2902(Client Configuration)

                [Value]  IsSubscribeToNotification

            [Descriptor]  Handle=0x003a Type=0x2901(User Description)

                [Value] Humid. Data

        [Characteristic] Handle=0x003b ValueHandle=0x003c Type=f000aa22-0451-4000-b000-000000000000 Properties=(Read/Write)

            [Value] [01]

            [Descriptor]  Handle=0x003d Type=0x2901(User Description)

                [Value] Humid. Conf.

    [Service] Handle=0x003e Type=f000aa30-0451-4000-b000-000000000000

        [Characteristic] Handle=0x003f ValueHandle=0x0040 Type=f000aa31-0451-4000-b000-000000000000 Properties=(Read/Notify)

            [Value] [EBFAA002B0F8]

            [Descriptor]  Handle=0x0041 Type=0x2902(Client Configuration)

                [Value]  IsSubscribeToNotification

            [Descriptor]  Handle=0x0042 Type=0x2901(User Description)

                [Value] Mag. Data

        [Characteristic] Handle=0x0043 ValueHandle=0x0044 Type=f000aa32-0451-4000-b000-000000000000 Properties=(Read/Write)

            [Value] [01]

            [Descriptor]  Handle=0x0045 Type=0x2901(User Description)

                [Value] Mag. Conf.

        [Characteristic] Handle=0x0046 ValueHandle=0x0047 Type=f000aa33-0451-4000-b000-000000000000 Properties=(Read/Write)

            [Value] [C8]

            [Descriptor]  Handle=0x0048 Type=0x2901(User Description)

                [Value] Mag. Period

    [Service] Handle=0x0049 Type=f000aa40-0451-4000-b000-000000000000

        [Characteristic] Handle=0x004a ValueHandle=0x004b Type=f000aa41-0451-4000-b000-000000000000 Properties=(Read/Notify)

            [Value] [7F005799]

            [Descriptor]  Handle=0x004c Type=0x2902(Client Configuration)

                [Value]  IsSubscribeToNotification

            [Descriptor]  Handle=0x004d Type=0x2901(User Description)

                [Value] Barometer Data

        [Characteristic] Handle=0x004e ValueHandle=0x004f Type=f000aa42-0451-4000-b000-000000000000 Properties=(Read/Write)

            [Value] [01]

            [Descriptor]  Handle=0x0050 Type=0x2901(User Description)

                [Value] Barometer Conf.

        [Characteristic] Handle=0x0051 ValueHandle=0x0052 Type=f000aa43-0451-4000-b000-000000000000 Properties=(Read)

            [Value] [55B43D697DB15E853E07A3DDD8FBFC06]

            [Descriptor]  Handle=0x0053 Type=0x2902(Client Configuration)

                [Value]  No subscription

            [Descriptor]  Handle=0x0054 Type=0x2901(User Description)

                [Value] Barometer Cali.

    [Service] Handle=0x0055 Type=f000aa50-0451-4000-b000-000000000000

        [Characteristic] Handle=0x0056 ValueHandle=0x0057 Type=f000aa51-0451-4000-b000-000000000000 Properties=(Read/Notify)

            [Value] [E5FFB401FBFF]

            [Descriptor]  Handle=0x0058 Type=0x2902(Client Configuration)

                [Value]  IsSubscribeToNotification

            [Descriptor]  Handle=0x0059 Type=0x2901(User Description)

                [Value] Gyro. Data

        [Characteristic] Handle=0x005a ValueHandle=0x005b Type=f000aa52-0451-4000-b000-000000000000 Properties=(Read/Write)

            [Value] [07]

            [Descriptor]  Handle=0x005c Type=0x2901(User Description)

                [Value] Gyro. Conf.

    [Service] Handle=0x005d Type=0xffe0

        [Characteristic] Handle=0x005e ValueHandle=0x005f Type=0xffe1 Properties=(Notify)

            [Descriptor]  Handle=0x0060 Type=0x2902(Client Configuration)

                [Value]  IsSubscribeToNotification

            [Descriptor]  Handle=0x0061 Type=0x2901(User Description)

                [Value] Key Press State

    [Service] Handle=0x0062 Type=f000aa60-0451-4000-b000-000000000000

        [Characteristic] Handle=0x0063 ValueHandle=0x0064 Type=f000aa61-0451-4000-b000-000000000000 Properties=(Read)

            [Value] [3F00]

            [Descriptor]  Handle=0x0065 Type=0x2901(User Description)

                [Value] Test Data

        [Characteristic] Handle=0x0066 ValueHandle=0x0067 Type=f000aa62-0451-4000-b000-000000000000 Properties=(Read/Write)

            [Value] [00]

            [Descriptor]  Handle=0x0068 Type=0x2901(User Description)

                [Value] Test Config

    [Service] Handle=0x0069 Type=f000ccc0-0451-4000-b000-000000000000

        [Characteristic] Handle=0x006a ValueHandle=0x006b Type=f000ccc1-0451-4000-b000-000000000000 Properties=(Read/Notify)

            [Value] [10000000C003]

            [Descriptor]  Handle=0x006c Type=0x2902(Client Configuration)

                [Value]  No subscription

            [Descriptor]  Handle=0x006d Type=0x2901(User Description)

                [Value] Conn. Params

        [Characteristic] Handle=0x006e ValueHandle=0x006f Type=f000ccc2-0451-4000-b000-000000000000 Properties=(Write)

            [Descriptor]  Handle=0x0070 Type=0x2901(User Description)

                [Value] Conn. Params Req

        [Characteristic] Handle=0x0071 ValueHandle=0x0072 Type=f000ccc3-0451-4000-b000-000000000000 Properties=(Write)

            [Descriptor]  Handle=0x0073 Type=0x2901(User Description)

                [Value] Disconnect Req

    [Service] Handle=0x0074 Type=f000ffc0-0451-4000-b000-000000000000

        [Characteristic] Handle=0x0075 ValueHandle=0x0076 Type=f000ffc1-0451-4000-b000-000000000000 Properties=(Write/WriteWithoutResponse/Notify)

            [Descriptor]  Handle=0x0077 Type=0x2902(Client Configuration)

                [Value]  No subscription

            [Descriptor]  Handle=0x0078 Type=0x2901(User Description)

                [Value] Img Identify

        [Characteristic] Handle=0x0079 ValueHandle=0x007a Type=f000ffc2-0451-4000-b000-000000000000 Properties=(Write/WriteWithoutResponse/Notify)

            [Descriptor]  Handle=0x007b Type=0x2902(Client Configuration)

                [Value]  No subscription

            [Descriptor]  Handle=0x007c Type=0x2901(User Description)

                [Value] Img Block

