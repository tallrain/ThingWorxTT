Sub onClock()
DoEvents
  Application.Workbooks("KBSZ FDM BDE Status.xlsm").Worksheets("CNC").Cells(3, 17) = "Auto On"
  onSchedule
End Sub

Sub offClock()
On Error Resume Next
  'Application.OnTime Now + TimeValue("00:00:01"), "onClock", , False
  'Application.OnTime Now + TimeValue("00:02:00"), "onClock", , False
   Application.Workbooks("KBSZ FDM BDE Status.xlsm").Worksheets("CNC").Cells(3, 17) = "Auto Off"
   Application.OnTime EarliestTime:=TimeValue("00:00:00"), _
    Procedure:="onSchedule", Schedule:=False
End Sub

Sub onSchedule()
  Dim sm As String
  sm = Application.Workbooks("KBSZ FDM BDE Status.xlsm").Worksheets("CNC").Cells(3, 17)
  If sm = "Auto On" Then
    refreshCNC
    Application.OnTime Now + TimeValue("00:06:00"), "onSchedule"
  End If
End Sub

Sub refreshCNC()
  Dim h, m, s
  Dim i As Integer
  h = Hour(Now)
  m = Minute(Now)
  s = Second(Now)
  'Cells(2, 6) = s
  For i = 2 To 43
    readFile (i)
  Next i
End Sub
