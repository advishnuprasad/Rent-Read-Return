//load dependencies
var Book = require('models/Book');

//bootstrap datastore
var saved = Ti.App.Properties.getString('db');
var datastore = (saved) ? JSON.parse(saved):[];

//implement service interface
exports.getList = function() {
	return datastore.slice(0); 
}
//save a Book object to our data store
exports.saveBook = function(book) {
	var dataStoreLength = datastore.length;
	var foundBook = false;
	//alert('savebook called');
	for (var i = 0; i<dataStoreLength; i++) {
	    	datastore[i] = book;
	    	datastore.push(book);
		//	foundBook=true;
		}
	
	Ti.App.Properties.setString('db',JSON.stringify(datastore));
};
