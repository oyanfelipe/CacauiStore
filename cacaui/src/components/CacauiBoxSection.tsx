export default function CacauiBoxSection() {
  return (
  <section className="py-32 bg-[#FCFAF8]">
        <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <img
              src="/cacaui-box.png"
              alt="Cacauí Box"
              className="
                w-full
                rounded-[32px]
                shadow-2xl
              "
            />
          </div>

          <div>

            <p className="uppercase tracking-[0.3em] text-[#A17C52] text-sm mb-4">
              CACAUÍ BOX
            </p>

            <h2 className="text-5xl font-serif text-[#3A2418] mb-8">
              Monte sua própria seleção
            </h2>

            <p className="text-xl text-[#6B5547] mb-6 leading-relaxed">
              Escolha seus sabores favoritos e crie
              uma combinação única para presentear,
              compartilhar ou tornar seu momento
              ainda mais especial.
            </p>

            <div className="space-y-4 mb-8">

              <div className="flex items-center gap-3">
                <span>✓</span>
                <span>Caixas com 4 ou 6 bombons</span>
              </div>

              <div className="flex items-center gap-3">
                <span>✓</span>
                <span>Combinações personalizadas</span>
              </div>

              <div className="flex items-center gap-3">
                <span>✓</span>
                <span>Produção artesanal</span>
              </div>

              <div className="flex items-center gap-3">
                <span>✓</span>
                <span>Ideal para presentes</span>
              </div>

            </div>

            <a
              href="#montar-caixa"
              className="
                inline-flex
                bg-[#2A160F]
                text-white
                px-8
                py-4
                rounded-full
                hover:opacity-90
                transition
              "
            >
              Montar Minha Caixa
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}