import Fuse from "fuse.js";

import { intents }
from "@/data/intents";

const fuse = new Fuse(
  intents.flatMap((intent) =>
    intent.keywords.map((k) => ({
      keyword: k,
      intent,
    }))
  ),
  {
    keys: ["keyword"],
    threshold: 0.4,
  }
);

export function findIntent(
  text: string
) {
  const result =
    fuse.search(text);

  return result[0]?.item.intent;
}