export const config = new Map([
  ["BUNGIE_BASE_URL", "https://bungie.net"],
  ["BUNGIE_API_KEY", Deno.env.get("BUNGIE_API_KEY") ?? ""],
]);
