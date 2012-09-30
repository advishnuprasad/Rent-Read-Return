var locate= new function(){
        this.lon=77.5817;
        this.lat=12.9011;
        this.addr='You are here';
        this.addr1;
        this.index=0;
        this.locmarker=[];
        this.locmarker1=[];
        this.find_distance="false";
        this.gpsenabled="true";
        this.locfound="true";
        this.mymarker;
        this.near_branch=0;
        this.default_marker;
        this.chk=[];
        this.prev_error="false";
       };
    

var branches=new function()
{
	this.lat=[];
	this.lon=[];
	this.title="Just Books Clc";
	this.stitle=[];
	this.distance=[];
	
}

Ti.App.location_listener;
Ti.App.lat;
Ti.App.lon;
Ti.App.chk="true";


function StoreMapWindow() {
	var chk1="true";
	var actInd = Titanium.UI.createActivityIndicator({ height:40, width:10, message:"  loading...."}); 
	var network = require('services/network');	
	var glocation = require('services/geolocation');
	//var tab = require('AppTabGroup)
	//create object instance { latitude: 12.971599, longitude: 77.594563 }
	var self = Ti.UI.createWindow({
		bottom:40,
		title:"JustBooksCLC - Rent * Read * Return",
		backgroundColor:'white',
		exitOnClose:true,
		//navBarHidden:true,
		
	});
	
	
	var sview = Titanium.UI.createScrollView({ 
	contentWidth:'auto', contentHeight:'auto', top:0, 
	showVerticalScrollIndicator:true, 
	showHorizontalScrollIndicator:true }); 
	
	

	var img1 = Ti.UI.createImageView({
	    
		image:'../images/bottom2.png',
		top:"90%",
		width:"auto",
		height:"10%",
	 //  bottom:40
	})
	
		
	
	
	var mapview1=Titanium.Map.createView({
		 mapType: Titanium.Map.STANDARD_TYPE,
    	 region: {latitude:locate.lat, longitude:locate.lon,latitudeDelta:0.05, longitudeDelta:0.05},
    	 animate:true,
   		 regionFit:true,
		 //userLocation:true,
		 top:0,
		 height:"90%",
		 width:"100%",
    });
    
   locate.default_marker = Titanium.Map.createAnnotation({
		latitude:12.9011,
    	longitude:	77.5817,
	
   		title:"Just Books Clc Headquarters",
    	subtitle:'JP Nagar, 6th Phase, Bengaluru, Karnataka, India',
    	//pincolor:Titanium.Map.ANNOTATION_RED,
    	image:'../images/bloc.png',
    	animate:true,
    	leftButton: '../images/images.png',
    	myid:1
    	});
    locate.chk[1]="true";
    



  Ti.App.location_listener = function(e) {
	//alert('location_listener');
	
    	if (!e.success || e.error)
		{
			//alert('ERROR: ' + JSON.stringify(e.error));   

		return;
		}
		if(Math.abs(locate.lat - e.coords.latitude) > 0.001 || Math.abs(locate.lon - e.coords.longitude) > 0.001)
		{   
			//alert("hi");
			//alert((locate.lon - e.coords.longitude));
		locate.lat= e.coords.latitude;   
		locate.lon = e.coords.longitude;
		Ti.App.lat=e.coords.latitude;
		Ti.App.lon=e.coords.longitude;
		
        mapview1.removeAnnotation(locate.mymarker);
 		 locate.mymarker  = Titanium.Map.createAnnotation({

			latitude:locate.lat,
	    	longitude:locate.lon,
			title:"you are here",
			animate:true,
			image:'../images/myloc.png',
			//leftButton:'default1.png',
			rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
			myid:3,
		  // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
		});
		locate.chk[3]="true";
	//mapview1.removeAllAnnotations();
	mapview1.removeAllAnnotations();
	var toast = Ti.UI.createNotification({
				duration:3000,
				message:"Location Found."
			});
		//	
			toast.show();
	
	mapview1.addAnnotation(locate.mymarker );
  
    mapview1.selectAnnotation(locate.mymarker);
    //allbarnches();
	
	actInd.show();
	branches.lat=[];
	branches.lon=[];
	
	branches.stitle=[];
	branches.distance=[];
				locate.find_distance="true";	
				locate.locfound="true";
				setTimeout(function(e1){
			     //alert('hi location_listener');
			     	Ti.App.fireEvent("loaded", {message:"branch"});	
	            },4000);
	            
	}        
}

var onopen = function(evt){
	if(Ti.App.chk=="true")
	{
        Ti.App.chk="false"
	//alert('hi');	
	      actInd.show();	
		
		//alert("hello");
		Ti.Geolocation.purpose = "testing";
		Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_HUNDRED_METERS;
		//Titanium.Geolocation.distanceFilter = 0;
		Titanium.Geolocation.getCurrentPosition(function(e) 
			{
				//alert('hi');
				//Ti.App.fireEvent("loaded", {message:"branch"});
				if (!e.success || e.error)
				{
					//alert(e.error);
					//actInd.hide();
					//alert('ERROR: ' + JSON.stringify(e.error));   
					//var json=e.error;
					var response=JSON.stringify(e.error);
					var res=JSON.parse(response);
					//alert(res.message);  
					if(res.message=="no providers are available.")
					{
	                      locate.gpsenabled="false";
	                      locate.locfound="false";
	                      
    			    }
    			    if(res.message=="location is currently unavailable.")
    			    {
    			    	locate.locfound="false";
    			    }
    			    
    			    mapview1.addAnnotation(locate.default_marker);
					mapview1.selectAnnotation(locate.default_marker);
    			    Ti.App.fireEvent("loaded", {message:"branch"});	
    			   } 
				//if we have last known location or latest location
			   else
				{
					locate.lat = e.coords.latitude;   
					locate.lon = e.coords.longitude;
					Ti.App.lat=e.coords.latitude;
					Ti.App.lon=e.coords.longitude;
					    locate.mymarker = Titanium.Map.createAnnotation({
				     	latitude:locate.lat,
	    				longitude:locate.lon,
						title:locate.addr,
						animate:true,
						image:'../images/myloc.png',
		               // zoom:1,
						//pincolor:Titanium.Map.ANNOTATION_RED
						//leftButton:'default.png',
						rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
						myid:3,
				     	 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
					});
                    mapview1.addAnnotation(locate.mymarker);
					mapview1.selectAnnotation(locate.mymarker );
					locate.find_distance="true";
					branches.lat=[];
					branches.lon=[];
	
					branches.stitle=[];
					branches.distance=[];
					locate.find_distance="true";	
					locate.locfound="true";
					setTimeout(function(e1){
                    	Ti.App.fireEvent("loaded", {message:"branch"});				
	  				},4000);
	  			}
	  		});
	  		Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_HUNDRED_METERS;
		    Titanium.Geolocation.distanceFilter = 50;
			Ti.Geolocation.addEventListener('location',Ti.App.location_listener);
			
	  	}
	  	
	  	
	  if(locate.prev_error == "true")
	  {
	  	actInd.show();
	  	Ti.App.fireEvent("loaded", {message:"branch"});	
	  }	
	}
 	
				    
	/*Ti.Geolocation.purpose = "testing";
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 20;
	Titanium.Geolocation.addEventListener('location'||'gpsenabled',	location_listener);*/ 

//window on load listener

	
	self.addEventListener('focus', onopen);


	

	/*self.addEventListener('close',function(evt){
		Ti.Geolocation.removeEventListener('location',Ti.App.location_listener);
	});*/
	var clicked="true";
		mapview1.addEventListener('click', function(e) {
			Ti.API.info('clicked map');
			Ti.API.info(e.clicksource);
	        if (e.annotation && (e.clicksource === 'leftButton' || e.clicksource == 'leftPane' || e.clicksource == 'title' || e.clicksource == 'subTitle'))
	         {    
	            mapview1.removeAnnotation(e.annotation);
	            mapview1.addAnnotation(e.annotation);
	        }         
		});
	
	/*view1.add(img1);
	view1.add(label);
	view1.add(img2);
	view1.add(label2);
	view1.add(img3);
	view1.add(label3);
	sview.add(view1);*/
	self.add(img1);	
	self.add(mapview1);
	
	
	
	
	Ti.App.addEventListener('loaded',function(e) {
		
		if(e.message== 'branchesnotloaded')
		{
			actInd.hide();
			 var toast = Ti.UI.createNotification({
				duration:4000,
				message:"Error Retrieving Data. Please Try Later"
			});
			toast.show();
			locate.prev_error = "true";
			Ti.App.fireEvent("loaded", {message:"bob"});
			
			
			//locate.default_marker.setTitle("hello");
		}
		
		if ( e.message=='bob' & locate.locfound=="false"){
			var toast = Ti.UI.createNotification({
				duration:4000,
				message:"Location is Currently Unavailable"
			});
			toast.show();
			//alert('hi');
			//locate.default_marker.setSubtitle("")
		}
		if ( e.message=='bob' & locate.gpsenabled=="false"){
    		    	var alertDlg = Titanium.UI.createAlertDialog({
        				title:'MileTrackGPS', 
        				message:'GPS is OFF.  Enable it in Settings.',
        				buttonNames: ['Cancel', 'Open Settings']
    					});
        				
    					alertDlg.cancel = 0;
    					alertDlg.addEventListener('click', function(e){
        					if(!e.cancel) {
            					//open up the settings page
            					var settingsIntent = Titanium.Android.createIntent({
                				action: 'android.settings.LOCATION_SOURCE_SETTINGS'
            					});
            
            					Ti.Android.currentActivity.startActivity(settingsIntent);
            				
						        alertDlg.cancel=1;
						        /*var activity = Titanium.Android.currentActivity;
								activity.finish();*/
								//self.close();
								setTimeout(function(e){
									var toast = Ti.UI.createNotification({
										duration:4000,
										message:"Restart Your Application"
									});
									
									toast.show();
								
								    
								},2000);
						        locate.gpsenabled="true";
					            Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_HUNDRED_METERS;
							    Titanium.Geolocation.distanceFilter = 50;
								Ti.Geolocation.addEventListener('location',Ti.App.location_listener);
	        
						       }
						       
        					else {
            					//close the window to exit
            					  	var toast = Ti.UI.createNotification({
										duration:4000,
										message:"No problem..! You may still look at all the store locations"
									});
								  toast.show();
            					 // alert('No problem..! You may still look at all the store locations');
                            
        					}
    				});
  					alertDlg.show();
   				}
   				
				 
        
		else if(e.message=='branch' )
        {
        	if(locate.locfound=="true")
        	{
        		
        		network.getaddress(locate.lat,locate.lon,function(address){
        		
        	          locate.addr1=address;
        	          locate.mymarker.setTitle(locate.addr1);      
        		});
        		
        	}
          	network.get(function(locmarker1){
        		
        	    	for(var j=0;j<locmarker1.length;j++){
           				branches.lat.push(locmarker1[j].lat);
           				branches.lon.push(locmarker1[j].lon);
           				branches.stitle.push(locmarker1[j].stitle);           	  
           		}
           
           	  Ti.App.fireEvent("loaded", {message:"branchesfound"});
	        });
	    
	            //locate.default_marker.setSubtitle("working");
           
           		//
 
        }
        
        else if(e.message=='branchesfound1'){
        	   var temp=9999.0;
        		for(var i=0;i<branches.lat.length;i++){
        			var dis1=stripNonNumeric(branches.distance[i])
        			//alert(parseFloat(dis1));
        			if(parseFloat(dis1) < temp)
        			{
        				//alert(dis1+" "+i);
        				temp=parseFloat(dis1);//parseFloat(branches.distance[i]);
        				locate.near_branch=i;
        				//label.setText(branches.distance[i]);
        				
        			}
        		}
        	   
        	   
        		for(var i=0;i<branches.lat.length;i++){
        			      if(i==locate.near_branch)
        			      {
        			      	var marker1 = Titanium.Map.createAnnotation({
							latitude:branches.lat[i],
		    				longitude:branches.lon[i],
							title:"JUST BOOKS CLC",
							subtitle:branches.stitle[i]+"\nDistance: "+branches.distance[i],
		    				animate:true,
							image:'../images/near.png',
		   					leftButton:'../images/images.png',
							width:'80%',
							myid:parseInt(i)+4,
        			      });	
        			      }
        	      else{
        			var marker1 = Titanium.Map.createAnnotation({
							latitude:branches.lat[i],
		    				longitude:branches.lon[i],
							title:"JUST BOOKS CLC",
							subtitle:branches.stitle[i]+"\nDistance: "+branches.distance[i],
		    				animate:true,
							image:'../images/bloc.png',
		   					leftButton:'../images/images.png',
							width:'80%',
							myid:parseInt(i)+4,
        			});
        			}
        			locate.chk[i+4]="true";  
       			 	locate.locmarker.push(marker1);
        		};
        	
        	
        	
            for(var j=0;j<locate.locmarker.length;j++){
                        	mapview1.addAnnotation(locate.locmarker[j]);  
               }
           actInd.hide();
           
          // alert(branches.stitle[locate.near_branch]+" Distance: "+branches.distance[locate.near_branch]);
           //label.setText('Blue - Your Location.  Green - Nearest Branch \nRed - Other Branches.  Click on Marker to get Address & Distance');
           Ti.App.fireEvent("loaded", {message:"bob"});
          //mapview1.addAnnotation(locate.locmarker[1]);
          mapview1.location = {latitudeDelta:0.02, longitudeDelta:0.02};
        	
        }
        else if(e.message=="branchesfound")
        {
        	if(locate.find_distance=="true")
        	{
                
                 Ti.App.fireEvent("loaded", {message:"distance"});
        	      		
        	}	
        	else{
        		for(var i=0;i<branches.lat.length;i++){
        			var marker1 = Titanium.Map.createAnnotation({
							latitude:branches.lat[i],
		    				longitude:branches.lon[i],
							title:"JUST BOOKS CLC",
							subtitle:branches.stitle[i],
		    				animate:true,
							image:'../images/bloc.png',
		   					leftButton:'../images/images.png',
							width:'80%',
						    myid:parseInt(i)+4,
        			});  
        			locate.chk[i+4]="true";  
       			 	locate.locmarker.push(marker1);
        		};
        	
        	
            for(var j=0;j<locate.locmarker.length;j++){
              	 mapview1.addAnnotation(locate.locmarker[j]);  
               }
          actInd.hide();
          locate.prev_error = "true";
          Ti.App.fireEvent("loaded", {message:"bob"});
          //self.removeEventListener('focus', onopen);
          mapview1.location = {latitudeDelta:0.02, longitudeDelta:0.02};
         }
        }
        else if(e.message=="distance"){
        	
        	
        		network.getdistance(locate.lat,locate.lon,branches.lat[locate.index],branches.lon[locate.index], function(distance){
        	
        			branches.distance.push(distance);
        			//alert(distance);
       			if(locate.index>=branches.lat.length-1 ){
       				//actInd.hide();
       				locate.index=0;
        			Ti.App.fireEvent("loaded", {message:"branchesfound1"});
        			}
        			else{
        				locate.index++;
        				Ti.App.fireEvent("loaded", {message:"distance"});
        			}
        		});
        		
        		
        }
        else if(e.message=="locchanged"){
        	//actInd.hide();
        	locate.locmarker=[];
        	//alert(locate.locmarker.length);
        	
        	for(var i=0;i<branches.lat.length;i++){
        			var marker1 = Titanium.Map.createAnnotation({
							latitude:branches.lat[i],
		    				longitude:branches.lon[i],
							title:"JUST BOOKS CLC",
							subtitle:branches.stitle[i],
		    				animate:true,
							image:'../images/bloc.png',
		   					//leftButton:'../images/images.png',
							width:'80%',
							myid:3,
        			});  
        			
       			 	locate.locmarker.push(marker1);
        		};
           for(var j=0;j<locate.locmarker.length;j++){
         
           	mapview1.addAnnotation(locate.locmarker[j]);  
         
           }
           actInd.hide();		
           //locate.prev_error = "true";
        }
        
       
           
 });
	return self;
}

module.exports = StoreMapWindow;


// This function removes non-numeric characters
function stripNonNumeric( str )
{
  str += '';
  var rgx = /^\d|\.|-$/;
  var out = '';
  for( var i = 0; i < str.length; i++ )
  {
    if( rgx.test( str.charAt(i) ) ){
      if( !( ( str.charAt(i) == '.' && out.indexOf( '.' ) != -1 ) ||
             ( str.charAt(i) == '-' && out.length != 0 ) ) ){
        out += str.charAt(i);
      }
    }
  }
  return out;
}

