import Image from "next/image";

import Hero from "@/components/Hero";
import PropertyStat from "@/components/PropertyStat";
import FeaturedProperties from "@/components/FeaturedProperties";
import VideoSection from "@/components/VideoSection";
import PropertyListing from "@/components/PropertyListing";





export default function Home() {
  return (
    <>
    <Hero />
    <PropertyStat />
    <FeaturedProperties />
    <VideoSection />
    <PropertyListing />

  

    </>
  );
}
