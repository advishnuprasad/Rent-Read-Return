var login = require('ui/login');
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


//	var AppTabGroup = require('ui/AppTabGroup');
	//new AppTabGroup().open({modal:true});
/*
var self = Ti.UI.createWindow({
	backgroundColor:'#ff0000'
});
self.open();
*/
