@echo off
echo ==============================================
echo    Portfolio Deployment Script (GitHub)
echo ==============================================
echo.

:: Prompt for a commit message
set /p commitMsg="Enter commit message (or press enter for default 'Update portfolio'): "
if "%commitMsg%"=="" set commitMsg=Update portfolio

echo.
echo [1/3] Adding changes to Git...
git add .

echo.
echo [2/3] Committing and pushing to main branch...
git commit -m "%commitMsg%"
git push origin main

echo.
echo [3/3] Building and deploying to GitHub Pages...
call npm run deploy

echo.
echo ==============================================
echo    Deployment completed successfully!
echo ==============================================
pause
