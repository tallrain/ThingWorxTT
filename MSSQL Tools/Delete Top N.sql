WITH T
     AS (SELECT TOP 3 *
         FROM   Table1
         ORDER  BY id DESC)
DELETE FROM T;

Delete from Table1 
where id IN (
    select top 3 id 
    from Table1 
    order by id desc
);
