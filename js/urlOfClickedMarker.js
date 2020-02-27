define([], function() {
  return function() {
    var markerUrl =
      "http://gadel.org//images/stories/illus/2018-05-25/fundra-drache.jpg";
    return {
      setMarkerUrl: function(url) {
        markerUrl = url;
      },
      getMarkerUrl: function() {
        return markerUrl;
      }
    };
  };
});
