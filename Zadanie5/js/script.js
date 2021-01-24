var map = L.map('mapid').setView([48.1532649,17.0729059], 17);

//1. CAST ZADANIA = zvyraznit budovy skoly a popup kontajneri vypisat ustavy
var campus = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "name": "A",
            "properties": {
                "popupContent":"Ústav informatiky a matematiky,<br>" +
                    "Ústav jadrového a fyzikálneho inžinierstva,<br>" +
                    "Pedagogické oddelenie (PGO)",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [17.07254871726036,48.15182361541389],
                        [17.073869705200195,48.15182361541389],
                        [17.073869705200195,48.151964982562305],
                        [17.07254871726036,48.151964982562305],
                        [17.07254871726036,48.15182361541389]
                    ]
                ]
            },
            "id": 1
        },
        {
            "type": "Feature",
            "name": "B",
            "properties": {
                "popupContent" : "Ústav elektrotechniky,<br>" +
                                "Ústav multimediálnych informačných a komunikačných technológií" ,
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [17.072996646165848,48.15232466177886],
                        [17.074361890554428,48.15232466177886],
                        [17.074361890554428,48.15246781698457],
                        [17.072996646165848,48.15246781698457],
                        [17.072996646165848,48.15232466177886]
                    ]
                ]
            },
            "id": 2
        },
        {
            "type": "Feature",
            "name": "C",
            "properties": {
                "popupContent": "Ústav informatiky a matematiky,<br>" +
                                "Ústav elektroenergetiky a aplikovanej elektrotechniky",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [17.072807550430298,48.152827492676586],
                        [17.073875069618225,48.152827492676586],
                        [17.073875069618225,48.15297601473932],
                        [17.072807550430298,48.15297601473932],
                        [17.072807550430298,48.152827492676586]
                    ]
                ]
            },
            "id": 3
        },
        {
            "type": "Feature",
            "name": "D",
            "properties": {
                "popupContent": "Ústav automobilovej mechatroniky,<br>" +
                                "Ústav robotiky a kybernetiky",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [17.073191106319427,48.153330318646994],
                        [17.074373960494995,48.153330318646994],
                        [17.074373960494995,48.153478839254355],
                        [17.073191106319427,48.153478839254355],
                        [17.073191106319427,48.153330318646994]
                    ]
                ]
            },
            "id": 4
        },
        {
            "type": "Feature",
            "name": "E",
            "properties": {
                "popupContent": "Ústav elektroniky a fotoniky",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [17.072818279266357,48.15383492908005],
                        [17.0738884806633,48.15383492908005],
                        [17.0738884806633,48.153983448226825],
                        [17.072818279266357,48.153983448226825],
                        [17.072818279266357,48.15383492908005]
                    ]
                ]
            },
            "id": 5
        },
        {
            "type": "Feature",
            "name": "T",
            "properties": {
                "popupContent": "Technologický inštitút športu",

            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [17.072555422782898, 48.15350746968346],
                        [17.072818279266357,48.15350746968346],
                        [17.072818279266357,48.154437949932955],
                        [17.072555422782898,48.154437949932955],
                        [17.072555422782898,48.15350746968346]
                    ]
                ]
            },
            "id": 5
        }
    ]
}
function campusOnEach(feature, layer) {
    var popupContent = "<h6>Blok " +
        feature.name + "</h6>";

    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
}
L.geoJSON( campus, {

    style: function (feature) {
        return feature.properties && feature.properties.style;
    },

    onEachFeature: campusOnEach,

}).addTo(map);

//2. CAST ZADANIA = v okoli skoli zobraz markery pre zastavky, odlis ich ikonkou a vypis ake spoje odtial idu

var bus = L.Icon.extend({
    options: {
        iconSize: [40, 40], // size of the icon
         popupAnchor: [0, -20] // point from which the popup should open relative to the iconAnchor
    }
});
var train = L.Icon.extend({
    options: {
        iconSize: [35, 35], // size of the icon
        popupAnchor: [0, -20] // point from which the popup should open relative to the iconAnchor
    }
});
var busIcon = new bus({iconUrl: 'images/bus.png'}),
    trainIcon = new train({iconUrl: 'images/train.png'});



var stops = L.layerGroup([L.marker([48.154158, 17.075120], {icon: busIcon}).bindPopup('<h6>Zoo</h6>31, 39, N31'),
    L.marker([48.154640, 17.074530], {icon: busIcon}).bindPopup('<h6>Zoo</h6>31, 39, N31'),
    L.marker([48.154693, 17.075731], {icon: busIcon}).bindPopup('<h6>Zoo</h6>30, 32, 37, 92, 192, N29'),
    L.marker([48.154098, 17.076875], {icon: busIcon}).bindPopup('<h6>Zoo</h6>30, 32, 37, 92, 192, N29'),
    L.marker([48.148370, 17.071975], {icon: busIcon}).bindPopup('<h6>Botanická záhrada</h6> 29, 32, N29, N33, N34'),
    L.marker([48.147955, 17.072332], {icon: busIcon}).bindPopup('<h6>Botanická záhrada</h6> 29, 32, N29, N33, N34'),
    L.marker([48.148150, 17.072468], {icon: trainIcon}).bindPopup('<h6>Botanická záhrada</h6> 4,9'),
    L.marker([48.148158, 17.071773], {icon: trainIcon}).bindPopup('<h6>Botanická záhrada</h6> 4,9'),
]).addTo(map);




//3. CAST

L.Routing.control({
    waypoints: [
        L.latLng(),
        L.latLng(48.1532649,17.0729059)
    ],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim()
}).addTo(map);

// 4.

var MarkerIcon = L.Icon.extend({
    options: {
        iconSize: [40, 40], // size of the icon
        iconAnchor: [20, 40],
        popupAnchor: [0, -20] // point from which the popup should open relative to the iconAnchor
    }
});

var markerIcon = new MarkerIcon({iconUrl: 'images/marker.png'});
var geocodeService = L.esri.Geocoding.geocodeService();

map.on('click', function(e){
    var geocode;
    var marker = L.marker(e.latlng, {icon: markerIcon});
    geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
        if (error) {
            return;
        }
        marker.bindPopup(result.address.Match_addr).addTo(map).openPopup();
    })
});



L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibGp1cmFqIiwiYSI6ImNraDNhYnQwcDBtdG0zMGxzNjJoa2V4c3QifQ.nv7w4gQJ_HylQv8pPGiVSQ'
}).addTo(map);


//Icons made by <a href="https://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
//Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>