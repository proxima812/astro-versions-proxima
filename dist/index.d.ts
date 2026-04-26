import { AstroIntegration } from 'astro';

type VersionStrategy = "manual" | "package" | "timestamp";
type StylingMode = "class" | "inline" | "none";
interface HeaderOptions {
    class?: string;
    style?: string;
    prefix?: string;
    template?: string;
}
interface FooterOptions {
    class?: string;
    style?: string;
    label?: string;
    separator?: string;
    template?: string;
}
interface TimeOptions {
    utcOffset?: number;
    locale?: string;
    dateOptions?: Intl.DateTimeFormatOptions;
    timeOptions?: Intl.DateTimeFormatOptions;
    dateTimeSeparator?: string;
    includeUtcLabel?: boolean;
}
interface StylingOptions {
    mode?: StylingMode;
}
interface VersionResolveContext {
    builtAt: Date;
    packageVersion: string | null;
    options: VersionsProximaOptions;
}
interface VersionsProximaOptions {
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
interface WidgetConfig {
    version: string;
    builtAt: string;
    styling: StylingOptions;
    header: HeaderOptions;
    footer: FooterOptions;
    time: TimeOptions;
}

declare function versionsProxima(options?: VersionsProximaOptions): AstroIntegration;
declare const astroVersionsProxima: typeof versionsProxima;

export { type FooterOptions, type HeaderOptions, type StylingMode, type StylingOptions, type TimeOptions, type VersionResolveContext, type VersionStrategy, type VersionsProximaOptions, type WidgetConfig, astroVersionsProxima, versionsProxima as default, versionsProxima };
