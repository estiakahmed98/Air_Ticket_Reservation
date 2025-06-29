'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';
import { packages } from '@/lib/mockData';

const PackagesBooking = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const packageId = searchParams.get('packageId');

  const [selectedPackage, setSelectedPackage] = useState<null | (typeof packages)[0]>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (packageId) {
      const pkg = packages.find((p) => p.id === parseInt(packageId));
      setSelectedPackage(pkg || null);
    }
  }, [user, packageId, router]);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 2000));
      toast.success('Package booked successfully!');
      router.push('/');
    } catch (err) {
      toast.error('Failed to book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPackage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900">Package not found</h1>
          <Button onClick={() => router.push('/')} className="mt-4">Back Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{selectedPackage.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={selectedPackage.image}
              alt={selectedPackage.title}
              width={600}
              height={300}
              className="rounded-lg object-cover mb-4"
            />
            <p className="text-gray-700 mb-2">
              {selectedPackage.description || 'No description available'}
            </p>
            {selectedPackage.highlights?.length > 0 && (
              <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1 mb-4">
                {selectedPackage.highlights.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            <div className="text-lg font-semibold text-blue-600 mb-2">
              ${selectedPackage.price}{' '}
              <span className="text-sm text-gray-500">/ {selectedPackage.duration}</span>
            </div>
            {selectedPackage.refundable && (
              <div className="text-green-700 text-sm font-medium">✓ Refundable</div>
            )}
          </CardContent>
        </Card>

        <Card className="self-start">
          <CardHeader>
            <CardTitle>Confirm Booking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              You're about to book the <strong>{selectedPackage.title}</strong> trip.
            </p>
            <Button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PackagesBooking;
