@echo off
rem Double-click this file to look at the DEMO site (the one with the dealer back end) on this computer.
rem For the public site, double-click preview.bat instead. Both can run at the same time.
cd /d "%~dp0\site-demo"
echo.
echo  Showing the Timeless Trailers DEMO site at http://localhost:8767
echo  Leave this window open while you look. Close it when you're done.
echo.
start "" cmd /c "timeout /t 2 >nul & start http://localhost:8767/"
py -3 -m http.server 8767 --bind 127.0.0.1
pause
