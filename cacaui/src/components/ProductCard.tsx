"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  description,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  const [added, setAdded] = useState(false);

  const addItem = useCartStore(
    (state) => state.addItem
  );

  return (
  <div
    className="
  group
  relative
  rounded-[30px]

  hover:-translate-y-2
  hover:scale-[1.02]

  transition-all
  duration-500
"
  >
    
    <div
      className="
        absolute
        inset-[1px]
        rounded-[29px]
        border
        border-white/5
        pointer-events-none
      "
    />
    <div
  className="
    absolute
    inset-0
rounded-[29px]
    bg-gradient-to-b
    from-white/10
    via-transparent
    to-transparent

    pointer-events-none
  "
/>

    <div className="relative">

      <div className="relative p-3 pb-0">

        <img
          src={image}
          alt={name}
          className="
  w-full
  h-[220px]
  object-cover
  rounded-[20px]

  transition-transform
  duration-700

  group-hover:scale-99
"
        />

        <div
          className="
            absolute
            inset-x-3
            top-3
            h-[220px]
            rounded-[20px]
            bg-gradient-to-t
            from-black/60
            via-transparent
            to-transparent

            transition-transform
            duration-700
            
            group-hover:scale-99
          "
        />

        <span
          className="
            absolute
            top-6
            left-6

            px-3
            py-1

            rounded-full

            bg-[#D5B18A]
            text-[#2A1A12]

            text-xs
            font-medium
          "
        >
          Mais pedido
        </span>

        <button
          className="
            absolute
            top-6
            right-6

            text-[#F5E8D6]
            text-lg
          "
        >
          ♡
        </button>

      </div>

      <div className="px-6 pb-6 pt-4">

        <h3
          className="
            text-[#F5E8D6]
            font-serif
            text-[30px]
            leading-none
            mb-3
          "
        >
          {name}
        </h3>

        <p
          className="
            text-[#D5C0A6]
            text-sm
            leading-relaxed
            mb-5
          "
        >
          {description}
        </p>

        <div
          className="
            text-[#F5E8D6]
            text-[34px]
            font-serif
            mb-5
          "
        >
          R$ {price.toFixed(2)}
        </div>

        <div className="flex items-center justify-between">

          <div
            className="
              flex
              items-center

              border
              border-[#B98A5D]/30

              rounded-[14px]
bg-white/[0.03]
backdrop-blur-md
              overflow-hidden
            "
          >
            <button
              onClick={() =>
                setQuantity((prev) =>
                  Math.max(1, prev - 1)
                )
              }
              className="
  px-4
  py-2

  text-[#F5E8D6]

  hover:bg-[#B98A5D]/10

  transition
"
            >
              −
            </button>

            <span
              className="
                px-4
                text-[#F5E8D6]
              "
            >
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity((prev) => prev + 1)
              }
              className="
  px-4
  py-2

  text-[#F5E8D6]

  hover:bg-[#B98A5D]/10

  transition
"
            >
              +
            </button>
          </div>

          <button
            onClick={() => {
  addItem({
    id: `${id}-${Date.now()}`,
    name,
    image,
    price,
    quantity,
  });

  setAdded(true);

  setTimeout(() => {
    setAdded(false);
  }, 1000);
}}
            className="
  flex
  items-center
  gap-3

  h-[48px]
  px-6

  rounded-[14px]

  bg-white/[0.04]
  backdrop-blur-md

  border
  border-[#B98A5D]/50

  text-[#F5E8D6]

  transition-all
  duration-300

  hover:bg-[#B98A5D]/12
  hover:border-[#D9B287]

  hover:scale-105

  active:scale-95
"
          >
            {added ? "Adicionado ✓" : "Adicionar"}

            <span>🛍</span>
          </button>

        </div>

      </div>

    </div>
  </div>
);
}