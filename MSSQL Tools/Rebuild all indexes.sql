Declare @getTables CURSOR;
Declare @TableName varchar(255);
Declare @command nvarchar(4000);
PRINT(GETDATE());
PRINT('Rebuilding Index started.');
SET @getTables = CURSOR for SELECT name FROM sys.objects WHERE type = (N'U');

OPEN @getTables;
	FETCH NEXT FROM @getTables into @TableName
	WHILE @@FETCH_STATUS = 0
	BEGIN;
		--set @command = N'ALTER INDEX ALL ON ' + @TableName + N' REORGANIZE;';
		set @command = N'ALTER INDEX ALL ON ' + @TableName + N' REBUILD;';
		PRINT @command;
		BEGIN TRY  
			EXEC (@command);
		END TRY  
		BEGIN CATCH  
			PRINT 'CATCHED!';
		END CATCH;  

		FETCH NEXT FROM @getTables into @TableName;
	END;
CLOSE @getTables;
DEALLOCATE @getTables; 
PRINT(GETDATE());
PRINT('Rebuilding Index completed.');
