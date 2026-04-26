# astro-versions-proxima

**A lightweight Astro integration for displaying site version information** with a customizable version badge component.

Perfect for tracking deployment versions, build dates, and build metadata across your Astro site.

---

## Installation

Install using your preferred package manager:

```bash
# Using bun
bun add @proxima812/astro-versions-proxima

# Using npm
npm install @proxima812/astro-versions-proxima

# Using pnpm
pnpm add @proxima812/astro-versions-proxima
```

---

## Configuration

Add the integration to your `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import versionsProxima from "@proxima812/astro-versions-proxima";

export default defineConfig({
  integrations: [
    versionsProxima({
      // Version source: "manual" | "package" | "timestamp" | custom function
      versionStrategy: "package",
      
      // Styling approach
      styling: {
        mode: "class", // "class" (default) | "inline" | "none"
      },
      
      // Date/time formatting
      time: {
        utcOffset: 0,        // UTC timezone offset (in hours)
        locale: "en-US",     // BCP 47 locale tag
      },
      
      // Header badge configuration
      header: {
        prefix: "v",
        class: "site-version-badge",
      },
      
      // Footer text configuration
      footer: {
        label: "Site version:",
        separator: "•",
        class: "site-version-footer",
      },
    }),
  ],
});
```

---

## Usage

### Import the Component

Use `BadgeVersion` in your `.astro` files. The `variant` prop selects between header and footer modes (defaults to `"header"`):

```astro
---
import BadgeVersion from "@proxima812/astro-versions-proxima/components/BadgeVersion";
---

<header>
  <BadgeVersion />
</header>

<footer>
  <BadgeVersion variant="footer" />
</footer>
```

### Import Path

- **Integration**: `@proxima812/astro-versions-proxima`
- **Component**: `@proxima812/astro-versions-proxima/components/BadgeVersion`

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"header" \| "footer"` | `"header"` | Selects which config section and text builder to use |
| `class` | `string` | — | CSS class name (overrides default when `styleMode="class"`) |
| `style` | `string` | — | Inline styles (applied when `styleMode="inline"`) |
| `styleMode` | `"class" \| "inline" \| "none"` | — | Override styling mode for this instance |
| `version` | `string` | — | Override the resolved version string |
| `prefix` | `string` | — | Header: override the version prefix |
| `template` | `string` | — | Override the text template |
| `label` | `string` | — | Footer: override the label text |
| `separator` | `string` | — | Footer: override the separator |
| `utcOffset` | `number` | — | Footer: UTC offset for datetime display |
| `locale` | `string` | — | Footer: locale for date/time formatting |
| `includeUtcLabel` | `boolean` | `true` | Footer: append UTC offset label |

---

## Configuration Options

### Styling Modes

Three styling approaches to match your workflow:

| Mode | Behavior |
|------|----------|
| `"class"` (default) | Applies default class names, no inline styles |
| `"inline"` | Applies default inline styles |
| `"none"` | No default styles—full control |

**Default class names:**
- Header badge: `avp-header-badge`
- Footer text: `avp-footer-text`

### Version Strategies

Choose how your version is determined:

| Strategy | Description |
|----------|-------------|
| `"manual"` | Use explicit `version` option value |
| `"package"` | Read from `package.json` version field |
| `"timestamp"` | Auto-generate from build time (format: `YYYY.MM.DD-HHmm` UTC) |
| Custom function | `resolveVersion(context) => string` for full control |

### Template Tokens

Customize the text output using these tokens:

**Header (`variant="header"`):**
- `{prefix}` — prefix text (default: "v")
- `{version}` — resolved version string

**Footer (`variant="footer"`):**
- `{label}` — label text (default: "Site version:")
- `{version}` — resolved version string
- `{separator}` — separator character (default: "•")
- `{datetime}` — formatted build timestamp

---

## Quick Start Recipes

### 1. Plain CSS (Recommended)

Minimal setup with custom CSS styling:

**astro.config.mjs**

```js
import { defineConfig } from "astro/config";
import versionsProxima from "@proxima812/astro-versions-proxima";

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

**src/styles/global.css**

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

**src/pages/index.astro**

```astro
---
import BadgeVersion from "@proxima812/astro-versions-proxima/components/BadgeVersion";
---

<BadgeVersion />
<BadgeVersion variant="footer" />
```

### 2. Tailwind CSS

Use Tailwind for styling with class mode:

**Step 1: Add Tailwind**

```bash
bunx astro add tailwind --yes
```

**astro.config.mjs**

```js
import { defineConfig } from "astro/config";
import versionsProxima from "@proxima812/astro-versions-proxima";
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

**src/pages/index.astro**

```astro
---
import BadgeVersion from "@proxima812/astro-versions-proxima/components/BadgeVersion";
---

<BadgeVersion class="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white" />
<BadgeVersion variant="footer" class="mt-2 text-sm text-zinc-600" />
```

### 3. Fully Custom (No Default Styles)

Full control over markup and styling:

**astro.config.mjs**

```js
import { defineConfig } from "astro/config";
import versionsProxima from "@proxima812/astro-versions-proxima";

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

**src/pages/index.astro**

```astro
---
import BadgeVersion from "@proxima812/astro-versions-proxima/components/BadgeVersion";
---

<BadgeVersion />
<BadgeVersion variant="footer" />
```

---

## Building

Compile TypeScript and validate types:

```bash
bun run build     # Compile to dist/
bun run typecheck # Type-check only (no output)
```
