'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { mockFlights } from '@/lib/mockData';
import { Flight } from '@/types';

interface SearchFiltersProps {
  onFilterChange: (filtered: Flight[]) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange }) => {
  const [selectedStops, setSelectedStops] = useState<number[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 500]);

  useEffect(() => {
    const filtered = mockFlights.filter((flight) => {
      const stopMatch =
        selectedStops.length === 0 || selectedStops.includes(flight.stops);
      const airlineMatch =
        selectedAirlines.length === 0 || selectedAirlines.includes(flight.airline);
      const priceMatch = flight.price >= priceRange[0] && flight.price <= priceRange[1];
      return stopMatch && airlineMatch && priceMatch;
    });

    onFilterChange(filtered);
  }, [selectedStops, selectedAirlines, priceRange]);

  const handleStopChange = (value: number) => {
    setSelectedStops((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const handleAirlineChange = (airline: string) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline) ? prev.filter((a) => a !== airline) : [...prev, airline]
    );
  };

  const handleReset = () => {
    setSelectedStops([]);
    setSelectedAirlines([]);
    setPriceRange([100, 500]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter By</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Stop</h4>
            {[0, 1, 2].map((stop) => (
              <div key={stop} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`stop-${stop}`}
                    checked={selectedStops.includes(stop)}
                    onCheckedChange={() => handleStopChange(stop)}
                  />
                  <label htmlFor={`stop-${stop}`} className="text-sm">
                    {stop === 0 ? 'Direct' : stop === 1 ? '1 Stop' : '2+ Stops'}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-semibold mb-3">Airlines</h4>
            {Array.from(new Set(mockFlights.map((f) => f.airline))).map((airline) => (
              <div key={airline} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`airline-${airline}`}
                    checked={selectedAirlines.includes(airline)}
                    onCheckedChange={() => handleAirlineChange(airline)}
                  />
                  <label htmlFor={`airline-${airline}`} className="text-sm">
                    {airline}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-semibold mb-3">Price</h4>
            <div className="px-2">
              <Slider
                defaultValue={[175, 475]}
                value={priceRange}
                min={100}
                max={500}
                step={25}
                onValueChange={(val) => setPriceRange([val[0], val[1]])}
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={handleReset}>
            Reset
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchFilters;