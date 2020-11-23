Declare @getTables CURSOR; -- Cursor to list out all indexes have frag % > 30
Declare @TableName varchar(255);
Declare @IndexName varchar(255);
Declare @command nvarchar(4000); -- Detail ALTER INDEX command
DECLARE @DT NVARCHAR(50); 	-- Datetime to print out
DECLARE @i INT;	-- Counter

-- set remote time out
EXEC sp_configure 'remote query timeout', 600 ;
RECONFIGURE ;

SELECT @DT = CONVERT(NVARCHAR, GETDATE(), 121);	--YYYY-MM-DD HH:MI:SS
PRINT(@DT);
PRINT('Rebuilding Index started.');
PRINT('');
--SET @getTables = CURSOR for SELECT name FROM sys.objects WHERE type = (N'U');

--EXEC sp_who2 -- to check existing deadlock(BlkBy)

SET @i = 0;
SET @getTables = CURSOR for
SELECT --dbschemas.[name] AS 'Schema',
	dbtables.[name] AS 'TableName',
	dbindexes.[name] AS 'IndexName'
	--indexstats.avg_fragmentation_in_percent,
	--indexstats.page_count
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, NULL) AS indexstats
INNER JOIN sys.tables dbtables ON dbtables.[object_id] = indexstats.[object_id]
INNER JOIN sys.schemas dbschemas ON dbtables.[schema_id] = dbschemas.[schema_id]
INNER JOIN sys.indexes AS dbindexes ON dbindexes.[object_id] = indexstats.[object_id]
	AND indexstats.index_id = dbindexes.index_id
WHERE indexstats.database_id = DB_ID()
	AND indexstats.avg_fragmentation_in_percent > 30
	AND dbschemas.[name] = 'dbo'
	--AND dbtables.[name] = 'RPV_MAGPLANBEL'
	AND dbindexes.[name] IS NOT NULL
ORDER BY indexstats.page_count DESC;
--ORDER BY indexstats.avg_fragmentation_in_percent DESC;

OPEN @getTables;
	FETCH NEXT FROM @getTables into @TableName, @IndexName;
	--WHILE @@FETCH_STATUS = 0
	WHILE @i < 1 AND @@FETCH_STATUS = 0	-- Set @i to bigger number when page count is getting smaller
	BEGIN;
		SELECT @DT = CONVERT(NVARCHAR, GETDATE(), 121);	--YYYY-MM-DD HH:MI:SS
		PRINT(@DT);				
		--set @command = N'ALTER INDEX ALL ON ' + @TableName + N' REBUILD;';	-- WITH (ONLINE=ON);'; for enterprise version only
		set @command = N'ALTER INDEX ' + @IndexName + N' ON ' + @TableName + N' REBUILD;';		
		PRINT(@command);
		--PRINT('');
		--WAITFOR DELAY '00:00:01';
		BEGIN TRY  
			EXEC (@command);
			SELECT @DT = CONVERT(NVARCHAR, GETDATE(), 121);	--YYYY-MM-DD HH:MI:SS
			PRINT(@DT);
			PRINT('Rebuilding Index completed.');
			PRINT('');
		END TRY  
		BEGIN CATCH  
			SELECT @DT = CONVERT(NVARCHAR, GETDATE(), 121);	--YYYY-MM-DD HH:MI:SS
			PRINT(@DT);
			PRINT 'CATCHED!';
		END CATCH;  
		WAITFOR DELAY '00:00:05';	-- wait 5s to release suspended sessions
		FETCH NEXT FROM @getTables into @TableName, @IndexName;
		SET @i = @i + 1;
	END;
CLOSE @getTables;
DEALLOCATE @getTables; 
SELECT @DT = CONVERT(NVARCHAR, GETDATE(), 121);	--YYYY-MM-DD HH:MI:SS
PRINT(@DT);
PRINT('All indexes rebuilt.');
