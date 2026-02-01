import React from "react";

const AboutPage = () => {
  return (
    <section>
      <h1 className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl">
        We love
        <span className="bg-primary py-2 pb-4 px-4 rounded-lg tracking-widest text-white dark:text-black">
          store
        </span>
      </h1>
      <p className="mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto dark:text-white/90">
        Welcome to Jungle Treasures! We curate unique, handcrafted souvenirs and
        eco-friendly goods inspired by the rainforest. Our mission is to share
        the magic of the jungle with you, while supporting sustainable practices
        and local artisans. Explore our collection and discover a piece of the
        jungle to call your own.
      </p>
    </section>
  );
};

export default AboutPage;
