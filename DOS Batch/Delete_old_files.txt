forfiles /p "%directory%" /m *.* /d -60 /c "cmd /c del @path"
REM forfiles for files selection
REM /p for path
REM /m for mask
REM /d for days
REM /c for command
