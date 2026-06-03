import { useEffect, useRef } from "react";
import { Phone } from "lucide-react";
import { CONTACT } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

// Leaflet loaded dynamically to avoid SSR issues
declare global {
  interface Window { L: any; }
}

const SUBURB_PILLS = [
  "Melbourne CBD", "South Yarra", "Richmond", "Collingwood", "Fitzroy", "Carlton",
  "Balwyn", "Camberwell", "Box Hill", "Doncaster", "Ringwood", "Croydon", "Lilydale",
  "Dandenong", "Hallam", "Berwick", "Narre Warren", "Frankston", "Pakenham",
  "Craigieburn", "Epping", "Bundoora", "Preston", "Coburg", "Brunswick",
  "Point Cook", "Werribee", "Hoppers Crossing", "Sunshine", "Footscray",
  "Brighton", "Sandringham", "Cheltenham", "Mentone", "Moorabbin",
  "Mornington", "Mount Eliza", "Rosebud", "Rye",
];

// Service regions with approx centre coords, radius (km), label colour
const SERVICE_REGIONS = [
  { name: "CBD & Inner",        lat: -37.813, lng: 144.963, radius: 6000,  color: "#1B4D8F", fill: "rgba(27,77,143,0.12)"   },
  { name: "Eastern Suburbs",    lat: -37.820, lng: 145.160, radius: 18000, color: "#E8622A", fill: "rgba(232,98,42,0.10)"   },
  { name: "South East",         lat: -37.970, lng: 145.210, radius: 20000, color: "#0D9488", fill: "rgba(13,148,136,0.10)"  },
  { name: "Northern Suburbs",   lat: -37.680, lng: 144.990, radius: 18000, color: "#7C3AED", fill: "rgba(124,58,237,0.10)"  },
  { name: "Western Suburbs",    lat: -37.820, lng: 144.760, radius: 16000, color: "#D97706", fill: "rgba(217,119,6,0.10)"   },
  { name: "Bayside",            lat: -37.930, lng: 145.000, radius: 10000, color: "#2563EB", fill: "rgba(37,99,235,0.10)"   },
  { name: "Mornington Peninsula",lat: -38.150, lng: 145.050, radius: 18000, color: "#DB2777", fill: "rgba(219,39,119,0.10)" },
];

// Notable pin locations
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

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import leaflet
    import("leaflet").then((L) => {
      // Fix default icon paths (common Webpack/Vite issue)
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

      // Dark/styled tile layer using CartoDB Dark Matter
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      // Draw service region circles
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
      });

      // HQ star icon
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

      // Area pin icon
      const areaIcon = (label: string) => L.divIcon({
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

      // Add pins
      PINS.forEach((pin) => {
        const icon = pin.type === "hq" ? hqIcon : areaIcon(pin.name);
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

        marker.bindPopup(popupContent, {
          closeButton: true,
          maxWidth: 220,
        });
      });

      // Custom zoom control position
      map.zoomControl.setPosition("bottomright");

      // Fit Melbourne bounds roughly
      map.fitBounds([
        [-38.35, 144.55],
        [-37.45, 145.55],
      ]);
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
            across Melbourne for fast response times wherever you are. Pan,
            zoom and click pins to explore our coverage.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          {/* Left: pill cloud + legend */}
          <ScrollReveal direction="left">
            <div className="rounded-2xl border border-border bg-surface-raised p-7 shadow-card">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-ink-light">Suburbs we service</p>
              <div className="flex flex-wrap gap-2">
                {SUBURB_PILLS.map((suburb) => (
                  <span
                    key={suburb}
                    className="cursor-default rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand/[0.06] hover:text-brand"
                  >
                    {suburb}
                  </span>
                ))}
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
              {SERVICE_REGIONS.map(({ name, color }) => (
                <div
                  key={name}
                  className="flex items-center gap-2 rounded-lg border border-border bg-surface-raised px-3 py-2"
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: color }} />
                  <span className="text-xs font-medium text-ink-soft">{name}</span>
                </div>
              ))}
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

          {/* Right: interactive Leaflet map */}
          <ScrollReveal direction="right" delay={120}>
            <div
              className="overflow-hidden rounded-2xl border border-border shadow-card"
              style={{ height: "520px", position: "relative" }}
            >
              {/* Map container */}
              <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

              {/* Map overlay label */}
              <div
                className="pointer-events-none absolute left-3 top-3 z-[1000] rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
                style={{ background: "rgba(15,27,45,0.75)", backdropFilter: "blur(8px)" }}
              >
                Greater Melbourne — Service Coverage
              </div>
            </div>

            {/* Map hint */}
            <p className="mt-2.5 text-center text-xs text-ink-light">
              🖱 Drag to pan · Scroll to zoom · Click pins for details
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Leaflet tooltip style override */}
      <style>{`
        .leaflet-region-tooltip {
          background: white !important;
          border: none !important;
          box-shadow: 0 2px 12px rgba(0,0,0,0.15) !important;
          border-radius: 8px !important;
          padding: 0 !important;
        }
        .leaflet-region-tooltip .leaflet-tooltip-left::before,
        .leaflet-region-tooltip .leaflet-tooltip-right::before {
          display: none;
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
