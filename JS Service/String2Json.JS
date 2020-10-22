var json = JSON.parse(StringJSON);

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

