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
interface WidgetConfig {
    version: string;
    builtAt: string;
    styling: StylingOptions;
    header: HeaderOptions;
    footer: FooterOptions;
    time: TimeOptions;
}

declare const DEFAULT_WIDGET_CONFIG: WidgetConfig;
declare function getWidgetConfig(): WidgetConfig;
interface FooterProps {
    version?: string;
    label?: string;
    separator?: string;
    builtAt?: string | number | Date;
    datetime?: string;
    template?: string;
    utcOffset?: number;
    locale?: string;
    dateOptions?: Intl.DateTimeFormatOptions;
    timeOptions?: Intl.DateTimeFormatOptions;
    dateTimeSeparator?: string;
    includeUtcLabel?: boolean;
    footer?: Partial<FooterOptions>;
    time?: Partial<TimeOptions>;
}
interface HeaderProps {
    version?: string;
    prefix?: string;
    template?: string;
    header?: Partial<HeaderOptions>;
}
declare function buildFooterText(config: WidgetConfig, props?: FooterProps): string;
declare function buildHeaderText(config: WidgetConfig, props?: HeaderProps): string;

export { DEFAULT_WIDGET_CONFIG, type FooterProps, type HeaderProps, buildFooterText, buildHeaderText, getWidgetConfig };
