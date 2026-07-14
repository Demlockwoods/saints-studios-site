import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets";
const SHEET_TAB = "Leads";

const LeadSchema = z.object({
  name: z.string().min(1),
  businessName: z.string().min(1),
  businessAndIndustry: z.string().default(""),
  need: z.string().default(""),
  websiteStatus: z.string().default(""),
  whatsapp: z.string().default(""),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const sheetsKey = process.env.GOOGLE_SHEETS_API_KEY;
    const spreadsheetId = process.env.LEADS_SPREADSHEET_ID;
    if (!lovableKey || !sheetsKey || !spreadsheetId) {
      return { ok: false as const, error: "not_configured" };
    }
    const row = [
      new Date().toISOString(),
      data.name,
      data.businessName,
      data.businessAndIndustry,
      data.need,
      data.websiteStatus,
      data.whatsapp,
    ];
    const url =
      `${GATEWAY_URL}/v4/spreadsheets/${spreadsheetId}/values/` +
      `${SHEET_TAB}!A1:G1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": sheetsKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [row] }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error(`[submitLead] sheet append failed [${res.status}]: ${body}`);
        return { ok: false as const, error: `sheet_${res.status}` };
      }
      return { ok: true as const };
    } catch (err) {
      console.error("[submitLead] sheet append threw", err);
      return { ok: false as const, error: "network" };
    }
  });
