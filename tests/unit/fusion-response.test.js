import { describe, expect, it } from "vitest";

import { parseFusionResponseText } from "../../open-sse/services/fusionResponse.js";

describe("parseFusionResponseText", () => {
  it("parses a normal JSON response", () => {
    expect(parseFusionResponseText('{"choices":[]}')).toEqual({ choices: [] });
  });

  it("parses an SSE data line", () => {
    expect(parseFusionResponseText('data: {"choices":[]}\n\ndata: [DONE]')).toEqual({ choices: [] });
  });

  it("parses the first object from concatenated JSON", () => {
    expect(parseFusionResponseText('{"choices":[]}\n{"extra":true}')).toEqual({ choices: [] });
  });
});
