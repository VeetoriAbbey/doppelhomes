"use client";

import dynamic from "next/dynamic";

const LocationMap = dynamic(
  () => import("./LocationMapClient"),
  { ssr: false }
);

export default LocationMap;
