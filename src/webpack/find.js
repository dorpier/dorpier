import { createApi, webpackChunk } from "@cumjar/websmack";

export const getModuleCache = () => webpackChunk();
export const getApi = () => {
  const api = createApi(webpackChunk());

  return { ...api, getModule: api.findByProps };
};
