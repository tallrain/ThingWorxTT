var json = JSON.parse(StringJSON);
//var tmp = json.Entities; //read a node value
//var result = JSON.stringify(tmp); //convert json to string

var params = {
	json: json /* JSON */
};

// result: INFOTABLE
var result = Resources["InfoTableFunctions"].FromJSON(params);

var params = {
	path: "InfoTableOut.csv" /* STRING */,
	data: table /* INFOTABLE */,
	fileRepository: "SystemRepository" /* THINGNAME */,
	withHeader: true /* BOOLEAN */
};

// no return
Resources["CSVParserFunctions"].WriteCSVFile(params);

