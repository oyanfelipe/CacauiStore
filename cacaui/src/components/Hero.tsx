"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="grid lg:grid-cols-2 min-h-[700px]">
  <img
    src="images/cacaui-box.png"
    alt="Cacauí"
    className="
      absolute
      inset-0
      w-full
      h-full
      object-cover
    "
  />

  <div className="absolute inset-0 bg-black/10" />

  <div className="relative z-10 max-w-7xl mx-auto w-full px-8">
    <div className="absolute inset-0">
  <div className="container mx-auto h-full px-6 lg:px-16">
    <div className="flex h-full items-center">
      <div className="max-w-xl">
        <span className="uppercase tracking-[0.3em] text-[#A17C52] text-sm">
          Cacauí
        </span>

        <h1 className="text-6xl font-serif text-[#3A2418] mt-4">
          Doce Encontro
        </h1>

        <p className="mt-6 text-lg text-[#6B5547]">
          Criando sabores, histórias e encontros. Bombons artesanais feitos para transformar momentos simples em lembranças especiais.
        </p>

        <button 
        onClick={() => document.getElementById('sabores')?.scrollIntoView({ behavior: 'smooth' })}
        className="
        mt-8 bg-[#2C1A12] 
        text-white px-8 py-4 rounded-full
        hover:text-[#A67C52]">
          Conhecer os Sabores
        </button>
      </div>
    </div>
  </div>
</div>
  </div>
</section>
  );
}