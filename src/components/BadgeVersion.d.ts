/// <reference types="astro/client" />

import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { HeaderOptions, FooterOptions, TimeOptions } from "../types.js";

export interface Props extends Record<string, unknown> {
  /** "header" (default) or "footer" — selects which config section and text builder to use */
  variant?: "header" | "footer";
  /** CSS class name (overrides default when styleMode="class") */
  class?: string;
  /** Inline styles (applied when styleMode="inline") */
  style?: string;
  /** Styling mode: "class" | "inline" | "none" */
  styleMode?: "class" | "inline" | "none";
  /** Override the resolved version string */
  version?: string;

  // Header-specific props
  /** Override the version prefix (default: "v") */
  prefix?: string;
  /** Override the header template (tokens: {prefix}, {version}) */
  template?: string;
  /** Override header sub-options */
  header?: Partial<HeaderOptions>;

  // Footer-specific props
  /** Override the footer label */
  label?: string;
  /** Override the separator token */
  separator?: string;
  /** Override the build timestamp */
  builtAt?: string | number | Date;
  /** Provide a pre-formatted datetime string (skips auto-formatting) */
  datetime?: string;
  /** UTC offset for datetime display (e.g. 3 for UTC+3) */
  utcOffset?: number;
  /** Locale for date/time formatting (e.g. "en-US") */
  locale?: string;
  /** Intl.DateTimeFormat options for the date part */
  dateOptions?: Intl.DateTimeFormatOptions;
  /** Intl.DateTimeFormat options for the time part */
  timeOptions?: Intl.DateTimeFormatOptions;
  /** Separator between date and time parts (default: " - ") */
  dateTimeSeparator?: string;
  /** Whether to append UTC offset label (default: true) */
  includeUtcLabel?: boolean;
  /** Override footer sub-options */
  footer?: Partial<FooterOptions>;
  /** Override time sub-options */
  time?: Partial<TimeOptions>;
}

declare const BadgeVersion: AstroComponentFactory;
export default BadgeVersion;
