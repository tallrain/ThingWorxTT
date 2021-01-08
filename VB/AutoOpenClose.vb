Private Sub Workbook_Open()
    Sheet1.Cells(1, 1) = 2021
    ActiveWorkbook.Save
    MsgBox ("Hello World!")
    MsgBox ("5s to quit.....")
    Application.Wait (Now() + TimeValue("00:00:05"))
    MsgBox ("Now to close.")
End Sub
