import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://www.acuriousanimal.com/",
    title: "🙈🙉🙊 A Curious Animal",
    description: "Yet another blog in the wall",
    author: "Antonio Santiago",
    profile: "https://github.com/acanimal",
    ogImage: "astropaper-og.jpg",
    lang: "en",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: "pagefind",
  },
  socials: [
    { name: "linkedin", url: "https://www.linkedin.com/in/acanimal" },
    { name: "github", url: "https://github.com/acanimal" },
    { name: "gitlab", url: "https://gitlab.com/acanimal" },
    // --- currently inactive, preserved for future re-enable ---
    // { name: "facebook", url: "https://github.com/acanimal" },
    // { name: "instagram", url: "https://www.instagram.com/acuriousanimal" },
    // { name: "mail", url: "mailto:asantiagop+website@gmail.com" },
    // { name: "x", url: "https://github.com/acanimal" },
    // { name: "mastodon", url: "https://github.com/acanimal" },
    // { name: "twitch", url: "https://github.com/acanimal" },
    // { name: "youtube", url: "https://github.com/acanimal" },
    // { name: "whatsapp", url: "https://github.com/acanimal" },
    // { name: "snapchat", url: "https://github.com/acanimal" },
    // { name: "pinterest", url: "https://github.com/acanimal" },
    // { name: "tiktok", url: "https://github.com/acanimal" },
    // { name: "codepen", url: "https://github.com/acanimal" },
    // { name: "discord", url: "https://github.com/acanimal" },
    // { name: "reddit", url: "https://github.com/acanimal" },
    // { name: "skype", url: "https://github.com/acanimal" },
    // { name: "steam", url: "https://github.com/acanimal" },
    // { name: "telegram", url: "https://github.com/acanimal" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});

/**
 * Ahrefs Web Analytics key. Custom to this site, no upstream AstroPaper
 * equivalent — read directly by Layout.astro.
 */
export const ahrefWebAnalyticsKey = "tk04qS6uv+jSZ+1bOCsq9g";
