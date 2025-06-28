# Travel Business Portal

A modern travel booking platform built with Next.js 14, TypeScript, and Firebase Authentication. This application provides a complete flight booking experience with user authentication, search functionality, and a comprehensive booking flow.

## 🚀 Features

### Core Functionality
- **Home Page**: Hero section with search bar and popular packages
- **Flight Search**: Advanced search with filters and sorting options
- **User Authentication**: Firebase-powered login/signup system
- **Booking Flow**: Multi-step booking process with passenger information forms
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Technical Features
- **Next.js 14 App Router**: Modern routing and server components
- **TypeScript**: Full type safety throughout the application
- **Firebase Auth**: Secure authentication with email/password
- **Context API**: Global state management for authentication
- **Tailwind CSS**: Utility-first styling with custom design system
- **shadcn/ui**: High-quality, accessible UI components

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Firebase Auth
- **State Management**: React Context API
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project (for authentication)

### 1. Clone the repository
```bash
git clone <repository-url>
cd travel-booking-platform
```

### 2. Install dependencies
```bash
npm install
```

### 3. Firebase Setup
1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Email/Password provider
3. Get your Firebase configuration from Project Settings
4. Update `lib/firebase.ts` with your Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── booking/           # Booking page
│   ├── login/             # Authentication page
│   ├── search/            # Search results page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── home/              # Home page components
│   ├── search/            # Search page components
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Site footer
├── context/               # React Context providers
│   └── AuthContext.tsx    # Authentication context
├── lib/                   # Utility functions
│   ├── firebase.ts        # Firebase configuration
│   ├── mockData.ts        # Mock flight data
│   └── utils.ts           # Helper utilities
├── types/                 # TypeScript type definitions
│   └── index.ts           # Application types
└── public/                # Static assets
```

## 🔄 Application Flow

### 1. Home Page (`/`)
- Hero section with travel imagery
- Advanced search form with:
  - Origin/destination selection
  - Date pickers for departure/return
  - Passenger count (adults/children)
  - Trip type (one-way/round-trip)
  - Class selection (Economy/Business/First)
- Popular packages showcase
- Footer with company information

### 2. Search Results (`/search`)
- Display flights based on search criteria
- Advanced filtering options:
  - Number of stops
  - Airlines
  - Price range
  - Duration
- Sorting capabilities (price, duration, departure time)
- Flight cards showing:
  - Airline information
  - Departure/arrival times and airports
  - Flight duration and stops
  - Pricing and class information
  - Book now functionality

### 3. Authentication (`/login`)
- Dual-mode form (Login/Signup)
- Firebase authentication integration
- Redirect handling for protected routes
- Form validation and error handling

### 4. Booking Flow (`/booking`)
- **Step 1 - Passenger Details**: 
  - Dynamic forms based on passenger count
  - Adult vs. child form variations
  - Required fields validation
  - Passport information for adults
- **Step 2 - Review**: 
  - Booking summary
  - Passenger information review
  - Flight details confirmation
- **Step 3 - Payment**: 
  - Payment form (UI only)
  - Terms and conditions agreement
  - Final booking confirmation

## 🎨 Design Approach

### Design System
- **Colors**: Blue primary palette with red accents
- **Typography**: Inter font family for clean readability
- **Spacing**: 8px grid system for consistent layouts
- **Components**: Reusable UI components with consistent styling

### User Experience
- **Progressive Disclosure**: Information revealed step-by-step
- **Clear Navigation**: Breadcrumbs and progress indicators
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and keyboard navigation support

## 🔐 Authentication Flow

1. **Protected Routes**: Booking page requires authentication
2. **Redirect Logic**: Unauthenticated users redirected to login with return URL
3. **Context Management**: Global auth state using React Context
4. **Session Persistence**: Firebase handles session management

## 📱 Responsive Design

- **Mobile**: Optimized for phones (320px+)
- **Tablet**: Enhanced layout for tablets (768px+)
- **Desktop**: Full-featured experience (1024px+)
- **Large Screens**: Optimized for large displays (1280px+)

## 🧪 Mock Data

The application uses mock flight data for demonstration purposes. In a production environment, this would be replaced with real API calls to flight booking services.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

## 🔧 Environment Variables

Create a `.env.local` file for local development:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## 🎯 Future Enhancements

- **Real API Integration**: Connect to actual flight booking APIs
- **Payment Processing**: Integrate with Stripe or similar payment providers
- **User Profiles**: User dashboard with booking history
- **Email Notifications**: Booking confirmations and updates
- **Advanced Filters**: More sophisticated search and filter options
- **Multi-language Support**: Internationalization
- **PWA Features**: Offline functionality and push notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **shadcn/ui**: For the excellent component library
- **Lucide React**: For the beautiful icon set
- **Tailwind CSS**: For the utility-first CSS framework
- **Firebase**: For authentication services
- **Next.js**: For the amazing React framework

---

**Note**: This is a demonstration project for a frontend developer position. The booking functionality is simulated and does not process real payments or bookings.