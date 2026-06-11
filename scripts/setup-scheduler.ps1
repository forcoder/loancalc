# setup-scheduler.ps1 - 注册 Windows 任务计划，每天 09:07 触发 daily-build.ps1
# 用法（管理员 PowerShell）: powershell -ExecutionPolicy Bypass -File scripts\setup-scheduler.ps1

$ErrorActionPreference = "Stop"
$TaskName = "MoneyMaker-Daily-Build"
$ScriptPath = "D:\workspace\moneymaker\scripts\daily-build.ps1"

# 1. 验证脚本存在
if (-not (Test-Path $ScriptPath)) {
    throw "找不到脚本: $ScriptPath"
}

# 2. 如果已存在同名任务，先删除
$existing = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($existing) {
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
    Write-Host "已删除旧任务: $TaskName"
}

# 3. 创建任务：每天 09:07 触发
$action = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$ScriptPath`""

$trigger = New-ScheduledTaskTrigger -Daily -At "09:07"

$principal = New-ScheduledTaskPrincipal `
    -UserId "$env:USERDOMAIN\$env:USERNAME" `
    -LogonType Interactive `
    -RunLevel Highest

$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Hours 4)

Register-ScheduledTask `
    -TaskName $TaskName `
    -Action $action `
    -Trigger $trigger `
    -Principal $principal `
    -Settings $settings `
    -Description "MoneyMaker 工厂每日工具构建任务：每天 09:07 自动调用 Claude Code 执行 scripts/daily-tool-builder.md 定义的找痛点→做产品→写代码→部署→获客 5 步流程" |
    Out-Null

# 4. 输出管理命令参考
Write-Host ""
Write-Host "已注册任务: $TaskName"
Write-Host "  触发时间: 每天 09:07"
Write-Host "  执行脚本: $ScriptPath"
Write-Host ""
Write-Host "管理命令:"
Write-Host "  立即运行:  Start-ScheduledTask -TaskName $TaskName"
Write-Host "  查看状态:  Get-ScheduledTask -TaskName $TaskName"
Write-Host "  删除任务:  Unregister-ScheduledTask -TaskName $TaskName -Confirm:`$false"
