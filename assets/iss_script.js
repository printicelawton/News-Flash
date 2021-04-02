//Fetch API using Asnyc/Wait method
const api_ISS_Url = 'https://api.wheretheiss.at/v1/satellites/25544'

async function getISS () {
    const response = await fetch(api_ISS_Url);
    const data = await response.json();
    const { latitude, longitude } = data;
    //console.log(data);
    //console.log(data.longitude)

    //Building map using leaflet js library 
    //from openstreet maps... requires attribution 
    const mymap = L.map('issMap').setView([0, 0], 1);
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright".OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';    
    const tiles = L.tileLayer(tileUrl, { attribution }); tiles.addTo(mymap);    


    //Accessing leaflet library for the marker... may change to a satelite icon later
    L.marker([latitude,longitude]).addTo(mymap);

    //getting the page to load with the map centered
    mymap.setView([latitude,longitude], 2.5);
    document.getElementById('lat').textContent = latitude;
    document.getElementById('long').textContent = longitude;
    //document.getElementById('issMap').appendChild(mymap)
    //Centering the map   
    mymap.setView([latitude,longitude], 2.5);

}

getISS();