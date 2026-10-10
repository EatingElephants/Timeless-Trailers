@echo off
rem Double-click this file to look at the Timeless Trailers site on this computer.
rem Leave the black window open while you look. Close it when you're done.
cd /d "%~dp0\site"
echo.
echo  Showing the Timeless Trailers concept at http://localhost:8766
echo  Leave this window open while you look. Close it when you're done.
echo.
start "" cmd /c "timeout /t 2 >nul & start http://localhost:8766/"
py -3 -m http.server 8766 --bind 127.0.0.1
pause
