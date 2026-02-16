# astro-versions-proxima

Astro integration for site version UI: header badge + footer text.

## EN

### Install

```bash
bun add astro-versions-proxima
```

### Setup (`astro.config.mjs`)

```js
import { defineConfig } from "astro/config";
import versionsProxima from "astro-versions-proxima";

export default defineConfig({
  integrations: [
    versionsProxima({
      versionStrategy: "manual",
      version: "2.4.3",
      builtAt: "2026-02-15T19:19:00.000Z",
      time: {
        utcOffset: 5,
        locale: "ru-RU",
      },
      header: {
        prefix: "v",
        class: "site-version-badge",
        style:
          "display:inline-flex;padding:4px 10px;border-radius:999px;background:#111;color:#fff;font-size:12px;font-weight:600;",
      },
      footer: {
        label: "Site version:",
        separator: "•",
        class: "site-version-footer",
        style: "font-size:14px;opacity:.85;",
      },
    }),
  ],
});
```

### Components

```astro
---
import { VHeaderBadge, VFooterText } from "astro-versions-proxima";
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

### Example output

- Header: `v2.4.3`
- Footer: `Site version: 2.4.3 • Feb 16, 2026 - 00:19 (UTC+5)`

### Version strategies

- `manual`: use `version` from integration options
- `package`: read from `package.json` (`version` field)
- `timestamp`: auto version in UTC format `YYYY.MM.DD-HHmm`
- `resolveVersion(context)`: fully custom logic

### Git push version bump (script-based)

If you want the version to change when pushing to Git, use `versionStrategy: "package"` and bump `package.json` before `git push`.

`package.json` example:

```json
{
  "scripts": {
    "version:bump": "bun version patch --no-git-tag-version",
    "push:versioned": "bun run version:bump && git add package.json && git commit -m \"chore: bump version\" && git push"
  }
}
```

Then push with:

```bash
bun run push:versioned
```

Alternative CI flow (recommended for teams): on push to `main`, run a workflow that bumps `package.json` and pushes back a `chore: bump version` commit.

### Template tokens

Header template:

- `{prefix}`
- `{version}`

Footer template:

- `{label}`
- `{version}`
- `{separator}`
- `{datetime}`

## RU

### Установка

```bash
bun add astro-versions-proxima
```

### Подключение (`astro.config.mjs`)

```js
import { defineConfig } from "astro/config";
import versionsProxima from "astro-versions-proxima";

export default defineConfig({
  integrations: [
    versionsProxima({
      versionStrategy: "manual",
      version: "2.4.3",
      builtAt: "2026-02-15T19:19:00.000Z",
      time: {
        utcOffset: 5,
        locale: "ru-RU",
      },
      header: {
        prefix: "v",
      },
      footer: {
        label: "Версия сайта:",
        separator: "•",
      },
    }),
  ],
});
```

### Компоненты

```astro
---
import { VHeaderBadge, VFooterText } from "astro-versions-proxima";
---

<header>
  <VHeaderBadge />
</header>

<footer>
  <VFooterText />
</footer>
```

### Пример вывода

- Header: `v2.4.3`
- Footer: `Версия сайта: 2.4.3 • 16 февр. 2026 - 00:19 (UTC+5)`

### Стратегии версии

- `manual`: вручную из `version`
- `package`: из `package.json` (`version`)
- `timestamp`: автоматически из времени сборки (`YYYY.MM.DD-HHmm`)
- `resolveVersion(context)`: кастомная функция

### Изменение версии при пуше в Git (через скрипт)

Чтобы версия обновлялась при пуше, используй `versionStrategy: "package"` и увеличивай версию в `package.json` перед `git push`.

Пример `package.json`:

```json
{
  "scripts": {
    "version:bump": "bun version patch --no-git-tag-version",
    "push:versioned": "bun run version:bump && git add package.json && git commit -m \"chore: bump version\" && git push"
  }
}
```

Пуш:

```bash
bun run push:versioned
```

Для команды/проекта удобнее CI-сценарий: workflow на пуш в `main`, который делает bump версии и коммитит `chore: bump version` обратно в репозиторий.

### Токены шаблонов

Header:

- `{prefix}`
- `{version}`

Footer:

- `{label}`
- `{version}`
- `{separator}`
- `{datetime}`

## ES

### Instalacion

```bash
bun add astro-versions-proxima
```

### Configuracion (`astro.config.mjs`)

```js
import { defineConfig } from "astro/config";
import versionsProxima from "astro-versions-proxima";

export default defineConfig({
  integrations: [
    versionsProxima({
      versionStrategy: "manual",
      version: "2.4.3",
      builtAt: "2026-02-15T19:19:00.000Z",
      time: {
        utcOffset: 5,
        locale: "es-ES",
      },
      header: {
        prefix: "v",
      },
      footer: {
        label: "Version del sitio:",
        separator: "•",
      },
    }),
  ],
});
```

### Componentes

```astro
---
import { VHeaderBadge, VFooterText } from "astro-versions-proxima";
---

<header>
  <VHeaderBadge />
</header>

<footer>
  <VFooterText />
</footer>
```

### Ejemplo de salida

- Header: `v2.4.3`
- Footer: `Version del sitio: 2.4.3 • 16 feb 2026 - 00:19 (UTC+5)`

### Estrategias de version

- `manual`: usar `version` manual
- `package`: leer `version` desde `package.json`
- `timestamp`: version automatica por build (`YYYY.MM.DD-HHmm`)
- `resolveVersion(context)`: logica personalizada

### Cambio de version al hacer push (con script)

Para cambiar la version en cada push, usa `versionStrategy: "package"` y aumenta la version de `package.json` antes de `git push`.

Ejemplo en `package.json`:

```json
{
  "scripts": {
    "version:bump": "bun version patch --no-git-tag-version",
    "push:versioned": "bun run version:bump && git add package.json && git commit -m \"chore: bump version\" && git push"
  }
}
```

Luego:

```bash
bun run push:versioned
```

Alternativa recomendada para equipos: workflow de CI en push a `main` que actualiza `package.json` y crea commit `chore: bump version`.

### Tokens de plantilla

Header:

- `{prefix}`
- `{version}`

Footer:

- `{label}`
- `{version}`
- `{separator}`
- `{datetime}`
