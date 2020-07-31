    FN = "w:\ACAM\Log\" & PC & "\ping_CNC0.txt"
    'Open "w:\ACAM\Log\SZVW9159\CNC_files.txt" For Input As #1
    Open FN For Input As #1
    Str = StrConv(InputB(LOF(1), 1), vbUnicode)
    Close #1
    SS = CStr(Str)
    CC = Mid(SS, 12, 1)
    Application.Workbooks("KBSZ FDM BDE Status.xlsm").Worksheets("CNC").Cells(i, 7) = CC
