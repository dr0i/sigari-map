# sigari-map
[See live](https://www.dr0i.de/lib/gadel/sigari-map/).

Map of the fantasy world [Gadel](https://gadel.org/).

The map shows`Sigari` and some smaller islands.

The map is embedded and served using the excellent [mapwarper](https://mapwarper.net/).

Code is based on [nwbib-quiz](https://github.com/dr0i/nwbib-quiz).

# the idea
A fantasy world map is put into a normal [OSM](https://openstreetmap.org) world map using [mapwarper](https://mapwarper.net/). Using the `leaflet` javascript library we than can utilize a `geojson` file to create markers on the map with fantasy geo coordinates. We can move in the map like in any normal world map. Using leaflet we can caclulate the distance between points (which is quite helpful and a better way than annoying the Dungeon Master with "how long to travel from A to B"?).
The middle of the map resides on Earth with latitude 0 and longitude 0. Scroll long enough to the sides and you will eventually hit some real land (Africa to the east). The fantasy map is on such a scale that it is a long way to go, deliberately though.

# Look of the map

![Sigari screenshot](/doc/screenshot_sigariMapElfenwald.jpg)

# Usage of map
* Zoom as always
* Note the ruler icon beneath the zooming icons: activate it, click on the map once and again at another point: the distance between these points is calculated in km and horse travelling time.
* Hover over a marker and see the top left image change to reflect the graphic associated with the marker. Also, the image has a title and a link to the diaries with the according search phrase for the thing depicted at the image.
* doubleclick to get the lat/lon. Note when using this data in `places_01.geojson` the first value (lat) is the second entry and the second (lon) the first one. Well, sometimes it's vice versa. Try it out.

# License
Copyright 2020 Pascal Christoph (dr0i)

Licensed under the MIT License.
.
