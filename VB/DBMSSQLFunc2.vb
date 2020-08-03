Sub StandbyPrepare()
' preare for new Programs

    Dim carrierNo As Integer    ' Carrier No
    Dim toolAssy As String      ' Tool Assembly No
    Dim ToolCompo As String     ' Tool Component
    Dim i As Integer            ' i for loop
    Dim cnn1 As ADODB.Connection
    Dim rs As ADODB.Recordset
    Dim sql As String
    Dim prog As String
    
    ' Clear query result
    Range("D2:E1001").Select
    Selection.ClearContents
    Range("D2").Select
    
    ' get query sql
    carrierNo = Worksheets("Prepare").Cells(2, 1)
    sql = "SELECT"
    sql = sql + "  ToolAssy,"
    sql = sql + "  ToolCompo "
    sql = sql + "FROM VIEW_TEMP_TT_TOOL_PROGRAM_ASSY_COMPO "
    sql = sql + "WHERE Program IN"
    sql = sql + "("
    prog = Worksheets("Prepare").Cells(2, 2)
    sql = sql + "'" + prog + "'"
    'Worksheets("Prepare").Cells(3, 7) = sql
    
    i = 2
    Do While i < 12
      i = i + 1
      prog = Worksheets("Prepare").Cells(i, 2)
      If prog <> "" Then
        sql = sql + ",'" + prog + "'"
      End If
    Loop
    
    sql = sql + ")"
    sql = sql + "AND ToolAssy NOT IN"
    sql = sql + "("
    sql = sql + "   SELECT TOOL_ASSY_NO"
    sql = sql + "   FROM TB_TT_TOOL_STANDBY_DETAIL"
    sql = sql + "   WHERE CARRIER_NO = " + CStr(carrierNo)
    sql = sql + "   AND STATUS = 1"
    sql = sql + ")"
    sql = sql + "ORDER BY"
    sql = sql + "  ToolAssy,"
    sql = sql + "  ToolCompo"
    'Worksheets("Prepare").Cells(4, 7) = sql
    
    ' run sql and input data
    i = 1
    Set cnn1 = New ADODB.Connection
    cnn1.ConnectionString = "driver={SQL Server};server=szvs0010\kbfdm;uid=kbfdm;pwd=********;database=kbs_fdm"
    cnn1.ConnectionTimeout = 60
    cnn1.Open
    Set rs = cnn1.Execute(sql)
    If Not rs.EOF Then
      rs.MoveFirst
    End If
    Do While Not rs.EOF
        toolAssy = rs.Fields(0).Value
        ToolCompo = rs.Fields(1).Value
        i = i + 1
        Worksheets("Prepare").Cells(i, 4) = toolAssy
        Worksheets("Prepare").Cells(i, 5) = ToolCompo
        rs.MoveNext
    Loop
    cnn1.Close
    
    ' Set Print Area
    

End Sub
