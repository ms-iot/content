---
layout: default
title: 在支持的平台上设置 TPM
permalink: /zh-cn/win10/SetupTPM.htm
lang: zh-cn
---

#在支持的平台上设置 TPM

##<a name="fTPM"></a>设置 fTPM  
固件 TPM \(fTPM\) 需要特殊处理器/SoC 支持，因此，fTPM 当前在 Raspberry Pi2 上无法实现。

1. 必须使用内含版本 0.80 或更高版本的 UEFI 的 MBM。
2. 通过更改以下 UEFI 设置来启用 fTPM：

        Device Manager -> System Setup -> Security Configuration -> PTT = <Enable>

3. 确保没有用于 sTPM/dTPM 的 C:\\Windows\\System32\\ACPITABL.dat（解决冲突/删除不需要的文件）。
4. 验证是否已启用正确的 TPM 版本 - 在 Windows IoT 核心版设备上运行 [TPM 2.0 工具][1]。

        C:\>t2t.exe -cap

        TBS detected 2.0 firmware TPM (fTPM) using Intel TEE.
        Capabilities:
        PT_FIXED:
        TPM_PT_FAMILY_INDICATOR = '2.0'
        TPM_PT_LEVEL = 0 (0x00000000)
        TPM_PT_REVISION = 0.93
        TPM_PT_DAY_OF_YEAR = 283 (0x0000011b)
        TPM_PT_YEAR = 2012 (0x000007dc)
        TPM_PT_MANUFACTURER = 'INTC'
        TPM_PT_VENDOR_STRING = 'Intel'
        TPM_PT_VENDOR_TPM_TYPE = 3 (0x00000003)
        TPM_PT_FIRMWARE_VERSION_1 = 1.0 (0x1.0x0)
        TPM_PT_FIRMWARE_VERSION_2 = 2.1060 (0x2.0x424)
        TPM_PT_INPUT_BUFFER = 1024 (0x00000400)
        TPM_PT_HR_TRANSIENT_MIN = 3 (0x00000003)
        TPM_PT_HR_PERSISTENT_MIN = 2 (0x00000002)
        TPM_PT_HR_LOADED_MIN = 3 (0x00000003)
        TPM_PT_ACTIVE_SESSIONS_MAX = 64 (0x00000040)
        TPM_PT_PCR_COUNT = 24 (0x00000018)
        TPM_PT_PCR_SELECT_MIN = 3 (0x00000003)
        TPM_PT_CONTEXT_GAP_MAX = 65535 (0x0000ffff)
        TPM_PT_NV_COUNTERS_MAX = 16 (0x00000010)
        TPM_PT_NV_INDEX_MAX = 2048 (0x00000800)
        TPM_PT_MEMORY = sharedNV objectCopiedToRam
        TPM_PT_CLOCK_UPDATE = 4096ms
        TPM_PT_CONTEXT_HASH = TPM_ALG_SHA256
        TPM_PT_CONTEXT_SYM = TPM_ALG_AES
        TPM_PT_CONTEXT_SYM_SIZE = 128 (0x00000080)
        TPM_PT_ORDERLY_COUNT = 255 (0x000000ff)
        TPM_PT_MAX_COMMAND_SIZE = 3968 (0x00000f80)
        TPM_PT_MAX_RESPONSE_SIZE = 3968 (0x00000f80)
        TPM_PT_MAX_DIGEST = 32 (0x00000020)
        TPM_PT_MAX_OBJECT_CONTEXT = 924 (0x0000039c)
        TPM_PT_MAX_SESSION_CONTEXT = 244 (0x000000f4)
        TPM_PT_PS_FAMILY_INDICATOR = TPM_PS_MAIN
        TPM_PT_PS_LEVEL = 0 (0x00000000)
        TPM_PT_PS_REVISION = 0
        TPM_PT_PS_DAY_OF_YEAR = 0 (0x00000000)
        TPM_PT_PS_YEAR = 0 (0x00000000)
        TPM_PT_SPLIT_MAX = 0 (0x00000000)
        TPM_PT_TOTAL_COMMANDS = 70 (0x00000046)
        TPM_PT_LIBRARY_COMMANDS = 70 (0x00000046)
        TPM_PT_VENDOR_COMMANDS = 0 (0x00000000)

        PT_VAR:
        TPM_PT_PERMANENT = lockoutAuthSet tpmGeneratedEPS
        TPM_PT_STARTUP_CLEAR = phEnable shEnable ehEnable
        TPM_PT_HR_NV_INDEX = 2 (0x00000002)
        TPM_PT_HR_LOADED = 0 (0x00000000)
        TPM_PT_HR_LOADED_AVAIL = 3 (0x00000003)
        TPM_PT_HR_ACTIVE = 0 (0x00000000)
        TPM_PT_HR_ACTIVE_AVAIL = 64 (0x00000040)
        TPM_PT_HR_TRANSIENT_AVAIL = 3 (0x00000003)
        TPM_PT_HR_PERSISTENT = 3 (0x00000003)
        TPM_PT_HR_PERSISTENT_AVAIL = 18 (0x00000012)
        TPM_PT_NV_COUNTERS = 2 (0x00000002)
        TPM_PT_NV_COUNTERS_AVAIL = 14 (0x0000000e)
        TPM_PT_ALGORITHM_SET = 0 (0x00000000)
        TPM_PT_LOADED_CURVES = 0 (0x00000000)
        TPM_PT_LOCKOUT_COUNTER = 0 (0x00000000)
        TPM_PT_MAX_AUTH_FAIL = 10 (0x0000000a)
        TPM_PT_LOCKOUT_INTERVAL = 2h 0" 0'
        TPM_PT_LOCKOUT_RECOVERY = 2h 0" 0'
        TPM_PT_AUDIT_COUNTER = 0

        c:\>

