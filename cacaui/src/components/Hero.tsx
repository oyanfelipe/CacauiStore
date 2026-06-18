"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="
    relative
    overflow-hidden

    min-h-[700px]
    lg:min-h-screen
  "
    >
      {" "}
      <img
        src="images/cacaui-box.png"
        alt="Cacauí"
        className="
    absolute
    inset-0
    w-full
    h-full
    object-cover

    object-[75%_center]
    md:object-center
  "
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative z-10 max-w-7xl mx-auto w-full px-8">
        <div className="min-h-[700px] lg:min-h-screen">
          <div
            className="flex
    min-h-[700px]
    lg:min-h-screen

    items-center

    pt-24
    md:pt-0"
          >
            <div className="max-w-xl">
              <span
                className="text-5xl
    md:text-6xl
    font-serif
    uppercase tracking-[0.3em]
    text-[#A17C52]
    drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
              >
                Cacauí
              </span>

              <h1
                className="
    text-4xl
    sm:text-5xl
    md:text-6xl

    font-serif

    text-white

    mt-4
  "
              >
                {" "}
                Doce Encontro
              </h1>

              <p
                className="
    mt-6
    text-base
    md:text-lg

    text-white/90
  "
              >
                {" "}
                Criando sabores, histórias e encontros. Bombons artesanais
                feitos para transformar momentos simples em lembranças
                especiais.
              </p>

              <button
                onClick={() =>
                  document
                    .getElementById("sabores")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="
        mt-8 bg-[#B98A5D]
        text-[#1A120D] px-8 py-4 rounded-full
        hover:text-[#A67C52]"
              >
                Conhecer os Sabores
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
