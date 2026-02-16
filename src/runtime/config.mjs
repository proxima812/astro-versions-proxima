import { formatUtcDateTime } from "./format.mjs";

export const DEFAULT_WIDGET_CONFIG = {
  version: "0.0.0",
  builtAt: new Date().toISOString(),
  styling: {
    mode: "class",
  },
  header: {
    class: "avp-header-badge",
    style:
      "display:inline-flex;align-items:center;gap:0.25rem;padding:0.25rem 0.6rem;border-radius:999px;background:#111;color:#fff;font-size:0.78rem;font-weight:600;line-height:1;",
    prefix: "v",
    template: "{prefix}{version}",
  },
  footer: {
    class: "avp-footer-text",
    style: "font-size:0.875rem;opacity:0.8;",
    label: "Версия сайта:",
    separator: "•",
    template: "{label} {version} {separator} {datetime}",
  },
  time: {
    utcOffset: 0,
    locale: "ru-RU",
    dateOptions: {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
    timeOptions: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
    dateTimeSeparator: " - ",
    includeUtcLabel: true,
  },
};

function mergeObjects(base, patch) {
  if (!patch || typeof patch !== "object") return { ...base };
  return {
    ...base,
    ...patch,
  };
}

function readInjectedConfig() {
  if (typeof __AVP_WIDGET_CONFIG__ !== "undefined" && __AVP_WIDGET_CONFIG__) {
    return __AVP_WIDGET_CONFIG__;
  }

  return {};
}

export function getWidgetConfig() {
  const injected = readInjectedConfig();

  return {
    ...DEFAULT_WIDGET_CONFIG,
    ...injected,
    header: mergeObjects(DEFAULT_WIDGET_CONFIG.header, injected.header),
    footer: mergeObjects(DEFAULT_WIDGET_CONFIG.footer, injected.footer),
    styling: mergeObjects(DEFAULT_WIDGET_CONFIG.styling, injected.styling),
    time: mergeObjects(DEFAULT_WIDGET_CONFIG.time, injected.time),
  };
}

export function buildFooterText(config, props = {}) {
  const footer = mergeObjects(config.footer, props.footer);
  const time = mergeObjects(config.time, props.time);

  const version = props.version ?? config.version;
  const label = props.label ?? footer.label;
  const separator = props.separator ?? footer.separator;
  const builtAt = props.builtAt ?? config.builtAt;
  const datetime =
    props.datetime ??
    formatUtcDateTime(builtAt, {
      utcOffset: props.utcOffset ?? time.utcOffset,
      locale: props.locale ?? time.locale,
      dateOptions: props.dateOptions ?? time.dateOptions,
      timeOptions: props.timeOptions ?? time.timeOptions,
      dateTimeSeparator: props.dateTimeSeparator ?? time.dateTimeSeparator,
      includeUtcLabel: props.includeUtcLabel ?? time.includeUtcLabel,
    });

  const template = props.template ?? footer.template;

  return String(template)
    .replaceAll("{label}", String(label))
    .replaceAll("{version}", String(version))
    .replaceAll("{separator}", String(separator))
    .replaceAll("{datetime}", String(datetime));
}

export function buildHeaderText(config, props = {}) {
  const header = mergeObjects(config.header, props.header);
  const version = props.version ?? config.version;
  const prefix = props.prefix ?? header.prefix;
  const template = props.template ?? header.template;

  return String(template)
    .replaceAll("{prefix}", String(prefix))
    .replaceAll("{version}", String(version));
}
