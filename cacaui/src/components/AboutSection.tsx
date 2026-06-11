export default function AboutSection() {
  return (
    <section className="bg-[#F8F3EE] py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Foto */}

          <div>
            <img
              src="/images/cacaui-package.jpg"
              alt="Embalagem Cacauí"
              className="
                w-full
                rounded-[32px]
                shadow-xl
              "
            />
          </div>

          {/* Texto */}

          <div>

            <p className="uppercase tracking-[0.3em] text-[#A17C52] text-sm mb-4">
              Cada detalhe importa
            </p>

            <h2 className="text-5xl font-serif text-[#3A2418] mb-8">
              Mais que um chocolate,
              <br />
              um gesto de carinho.
            </h2>

            <p className="text-[#6B5547] text-lg leading-relaxed mb-10">
              Da seleção dos ingredientes até a apresentação
              final, cada detalhe da Cacauí é pensado para
              transformar um simples doce em uma lembrança
              especial.
            </p>

            <div className="grid grid-cols-2 gap-6">

              <div className="bg-white p-5 rounded-2xl">
                <h3 className="font-medium text-[#3A2418] mb-2">
                  Ingredientes Selecionados
                </h3>

                <p className="text-sm text-[#6B5547]">
                  Escolhidos para garantir sabor e qualidade.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl">
                <h3 className="font-medium text-[#3A2418] mb-2">
                  Produção Artesanal
                </h3>

                <p className="text-sm text-[#6B5547]">
                  Feito sob encomenda com atenção aos detalhes.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl">
                <h3 className="font-medium text-[#3A2418] mb-2">
                  Feito com Carinho
                </h3>

                <p className="text-sm text-[#6B5547]">
                  Pensado para encontros e momentos especiais.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl">
                <h3 className="font-medium text-[#3A2418] mb-2">
                  Embalagem Elegante
                </h3>

                <p className="text-sm text-[#6B5547]">
                  Valoriza o presente e a experiência.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}