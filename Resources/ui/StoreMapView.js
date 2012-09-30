var locate= new function(){
        this.lon=77.5817;
        this.lat=12.9011;
        this.addr='Your Location';
        this.index=0;
        this.locmarker=[];
        this.find_distance="false";
    };

function StoreMapView() {
		
	//create object instance { latitude: 12.971599, longitude: 77.594563 }
	var self = Ti.UI.createWindow({
		title:"JustBooksCLC - Rent * Read * Return",
		backgroundColor:'white',
		exitOnClose:true,
		navBarHidden:true
	});
	
	var mapview1=Titanium.Map.createView({
		 mapType: Titanium.Map.STANDARD_TYPE,
    	 region: {latitude:locate.lat, longitude:locate.lon,latitudeDelta:0.05, longitudeDelta:0.05},
    	 animate:true,
   		 regionFit:true,
		 //userLocation:true,
		 top:0,
		 height:"92%",
		 width:"100%",
    });
    
	self.addEventListener('open', function(evt){
		allbranches();
	});
	
	self.add(mapView1);
	
	Ti.App.addEventListener('webPageReady',function(e) {
		if(e.message=='branch')
        {
        	
        	//mapview1.removeAnnotation(default_marker);
        	//alert(locate.locmarker.length);
           for(var j=0;j<locate.locmarker.length;j++){
           	
           	mapview1.addAnnotation(locate.locmarker[j]);  
           }
                   	//actInd.hide();

        	mapview1.selectAnnotation(locate.locmarker[0]);
        	
        	mapView.location = {latitudeDelta:0.05, longitudeDelta:0.05};
        }
 });
	return self;
}

module.exports = StoreMapView;


function allbranches(){
    	
   	var url="http://jbserver1.interactivedns.com:8080/branchgeo/branches.json";
    
     var httpClient = Titanium.Network.createHTTPClient();
     httpClient.onload =function (e)
     {       
        var myJsonFile=JSON.parse(this.responseText);
        //alert(myJsonFile.branches.length);
        locate.index=myJsonFile.branches.length;
        for(var i=0;i<locate.index;i++)
        {
          var marker1 = Titanium.Map.createAnnotation({
			latitude:myJsonFile.branches[i].latitude,
		    longitude:myJsonFile.branches[i].longitude,
			title:"JUST BOOKS CLC",
			subtitle:myJsonFile.branches[i].address,
		    animate:true,
			pinImage:'bloc.gif',
		   // pincolor:Titanium.Map.ANNOTATION_RED,
			leftButton:'images.PNG',
			width:'80%',
			myid:i,
        	});  
        	locate.locmarker.push(marker1);
        //alert(myJsonFile.branches[0]);  
        
        }
        //	alert('hi');
        		setTimeout(function(e1){
			     //alert('hi pollo');
			     Ti.App.fireEvent("loaded", {message:"branch"});
	            },20); 
        
     };
    httpClient.open("GET", url);
    httpClient.send();
  }