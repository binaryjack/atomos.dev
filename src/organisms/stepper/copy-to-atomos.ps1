# Stepper Component Export Script
# Use this to copy the Stepper to your Atomos repository

param(
    [string]$AtomosPath = "E:\Sources\atomos.dev"
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Stepper to Atomos Migration Script" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan

# Paths
$sourcePath = "E:\Sources\e-b-svs\e-b-svs\src\modules\services\components\Stepper"
$destPath = Join-Path $AtomosPath "src\organisms\stepper"

# Verify source exists
if (-not (Test-Path $sourcePath)) {
    Write-Host "❌ Error: Source path not found: $sourcePath" -ForegroundColor Red
    exit 1
}

# Verify Atomos repo exists
if (-not (Test-Path $AtomosPath)) {
    Write-Host "❌ Error: Atomos repository not found at: $AtomosPath" -ForegroundColor Red
    Write-Host "Please clone atomos.dev or provide correct path using -AtomosPath parameter" -ForegroundColor Yellow
    exit 1
}

Write-Host "📂 Source: $sourcePath" -ForegroundColor Green
Write-Host "📂 Destination: $destPath" -ForegroundColor Green
Write-Host ""

# Ask for confirmation
$confirm = Read-Host "Continue with copy? (y/n)"
if ($confirm -ne 'y') {
    Write-Host "❌ Cancelled by user" -ForegroundColor Yellow
    exit 0
}

# Create destination directory
Write-Host "📁 Creating destination directory..." -ForegroundColor Yellow
New-Item -Path $destPath -ItemType Directory -Force | Out-Null

# Copy files
Write-Host "📋 Copying files..." -ForegroundColor Yellow
Copy-Item -Path "$sourcePath\*" -Destination $destPath -Recurse -Force

# Count files copied
$fileCount = (Get-ChildItem -Path $destPath -Recurse -File).Count
Write-Host "✅ Copied $fileCount files successfully!" -ForegroundColor Green

# Summary
Write-Host ""
Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host "✅ COPY COMPLETE!" -ForegroundColor Green
Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. cd $AtomosPath" -ForegroundColor White
Write-Host "2. Update imports to use Atomos paths" -ForegroundColor White
Write-Host "3. Add exports to src/organisms/index.ts" -ForegroundColor White
Write-Host "4. Convert CSS to Tailwind (optional)" -ForegroundColor White
Write-Host "5. pnpm build" -ForegroundColor White
Write-Host "6. pnpm storybook" -ForegroundColor White
Write-Host ""
Write-Host "📖 See INTEGRATION_GUIDE.md for detailed instructions" -ForegroundColor Yellow
Write-Host ""

# Optional: Open in VSCode
$openVSCode = Read-Host "Open Atomos repo in VS Code? (y/n)"
if ($openVSCode -eq 'y') {
    code $AtomosPath
    Write-Host "✅ Opened in VS Code" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Ready for Atomos integration!" -ForegroundColor Green
