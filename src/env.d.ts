/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	PUBLIC_VERCEL_ENV: "development" | "preview" | "production";
	PUBLIC_VERCEL_URL: string;
	PUBLIC_VERCEL_GIT_COMMIT_REF: string;
	PUBLIC_VERCEL_GIT_COMMIT_SHA: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
