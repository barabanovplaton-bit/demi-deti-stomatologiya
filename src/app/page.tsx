"use client";

import { ComingSoonProvider } from "@/components/arkadia/coming-soon-modal";
import { Navigation } from "@/components/arkadia/navigation";
import { Hero } from "@/components/arkadia/hero";
import { About } from "@/components/arkadia/about";
import { Branches } from "@/components/arkadia/branches";
import { Services } from "@/components/arkadia/services";
import { Doctors } from "@/components/arkadia/doctors";
import { Reviews } from "@/components/arkadia/reviews";
import { Contact } from "@/components/arkadia/contact";
import { Footer } from "@/components/arkadia/footer";

export default function Home() {
  return (
    <ComingSoonProvider>
      <main className="relative min-h-screen bg-arkadia-cream text-arkadia-graphite overflow-x-hidden">
        <Navigation />
        <Hero />
        <About />
        <Branches />
        <Services />
        <Doctors />
        <Reviews />
        <Contact />
        <Footer />
      </main>
    </ComingSoonProvider>
  );
}
