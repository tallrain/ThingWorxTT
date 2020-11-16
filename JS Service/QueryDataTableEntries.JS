// dateValue:DATETIME
var dateValue = new Date();
// dateAddMinutes(dateValue:DATETIME, amount:NUMBER):STRING
var calculatedDateValue = dateAddMinutes(dateValue, -30);

// Provide your filter using the format as described in the help topic "Query Parameter for Query Services"
var query = {
 "filters": {
   "type": "GT",
   "fieldName": "A_LogTime",
   "value": calculatedDateValue
 }
};

// result: INFOTABLE dataShape: ""
var result = Things["TT_ANALYTICS_DEMO_DataTable"].QueryDataTableEntries({
	maxItems: 50 /* NUMBER */,
	values: undefined /* INFOTABLE */,
	query: query /* QUERY */,
	source: undefined /* STRING */,
	tags: undefined /* TAGS */
});

//search by either values or query, 1 way or another
