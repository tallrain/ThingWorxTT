//1. REST Output as Integar
var result = me.HB_Counter;

//REST Call
var json1 = Resources["ContentLoaderFunctions"].GetJSON(params1);
var params2 = {
	json: json1 /* JSON */
};
var result = Resources["InfoTableFunctions"].FromJSON(params2).rows[0].result;

//2. REST Output as JSON
var result = { 
   "HB_Counter":me.HB_Counter,
   "HB_Counter2":me.HB_Counter2
};

// REST Call
var json1 = Resources["ContentLoaderFunctions"].GetJSON(params1);
var result = json1;
