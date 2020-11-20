Declare @getTables CURSOR;
Declare @TableName varchar(255);
Declare @command nvarchar(4000);
DECLARE @DT NVARCHAR(50); 	-- Datetime

SELECT @DT = CONVERT(NVARCHAR, GETDATE(), 121);	--YYYY-MM-DD HH:MI:SS
PRINT(@DT);
PRINT('Rebuilding Index started.');
PRINT("");
SET @getTables = CURSOR for SELECT name FROM sys.objects WHERE type = (N'U');

OPEN @getTables;
	FETCH NEXT FROM @getTables into @TableName
	WHILE @@FETCH_STATUS = 0
	BEGIN;
		--set @command = N'ALTER INDEX ALL ON ' + @TableName + N' REORGANIZE;';
		SELECT @DT = CONVERT(NVARCHAR, GETDATE(), 121);	--YYYY-MM-DD HH:MI:SS
		PRINT(@DT);				
		set @command = N'ALTER INDEX ALL ON ' + @TableName + N' REBUILD WITH (ONLINE=ON);';
		PRINT(@command);
		PRINT("");
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
PRINT(@DT);
PRINT('Rebuilding Index started.');
PRINT('Rebuilding Index completed.');
