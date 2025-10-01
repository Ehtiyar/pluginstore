# PowerShell script to remove problematic netlify.toml
Write-Host "Removing problematic netlify.toml file..." -ForegroundColor Green

# Check if netlify.toml exists
if (Test-Path "netlify.toml") {
    Remove-Item "netlify.toml" -Force
    Write-Host "✅ Removed netlify.toml file" -ForegroundColor Green
} else {
    Write-Host "ℹ️  netlify.toml file not found" -ForegroundColor Yellow
}

# Check if netlify-config.toml exists and remove it too
if (Test-Path "netlify-config.toml") {
    Remove-Item "netlify-config.toml" -Force
    Write-Host "✅ Removed netlify-config.toml file" -ForegroundColor Green
}

Write-Host "`n📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. git add ." -ForegroundColor White
Write-Host "2. git commit -m 'Remove problematic netlify.toml'" -ForegroundColor White
Write-Host "3. git push origin main" -ForegroundColor White
Write-Host "4. Configure Netlify dashboard manually:" -ForegroundColor White
Write-Host "   - Build command: npm run build" -ForegroundColor Gray
Write-Host "   - Publish directory: .next" -ForegroundColor Gray
Write-Host "   - Node version: 18" -ForegroundColor Gray
Write-Host "   - Add plugin: @netlify/plugin-nextjs" -ForegroundColor Gray
Write-Host "5. Set environment variables in Netlify dashboard" -ForegroundColor White
Write-Host "6. Trigger new deploy" -ForegroundColor White

Write-Host "`n🎯 This will solve the 'Base di' parsing error!" -ForegroundColor Green
