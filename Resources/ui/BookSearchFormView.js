function BookSearchFormView() {
	//load dependencies
	var Book = require('models/Book');
	var bookSearch = require('ui/searchListWindow');
	var login = require('ui/login');
	var network = require('services/network')
	//create object instance
	var self = Ti.UI.createWindow({		
		backgroundColor:'#333',
		bottom : 40
		});
	   if (Ti.App.Properties.getBool('login'))
    {
        var email = Ti.UI.createLabel({
          color: '#FFF',
          font: { fontSize:10 },
          shadowColor: '#aaa',          
          text: 'welcome  '+ Ti.App.Properties.getString('email') + '    ',
          textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
          top: 0,
          left : 10 ,
          height: 'auto',
          width: 'auto'
        });
        var logout = Ti.UI.createLabel({
          color: '#FFF',
          font: { fontSize:12 },
          shadowColor: '#aaa',          
          text: '[Logout]',
          textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
          top: 0,
          right : 10,
          height: 'auto',
          width: 'auto'
        });
        logout.addEventListener('click',function()
        {
        	network.logout();        	
            Ti.App.Properties.setBool('login',false)                    
            self.close();
            new login();
            if (!Ti.App.Properties.getBool('login'))
			{
			    var logged_in = new login();			    
			    logged_in.addEventListener('loggedin',function(e)
			    {
			        Ti.App.Properties.setBool('login',true);
			        Ti.App.Properties.getBool('login')			        
			        logged_in.close();
			        var AppTabGroup = require('ui/AppTabGroup');
			        new AppTabGroup().open({modal:true});        
			    });
			    logged_in.addEventListener('login_attempt_failure',function(e)
			    {
			        Ti.App.Properties.setBool('login',false);			        
			        //logged_in.open();
			    });
			}
			else
			{
			    var AppTabGroup = require('ui/AppTabGroup');
			    new AppTabGroup().open({modal:true});    
			}
	});
	self.add(email);
	self.add(logout);
}

	var searchBar = Titanium.UI.createSearchBar({
	    //showCancel:true,
	    borderRadius:5,
	    hintText:"Search books",
	    height:50,
	    top:30,
	    //font:{fontSize:14}
	});	
	//construct UI
	var field = Ti.UI.createTextField({
		top:20,
		left:5,
		right:30,
		height : 30,		
		hintText:'Search book',
		font:{fontSize:14},
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	self.add(field);
	
	var button = Ti.UI.createButton({
		right:5,
		top:21,
		
		 width:24,
		 height:24,
		backgroundImage:'../images/go-next.png',
		borderWidth:1,
		borderColor:"#454545",
		borderRadius: 4,
		backgroundColor:"#AAAAAA"
		//title:'Search >>'
	});
	
	self.add(button);
	
	button.addEventListener('click', function(e) {
		var actInd = Titanium.UI.createActivityIndicator({ height:40, width:'auto', message:"Loading Books ..."});
		//actInd.show();
		Ti.App.search_books = [];
		var result = new bookSearch(field.value);
		result.top = 50;
		self.add(result);
		//actInd.hide();
	});
	
	
	//self.add(searchBar);
	//self.add(Title);
	//TODO - add behavior
	
	
	//return instance from constructor
	return self;
}

module.exports = BookSearchFormView;