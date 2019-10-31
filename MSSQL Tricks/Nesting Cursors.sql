-- Normally, we use system variable @@FETCH_STATUS to check Cursor loop
DECLARE myCursor CURSOR FOR	
SELECT fields FROM Table;
OPEN myCursor;
FETCH NEXT FROM myCursor INTO @myVar;
WHILE @@FETCH_STATUS = 0
BEGIN
  --DO somthing;
END
CLOSE myCursor;
DEALLOCATE myCursor;
  
- But @@FETCH_STATUS is global variable
-- So if we use another Cursor within the loop, when inner loop is completed, @@FETCH_STATUS = -1, so the outer loop will also be closed.
-- Fixing method is to use local variable instead of @@FETCH_STATUS
OPEN myCursor;
FETCH NEXT FROM myCursor INTO @myVar;
SET @Outer_loop = @@FETCH_STATUS;
WHILE @Outer_loop = 0
BEGIN
  --inner loop here
  OPEN myCursor2;
  FETCH NEXT FROM myCursor2 INTO @myVar2;
  SET @Inner_loop = @@FETCH_STATUS;
  WHILE @Inner_loop = 0
  BEGIN
    --Inner loop function
  END
END
