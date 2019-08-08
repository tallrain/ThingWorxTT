// Time4Chart
// Update Time selection for chart display
var dateValue = Date.now();
me.DATE_NOW = dateValue;
me.DATE_15MIN = dateAddMinutes(dateValue, -15);			// 15 minutes ago
me.DATE_1H = dateAddMinutes(dateValue, -60);			// 1 hour ago

var formattedDate = dateFormat(dateValue, "YYYY-MM-DD");
me.TODAY0000 = parseDate(formattedDate, "YYYY-MM-DD");	// today
me.LAST_DAY0000 =  dateAddHours(me.TODAY0000, -24);		// last day from 00:00:00
me.LAST_DAY2359 = dateAddMilliseconds(me.TODAY0000, -1);	// last day to 23:59:59
