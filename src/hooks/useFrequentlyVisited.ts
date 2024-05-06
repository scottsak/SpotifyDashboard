import { useEffect, useState } from "react";
import { getFaviconUrl } from "../util/getFaviconUrl";

export type TopSite = {
  url: string,
  title: string,
  faviconUrl?: string
}
type SetTopSites = (topSites: TopSite[] | null) => void;
type SetError = (error: Boolean) => void;
type SetLoading = (loading: Boolean) => void;
type UseTopSitesReturnValue = {
  topSites: Array<TopSite> | null,
  error: Boolean,
  loading: Boolean
}

const getTopSites = async (setTopSites: SetTopSites, setError: SetError, setLoading: SetLoading) => {
  try {
    setLoading(true)
    const topSites = await chrome.topSites.get();
    const topSitesWithFavicon: Array<TopSite> =
      topSites.map((topSite: TopSite) => ({
        ...topSite,
        faviconUrl: getFaviconUrl(topSite.url),
      }))
    setTopSites(topSitesWithFavicon || null);
  } catch (err) {
    setError(true)
  } finally {
    setLoading(false)
  }
};

const useTopSites = (): UseTopSitesReturnValue => {
  const [topSites, setTopSites] = useState<TopSite[] | null>(null);
  const [error, setError] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    getTopSites(setTopSites, setError, setLoading);
  }, []);

  return { topSites, error, loading };
};

export default useTopSites;