"use client";

import { useState } from "react";
import BreadCrumbs from "@/app/components/BreadCrumbs";
import PropertyCard from "@/app/components/PropertyCard";
import PropertyHeader from "../components/PropertyHeader";
import { properties } from "@/app/data/properties";

export default function AllPropertiesPage() {
  const [currentPage] = useState(1);
  const propertiesPerPage = 6;


  const start = (currentPage - 1) * propertiesPerPage;
  const currentProperties = properties.slice(start, start + propertiesPerPage);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <PropertyHeader />
      <BreadCrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Properties" },
        ]}
      />

      <h1 className="text-3xl font-bold mb-8">All Properties</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

    </main>
  );
}
