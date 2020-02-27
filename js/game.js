define(["jquery", "icons", "fancybox", "leaflet"], function(
  $,
  icons,
  fancybox,
  leaflet
) {
  return function(map, markerGroup, mapPositionHandler, gameData) {
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

      var imageUrl = mapPositionHandler.getMarkerUrl();
      var imageGeoPosition = gameData.getImageGeoPosition();
      htmlInner +=
        '<img id="photo" src="' +
        imageUrl +
        '" style="max-width:395px" /></div>';
      console.log("updateInfo");
      this._div.innerHTML = htmlInner;
    };
    var info = leaflet.control();
    info.update = updateInfobox;
    info.onAdd = addInfobox;
    info.addTo(map);
  };
});
