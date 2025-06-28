import Header from '@/components/Header';
import HeroSection from '@/components/home/HeroSection';
import SearchBar from '@/components/home/SearchBar';
import PopularPackages from '@/components/home/PopularPackages';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <SearchBar />
      <PopularPackages />
      <Footer />
    </main>
  );
}