import type { SocialObjects } from "./types";

export const SITE = {
  website: "https://blogeusz/",
  author: "Mateusz Stepaniuk",
  desc: "Prosty blog wzorowany na motywie Astro Paper.",
  title: "Blogeusz",
  ogImage: "blogeusz.png",
  lightAndDarkMode: true,
  postPerPage: 4,
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/stepaniukm",
    linkTitle: ` ${SITE.author} na Githubie`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/stpk75",
    linkTitle: `${SITE.author} na Instagramie`,
    active: false,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mateusz-stepaniuk-46653b188/",
    linkTitle: `${SITE.author} na LinkedInie`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:stepaniuk.m05@gmail.com",
    linkTitle: `Wyślij maila do ${SITE.author}`,
    active: true,
  },
  {
    name: "Twitch",
    href: "https://twitch.tv/frontlivepl",
    linkTitle: `${SITE.author} z kolegą na Twitchu`,
    active: true,
  },
  {
    name: "Discord",
    href: "https://discord.com/users/364130568876851210",
    linkTitle: `${SITE.author} na Discordzie`,
    active: true,
  },
];
