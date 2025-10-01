# PowerShell script to commit and push the fixed package.json
Write-Host "Committing and pushing the fixed package.json..." -ForegroundColor Green

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "❌ Not in a git repository. Please run this from your project root." -ForegroundColor Red
    exit 1
}

# Check if package.json exists
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json not found. Please make sure you're in the correct directory." -ForegroundColor Red
    exit 1
}

# Show current git status
Write-Host "`n📋 Current git status:" -ForegroundColor Cyan
git status

# Add the package.json file
Write-Host "`n📦 Adding package.json to git..." -ForegroundColor Yellow
git add package.json

# Commit the changes
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m "Fix dependency versions for Netlify deployment

- Fixed react-stripe-js version from ^2.4.0 to ^2.1.0
- Updated React versions to be more specific
- Added specific versions for devDependencies
- Resolved npm ETARGET error"

# Push to remote
Write-Host "🚀 Pushing to remote repository..." -ForegroundColor Yellow
git push origin main

Write-Host "`n✅ Successfully pushed the fixed package.json!" -ForegroundColor Green
Write-Host "🎯 Netlify will now automatically redeploy with the correct dependencies." -ForegroundColor Green

Write-Host "`n📋 What happens next:" -ForegroundColor Cyan
Write-Host "1. Netlify detects the new commit" -ForegroundColor White
Write-Host "2. Installs dependencies with correct versions" -ForegroundColor White
Write-Host "3. Builds successfully" -ForegroundColor White
Write-Host "4. Deploys your Minecraft Plugin Store" -ForegroundColor White

Write-Host "`n🔗 Check your Netlify dashboard for the deployment progress!" -ForegroundColor Yellow
