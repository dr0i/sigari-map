define([], function() {
  return function() {
    var realMarkerPosition = undefined;
    var markerPosition = undefined;
    var markerUrl = undefined;

    return {
      setMarkerPosition: function(mp) {
        markerPosition = mp;
      },
      getMarkerPosition: function() {
        return markerPosition;
      },
      setRealMarkerPosition: function(mp) {
        realMarkerPosition = mp;
      },
      getRealMarkerPosition: function() {
        return markerPosition;
      },
      setMarkerUrl: function(url) {
        markerUrl = url;
      },
      getMarkerUrl: function() {
        return markerUrl;
      }
    };
  };
});
