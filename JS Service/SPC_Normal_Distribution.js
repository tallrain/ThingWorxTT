// Generate SPC Normal Distribution
// Developed by Tallrain, Nov 2019
// Input
//    u = Average
//    sd = Standard Deviation
// Output
//    infoTable, with field of x and np

// Create temp InfoTable for output
var params = {
    infoTableName : "InfoTable",
    dataShapeName : "DS_Normal_Distrib"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(DS_Normal_Distrib)
var tempInfoTable = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

// calculate normal distribution data
var e = Math.E; //2.71828182846;
var pi = Math.PI; // 3.14159265359;
for (var i=1; i <= 13; i++) {
    var x = (i-7)/2;
    x = u + x*sd;    
    var dividend = Math.pow(e, 0-((x-u)*(x-u)/(2*sd*sd)));
    var divisor = sd*Math.sqrt(2*pi);
    var np = dividend/divisor;
    //const dividend = Math.E ** -((value - this.mean) ** 2 / (2 * this.standardDeviation ** 2));
    //const divisor = this.standardDeviation * Math.sqrt(2 * Math.PI);
    //var np = 0-(x-u)*(x-u)/(2*sd*sd);
    //logger.info('np='+np);
    //np = Math.pow(e,np);
    //var np2 = sd*Math.sqrt(2*pi);
    //np = np/np2;
    //logger.info('np='+np);
    tempInfoTable.AddRow({x:x, np:np});    
}

var result = tempInfoTable;
//var result = Math.pow(3,2);
