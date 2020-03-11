define([], function() {
  return function() {
    var markerUrl =
      "https://gadel.org//images/stories/illus/2018-05-25/fundra-drache.jpg";
    var markerText = "Fundra";
    var markerLink =
      "https://gadel.org/component/search/?searchword=fundra&ordering=newest&searchphrase=all&limit=0";
    return {
      setMarkerUrl: function(url) {
        markerUrl = url;
      },
      getMarkerUrl: function() {
        return markerUrl;
      },
      setMarkerText: function(text) {
        markerText = text;
      },
      getMarkerText: function() {
        return markerText;
      },
      setMarkerLink: function(link) {
        markerLink = link;
      },
      getMarkerLink: function() {
        return markerLink;
      }
    };
  };
});
