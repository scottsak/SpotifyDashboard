

export const getFaviconUrl = (urlToConvert: string | undefined): string => {
  if (!urlToConvert) {
    return '';
  }
  const url: URL = new URL(chrome.runtime.getURL('/_favicon/'));
  url.searchParams.set('pageUrl', urlToConvert);
  url.searchParams.set('size', '32');
  return url.toString();
};