interface IDataLayerObject {
  event?: string;
  page?: string;
  [key: string]: any;
}

interface ICustomWindow extends Window {
  dataLayer?: IDataLayerObject[];
}

declare let window: ICustomWindow;

export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

export const pageview = (url: string) => {
  if (!window.dataLayer) return;

  window.dataLayer.push({ event: 'pageview', page: url });
};
