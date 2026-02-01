import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import Image from "next/image";
import SectionTitle from "../global/SectionTitle";

const VisitUs = () => {
  return (
    <section className="py-20 w-1/1">
      <SectionTitle text="Visit Us" />
      <div className="w-full mx-auto pt-12">
        <div
          className="bg-[#072611]/60 dark:bg-slate-900/80 backdrop-blur-sm
                border border-emerald-700/30 dark:border-blue-300/20 
                shadow-[0_4px_12px_rgba(34,139,34,0.15)] dark:shadow-[0_4px_12px_rgba(30,144,255,0.2)] rounded-2xl p-12"
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Feel the Jungle
              </h2>
              <p className="text-gray-400 mb-8">
                Experience the magic of the jungle in person. Visit our store to
                explore our full collection and meet our passionate team.
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <MapPin
                    className="text-amber-400 dark:text-[#5FFFB5]"
                    size={24}
                  />
                  <div className="text-gray-300">
                    <p>Hostel-H</p>
                    <p>NIT Raipur</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone
                    className="text-amber-400 dark:text-[#5FFFB5]"
                    size={24}
                  />
                  <p className="text-gray-300">+91 7205491375</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail
                    className="text-amber-400 dark:text-[#5FFFB5]"
                    size={24}
                  />
                  <p className="text-gray-300">info@jungletreasures.com</p>
                </div>
              </div>
            </div>
            <div className="relative h-[300px] md:h-auto rounded-xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg"
                alt="Our Store"
                className="absolute inset-0 w-full h-full object-cover"
                width={1080}
                height={200}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitUs;
