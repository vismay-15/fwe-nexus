import React, { useEffect, useState } from "react";
import { GeoJSON, Pane } from "react-leaflet";
import { feature } from "topojson-client";

// Simple outline basemap from Natural Earth (public domain, via world-atlas).
// Used when the visitor chooses it, or when map tiles cannot load.

// Rings that cross the 180° meridian jump from +180 to -180 between two
// points, which draws a stray line across the whole map. Unwrapping keeps
// each ring continuous.
function unwrapRing(ring) {
  let offset = 0;
  let prev = ring[0][0];
  return ring.map(([lon, lat]) => {
    const d = lon - prev;
    if (d > 180) offset -= 360;
    else if (d < -180) offset += 360;
    prev = lon;
    return [lon + offset, lat];
  });
}

function unwrap(geom) {
  if (geom.type === "Polygon") return { ...geom, coordinates: geom.coordinates.map(unwrapRing) };
  if (geom.type === "MultiPolygon")
    return { ...geom, coordinates: geom.coordinates.map((poly) => poly.map(unwrapRing)) };
  return geom;
}

export const EuropeBase = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    let live = true;
    import("world-atlas/countries-50m.json").then((mod) => {
      const world = mod.default || mod;
      const fc = feature(world, world.objects.countries);
      const features = fc.features
        .filter((f) => f.geometry && f.properties?.name !== "Antarctica")
        .map((f) => ({ ...f, geometry: unwrap(f.geometry) }));
      if (live) setData({ type: "FeatureCollection", features });
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
        attribution='Outlines: <a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer">Natural Earth</a>'
        style={{ color: "#b9c6cb", weight: 0.8, fillColor: "#fbfcfc", fillOpacity: 1 }}
      />
    </Pane>
  );
};
