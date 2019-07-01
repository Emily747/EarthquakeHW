// Creating map object
var myMap = L.map("map", 
{
    center: [39.0, -94.5],
    zoom: 4
});
   
// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", 
{
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "mapbox.outdoors",
accessToken: API_KEY
}).addTo(myMap);
   
// Store API query variables
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Grab the data with d3
d3.json(url, function(response) {
    console.log(response.features);
 //    L.geoJson(response.features).addTo(myMap);


    var data = response.features;

    locale = [];
    magnitude = [];

    // Loop through data to create arrays
    for (var i = 0; i < data.length; i++) {

        // Set the data location property to a variable
        var location = data[i].geometry.coordinates;
        var size = data[i].properties.mag;
        //console.log(location);

        locale.push([location[1], location[0]]);
        magnitude.push([size]);

        //if (location) {
        //L.marker([location[1], location[0]]).addTo(myMap);
        //}        
    };
    
    console.log("checkpoint 1")

    // Loop through arrays and create one marker for each quake
    for (var i = 0; i < data.length; i++) {

        // Conditionals for countries points
        var color = "";
        if (magnitude[i] > 6.9) {
        color = "red";
        }
        else if (magnitude[i] > 6) {
        color = "orange";
        }
        else if (magnitude[i] > 5.4) {
        color = "yellow";
        }
        else if (magnitude[i] > 2.4) {
        color = "green";
        }
        else {
        color = "blue";
        }
    
        console.log("checkpoint 2")
        console.log(data[i].properties.place)
        console.log(locale[i])

        // Add circles to map
        if (magnitude[i] > 0) {
        
            L.circle(locale[i], {
                fillOpacity: 0.75,
                color: color,
                fillColor: color,
                // Adjust radius
                radius: magnitude[i] * 20000
            }).bindPopup("<h1>" + data[i].properties.place + "</h1> <hr> <h3> Magnitude of " + magnitude[i] + "</h3>").addTo(myMap);
        }
        else {
            console.log("skipped due to Magnitude of 0 or less")
        }

    }
});  

