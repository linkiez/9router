function parseJsonObject(text) {
  const start = text.indexOf("{");
  if (start < 0) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < text.length; index++) {
    const character = text[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    else if (character === "{") depth++;
    else if (character === "}" && --depth === 0) {
      try {
        return JSON.parse(text.slice(start, index + 1));
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function parseFusionResponseText(text) {
  const source = String(text || "").trim();
  if (!source) return null;

  try {
    return JSON.parse(source);
  } catch {
    for (const line of source.split("\n")) {
      const payload = line.trim().replace(/^data:\s*/, "");
      if (!payload || payload === "[DONE]") continue;
      try {
        return JSON.parse(payload);
      } catch {
        // Continue to the balanced-object fallback for concatenated JSON.
      }
    }
  }

  return parseJsonObject(source);
}
