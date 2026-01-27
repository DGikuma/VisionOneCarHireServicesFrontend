@echo off
setlocal EnableDelayedExpansion

echo ============================================
echo Vision 1 Brand Color Migration Script
echo ============================================

set ROOT=%cd%

echo.
echo Scanning project files...
echo.

for /r "%ROOT%" %%f in (*.css *.js *.ts *.jsx *.tsx *.html) do (
    echo Updating %%f

    powershell -NoProfile -ExecutionPolicy Bypass -Command ^
        "$content = Get-Content '%%f' -Raw;" ^
        "$content = $content -replace 'primary-', 'brand-orange-';" ^
        "$content = $content -replace 'secondary-', 'brand-charcoal-';" ^
        "$content = $content -replace 'text-gray-900', 'text-brand-charcoal-500';" ^
        "$content = $content -replace 'bg-gray-100', 'bg-neutral-light';" ^
        "Set-Content '%%f' $content"
)

echo.
echo ============================================
echo Migration complete.
echo Restart your dev server.
echo ============================================

pause
