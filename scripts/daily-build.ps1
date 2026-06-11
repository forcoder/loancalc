#!/usr/bin/env pwsh
# daily-build.ps1 - 触发每日 MoneyMaker 工具构建流程
# 用法: powershell -ExecutionPolicy Bypass -File scripts/daily-build.ps1

$ErrorActionPreference = "Stop"
$ProjectRoot = "D:\workspace\moneymaker"
$LogDir = Join-Path $ProjectRoot "daily-builds"
$Today = Get-Date -Format "yyyy-MM-dd"
$LogFile = Join-Path $LogDir "${Today}.log"

# 1. 确保日志目录存在
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

# 2. 写入时间戳日志头
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
"[${timestamp}] 开始每日工具构建" | Out-File -Append -FilePath $LogFile -Encoding utf8

# 3. 调用 Claude Code 非交互模式执行工作流
$prompt = @"
读取并按 ${ProjectRoot}\scripts\daily-tool-builder.md 的完整 5 步流程执行：
1) 找痛点 2) 做产品 3) 写代码 4) 部署 5) 获客
项目根目录: ${ProjectRoot}
部署: Vercel (loancalc-eta.vercel.app)
所有计算在浏览器端，零后端依赖。
完成后输出 ≤10 行总结，写入 daily-builds\${Today}.md。
工作目录已切换到 ${ProjectRoot}。
"@

$env:CLAUDE_PROJECT_DIR = $ProjectRoot
Push-Location $ProjectRoot
try {
    $claudeArgs = @(
        "--print"
        "--add-dir", $ProjectRoot
        "--permission-mode", "acceptEdits"
        $prompt
    )
    & claude @claudeArgs 2>&1 |
        Tee-Object -FilePath $LogFile -Append
} finally {
    Pop-Location
}

# 4. 记录结束
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
"[${timestamp}] 完成" | Out-File -Append -FilePath $LogFile -Encoding utf8

Write-Host "完成。日志: $LogFile"
