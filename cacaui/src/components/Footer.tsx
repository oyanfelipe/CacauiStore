export default function Footer() {
  return (
    <footer className="bg-[#1D110C] text-[#EAD7C0]">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-3 gap-12">

          {/* Marca */}

          <div className="text-center lg:text-left">

            <img
              src="/footer-cacaui.png"
              alt="Cacauí"
              className="w-58 mb-5"
            />

            <p className="mt-6 text-[#B28F6D] leading-relaxed">
Criando sabores, histórias e encontros.
            </p>

          </div>

          {/* Navegação */}

          <div>

            <h4 className="font-medium text-xl mb-6">
              Navegação
            </h4>

            <ul className="space-y-4 text-[#C5A98B]">

              <li>
                <a href="#">
                  Início
                </a>
              </li>

              <li>
                <a href="#sabores">
                  Nossos Encontros
                </a>
              </li>

              <li>
                <a href="#pedido">
                  Fazer Pedido
                </a>
              </li>

            </ul>

          </div>

          {/* Contato */}

          <div>

            <h4 className="font-medium text-xl mb-6">
              Contato
            </h4>

            <div className="space-y-4">

              <a
                href="https://wa.me/5521988113634"
                target="_blank"
                className="block text-[#C5A98B]"
              >
                WhatsApp
              </a>

              <a
                href="https://instagram.com/cacaui.doceencontro"
                target="_blank"
                className="block text-[#C5A98B]"
              >
                Instagram
              </a>

            </div>

          </div>

        </div>

        <div className="border-t border-[#3A2418] mt-16 pt-8 text-center">

          <p className="text-[#A17C52] text-sm">
            © 2026 Cacauí Doce Encontro.
            Todos os direitos reservados.
          </p>

        </div>

      </div>

    </footer>
  );
}