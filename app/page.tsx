import LoadingContainer from "@/components/global/LoadingContainer";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import VisitUs from "@/components/home/VisitUs";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
      <VisitUs />
      <Footer />
    </>
  );
}
