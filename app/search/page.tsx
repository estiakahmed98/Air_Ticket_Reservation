'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchFilters from '@/components/search/SearchFilters';
import FlightCard from '@/components/search/FlightCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockFlights } from '@/lib/mockData';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowUpDown, Filter } from 'lucide-react';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const router = useRouter();
  const [flights, setFlights] = useState(mockFlights);
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [showFilters, setShowFilters] = useState(false);

  // Get search parameters
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const departureDate = searchParams.get('departureDate') || '';
  const returnDate = searchParams.get('returnDate') || '';
  const adults = parseInt(searchParams.get('adults') || '1');
  const children = parseInt(searchParams.get('children') || '0');
  const tripType = searchParams.get('tripType') || 'one-way';
  const flightClass = searchParams.get('class') || 'Economy';

  useEffect(() => {
    // Sort flights based on selected criteria
    const sortedFlights = [...mockFlights].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return a.duration.localeCompare(b.duration);
        case 'departure':
          return a.departureTime.localeCompare(b.departureTime);
        default:
          return 0;
      }
    });
    setFlights(sortedFlights);
  }, [sortBy]);

  const handleBookFlight = (flightId: string) => {
    if (!user) {
      toast.error('Please login to book a flight');
      router.push(`/login?redirect=/booking?flightId=${flightId}&adults=${adults}&children=${children}`);
      return;
    }

    router.push(`/booking?flightId=${flightId}&adults=${adults}&children=${children}`);
  };

  const totalPassengers = adults + children;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="text-lg font-semibold">
                {from} → {to}
              </div>
              <Badge variant="secondary">
                {departureDate}
              </Badge>
              {returnDate && (
                <Badge variant="secondary">
                  Return: {returnDate}
                </Badge>
              )}
              <Badge variant="outline">
                {totalPassengers} Passenger{totalPassengers > 1 ? 's' : ''}
              </Badge>
              <Badge variant="outline">
                {flightClass}
              </Badge>
            </div>
            
            <Button
              variant="outline"
              onClick={() => router.push('/')}
            >
              Modify Search
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <SearchFilters />
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Sort and Filter Controls */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {flights.length} flights found
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'price' | 'duration' | 'departure')}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="price">Price</option>
                      <option value="duration">Duration</option>
                      <option value="departure">Departure Time</option>
                    </select>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Flight Results */}
            <div className="space-y-4">
              {flights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  onBook={handleBookFlight}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Flights
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;