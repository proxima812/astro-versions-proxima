const DEFAULT_DATE_OPTIONS = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};

const DEFAULT_TIME_OPTIONS = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

function toDate(input) {
  if (input instanceof Date) return new Date(input.getTime());
  if (typeof input === "number" || typeof input === "string") {
    const date = new Date(input);
    if (!Number.isNaN(date.getTime())) return date;
  }
  return new Date();
}

function normalizeOffset(utcOffset) {
  const numeric = Number(utcOffset);
  if (!Number.isFinite(numeric)) return 0;
  return numeric;
}

export function formatOffsetLabel(utcOffset) {
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

export function formatUtcDateTime(input, options = {}) {
  const {
    utcOffset = 0,
    locale = "ru-RU",
    dateOptions = DEFAULT_DATE_OPTIONS,
    timeOptions = DEFAULT_TIME_OPTIONS,
    dateTimeSeparator = " - ",
    includeUtcLabel = true,
  } = options;

  const offset = normalizeOffset(utcOffset);
  const date = toDate(input);
  const shifted = new Date(date.getTime() + offset * 60 * 60 * 1000);

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    ...DEFAULT_DATE_OPTIONS,
    ...(dateOptions || {}),
    timeZone: "UTC",
  });

  const timeFormatter = new Intl.DateTimeFormat(locale, {
    ...DEFAULT_TIME_OPTIONS,
    ...(timeOptions || {}),
    timeZone: "UTC",
  });

  const datePart = dateFormatter.format(shifted);
  const timePart = timeFormatter.format(shifted);
  const base = `${datePart}${dateTimeSeparator}${timePart}`;

  if (!includeUtcLabel) return base;
  return `${base} (UTC${formatOffsetLabel(offset)})`;
}
