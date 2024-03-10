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
        '<div style="width: 400px;text-align: center; position: fixed; left: 70px; background: lightgrey">';
      htmlInner +=
        '<input type="checkbox" id="catCity" name="cat" value="city" checked>';
      htmlInner += '<label for="catCity">Städte</label>';
      htmlInner +=
        '<input type="checkbox" id="catLandscape" name="cat" value="landscape" checked>';
      htmlInner += '<label for="catLandscape">Landschaften</label>';
      htmlInner +=
        '<input type="checkbox" id="catBuildings" name="cat" value="building" checked>';
      htmlInner += '<label for="catBuildings";>Gebäude</label>';
      htmlInner +=
      '<input type="checkbox" id="catSpecialCharacter" name="cat" value="specialCharacter" checked>';
    htmlInner += '<label for="catSpecialCharacter";>Spezies</label>';

      var imageUrl = mapPositionHandler.getMarkerUrl();
      var imageText = mapPositionHandler.getMarkerText();
      var imageLink = mapPositionHandler.getMarkerLink();

      htmlInner +=
        '</br><a id="photoText" style="font-size: 200%" href="' +
        imageLink +
        '" target="_parent" >' +
        imageText +
        "</a>";
      htmlInner +=
        '<img id="photo" src="' +
        imageUrl +
        '" style="max-width:400px" /></div>';
      this._div.innerHTML = htmlInner;
    };
    var info = leaflet.control();
    info.update = updateInfobox;
    info.onAdd = addInfobox;
    info.addTo(map);
  };
});
