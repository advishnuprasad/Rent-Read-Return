function BookListWindow(){

    var BookSearchFormView = require('ui/BookSearchFormView'),
        BookTableView = require('ui/BookTableView'),
        network = require('services/network'),
        datastore = require('services/datastore');
        login = require('ui/login');
    //create object instance
    var self = Ti.UI.createWindow({
        title:"JustBooksCLC - Rent * Read * Return",
        titleid:'books_window',
        backgroundColor:'white',
        bottom:40
        //exitOnClose:true,
        //navBarHidden:true
    });
    if (Ti.App.Properties.getBool('login'))
    {
        var email = Ti.UI.createLabel({
          color: '#900',
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
          color: '#900',
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
        	alert('you are logged out')
            Ti.App.Properties.setBool('login',false)                    
            self.close();
            new login();
            if (!Ti.App.Properties.getBool('login'))
			{
			    var logged_in = new login();
			    //alert(Ti.App.Properties.getBool('login'))
			    logged_in.addEventListener('loggedin',function(e)
			    {
			        Ti.App.Properties.setBool('login',true);
			        Ti.App.Properties.getBool('login')
			        alert(e.auth_token);
			        logged_in.close();
			        var AppTabGroup = require('ui/AppTabGroup');
			        new AppTabGroup().open({modal:true});        
			    });
			    logged_in.addEventListener('login_attempt_failure',function(e)
			    {
			        Ti.App.Properties.setBool('login',false);
			        //alert(e.response);
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
    

    //bootstrap the datastore, if necessary
/*    if (!Ti.App.Properties.hasProperty('seeded')) {
    //if (true) {
        network.getList(function(books) {
            for (var i = 0, l = books.length; i<l; i++) {
                Titanium.API.log("Book retreived:" + books[i].id);
                datastore.saveBook(books[i]);
            }      
            Ti.App.Properties.setBool('seeded', true);
        });
    }
*/        
    //construct UI
    //var bookSearchForm = new BookSearchFormView();
    //bookSearchForm.top = 0;
    //self.add(bookSearchForm);
    
    var bookList = new BookTableView();
    bookList.top = 20;
    
    self.add(bookList);
    
    return self;
}

module.exports = BookListWindow;