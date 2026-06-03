import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { CONTACT } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

declare global {
  interface Window { L: any; }
}

interface SuburbData {
  lat: number;
  lng: number;
  region: string;
  zoom: number;
}

// Every suburb has its own precise coordinates + region assignment
const SUBURBS: Record<string, SuburbData> = {
  // CBD & Inner
  "Melbourne CBD":  { lat: -37.8136, lng: 144.9631, region: "CBD & Inner", zoom: 14 },
  "South Yarra":    { lat: -37.8394, lng: 144.9896, region: "CBD & Inner", zoom: 15 },
  "Richmond":       { lat: -37.8230, lng: 145.0002, region: "CBD & Inner", zoom: 15 },
  "Collingwood":    { lat: -37.8034, lng: 144.9935, region: "CBD & Inner", zoom: 15 },
  "Fitzroy":        { lat: -37.7995, lng: 144.9779, region: "CBD & Inner", zoom: 15 },
  "Carlton":        { lat: -37.7990, lng: 144.9670, region: "CBD & Inner", zoom: 15 },
  // Eastern Suburbs
  "Balwyn":         { lat: -37.8122, lng: 145.0864, region: "Eastern Suburbs", zoom: 14 },
  "Camberwell":     { lat: -37.8254, lng: 145.0594, region: "Eastern Suburbs", zoom: 14 },
  "Box Hill":       { lat: -37.8199, lng: 145.1208, region: "Eastern Suburbs", zoom: 14 },
  "Doncaster":      { lat: -37.7878, lng: 145.1228, region: "Eastern Suburbs", zoom: 14 },
  "Ringwood":       { lat: -37.8153, lng: 145.2281, region: "Eastern Suburbs", zoom: 14 },
  "Croydon":        { lat: -37.7960, lng: 145.2824, region: "Eastern Suburbs", zoom: 14 },
  "Lilydale":       { lat: -37.7577, lng: 145.3459, region: "Eastern Suburbs", zoom: 14 },
  // South East
  "Dandenong":      { lat: -37.9878, lng: 145.2150, region: "South East", zoom: 14 },
  "Hallam":         { lat: -38.0372, lng: 145.2645, region: "South East", zoom: 14 },
  "Berwick":        { lat: -38.0353, lng: 145.3418, region: "South East", zoom: 14 },
  "Narre Warren":   { lat: -38.0284, lng: 145.3005, region: "South East", zoom: 14 },
  "Frankston":      { lat: -38.1432, lng: 145.1257, region: "South East", zoom: 14 },
  "Pakenham":       { lat: -38.0713, lng: 145.4878, region: "South East", zoom: 13 },
  // Northern Suburbs
  "Craigieburn":    { lat: -37.6013, lng: 144.9380, region: "Northern Suburbs", zoom: 14 },
  "Epping":         { lat: -37.6460, lng: 145.0207, region: "Northern Suburbs", zoom: 14 },
  "Bundoora":       { lat: -37.7055, lng: 145.0620, region: "Northern Suburbs", zoom: 14 },
  "Preston":        { lat: -37.7449, lng: 145.0707, region: "Northern Suburbs", zoom: 14 },
  "Coburg":         { lat: -37.7436, lng: 144.9655, region: "Northern Suburbs", zoom: 14 },
  "Brunswick":      { lat: -37.7674, lng: 144.9618, region: "Northern Suburbs", zoom: 15 },
  // Western Suburbs
  "Point Cook":     { lat: -37.8994, lng: 144.7535, region: "Western Suburbs", zoom: 14 },
  "Werribee":       { lat: -37.9023, lng: 144.6629, region: "Western Suburbs", zoom: 14 },
  "Hoppers Crossing":{ lat: -37.8826, lng: 144.6997, region: "Western Suburbs", zoom: 14 },
  "Sunshine":       { lat: -37.7887, lng: 144.8311, region: "Western Suburbs", zoom: 14 },
  "Footscray":      { lat: -37.8006, lng: 144.8997, region: "Western Suburbs", zoom: 15 },
  // Bayside
  "Brighton":       { lat: -37.9086, lng: 145.0017, region: "Bayside", zoom: 14 },
  "Sandringham":    { lat: -37.9510, lng: 145.0067, region: "Bayside", zoom: 14 },
  "Cheltenham":     { lat: -37.9535, lng: 145.0596, region: "Bayside", zoom: 14 },
  "Mentone":        { lat: -37.9768, lng: 145.0605, region: "Bayside", zoom: 14 },
  "Moorabbin":      { lat: -37.9377, lng: 145.0436, region: "Bayside", zoom: 14 },
  // Mornington Peninsula
  "Mornington":     { lat: -38.2196, lng: 145.0377, region: "Mornington Peninsula", zoom: 14 },
  "Mount Eliza":    { lat: -38.1916, lng: 145.0863, region: "Mornington Peninsula", zoom: 14 },
  "Rosebud":        { lat: -38.3572, lng: 144.9044, region: "Mornington Peninsula", zoom: 14 },
  "Rye":            { lat: -38.3724, lng: 144.8288, region: "Mornington Peninsula", zoom: 14 },
};

