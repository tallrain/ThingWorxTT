// #0. Create Temp InfoTable
var params = {
    infoTableName : "InfoTable",
    dataShapeName : "nasaTTFDataSahpe"
};
// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(nasaTTFDataSahpe)
var tempTable = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

// #1. Load CSV
var params1 = {
	path: "nasaTTF.csv", //undefined /* STRING */,
	columnMappings: undefined /* STRING */,
	hasHeader: true /* BOOLEAN */,
	longitudeField: undefined /* NUMBER */,
	dateFormat: undefined /* STRING */,
	fileRepository: "SystemRepository" /* THINGNAME */,
	latitudeField: undefined /* NUMBER */,
	fieldDelimiter: undefined /* STRING */,
	stringDelimiter: undefined /* STRING */,
	dataShape: "nasaTTFDataSahpe" /* DATASHAPENAME */
};
// result: INFOTABLE
tempTable = Resources["CSVParserFunctions"].ReadCSVFile(params1);

// #2. Write DataTable
//var tableLength = yourInfotableHere.rows.length;
for (var x=15953; x < 20630; x++) {
    logger.debug("loadCSV, x=" + x);
	var row = tempTable.rows[x];

	var tags = new Array();
	// values:INFOTABLE(Datashape: nasaTTFDataSahpe)
	var values = Things["nasaTTFdataTable"].CreateValues();
	values.s3 = row.s3; // NUMBER
	values.s4 = row.s4; // NUMBER
	values.s6 = row.s6; // NUMBER
	values.s7 = row.s7; // NUMBER
	values.s8 = row.s8; // NUMBER
	values.s9 = row.s9; // NUMBER
	values.TTF = row.TTF; // NUMBER
	values.cycle = row.cycle; // INTEGER
	values.op2 = row.op2; // NUMBER
	values.s20 = row.s20; // NUMBER
	values.op1 = row.op1; // NUMBER
	values.s11 = row.s11; // NUMBER
	values.s21 = row.s21; // NUMBER
	values.s13 = row.s13; // NUMBER
	values.s12 = row.s12; // NUMBER
	values.s15 = row.s15; // NUMBER
	values.s14 = row.s14; // NUMBER
	values.s17 = row.s17; // NUMBER
	values.ID = row.ID; // INTEGER [Primary Key]
	values.AssetID = row.AssetID; // INTEGER
	values.record_purpose = row.record_purpose; // STRING
	values.s2 = row.s2; // NUMBER

	// location:LOCATION
	var location = new Object();
	location.latitude = 0;
	location.longitude = 0;
	location.elevation = 0;
	location.units ="WGS84";

	var params2 = {
		tags : tags,
		source : me.name,
		values : values,
		location : location
	};

	// AddOrUpdateDataTableEntry(tags:TAGS, source:STRING("me.name"), values:INFOTABLE(nasaTTFdataTable), location:LOCATION):STRING
	var id = Things["nasaTTFdataTable"].AddOrUpdateDataTableEntry(params2);		
}

//var result = tempTable;
