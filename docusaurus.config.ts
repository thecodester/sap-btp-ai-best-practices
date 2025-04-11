import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "SAP BTP AI Best Practices",
  tagline: "Your Ultimate Guide for Building AI Solutions on BTP",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://sap-samples.github.io/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.NODE_ENV === "development" ? "/" : "/sap-btp-ai-best-practices/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "sap-samples", // Usually your GitHub org/user name.
  projectName: "sap-btp-ai-best-practices", // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"]
  },

  // Add SAP Icon Font
  stylesheets: [
    {
      href: "https://ui5.sap.com/resources/sap/ui/core/themes/base/fonts/SAP-icons.woff2",
      type: "font/woff2",
      crossorigin: "anonymous"
    }
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts"
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/SAP-samples/sap-btp-ai-best-practices/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/SAP-samples/sap-btp-ai-best-practices/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn"
        },
        theme: {
          customCss: "./src/css/custom.css"
        }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "BTP AI Best Practices",
      logo: {
        alt: "SAP Logo",
        src: "img/logo.svg"
      },
      items: [
        { to: "/docs/category/functional-view", label: "Functional View", position: "left" },
        {
          // type: "docSidebar",
          // sidebarId: "tutorialSidebar",
          to: "/docs/category/technical-view",
          position: "left",
          label: "Technical View"
        },
        // { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/SAP-samples/sap-btp-ai-best-practices",
          className: "navbar-icon-link",
          "aria-label": "GitHub repository",
          html: `<img src="${process.env.NODE_ENV === "development" ? "/" : "/sap-btp-ai-best-practices/"}img/github.svg" alt="GitHub" width="32" height="32" />`,
          position: "right"
        }
      ]
    },
    docs: {
      sidebar: {
        hideable: true
      }
    },
    footer: {
      style: "light",
      links: [
        {
          title: "SAP Logo",
          items: [
            {
              html: `
                <a href="${process.env.NODE_ENV === "development" ? "/" : "/sap-btp-ai-best-practices/"}" aria-label="SAP Logo">
                  <img src="${process.env.NODE_ENV === "development" ? "/" : "/sap-btp-ai-best-practices/"}img/logo.svg" alt="SAP Logo" height="50" />
                </a>`
            }
          ]
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/SAP-samples/sap-btp-ai-best-practices"
            }
          ]
        },
        {
          title: "Resources",
          items: [
            {
              label: "Technologies",
              to: "/"
            },
            {
              label: "Glossary",
              href: "/"
            }
          ]
        },
        {
          title: "Legal & Privacy",
          items: [
            {
              label: "Privacy",
              to: "/privacy"
            },
            {
              label: "Legal Disclosure",
              href: "https://www.sap.com/impressum"
            },
            {
              label: "Terms of Use",
              href: "https://www.sap.com/terms-of-use"
            },
            {
              label: "Trademark",
              href: "https://www.sap.com/trademark"
            }
          ]
        },
        {
          title: "Contact Us",
          items: [
            {
              label: "Provide Feedback",
              to: "mailto:btp_ai_bp@sap.com?subject=[SAP BTP AI Best Practices Feedback]"
            },
            {
              label: "Report Issue",
              href: "https://github.com/SAP-samples/sap-btp-ai-best-practices/issues/new"
            },
            {
              label: "Questions",
              href: "mailto:btp_ai_bp@sap.com?subject=[SAP BTP AI Best Practices Questions]"
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()}, SAP SE`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    }
  } satisfies Preset.ThemeConfig
};

export default config;
