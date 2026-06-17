import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import GallerySection from '@/components/GallerySection';
import WhyChooseSection from '@/components/WhyChooseSection';
import ReviewsSection from '@/components/ReviewsSection';
import BookingSection from '@/components/BookingSection';
import ContactSection from '@/components/ContactSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <WhyChooseSection />
      <ReviewsSection />
      <BookingSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}