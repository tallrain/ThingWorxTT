Sub Manual_Orders()
' Get Working Tools
    Dim cnn1 As ADODB.Connection
    Dim rs As ADODB.Recordset
    Dim qry As String
    Dim i As Integer
    Dim Tlist As String
    Dim c1 As String
    Dim MM As String
    Dim pg As String
    Dim prt As String
    
    Tlist = ""
    Worksheets("Manual_Orders").Cells(2, 8) = ""
    i = 2
    Set cnn1 = New ADODB.Connection
    cnn1.ConnectionString = "driver={SQL Server};server=szvs0010\kbfdm;uid=kbfdm;pwd=********;database=kbs_fdm"
    cnn1.ConnectionTimeout = 30
    cnn1.Open
    Do While i < 10
        qry = Worksheets("Manual_Orders").Cells(i, 3)
        If qry <> "" Then
            qry = "SELECT DBO.FUNC_GET_WORKING_TOOLS('" + qry + "')"
            'Worksheets("Manual_Orders").Cells(2, 8) = qry
            Set rs = cnn1.Execute(qry)
            If Not rs.EOF Then
                rs.MoveFirst
                c1 = rs.Fields(0).Value
                Tlist = Tlist + c1
            End If
            'cnn1.Close
        End If
        i = i + 1
    Loop
    cnn1.Close
    Worksheets("Manual_Orders").Cells(2, 8) = Tlist

' Add Manual Orders
    MM = Worksheets("Manual_Orders").Cells(1, 1)
    cnn1.ConnectionString = "driver={SQL Server};server=szvs0010\kbfdm;uid=kbfdm;pwd=F!d@m3p4;database=kbs_fdm"
    cnn1.ConnectionTimeout = 30
    cnn1.Open
'    Set mobjConn = New ADODB.Connection
'    mobjConn.Open "your connection string"
    Set mobjCmd = New ADODB.Command
    With mobjCmd
        .ActiveConnection = cnn1
        .CommandText = "DBO.SP_ADD_MANUAL_ORDER_TOOLS"
        .CommandType = adCmdStoredProc
        .CommandTimeout = 0
        .Parameters.Append .CreateParameter("@MM", adVarChar, adParamInput, 20, MM)
        .Parameters.Append .CreateParameter("@PROGRAM", adVarChar, adParamInput, 20, "")
        .Parameters.Append .CreateParameter("@PART", adVarChar, adParamInput, 50, "")
        .Parameters.Append .CreateParameter("@ACTION", adInteger, adParamInput, , 0)
        ' repeat as many times as you have parameters
        .Execute
    End With
    
    i = 11
    Do While i < 19
        pg = Worksheets("Manual_Orders").Cells(i, 3)
        'prt = Worksheets("Manual_Orders").Cells(i, 4)
        If pg <> "" Then  'And prt <> "" Then
            Set mobjCmd = New ADODB.Command
            With mobjCmd
                .ActiveConnection = cnn1
                .CommandText = "DBO.SP_ADD_MANUAL_ORDER_TOOLS"
                .CommandType = adCmdStoredProc
                .CommandTimeout = 0
                .Parameters.Append .CreateParameter("MM", adVarChar, adParamInput, 20, MM)
                .Parameters.Append .CreateParameter("PROGRAM", adVarChar, adParamInput, 20, pg)
                .Parameters.Append .CreateParameter("PART", adVarChar, adParamInput, 50, "")
                .Parameters.Append .CreateParameter("ACTION", adInteger, adParamInput, , 1)
                ' repeat as many times as you have parameters
                .Execute
            End With
        End If
        i = i + 1
    Loop

    Filename = "W:\TT\Tool_Apps.log"
    Open Filename For Append As #1
    Print #1, Format(Now(), "yyyy/mm/dd hh:MM:ss") + ", " + MM + ", Input Manual Orders"
    Close #1
    MsgBox ("1.5 Input Manual Orders for " + MM + " completed.")

End Sub
