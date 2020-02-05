define({
  geojsonFile: "https://www.dr0i.de/lib/gadel/sigari-map/" + geojsonFile,
  mapConfig: {
    center: [0.0, -0.07],
    zoom: 12,
    maxZoom: 18,
    minZoom: 10,
    attribution:
      'Map data &#64; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors</a>',
    mapWarperAttribution:
      'Map data &#64; <a href="http://mapwarper.net/">MapWarper</a> contributors</a>'
  },
  gameData: function() {
    var scores = { score: 0 };
    var index = 0;
    var roundInit = false;
    var alreadyPlayed = [];
    var data = undefined;
    var imageUrl =
      "http://gadel.org//images/stories/illus/2018-05-25/fundra-drache.jpg";
    var imageGeoPosition = [0.0, 0.0];

    var createNewIndex = function() {
      return Math.floor(Math.random() * Math.floor(data.features.length));
    };
    var startGame = function() {
      alreadyPlayed = [];
      if (!roundInit) {
        index = Math.floor(Math.random() * Math.floor(data.features.length));
        alreadyPlayed.push(index);
      }
      scores.score = 0;
    };

    return {
      setData: function(newData) {
        data = newData;
        startGame();
      },
      setRoundInit: function(init) {
        roundInit = init;
      },
      isRoundInit: function() {
        return roundInit;
      },
      hasNextRound: function() {
        return alreadyPlayed.length < 2;
      },
      getRound: function() {
        return alreadyPlayed.length;
      },
      resetAll: function() {
        startGame();
      },
      nextPhoto: function() {
        var newIndex = Math.floor(
          Math.random() * Math.floor(data.features.length)
        );
        if (alreadyPlayed.indexOf(newIndex) == -1) {
          index = newIndex;
          alreadyPlayed.push(index);
          return true;
        } else {
          return false;
        }
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
      },
      getScore: function() {
        if (data) {
          return scores.score;
        } else {
          return 0;
        }
      },
      setScore: function(newScore) {
        scores.score = newScore;
      }
    };
  }
});
