Private Function getToolStatus(SS1 As String, TN As String) As String
    ' i1 = InStr(1, SS1, "$TC_TP8[")
    Dim TI As String    ' Tool ID
    Dim TS As String    ' Tool Status
    Dim TL As String    ' Tool Length
    Dim TR As String    ' Tool Radius
    Dim l As Long       ' String Length
    Dim l2 As Integer
    Dim i1 As Integer   ' Position 1
    'Dim i2 As Integer   ' Position 2
    Dim SS9 As String   ' String all left
    l = Len(SS1)
    ' Get Tool ID
    SS9 = "$TC_TP8[" + TN + "]="
    l2 = Len(SS9)
    i1 = InStr(1, SS1, SS9)
    If i1 = 0 Then
        Exit Function
    End If
    SS9 = Right(SS1, l - i1 - l2 + 1)
    l = Len(SS9)
    i1 = InStr(1, SS9, "$TC_TP9[")
    If i1 = 0 Then
        Exit Function
        'Return
    End If
    TS = Left(SS9, i1 - 1)
    getToolStatus = TS
End Function