5. 验证 fTPM 是否正常工作 - 在 Windows IoT 核心版设备上运行 [Urchin 单元测试][2]。应查看多个通过测试（请注意，某些功能并不受 fTPM 支持，因此预计会出现多个错误代码）：

        C:\>urchintest.exe
        ---SETUP----------------------------------------
        PASS...........CreateAuthorities()
        PASS...........CreateEkObject()
        PASS...........CreateSrkObject()
        (0x80280400)...CreateAndLoadAikObject()
        PASS...........CreateAndLoadKeyObject()

        ---TESTS----------------------------------------
        PASS...........TestGetCapability()
        PASS...........TestGetEntropy()
        PASS...........TestPolicySession()
        PASS...........TestSignWithPW()
        PASS...........TestSignHMAC()
        PASS...........TestSignBound()
        PASS...........TestSignSalted()
        PASS...........TestSignSaltedAndBound()
        PASS...........TestSignParameterEncryption()
        PASS...........TestSignParameterDecryption()
        PASS...........TestReadPcrWithEkSeededSession()
        (0x80280400)...TestCreateHashAndHMAC()
        (0x80280400)...TestCreateHashAndHMACSequence()
        (0x80280400)...TestSymKeyImport()
        PASS...........TestRsaKeyImport()
        (0x00000184)...TestCredentialActivation()
        PASS...........TestKeyExport()
        (0x80280400)...TestSymEncryption()
        (0x80280400)...TestCertifiedMigration()
        (0x0000014b)...TestNVIndexReadWrite()
        (0x80280400)...TestVirtualization()
        PASS...........TestObjectChangeAuth()
        PASS...........TestUnseal()
        PASS...........TestDynamicPolicies()
        (0x80280400)...TestRSADecrypt()
        (0x000002ca)...TestECDSASign()
        (0x00000184)...TestKeyAttestation()
        (0x00000184)...TestPlatformAttestation()

        ---CLEANUP--------------------------------------
        (0x000001c4)...UnloadKeyObjects()

        C:\>

##<a name="dTPM"></a>设置 dTPM  
以下说明适用于 MBM 或 RPi2 上受支持的任何 dTPM 模块。

