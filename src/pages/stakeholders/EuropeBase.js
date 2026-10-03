import React, { useEffect, useState } from "react";
import { GeoJSON, Pane } from "react-leaflet";
import { feature } from "topojson-client";

// Vector basemap drawn from Natural Earth (via world-atlas), so the map
// works without any external tile server. Clipped to a Europe window.
const BOUNDS = { minLon: -32, maxLon: 48, minLat: 26, maxLat: 72 };

function intersectsEurope(f) {
  let hit = false;
  const visit = (coords) => {
    if (hit) return;
    if (typeof coords[0] === "number") {
      const [lon, lat] = coords;
      if (lon > BOUNDS.minLon && lon < BOUNDS.maxLon && lat > BOUNDS.minLat && lat < BOUNDS.maxLat) hit = true;
      return;
    }
    coords.forEach(visit);
  };
  visit(f.geometry.coordinates);
  return hit;
}

export const EuropeBase = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    let live = true;
    import("world-atlas/countries-50m.json").then((mod) => {
      const world = mod.default || mod;
      const fc = feature(world, world.objects.countries);
      if (live)
        setData({ type: "FeatureCollection", features: fc.features.filter((f) => f.geometry && intersectsEurope(f)) });
    });
    return () => {
      live = false;
    };
  }, []);
  if (!data) return null;

  return (
    <Pane name="basemap" style={{ zIndex: 200 }}>
      <GeoJSON
        data={data}
        interactive={false}
        style={{ color: "#c3cfd3", weight: 0.8, fillColor: "#fbfcfc", fillOpacity: 1 }}
      />
    </Pane>
  );
};
