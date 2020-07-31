Sub Get_Location()
' no use, now using VLOOKUP in Excel instead
    Dim i As Long
    Dim j As Long
    Dim T1 As String
    Dim T2 As String
    Dim k As String
    Dim Y1 As String
    Dim Y2 As String
    Dim Q1 As Boolean   ' 1st KitC or not
    Dim qry As String
    Dim loc As String
    Dim qty As String
    Dim desc As String
    Dim oFound As Range
    Dim oLookin As Range
    Dim sLookFor As String
              
    Set cn = New Connection
    Set rs = New Recordset
    cn.ConnectionString = "Driver={Microsoft Access Driver (*.mdb)};Dbq=w:\MAPP\TMS\DataBase\TMS.mdb;Uid=Admin;Pwd=5238;Data Source=tms;CHARSET=UTF8"
    'w:\MAPP\TMS\DataBase\TMS.mdb
    'C:\KBData\KB\DM\KBSZ\Tool\TMS\DataBase\TMS.mdb
    '
    cn.Open
    'qry = "SELECT SN, Location, OnHand, KitCName FROM KitC WHERE SN = 19756 OR SN = 24030"
    qry = "SELECT KitCNo, Location, OnHand, KitCName FROM KitC WHERE KitCNo IN(" + qry + ")"
    'Worksheets("Planned_Tools2").Cells(20, 9) = qry
    rs.Open qry, cn, adOpenStatic, adLockBatchOptimistic
    If Not rs.EOF Then
        rs.MoveFirst
    End If
    
    ' Update KitC
    i = 2
    Worksheets("KitC2").Activate
    Worksheets("KitC2").Range("A2:D2000").Select
    Selection.ClearContents
    Range("A2").Select
    
    Do While Not rs.EOF
        k = rs.Fields(0).Value
        Worksheets("KitC2").Cells(i, 1) = k
        If IsNull(rs.Fields(1).Value) Then
            loc = ""
        Else
            loc = rs.Fields(1).Value
        End If
        Worksheets("KitC2").Cells(i, 2) = loc
        If IsNull(rs.Fields(2).Value) Then
            qty = 0
        Else
            qty = rs.Fields(2).Value
        End If
        Worksheets("KitC2").Cells(i, 3) = qty
        If IsNull(rs.Fields(3).Value) Then
            desc = ""
        Else
            desc = rs.Fields(3).Value
        End If
        Worksheets("KitC2").Cells(i, 4) = desc
        rs.MoveNext
        i = i + 1
    Loop
    rs.Close
    cn.Close

'    ' Clear Tool info in Tools
    Worksheets("Planned_Tools2").Activate
'    Worksheets("Planned_Tools2").Range("G19:H2000").Select
'    Selection.ClearContents
    Range("G19").Select
'

End Sub