1. 获取一个离散 TPM 模块，并将其附加到 MBM/RPi2。
2. （适用于 MBM）通过更改以下 UEFI 设置来禁用 fTPM：

        Device Manager -> System Setup -> Security Configuration -> PTT = <Disable>

3. （适用于 MBM）通过更改以下 UEFI 设置来启用 dTPM：

        Device Manager -> System Setup -> Security Configuration -> Discrete TPM = <Enable>

4. 根据选择的离散 TPM 模块，在[此处][3]标记其匹配的 ACPI 表。
5. 将 ACPI 表复制到 MBM/RPi2 _C:\\Windows\\System32\\ACPITABL.dat_。
6. 启用设备上的 testsigning：

        bcdedit /set {current} integrityservices disable
        bcdedit /set testsigning on

7. 重新启动设备。
8. 验证是否已启用正确的 TPM 版本 - 在 Windows IoT 核心版设备上运行 [TPM 2.0 工具][1]。

        C:\>t2t.exe -cap

        TBS detected 2.0 discrete TPM (dTPM) using TIS on SPB.
        Capabilities:
        PT_FIXED:
        TPM_PT_FAMILY_INDICATOR = '2.0'
        TPM_PT_LEVEL = 0 (0x00000000)
        TPM_PT_REVISION = 1.16
        TPM_PT_DAY_OF_YEAR = 303 (0x0000012f)
        TPM_PT_YEAR = 2014 (0x000007de)
        TPM_PT_MANUFACTURER = 'NTZ'
        TPM_PT_VENDOR_STRING = 'NTZ'
        TPM_PT_VENDOR_TPM_TYPE = 17 (0x00000011)
        TPM_PT_FIRMWARE_VERSION_1 = 4.31 (0x4.0x1f)
        TPM_PT_FIRMWARE_VERSION_2 = 5378.4617 (0x1502.0x1209)
        TPM_PT_INPUT_BUFFER = 2220 (0x000008ac)
        TPM_PT_HR_TRANSIENT_MIN = 4 (0x00000004)
        TPM_PT_HR_PERSISTENT_MIN = 7 (0x00000007)
        TPM_PT_HR_LOADED_MIN = 4 (0x00000004)
        TPM_PT_ACTIVE_SESSIONS_MAX = 64 (0x00000040)
        TPM_PT_PCR_COUNT = 24 (0x00000018)
        TPM_PT_PCR_SELECT_MIN = 3 (0x00000003)
        TPM_PT_CONTEXT_GAP_MAX = 65535 (0x0000ffff)
        TPM_PT_NV_COUNTERS_MAX = 0 (0x00000000)
        TPM_PT_NV_INDEX_MAX = 1639 (0x00000667)
        TPM_PT_MEMORY = objectCopiedToRam
        TPM_PT_CLOCK_UPDATE = 4096000ms
        TPM_PT_CONTEXT_HASH = TPM_ALG_SHA256
        TPM_PT_CONTEXT_SYM = TPM_ALG_AES
        TPM_PT_CONTEXT_SYM_SIZE = 128 (0x00000080)
        TPM_PT_ORDERLY_COUNT = 255 (0x000000ff)
        TPM_PT_MAX_COMMAND_SIZE = 2220 (0x000008ac)
        TPM_PT_MAX_RESPONSE_SIZE = 2220 (0x000008ac)
        TPM_PT_MAX_DIGEST = 32 (0x00000020)
        TPM_PT_MAX_SESSION_CONTEXT = 244 (0x000000f4)
        TPM_PT_PS_FAMILY_INDICATOR = TPM_PS_PDA
        TPM_PT_PS_LEVEL = 0 (0x00000000)
        TPM_PT_PS_REVISION = 25600
        TPM_PT_PS_DAY_OF_YEAR = 0 (0x00000000)
        TPM_PT_PS_YEAR = 0 (0x00000000)
        TPM_PT_SPLIT_MAX = 128 (0x00000080)
        TPM_PT_TOTAL_COMMANDS = 101 (0x00000065)
        TPM_PT_LIBRARY_COMMANDS = 99 (0x00000063)
        TPM_PT_VENDOR_COMMANDS = 2 (0x00000002)
        TPM_PT_NV_BUFFER_MAX = 1639 (0x00000667)

        PT_VAR:
        TPM_PT_STARTUP_CLEAR = phEnable shEnable ehEnable ehEnableNV
        TPM_PT_HR_NV_INDEX = 2 (0x00000002)
        TPM_PT_HR_LOADED = 0 (0x00000000)
        TPM_PT_HR_LOADED_AVAIL = 4 (0x00000004)
        TPM_PT_HR_ACTIVE = 0 (0x00000000)
        TPM_PT_HR_ACTIVE_AVAIL = 64 (0x00000040)
        TPM_PT_HR_TRANSIENT_AVAIL = 4 (0x00000004)
        TPM_PT_HR_PERSISTENT = 3 (0x00000003)
        TPM_PT_HR_PERSISTENT_AVAIL = 4 (0x00000004)
        TPM_PT_NV_COUNTERS = 2 (0x00000002)
        TPM_PT_NV_COUNTERS_AVAIL = 30 (0x0000001e)
        TPM_PT_ALGORITHM_SET = 0 (0x00000000)
        TPM_PT_LOADED_CURVES = 3 (0x00000003)
        TPM_PT_LOCKOUT_COUNTER = 0 (0x00000000)
        TPM_PT_MAX_AUTH_FAIL = 32 (0x00000020)
        TPM_PT_LOCKOUT_INTERVAL = 2h 0" 0'
        TPM_PT_LOCKOUT_RECOVERY = 24h 0" 0'
        TPM_PT_NV_WRITE_RECOVERY = 0ms
        TPM_PT_AUDIT_COUNTER = 0

        C:\>

