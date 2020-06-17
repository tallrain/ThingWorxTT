// Use UpdatePropertyValues to make sure to update all attribute in the same moment

var params = {
    infoTableName : "InfoTable",
    dataShapeName : "NamedVTQ"
};

// CreateInfoTableFromDataShape(infoTableName:STRING("InfoTable"), dataShapeName:STRING):INFOTABLE(VSTestDataShape)
var tempDable = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

var time = new Date();
tempDable.AddRow({
	time: time,
    name: "F1",
    quality: "GOOD",
    value: 71
});

tempDable.AddRow({
	time: time,
    name: "F2",
    quality: "GOOD",
    value: 72
});

tempDable.AddRow({
	time: time,
    name: "F3",
    quality: "GOOD",
    value: 73
});

tempDable.AddRow({
	time: time,
    name: "F4",
    quality: "GOOD",
    value: 74
});

tempDable.AddRow({
	time: time,
    name: "F5",
    quality: "GOOD",
    value: 75
});

me.UpdatePropertyValues({
	values: tempDable /* INFOTABLE */
});

var result = tempDable;
