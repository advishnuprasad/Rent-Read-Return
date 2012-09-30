function ApplicationWindow() {

	//load dependencies
	var BookListWindow = require('ui/BookListWindow'),
		StoreMapWindow = require('ui/StoreMapWindow');
	
	var self = Ti.UI.createTabGroup({id:'justbooksapp'});
	
	var bookTab = Titanium.UI.createTab({
		id:'booktab',
		icon:'images/book.png',
		title:'Books',
		window:booksWindow
	});
	
	var mapWindow = new StoreMapWindow();
	var mapTab =  Titanium.UI.createTab({
		id:'maptab',
		icon:'images/marker.png',
		title:'Locate Us',
		window:mapWindow
	});

	// set background color back to white after tab group transition
	self.addEventListener('open',function(){
		Titanium.UI.setBackgroundColor('#fff');
	});
	self.addEventListener('close',function(evt){
		Ti.Geolocation.removeEventListener('location',Ti.App.pollo);
	});

	self.addTab(bookTab);
	self.addTab(mapTab);
	//self.setActiveTab(1);

	//return instance from constructor
	return self;
}

module.exports = ApplicationWindow;