9. 验证 dTPM 是否正常工作 - 在 Windows IoT 核心版设备上运行 [Urchin 单元测试][2]。应查看多个通过测试（请注意，某些功能可能不受 dTPM 支持，因此预计会出现多个错误代码）：

        C:\>urchintest.exe

        ---SETUP----------------------------------------
        PASS...........CreateAuthorities()
        PASS...........CreateEkObject()
        PASS...........CreateSrkObject()
        PASS...........CreateAndLoadAikObject()
        PASS...........CreateAndLoadKeyObject()

        ---TESTS----------------------------------------
        PASS...........TestGetCapability()
        PASS...........TestGetEntropy()
        PASS...........TestPolicySession()
        PASS...........TestSignWithPW()
        PASS...........TestSignHMAC()
        PASS...........TestSignBound()
        PASS...........TestSignSalted()
        PASS...........TestSignSaltedAndBound()
        (0xc000000d)...TestSignParameterEncryption()
        PASS...........TestSignParameterDecryption()
        PASS...........TestReadPcrWithEkSeededSession()
        PASS...........TestCreateHashAndHMAC()
        PASS...........TestCreateHashAndHMACSequence()
        PASS...........TestSymKeyImport()
        (0xc000000d)...TestRsaKeyImport()
        PASS...........TestCredentialActivation()
        PASS...........TestKeyExport()
        (0x00000182)...TestSymEncryption()
        PASS...........TestCertifiedMigration()
        PASS...........TestNVIndexReadWrite()
        (0x80280400)...TestVirtualization()
        PASS...........TestObjectChangeAuth()
        PASS...........TestUnseal()
        PASS...........TestDynamicPolicies()
        PASS...........TestRSADecrypt()
        PASS...........TestECDSASign()
        (0xc000000d)...TestKeyAttestation()
        (0xc000000d)...TestPlatformAttestation()

        ---CLEANUP--------------------------------------
        PASS...........UnloadKeyObjects()

        C:\>

##<a name="sTPM"></a>启用和验证软件 TPM \(sTPM\)  
请注意，**sTPM 仅用于开发目的，并不提供任何切实的安全优势**。

1. （适用于 MBM）通过更改以下 UEFI 设置来禁用 fTPM：

        Device Manager -> System Setup -> Security Configuration -> PTT = <Disable>

