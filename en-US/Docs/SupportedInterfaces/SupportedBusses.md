### Supported Busses {#SupportedBusses}

{:.table.table-bordered .devices}
Bus Type | Compatible Boards   | Description                             | Notes                              | Projects, Samples, Libraries                                     |Microsoft Verified|
---------|---------------------|-----------------------------------------|------------------------------------|------------------------------------------------------------------|------------------|
GPIO     | RPi2/RPi3, DB, MBM  | 24x on RPi2/RPi3, 11x on DB, 10x on MBM |                                    | [RPi2/RPi3 Pin Mapping] or [DB Pin Mapping] or [MBM Pin Mapping] |![Verified][MSVerified]{:.MsVerified}
UART     | RPi2/RPi3*, DB, MBM | 1x on RPi2/RPi3*, 2x on DB, 2x on MBM   | RPi3 only includes mini UART       |                                                                  |![Verified][MSVerified]{:.MsVerified}
SPI      | RPi2/RPi3, DB*, MBM | 2x on RPi2/RPi3, 1x on DB*, 1x on MBM   | on DB SPI clock is fixed at 4.8mhz |                                                                  |![Verified][MSVerified]{:.MsVerified} 
I2C      | RPi2/RPi3, DB, MBM  | 1x on RPi2/RPi3, 2x on DB, 1x on MBM    |                                    |                                                                  |![Verified][MSVerified]{:.MsVerified}
