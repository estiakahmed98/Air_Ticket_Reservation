'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, MapPin, Users, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const SearchBar = () => {
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departureDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    adults: 1,
    children: 0,
    tripType: 'one-way' as 'one-way' | 'round-trip',
    class: 'Economy' as 'Economy' | 'Business' | 'First'
  });

  const handleSearch = () => {
    if (!searchData.from || !searchData.to || !searchData.departureDate) {
      return;
    }

    const params = new URLSearchParams({
      from: searchData.from,
      to: searchData.to,
      departureDate: format(searchData.departureDate, 'yyyy-MM-dd'),
      adults: searchData.adults.toString(),
      children: searchData.children.toString(),
      tripType: searchData.tripType,
      class: searchData.class,
    });

    if (searchData.returnDate && searchData.tripType === 'round-trip') {
      params.append('returnDate', format(searchData.returnDate, 'yyyy-MM-dd'));
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4 -mt-20 relative z-20 max-w-6xl mx-auto">
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="tripType"
              value="round-trip"
              checked={searchData.tripType === 'round-trip'}
              onChange={(e) => setSearchData({ ...searchData, tripType: e.target.value as 'round-trip' })}
              className="text-blue-600"
            />
            <span>Round-Trip</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="tripType"
              value="one-way"
              checked={searchData.tripType === 'one-way'}
              onChange={(e) => setSearchData({ ...searchData, tripType: e.target.value as 'one-way' })}
              className="text-blue-600"
            />
            <span>One-Way</span>
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant={searchData.class === 'Economy' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSearchData({ ...searchData, class: 'Economy' })}
          >
            Economy
          </Button>
          <Button
            variant={searchData.class === 'Business' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSearchData({ ...searchData, class: 'Business' })}
          >
            Business Class
          </Button>
          <Button
            variant={searchData.class === 'First' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSearchData({ ...searchData, class: 'First' })}
          >
            First Class
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="from" className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>From</span>
          </Label>
          <Input
            id="from"
            placeholder="Departure city"
            value={searchData.from}
            onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="to" className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>To</span>
          </Label>
          <Input
            id="to"
            placeholder="Destination city"
            value={searchData.to}
            onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <Label htmlFor="departureDate" className="flex items-center space-x-1">
            <CalendarIcon className="h-4 w-4" />
            <span>Departing</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="departureDate"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !searchData.departureDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {searchData.departureDate ? format(searchData.departureDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={searchData.departureDate}
                onSelect={(date) => setSearchData({ ...searchData, departureDate: date })}
                initialFocus
                fromDate={new Date()} // Disable past dates
              />
            </PopoverContent>
          </Popover>
        </div>

        {searchData.tripType === 'round-trip' && (
          <div className="space-y-2">
            <Label>Returning</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !searchData.returnDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {searchData.returnDate ? format(searchData.returnDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={searchData.returnDate}
                  onSelect={(date) => setSearchData({ ...searchData, returnDate: date })}
                  initialFocus
                  fromDate={new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        <div className="space-y-2">
          <Label className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>Travelers</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {searchData.adults + searchData.children} Passenger{searchData.adults + searchData.children !== 1 ? 's' : ''}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Adults</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchData({ ...searchData, adults: Math.max(1, searchData.adults - 1) })}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{searchData.adults}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchData({ ...searchData, adults: searchData.adults + 1 })}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Children</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchData({ ...searchData, children: Math.max(0, searchData.children - 1) })}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{searchData.children}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchData({ ...searchData, children: searchData.children + 1 })}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button
        onClick={handleSearch}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
        size="lg"
      >
        <Search className="mr-2 h-5 w-5" />
        Search Flights
      </Button>
    </div>
  );
};

export default SearchBar;