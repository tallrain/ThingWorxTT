SELECT TOP 2
	WORK_ORDER + ', '
FROM VIEW_TEMP_TT_WO_WIP
FOR XML PATH('') ;
