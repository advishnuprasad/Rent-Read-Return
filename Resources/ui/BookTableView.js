//Book Table View. Top Rentals.	
	//name space
	var local= new function(){
        this.no=0;
        this.temp=0;
        this.len=0;
  	};
	var network = require('services/network');
	// global variables
	Ti.App.books = [];
	Ti.App.allbooks = [];
	Ti.App.index=0;
	Ti.App.row1;
	Ti.App.maxResults=1;
	var actInd = Titanium.UI.createActivityIndicator({ height:40, width:10, message:"  loading...."}); 

function BookTableView() {	
	var self = Titanium.UI.createScrollView({ 
		contentWidth:'auto', contentHeight:'auto', top:0, 
		showVerticalScrollIndicator:true, 
		showHorizontalScrollIndicator:true ,
	}); 
	var datastore = require('services/datastore');
	
	var sheight=Titanium.Platform.displayCaps.platformHeight;
	var width1=Titanium.Platform.displayCaps.platformWidth;
	var width2=0;
	Ti.App.index=Math.floor(2*(sheight/100));
	if( Ti.App.index % 2 != 0)
	{
		Ti.App.index = Ti.App.index-1;
	}
	var dload=9;
	var chk=[];
    var height=0;
    var height1=0;
	
	Ti.App.row1 = Ti.UI.createTableViewRow({
        name:'row1',
		height:100,
		className:"row1",
		borderColor:"#FFFFFF",
		borderWidth:0,
		backgroundColor:"#EFEFEF"
	});
				
	var bookDetailsView1 = Ti.UI.createView({
		height:'auto',
		layout:'vertical',
		left:60,		
		bottom:10,
		right:10
	});
			
	var bookTitle1 = Ti.UI.createLabel({
	 	text:"Loading More....",
		top:1,
		left:10,
		color:"#000000",
		height:'auto',
		textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
		font:{fontWeight:"bold", fontSize:12}
	});
			
	bookDetailsView1.add(bookTitle1);
	Ti.App.row1.add(bookDetailsView1);
    sheight=parseInt(sheight)+50;
	var actInd = Titanium.UI.createActivityIndicator({ height:40, width:'auto', message:"  loading more...."}); 
	
	var table=Ti.UI.createTableView({
		data:[], 
		separatorColor:"#FFFFFF"
	});
	
	var tableData = [];
	function loadData() {
		tableData=[];		
		for (var i = 0, l = Ti.App.books.length; i < l; i++) {
   	        var book = Ti.App.books[i];
			var row ;
			if(i%2==0){
				row = Ti.UI.createTableViewRow({
				    id:local.no,
					height:100,
					className:"row",
					hasDetail:true,
					borderColor:"#FFFFFF",
					borderWidth:0,
					rightImage:"../images/next.png",
					backgroundColor:"#EFEFEF"
				});
			}else{
				row = Ti.UI.createTableViewRow({
					id:local.no,
					height:100,
					className:"row",
					hasDetail:true,
					borderColor:"#FFFFFF",
					borderWidth:0,
					rightImage:"../images/next.png",
					backgroundColor:"#FFFFFF"
				});
			}
			
			var index1 = Ti.UI.createLabel({
				text:"hi",				
				visible:false
			});

			var bookDetailsView = Ti.UI.createView({
				height:'auto',
				layout:'vertical',
				left:60,
				top:10,
				bottom:10,
				right:10
			});
		
			var bookTitle = Ti.UI.createLabel({
				text:book.title,
				top:1,
				left:10,
				color:"#000000",
				height:'auto',
				textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
				font:{fontWeight:"bold", fontSize:12}
			});
			var bookAuthor = Ti.UI.createLabel({
				text:'Author : '+book.author,
				top:1,
				left:10,
				color:"#000000",
				height:'auto',
				font:{ fontSize:12 },
				textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT
			});
			var bookCategory= Ti.UI.createLabel({
				text:'Category : ' + book.category,
				top:1,
				left:10,
				color:"#000000",
				height:'auto',
				font:{ fontSize:12 },
				textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT
			});
			
			bookDetailsView.add(bookTitle);
			bookDetailsView.add(bookAuthor);
			bookDetailsView.add(bookCategory);
			row.add(bookDetailsView);
			
			var imageView = Ti.UI.createImageView({
				image:book.imageURL , 
				defaultImage:'../images/noimage.jpg',
				top:5,
				left:10,
				bottom:5,
				height:75,
				width:50
			});
			row.add(index1);
			row.add(imageView);
			row.bookTitle=book.title; 
			row.bookAuthor=book.author;
			row.desc=book.description;
			row.category=book.category
			row.bookImage= book.imageURL;
			row.addEventListener('click',function(e)
			{
					displayDetails(e.row.id);
			})
			
			tableData.push(row);
			local.no++;
		}
		
             if(local.no < Ti.App.maxResults )
             {
			 tableData.push(Ti.App.row1);
			 local.no++;
			 }
         Ti.App.books=[];
         
	}


	network.getList(function(books1) {
		for (var i = 0, l = books1.length; i<l; i++) {
			Ti.App.books.push(books1[i]);
			Ti.App.allbooks.push(books1[i]);
		} 	 
		
		Ti.App.fireEvent("loaded1", {message:"branch"});	
	});
	Ti.App.addEventListener('loaded1',function(e) {
	      if(e.message == 'branch')
    		  {      
			     	loadData();
	                //alert(tableData.length);  		   
			        table.setData(tableData);
			     	//table.appendRow(tableData);
					height=local.no*101;
					table.setHeight(height);	
					//alert(height);
	                 height1=height;
	                 
	   		}
	     if(e.message == 'branch1')
	   		{
	   			  	loadData();
	   		     	var index1 = table.getIndexByName('row1');
	   		    	table.deleteRow(index1);
	   		     	table.appendRow(tableData);
					height=local.no*101;
					table.setHeight(height);	
	                height1=height;	
	       }
	               
	    if(e.message=="loadmore"){
	    	local.no--;
	    	network.getList(local.no , Ti.App.index, function(books1) {
	    		for (var i = 0, l = books1.length; i<l; i++) {
					Ti.App.books.push(books1[i]);
					Ti.App.allbooks.push(books1[i]);
				} 	 
				Ti.App.fireEvent("loaded1", {message:"branch1"});
	    	}           
     	  )};	
	});	
	
	self.addEventListener('scroll', function(e){
		if(e.y > (height1-sheight) && local.no < Ti.App.maxResults)
		{      
	        local.no--;
	        height1=height1+sheight;
	        network.getList(local.no , Ti.App.index, function(books1) {
			for (var i = 0, l = books1.length; i<l; i++) {
				Ti.App.books.push(books1[i]);
				Ti.App.allbooks.push(books1[i]);
			} 	 
			Ti.App.fireEvent("loaded1", {message:"branch1"});
		});
	   }	
	});



    Titanium.Gesture.addEventListener('orientationchange', function(e){
    	 sheight=Titanium.Platform.displayCaps.platformHeight;
		 Ti.App.index=parseInt(2*(sheight/100));
    });

	self.add(table);
	return self;
}
function displayDetails(no1)
	{           
		       // alert(no1);
				var no = no1;
				var top=0;
				if(Ti.App.allbooks[no].description.length<1)
				{
					Ti.App.allbooks[no].description="No Description available for this book"
		 		}
				w_height=Ti.Platform.displayCaps.platformHeight;														
	 			w_width =Ti.Platform.displayCaps.platformWidth;
				var displayWindow=Ti.UI.createWindow(
				{
						backgroundColor:'white',
						Title:'Result',
						tabBarHidden:'true',
						//left:w_width-5,
						top:5,
				})
				var bookView=Ti.UI.createView(
				{
						top:1,
						width:w_width,
						backgroundColor:'white'													
				})
				var bookInnerView=Ti.UI.createView(
				{
						top:5,
						width:w_width-10,
						height:w_height-10,
						borderColor:'#aaa',
						borderWidth:2,
						backgroundColor:'white',
				})
							
				var image = Titanium.UI.createImageView(
				{
					//url:Ti.App.allbooks[no].imageURL,
					defaultImage:'../images/noimage.jpg',
					left  : 5,
					top   :10,
					width :60,
					height:75,
					//height:'auto'
				});	
							
			   var buttonView=Ti.UI.createView({
			   		top:90,
			   		width:'auto',
			   		height:45,
			   		layout:'horizontal',
			   	})
			   
			   var bwidth = Math.round(w_width/3)-8;
			   var prevButton=Ti.UI.createButton({
				   	top:2,
				   	title:'Previous',
				    width: bwidth,
			   		height:45,
				   	left:2,
			   		font:{fontWeight:"bold", fontSize:12}
			   })
			   var backButton=Ti.UI.createButton({
				   	top:2,
				   	title:'Go Back ',
				    width: bwidth,
				   	height:45,
			   		left: 2,
			   		
			   		font:{fontWeight:"bold", fontSize:12}
			   })
			   
			   var nextbutton=Ti.UI.createButton({
				   	top:2,
				   	title:'  Next  ',
				    width: bwidth,
				   	height:45,
			   		left: 2,
			   		enabled:true,
			   		font:{fontWeight:"bold", fontSize:12}
			   })
			   buttonView.add(prevButton);
			   buttonView.add(backButton);
			   buttonView.add(nextbutton);
			   
			   if(no == 0)
			   {
			   	 prevButton.setEnabled(false);
			   }
			   
			   if(no == Ti.App.maxResults)
			   {
			   	 nextbutton.setEnabled(false);
			   }
			  
			  nextbutton.addEventListener('click',function()
				{			
					
					if(!prevButton.enabled)
					{
						prevButton.setEnabled(true);
					}
					no++;
					if(parseInt(no) >= Ti.App.maxResults-1)
					{
						if(parseInt(no) == Ti.App.maxResults-1)
						{	image.setUrl(Ti.App.allbooks[no].imageURL);
							bookTitle.setText(Ti.App.allbooks[no].title);
							bookAuthor.setText(  "Authour  : "+Ti.App.allbooks[no].author);
							bookCategory.setText("Category : "+Ti.App.allbooks[no].category.toString());							
						}
						else
						{
							image.setUrl(Ti.App.allbooks[no].imageURL);
							bookTitle.setText(Ti.App.allbooks[no].title);
							bookAuthor.setText(  "Authour  : "+Ti.App.allbooks[no].author);
							bookCategory.setText("Category : "+Ti.App.allbooks[no].category.toString());	
							nextbutton.setEnabled(false);
						}
					}
					else if(parseInt(no) == local.no-1)
					{
						//alert("hi");
						actInd.show();
					    Ti.App.fireEvent("loaded1", {message:"loadmore"});	
					    
					    setTimeout(function(e){
					    	actInd.hide();
					    	image.setUrl(Ti.App.allbooks[no].imageURL);
					    	bookTitle.setText(Ti.App.allbooks[no].title);
							bookAuthor.setText(  "Authour  : "+Ti.App.allbooks[no].author);
							bookCategory.setText("Category : "+Ti.App.allbooks[no].category.toString());		
					     }, 4000);
						
					}
					
					else{
						bookTitle.setText(Ti.App.allbooks[no].title);
						bookAuthor.setText(  "Authour  : "+Ti.App.allbooks[no].author);
						bookCategory.setText("Category : "+Ti.App.allbooks[no].category.toString());		
						image.setUrl(Ti.App.allbooks[no].imageURL);
					}
				});
				
			prevButton.addEventListener('click',function()
				{			
					//alert(nextbutton.getEnabled);	
					if(!nextbutton.enabled)
					{
						nextbutton.setEnabled(true);
					}
					
					no--;
					if(parseInt(no) > 0)
					{
						image.setUrl(Ti.App.allbooks[no].imageURL);
						bookTitle.setText(Ti.App.allbooks[no].title);
						bookAuthor.setText(  "Authour  : "+Ti.App.allbooks[no].author);
						bookCategory.setText("Category : "+Ti.App.allbooks[no].category.toString());		
					}	
					else
					{
						image.setUrl(Ti.App.allbooks[no].imageURL);
						bookTitle.setText(Ti.App.allbooks[no].title);
						bookAuthor.setText(  "Authour  : "+Ti.App.allbooks[no].author);
						bookCategory.setText("Category : "+Ti.App.allbooks[no].category.toString());		
						prevButton.setEnabled(false);
					}		
				});
			
			   backButton.addEventListener('click',function()
				{				
					displayWindow.hide();				
				});
				
			    var bookDetailsView = Ti.UI.createView({
					height:'auto',
					layout:'vertical',
					left:70,
					top:10,
				
				});
			
				var bookTitle = Ti.UI.createLabel({
					text:Ti.App.allbooks[no].title,
					top:1,
					left:10,
					color:"#000000",
					height:'auto',
					textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
					font:{fontWeight:"bold", fontSize:12}
			    });
			    
			   var bookAuthor = Ti.UI.createLabel({
					text:'Author : '+Ti.App.allbooks[no].author,
					top:1,
					left:10,
					color:"#000000",
					height:'auto',
					font:{ fontSize:12 },
					textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT
			   });
			   
			   var bookCategory= Ti.UI.createLabel({
					text:'Category : ' + Ti.App.allbooks[no].category.toString(),
					top:1,
					left:10,
					color:"#000000",
					height:'auto',
					font:{ fontSize:12 },
					textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT
				});
			
				bookDetailsView.add(bookTitle);
				bookDetailsView.add(bookAuthor);
				bookDetailsView.add(bookCategory);
			
				var scrollView = Titanium.UI.createScrollView({
    				contentWidth:'auto',
    				contentHeight:'auto',    			
    				top:130,
    				height : w_height *  2/3,
    				showVerticalScrollIndicator:true,
    				showHorizontalScrollIndicator:true,
    				backgroundGradient:{
        				type:'linear',
        				colors:['#f0f5fb','#007abf']
   					}
				});
				
				var bookDescTitle=Ti.UI.createLabel(				
					{
						text:"Description : \n",
						font:{fontSize:12,fontWeight:'bold', fontFamily:'Helvetica'},
						color:'black',
						top:5,
						left:5,
						height:'auto'
					})
					
			   var bookDesc=Ti.UI.createLabel(				
					{
						text:Ti.App.allbooks[no].description,																		    
						font:{fontSize:12, fontFamily:'Times New Roman'},
						color:'black',
						top:20,
						left:5,
						height:'auto'
					})
					
						var Rentbutton=Ti.UI.createButton({
					   	top:w_height - 100,
					   	title:'  Rent  ',
					    width: bwidth,
					   	height:45,
				   		left: (w_width/2)-(bwidth/2),
				   		enabled:true,
				   		font:{fontWeight:"bold", fontSize:12}
			   			})			   	
			   		Rentbutton.addEventListener('click',function()
					{		
						var actInd = Titanium.UI.createActivityIndicator({ height:40, width:'auto', message:"Placing Order ..."});
						actInd.show();			
						network.rentBooks(Ti.App.allbooks[no].id,function(data) {
							 actInd.hide();
							 alert(data);	
							 displayWindow.close();						 							 
						 });			
						 						 		
					});					
				scrollView.add(bookDescTitle);
 				scrollView.add(bookDesc);
 				bookInnerView.add(image);
				bookInnerView.add(bookDetailsView);
				bookInnerView.add(buttonView);
				bookInnerView.add(scrollView);				
				bookView.add(bookInnerView);
				bookView.add(Rentbutton);
				displayWindow.add(bookView);	
		      	displayWindow.open();	      	
	}
module.exports = BookTableView;



