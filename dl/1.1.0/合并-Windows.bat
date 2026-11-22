@echo off
cd /d "%~dp0"
echo 正在合并 Windows 安装包...
copy /b "MC-Toolbox-Windows-1.1.0.zip.part00"+"MC-Toolbox-Windows-1.1.0.zip.part01" "MC-Toolbox-Windows-1.1.0.zip"
if errorlevel 1 goto fail
echo.
echo 合并完成，正在校验 SHA-256...
certutil -hashfile "MC-Toolbox-Windows-1.1.0.zip" SHA256
echo.
echo 正确值应为 9d7ea5e77845ff9d2f0fe1a7758763dfed45e26d25023cd9961f70a54f6908fd
pause
exit /b 0
:fail
echo 合并失败，请确认两个分卷都在本目录。
pause
exit /b 1
