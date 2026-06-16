import { replacements }
from "@/data/replacements";

export function fixText(
  text: string
) {
  let fixed = text;

  Object.entries(
    replacements
  ).forEach(
    ([wrong, correct]) => {
      fixed = fixed.replaceAll(
        wrong,
        correct
      );
    }
  );

  return fixed;
}