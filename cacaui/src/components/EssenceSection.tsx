export default function EssenceSection() {
  return (
    <section 
    id="essencia"
    className="bg-[#2A160F] py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <p className="uppercase tracking-[0.3em] text-[#B89468] text-sm mb-4">
              Nossa Essência
            </p>

            <h2 className="text-5xl font-serif text-[#EAD7C0] leading-tight mb-8">
              Feito para encontros
              <br />
              que ficam na memória.
            </h2>

            <p className="text-[#D4BDA6] text-lg leading-relaxed mb-8">
              A Cacauí nasceu da vontade de transformar ingredientes em experiências.
              Cada sabor, cada embalagem e cada detalhe fazem parte de uma história que continua sendo construída todos os dias.
              Criamos sabores, histórias e encontros.
            </p>

            <a
              href="#sabores"
              className="
                inline-flex
                items-center
                gap-3
                text-[#D9B07A]
                font-medium
              "
            >
              Conheça nossos sabores →
            </a>

          </div>

          <div className="relative">

            <img
              src="/images/cacau-illustration.png"
              alt="Cacau"
              className="
                w-full
                opacity-80
              "
            />

          </div>

        </div>

      </div>

    </section>
  );
}