import { intents }
from "@/data/intents";

import { randomItem }
from "./random";

export function getResponse(
  text: string
) {
  for (const intent of intents) {
    const found =
      intent.keywords.some(
        (keyword) =>
          text.includes(keyword)
      );

    if (found) {
      return randomItem(
        intent.responses
      );
    }
  }

  return `
Que interessante... 🤎

Me conte mais sobre isso.
`;
}