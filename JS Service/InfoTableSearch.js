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
