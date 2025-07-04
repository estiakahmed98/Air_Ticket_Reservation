'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { packages } from '@/lib/mockData';


const PopularPackages = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleBook = (id: number) => {
    const redirectUrl = `/packages-booking?packageId=${id}`;
    if (!user) {
      localStorage.setItem('redirectAfterLogin', redirectUrl);
      router.push('/login');
    } else {
      router.push(redirectUrl);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Packages</h2>
          <p className="text-xl text-gray-600">Discover our most loved travel destinations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{pkg.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{pkg.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{pkg.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">${pkg.price}</span>
                    <span className="text-sm text-gray-600 ml-1">/ {pkg.duration}</span>
                  </div>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600" onClick={() => handleBook(pkg.id)}>
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View All Packages
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularPackages;