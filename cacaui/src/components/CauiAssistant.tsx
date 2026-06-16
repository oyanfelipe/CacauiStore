"use client";

import { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { intents } from "@/lib/cauiIntents";
import { cauiKeywords } from "@/lib/cauiKeywords";
import { cauiThoughts } from "@/lib/cauiThoughts";

const fuse = new Fuse(
  intents.flatMap((i) =>
    i.patterns.map((p) => ({
      pattern: p,
      intent: i.intent,
    })),
  ),
  {
    keys: ["pattern"],
    threshold: 0.4,
  },
);

type Profile = {
  name: string;
  likesIntense: boolean;
  likesCreamy: boolean;
  visits: number;
};

type Message = {
  sender: "user" | "caui";
  text: string;
};

const welcomeMessages = [
  "Alguns encontros duram minutos. Outros ficam para sempre. 🤎",
  "Hoje você veio buscar um presente ou criar uma lembrança?",
  "Um café, uma conversa e um bom chocolate já podem mudar um dia inteiro.",
  "Que bom te ver por aqui. 🤎",
];

export default function CauiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const [profile, setProfile] = useState<Profile>(() => {
    if (typeof window === "undefined") {
      return {
        name: "",
        likesIntense: false,
        likesCreamy: false,
        visits: 1,
      };
    }

    const saved = localStorage.getItem("cacaui-profile");

    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          likesIntense: false,
          likesCreamy: false,
          visits: 1,
        };
  });

  useEffect(() => {
    localStorage.setItem("cacaui-profile", JSON.stringify(profile));
  }, [profile]);
  useEffect(() => {
    const saved = localStorage.getItem("cacaui-profile");

    if (!saved) return;

    const parsed = JSON.parse(saved);

    setProfile({
      ...parsed,
      visits: (parsed.visits || 0) + 1,
    });
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isOpen) return;

      const thought =
        cauiThoughts[Math.floor(Math.random() * cauiThoughts.length)];

      setMessages((prev) => [
        ...prev,
        {
          sender: "caui",
          text: thought,
        },
      ]);
    }, 120000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "caui" as const,
      text: profile.name
        ? `Que bom te ver novamente, ${profile.name}. 🤎`
        : welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)],
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  const [input, setInput] = useState("");

  const fuse = new Fuse(
    cauiKeywords.map((word) => ({
      word,
    })),
    {
      keys: ["word"],
      threshold: 0.4,
    },
  );

  const sendMessage = () => {
    if (!input.trim()) return;

    const userText = input;

    const userMessage: Message = {
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setIsTyping(true);

    const text = userText
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    let response =
      "Que interessante... 🤎\n\nMe conte mais sobre esse encontro.";

    // =====================
    // MEMÓRIA DE SABORES
    // =====================

    if (text.includes("amendoa")) {
      setProfile((prev) => ({
        ...prev,
        likesIntense: true,
      }));
    }

    if (text.includes("creme") || text.includes("baunilha")) {
      setProfile((prev) => ({
        ...prev,
        likesCreamy: true,
      }));
    }

    // =====================
    // NOME DO USUÁRIO
    // =====================

    const match = userText.match(
      /(me chamo|meu nome e|meu nome é|sou o|sou a)\s+(.+)/i,
    );

    if (match) {
      const nome = match[2].trim();

      setProfile((prev) => ({
        ...prev,
        name: nome,
      }));

      response = `Prazer, ${nome}. 🤎\n\nVou guardar seu nome no meu Caderno de Encontros.`;
    }

    // =====================
    // LEMBRAR NOME
    // =====================

    if (
      text.includes("qual meu nome") ||
      text.includes("vc lembra meu nome") ||
      text.includes("voce lembra meu nome") ||
      text.includes("lembra meu nome")
    ) {
      response = profile.name
        ? `Seu nome é ${profile.name}. 🤎\n\nFoi assim que você se apresentou para mim.`
        : "Você ainda não me contou seu nome. 🤎";
    }

    // =====================
    // SAUDAÇÕES
    // =====================

    if (
      text === "oi" ||
      text === "ola" ||
      text === "olá" ||
      text === "oie" ||
      text === "opa" ||
      text === "eae" ||
      text.includes("bom dia") ||
      text.includes("boa tarde") ||
      text.includes("boa noite")
    ) {
      const greetings = [
        "Oi 🤎 Que bom te ver por aqui.",
        "Olá. Eu sou a Cauí. Como está seu dia?",
        "Seja bem-vindo à Cacauí. 🤎",
        "Que alegria receber sua visita.",
      ];

      response = greetings[Math.floor(Math.random() * greetings.length)];
    }

    // =====================
    // QUEM É A CAUÍ
    // =====================

    if (text.includes("quem e voce") || text.includes("quem e vc")) {
      response = `
Eu sou a Cauí. 🤎

Anfitriã da Cacauí.

Estou aqui para transformar chocolates em encontros inesquecíveis.
`;
    }

    // =====================
    // SABORES
    // =====================

    if (
      text.includes("melhor sabor") ||
      text.includes("qual sabor") ||
      text.includes("sabor")
    ) {
      response = `
Depende do encontro. 🤎

Se você gosta de algo suave e acolhedor, eu iria de Creme.

Se prefere algo mais marcante e crocante, Amêndoa pode ser a escolha perfeita.
`;
    }

    // =====================
    // FAVORITO
    // =====================

    if (text.includes("favorito") || text.includes("favorita")) {
      response = `
Eu nunca consigo decidir.

Em alguns dias sou Creme.

Em outros, completamente Amêndoa. 🌰
`;
    }

    // =====================
    // TRISTEZA
    // =====================

    if (
      text.includes("triste") ||
      text.includes("chateado") ||
      text.includes("desanimado")
    ) {
      response = `
Talvez hoje não seja dia de escolher um sabor.

Talvez seja dia de se permitir um pequeno encontro consigo mesmo. 🤎
`;
    }

    // =====================
    // PRESENTE
    // =====================

    if (text.includes("presente")) {
      response = `
Chocolate é uma forma bonita de dizer:

"Eu lembrei de você."

Acho que presentes carregam mais valor quando criam uma lembrança. 🤎
`;
    }

    // =====================
    // CRIADOR
    // =====================

    if (
      text.includes("quem criou") ||
      text.includes("quem fez") ||
      text.includes("fundador")
    ) {
      response = `A Cacauí nasceu da vontade de transformar chocolates em encontros inesquecíveis. ✨`;
    }

    // =====================
    // MEMÓRIA
    // =====================

    if (text.includes("lembra de mim") || text.includes("o que voce lembra")) {
      if (profile.likesIntense && profile.likesCreamy) {
        response =
          "Lembro que você gosta tanto de sabores suaves quanto dos mais marcantes. 🤎";
      } else if (profile.likesIntense) {
        response = "Lembro que você gosta de sabores mais intensos. 🌰";
      } else if (profile.likesCreamy) {
        response = "Lembro que você aprecia sabores suaves e acolhedores. ✨";
      } else {
        response = "Ainda estamos nos conhecendo. 🤎";
      }
    }

    // =====================
    // OBRIGADO
    // =====================

    if (text.includes("obrigado") || text.includes("valeu")) {
      response = "Eu que agradeço sua companhia. 🤎";
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "caui",
          text: response,
        },
      ]);

      setIsTyping(false);
    }, 1200);
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "caui",
        text: "Vamos começar um novo encontro. 🤎",
      },
    ]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
    fixed
    bottom-6
    right-6
    z-[999]

    w-16
    h-16

    rounded-full

    bg-[#1A120D]

    border
    border-[#D8B07B]/40

    backdrop-blur-xl

    flex
    items-center
    justify-center

    hover:scale-105
    transition
  "
      >
        <div className="caui-orb">
          <div className={`caui-core ${isTyping ? "speaking" : ""}`} />{" "}
        </div>
      </button>

      {isOpen && (
        <div
          className="
        fixed
        bottom-24
        right-6
        z-[999]

        w-[380px]
        h-[520px]

        rounded-[32px]

        bg-[#1A120D]/90
        backdrop-blur-2xl

        border
        border-[#B98A5D]/20

        shadow-2xl

        flex
        flex-col
      "
        >
          <div className="p-5 border-b border-white/10 flex justify-between items-center">
            <div>
              <h3 className="text-white text-xl font-serif">Cauí</h3>

              <p className="text-[#D8C4AC] text-sm">Anfitriã da Cacauí</p>
            </div>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="
      text-xs
      text-[#D8C4AC]
      hover:text-white
      transition
    "
            >
              ✨ Novo encontro
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={message.sender === "user" ? "text-right" : ""}
              >
                <div
                  className={`
                  inline-block
                  max-w-[85%]
                  rounded-2xl
                  px-4
                  py-3
                  whitespace-pre-line

                  ${
                    message.sender === "user"
                      ? "bg-[#B98A5D] text-[#1A120D]"
                      : "bg-white/10 text-white"
                  }
                `}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div
                className="
      inline-flex
      gap-1

      px-4
      py-3

      bg-white/10
      rounded-2xl
    "
              >
                <div
                  className="
        w-2 h-2
        rounded-full
        bg-white/60
        animate-bounce
      "
                />

                <div
                  className="
        w-2 h-2
        rounded-full
        bg-white/60
        animate-bounce
        [animation-delay:150ms]
      "
                />

                <div
                  className="
        w-2 h-2
        rounded-full
        bg-white/60
        animate-bounce
        [animation-delay:300ms]
      "
                />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-white/10 flex gap-2">
            <button
              onClick={() =>
                setMessages((prev) => [
                  ...prev,
                  {
                    sender: "caui" as const,
                    text: `
📖 Caderno de Encontros

Nome:
${profile.name || "Ainda não me contou"}

Visitas:
${profile.visits}

Sabores suaves:
${profile.likesCreamy ? "Sim 🤎" : "Ainda não sei"}

Sabores marcantes:
${profile.likesIntense ? "Sim 🌰" : "Ainda não sei"}

Observação da Cauí:

${
  profile.likesCreamy
    ? "Você parece gostar de encontros suaves."
    : profile.likesIntense
      ? "Você parece gostar de sabores mais marcantes."
      : "Ainda estamos nos conhecendo."
}
`,
                  },
                ])
              }
              className="
    text-xs
    text-[#D8C4AC]
    hover:text-white
  "
            >
              📖 Meu Caderno
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Converse com a Cauí..."
              className="
    flex-1
    bg-white/10
    text-white
    rounded-xl
    px-4
    py-3
    outline-none
  "
            />

            <button
              onClick={sendMessage}
              className="
            px-4
            rounded-xl

            bg-[#B98A5D]
            text-[#1A120D]
          "
            >
              →
            </button>
          </div>
        </div>
      )}
      {showResetConfirm && (
        <div
          className="
      fixed
      inset-0
      z-[1000]

      bg-black/50

      flex
      items-center
      justify-center
    "
        >
          <div
            className="
        w-[320px]

        bg-[#1A120D]
        border
        border-[#B98A5D]/20

        rounded-3xl

        p-6

        shadow-2xl
      "
          >
            <h3 className="text-white text-lg mb-3">✨ Novo encontro</h3>

            <p className="text-[#D8C4AC] text-sm mb-6">
              Toda boa conversa merece um novo começo.
              <br />
              <br />
              Deseja iniciar um novo encontro com a Cauí?
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="
            px-4
            py-2

            rounded-xl

            bg-white/10
            text-white
          "
              >
                Continuar conversa
              </button>

              <button
                onClick={() => {
                  clearChat();
                  setShowResetConfirm(false);
                }}
                className="
            px-4
            py-2

            rounded-xl

            bg-[#B98A5D]

            text-[#1A120D]
            font-medium
          "
              >
                Novo encontro
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
