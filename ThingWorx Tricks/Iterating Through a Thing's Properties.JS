//You can easily iterate through a Thing's properties and examine the properties using the following technique:
// GetPropertyValues(): returns an INFOTABLE

var values = me.GetPropertyValues();
var field;

// Now we can iterate through the INFOTABLE FIELDS through the DataShape

for each(field in values.dataShape.fields) {

var propValue = values[field.name];

if(field.baseType == "NUMBER") logger.warn(field.name + " " + field.baseType + " " + propValue);

}
