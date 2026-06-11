"use client";

import { useState } from "react";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import CartDrawer from "@/components/CartDrawer";
import EssenceSection from "@/components/EssenceSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BoxBuilder from "@/components/BoxBuilder";
import AnnouncementBar from "@/components/AnnouncementBar";
import StorySection from "@/components/StorySection";
import CacauiBoxSection from "@/components/CacauiBoxSection";
import CauiAssistant from "@/components/CauiAssistant";


export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
      <>
      <Header
        onOpenCart={() => setCartOpen(true)}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />

    <main className="bg-[#F7F2EB] text-[#3A2418]">
      <Hero />
      <CauiAssistant />
      <ProductsSection />
      <CacauiBoxSection />
      <BoxBuilder />
      <StorySection />
      <EssenceSection />
      <AboutSection />
      <Footer />
      {/* <FloatingWhatsApp /> */}

    </main>
      </>
  );
}