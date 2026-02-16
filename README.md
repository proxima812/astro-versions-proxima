# astro-versions-proxima

Astro integration for a site version UI: header badge + footer text.

## Install

```bash
bun add astro-versions-proxima
```

## Setup (`astro.config.mjs`)

```js
import { defineConfig } from "astro/config";
import versionsProxima from "astro-versions-proxima";

export default defineConfig({
  integrations: [
    versionsProxima({
      versionStrategy: "package", // "manual" | "package" | "timestamp"
      styling: {
        mode: "class", // "class" (default) | "inline" | "none"
      },
      time: {
        utcOffset: 0,
        locale: "en-US",
      },
      header: {
        prefix: "v",
        class: "site-version-badge",
      },
      footer: {
        label: "Site version:",
        separator: "•",
        class: "site-version-footer",
      },
    }),
  ],
});
```

## Components

```astro
---
import VHeaderBadge from "astro-versions-proxima/components/VHeaderBadge";
import VFooterText from "astro-versions-proxima/components/VFooterText";
---

<header>
  <VHeaderBadge />
</header>

<footer>
  <VFooterText />
</footer>
```

Direct imports:
- `astro-versions-proxima/components/VHeaderBadge`
- `astro-versions-proxima/components/VFooterText`

## Styling Modes

`styling.mode` supports 3 modes:

- `"class"` (default): default class names are applied, no default inline styles.
- `"inline"`: default inline styles are applied.
- `"none"`: no default class names and no default inline styles.

Default class names:
- Header: `avp-header-badge`
- Footer: `avp-footer-text`

## Version Strategies

- `manual`: use `version` from options.
- `package`: read `version` from `package.json`.
- `timestamp`: auto-generate from build time in `YYYY.MM.DD-HHmm` (UTC).
- `resolveVersion(context)`: custom function override.

## Template Tokens

Header template tokens:
- `{prefix}`
- `{version}`

Footer template tokens:
- `{label}`
- `{version}`
- `{separator}`
- `{datetime}`

## Copy-Paste Ready Recipes

### 1) Plain CSS (recommended starter)

`astro.config.mjs`

```js
import { defineConfig } from "astro/config";
import versionsProxima from "astro-versions-proxima";

export default defineConfig({
  integrations: [
    versionsProxima({
      versionStrategy: "manual",
      version: "2.4.3",
      styling: { mode: "class" },
      header: { class: "site-version-badge" },
      footer: { class: "site-version-footer", label: "Site version:" },
    }),
  ],
});
```

`src/styles/global.css`

```css
.site-version-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: #111;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1;
}

.site-version-footer {
  font-size: 0.875rem;
  opacity: 0.8;
}
```

`src/pages/index.astro`

```astro
---
import VHeaderBadge from "astro-versions-proxima/components/VHeaderBadge";
import VFooterText from "astro-versions-proxima/components/VFooterText";
---

<VHeaderBadge />
<VFooterText />
```

### 2) Tailwind (ready to paste)

1. Add Tailwind:

```bash
bunx astro add tailwind --yes
```

2. Use this config and component usage:

`astro.config.mjs`

```js
import { defineConfig } from "astro/config";
import versionsProxima from "astro-versions-proxima";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [
    versionsProxima({
      versionStrategy: "package",
      styling: { mode: "class" },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

`src/pages/index.astro`

```astro
---
import VHeaderBadge from "astro-versions-proxima/components/VHeaderBadge";
import VFooterText from "astro-versions-proxima/components/VFooterText";
---

<VHeaderBadge class="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white" />
<VFooterText class="mt-2 text-sm text-zinc-600" />
```

### 3) Fully custom markup styles (`mode: "none"`)

If you want to control everything manually:

`astro.config.mjs`

```js
import { defineConfig } from "astro/config";
import versionsProxima from "astro-versions-proxima";

export default defineConfig({
  integrations: [
    versionsProxima({
      versionStrategy: "manual",
      version: "9.9.9",
      styling: { mode: "none" },
    }),
  ],
});
```

`src/pages/index.astro`

```astro
---
import VHeaderBadge from "astro-versions-proxima/components/VHeaderBadge";
import VFooterText from "astro-versions-proxima/components/VFooterText";
---

<VHeaderBadge class="my-own-badge" />
<VFooterText class="my-own-footer" />
```

## Build Check

```bash
bun run build
```
