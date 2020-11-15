// eslint-disable-next-line no-extend-native
String.prototype.toProperCase = function() {
	return this.replace(/\s+/g, ' ').replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};
// eslint-disable-next-line no-extend-native
String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};