const SERVICE_REGIONS = [
  { name: "CBD & Inner",          lat: -37.813, lng: 144.963, radius: 6000,  color: "#1B4D8F", fill: "rgba(27,77,143,0.12)"   },
  { name: "Eastern Suburbs",      lat: -37.820, lng: 145.160, radius: 18000, color: "#E8622A", fill: "rgba(232,98,42,0.10)"   },
  { name: "South East",           lat: -37.970, lng: 145.210, radius: 20000, color: "#0D9488", fill: "rgba(13,148,136,0.10)"  },
  { name: "Northern Suburbs",     lat: -37.680, lng: 144.990, radius: 18000, color: "#7C3AED", fill: "rgba(124,58,237,0.10)"  },
  { name: "Western Suburbs",      lat: -37.820, lng: 144.760, radius: 16000, color: "#D97706", fill: "rgba(217,119,6,0.10)"   },
  { name: "Bayside",              lat: -37.930, lng: 145.000, radius: 10000, color: "#2563EB", fill: "rgba(37,99,235,0.10)"   },
  { name: "Mornington Peninsula", lat: -38.150, lng: 145.050, radius: 18000, color: "#DB2777", fill: "rgba(219,39,119,0.10)" },
];

const PINS = [
  { name: "AGG Doors HQ", lat: -38.037, lng: 145.265, type: "hq" },
  { name: "Melbourne CBD",  lat: -37.813, lng: 144.963, type: "area" },
  { name: "Ringwood",       lat: -37.815, lng: 145.228, type: "area" },
  { name: "Frankston",      lat: -38.143, lng: 145.126, type: "area" },
  { name: "Craigieburn",    lat: -37.601, lng: 144.938, type: "area" },
  { name: "Werribee",       lat: -37.902, lng: 144.663, type: "area" },
  { name: "Brighton",       lat: -37.909, lng: 145.000, type: "area" },
];

