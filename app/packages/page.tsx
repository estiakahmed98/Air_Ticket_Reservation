'use client';

import { packages } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Packages = () => {
  const router = useRouter();

  const handleBook = (id: number) => {
    router.push(`/packages-booking?packageId=${id}`);
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Explore Travel Packages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="relative w-full h-48">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-md"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{pkg.title}</CardTitle>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    {pkg.rating}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{pkg.location}</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <p className="text-sm text-gray-700 mb-2">{pkg.description}</p>
                <div className="flex justify-between items-center text-sm font-medium text-blue-600 mb-3">
                  <span>${pkg.price}</span>
                  <span className="text-gray-500">{pkg.duration}</span>
                </div>
                {pkg.refundable && (
                  <p className="text-green-600 text-xs font-semibold mb-2">✓ Refundable</p>
                )}
                <Button
                  size="sm"
                  onClick={() => handleBook(pkg.id)}
                  className="bg-blue-600 hover:bg-blue-700 w-full"
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
