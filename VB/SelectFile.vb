    ChDrive "W:\"
    ChDir "W:\DNC_DATEN\TORDER\"
    FN = Application.GetOpenFilename("Tool List Files (*.ini), *.ini")
    '("Tool List File(.ini), *.ini")
    If FN = "False" Then
    ' If myFileName = "False" Then
        MsgBox "Please select file!", vbInformation, "Cancel"
        Exit Sub
        'Return
    End If
