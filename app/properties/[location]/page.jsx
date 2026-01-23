import { properties } from "@/app/data/properties";
import LocationMap from "@/app/components/LocationMap";
import LocationPagePagination from "@/app/components/LocationPagePagination";
import PropertyHeader from "../../components/PropertyHeader";

/* ---------- HELPERS ---------- */
const validAreas = Array.from(
  new Set(
    properties
      .map((p) => p.area)
      .filter((area) => typeof area === "string" && area.length > 0)
  )
);

/* ---------- SEO ---------- */
export async function generateMetadata({ params }) {
  const { location } = await params;

  const safeLocation =
    typeof location === "string" ? location : "all";

  const locationName =
    safeLocation === "all"
      ? "All Locations"
      : safeLocation.replace(/-/g, " ");
      

  return {
    title: `Properties in ${locationName} | Doppel Homes`,
    description: `Explore verified properties in ${locationName}, Abuja.`,
  };
}

/* ---------- PAGE ---------- */
export default async function LocationPage({ params }) {
  const { location } = await params;

  const safeLocation =
    typeof location === "string" ? location : "all";

  // ❌ Invalid route guard
  if (safeLocation !== "all" && !validAreas.includes(safeLocation)) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20">
        <p className="text-red-500 font-semibold">
          Invalid location selected.
        </p>
      </section>
    );
  }

  const isAll = safeLocation === "all";

  const filteredProperties = isAll
    ? properties
    : properties.filter((p) => p.area === safeLocation);

  const displayLocation = isAll
    ? "All Locations"
    : safeLocation.replace(/-/g, " ");

  return (

    <section className="max-w-7xl mx-auto px-4 py-20">
      <PropertyHeader
  image="/images/property-banner.jpg"
  location={displayLocation}
/>


      {/* ✅ PAGINATED GRID */}
      <LocationPagePagination properties={filteredProperties} />

  {/* ✅ MAP WITH MULTIPLE PROPERTY MARKERS */}
{filteredProperties.length > 0 && (
  <div className="mt-16">
    <LocationMap
  properties={filteredProperties}
  area={safeLocation}
/>

  </div>
)}
    </section>
  );
}

/* ---------- STATIC PARAMS ---------- */
export async function generateStaticParams() {
  return [
    { location: "all" },
    ...validAreas.map((area) => ({
      location: area,
    })),
  ];
}
