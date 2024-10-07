export const GA_TRACKING_ID: string | undefined = process.env.NEXT_PUBLIC_GOOGLE_ID;

export const pageview = (url: string): void => {
  if (window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

interface EventParams {
  action: string;
  category: string;
  label: string;
  value?: number; // Se hace opcional
}

export const event = ({ action, category, label, value }: EventParams): void => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
