'use client'

import Image from "next/image";
import "@/app/components/style.css";
import { Carousel } from '@/app/components/ui/Carroussel'


export default function Home() {

  return (
    <>
      <main className="relative min-h-screen w-full bg-black text-white">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/landing-bg.png"
            alt="Minecraft background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            This is the solution for Minecraft Users
          </h1>
          <p className="text-2xl md:text-2xl mb-6">Made by Minecraft Users</p>
          <button className="px-6 py-2 bg-white text-black rounded-full text-lg font-medium hover:scale-105 transition cursor-pointer">
            Join now
          </button>
        </div>
      </main>
      {/* NEW SECTION UNDERNEATH */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What is this project?</h2>
          <p className="text-gray-700 text-lg">
            This Minecraft world isn't just a game — it's a whole experience.
            Explore dynamic towns, player-run shops, unique challenges, and an economy that you help shape.
          </p>
        </div>

        {/* Carousel */}
        <Carousel />
      </section>
    </>
  );
}