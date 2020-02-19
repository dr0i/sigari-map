define(["jquery", "leaflet", "leaflet.ajax", "data"], function(
  $,
  leaflet,
  leafletAjax,
  data
) {
  return function(mapPositionHandler, callback, gameData) {
    var map = leaflet
      .map("map")
      .setView(data.mapConfig.center, data.mapConfig.zoom);
    leaflet
      .tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: data.mapConfig.attribution,
        maxZoom: data.mapConfig.maxZoom,
        minZoom: data.mapConfig.minZoom
      })
      .addTo(map);
    leaflet
      .tileLayer("http://www.mapwarper.net/maps/tile/45207/{z}/{x}/{y}.png", {
        attribution: data.mapConfig.mapWarperAttribution,
        maxZoom: data.mapConfig.maxZoom,
        minZoom: data.mapConfig.minZoom
      })
      .addTo(map);

    var marker;
    var markerGroup = L.layerGroup().addTo(map);
    // load GeoJSON from an external file
    var setMarker = function(cat) {
      $.getJSON(geojsonFile, function(data) {
        L.geoJson(data, {
          pointToLayer: function(feature, latlng) {
            if (feature.properties.cat === cat) {
              marker = L.marker(latlng);
              marker.bindPopup(
                "Name: <a href=" +
                  feature.properties.id +
                  ">" +
                  feature.properties.label +
                  "</a><br/><img src=" +
                  feature.properties.depiction +
                  ' style="width:50px">'
              );
              return marker;
            }
          }
        })
          .addTo(markerGroup)
          .on("click", function(e) {
            marker = leaflet.marker(e.latlng);
            marker.addTo(markerGroup);
            mapPositionHandler.setMarkerPosition(
              e.target.latlng ? e.target.latlng : e.latlng
            );
            gameData.setRoundInit(true);
            $("#checkLocationButton").removeAttr("disabled");
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
