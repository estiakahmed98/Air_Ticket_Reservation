'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plane, Clock } from 'lucide-react';
import { Flight } from '@/types';

interface FlightCardProps {
  flight: Flight;
  onBook: (flightId: string) => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onBook }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
              {flight.airlineLogo}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{flight.airline}</h3>
              <p className="text-sm text-gray-600">
                {flight.refundable ? 'Partially Refundable' : 'Non Refundable'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="text-center">
              <p className="text-2xl font-bold">{flight.departureTime}</p>
              <p className="text-sm text-gray-600">{flight.departureAirport}</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-16 h-px bg-gray-300"></div>
                <Plane className="h-4 w-4 text-gray-400" />
                <div className="w-16 h-px bg-gray-300"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{flight.duration}</p>
              <p className="text-xs text-gray-500">
                {flight.stops === 0 ? 'Non Stop' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
              </p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold">{flight.arrivalTime}</p>
              <p className="text-sm text-gray-600">{flight.arrivalAirport}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="mb-2">
              <Badge variant="secondary" className="mb-1">
                {flight.price <= 200 ? 'Cheapest' : flight.price >= 400 ? 'Exclusive' : 'Cheapest'}
              </Badge>
            </div>
            <p className="text-3xl font-bold">${flight.price}</p>
            <p className="text-sm text-gray-600">{flight.class} Class</p>
            <Button 
              className="mt-3 bg-blue-600 hover:bg-blue-700"
              onClick={() => onBook(flight.id)}
            >
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;