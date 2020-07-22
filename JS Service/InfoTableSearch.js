// Method 1
var params75 = {
  fieldName: "name" /* STRING */,
  isCaseSensitive: false /* BOOLEAN */,
  t: outputTable /* INFOTABLE */,
  value: divisionName /* STRING */
};
var divisionNameFound = Resources["InfoTableFunctions"].EQFilter(params75).rows.length;		
if (divisionNameFound === 0) {
  outputTable.AddRow({
    from:"",
    to:divisionName,
    name:divisionName,
    type:"Division",
    displayName:divisionName,
    sort:divisionName,
    tabValue:"",
    standAlone:0
  });     
}	

// Method 2
var Search = new Object();
Search.ID = 2;
Search.Name = "Walter White";
//var row = me.Records.Filter(Search);
var row = me.Records.Find(Search);
