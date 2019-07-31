// Time4Chart
// Update Time selection for chart display
var dateValue = Date.now();
me.DATE_NOW = dateValue;
me.DATE_15MIN = dateAddMinutes(dateValue, -15);			// 15 minutes ago
me.DATE_1H = dateAddMinutes(dateValue, -60);			// 1 hour ago

var formattedDate = dateFormat(dateValue, "YYYY-MM-DD");
me.LAST_DAY2 = parseDate(formattedDate, "YYYY-MM-DD");	// today
me.LAST_DAY1 =  dateAddHours(me.LAST_DAY2, -24);		// last day from 00:00:00
me.LAST_DAY2 = dateAddMilliseconds(me.LAST_DAY2, -1);	// last day to 23:59:59
