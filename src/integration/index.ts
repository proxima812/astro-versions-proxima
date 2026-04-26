import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_WIDGET_CONFIG } from "../runtime/config.js";
import type {
  VersionsProximaOptions,
  VersionResolveContext,
  WidgetConfig,
  HeaderOptions,
  FooterOptions,
  StylingOptions,
  TimeOptions,
} from "../types.js";
import type { AstroIntegration } from "astro";

const LOGGER_PREFIX = "[astro-versions-proxima]";

function toRootPath(rootValue: string | URL | undefined): string {
  if (!rootValue) return process.cwd();
  if (typeof rootValue === "string") return rootValue;

  try {
    return fileURLToPath(rootValue);
  } catch {
    return process.cwd();
  }
}

function readPackageVersion(rootPath: string, packageJsonPath = "package.json"): string | null {
  const fullPath = path.resolve(rootPath, packageJsonPath);

  try {
    const raw = readFileSync(fullPath, "utf-8");
    const parsed = JSON.parse(raw) as { version?: unknown };
    if (typeof parsed.version === "string" && parsed.version.trim().length > 0) {
      return parsed.version.trim();
    }
  } catch {
    return null;
  }

  return null;
}

function buildTimestampVersion(dateInput: Date): string {
  const safe = Number.isNaN(dateInput.getTime()) ? new Date() : dateInput;

  const year = safe.getUTCFullYear();
  const month = String(safe.getUTCMonth() + 1).padStart(2, "0");
  const day = String(safe.getUTCDate()).padStart(2, "0");
  const hours = String(safe.getUTCHours()).padStart(2, "0");
  const minutes = String(safe.getUTCMinutes()).padStart(2, "0");

  return `${year}.${month}.${day}-${hours}${minutes}`;
}

function resolveVersion(options: VersionsProximaOptions, context: VersionResolveContext): string {
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

function mergeOptions<T extends object>(base: T, patch: Partial<T> | undefined): T {
  if (!patch || typeof patch !== "object") return { ...base };
  return { ...base, ...patch };
}

function buildWidgetConfig(options: VersionsProximaOptions, rootPath: string): WidgetConfig {
  const builtAtInput = typeof options.builtAt === "function" ? options.builtAt() : options.builtAt;
  const builtAtDate = builtAtInput ? new Date(builtAtInput as string | number | Date) : new Date();
  const builtAt = Number.isNaN(builtAtDate.getTime()) ? new Date() : builtAtDate;

  const packageVersion = readPackageVersion(rootPath, options.packageJsonPath ?? "package.json");

  const resolvedVersion = resolveVersion(options, {
    builtAt,
    packageVersion,
    options,
  });

  return {
    version: resolvedVersion,
    builtAt: builtAt.toISOString(),
    header: mergeOptions(DEFAULT_WIDGET_CONFIG.header as HeaderOptions, options.header),
    footer: mergeOptions(DEFAULT_WIDGET_CONFIG.footer as FooterOptions, options.footer),
    styling: mergeOptions(DEFAULT_WIDGET_CONFIG.styling as StylingOptions, options.styling),
    time: mergeOptions(DEFAULT_WIDGET_CONFIG.time as TimeOptions, options.time),
  };
}

export function versionsProxima(options: VersionsProximaOptions = {}): AstroIntegration {
  return {
    name: "astro-versions-proxima",
    hooks: {
      "astro:config:setup": ({ config, logger, updateConfig }) => {
        const rootPath = toRootPath(config.root);
        const widgetConfig = buildWidgetConfig(options, rootPath);

        logger.info(
          `${LOGGER_PREFIX} version=${widgetConfig.version} builtAt=${widgetConfig.builtAt} utcOffset=${widgetConfig.time?.utcOffset ?? 0}`,
        );

        updateConfig({
          vite: {
            define: {
              __AVP_WIDGET_CONFIG__: JSON.stringify(widgetConfig),
            },
          },
        });
      },
    },
  };
}

export const astroVersionsProxima = versionsProxima;
export default versionsProxima;
