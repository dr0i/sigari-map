define(["jquery", "leaflet", "leaflet.ajax", "leaflet.ruler", "data"], function(
  $,
  leaflet,
  leafletAjax,
  leafletRuler,
  data
) {
  var rulerOptions = {
    position: "topleft",
    lengthUnit: {
      factor: 750,
      display: "km",
      decimal: 0,
      label: "Distanz:"
    },
    mediumUnit: {
      display: "Tage",
      decimal: 1,
      factor: 0.014,
      label: "Pferd:"
    }
  };
  return function(mapPositionHandler, callback, gameData) {
    var map = leaflet
      .map("map")
      .setView(data.mapConfig.center, data.mapConfig.zoom);
    leaflet
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: data.mapConfig.attribution,
        maxZoom: data.mapConfig.maxZoom,
        minZoom: data.mapConfig.minZoom
      })
      .addTo(map);
    leaflet
      .tileLayer("https://www.mapwarper.net/maps/tile/45207/{z}/{x}/{y}.png", {
        attribution: data.mapConfig.mapWarperAttribution,
        maxZoom: data.mapConfig.maxZoom,
        minZoom: data.mapConfig.minZoom
      })
      .addTo(map);
    L.control.ruler(rulerOptions).addTo(map);
    var marker;
    var markerGroup = L.layerGroup().addTo(map);
    // load GeoJSON from an external file
    var setMarker = function(cat) {
      $.getJSON(geojsonFile, function(data) {
        L.geoJson(data, {
          pointToLayer: function(feature, latlng) {
            if (feature.properties.cat === cat) {
              marker = L.marker(latlng);
              marker.properties = {};
              marker.properties.url = feature.properties.depiction;
              marker.properties.id = feature.properties.id;
              marker.properties.link = feature.properties.label;
              return marker;
            }
          }
        })
          .addTo(markerGroup)
          .on("mouseover", function(e) {
            marker = leaflet.marker(e.latlng);
            mapPositionHandler.setMarkerUrl(e.layer.properties.url);
            mapPositionHandler.setMarkerText(e.layer.properties.id);
            mapPositionHandler.setMarkerLink(e.layer.properties.link);
            $("#photoText").prop("href", mapPositionHandler.getMarkerLink());
            $("#photoText").prop("text", mapPositionHandler.getMarkerText());
            $("#photo").prop("src", mapPositionHandler.getMarkerUrl());
          });
      });
    };
    map.doubleClickZoom.disable();
    map.on("dblclick", function(e) {
      alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
    });

    $(document).on("change", "input", function() {
      $("input:checkbox").each(function() {
        var checkId = $(this).attr("id");
        var isChecked = $("input[id=" + checkId + "]").prop("checked");
        markerGroup.clearLayers();
        if (isChecked) {
          var valueOfCheckedCat = $("input[id=" + checkId + "]").val();
          setMarker(valueOfCheckedCat);
        }
      });
    });

    setMarker("city");
    setMarker("landscape");
    setMarker("building");
    setMarker("specialCharacter");

    $.ajaxSetup({
      scriptCharset: "utf-8",
      contentType: "application/json; charset=utf-8"
    });
    var jsonMimeType = "application/json;charset=UTF-8";
    $.ajax({
      type: "GET",
      url: data.geojsonFile,
      beforeSend: function(x) {
        if (x && x.overrideMimeType) {
          x.overrideMimeType(jsonMimeType);
        }
      },
      dataType: "json",
      success: function(geojsonData) {
        callback(geojsonData, map, this.markerGroup);
      }
    });
  };
});
