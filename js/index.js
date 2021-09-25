mapboxgl.accessToken = 'pk.eyJ1IjoicHJhdGlrLTQ0ODgiLCJhIjoiY2t0N2JhOXFpMHFwejJvcndrMmoxbHhvNCJ9.0_9baA8PIHqPMPD28VxiVA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [78.9629, 20.5937],
});

// Add the control to the map.
const geocoder = new MapboxGeocoder({
    // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    placeholder: "      Search",
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: true // Do not use the default marker style
});

// Add the geocoder to the map
map.addControl(geocoder,'top-left');
// Initialize the geolocate control.
const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});
// Add the control to the map.
map.addControl(geolocate,'bottom-right');
map.on('load', () => {
    geolocate.trigger();
});
map.addControl(
    new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    }),
    'top-right'
);
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
}
function error(err) {
    console.log(err);
}
navigator.geolocation.getCurrentPosition(success, error, options);