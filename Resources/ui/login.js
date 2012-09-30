function login()
{

    var loginWindow=Ti.UI.createWindow(
    {
        Title : 'Rent * Read * Return',
        backgroundColor:"#e4e1ce",
        modal:'true',        
    });
    var image = Titanium.UI.createImageView({image:'../images/jbs.jpg',
    top : 5}); 
 
    loginWindow.add(image)    ;
    //alert('inside login')  
    var view2 = Ti.UI.createView({
        height:100,
        borderRadius:10,
        top:80,
        left:10,
        backgroundColor:"#cfccb9",
        right:10
    });

     var username = Titanium.UI.createTextField({  
        color:'#336699',  
        top:10,  
        left:10,  
        width:200,  
        height:40,  
        hintText:'Email ID',  
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
        returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
    });  
    view2.add(username);        
    var password1 = Titanium.UI.createTextField({  
        color:'#336699',  
        top:50,  
        left:10,  
        width:200,  
        height:40,  
        hintText:'Password',  
        passwordMask:true,  
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
        returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
    });  
    view2.add(password1);  
      loginWindow.add(view2);
    var loginBtn = Titanium.UI.createButton({  
        title:'Login',  
        top:200,
        backgroundColor: '#151B8D', 
        width:110,  
        color: 'white',
        height:35,  
        borderRadius:1,
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,   
        font:{color:'white',fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
    });  
    var logoutBtn = Titanium.UI.createButton({  
        title:'Logout',  
        top:110,  
        width:90,  
        height:30,  
        borderRadius:1,  
        font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
    });  
    loginWindow.add(loginBtn);  
    loginWindow.open();
    //var loginReq = Titanium.Network.createHTTPClient();  
      
   var loginReq = Titanium.Network.createHTTPClient(); 
   var logoutReq = Titanium.Network.createHTTPClient();
    loginBtn.addEventListener('click',function(e)  
    {          
        //alert('called')
        if (username.value != '' && password1.value != '')
        {    
                    
            loginReq.open("POST","http://192.168.1.110:4000/users/sign_in");  
            
            var params = {
                            user : { email : username.value,
                                     password : password1.value
        
                                    }
                            }
                        loginReq.setRequestHeader("Content-Type", "application/json");
                loginReq.setRequestHeader("Accepts","application/json");

            loginReq.send(JSON.stringify(params));  
                
                

        }  
        else  
        {  
            alert("Username/Password are required");  
        }  
    });  
    loginReq.onload = function()  
    {  
        var json = this.responseText;  
        var response = JSON.parse(json);  
       // alert('Welcome' + response.user["email"]);
        //alert("auth_token" + response.user["authentication_token"])
        Ti.App.Properties.setString('email',response.user["email"])
        Ti.App.Properties.setString('auth_token',response.user["authentication_token"])        
        Ti.App.Properties.setBool('Login',true) 
           loginWindow.fireEvent('loggedin', { auth_token : response.user["authentication_token"]})                        
        //var email=response.user[0].email;
            //alert(email);
            /*username.blur();  
            password.blur();          
            Ti.App.fireEvent('grantLogin', 
            {  
                name:response.name,
                memberid:response.memberid
            });  
            loginWindow.close();  
        }  
        else  
        {  
            alert(response.message);  
        }  */
    };  
    loginReq.onerror = function(e)
    {
        loginWindow.fireEvent('login_attempt_failure', { response : 'Login Failed'})
        //loginWindow.close();                
    };
    return loginWindow;
}
module.exports = login
