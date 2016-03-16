- [WLAN 硬件保护装置](#WiFi-Dongles)
- [蓝牙硬件保护装置](#Bluetooth-Dongles)
- [相机](#Cameras)
- [音频](#Audio)
- [其他](#Miscellaneous)

### WLAN 硬件保护装置 {\#WLAN-Dongles}

{:.table.table-bordered .devices}
部件名称/编号 | 兼容板 | 描述 | 注释 | 项目, 示例, 库 |Microsoft 验证 |
------------------------------------------------|-------------------|----------------------------------------------------------------------------------------------------------------|-------|------------------------------|------------------------------------|
官方 Raspberry Pi WLAN 硬件保护装置 | RPI2 | “官方 Raspberry Pi WLAN 硬件保护装置提供其较小大小带来的最佳可能 WLAN性能。” | | |!\[Verified\]\[MSVerified\]{:.MsVerified}
Airlink 无线 N 150 微型 USB 适配器 | MBM | 附带 WPA2、WPA 和 WEP 增强无线安全的 Airlink101 AWL5077 金色 150Mbps 无线微型 USB 适配器 | | |!\[Verified\]\[MSVerified\]{:.MsVerified}
Panda PAU06 | MBM | 附带高增益天线的 Panda 300Mbps 无线 N USB 适配器 | | |!\[Verified\]\[MSVerified\]{:.MsVerified}
TP-LINK TL\_WN725N | RPI2，MBM | TP-LINK TL-WN725N 无线 N Nano USB 适配器 150Mbps | | |!\[Verified\]\[MSVerified\]{:.MsVerified}
NET-DYN USB WLAN 适配器 | MBM | WLAN USB 适配器 NET-DYN | | |!\[Verified\]\[MSVerified\]{:.MsVerified}
Realtek 8191 USB 无线 WLAN | RPI2，MBM | Realtek 8191 300Mbps 802.11n/g/b USB 无线 WLAN 局域网网卡适配器 | | |!\[Verified\]\[MSVerified\]{:.MsVerified}
Realtek 8192 USB 无线 WLAN | RPI2，MBM | 附带 USB 2.0 接口的 Realtek 单芯片 IEEE 802.11b/g/n 2T2R WLAN 控制器 | | |!\[Verified\]\[MSVerified\]{:.MsVerified}

### 蓝牙硬件保护装置 {\#Bluetooth-Dongles}

{:.table.table-bordered .devices}
部件名称/编号 | 兼容板 | 描述 | 注释 | 项目, 示例, 库 |Microsoft 验证|
--------------------------------------------|-------------------|-------------------------------------------------------------------|-------|------------------------------|------------------|
CSR 微型 USB 蓝牙 V4.0 适配器 | RPI2，MBM | 2 级蓝牙 4.0 智能准备适配器、低功耗、双电源 | | |!\[Verified\]\[MSVerified\]{:.MsVerified}
ORICO BTA-403 微型蓝牙 4.0 USB 硬件保护装置 | RPI2，MBM | 低功耗蓝牙 4.0 适配器 USB 微型适配器硬件保护装置 | | |!\[Verified\]\[MSVerified\]{:.MsVerified}
CSR 微型 USB 蓝牙 V4.0 适配器 | MBM | 2 级蓝牙 4.0 智能准备适配器、低功耗、双电源 | | |!\[Verified\]\[MSVerified\]{:.MsVerified}

### 相机 {\#Cameras}

{:.table.table-bordered .devices}
部件名称/编号 | 兼容板 | 描述 | 注释 | 项目, 示例, 库 |Microsoft 验证|                  
----------------------------------|-------------------|------------------------------------------|----------------------------------------------------------------------------|-------------------------------|------------------|                  
Microsoft Lifecam 3000 USB 相机 | RPI2，MBM | USB 网络摄像头 | 限制为小于每秒 5 帧，没有任何已知性能解决方法 | \[家庭安全相机项目\]|!\[Verified\]\[MSVerified\]{:.MsVerified}
Microsoft Lifecam HD-5000 | RPI2，MBM | Microsoft LifeCam HD-5000 720p 高清网络摄像头 | USB 2.0 | |!\[Verified\]\[MSVerified\]{:.MsVerified}
Logitech 网络摄像头 C210 | RPI2，MBM | USB 网络摄像头，1.3mp 照片 | | |!\[Verified\]\[MSVerified\]{:.MsVerified}

### 音频 {\#Audio}

{:.table.table-bordered .devices}
部件名称/编号 | 兼容板 | 描述 | 注释 | 项目, 示例, 库 |Microsoft 验证|                  
----------------------------------------------------------|-------------------|-----------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|------------------|                  
Sabrent USB 外部立体声音响适配器，型号 AU-EMAC1 | RPI2，MBM | 将 USB 转换为 3.5 毫米音频和麦克风信号。 | 将外部 USB 声卡附加到 RPi2 会将外部音频终结点（播放设备）添加到现有板载 PWM 耳机插孔。因为在重新启动时无法保证音频设备的默认顺序，所以建议应用程序枚举音频终结点并确保使用正确的终结点。 | |!\[Verified\]\[MSVerified\]{:.MsVerified}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
### 其他 {\#Miscellaneous}                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

{:.table.table-bordered .devices}
部件名称/编号 | 兼容板 | 描述 | 注释 | 项目, 示例, 库 |Microsoft 验证|                  
-------------------------------------------------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|                  
Aeon Labs Z-Wave Z-Stick 系列 2 USB 硬件保护装置 DSA02203-ZWUS | RPI2 | 系列 2 Z-Wave USB Z-Stick 控制器 | 使用一键配对的轻松网络创建 | \[ZWave 示例\] |!\[Verified\]\[MSVerified\]{:.MsVerified}
电子黑板 7 英寸 LCD 电容式触摸屏屏幕 | RPI2 | 有关产品信息，请参阅[产品网站](http://www.chalk-elec.com/?page_id=1280#!/7-black-frame-universal-HDMI-LCD-with-capacitive-multi-touch/p/21750201/category=3094861)。 | 若要实现与 Windows 10 IoT 核心版结合使用，请执行以下操作： <br /> 1.按照 chalk-elec.com 上的[固件更新说明]('http://www.chalk-elec.com/?p=1826')进行操作 <br /> 2.将固件版本 7-bf-mt-v2-2.hex 刷入触摸屏 <br /> 3.将 HDMI 和 USB 电缆连接到 RPI2 <br /> 4.首先打开触摸屏电源，然后打开 RPI2 电源 | [产品网页](http://www.chalk-elec.com/?page_id=1280#!/7-black-frame-universal-HDMI-LCD-with-capacitive-multi-touch/p/21750201/category=3094861) <br /> [固件刷机说明](http://www.chalk-elec.com/?p=1826)|!\[Verified\]\[MSVerified\]{:.MsVerified}
Vodafone \(Huawei\) K5150 | RPI2，MBM | Vodafone \(Huawei\) K5150 150Mbps 4G LTE FDD USB 移动宽带调制解调器 | | |!\[Verified\]\[MSVerified\]{:.MsVerified}
Sierra 无线波束 \(AirCard 340U\) | MBM | Sierra 无线波束 \(AirCard 340U\) 4G LTE USB 移动宽带调制解调器 | | |!\[Verified\]\[MSVerified\]{:.MsVerified}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
