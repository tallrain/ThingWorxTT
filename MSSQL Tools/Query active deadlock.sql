SELECT * 
FROM sys.dm_exec_requests
WHERE DB_NAME(database_id) = 'KBS_FDM' 
AND blocking_session_id <> 0;
