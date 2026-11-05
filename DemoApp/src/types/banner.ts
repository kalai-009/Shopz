export type MonochromeIconName = string;

export interface PromoBannerItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  discountHighlight: string;
  tagline: string;
  bankOffer: string;
  ctaText: string;
  themeColor: string;
  accentColor: string;
  secondaryColor: string;
  iconName: MonochromeIconName;
  iconSymbol?: string;
  assuredBadge?: boolean;
}
