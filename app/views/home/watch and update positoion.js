$(document).ready(function(){

    initLocationProcedure();
})

function initLocationProcedure() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
          zoom : 17
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayAndWatch, locError, {
            enableHighAccuracy : true,
            timeout : 60000,
            maximumAge : 0
        });
    } else {
        alert("Geolocation not supported.");
    }
}

function locError(error) {
	// the current position could not be located
	alert("The current position could not be found!");
}

function displayAndWatch(position) {
    // set current position
    setUserLocation(position);
    // watch position
    watchCurrentPosition();
}

function setUserLocation(pos) {
    // marker for userLocation
    userLocation = new google.maps.Marker({
           map : map,
           position : new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
           title : "You are here",
	});
    // scroll to userLocation
    map.panTo(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
}

function watchCurrentPosition() {
    var positionTimer = navigator.geolocation.watchPosition(function(position) {
        setMarkerPosition(userLocation, position);
        map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    });
}

function setMarkerPosition(marker, position) {
     marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
     console.log(position);
}