
	

function AppTabGroup(){
	
var spacer = Math.round(Ti.Platform.displayCaps.platformWidth*0.5);
var width = spacer-4;
var height = 36;
var top1 =  Math.round(Ti.Platform.displayCaps.platformheight)-40;
var win = Ti.UI.createWindow({
	 height:40,
    left:0,
    bottom:0,
    backgroundColor:'#FFF',
    exitOnClose:true,
});
 
var bookview = require('ui/BookListWindow'),
searchview = require('ui/BookSearchFormView');
 var view1 = new bookview();
 var view2 = new searchview();
// TAB BAR
var tabBar = Ti.UI.createView({
    width:Ti.Platform.displayCaps.platformWidth,
    height:40,
    left:0,
    bottom:0,
    backgroundColor:'#000'
});
win.add(tabBar);
// TAB 1
var tab1 = Ti.UI.createView({
    width:width,
    height:height,
    left:2,
    bottom:2,
    backgroundColor:'#333',
    borderRadius:2
});

var img1 = Ti.UI.createImageView({
				image:'../images/book.png',
				left :"15%", 
				//defaultImage:'../images/noimage.jpg',
				/*top:5,
				left:10,
				bottom:5,
				height:75,
				width:50*/
			});
var tab1Label = Ti.UI.createLabel({
    text:'Top Rentals',
    left:"35%",
    color:'#FFF'
});
			
tab1.add(img1);
tab1.add(tab1Label);

win.add(tab1);
// TAB 2
var tab2 = Ti.UI.createView({
    width:width,
    height:height,
    left:spacer,
    bottom:2,
    backgroundColor:'#000'
});
var img2 = Ti.UI.createImageView({
				image:'../images/book.png',
				left :"8%", 
				//defaultImage:'../images/noimage.jpg',
				/*top:5,
				left:10,
				bottom:5,
				height:75,
				width:50*/
			});
var tab2Label = Ti.UI.createLabel({
	left : '25%',
    text:'Search Books',
    color:'#FFF'
});
tab2.add(img2);
tab2.add(tab2Label);
win.add(tab2);

 
var currTab = tab1;
var chk="true";
var locationlistener = "false"; 
// ADD EVENT LISTENERS
tab1.addEventListener('click',function() {
    currTab.backgroundColor = '#000';
    currTab.children[0].color = '#FFF';
    this.backgroundColor = '#333';
    this.children[0].color = '#FFF';
    currTab = this;
    view1.show();
    if(chk == "false")
    {    	
    	view2.hide();
    
    }
    //view2().close();
});
 
tab2.addEventListener('click',function() {
    currTab.backgroundColor = '#000';
    currTab.children[0].color = '#FFF';
    this.backgroundColor = '#333';
    this.children[0].color = '#FFF';
    currTab = this;
    view1.hide();
   
   if(chk == "true")
   {
    		chk="false";
    	    view2.open();
   }
   else{   	       
   			view2.show();
   		}
});
 
win.addEventListener('open', function(e){
  view1.open();
	
});

return win;
}

module.exports = AppTabGroup;