2. （适用于 MBM）通过更改以下 UEFI 设置来启用 dTPM：

        Device Manager -> System Setup -> Security Configuration -> Discrete TPM = <Enable>

3. 启用设备上的 testsigning：

        bcdedit /set {current} integrityservices disable
        bcdedit /set testsigning on

4. 将 ACPI 表从[此处][4]复制到 MBM/RPi2 _C:\\Windows\\System32\\ACPITABL.dat_。
5. 重新启动设备。
6. 验证是否已启用正确的 TPM 版本 - 在 Windows IoT 核心版设备上运行 [TPM 2.0 工具][1]。

        C:\>t2t.exe -cap
        TBS detected 2.0 simulated TPM (sTPM).
        Capabilities:
        PT_FIXED:
        TPM_PT_FAMILY_INDICATOR = '2.0'
        TPM_PT_LEVEL = 0 (0x00000000)  
        TPM_PT_REVISION = 1.15
        TPM_PT_DAY_OF_YEAR = 163 (0x000000a3)
        TPM_PT_YEAR = 2014 (0x000007de)
        TPM_PT_MANUFACTURER = 'MSFT'
        TPM_PT_VENDOR_STRING = 'IoT Software TPM'
        TPM_PT_VENDOR_TPM_TYPE = 1 (0x00000001)
        TPM_PT_FIRMWARE_VERSION_1 = 8213.275 (0x2015.0x113)
        TPM_PT_FIRMWARE_VERSION_2 = 21.18466 (0x15.0x4822)
        TPM_PT_INPUT_BUFFER = 1024 (0x00000400)
        TPM_PT_HR_TRANSIENT_MIN = 3 (0x00000003)
        TPM_PT_HR_PERSISTENT_MIN = 2 (0x00000002)
        TPM_PT_HR_LOADED_MIN = 3 (0x00000003)
        TPM_PT_ACTIVE_SESSIONS_MAX = 64 (0x00000040)
        TPM_PT_PCR_COUNT = 24 (0x00000018)
        TPM_PT_PCR_SELECT_MIN = 3 (0x00000003)
        TPM_PT_CONTEXT_GAP_MAX = 65535 (0x0000ffff)
        TPM_PT_NV_COUNTERS_MAX = 0 (0x00000000)
        TPM_PT_NV_INDEX_MAX = 2048 (0x00000800)
        TPM_PT_MEMORY = sharedNV objectCopiedToRam
        TPM_PT_CLOCK_UPDATE = 4096ms
        TPM_PT_CONTEXT_HASH = TPM_ALG_SHA256
        TPM_PT_CONTEXT_SYM = TPM_ALG_AES
        TPM_PT_CONTEXT_SYM_SIZE = 256 (0x00000100)
        TPM_PT_ORDERLY_COUNT = 255 (0x000000ff)
        TPM_PT_MAX_COMMAND_SIZE = 4096 (0x00001000)
        TPM_PT_MAX_RESPONSE_SIZE = 4096 (0x00001000)
        TPM_PT_MAX_DIGEST = 48 (0x00000030)
        TPM_PT_MAX_OBJECT_CONTEXT = 1520 (0x000005f0)
        TPM_PT_MAX_SESSION_CONTEXT = 308 (0x00000134)
        TPM_PT_PS_FAMILY_INDICATOR = TPM_PS_MAIN
        TPM_PT_PS_LEVEL = 0 (0x00000000)
        TPM_PT_PS_REVISION = 0
        TPM_PT_PS_DAY_OF_YEAR = 0 (0x00000000)
        TPM_PT_PS_YEAR = 0 (0x00000000)
        TPM_PT_SPLIT_MAX = 128 (0x00000080)
        TPM_PT_TOTAL_COMMANDS = 106 (0x0000006a)
        TPM_PT_LIBRARY_COMMANDS = 105 (0x00000069)
        TPM_PT_VENDOR_COMMANDS = 1 (0x00000001)

        PT_VAR:
        TPM_PT_PERMANENT = lockoutAuthSet tpmGeneratedEPS
        TPM_PT_STARTUP_CLEAR = phEnable shEnable ehEnable ehEnableNV
        TPM_PT_HR_NV_INDEX = 2 (0x00000002)
        TPM_PT_HR_LOADED = 0 (0x00000000)
        TPM_PT_HR_LOADED_AVAIL = 3 (0x00000003)
        TPM_PT_HR_ACTIVE = 0 (0x00000000)
        TPM_PT_HR_ACTIVE_AVAIL = 64 (0x00000040)
        TPM_PT_HR_TRANSIENT_AVAIL = 3 (0x00000003)
        TPM_PT_HR_PERSISTENT = 3 (0x00000003)
        TPM_PT_HR_PERSISTENT_AVAIL = 5 (0x00000005)
        TPM_PT_NV_COUNTERS = 2 (0x00000002)
        TPM_PT_NV_COUNTERS_AVAIL = 31 (0x0000001f)
        TPM_PT_ALGORITHM_SET = 0 (0x00000000)
        TPM_PT_LOADED_CURVES = 3 (0x00000003)
        TPM_PT_LOCKOUT_COUNTER = 3 (0x00000003)
        TPM_PT_MAX_AUTH_FAIL = 32 (0x00000020)
        TPM_PT_LOCKOUT_INTERVAL = 2h 0" 0'
        TPM_PT_LOCKOUT_RECOVERY = 24h 0" 0'
        TPM_PT_AUDIT_COUNTER = 0

        C:\>

