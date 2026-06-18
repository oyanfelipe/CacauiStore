import { Profile } from "@/types/caui";
import { fuse } from "./fuse";

export function generateResponse(
  text: string,
  profile: Profile,
  userText: string
) {
  const result = fuse.search(text);

  const intent = result[0]?.item.intent;

  switch (intent) {
    case "greeting":
      const greetings = [
        "Oi 🤎 Que bom te ver por aqui.",
        "Olá. Eu sou a Cauí. Como está seu dia?",
        "Seja bem-vindo à Cacauí. 🤎",
        "Que alegria receber sua visita. ✨",
      ];

      return greetings[
        Math.floor(Math.random() * greetings.length)
      ];

    case "thanks":
      return "Eu que agradeço sua companhia. 🤎";

    case "gift":
      return `
Chocolate é uma forma bonita de dizer:

"Eu lembrei de você."

🤎
`;

    case "flavor":
      return `
Depende do encontro. 🤎

Se você gosta de algo suave e acolhedor,
eu iria de Creme.

Se prefere algo mais marcante,
Amêndoa pode ser perfeita.
`;

    case "sad":
      return `
Talvez hoje não seja dia de escolher um sabor.

Talvez seja dia de se permitir um pequeno encontro consigo mesmo. 🤎
`;

    default:
      return `
Que interessante... 🤎

Me conte mais sobre esse encontro.
`;
  }
}