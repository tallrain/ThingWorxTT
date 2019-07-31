// InfoTable2CSV: Service to convert InfoTable to CSV, to display data into Dygraph widget
// Input: myInfoTable:InfoTable without DataShape
// Output: TEXT
// Note 1: The name of Datetime field is always 'TIME', which is 1st field for Dygraph
// Note 2: TIME values will be converted into dateFormatISO to match Dygraph requirement

var iLF;
var tmp = 'TIME';
var i = 0;
var fd = [];	// array to store Fields
fd[0] = 'TIME';

// Get CSV Header
if ((myInfoTable.dataShape===null)||(myInfoTable.dataShape===undefined)) {
   iLF = myInfoTable.ToJSON().dataShape.fieldDefinitions;
 } else {
   iLF = myInfoTable.dataShape.fields;
 }
for (var key in iLF) {
	if(key != 'TIME') {
        i = i + 1;        
        fd[i] = key;	// Store field sequence
        tmp = tmp + ',' + key;
	}
    //Logger.info("Field Name "+key+" baseType: "+iLF[key].baseType);
}
tmp = tmp + ' \n';

// Get CSV Data
var tableLength = myInfoTable.rows.length;
for (var x=0; x < tableLength; x++) {
    var row = myInfoTable.rows[x];
    tmp = tmp + dateFormatISO(row.TIME);  // Get TIME Value 

    var fd2 = [];	// To output data in sequence
    for (var property in row) {
    	tmp2 = property;		//row property
        tmp3 = row[property];	//row value
        var j = fd.indexOf(tmp2);
        fd2[j] = tmp3;
    }
    
    for (var k=1; k<fd2.length; k++) {
        tmp = tmp + ',' + fd2[k];
    }    
    tmp = tmp + ' \n';
}

var result = tmp;
