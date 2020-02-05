define(["jquery", "icons", "fancybox", "leaflet"], function(
  $,
  icons,
  fancybox,
  leaflet
) {
  return function(map, markerGroup, mapPositionHandler, gameData) {
    var getThisRoundScore = function(distance) {
      if (distance < 10000) {
        return 100;
      } else if (distance < 15000) {
        return 85;
      } else if (distance < 20000) {
        return 70;
      } else if (distance < 25000) {
        return 55;
      } else if (distance < 30000) {
        return 40;
      } else if (distance < 35000) {
        return 25;
      } else {
        return 0;
      }
    };

    var addInfobox = function(map) {
      this._div = leaflet.DomUtil.create("div", "info");
      this.update();
      return this._div;
    };

    var updateInfobox = function(id, props) {
      var htmlInner =
        '<div style="width: 400px; position: fixed; left: 70px; color: black;">';
      htmlInner +=
        '<input type="checkbox" id="catCity" name="cat" value="city" checked>';
      htmlInner += '<label for="catCity">Zeige Städte</label>';
      htmlInner +=
        '<input type="checkbox" id="catLandscape" name="cat" value="landscape" checked>';
      htmlInner += '<label for="catLandscape">Zeige Landschaften</label>';
      htmlInner +=
        '<input type="checkbox" id="catBuildings" name="cat" value="building" checked>';
      htmlInner += '<label for="catBuildings">Zeige Gebäude</label>';

      htmlInner +=
        '<button id="checkLocationButton" style="font-size : 20px; width: 100%; height: 100%;;margin:auto;display:block">Prüfe Position</button>';
      var imageUrl = gameData.getImageUrl();
      var imageGeoPosition = gameData.getImageGeoPosition();
      htmlInner +=
        '<img id="photo" src="' +
        imageUrl +
        '" style="max-width:395px" /></div>';
      mapPositionHandler.setRealMarkerPosition(
        leaflet.latLng(imageGeoPosition[0], imageGeoPosition[1])
      );
      this._div.innerHTML = htmlInner;
    };

    var info = leaflet.control();
    info.update = updateInfobox;
    info.onAdd = addInfobox;
    info.addTo(map);

    $("#checkLocationButton").prop("disabled", "disabled");
    $("#checkLocationButton").on("click", function(e) {
      checkLocation();
    });
  };
});
