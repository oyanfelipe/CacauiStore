"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function BoxBuilder() {
  const addItem = useCartStore((state) => state.addItem);

  const [creme4, setCreme4] = useState(2);
  const [amendoa4, setAmendoa4] = useState(2);

  const [creme6, setCreme6] = useState(3);
  const [amendoa6, setAmendoa6] = useState(3);

  const addBox4 = () => {
    if (creme4 + amendoa4 !== 4) {
      alert("A caixa precisa ter 4 bombons.");
      return;
    }

    addItem({
      id: `caixa4-${Date.now()}`,
      name: `Caixa 4 (${creme4} Creme / ${amendoa4} Amêndoa)`,
      price: 14.99,
      quantity: 1,
      image: "/images/caixa4.png",
    });
  };

  const addBox6 = () => {
    if (creme6 + amendoa6 !== 6) {
      alert("A caixa precisa ter 6 bombons.");
      return;
    }

    addItem({
      id: `caixa6-${Date.now()}`,
      name: `Caixa 6 (${creme6} Creme / ${amendoa6} Amêndoa)`,
      price: 21.99,
      quantity: 1,
      image: "/images/caixa6.png" ,
    });
  };

  return (
    <section id="montar-caixa" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-[#A17C52] text-sm mb-3">
            Crie Seu Encontro
          </p>

          <h2 className="text-5xl font-serif text-[#3A2418] mb-4">
            Personalize sua caixa
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Caixa 4 */}

          <div className="bg-[#F8F3EE] rounded-[32px] p-10">
            <h3 className="text-4xl font-serif text-[#3A2418] mb-6">
              Caixa com 4
            </h3>

            <div className="space-y-4 mb-8">
              <div>
                <label>Creme</label>

                <input
                  type="number"
                  min="0"
                  max="4"
                  value={creme4}
                  onChange={(e) => setCreme4(Number(e.target.value))}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label>Amêndoa</label>

                <input
                  type="number"
                  min="0"
                  max="4"
                  value={amendoa4}
                  onChange={(e) => setAmendoa4(Number(e.target.value))}
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>

            <div className="mb-6 text-[#A17C52]">
              Total selecionado: {creme4 + amendoa4}/4
            </div>

            <button
              onClick={addBox4}
              className="w-full bg-[#2A160F] text-white py-4 rounded-full"
            >
              Adicionar Caixa 4 • R$ 14,99
            </button>
          </div>

          {/* Caixa 6 */}

          <div className="bg-[#F8F3EE] rounded-[32px] p-10">
            <h3 className="text-4xl font-serif text-[#3A2418] mb-6">
              Caixa com 6
            </h3>

            <div className="space-y-4 mb-8">
              <div>
                <label>Creme</label>

                <input
                  type="number"
                  min="0"
                  max="6"
                  value={creme6}
                  onChange={(e) => setCreme6(Number(e.target.value))}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label>Amêndoa</label>

                <input
                  type="number"
                  min="0"
                  max="6"
                  value={amendoa6}
                  onChange={(e) => setAmendoa6(Number(e.target.value))}
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>

            <div className="mb-6 text-[#A17C52]">
              Total selecionado: {creme6 + amendoa6}/6
            </div>

            <button
              onClick={addBox6}
              className="w-full bg-[#2A160F] text-white py-4 rounded-full"
            >
              Adicionar Caixa 6 • R$ 21,99
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
