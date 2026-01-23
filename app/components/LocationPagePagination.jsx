"use client";

import { useState } from "react";
import PropertyCard from "@/app/components/PropertyCard";
import PagePagination from "@/app/components/PagePagination";

export default function LocationPagePagination({ properties }) {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const start = (currentPage - 1) * propertiesPerPage;

  const currentProperties = properties.slice(
    start,
    start + propertiesPerPage
  );

  return (
    <>
      {currentProperties.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No properties found.</p>
      )}

      {totalPages > 1 && (
        <PagePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}
