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
      section className="bg-white py-12 px-6 rounded-2xl shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Project Overview
      </h2>
      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        This project is an online marketplace built for AMP-managed Minecraft servers,
        where anyone can publish and sell their own items or services. Minecraft is one
        of the most popular sandbox games in the world, known for its creative freedom
        and massive player-driven economy. Our platform makes it easy for server owners,
        plugin creators, and players to monetize their digital content. We use Supabase
        as our backend — an open-source Firebase alternative built on PostgreSQL — to
        handle user authentication, store product data, and manage user-generated content
        in real time. Everything is powered by modern web tools like Next.js, Tailwind CSS,
        and React for a fast and clean experience.
      </p>
      <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
        <li>Sell Minecraft items, plugins, or services</li>
        <li>Powered by Supabase for real-time database features</li>
        <li>Built with Next.js, Tailwind, and modern tools</li>
      </ul>
    </section>
    </>
  );
}
