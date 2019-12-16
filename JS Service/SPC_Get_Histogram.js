// To generate Histogram dataset for SPC
// Developed by Tallrain, Dec 2019
// Input
//    avg = Average
//    sd  = Standard Deviation
//    spcTable = SPC data, with field of SPC1 for data value
// Output
//    infoTable, with fields of value and count

var bar1 = avg-3*sd;
var bar2 = avg-2*sd;
var bar3 = avg-1*sd;
var bar4 = avg;
var bar5 = avg+1*sd;
var bar6 = avg+2*sd;
var bar7 = avg+3*sd;

var v1 = 0;
var v2 = 0;
var v3 = 0;
var v4 = 0;
var v5 = 0;
var v6 = 0;
//var v7 = 0;

var tableLength = spcTable.rows.length;
for (var x=0; x < tableLength; x++) {
    var row = spcTable.rows[x];
    var v = row.SPC1;
   if(v>=bar1 && v<bar2) {v1=v1+1}
   if(v>=bar2 && v<bar3) {v2=v2+1}
   if(v>=bar3 && v<bar4) {v3=v3+1}
   if(v>=bar4 && v<bar5) {v4=v4+1}
   if(v>=bar5 && v<bar6) {v5=v5+1}
   if(v>=bar6 && v<bar7) {v6=v6+1}   
    //Your code here
}

bar1 = bar1 + sd*0.5;
bar2 = bar2 + sd*0.5;
bar3 = bar3 + sd*0.5;
bar4 = bar4 + sd*0.5;
bar5 = bar5 + sd*0.5;
bar6 = bar6 + sd*0.5;
bar7 = bar7 + sd*0.5;

// Output data
var params = {
    infoTableName : "InfoTable",
    dataShapeName : "DS_SPC_Histogram"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(DS_SPC_CPK_OUT)
var spcOut = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
spcOut.AddRow({value:bar1, count:v1});
spcOut.AddRow({value:bar2, count:v2});
spcOut.AddRow({value:bar3, count:v3});
spcOut.AddRow({value:bar4, count:v4});
spcOut.AddRow({value:bar5, count:v5});
spcOut.AddRow({value:bar6, count:v6});
//spcOut.AddRow({value:bar7, count:0});

var result = spcOut;
