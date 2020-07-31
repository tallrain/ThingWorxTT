    Filename = "W:\TT\Tool_Apps.log"
    Open Filename For Append As #1
    Print #1, Format(Now(), "yyyy/mm/dd hh:MM:ss") + ", " + Cells(5, 1) + ", Get Tool List"
    Close #1