export default function ServiceAreas() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const circlesRef = useRef<Record<string, any>>({});
  const suburbMarkerRef = useRef<any>(null);
  const [activeSuburb, setActiveSuburb] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const flyToSuburb = (suburbName: string) => {
    const data = SUBURBS[suburbName];
    const map = mapInstanceRef.current;
    if (!data || !map) return;

    setActiveSuburb(suburbName);
    setActiveRegion(data.region);

    // Dim all circles, highlight the suburb's region
    Object.entries(circlesRef.current).forEach(([name, circle]) => {
      if (name === data.region) {
        circle.setStyle({ weight: 3, opacity: 1, fillOpacity: 0.35, dashArray: "" });
      } else {
        circle.setStyle({ weight: 1.5, opacity: 0.25, fillOpacity: 0.05, dashArray: "6 4" });
      }
    });

    // Remove previous suburb marker
    if (suburbMarkerRef.current) {
      suburbMarkerRef.current.remove();
      suburbMarkerRef.current = null;
    }

    // Drop a precise suburb pin
    const L = (window as any).L;
    if (L) {
      const regionColor = SERVICE_REGIONS.find(r => r.name === data.region)?.color ?? "#1B4D8F";
      const suburbIcon = L.divIcon({
        html: `<div style="
          position:relative;
          width:32px;height:32px;
          display:flex;align-items:center;justify-content:center;
        ">
          <div style="
            width:32px;height:32px;
            background:${regionColor};
            border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            border:3px solid white;
            box-shadow:0 3px 14px ${regionColor}80;
          "></div>
          <div style="
            position:absolute;
            width:10px;height:10px;
            background:white;
            border-radius:50%;
            top:50%;left:50%;
            transform:translate(-50%,-54%) rotate(0deg);
          "></div>
        </div>`,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -36],
      });

      const marker = L.marker([data.lat, data.lng], { icon: suburbIcon }).addTo(map);
      marker.bindPopup(
        `<div style="font-family:sans-serif;padding:6px 2px;min-width:140px;">
          <div style="font-weight:800;font-size:13px;color:${regionColor};margin-bottom:3px;">📍 ${suburbName}</div>
          <div style="font-size:11px;color:#666;margin-bottom:6px;">${data.region}</div>
          <a href="${CONTACT.phoneTel}" style="display:inline-block;background:${regionColor};color:white;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:700;text-decoration:none;">📞 Book a Tech</a>
        </div>`,
        { closeButton: true, maxWidth: 220 }
      ).openPopup();

      suburbMarkerRef.current = marker;
    }

    map.flyTo([data.lat, data.lng], data.zoom, { duration: 0.85, easeLinearity: 0.4 });
  };

  const flyToRegion = (regionName: string) => {
    const region = SERVICE_REGIONS.find(r => r.name === regionName);
    const map = mapInstanceRef.current;
    if (!region || !map) return;

    setActiveSuburb(null);
    setActiveRegion(regionName);

    if (suburbMarkerRef.current) {
      suburbMarkerRef.current.remove();
      suburbMarkerRef.current = null;
    }

    Object.entries(circlesRef.current).forEach(([name, circle]) => {
      if (name === regionName) {
        circle.setStyle({ weight: 3, opacity: 1, fillOpacity: 0.35, dashArray: "" });
      } else {
        circle.setStyle({ weight: 1.5, opacity: 0.25, fillOpacity: 0.05, dashArray: "6 4" });
      }
    });

    map.flyTo([region.lat, region.lng], 11, { duration: 0.85 });
  };

  const resetMap = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    setActiveSuburb(null);
    setActiveRegion(null);

    if (suburbMarkerRef.current) {
      suburbMarkerRef.current.remove();
      suburbMarkerRef.current = null;
    }

    Object.values(circlesRef.current).forEach((circle: any) => {
      circle.setStyle({ weight: 2, opacity: 0.7, fillOpacity: 0.5, dashArray: "6 4" });
    });

    map.flyToBounds([[-38.35, 144.55], [-37.45, 145.55]], { duration: 0.8 });
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      (window as any).L = L;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [-37.87, 144.98],
        zoom: 10,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      SERVICE_REGIONS.forEach((region) => {
        const circle = L.circle([region.lat, region.lng], {
          radius: region.radius,
          color: region.color,
          fillColor: region.fill,
          fillOpacity: 0.5,
          weight: 2,
          dashArray: "6 4",
          opacity: 0.7,
        }).addTo(map);

        circle.bindTooltip(
          `<div style="font-family:sans-serif;font-size:12px;font-weight:700;color:${region.color};padding:4px 8px;border-radius:6px;white-space:nowrap;">${region.name}</div>`,
          { permanent: false, sticky: true, className: "leaflet-region-tooltip" }
        );

        circle.on("click", () => flyToRegion(region.name));
        circlesRef.current[region.name] = circle;
      });

      const hqIcon = L.divIcon({
        html: `<div style="
          width:36px;height:36px;
          background:linear-gradient(135deg,#E8622A,#F08050);
          border-radius:50%;
          border:3px solid white;
          box-shadow:0 2px 12px rgba(232,98,42,0.6);
          display:flex;align-items:center;justify-content:center;
          font-size:16px;color:white;font-weight:900;
        ">★</div>`,
        className: "",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -22],
      });

      const areaIcon = () => L.divIcon({
        html: `<div style="
          width:28px;height:28px;
          background:#1B4D8F;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          border:2px solid white;
          box-shadow:0 2px 8px rgba(27,77,143,0.5);
        "><div style="transform:rotate(45deg);width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
          <div style="width:6px;height:6px;background:white;border-radius:50%;"></div>
        </div></div>`,
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -30],
      });

      PINS.forEach((pin) => {
        const icon = pin.type === "hq" ? hqIcon : areaIcon();
        const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(map);

        const popupContent = pin.type === "hq"
          ? `<div style="font-family:sans-serif;min-width:160px;padding:4px;">
              <div style="font-weight:800;font-size:13px;color:#E8622A;margin-bottom:4px;">★ ${pin.name}</div>
              <div style="font-size:11px;color:#555;margin-bottom:6px;">10 Dallas Court, Hallam VIC 3803</div>
              <a href="tel:0387899377" style="display:inline-block;background:#E8622A;color:white;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:700;text-decoration:none;">📞 03 8789 9377</a>
            </div>`
          : `<div style="font-family:sans-serif;padding:4px;">
              <div style="font-weight:700;font-size:12px;color:#1B4D8F;">${pin.name}</div>
              <div style="font-size:11px;color:#777;margin-top:2px;">Service area</div>
            </div>`;

        marker.bindPopup(popupContent, { closeButton: true, maxWidth: 220 });
      });

      map.zoomControl.setPosition("bottomright");
      map.fitBounds([[-38.35, 144.55], [-37.45, 145.55]]);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section id="service-areas" className="section bg-surface">
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">Coverage</span>
          <h2 className="h-section">We Cover All of Melbourne</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            From the CBD to the outer suburbs — our technicians are positioned
            across Melbourne for fast response times wherever you are. Click a
            suburb to pinpoint it on the map.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          {/* Left: pill cloud + legend */}
          <ScrollReveal direction="left">
            <div className="rounded-2xl border border-border bg-surface-raised p-7 shadow-card">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-light">Suburbs we service</p>
                {(activeSuburb || activeRegion) && (
                  <button
                    onClick={resetMap}
                    className="text-xs font-semibold text-brand hover:underline"
                  >
                    Reset map ↺
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(SUBURBS).map(([suburb, data]) => {
                  const regionData = SERVICE_REGIONS.find(r => r.name === data.region);
                  const isActive = activeSuburb === suburb;
                  const isRegionActive = activeRegion === data.region && !activeSuburb;
                  const isDimmed = activeRegion !== null && activeRegion !== data.region;

                  return (
                    <button
                      key={suburb}
                      onClick={() => flyToSuburb(suburb)}
                      className="rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        borderColor: isActive
                          ? regionData?.color
                          : isRegionActive
                          ? `${regionData?.color}60`
                          : isDimmed
                          ? "rgba(0,0,0,0.07)"
                          : undefined,
                        background: isActive
                          ? `${regionData?.color}18`
                          : isRegionActive
                          ? `${regionData?.color}08`
                          : "transparent",
                        color: isActive
                          ? regionData?.color
                          : isRegionActive
                          ? `${regionData?.color}cc`
                          : isDimmed
                          ? "#bbb"
                          : undefined,
                        transform: isActive ? "translateY(-2px)" : undefined,
                        boxShadow: isActive ? `0 2px 8px ${regionData?.color}40` : undefined,
                      }}
                    >
                      {suburb}
                    </button>
                  );
                })}
                <span className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-dashed border-brand/40 bg-brand/5 px-3 py-1.5 text-xs font-semibold text-brand">
                  + many more
                </span>
              </div>
              <p className="mt-5 text-sm text-ink-soft">
                Not seeing your suburb?{" "}
                <a href={CONTACT.phoneTel} className="font-semibold text-brand hover:underline">
                  Call us
                </a>{" "}
                — we'll confirm in seconds.
              </p>
            </div>

            {/* Region legend */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {SERVICE_REGIONS.map(({ name, color }) => {
                const isActive = activeRegion === name;
                return (
                  <button
                    key={name}
                    onClick={() => isActive ? resetMap() : flyToRegion(name)}
                    className="flex items-center gap-2 rounded-lg border px-3 py-2 text-left transition-all duration-150 hover:-translate-y-0.5"
                    style={{
                      borderColor: isActive ? color : undefined,
                      background: isActive ? `${color}12` : undefined,
                    }}
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-150"
                      style={{
                        background: color,
                        transform: isActive ? "scale(1.4)" : "scale(1)",
                        boxShadow: isActive ? `0 0 6px ${color}80` : undefined,
                      }}
                    />
                    <span
                      className="text-xs font-medium transition-colors duration-150"
                      style={{ color: isActive ? color : undefined }}
                    >
                      {name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* CTA */}
            <a
              href={CONTACT.phoneTel}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand/90 hover:shadow-md"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {CONTACT.phone} — Call the Melbourne Team
            </a>
          </ScrollReveal>

          {/* Right: Leaflet map */}
          <ScrollReveal direction="right" delay={120}>
            <div
              className="overflow-hidden rounded-2xl border border-border shadow-card"
              style={{ height: "520px", position: "relative" }}
            >
              <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

              <div
                className="pointer-events-none absolute left-3 top-3 z-[1000] rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
                style={{ background: "rgba(15,27,45,0.75)", backdropFilter: "blur(8px)" }}
              >
                Greater Melbourne — Service Coverage
              </div>

              {(activeSuburb || activeRegion) && (
                <div
                  className="pointer-events-none absolute bottom-10 left-3 z-[1000] rounded-lg px-3 py-1.5 text-xs font-semibold text-white"
                  style={{
                    background: SERVICE_REGIONS.find(r => r.name === activeRegion)?.color ?? "#1B4D8F",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  {activeSuburb ? `📍 ${activeSuburb}` : `📍 ${activeRegion}`}
                </div>
              )}
            </div>

            <p className="mt-2.5 text-center text-xs text-ink-light">
              🖱 Click a suburb pill to pinpoint it · Drag to pan · Scroll to zoom
            </p>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        .leaflet-region-tooltip {
          background: white !important;
          border: none !important;
          box-shadow: 0 2px 12px rgba(0,0,0,0.15) !important;
          border-radius: 8px !important;
          padding: 0 !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 10px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.18) !important;
        }
        .leaflet-popup-tip-container { display: none; }
      `}</style>
    </section>
  );
}
