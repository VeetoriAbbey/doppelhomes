import Image from "next/image";

import Hero from "@/components/Hero";
import PropertyStat from "@/components/PropertyStat";
import FeaturedProperties from "@/components/FeaturedProperties";
import VideoSection from "@/components/VideoSection";
import PropertyListing from "@/components/PropertyListing";
import Testimonials from "@/components/Testimonials";
import ContactPage from "@/app/contact/page";





export default function Home() {
  return (
    <>
    <Hero />
    <PropertyStat />
    <FeaturedProperties />
    <VideoSection />
    <PropertyListing />
    <Testimonials />
    <ContactPage />

  

    </>
  );
}
