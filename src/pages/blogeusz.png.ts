import generateOgImage from "@utils/generateOgImage";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const png = await generateOgImage("Blogeusz");

  const headers = new Headers();

  headers.set("Content-Type", "image/png");
  headers.set("Cache-Control", "max-age=1, stale-while-revalidate=59");

  return new Response(png, { headers });
};
