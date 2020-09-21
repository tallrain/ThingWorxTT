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

// Another GetJson
// JSON header
var params1 = {
	proxyScheme: undefined /* STRING */,
	headers: undefined /* JSON */,
	ignoreSSLErrors: undefined /* BOOLEAN */,
	useNTLM: undefined /* BOOLEAN */,
	workstation: undefined /* STRING */,
	useProxy: undefined /* BOOLEAN */,
	withCookies: undefined /* BOOLEAN */,
	proxyHost: undefined /* STRING */,
    	url: "http://thingworx.corp.knorr-bremse.com/Thingworx/Things/TT_ANALYTICS_DEMO_INPUT_THING/Properties?appKey=xxx",
    	timeout: undefined /* NUMBER */,
	proxyPort: undefined /* INTEGER */,
	password: undefined /* STRING */,
	domain: undefined /* STRING */,
	username: undefined /* STRING */
};

var json1 = {};
try {
	json1 = Resources["ContentLoaderFunctions"].GetJSON(params1);
} catch(err) {
	// handle errors
}

var tb1 = Resources["InfoTableFunctions"].FromJSON({json:json1});
//var result = tb1;

me.cosFI1 = tb1.rows[0].cosFI1;
