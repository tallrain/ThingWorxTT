Private Function getN1(Str As String, EXT As String) As Integer
  Dim i As Integer
  Dim j As Integer
  Dim p As Integer
  Dim SS As String
  Dim l As Integer
  SS = UCase(Str)
  i = 0
  j = 0
  Do While j > -1
    p = InStr(1, SS, EXT)
    l = Len(SS)
    If p > 0 Then
      i = i + 1
      SS = Right(SS, l - p - 3)
    ElseIf p = 0 Then
      j = -1
    End If
  Loop
  getN1 = i
End Function
