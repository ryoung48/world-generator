# Procedural World Generator

The goal of this project is to create a complex earth-like simulation set loosely in the early renaissance period with fantasy elements mixed in to be used by authors|game designers|AI to build interesting procedural settings|plots|novels. The application is currently able to produce detailed procedurally generated global maps with different map modes showing nations, religions, climates, populations, and more. A live demo is available [here](https://rayoung788.gitlab.io/world-generator/). **WARNING:** This application is optimized for 1920x1080 resolution and is not built at all for mobile devices. The high number of polygons being rendered might also make it slow to operate on less powerful machines. Generation typically takes between 20-30 seconds. The same seed will create the same map.

![developed regions](./gallery/globe_1.gif)
*Zoomed out view of the globe focused on a large continent in the southern hemisphere (1ichxt6fy91)*

## Concepts
1. Cells: The map is divided into thousands of voronoi cells. Cells are mostly responsible for holding granular geographic and climate information (elevation, temperature, precipitation, etc). They are the smallest unit of spatial resolution.
2. Provinces: Each cell belongs to a province. Provinces are responsible for holding specific places of interest, roads, and basic demographic information for a general area.
3. Regions: Each province belongs to a region. Regions are collections of provinces that share the same culture group (religion, language, traditions, etc.). Culture groups typically span multiple regions, where each region is considered a distinct subgroup of that culture.
3. Nations: Each province is governed by a nation, which may or may not be the same as the region. Conquered regions are shown in gray text when their capital province is owned by another nation.

## Map Modes
1. Nations: This mode shows international borders (the board brush strokes in the same color as the ruling nation's heraldry) and regional borders (thinner lines in the same color as the region's heraldry). Contested territories (red stripes) are used to show wars between different nations.
2. Cultures: This mode shows the different culture groups, where the same international borders are shown in the same color as the ruling culture.
3. Religions: This map mode shows the primary type of religion practiced in each nation. One should assume that there are many other minority religions that are also practiced, but are too small to show in this mode and are currently not implemented.
4. Government: This mode shows how each nation is governed.
5. Development: This mode shows the technological development of each region.  
6. Population: This mode shows the population density of each province. Population density is derived from climate, distance to coast, and development.
7. Climate: This mode shows the climate (holdridge life zone) of each province. Due to the large number of climate classifications, the legend will only show those within the same latitude group as the selected nation / settlement. Why not Koppen climates? While holdridge is less accurate in practice, it is more detailed and easier to work with.
8. Elevation: This shows the elevation of *each cell* - that means this mode will be slightly slower than the rest. This is done at the cell level to show higher detail near mountainous regions.
9. Temperature: This shows average monthly temperature of *each cell* - that means this mode will be slightly slower than the rest. This is done at the cell level to show higher detail near mountainous regions. Months can be adjusted using the slider.
10. Rain: This shows average monthly precipitation of each province. This is not done at the cell level because I am currently not satisfied with the way higher altitude precipitation is modeled (its method for determine wet and dry side of mountains is crude). Months can be adjusted using the slider.

## Gallery

![developed regions](./gallery/nations_1.gif)
*Zoomed in regional view of a highly developed nation in the southern hemisphere (1ichxt6fy91)*

![developed regions](./gallery/arctic_1.gif)
*Zoomed out view of the globe focused on the arctic circle (1ichxt6fy91)*

![developed regions](./gallery/tropics_2.gif)
*Zoomed in view of a large island in the tropics (1s1qo5mm3kn)*

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Inspirations
1. http://www-cs-students.stanford.edu/~amitp/game-programming/polygon-map-generation/
2. https://azgaar.wordpress.com/
3. https://mewo2.com/notes/naming-language/
4. https://heredragonsabound.blogspot.com/
5. https://forhinhexes.blogspot.com/2019/04/history-vi-it-is-well-that-war-is-so.html
6. https://www.patreon.com/Elyden/posts
7. https://undiscoveredworlds.blogspot.com/

### Icons:
1. https://kmalexander.com/free-stuff/fantasy-map-brushes/
2. https://www.deviantart.com/starraven/art/Sketchy-Cartography-Brushes-198264358
3. https://www.deviantart.com/eragon2589/art/Cartography-brushes-498111706

### Clouds:
1. https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57747/cloud_combined_2048.jpg
