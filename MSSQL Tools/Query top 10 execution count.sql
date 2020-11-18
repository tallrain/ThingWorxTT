SELECT TOP 10 
	execution_count
	,SUBSTRING(st.TEXT, (qs.statement_start_offset / 2) + 1, (
			(
				CASE qs.statement_end_offset
					WHEN - 1
						THEN DATALENGTH(st.TEXT)
					ELSE qs.statement_end_offset
					END - qs.statement_start_offset
				) / 2
			) + 1) AS statement_text
FROM sys.dm_exec_query_stats AS qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS st
ORDER BY execution_count DESC;
