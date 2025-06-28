'use client';

import React from 'react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="relative h-[600px] overflow-hidden">
      <Image
        src="/hero.jpg"
        alt="Travel destination"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-70" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Explore The World Around You
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 text-white">
            Take a break from the stress of everyday life, plan trips and explore.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;