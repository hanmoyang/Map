var map = L.map('mapContainer').setView([40.745653, -73.989614], 12);
  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map);

var greenIcon = L.icon({
    iconUrl: 'leaf-green.png',
    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

$.getJSON('data/data.geojson', function(jqueryData) {

  L.geoJson(museums, {
    onEachFeature: function (feature, layer) {
      layer.on('click', function() {

        var string ='<h2>'
        +feature.properties.NAME
        +feature.properties.URL
        +feature.properties.ADDRESS1
        +feature.properties.CITY
        +feature.properties.TEL
        +feature.properties.ZIP
        +'<div>';

        $('#sidebar h2').html(string)
      })
  },
  pointTolayer:function(feature,latLng){
    return L.marker(latLng,{icon:greenIcon}).addTo(map);
  }
  });

  L.geoJson(galleries, {
      onEachFeature: function (feature, layer) {
        layer.on('click', function() {

          var string ='<h2>'
          +feature.properties.NAME
          +feature.properties.URL
          +feature.properties.ADDRESS1
          +feature.properties.CITY
          +feature.properties.TEL
          +feature.properties.ZIP
          +'<div>';

          $('#sidebar h2').html(string)
        })
      },
      pointTolayer:function(feature,latLng){
      return L.marker(latLng,{icon:greenIcon}).addTo(map);
    }
    })
   });

  var museums= L.geoJson(museums,{});
  var galleries=L.geoJson(galleries,{});

  var museumsLayerGroup= L.layerGroup([museums]);
  var galleriesLayerGroup = L.layerGroup([galleries]);

    
   museumsLayerGroup.addTo(map);
   galleriesLayerGroup.addTo(map);

   var types = {
     "Museums": museumsLayerGroup,
     "Galleries": galleriesLayerGroup,
   }

   L.control.layers(null, types, {
    collapsed: false
   }).addTo(map);






