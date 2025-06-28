'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { mockFlights } from '@/lib/mockData';
import { Flight, Passenger } from '@/types';
import { toast } from 'sonner';
import { Plane, User, Calendar, CreditCard, Shield } from 'lucide-react';

const BookingPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const flightId = searchParams.get('flightId');
  const adults = parseInt(searchParams.get('adults') || '1');
  const children = parseInt(searchParams.get('children') || '0');

  const [flight, setFlight] = useState<Flight | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (flightId) {
      const selectedFlight = mockFlights.find(f => f.id === flightId);
      setFlight(selectedFlight || null);
    }

    // Initialize passenger forms
    const initialPassengers: Passenger[] = [];
    
    // Add adult passengers
    for (let i = 0; i < adults; i++) {
      initialPassengers.push({
        title: '',
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        country: '',
        email: i === 0 ? user?.email || '' : '',
        phone: '',
        passportNumber: ''
      });
    }

    // Add child passengers
    for (let i = 0; i < children; i++) {
      initialPassengers.push({
        title: '',
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        country: '',
        email: '',
        phone: '',
        passportNumber: ''
      });
    }

    setPassengers(initialPassengers);
  }, [flightId, adults, children, user, router]);

  const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    };
    setPassengers(updatedPassengers);
  };

  const validatePassengers = () => {
    for (let i = 0; i < passengers.length; i++) {
      const passenger = passengers[i];
      const isChild = i >= adults;
      
      if (!passenger.title || !passenger.firstName || !passenger.lastName || 
          !passenger.gender || !passenger.dateOfBirth || !passenger.country) {
        toast.error(`Please fill all required fields for passenger ${i + 1}`);
        return false;
      }

      if (i === 0 && !passenger.email) {
        toast.error('Primary passenger email is required');
        return false;
      }

      if (!isChild && !passenger.passportNumber) {
        toast.error(`Passport number is required for adult passenger ${i + 1}`);
        return false;
      }
    }
    return true;
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      if (validatePassengers()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleBooking = async () => {
    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);
    
    // Simulate booking process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Booking confirmed! Check your email for details.');
      router.push('/');
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!flight) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Flight not found</h1>
          <Button onClick={() => router.push('/search')} className="mt-4">
            Back to Search
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const totalPrice = flight.price * (adults + children * 0.75);
  const taxes = totalPrice * 0.15;
  const finalPrice = totalPrice + taxes;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                <span className={`ml-2 text-sm ${
                  currentStep >= step ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}>
                  {step === 1 ? 'Details' : step === 2 ? 'Review' : 'Payment'}
                </span>
                {step < 3 && <div className="w-16 h-px bg-gray-300 ml-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Passenger Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {passengers.map((passenger, index) => {
                      const isChild = index >= adults;
                      const passengerType = isChild ? 'Child' : 'Adult';
                      
                      return (
                        <div key={index} className="border rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">
                              Passenger {index + 1}
                            </h3>
                            <Badge variant={isChild ? 'secondary' : 'default'}>
                              {passengerType} {index + 1}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor={`title-${index}`}>Title *</Label>
                              <Select
                                value={passenger.title}
                                onValueChange={(value) => updatePassenger(index, 'title', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select title" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Mr">Mr</SelectItem>
                                  <SelectItem value="Mrs">Mrs</SelectItem>
                                  <SelectItem value="Ms">Ms</SelectItem>
                                  <SelectItem value="Miss">Miss</SelectItem>
                                  {isChild && <SelectItem value="Master">Master</SelectItem>}
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor={`firstName-${index}`}>First Name *</Label>
                              <Input
                                id={`firstName-${index}`}
                                value={passenger.firstName}
                                onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                                placeholder="First name"
                              />
                            </div>

                            <div>
                              <Label htmlFor={`lastName-${index}`}>Last Name *</Label>
                              <Input
                                id={`lastName-${index}`}
                                value={passenger.lastName}
                                onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                                placeholder="Last name"
                              />
                            </div>

                            <div>
                              <Label htmlFor={`gender-${index}`}>Gender *</Label>
                              <Select
                                value={passenger.gender}
                                onValueChange={(value) => updatePassenger(index, 'gender', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Male">Male</SelectItem>
                                  <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor={`dob-${index}`}>Date of Birth *</Label>
                              <Input
                                id={`dob-${index}`}
                                type="date"
                                value={passenger.dateOfBirth}
                                onChange={(e) => updatePassenger(index, 'dateOfBirth', e.target.value)}
                              />
                            </div>

                            <div>
                              <Label htmlFor={`country-${index}`}>Country *</Label>
                              <Select
                                value={passenger.country}
                                onValueChange={(value) => updatePassenger(index, 'country', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="US">United States</SelectItem>
                                  <SelectItem value="UK">United Kingdom</SelectItem>
                                  <SelectItem value="CA">Canada</SelectItem>
                                  <SelectItem value="AU">Australia</SelectItem>
                                  <SelectItem value="KE">Kenya</SelectItem>
                                  <SelectItem value="NG">Nigeria</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {(index === 0 || !isChild) && (
                              <div>
                                <Label htmlFor={`email-${index}`}>
                                  Email {index === 0 ? '*' : ''}
                                </Label>
                                <Input
                                  id={`email-${index}`}
                                  type="email"
                                  value={passenger.email}
                                  onChange={(e) => updatePassenger(index, 'email', e.target.value)}
                                  placeholder="Email address"
                                />
                              </div>
                            )}

                            <div>
                              <Label htmlFor={`phone-${index}`}>Phone Number</Label>
                              <Input
                                id={`phone-${index}`}
                                value={passenger.phone}
                                onChange={(e) => updatePassenger(index, 'phone', e.target.value)}
                                placeholder="Phone number"
                              />
                            </div>

                            {!isChild && (
                              <div>
                                <Label htmlFor={`passport-${index}`}>Passport Number *</Label>
                                <Input
                                  id={`passport-${index}`}
                                  value={passenger.passportNumber}
                                  onChange={(e) => updatePassenger(index, 'passportNumber', e.target.value)}
                                  placeholder="Passport number"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Booking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Flight Details */}
                  <div>
                    <h3 className="font-semibold mb-3">Flight Details</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                            {flight.airlineLogo}
                          </div>
                          <div>
                            <p className="font-semibold">{flight.airline}</p>
                            <p className="text-sm text-gray-600">{flight.class} Class</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{flight.departureTime} - {flight.arrivalTime}</p>
                          <p className="text-sm text-gray-600">{flight.duration}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Passenger Summary */}
                  <div>
                    <h3 className="font-semibold mb-3">Passengers</h3>
                    <div className="space-y-2">
                      {passengers.map((passenger, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b">
                          <span>
                            {passenger.title} {passenger.firstName} {passenger.lastName}
                          </span>
                          <Badge variant={index >= adults ? 'secondary' : 'default'}>
                            {index >= adults ? 'Child' : 'Adult'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Payment Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-blue-800">
                        Your payment information is secure and encrypted
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="font-mono"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        Terms and Conditions
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentStep > 1) {
                    setCurrentStep(currentStep - 1);
                  } else {
                    router.back();
                  }
                }}
              >
                {currentStep === 1 ? 'Back to Search' : 'Previous'}
              </Button>

              {currentStep < 3 ? (
                <Button onClick={handleContinue}>
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleBooking}
                  disabled={isLoading || !agreedToTerms}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? 'Processing...' : `Pay $${finalPrice.toFixed(2)}`}
                </Button>
              )}
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plane className="h-5 w-5" />
                  <span>Booking Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Route:</span>
                    <span className="font-medium">{flight.departureAirport} → {flight.arrivalAirport}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Date:</span>
                    <span className="font-medium">Jun 26, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time:</span>
                    <span className="font-medium">{flight.departureTime} - {flight.arrivalTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span className="font-medium">{flight.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Class:</span>
                    <span className="font-medium">{flight.class}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold">Passengers</h4>
                  <div className="flex justify-between text-sm">
                    <span>Adults ({adults})</span>
                    <span>${(flight.price * adults).toFixed(2)}</span>
                  </div>
                  {children > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Children ({children})</span>
                      <span>${(flight.price * children * 0.75).toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes & Fees:</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-blue-600">${finalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {flight.refundable && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      ✓ Partially refundable
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;