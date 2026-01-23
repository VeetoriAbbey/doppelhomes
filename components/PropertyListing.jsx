import Link from "next/link";
import PropertyCard from "../app/components/PropertyCard";
import { properties } from "../app/data/properties";

export default function PropertyListing() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h6 className="text-sm font-semibold text-primary text-green-500">
              | Properties
            </h6>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Featured Listings
            </h2>
          </div>

          <Link
            href="/properties/all"
            className="mt-4 md:mt-0 inline-block px-6 py-2.5 rounded-lg border border-primary text-primary font-medium hover:bg-green-500 hover:text-green transition"
          >
            View More
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, 3).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
