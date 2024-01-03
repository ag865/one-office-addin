import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getTenantByToken } from "../api/auth";
import PropTypes from "prop-types";
import { storage } from "../lib/storage";

/* global */

const initialAuthContextValues = {
  user: null,
  tenant: null,
  loadingUser: false,
  permissions: [],
  setUser: () => {},
  logout: () => {},
  refreshInBackground: () => {},
  setTenant: () => {},
  refreshUser: () => {},
  storeToken: () => {},
};

export const AuthContext = createContext(initialAuthContextValues);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storage.getUser());
  const [permissions, setPermissions] = useState([]);
  const [loadingUser, setLoadingUser] = useState(false);

  // const login = useCallback(async (data) => {
  //   const response = await loginWithEmailAndPassword(data);
  //   try {
  //     const parsedPermissions = response.data.data?.user?.role?.permissions
  //       ? JSON.parse(response.data.data?.user?.role?.permissions)
  //       : [];
  //     setPermissions(parsedPermissions);
  //   } catch {
  //     setPermissions([]);
  //   }
  //   setUser(response.data.data.user);
  //   storage.setToken(`Bearer ${response.data.data.token}`);
  //   storage.setUser(response.data.data.user);
  //   return response.data.data;
  // }, []);

  const storeToken = useCallback(async (data) => {
    const response = await getTenantByToken(data);
    const user = response.data.user;

    if (user) {
      await storage.setToken(data.token);
      await storage.setUser(user);
      await storage.setUrl(data.url);
      setUser(user);
    }
  }, []);

  const refreshInBackground = useCallback(async () => {
    const token = await storage.getToken();
    const url = await storage.getUrl();

    try {
      if (token && url) {
        const response = await getTenantByToken({ token, url });
        try {
          const parsedPermissions = response.data?.user?.role?.permissions
            ? JSON.parse(response.data.user.role.permissions)
            : [];
          setPermissions(parsedPermissions);
        } catch {
          setPermissions([]);
        }
        setUser(response.data.user);
        await storage.setUser(response.data);
        return response.data;
      }
      await storage.clearToken();
      setUser(null);
      return null;
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const localUser = await storage.getUser();
    if (localUser) {
      setUser(localUser);
    } else {
      setLoadingUser(true);
    }

    const token = await storage.getToken();
    const url = await storage.getUrl();

    try {
      if (token && url) {
        const response = await getTenantByToken({ token, url });
        try {
          const parsedPermissions = response.data?.user?.role?.permissions
            ? JSON.parse(response.data.user.role.permissions)
            : [];

          setPermissions(parsedPermissions);
        } catch {
          setPermissions([]);
        }
        setUser(response.data.user);
        await storage.setUser(response.data.user);
        return response.data;
      }
      storage.clearToken();
      setUser(null);
      return null;
    } catch (e) {
      throw new Error(e);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await storage.clearToken();
    setUser(null);
  }, []);

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingUser,
        setUser,
        logout,
        permissions,
        refreshInBackground,
        refreshUser,
        storeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export const useAuth = () => useContext(AuthContext);
