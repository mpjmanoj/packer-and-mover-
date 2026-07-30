@echo off
echo ========================================
echo  Hassan Packers & Movers - GitHub Push
echo ========================================
echo.

:: Add Git to PATH
set PATH=C:\Program Files\Git\bin;C:\Program Files\Git\cmd;%PATH%

:: Check git
git --version
if %errorlevel% neq 0 (
    echo ERROR: Git not found. Please install from https://git-scm.com/download/win
    pause
    exit /b 1
)

echo.
echo Initializing Git repository...
git init

echo.
echo Configuring git user (update with your name/email if needed)...
git config user.name "mpjmanoj"
git config user.email "your_email@gmail.com"

echo.
echo Adding all files...
git add .

echo.
echo Creating initial commit...
git commit -m "Initial commit - Hassan Packers & Movers website"

echo.
echo Adding remote origin...
git remote remove origin 2>nul
git remote add origin git@github.com:mpjmanoj/packer-and-mover-.git

echo.
echo Setting branch to main...
git branch -M main

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo SUCCESS! Project pushed to GitHub!
    echo Visit: https://github.com/mpjmanoj/packer-and-mover-
) else (
    echo PUSH FAILED. Make sure your SSH key is added to GitHub.
    echo Run: ssh-keygen -t ed25519 -C "your_email@gmail.com"
    echo Then add the key at: https://github.com/settings/keys
)

echo.
pause
