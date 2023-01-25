import { dirname, join } from "https://deno.land/std@0.170.0/path/mod.ts";

const DIRNAME = dirname(new URL(import.meta.url).pathname);
export const DATA_DIRNAME = join(DIRNAME, "data");
