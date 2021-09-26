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
map.addControl(geocoder, 'top-left');
// Initialize the geolocate control.
const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});
// Add the control to the map.
map.addControl(geolocate, 'bottom-right');
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                TimeLine Function
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


let time = new Date();

let timeLinePopup = document.createElement('div');
timeLinePopup.className = "popup";
timeLinePopup.innerHTML = `
    <div id="popupcard" class="card mt-3" style="width: 20rem;">
    <h5 class="card-title my-3" style="text-align:center">Add to your Timeline</h5>
        <div class="card-body">
            <input type="text" id="post-Place" class="my-2" placeholder="Enter Place Name">
            <input type="file" class="my-2" id="myInputfile">
            <img src="" id="img-preview" />
            <input type="text" id="post-Desc"  class="my-2" placeholder="Write about post!"><br>
            <a href="#" class="btn btn-primary" id="SubmitPost">Add Timeline</a>
            <a href="#" class="btn btn-primary" id="closePost">Close</a>
        </div>
    </div>
`

let timeLineArray = [];
let newTimelineObj = new Object();

let timeLineBtn = document.getElementById("TimelineBtn");
navigator.geolocation.getCurrentPosition(success, error, options);

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    function success(pos) {
        var crd = pos.coords;
        timeLineBtn.addEventListener('click', () => {

            document.getElementById("feed-list").append(timeLinePopup);
            
            let addTimeLineBtn = document.getElementById('SubmitPost');

            fileUpload = document.getElementById('myInputfile');
        
            var CLOUDINARY_URL = "	https://api.cloudinary.com/v1_1/h2a3rb3o34u4r2/upload";
            var CLOUDINARY_UPLOAD_PRESET = "fineqi35";
            
            
            
            fileUpload.addEventListener('change',function(event){
                var file =event.target.files[0];
               
                var formData = new FormData();
                formData.append('file',file);
                formData.append('upload_preset' , CLOUDINARY_UPLOAD_PRESET)
            
                axios({
                    url: CLOUDINARY_URL,
                    method: 'POST',
                    header: {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    data: formData
                }).then(function(res){
                    // imgPreview.src = res.data.secure_url;
                    newTimelineObj.img = res.data.secure_url;
                }).catch(function(err){
                    console.log(err);
                })
                ;
            
            
            });

        // add Timeline to timeline array.
        addTimeLineBtn.addEventListener('click', () => {
            newTimelineObj.long = crd.longitude;
            newTimelineObj.lat = crd.latitude;

            let timelinePlace = document.getElementById('post-Place');
            let timelineDesc = document.getElementById('post-Desc');
            newTimelineObj.place = timelinePlace.value;
            newTimelineObj.Desc = timelineDesc.value;
            
            newTimelineObj.date = time;
            
            timeLineArray.push(newTimelineObj);
            document.getElementById("feed-list").removeChild(timeLinePopup);
        })
    });
    }
    function error(err) {
        console.log(err);
    }