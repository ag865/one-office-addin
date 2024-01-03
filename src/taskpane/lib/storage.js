export const USER_KEY = "davigold_user";
export const TOKEN_KEY = "davigold_token";
export const URL_KEY = "davigold_url";

/* global OfficeRuntime */

// OfficeRuntime.storage.

export const storage = {
  getToken: async () => {
    const token = await OfficeRuntime.storage.getItem(TOKEN_KEY);
    if (token) {
      return JSON.parse(token);
    }

    return null;
  },
  getUser: async () => {
    const user = await OfficeRuntime.storage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  },
  getUrl: async () => {
    const url = await OfficeRuntime.storage.getItem(URL_KEY);
    if (url) {
      return JSON.parse(url);
    }

    return null;
  },
  setToken: async (token) => {
    return OfficeRuntime.storage.setItem(TOKEN_KEY, token ? JSON.stringify(token) : null);
  },
  setUser: async (user) => {
    return OfficeRuntime.storage.setItem(USER_KEY, user ? JSON.stringify(user) : null);
  },
  setUrl: (url) => {
    return OfficeRuntime.storage.setItem(URL_KEY, url ? JSON.stringify(url) : null);
  },
  clearToken: async () => {
    return OfficeRuntime.storage.removeItems([USER_KEY, URL_KEY, TOKEN_KEY]);
  },
};