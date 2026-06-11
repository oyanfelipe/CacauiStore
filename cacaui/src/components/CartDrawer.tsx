"use client";

import { useState } from "react";

import { useCartStore } from "@/store/cartStore";
import { generateWhatsAppMessage } from "@/utils/whatsapp";
import { getProductionTime } from "@/utils/getProductionTime";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}


export default function CartDrawer({
  isOpen,
  onClose,
}: CartDrawerProps) {

  const items = useCartStore(
    (state) => state.items
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalBombons = items.reduce(
  (acc, item) => {
    if (item.name.includes("Caixa 4")) {
      return acc + item.quantity * 4;
    }

    if (item.name.includes("Caixa 6")) {
      return acc + item.quantity * 6;
    }

    return acc + item.quantity;
  },
  0
);

const productionTime = getProductionTime(
  totalBombons
);

  const WHATSAPP_NUMBER = "5521988113634";

  const [customerName, setCustomerName] =
  useState("");

const [paymentMethod, setPaymentMethod] =
  useState("PIX");

const [deliveryType, setDeliveryType] =
  useState("Retirada");

const [notes, setNotes] =
  useState("");

  
  const handleCheckout = () => {
  if (!customerName.trim()) {
    alert("Informe seu nome.");
    return;
  }

  if (items.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const message =
    generateWhatsAppMessage(
      items,
      customerName,
      paymentMethod,
      deliveryType,
      notes,
      productionTime
    );

  const encodedMessage =
    encodeURIComponent(message);

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
    "_blank"
  );
};

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 right-0 h-screen w-[380px]
          bg-white z-50 shadow-2xl
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-6 h-full flex flex-col overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif text-[#3A2418]">
              Sua Seleção
            </h2>

            <button
              onClick={onClose}
              className="text-2xl"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">

  {items.length === 0 && (
    <p className="text-[#6B5547]">
      Nenhum item adicionado.
    </p>
  )}

  {items.map((item) => (
  <div
  key={item.id}
  className="
    flex gap-3
    border-b
    py-4
  "
>

  <img
    src={item.image}
    alt={item.name}
    className="
      w-16
      h-16
      rounded-lg
      object-cover
    "
  />

  <div className="flex-1">

    <h3 className="font-medium text-[#3A2418]">
      {item.name}
    </h3>

    <p className="text-sm text-[#A17C52]">
      R$ {item.price.toFixed(2)}
    </p>

    <div className="flex items-center gap-3">

      <button
        onClick={() =>
          decreaseQuantity(item.id)
        }
        className="w-8 h-8 border rounded-full"
      >
        -
      </button>

      <span>{item.quantity}</span>

      <button
        onClick={() =>
          increaseQuantity(item.id)
        }
        className="w-8 h-8 border rounded-full"
      >
        +
      </button>

      <button
        onClick={() =>
          removeItem(item.id)
        }
        className="ml-auto text-red-500 text-sm"
      >
        Remover
      </button>

    </div>
  </div>
</div>
))}

  <div className="border-t pt-4 mt-4 space-y-3">

    <input
      type="text"
      placeholder="Seu nome"
      value={customerName}
      onChange={(e) =>
        setCustomerName(e.target.value)
      }
className="
  w-full
  border
  rounded-lg
  px-3
  py-2
  bg-white
  text-[#3A2418]
"    />

    <select
      value={paymentMethod}
      onChange={(e) =>
        setPaymentMethod(e.target.value)
      }
className="
  w-full
  border
  rounded-lg
  px-3
  py-2
  bg-white
  text-[#3A2418]
"    >
      <option>PIX</option>
      <option>Dinheiro</option>
      <option>Cartão</option>
    </select>

    <select
      value={deliveryType}
      onChange={(e) =>
        setDeliveryType(e.target.value)
      }
className="
  w-full
  border
  rounded-lg
  px-3
  py-2
  bg-white
  text-[#3A2418]
"    >
      <option>Retirada</option>
      <option>Entrega</option>
    </select>

    <textarea
      placeholder="Observações do pedido"
      value={notes}
      onChange={(e) =>
        setNotes(e.target.value)
      }
      rows={3}
      className="
  w-full
  border
  rounded-lg
  px-3
  py-2
  bg-white
  text-[#3A2418]
"
    />

  </div>

</div>
          
          <div className="pt-6 border-t">

            <div className="flex justify-between mb-4">
              <span>Total</span>

              <strong>
                R$ {total.toFixed(2)}
              </strong>
            </div>

<div className="mb-4 bg-[#F8F3EE] p-4 rounded-xl">

  <p className="text-sm text-[#6B5547]">
    Prazo estimado de produção
  </p>

  <strong className="text-[#3A2418]">
    {productionTime}
  </strong>

</div>
            <button
  onClick={handleCheckout}
  className="w-full bg-[#3A2418] text-white py-4 rounded-full"
>
  Finalizar no WhatsApp
</button>

          </div>

        </div>
      </aside>
    </>
  );
}