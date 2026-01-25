"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapMarker {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  color: string;
  viabilityScore: number;
}

interface CanadaMapProps {
  markers: MapMarker[];
  selectedId: string | null;
  onMarkerClick: (id: string) => void;
  categoryColor: string;
  showHotZones?: boolean;
}

interface TooltipState {
  show: boolean;
  x: number;
  y: number;
  name: string;
  score: number;
  isHot: boolean;
}

export default function CanadaMap({ markers, selectedId, onMarkerClick, categoryColor, showHotZones = false }: CanadaMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState>({ show: false, x: 0, y: 0, name: "", score: 0, isHot: false });
  const initRef = useRef(false);

  const HOT_THRESHOLD = 80;

  const getScoreColor = useCallback((score: number) => {
    if (score >= 80) return "#2ECC71";
    if (score >= 60) return "#F1C40F";
    return "#E74C3C";
  }, []);

  // Initialize map ONCE
  useEffect(() => {
    if (!mapContainer.current || initRef.current) return;
    initRef.current = true;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          "carto-dark": {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
              "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
              "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
            ],
            tileSize: 256,
            attribution: "© CARTO © OpenStreetMap contributors",
          },
        },
        layers: [
          {
            id: "carto-dark-layer",
            type: "raster",
            source: "carto-dark",
            minzoom: 0,
            maxzoom: 20,
          },
        ],
      },
      center: [-96.5, 56],
      zoom: 3.2,
      minZoom: 2,
      maxZoom: 12,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

    map.on("load", () => {
      // Hot zones source
      map.addSource("hot-zones", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      map.addLayer({
        id: "hot-zones-glow",
        type: "circle",
        source: "hot-zones",
        paint: {
          "circle-radius": 50,
          "circle-color": "#FF6B35",
          "circle-opacity": 0.15,
          "circle-blur": 1,
        },
      });

      map.addLayer({
        id: "hot-zones-inner",
        type: "circle",
        source: "hot-zones",
        paint: {
          "circle-radius": 30,
          "circle-color": "#FF6B35",
          "circle-opacity": 0.25,
          "circle-blur": 0.8,
        },
      });

      // Sites source
      map.addSource("sites", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      map.addLayer({
        id: "sites-glow",
        type: "circle",
        source: "sites",
        paint: {
          "circle-radius": 16,
          "circle-color": "#00D4AA",
          "circle-opacity": 0.3,
          "circle-blur": 1,
        },
      });

      map.addLayer({
        id: "sites-circle",
        type: "circle",
        source: "sites",
        paint: {
          "circle-radius": 10,
          "circle-color": "#00D4AA",
          "circle-stroke-width": 2,
          "circle-stroke-color": "rgba(255,255,255,0.5)",
        },
      });

      map.addLayer({
        id: "hot-badge",
        type: "circle",
        source: "sites",
        filter: [">=", ["get", "viabilityScore"], 80],
        paint: {
          "circle-radius": 5,
          "circle-color": "#FFD700",
          "circle-stroke-width": 1,
          "circle-stroke-color": "#FF6B35",
          "circle-translate": [8, -8],
        },
      });

      mapRef.current = map;
      setMapReady(true);
    });

    return () => {
      map.remove();
      mapRef.current = null;
      initRef.current = false;
      setMapReady(false);
    };
  }, []);

  // Update category color in layers
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    try {
      // Update glow color
      map.setPaintProperty("sites-glow", "circle-color", [
        "case",
        [">=", ["get", "viabilityScore"], 80],
        "#FF6B35",
        categoryColor
      ]);

      // Update main circle color
      map.setPaintProperty("sites-circle", "circle-color", [
        "case",
        [">=", ["get", "viabilityScore"], 80],
        "#FF6B35",
        categoryColor
      ]);

      // Update stroke color for hot sites
      map.setPaintProperty("sites-circle", "circle-stroke-color", [
        "case",
        [">=", ["get", "viabilityScore"], 80],
        "#FFD700",
        "rgba(255,255,255,0.5)"
      ]);
    } catch (e) {
      console.warn("Could not update paint properties", e);
    }
  }, [categoryColor, mapReady]);

  // Update markers data
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    const geojson: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: markers.map((m) => ({
        type: "Feature",
        id: m.id,
        properties: {
          id: m.id,
          name: m.name,
          viabilityScore: m.viabilityScore,
        },
        geometry: {
          type: "Point",
          coordinates: [m.longitude, m.latitude],
        },
      })),
    };

    try {
      const source = map.getSource("sites") as maplibregl.GeoJSONSource;
      if (source) {
        source.setData(geojson);
      }

      // Update hot zones
      const hotZonesGeojson: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: markers
          .filter((m) => m.viabilityScore >= HOT_THRESHOLD)
          .map((m) => ({
            type: "Feature",
            properties: { id: m.id },
            geometry: {
              type: "Point",
              coordinates: [m.longitude, m.latitude],
            },
          })),
      };

      const hotSource = map.getSource("hot-zones") as maplibregl.GeoJSONSource;
      if (hotSource) {
        hotSource.setData(hotZonesGeojson);
      }

      // Fit bounds to markers if we have any
      if (markers.length > 0) {
        const bounds = new maplibregl.LngLatBounds();
        markers.forEach((m) => bounds.extend([m.longitude, m.latitude]));
        map.fitBounds(bounds, { padding: 60, maxZoom: 6, duration: 1000 });
      }
    } catch (e) {
      console.warn("Could not update markers", e);
    }
  }, [markers, mapReady]);

  // Toggle hot zones visibility
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    try {
      const visibility = showHotZones ? "visible" : "none";
      map.setLayoutProperty("hot-zones-glow", "visibility", visibility);
      map.setLayoutProperty("hot-zones-inner", "visibility", visibility);
    } catch (e) {
      console.warn("Could not toggle hot zones", e);
    }
  }, [showHotZones, mapReady]);

  // Handle hover and click events
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    let hoveredId: string | null = null;

    const onMouseMove = (e: maplibregl.MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => {
      if (!e.features || e.features.length === 0) return;

      const feature = e.features[0];
      const props = feature.properties;

      if (hoveredId !== null && hoveredId !== feature.id) {
        try {
          map.setFeatureState({ source: "sites", id: hoveredId }, { hover: false });
        } catch (e) {}
      }
      hoveredId = feature.id as string;
      try {
        map.setFeatureState({ source: "sites", id: hoveredId }, { hover: true });
      } catch (e) {}

      const score = props?.viabilityScore || 0;
      setTooltip({
        show: true,
        x: e.point.x,
        y: e.point.y,
        name: props?.name || "Unknown",
        score: score,
        isHot: score >= HOT_THRESHOLD,
      });

      map.getCanvas().style.cursor = "pointer";
    };

    const onMouseLeave = () => {
      if (hoveredId !== null) {
        try {
          map.setFeatureState({ source: "sites", id: hoveredId }, { hover: false });
        } catch (e) {}
        hoveredId = null;
      }
      setTooltip((prev) => ({ ...prev, show: false }));
      map.getCanvas().style.cursor = "";
    };

    const onClick = (e: maplibregl.MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => {
      if (!e.features || e.features.length === 0) return;
      const id = e.features[0].properties?.id;
      if (id) onMarkerClick(id);
    };

    map.on("mousemove", "sites-circle", onMouseMove);
    map.on("mouseleave", "sites-circle", onMouseLeave);
    map.on("click", "sites-circle", onClick);

    return () => {
      map.off("mousemove", "sites-circle", onMouseMove);
      map.off("mouseleave", "sites-circle", onMouseLeave);
      map.off("click", "sites-circle", onClick);
    };
  }, [mapReady, onMarkerClick]);

  // Handle selected state
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady || markers.length === 0) return;

    // Use setTimeout to ensure style is ready
    const timer = setTimeout(() => {
      try {
        if (!map.isStyleLoaded()) return;

        markers.forEach((m) => {
          map.setFeatureState(
            { source: "sites", id: m.id },
            { selected: m.id === selectedId }
          );
        });

        if (selectedId) {
          const selected = markers.find((m) => m.id === selectedId);
          if (selected) {
            map.flyTo({
              center: [selected.longitude, selected.latitude],
              zoom: 6,
              duration: 1500,
            });
          }
        }
      } catch (e) {
        console.warn("Could not set selected state", e);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedId, markers, mapReady]);

  const hotCount = markers.filter((m) => m.viabilityScore >= HOT_THRESHOLD).length;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "0 0 12px 12px",
          overflow: "hidden",
        }}
      />

      {/* Tooltip */}
      {tooltip.show && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x + 15,
            top: tooltip.y - 80,
            background: tooltip.isHot 
              ? "linear-gradient(135deg, #2D1810 0%, #1A0F0A 100%)" 
              : "linear-gradient(135deg, #1A2738 0%, #0F1D2B 100%)",
            padding: "14px 18px",
            borderRadius: "10px",
            border: `2px solid ${tooltip.isHot ? "#FF6B35" : categoryColor}`,
            boxShadow: tooltip.isHot 
              ? "0 8px 32px rgba(255,107,53,0.4), 0 0 20px rgba(255,107,53,0.3)"
              : `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${categoryColor}33`,
            zIndex: 1000,
            pointerEvents: "none",
            minWidth: "200px",
          }}
        >
          {tooltip.isHot && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "8px",
              padding: "4px 10px",
              background: "rgba(255,107,53,0.2)",
              borderRadius: "4px",
              width: "fit-content",
            }}>
              <span style={{ fontSize: "12px" }}>🔥</span>
              <span style={{ color: "#FF6B35", fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Hot Opportunity
              </span>
            </div>
          )}
          <div
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: "14px",
              marginBottom: "10px",
              lineHeight: "1.3",
            }}
          >
            {tooltip.name}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 10px",
              background: "rgba(0,0,0,0.3)",
              borderRadius: "6px",
            }}
          >
            <span style={{ color: "#8B9CAD", fontSize: "12px" }}>Viability</span>
            <span
              style={{
                color: getScoreColor(tooltip.score),
                fontWeight: "700",
                fontSize: "18px",
              }}
            >
              {tooltip.score}
            </span>
          </div>
        </div>
      )}

      {/* Loading */}
      {!mapReady && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0A1628",
            color: "#6B7A8C",
            fontSize: "14px",
            borderRadius: "0 0 12px 12px",
          }}
        >
          Loading map...
        </div>
      )}

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          left: "12px",
          backgroundColor: "rgba(26, 39, 56, 0.95)",
          padding: "12px 16px",
          borderRadius: "10px",
          border: "1px solid #2A3A4D",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: categoryColor,
              boxShadow: `0 0 10px ${categoryColor}`,
            }}
          />
          <span style={{ color: "#B8C5D3", fontSize: "12px" }}>
            {markers.length} Total Sites
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#FF6B35",
              boxShadow: "0 0 10px #FF6B35",
            }}
          />
          <span style={{ color: "#FF6B35", fontSize: "12px", fontWeight: "500" }}>
            🔥 {hotCount} Hot Opportunities
          </span>
        </div>
      </div>
    </div>
  );
}
