'use client'

import Image from "next/image";
import "@/components/style.css";
import "@/components/css/Landing.css";
import { Carousel } from '@/components/ui/Carroussel'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <main>
        <section className="relative min-h-screen w-full bg-black text-white snap-start">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/landing-bg.png"
              alt="Minecraft background"
              className="w-full h-full object-cover text-center"
            />
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              This is the solution for Minecraft Users
            </h1>
            <p className="text-2xl md:text-2xl mb-6">Made by Minecraft Users</p>
            <Link href={"/shop"} className="px-6 py-2 bg-white text-black rounded-full text-lg font-medium hover:scale-105 transition cursor-pointer">
              Join now
            </Link>
          </div>
        </section>

        {/* NEW SECTION UNDERNEATH */}
        <section className="py-16 px-8 h-screen flex justify-center LandingSection">
          <div className="Content">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What is this project?</h2>
              <p className="text-lg">
                This Minecraft world isn't just a game — it's a whole experience.
                Explore dynamic towns, player-run shops, unique challenges, and an economy that you help shape.
              </p>
            </div>
            {/* Carousel */}
            <Carousel />
          </div>
        </section>

        {/* NEW SECTION UNDERNEATH */}
        <section className="py-12 px-6 rounded-2xl shadow-md max-w-4xl mx-auto mt-10 LandingSection">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Project Overview
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            This project is an online marketplace built for SMP Minecraft servers,
            where anyone can publish and sell their own items or services. Minecraft is one
            of the most popular sandbox games in the world, known for its creative freedom
            and massive player-driven economy. Our platform makes it easy for server owners,
            plugin creators, and players to monetize their digital content. We use Supabase
            as our backend — an open-source Firebase alternative built on PostgreSQL — to
            handle user authentication, store product data, and manage user-generated content
            in real time. Everything is powered by modern web tools like Next.js, Tailwind CSS,
            and React for a fast and clean experience.
          </p>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Sell Minecraft items, plugins, or services</li>
            <li>Powered by Supabase for real-time database features</li>
            <li>Built with Next.js, Tailwind, and modern tools</li>
          </ul>
        </section>
      </main>
    </>
  );
}
