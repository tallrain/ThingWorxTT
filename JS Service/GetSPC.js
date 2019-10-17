// This Serive is to calculate SPC values of: Standard Deviation, Average, Cpu, Cpl, Cpk
// Input - spcTable, with fields of:
    SPC1 - real SPC data
    USL - Upper Standard Limit
    LSL - Lower Standard Limit
// Output - InfoTable, with Data Shape of DS_SPC_CPK_OUT, with fields of:
    USL - Upper Standard Limit
    LSL - Lower Standard Limit
    Sum - Summary
    Avg - Average
    SD - Standard Deviation
    CPU - Process Capability Upper
    CPL - Process Capability Lower
    CPK - Process Capability Index

// Get USL&LSL
var USL = spcTable.rows[0].USL;
var LSL = spcTable.rows[0].LSL;
//logger.info("USL="+USL);
//logger.info("LSL="+LSL);

// Get Sum
var sum = 0.0;
var spc1 = []; // array of spc1
var tableLength = spcTable.rows.length;
//logger.info("tableLength="+tableLength);
for (var x=0; x < tableLength; x++) {
    var row = spcTable.rows[x];
    spc1[x] = row.SPC1;
    //logger.info("spc1="+row.SPC1);
    sum = sum + row.SPC1;
}
//logger.info("x="+x);
//logger.info("sum="+sum);
//var result = sum;

// Get Average
var u = sum / tableLength;
//logger.info("u="+u);

// Get SD
var sd = 0;
for (x=0; x < tableLength; x++) {
    sd = sd + (spc1[x]-u) * (spc1[x]-u);
}
sd = sd/tableLength;
sd = Math.sqrt(sd);
//logger.info("sd="+sd);

// Get CPU
var cpu = (USL-u)/(3*sd);
//logger.info("cpu="+cpu);

// Get CPL
var cpl = (u-LSL)/(3*sd);
//logger.info("cpl="+cpl);

// Get CPK
var cpk = 0;
if(cpu < cpl) {
	cpk = cpu;
} else {
	cpk = cpl;
}
//logger.info("cpk="+cpk);

// Output data
var params = {
    infoTableName : "InfoTable",
    dataShapeName : "DS_SPC_CPK_OUT"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(DS_SPC_CPK_OUT)
var spcOut = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
spcOut.AddRow({Sum: sum, Avg: u, SD: sd, USL: USL, LSL:LSL, CPU: cpu, CPL: cpl, CPK: cpk});

var result = spcOut;

