"use client";

import { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { intents } from "@/lib/caui/intents";
import { cauiThoughts } from "@/lib/caui/thoughts";
import { generateResponse } from "@/lib/caui/generateResponse";
import { useCauiStorage } from "@/hooks/useCauiStorage";

// ======================
// TYPES
// ======================

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
  // ======================
  // REFS
  // ======================

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // ======================
  // UI STATE
  // ======================

  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
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
    const saved = localStorage.getItem("cacaui-profile");

    if (!saved) return;

    const parsed = JSON.parse(saved);

    setProfile({
      ...parsed,
      visits: (parsed.visits || 0) + 1,
    });
  }, []);

  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") {
      return [
        {
          sender: "caui",
          text: welcomeMessages[
            Math.floor(Math.random() * welcomeMessages.length)
          ],
        },
      ];
    }

    const saved = localStorage.getItem("cacaui-messages");

    if (saved) {
      return JSON.parse(saved);
    }

    return [
      {
        sender: "caui",
        text: profile.name
          ? `Que bom te ver novamente, ${profile.name}. 🤎`
          : welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)],
      },
    ];
  });

  useCauiStorage(profile, messages);

  useEffect(() => {
    if (!isOpen) return;

    setTimeout(() => {
      messagesContainerRef.current?.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "auto",
      });
    }, 50);
  }, [isOpen]);

  const [input, setInput] = useState("");

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

    // limpa qualquer timer anterior
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    const text = userText
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const response = generateResponse(text, profile, userText);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "caui",
          text: response,
        },
      ]);

      setIsTyping(false);

      // depois da resposta da Cauí,
      // inicia contagem de 4 minutos

      inactivityTimer.current = setTimeout(() => {
        const thought =
          cauiThoughts[Math.floor(Math.random() * cauiThoughts.length)];

        setMessages((prev) => [
          ...prev,
          {
            sender: "caui",
            text: thought,
          },
        ]);

        // evita enviar outra mensagem
        inactivityTimer.current = null;
      }, 240000);
    }, 1200);
  };

  const clearChat = () => {
    const newMessages = [
      {
        sender: "caui" as const,
        text: "Vamos começar um novo encontro. 🤎",
      },
    ];

    setMessages(newMessages);

    localStorage.removeItem("cacaui-messages");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
    fixed
bottom-24
right-5

md:bottom-8
md:right-8
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
        <>
          <div
            className="fixed inset-0 z-[998]"
            onClick={() => {
              setIsOpen(false);

              if (inactivityTimer.current) {
                clearTimeout(inactivityTimer.current);
              }
            }}
          />

          <div
            className="
        fixed
        bottom-24
        right-6
        z-[999]

        w-[95vw]
max-w-[380px]

h-[70vh]
max-h-[520px]

        rounded-[32px]

        bg-[#1A120D]/90
        backdrop-blur-2xl

        border
        border-[#B98A5D]/20

        shadow-2xl

        flex
        flex-col
      "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-white/10 flex justify-between items-center">
              <div>
                <h3 className="text-white text-xl font-serif">Cauí</h3>

                <p className="text-[#D8C4AC] text-sm">Anfitriã da Cacauí</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="
    flex
    items-center
    gap-2

    px-3
    py-2

    rounded-xl

    bg-[#B98A5D]/10

    border
    border-[#B98A5D]/20

    text-[#D8C4AC]

    hover:bg-[#B98A5D]/20
  "
                >
                  <span>Nova conversa</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="
        text-2xl
        text-[#D5C0A6]
        hover:text-white
      "
                >
                  ✕
                </button>
              </div>
            </div>
            <div
              ref={messagesContainerRef}
              className="caui-scroll flex-1 overflow-y-auto p-4 space-y-4"
            >
              {" "}
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
        </>
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