7. 验证 sTPM 是否正常工作 - 在 Windows IoT 核心版设备上运行 [Urchin 单元测试][2]。应查看多个通过测试（请注意，某些功能并不受 sTPM 支持，因此预计会出现多个错误代码）：

        C:\>urchintest.exe
        ---SETUP----------------------------------------
        PASS...........CreateAuthorities()
        PASS...........CreateEkObject()
        PASS...........CreateSrkObject()
        PASS...........CreateAndLoadAikObject()
        PASS...........CreateAndLoadKeyObject()

        ---TESTS----------------------------------------
        PASS...........TestGetCapability()
        PASS...........TestGetEntropy()
        PASS...........TestPolicySession()
        PASS...........TestSignWithPW()
        PASS...........TestSignHMAC()
        PASS...........TestSignBound()
        PASS...........TestSignSalted()
        PASS...........TestSignSaltedAndBound()
        (0xc000000d)...TestSignParameterEncryption()
        PASS...........TestSignParameterDecryption()
        PASS...........TestReadPcrWithEkSeededSession()
        PASS...........TestCreateHashAndHMAC()
        PASS...........TestCreateHashAndHMACSequence()
        PASS...........TestSymKeyImport()
        (0xc000000d)...TestRsaKeyImport()
        PASS...........TestCredentialActivation()
        PASS...........TestKeyExport()
        (0x00000182)...TestSymEncryption()
        PASS...........TestCertifiedMigration()
        PASS...........TestNVIndexReadWrite()
        (0x80280400)...TestVirtualization()
        PASS...........TestObjectChangeAuth()
        PASS...........TestUnseal()
        PASS...........TestDynamicPolicies()
        PASS...........TestECDSASign())
        PASS........
        (0xc000000d)...TestKeyAttestation()
        (0xc000000d)...TestPlatformAttestation()

        ---CLEANUP--------------------------------------
        PASS...........UnloadKeyObjects()

        C:\>

[1]: https://github.com/ms-iot/security/tree/master/Urchin/T2T "T2T"
[2]: https://github.com/ms-iot/security/tree/master/Urchin/UrchinTest "UrchinTest"
[3]: https://github.com/ms-iot/security/tree/master/TPM-ACPITABL "TPM ACPI 表"
[4]: https://github.com/ms-iot/security/tree/master/TPM-ACPITABL/fTPMSim "sTPM ACPI 表"

*[sTPM]: 软件 TPM
*[fTPM]: 固件 TPM
*[dTPM]: 离散 TPM

