    Worksheets("Planned_Tools2").Range("G5:J2000").Select
    Selection.ClearContents
    
    Worksheets("Planned_Tools2").Cells(17, 1) = 0
    Worksheets("Planned_Tools2").Cells(19, 1) = 0
    Range("B4").Select
    
    MM1 = Cells(5, 1)
    sLookFor = MM1  'Change to suit
    Set oLookin = Worksheets("Planned_Tools").UsedRange 'Change sheet name to suit
    Set oFound = oLookin.Find(what:=sLookFor, LookIn:=xlValues, LookAt:=xlPart, MatchCase:=False)
    If oFound Is Nothing Then
        Exit Sub
        'MsgBox oLookin.Range("A" & oFound.Row).Address
    End If

    ' Process data
    i = oFound.Row
    MM2 = Worksheets("Planned_Tools").Cells(i, 1)
