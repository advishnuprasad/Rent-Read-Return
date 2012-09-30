
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = .25;

/** 
 * @param {Object} _callback : call on completion of location query 
 * @desc : will give the last known location of the user and then 
 *         checks with the gps to get the current location
 */
/*exports.currentLocation = function(_callback) {
    
    var locationJSONStr, lastLocation;
    //get the last known location from the app properties
    locationJSONStr = Ti.App.Properties.getString('geo:lastlocation');
    lastLocation = (locationJSONStr) ? 
                    JSON.parse(locationJSONStr) : 
                    { latitude: 12.971599, longitude: 77.594563 };
                    
   
    Ti.App.fireEvent('location.updated', lastLocation);
    
    Titanium.Geolocation.getCurrentPosition(function(e) {

        if(e.error) {
            //alert('error ' + JSON.stringify(e.error));

            // to keep it simple, just returning null, could be
            // error information
            if(_callback) {
                _callback(null);
            }
            return;
        }
        Ti.App.Properties.setString('geo:lastlocation', 
                                    JSON.stringify(e.coords));
        Ti.App.fireEvent('location.updated', e.coords);

        if(_callback) {
            _callback(e.coords);
        }
    });
};*/

var pollo =function(e){
	alert('hi');
}
