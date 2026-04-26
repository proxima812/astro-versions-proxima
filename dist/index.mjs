// src/integration/index.ts
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// src/runtime/config.ts
var DEFAULT_WIDGET_CONFIG = {
  version: "0.0.0",
  builtAt: (/* @__PURE__ */ new Date()).toISOString(),
  styling: {
    mode: "class"
  },
  header: {
    class: "avp-header-badge",
    style: "display:inline-flex;align-items:center;gap:0.25rem;padding:0.25rem 0.6rem;border-radius:999px;background:#111;color:#fff;font-size:0.78rem;font-weight:600;line-height:1;",
    prefix: "v",
    template: "{prefix}{version}"
  },
  footer: {
    class: "avp-footer-text",
    style: "font-size:0.875rem;opacity:0.8;",
    label: "\u0412\u0435\u0440\u0441\u0438\u044F \u0441\u0430\u0439\u0442\u0430:",
    separator: "\u2022",
    template: "{label} {version} {separator} {datetime}"
  },
  time: {
    utcOffset: 0,
    locale: "ru-RU",
    dateOptions: {
      day: "2-digit",
      month: "short",
      year: "numeric"
    },
    timeOptions: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    },
    dateTimeSeparator: " - ",
    includeUtcLabel: true
  }
};

// src/integration/index.ts
var LOGGER_PREFIX = "[astro-versions-proxima]";
function toRootPath(rootValue) {
  if (!rootValue) return process.cwd();
  if (typeof rootValue === "string") return rootValue;
  try {
    return fileURLToPath(rootValue);
  } catch {
    return process.cwd();
  }
}
function readPackageVersion(rootPath, packageJsonPath = "package.json") {
  const fullPath = path.resolve(rootPath, packageJsonPath);
  try {
    const raw = readFileSync(fullPath, "utf-8");
    const parsed = JSON.parse(raw);
    if (typeof parsed.version === "string" && parsed.version.trim().length > 0) {
      return parsed.version.trim();
    }
  } catch {
    return null;
  }
  return null;
}
function buildTimestampVersion(dateInput) {
  const safe = Number.isNaN(dateInput.getTime()) ? /* @__PURE__ */ new Date() : dateInput;
  const year = safe.getUTCFullYear();
  const month = String(safe.getUTCMonth() + 1).padStart(2, "0");
  const day = String(safe.getUTCDate()).padStart(2, "0");
  const hours = String(safe.getUTCHours()).padStart(2, "0");
  const minutes = String(safe.getUTCMinutes()).padStart(2, "0");
  return `${year}.${month}.${day}-${hours}${minutes}`;
}
function resolveVersion(options, context) {
  const { versionStrategy = "package", version, resolveVersion: resolveVersionFn } = options;
  if (typeof resolveVersionFn === "function") {
    const custom = resolveVersionFn(context);
    if (typeof custom === "string" && custom.trim().length > 0) return custom.trim();
  }
  if (versionStrategy === "manual") {
    if (typeof version === "string" && version.trim().length > 0) return version.trim();
    return DEFAULT_WIDGET_CONFIG.version;
  }
  if (versionStrategy === "timestamp") {
    return buildTimestampVersion(context.builtAt);
  }
  if (versionStrategy === "package") {
    if (context.packageVersion) return context.packageVersion;
    if (typeof version === "string" && version.trim().length > 0) return version.trim();
    return DEFAULT_WIDGET_CONFIG.version;
  }
  if (typeof version === "string" && version.trim().length > 0) return version.trim();
  return DEFAULT_WIDGET_CONFIG.version;
}
function mergeOptions(base, patch) {
  if (!patch || typeof patch !== "object") return { ...base };
  return { ...base, ...patch };
}
function buildWidgetConfig(options, rootPath) {
  const builtAtInput = typeof options.builtAt === "function" ? options.builtAt() : options.builtAt;
  const builtAtDate = builtAtInput ? new Date(builtAtInput) : /* @__PURE__ */ new Date();
  const builtAt = Number.isNaN(builtAtDate.getTime()) ? /* @__PURE__ */ new Date() : builtAtDate;
  const packageVersion = readPackageVersion(rootPath, options.packageJsonPath ?? "package.json");
  const resolvedVersion = resolveVersion(options, {
    builtAt,
    packageVersion,
    options
  });
  return {
    version: resolvedVersion,
    builtAt: builtAt.toISOString(),
    header: mergeOptions(DEFAULT_WIDGET_CONFIG.header, options.header),
    footer: mergeOptions(DEFAULT_WIDGET_CONFIG.footer, options.footer),
    styling: mergeOptions(DEFAULT_WIDGET_CONFIG.styling, options.styling),
    time: mergeOptions(DEFAULT_WIDGET_CONFIG.time, options.time)
  };
}
function versionsProxima(options = {}) {
  return {
    name: "astro-versions-proxima",
    hooks: {
      "astro:config:setup": ({ config, logger, updateConfig }) => {
        const rootPath = toRootPath(config.root);
        const widgetConfig = buildWidgetConfig(options, rootPath);
        logger.info(
          `${LOGGER_PREFIX} version=${widgetConfig.version} builtAt=${widgetConfig.builtAt} utcOffset=${widgetConfig.time?.utcOffset ?? 0}`
        );
        updateConfig({
          vite: {
            define: {
              __AVP_WIDGET_CONFIG__: JSON.stringify(widgetConfig)
            }
          }
        });
      }
    }
  };
}
var astroVersionsProxima = versionsProxima;
var integration_default = versionsProxima;
export {
  astroVersionsProxima,
  integration_default as default,
  versionsProxima
};
