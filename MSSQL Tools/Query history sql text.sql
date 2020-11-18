SELECT TOP 100
	QS.creation_time,
	ST.TEXT,
	QS.total_worker_time,
	QS.last_worker_time,
	QS.max_worker_time,
	QS.min_worker_time
FROM sys.dm_exec_query_stats QS
CROSS APPLY sys.dm_exec_sql_text(QS.sql_handle) ST
WHERE QS.creation_time > GETDATE() - 0.1
ORDER BY QS.creation_time DESC;
