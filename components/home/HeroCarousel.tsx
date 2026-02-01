import React from "react";
import hero1 from "@/public/images/hero1.jpg";
import hero2 from "@/public/images/hero2.jpg";
import hero3 from "@/public/images/hero3.jpg";
import hero4 from "@/public/images/hero4.jpg";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const carouselImages = [hero1, hero2, hero3, hero4];

const HeroCarousel = () => {
  return (
    <div className="hidden lg:block">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card
                  className="bg-[#072611]/60 dark:bg-slate-900/80 backdrop-blur-sm
                  border border-emerald-700/30 dark:border-blue-300/20 
                  shadow-[0_4px_12px_rgba(34,139,34,0.15)] dark:shadow-[0_4px_12px_rgba(30,144,255,0.2)]"
                >
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Image
                      src={image}
                      alt="hero"
                      className="w-full h-[24rem] rounded-md object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="bg-emerald-600/90 hover:bg-emerald-700/90 text-white
          dark:bg-blue-600/90 dark:hover:bg-blue-700/90"
        />
        <CarouselNext
          className="bg-emerald-600/90 hover:bg-emerald-700/90 text-white
          dark:bg-blue-600/90 dark:hover:bg-blue-700/90"
        />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
