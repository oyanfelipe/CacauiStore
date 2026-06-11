import ProductCard from "./ProductCard";

export default function ProductsSection() {
  return (
    <section
      id="sabores"
      className="
        relative
        overflow-hidden
        py-28
        bg-[#0F0906]
      "
    >
      {/* Fundo */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_70%_20%,rgba(181,124,69,.25),transparent_40%)]
        "
      />

      <div
        className="
          absolute
          inset-0
          opacity-20
          bg-[url('/noise.png')]
        "
      />

      <div className="container mx-auto max-w-[1400px] px-8 relative z-10">

        <div
          className="
            grid
            lg:grid-cols-[340px_700px]
            gap-12
            items-start
          "
        >

          {/* Texto */}
          <div className="pt-8">

            <span
              className="
                uppercase
                tracking-[0.25em]
                text-[#C8A97E]
                text-sm
              "
            >
              NOSSOS ENCONTROS
            </span>

            <h2
              className="
                mt-6
                text-[#F3E4D0]
                font-serif
                text-[68px]
                leading-[0.95]
              "
            >
              Dois sabores.
              <br />
              Muitos
              <br />
              encontros.
            </h2>

            <p
              className="
                mt-8
                text-[#D5C0A6]
                max-w-[240px]
                leading-relaxed
              "
            >
              Receitas exclusivas feitas para
              surpreender e encantar.
            </p>

            <button
              className="
                mt-10
                px-8
                py-4

                rounded-full

                border
                border-[#B98A5D]/60

                text-[#F3E4D0]

                hover:bg-[#B98A5D]/10
                transition
              "
            >
              Ver todos os produtos →
            </button>

          </div>

          {/* Cards */}
          <div
            className="
              flex
              gap-6
              items-start
            "
          >
            <ProductCard
              id="cacaui-creme"
              name="CACAUÍ CREME"
              description="Chocolate cremoso com notas suaves de baunilha."
              image="/creme.jpg"
              price={2.5}
            />

            <ProductCard
              id="cacaui-amendoa"
              name="CACAUÍ AMÊNDOA"
              description="Crocante, intenso e irresistível."
              image="/amendoa.jpg"
              price={2.8}
            />
          </div>

        </div>

      </div>
    </section>
  );
}