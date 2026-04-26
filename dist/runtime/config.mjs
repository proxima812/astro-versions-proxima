// src/runtime/format.ts
var DEFAULT_DATE_OPTIONS = {
  day: "2-digit",
  month: "short",
  year: "numeric"
};
var DEFAULT_TIME_OPTIONS = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
};
function toDate(input) {
  if (input instanceof Date) return new Date(input.getTime());
  if (typeof input === "number" || typeof input === "string") {
    const date = new Date(input);
    if (!Number.isNaN(date.getTime())) return date;
  }
  return /* @__PURE__ */ new Date();
}
function normalizeOffset(utcOffset) {
  const numeric = Number(utcOffset);
  if (!Number.isFinite(numeric)) return 0;
  return numeric;
}
function formatOffsetLabel(utcOffset) {
  const normalized = normalizeOffset(utcOffset);
  const totalMinutes = Math.round(normalized * 60);
  const sign = totalMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(totalMinutes);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  if (minutes === 0) {
    return `${sign}${hours}`;
  }
  return `${sign}${hours}:${String(minutes).padStart(2, "0")}`;
}
function formatUtcDateTime(input, options = {}) {
  const {
    utcOffset = 0,
    locale = "ru-RU",
    dateOptions = DEFAULT_DATE_OPTIONS,
    timeOptions = DEFAULT_TIME_OPTIONS,
    dateTimeSeparator = " - ",
    includeUtcLabel = true
  } = options;
  const offset = normalizeOffset(utcOffset);
  const date = toDate(input);
  const shifted = new Date(date.getTime() + offset * 60 * 60 * 1e3);
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    ...DEFAULT_DATE_OPTIONS,
    ...dateOptions || {},
    timeZone: "UTC"
  });
  const timeFormatter = new Intl.DateTimeFormat(locale, {
    ...DEFAULT_TIME_OPTIONS,
    ...timeOptions || {},
    timeZone: "UTC"
  });
  const datePart = dateFormatter.format(shifted);
  const timePart = timeFormatter.format(shifted);
  const base = `${datePart}${dateTimeSeparator}${timePart}`;
  if (!includeUtcLabel) return base;
  return `${base} (UTC${formatOffsetLabel(offset)})`;
}

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
function mergeObjects(base, patch) {
  if (!patch || typeof patch !== "object") return { ...base };
  return { ...base, ...patch };
}
function readInjectedConfig() {
  if (typeof __AVP_WIDGET_CONFIG__ !== "undefined" && __AVP_WIDGET_CONFIG__) {
    return __AVP_WIDGET_CONFIG__;
  }
  return {};
}
function getWidgetConfig() {
  const injected = readInjectedConfig();
  return {
    ...DEFAULT_WIDGET_CONFIG,
    ...injected,
    header: mergeObjects(DEFAULT_WIDGET_CONFIG.header, injected.header),
    footer: mergeObjects(DEFAULT_WIDGET_CONFIG.footer, injected.footer),
    styling: mergeObjects(DEFAULT_WIDGET_CONFIG.styling, injected.styling),
    time: mergeObjects(DEFAULT_WIDGET_CONFIG.time, injected.time)
  };
}
function buildFooterText(config, props = {}) {
  const footer = mergeObjects(config.footer, props.footer);
  const time = mergeObjects(config.time, props.time);
  const version = props.version ?? config.version;
  const label = props.label ?? footer.label;
  const separator = props.separator ?? footer.separator;
  const builtAt = props.builtAt ?? config.builtAt;
  const datetime = props.datetime ?? formatUtcDateTime(builtAt, {
    utcOffset: props.utcOffset ?? time.utcOffset,
    locale: props.locale ?? time.locale,
    dateOptions: props.dateOptions ?? time.dateOptions,
    timeOptions: props.timeOptions ?? time.timeOptions,
    dateTimeSeparator: props.dateTimeSeparator ?? time.dateTimeSeparator,
    includeUtcLabel: props.includeUtcLabel ?? time.includeUtcLabel
  });
  const template = props.template ?? footer.template;
  return String(template).replaceAll("{label}", String(label)).replaceAll("{version}", String(version)).replaceAll("{separator}", String(separator)).replaceAll("{datetime}", String(datetime));
}
function buildHeaderText(config, props = {}) {
  const header = mergeObjects(config.header, props.header);
  const version = props.version ?? config.version;
  const prefix = props.prefix ?? header.prefix;
  const template = props.template ?? header.template;
  return String(template).replaceAll("{prefix}", String(prefix)).replaceAll("{version}", String(version));
}
export {
  DEFAULT_WIDGET_CONFIG,
  buildFooterText,
  buildHeaderText,
  getWidgetConfig
};
