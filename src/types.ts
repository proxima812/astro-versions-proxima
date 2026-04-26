import type { AstroIntegration } from "astro";

export type VersionStrategy = "manual" | "package" | "timestamp";
export type StylingMode = "class" | "inline" | "none";

export interface HeaderOptions {
  class?: string;
  style?: string;
  prefix?: string;
  template?: string;
}

export interface FooterOptions {
  class?: string;
  style?: string;
  label?: string;
  separator?: string;
  template?: string;
}

export interface TimeOptions {
  utcOffset?: number;
  locale?: string;
  dateOptions?: Intl.DateTimeFormatOptions;
  timeOptions?: Intl.DateTimeFormatOptions;
  dateTimeSeparator?: string;
  includeUtcLabel?: boolean;
}

export interface StylingOptions {
  mode?: StylingMode;
}

export interface VersionResolveContext {
  builtAt: Date;
  packageVersion: string | null;
  options: VersionsProximaOptions;
}

export interface VersionsProximaOptions {
  versionStrategy?: VersionStrategy;
  version?: string;
  resolveVersion?: (context: VersionResolveContext) => string | null | undefined;
  packageJsonPath?: string;
  builtAt?: string | number | Date | (() => string | number | Date);
  header?: HeaderOptions;
  footer?: FooterOptions;
  styling?: StylingOptions;
  time?: TimeOptions;
}

export interface WidgetConfig {
  version: string;
  builtAt: string;
  styling: StylingOptions;
  header: HeaderOptions;
  footer: FooterOptions;
  time: TimeOptions;
}

export declare function versionsProxima(options?: VersionsProximaOptions): AstroIntegration;
export declare const astroVersionsProxima: typeof versionsProxima;
