"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag } from "lucide-react";

interface HeaderProps {
  onOpenCart: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      className="
    sticky
    top-0
    z-50

    bg-[#2A1A12]/95

    backdrop-blur-xl

    border-b
    border-[#B98A5D]/20

    shadow-lg
  "
    >
      {" "}
      <div className="container mx-auto px-6 lg:px-16 h-20 flex items-center justify-between">
        <Link href="/">
          <img
            src="/footer-cacaui.png"
            alt="Cacauí"
            className="
      h-16
      w-auto
      object-contain
    "
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <a
            href="#"
            className="text-[#F5E8D6]
  hover:text-[#D5B18A] transition-colors"
          >
            Início
          </a>

          <a
            href="#sabores"
            className="text-[#F5E8D6]
  hover:text-[#D5B18A] transition-colors"
          >
            Nossos Encontros
          </a>

          <a
            href="#historia"
            className="text-[#F5E8D6]
  hover:text-[#D5B18A] transition-colors"
          >
            Por Trás da Cacauí
          </a>

          <a
            href="#montar-caixa"
            className="text-[#F5E8D6]
  hover:text-[#D5B18A] transition-colors"
          >
            Monte Sua Caixa
          </a>
        </nav>

        <button
          onClick={onOpenCart}
          className="
    relative
    text-[#F5E8D6]
hover:text-[#D5B18A]
    transition-colors
    duration-300
  "
        >
          <ShoppingBag size={28} strokeWidth={1.8} />

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
