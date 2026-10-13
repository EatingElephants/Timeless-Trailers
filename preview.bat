@echo off
rem Double-click this file to look at the PUBLIC Timeless Trailers site on this computer.
rem For the demo site with the dealer back end, double-click preview-demo.bat instead.
rem Leave the black window open while you look. Close it when you're done.
cd /d "%~dp0\site"
echo.
echo  Showing the Timeless Trailers public site at http://localhost:8766
echo  Leave this window open while you look. Close it when you're done.
echo.
start "" cmd /c "timeout /t 2 >nul & start http://localhost:8766/"
py -3 -m http.server 8766 --bind 127.0.0.1
pause
