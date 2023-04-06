// components/FullScreenMap.tsx
import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

interface FullScreenMapProps {
  zoom: number;
  center: [number, number];
}

const FullScreenMap: React.FC<FullScreenMapProps> = ({ zoom, center }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [osmLayer],
      view: new View({
        center: center,
        zoom: zoom,
      }),
    });

    return () => {
      map.setTarget();
    };
  }, [mapRef, center, zoom]);

  return (
    <div
      ref={mapRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default FullScreenMap;
