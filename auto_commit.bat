:: https://gist.github.com/ethaizone/7037514
@echo off
echo type "commit" or "update"
cd "curl"

:: set GIT_PATH="C:\Program Files (x86)\Git\bin\git.exe"
<<<<<<< HEAD
:: set GIT_PATH="C:\Users\didtugyi\AppData\Local\Programs\Git\cmd\git.exe"
set GIT_PATH="C:\Program Files\Git\cmd\git.exe"
=======
set GIT_PATH="C:\Users\didtugyi\AppData\Local\Programs\Git\cmd\git.exe"
>>>>>>> 58dc1f9cd5237cabf2988fea6d541c3667c1a6a5
set BRANCH = "origin"

:P
set ACTION=
set /P ACTION=Action: %=%
if "%ACTION%"=="c" (
  %GIT_PATH% add -A
	%GIT_PATH% commit -am "Auto-committed on %date%"
	%GIT_PATH% pull %BRANCH%
	%GIT_PATH% push %BRANCH%
)
if "%ACTION%"=="u" (
	%GIT_PATH% pull %BRANCH%
)
if "%ACTION%"=="exit" exit /b
goto P