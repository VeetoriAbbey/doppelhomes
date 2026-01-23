"use client";
import Link from "next/link";

export default function BreadCrumbs({ location }) {
  if (!location) return null;

  const isAll = location === "all";

  const items = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties/all" },
    {
      label: isAll ? "All Locations" : location.replace(/-/g, " "),
      href: `/properties/${location}`,
    },
  ];

  return (
    <nav className="mb-6 text-sm text-gray-600">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index !== items.length - 1 ? (
              <>
                <Link
                  href={item.href}
                  className="hover:text-indigo-600 capitalize"
                >
                  {item.label}
                </Link>
                <span>/</span>
              </>
            ) : (
              <span className="font-semibold capitalize text-gray-900">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
