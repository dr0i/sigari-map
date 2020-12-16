define({
  geojsonFile: "https://www.dr0i.de/lib/gadel/sigari-map/" + geojsonFile,
  geojsonFile: "http://localhost/sigari-map/" + geojsonFile,
  mapConfig: {
    center: [0.0, -0.07],
    zoom: 12,
    maxZoom: 18,
    minZoom: 10,
    attribution:
      'Map data &#64; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors</a>',
    mapWarperAttribution:
      'Map data &#64; <a href="https://mapwarper.net/">MapWarper</a> contributors</a>'
  },
  gameData: function() {
    var index = 0;
    var data = undefined;
    var imageUrl =
      "https://gadel.org//images/stories/illus/2018-05-25/fundra-drache.jpg";
    var imageGeoPosition = [0.0, 0.0];
    return {
      setData: function(newData) {
        data = newData;
      },
      getImageUrl: function() {
        if (data) {
          return data.features[index].properties[imageField] || imageUrl;
        } else {
          return imageUrl;
        }
      },
      getCityName: function() {
        if (data) {
          return data.features[index].properties["label"] || location;
        } else {
          return imageUrl;
        }
      },
      getImageGeoPosition: function() {
        if (data) {
          var coords = data.features[index].geometry.coordinates;
          return coords ? [coords[1], coords[0]] : imageGeoPosition;
        } else {
          return imageGeoPosition;
        }
      }
    };
  }
});
