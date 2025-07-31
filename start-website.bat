@echo off
echo Starting The IQ Zoo website...
echo.
echo The website will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
npx http-server . -p 3000 -c-1
pause 