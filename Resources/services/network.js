//load dependencies

var branch = require('models/branch');
var Book = require('models/Book');

exports.logout = function()
{
	alert
	url = 'http://192.168.1.110:4000/users/sign_out'
	var xhr = Ti.Network.createHTTPClient({
	onload: function() {
	},
	onerror: function() {
    alert("ERROR:  ");
    //alert('There was an error retrieving the remote data. Try again.');
    },
    timeout:10000		
	});
	var params = { auth_token : Ti.App.Properties.getString('auth_token') }
	xhr.open('DELETE',url);
	xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accepts","application/json");
	xhr.send(JSON.stringify(params));
}

exports.searchList = function (searchText,callback){
	url = 'http://192.168.1.110:4000/searchapi/search.json?search_text='+searchText+'';					
	var xhr = Ti.Network.createHTTPClient({
    onload: function() {
    	var data = JSON.parse(this.responseText);
		 
		 Ti.App.maxResults = data.titles.length-1;
		   var books = [];
		   
		   /*var data1=data.titles[0];
		   alert(data1.id+data1.authors.name+data1.title);*/
		for (var i = 0; i < data.titles.length; i++) {
			
			var bookData = data.titles[i];
			var book = new Book(
							bookData.id,
							bookData.title,
							bookData.isbn,
							bookData.description,
							bookData.imageURL,
							bookData.author_name,
							bookData.language,
							bookData.category
						);
			
			books.push(book);
		}
		
		callback.call(this,books);
		
		
	},
	onerror: function() {
    alert("ERROR:  ");
    //alert('There was an error retrieving the remote data. Try again.');
    },
    timeout:10000
	
				
	});
	xhr.open('GET',url);
	xhr.send();
}

exports.rentBooks = function (title_id,callback){
	url = 'http://192.168.1.110:4000/mobile_order/new_delivery_order.json?auth_token=XLtKMZByYzy2xysb9My5&title_id='+title_id + '&email_id='
					+Ti.App.Properties.getString('email')+'';
	var xhr = Ti.Network.createHTTPClient({
		onload: function() {
    	//alert('hi');
    	var data = JSON.parse(this.responseText);    	
		callback.call(this,data.status);
	},
	onerror: function() {
    alert("ERROR:  ");
    //alert('There was an error retrieving the remote data. Try again.');
    },
    timeout:10000			
	});
	xhr.open('GET',url);
	xhr.send();
}



//implement service interface
exports.getList = function(callback) {
	//alert('hi');
	var xhr = Ti.Network.createHTTPClient({
    onload: function() {
    	//alert('hi');
    	var data = JSON.parse(this.responseText);
		 
		 Ti.App.maxResults = data.titles.length-1;
		   var books = [];
		   
		   /*var data1=data.titles[0];
		   alert(data1.id+data1.authors.name+data1.title);*/
		for (var i = 0; i < data.titles.length; i++) {
			
			var bookData = data.titles[i];
			var book = new Book(
							bookData.id,
							bookData.title,
							bookData.isbn,
							bookData.description,
							bookData.imageURL,
							bookData.author_name,
							bookData.language,
							bookData.category
						);
			
			books.push(book);
		}
				
		//call callback function with an array of Books
		callback.call(this,books);
		
		
	},
	onerror: function() {
    alert("ERROR:  ");
    //alert('There was an error retrieving the remote data. Try again.');
    },
    timeout:10000
	
				
	});
	xhr.open('GET',"http://192.168.1.110:4000/searchapi/top_rentals.json");
	xhr.send();
};

//implement service interface	
exports.getaddress = function(lat,lon, callback){
	//alert(Ti.App.lat+""+Ti.App.lon);	
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		var myJsonFile=JSON.parse(this.responseText);
        var address;
        
       address= myJsonFile.results[0].formatted_address;
       
	   callback.call(this,address);
	};
	xhr.open('GET',"http://maps.google.com/maps/api/geocode/json?latlng="+lat+","+lon+"&sensor=true");
	xhr.send();
	
}

exports.getdistance= function(lat,lon,lat1,lon1, callback)
{
	//alert(lat+""+lon+""+lat1+""+lon1);
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		var myJsonFile=JSON.parse(this.responseText);
        var distance;
       // var index=myJsonFile.branches.length;
       distance=myJsonFile.rows[0].elements[0].distance.text;
		//alert(distance);
		
		//call callback function with an array of Books
		callback.call(this,distance);
	}
	xhr.open('GET',"http://maps.googleapis.com/maps/api/distancematrix/json?origins="+ lat+","+lon+"&destinations="+lat1+","+lon1+"&mode=driving&language=en&sensor=true");
	xhr.send();
}

exports.get = function(callback) {
	var xhr = Ti.Network.createHTTPClient({
	onload : function(e) {
		var myJsonFile=JSON.parse(this.responseText);
        var allbranches=[];
        var index=myJsonFile.branches.length;
        for(var i=0;i<index;i++)
        {
            /*branches1.lat=myJsonFile.branches[i].latitude;
			branches1.lon=myJsonFile.branches[i].longitude;
			branches1.stitle=myJsonFile.branches[i].address;*/
	         var branch1= new branch(myJsonFile.branches[i].latitude,myJsonFile.branches[i].longitude,myJsonFile.branches[i].name);		
		
			allbranches.push(branch1);
			//alert(allbranches[i].lat)
			}
		
		
		//call callback function with an array of Books
		callback.call(this,allbranches);
	},
	onerror: function(e) {
		 //Ti.App.fireEvent("loaded", {message:"branchesfound"});
   Ti.App.fireEvent('loaded', {message:"branchesnotloaded"});
    //alert('There was an error retrieving the remote data. Try again.');
    },
    timeout:6000
  });
	xhr.open('GET','192.168.1.112:8280/branchgeo/branches.json');
	xhr.send();
};





