export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  duration: string;
  stops: number;
  price: number;
  class: 'Economy' | 'Business' | 'First';
  refundable: boolean;
}

export interface SearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  tripType: 'one-way' | 'round-trip';
  class: 'Economy' | 'Business' | 'First';
}

export interface Passenger {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  country: string;
  email: string;
  phone: string;
  passportNumber?: string;
}

export interface Package {
  id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  duration: string;
}