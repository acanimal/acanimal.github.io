import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://www.acuriousanimal.com/", // replace this with your deployed domain
  author: "Antonio Santiago",
  profile: "https://github.com/acanimal",
  desc: "Yet another blog in the wall",
  title: "🙈🙉🙊 A Curious Animal",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  // editPost: {
  //   url: "https://github.com/acanimal/edit/main/src/content/blog",
  //   text: "Suggest Changes",
  //   appendFilePath: true,
  // },
  ahrefWebAnalytics: "tk04qS6uv+jSZ+1bOCsq9g",
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/acanimal",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "GitLab",
    href: "https://gitlab.com/acanimal",
    linkTitle: `${SITE.title} on GitLab`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://github.com/acanimal",
    linkTitle: `${SITE.title} on Facebook`,
    active: false,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/acuriousanimal",
    linkTitle: `${SITE.title} on Instagram`,
    active: false,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/acanimal",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:asantiagop+website@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "X",
    href: "https://github.com/acanimal",
    linkTitle: `${SITE.title} on X`,
    active: false,
  },
  {
    name: "Mastodon",
    href: "https://github.com/acanimal",
    linkTitle: `${SITE.title} on Mastodon`,
    active: false,
  },
  {
    name: "Twitch",
    href: "https://github.com/acanimal",
    linkTitle: `${SITE.title} on Twitch`,
    active: false,
  },
  {
    name: "YouTube",
    href: "https://github.com/acanimal",
    linkTitle: `${SITE.title} on YouTube`,
    active: false,
  },
  {
    name: "WhatsApp",
    href: "https://github.com/acanimal",
    linkTitle: `${SITE.title} on WhatsApp`,
    active: false,
  },
  {
    name: "Snapchat",
    href: "https://github.com/acanimal",
    linkTitle: `${SITE.title} on Snapchat`,
    active: false,
  },
  {
    name: "Pinterest",
    href: "https://github.com/acanimal",
    linkTitle: `${SITE.title} on Pinterest`,
    active: false,
  },
  {
    name: "TikTok",
    href: "https://github.com/acanimal",
    linkTitle: `${SITE.title} on TikTok`,
    active: false,
  },
  {
    name: "CodePen",
    href: "https://github.com/acanimal",
    linkTitle: `${SITE.title} on CodePen`,
    active: false,
  },
  {
    name: "Discord",
    href: "https://github.com/acanimal",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
  {
    name: "Reddit",
    href: "https://github.com/acanimal",
    linkTitle: `${SITE.title} on Reddit`,
    active: false,
  },
  {
    name: "Skype",
    href: "https://github.com/acanimal",
    linkTitle: `${SITE.title} on Skype`,
    active: false,
  },
  {
    name: "Steam",
    href: "https://github.com/acanimal",
    linkTitle: `${SITE.title} on Steam`,
    active: false,
  },
  {
    name: "Telegram",
    href: "https://github.com/acanimal",
    linkTitle: `${SITE.title} on Telegram`,
    active: false,
  },
];
