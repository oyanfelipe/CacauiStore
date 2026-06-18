import Fuse from "fuse.js";
import { intents } from "./intents";

export const fuse = new Fuse(
  intents.flatMap((intent) =>
    intent.patterns.map((pattern) => ({
      pattern,
      intent: intent.intent,
    }))
  ),
  {
    keys: ["pattern"],
    threshold: 0.4,
  }
);