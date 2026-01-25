import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { properties } from "@/app/data/properties";

export async function generateMetadata({ params }) {
  // ✅ Next.js 15+: params can be a Promise
  const { id } = await params;
  const pid = Number(id);

  const property = properties.find((p) => Number(p.id) === pid);

  if (!property) {
    return {
      title: "Property not found | Doppel Homes",
      description: "The requested property could not be found.",
    };
  }

  const description =
    property.description ||
    `${property.type} located at ${property.location}. Price: ${property.price}.`;

  return {
    title: `${property.title} | Doppel Homes`,
    description,
  };
}

export default async function PropertyDetailsPage({ params }) {
  // ✅ Next.js 15+: params can be a Promise
  const { id } = await params;
  const pid = Number(id);

  const property = properties.find((p) => Number(p.id) === pid);

  if (!property) return notFound();

  const areaSlug = property.area || "all";
  const areaLabel = areaSlug === "all" ? "All Locations" : areaSlug.replace(/-/g, " ");

  const brief =
    property.description ||
    `${property.bedrooms} bedroom ${property.type} Located at ${property.location} Sitting on a ${property.size} Plot of Land.`;

  return (
    <main className="max-w-6xl mx-auto px-4 py-22">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm text-gray-500">
            <Link className="hover:underline" href="/properties/all">
              Properties
            </Link>{" "}
            /{" "}
            <Link className="hover:underline" href={`/properties/${areaSlug}`}>
              {areaLabel}
            </Link>{" "}
            / <span className="text-gray-700">{property.title}</span>
          </p>

          <h1 className="text-3xl font-bold mt-2">{property.title}</h1>
          <p className="text-gray-600 mt-2">{brief}</p>
        </div>

        <a
          href={property.schedule}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-700 hover:bg-green-500 text-white px-5 py-3 rounded-full transition"
        >
          Schedule a visit
        </a>
      </div>

      <div className="relative w-full h-[360px] rounded-3xl overflow-hidden mt-8">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <section className="mt-10 grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border p-6">
          <h2 className="text-xl font-semibold mb-4">Property Details</h2>

          <ul className="space-y-3 text-gray-700">
            <li>
              <span className="font-medium">Location:</span> {property.location}
            </li>
            <li>
              <span className="font-medium">Area:</span> {areaLabel}
            </li>
            <li>
              <span className="font-medium">Type:</span> {property.type}
            </li>
            <li>
              <span className="font-medium">Bedrooms:</span> {property.bedrooms}
            </li>
            <li>
              <span className="font-medium">Size:</span> {property.size}
            </li>
            <li>
              <span className="font-medium">BQ:</span> {property.BQ ? "Yes" : "No"}
            </li>
            <li>
              <span className="font-medium">Price:</span> {property.price}
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl border p-6">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <p className="text-gray-700">
            Want more listings in <span className="font-medium">{areaLabel}</span>?
          </p>

          <div className="mt-5 flex gap-3 flex-wrap">
            <Link
              href={`/properties/${areaSlug}`}
              className="border border-gray-300 px-4 py-2 rounded-full hover:bg-blue-600 transition"
            >
              View more in {areaLabel}
            </Link>

            <Link
              href="/properties/all"
              className="border border-gray-300 px-4 py-2 rounded-full hover:bg-blue-600 transition"
            >
              Back to all properties
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
