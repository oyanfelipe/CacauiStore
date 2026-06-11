"use client";

import { useState } from "react";
import { useEffect } from "react";

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

const responses: Record<string, string> = {
  sabor: `
Depende do encontro. 🤎

Se você gosta de algo suave e acolhedor, eu iria de Creme.

Se prefere algo mais marcante e crocante, Amêndoa pode ser a escolha perfeita.
`,

  criou: `A Cacauí nasceu da vontade de transformar chocolates em encontros inesquecíveis. ✨`,

  triste: `
Então talvez hoje não seja dia de escolher um sabor.

Talvez seja dia de se permitir um pequeno encontro consigo mesmo. 🤎
`,

  favorito: `
Eu nunca consigo decidir.

Em alguns dias sou Creme.

Em outros, completamente Amêndoa. 🌰
`,
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
  const [profile, setProfile] = useState<Profile>(() => {
  if (typeof window === "undefined") {
    return {
      name: "",
      likesIntense: false,
      likesCreamy: false,
      visits: 1,
    };
  }

  const saved =
    localStorage.getItem("cacaui-profile");

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
  localStorage.setItem(
    "cacaui-profile",
    JSON.stringify(profile)
  );
}, [profile]);
useEffect(() => {
  const saved =
    localStorage.getItem("cacaui-profile");

  if (!saved) return;

  const parsed =
    JSON.parse(saved);

  setProfile({
    ...parsed,
    visits: (parsed.visits || 0) + 1,
  });
}, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "caui",
      text: welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)],
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userText = input;

    const userMessage = {
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setIsTyping(true);

    let response = "Que interessante... me conte mais sobre esse encontro. 🤎";

    const text = userText.toLowerCase();
    
if (
  text.includes("amêndoa") ||
  text.includes("amendoa")
) {
  setProfile((prev) => ({
    ...prev,
    likesIntense: true,
  }));
}

if (
  text.includes("creme") ||
  text.includes("baunilha")
) {
  setProfile((prev) => ({
    ...prev,
    likesCreamy: true,
  }));
}

    if (text.includes("sabor") || text.includes("melhor")) {
      response = responses.sabor;
    }

    if (text.includes("quem criou") || text.includes("fundou")) {
      response = responses.criou;
    }

    if (text.includes("triste") || text.includes("chateado")) {
      response = responses.triste;
    }

    if (text.includes("favorito")) {
      response = responses.favorito;
    }
    if (
  text.includes("lembra de mim") ||
  text.includes("o que você lembra")
) {
  if (
    profile.likesIntense &&
    profile.likesCreamy
  ) {
    response =
      "Lembro que você gosta tanto dos encontros suaves quanto dos mais marcantes. 🤎";
  } else if (profile.likesIntense) {
    response =
      "Lembro que você costuma gostar de sabores mais intensos. 🌰";
  } else if (profile.likesCreamy) {
    response =
      "Lembro que você aprecia sabores suaves e acolhedores. ✨";
  } else {
    response =
      "Ainda estamos nos conhecendo. 🤎";
  }
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
    }, 1800);
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

      rounded-full

      bg-[#3A2418]
      text-white

      px-6
      py-4

      shadow-xl
    "
      >
        🤎 Cauí
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
          <div className="p-5 border-b border-white/10">
            <h3 className="text-white text-xl font-serif">Cauí 🤎</h3>

            <p className="text-[#D8C4AC] text-sm">Anfitriã da Cacauí</p>
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
          </div>

          <div className="p-4 border-t border-white/10 flex gap-2">
          <button
  onClick={() =>
    setMessages((prev) => [
      ...prev,
      {
        sender: "caui",
        text: `📖 Caderno de Encontros

Visitas: ${profile.visits}

Sabores suaves:
${profile.likesCreamy ? "Sim" : "Não"}

Sabores marcantes:
${profile.likesIntense ? "Sim" : "Não"}
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
    </>
  );
}
