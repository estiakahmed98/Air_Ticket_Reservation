'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const SearchFilters = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter By</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Stop</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="direct" />
                  <label htmlFor="direct" className="text-sm">Direct (23)</label>
                </div>
                <span className="text-sm text-gray-600">$110</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="1stop" />
                  <label htmlFor="1stop" className="text-sm">1 Stop (4)</label>
                </div>
                <span className="text-sm text-gray-600">$324</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="2stops" />
                  <label htmlFor="2stops" className="text-sm">2+ Stops (2)</label>
                </div>
                <span className="text-sm text-gray-600">$349</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Airlines</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="singapore" />
                  <label htmlFor="singapore" className="text-sm">Singapore Airlines</label>
                </div>
                <span className="text-sm text-gray-600">$110</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="qatar" />
                  <label htmlFor="qatar" className="text-sm">Qatar Airways</label>
                </div>
                <span className="text-sm text-gray-600">$324</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="emirates" />
                  <label htmlFor="emirates" className="text-sm">Emirates</label>
                </div>
                <span className="text-sm text-gray-600">$349</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Price</h4>
            <div className="px-2">
              <Slider
                defaultValue={[175, 475]}
                max={500}
                min={100}
                step={25}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>$175</span>
                <span>$475</span>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Reset
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchFilters;