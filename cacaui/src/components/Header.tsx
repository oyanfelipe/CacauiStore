"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag } from "lucide-react";

interface HeaderProps {
  onOpenCart: () => void;
}

export default function Header({
  onOpenCart,
}: HeaderProps) {

  const items = useCartStore(
    (state) => state.items
  );

const totalItems = items.reduce(
  (acc, item) => acc + item.quantity,
  0
);
  const cartItemsCount = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-50 bg-[#F7F2EB]/90 backdrop-blur border-b border-[#E8DDD1]">
      <div className="container mx-auto px-6 lg:px-16 h-20 flex items-center justify-between">

        <Link href="/">
          <div className=" text-center">
            <h1 className="text-5xl font-serif text-[#3A2418]">
              Cacauí
            </h1>

            <p className="text-xs tracking-widest uppercase text-[#A17C52]">
              Doce Encontro
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">

  <a href="#"
  className="text-[#3A2418] hover:text-[#A17C52] transition-colors"
>
    Início
  </a>

  <a href="#sabores"
      className="text-[#3A2418] hover:text-[#A17C52] transition-colors"

  >
    Nossos Encontros
  </a>

  <a href="#historia"
      className="text-[#3A2418] hover:text-[#A17C52] transition-colors"
>
    Por Trás da Cacauí
  </a>

  <a href="#montar-caixa"
      className="text-[#3A2418] hover:text-[#A17C52] transition-colors"
  >
    Monte Sua Caixa
  </a>

</nav>

        <button
  onClick={onOpenCart}
  className="
    relative
    text-[#6B4A2D]
    hover:text-[#A67C52]
    transition-colors
    duration-300
  "
>
  <ShoppingBag
    size={28}
    strokeWidth={1.8}
  />
  
  {totalItems > 0 && (
    <span
      className="
        absolute
        -top-2
        -right-2
        w-5
        h-5
        rounded-full
        bg-[#A17C52]
        text-white
        text-xs
        flex
        items-center
        justify-center
      "
    >
      {totalItems}
    </span>
  )}
</button>

      </div>
    </header>
  );
}